import { useCallback, useEffect, useRef, useState } from 'react'
import { Conversation } from '@elevenlabs/client'
import { CONTACT_EMAIL, type BookingPrefill } from '../../constants/booking'
import { DEPLOY_AGENT_URL } from '../../constants/links'
import { trackEvent } from '../../lib/analytics'
import BookingModal from './BookingModal'

export type VoiceUiState = 'idle' | 'mic_prompt' | 'connecting' | 'listening' | 'speaking' | 'ended' | 'error'

type TranscriptLine = {
  id: string
  role: 'user' | 'agent'
  text: string
  final: boolean
}

const LOCAL_COOLDOWN_KEY = 'gs_voice_local_cooldown'
const LOCAL_COOLDOWN_MS = 120_000

type Props = {
  compact?: boolean
  onStateChange?: (state: VoiceUiState) => void
}

function mapModeToUi(mode: string | undefined, status: string): VoiceUiState {
  if (status === 'connecting') return 'connecting'
  if (status === 'disconnected') return 'ended'
  if (mode === 'speaking') return 'speaking'
  if (mode === 'listening') return 'listening'
  return 'connecting'
}

export default function ElevenLabsVoiceAgent({ compact, onStateChange }: Props) {
  const [uiState, setUiState] = useState<VoiceUiState>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [muted, setMuted] = useState(false)
  const [lines, setLines] = useState<TranscriptLine[]>([])
  const [bookingOpen, setBookingOpen] = useState(false)
  const [bookingPrefill, setBookingPrefill] = useState<BookingPrefill | undefined>()

  const conversationRef = useRef<Awaited<ReturnType<typeof Conversation.startSession>> | null>(null)
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lineIdRef = useRef(0)

  const setState = useCallback(
    (next: VoiceUiState) => {
      setUiState(next)
      onStateChange?.(next)
    },
    [onStateChange]
  )

  const clearMaxTimer = () => {
    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current)
      maxTimerRef.current = null
    }
  }

  const endCall = useCallback(
    async (reason: 'user' | 'timeout' | 'error') => {
      clearMaxTimer()
      const conv = conversationRef.current
      conversationRef.current = null
      if (conv) {
        try {
          await conv.endSession()
        } catch {
          /* already ended */
        }
      }
      if (reason !== 'error') {
        setState('ended')
        trackEvent('voice_end', { reason })
      }
      // Post-call n8n integration uses ElevenLabs post_call_transcription → /api/elevenlabs-post-call
    },
    [setState]
  )

  const openBooking = useCallback((prefill?: BookingPrefill, fromVoice = false) => {
    setBookingPrefill(prefill)
    setBookingOpen(true)
    if (fromVoice) trackEvent('booking_opened_from_voice')
    else trackEvent('booking_clicked')
  }, [])

  const handleClientTool = useCallback(
    async (parameters: Record<string, unknown>) => {
      const prefill: BookingPrefill = {
        name: typeof parameters.name === 'string' ? parameters.name : undefined,
        email: typeof parameters.email === 'string' ? parameters.email : undefined,
        company: typeof parameters.company === 'string' ? parameters.company : undefined,
        notes: typeof parameters.notes === 'string' ? parameters.notes : undefined,
      }
      openBooking(prefill, true)
      return 'Opened booking calendar with prefilled details.'
    },
    [openBooking]
  )

  const startSession = useCallback(async () => {
    setErrorMessage(null)
    setLines([])

    const lastLocal = localStorage.getItem(LOCAL_COOLDOWN_KEY)
    if (lastLocal) {
      const elapsed = Date.now() - Number.parseInt(lastLocal, 10)
      if (Number.isFinite(elapsed) && elapsed < LOCAL_COOLDOWN_MS) {
        setState('error')
        setErrorMessage('You recently finished a call. Book a call or email Vishnu while you wait.')
        trackEvent('voice_error', { code: 'local_cooldown' })
        return
      }
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setState('error')
      setErrorMessage('This browser does not support voice. Book a call or email instead.')
      trackEvent('voice_error', { code: 'unsupported' })
      return
    }

    setState('connecting')
    trackEvent('voice_start')

    try {
      const sessionRes = await fetch('/api/voice-session', { method: 'POST' })
      if (!sessionRes.ok) {
        const err = (await sessionRes.json().catch(() => ({}))) as { message?: string; code?: string }
        throw new Error(err.message ?? 'Could not connect to the voice agent.')
      }

      const { signedUrl, maxDurationMs } = (await sessionRes.json()) as {
        signedUrl: string
        maxDurationMs: number
      }

      await navigator.mediaDevices.getUserMedia({ audio: true })

      const conversation = await Conversation.startSession({
        signedUrl,
        connectionType: 'websocket',
        clientTools: {
          open_booking: handleClientTool,
        },
        onStatusChange: ({ status }) => {
          if (status === 'connected') setState('listening')
          if (status === 'connecting') setState('connecting')
          if (status === 'disconnected') setState('ended')
        },
        onModeChange: ({ mode }) => {
          setState(mapModeToUi(mode, 'connected'))
        },
        onMessage: (message) => {
          const role = message.role === 'user' ? 'user' : 'agent'
          const text = message.message ?? ''
          if (!text) return
          const id = message.response_id ?? `line-${lineIdRef.current++}`
          setLines((prev) => {
            const existing = message.response_id
              ? prev.findIndex((l) => l.id === message.response_id)
              : -1
            if (existing >= 0) {
              const next = [...prev]
              next[existing] = { ...next[existing], text, final: true }
              return next
            }
            return [...prev, { id, role, text, final: true }]
          })
        },
        onError: (err) => {
          console.error(err)
          setState('error')
          setErrorMessage('The voice agent hit an error. Book a call or email Vishnu.')
          trackEvent('voice_error', { code: 'session' })
          void endCall('error')
        },
      })

      conversationRef.current = conversation
      localStorage.setItem(LOCAL_COOLDOWN_KEY, String(Date.now()))

      maxTimerRef.current = setTimeout(() => {
        void endCall('timeout')
      }, maxDurationMs ?? 300_000)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Could not start the voice agent.'
      setState('error')
      setErrorMessage(
        msg.includes('Permission') || msg.includes('NotAllowed')
          ? 'Microphone access was blocked. Book a call or email Vishnu instead.'
          : msg
      )
      trackEvent('voice_error', { code: 'start_failed' })
    }
  }, [endCall, handleClientTool, setState])

  const onPrimaryClick = () => {
    if (uiState === 'idle' || uiState === 'ended' || uiState === 'error') {
      setState('mic_prompt')
      return
    }
  }

  const onConfirmMic = () => {
    void startSession()
  }

  const toggleMute = () => {
    const conv = conversationRef.current
    if (!conv) return
    const next = !muted
    conv.setMicMuted(next)
    setMuted(next)
  }

  useEffect(() => {
    return () => {
      clearMaxTimer()
      void conversationRef.current?.endSession()
    }
  }, [])

  const showControls = uiState === 'listening' || uiState === 'speaking' || uiState === 'connecting'

  return (
    <div className={`voice-agent ${compact ? 'voice-agent--compact' : ''}`}>
      <p className="voice-agent__disclosure">
        You&apos;ll talk to an AI assistant trained on Vishnu&apos;s GTM work—not Vishnu live.
      </p>

      {uiState === 'mic_prompt' && (
        <div className="voice-agent__mic-notice" role="status">
          <p>
            This uses your microphone so you can speak with the agent. Your browser will ask for
            permission next. We don&apos;t store audio on this site; audio is processed by our voice
            provider.
          </p>
          <div className="voice-agent__row">
            <button type="button" className="voice-agent__btn voice-agent__btn--primary" onClick={onConfirmMic}>
              Allow microphone and start
            </button>
            <button type="button" className="voice-agent__btn voice-agent__btn--ghost" onClick={() => setState('idle')}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {(uiState === 'idle' || uiState === 'ended') && (
        <button
          type="button"
          className="voice-agent__start"
          onClick={onPrimaryClick}
        >
          <span className="voice-agent__start-label">Talk to my GTM agent</span>
          <span className="voice-agent__start-hint">Live voice demo · about 5 min max</span>
        </button>
      )}

      {showControls && (
        <div className="voice-agent__live" aria-live="polite">
          <p className="voice-agent__status">
            {uiState === 'connecting' && 'Connecting…'}
            {uiState === 'listening' && 'Listening'}
            {uiState === 'speaking' && 'Agent speaking'}
          </p>
          <div className="voice-agent__row">
            <button type="button" className="voice-agent__btn voice-agent__btn--ghost" onClick={toggleMute}>
              {muted ? 'Unmute' : 'Mute'}
            </button>
            <button type="button" className="voice-agent__btn voice-agent__btn--danger" onClick={() => void endCall('user')}>
              End
            </button>
          </div>
        </div>
      )}

      {uiState === 'error' && errorMessage && (
        <div className="voice-agent__fallback" role="alert">
          <p>{errorMessage}</p>
          <div className="voice-agent__row">
            <button type="button" className="voice-agent__btn voice-agent__btn--primary" onClick={() => openBooking()}>
              Book a 20-min call
            </button>
            <a className="voice-agent__btn voice-agent__btn--ghost" href={`mailto:${CONTACT_EMAIL}`}>
              Email Vishnu
            </a>
          </div>
        </div>
      )}

      <div className="voice-agent__transcript" aria-label="Live captions">
        {lines.length === 0 ? (
          <p className="voice-agent__transcript-empty">Captions appear here during the call.</p>
        ) : (
          <ul className="voice-agent__transcript-list">
            {lines.map((line) => (
              <li key={line.id} className={`voice-agent__line voice-agent__line--${line.role}`}>
                <span className="voice-agent__line-role">{line.role === 'user' ? 'You' : 'Agent'}</span>
                {line.text}
              </li>
            ))}
          </ul>
        )}
      </div>

      <BookingModal
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        prefill={bookingPrefill}
        skipAnalytics
      />
    </div>
  )
}

export function BookCallButton({
  className = '',
  onClick,
}: {
  className?: string
  onClick?: () => void
}) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          trackEvent('booking_clicked')
          onClick?.()
          setOpen(true)
        }}
      >
        Book a 20-min call
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export function BookCallLink({ className = '' }: { className?: string }) {
  return (
    <a
      href={DEPLOY_AGENT_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('booking_clicked')}
    >
      Book a 20-min call
    </a>
  )
}
