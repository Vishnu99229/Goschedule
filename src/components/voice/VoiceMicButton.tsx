import { CONTACT_EMAIL } from '../../constants/booking'
import type { VoiceUiState } from './VoiceAgentShell'

type CaptionLine = { id: string; role: 'user' | 'agent'; text: string }

type Props = {
  uiState: VoiceUiState
  muted: boolean
  lines: CaptionLine[]
  errorMessage: string | null
  onBegin: () => void
  onConfirmMic: () => void
  onCancelMic: () => void
  onEnd: () => void
  onToggleMute: () => void
  onBookFallback: () => void
}

function MicGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path d="M6 11a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 17v4M9 21h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export default function VoiceMicButton({
  uiState,
  muted,
  lines,
  errorMessage,
  onBegin,
  onConfirmMic,
  onCancelMic,
  onEnd,
  onToggleMute,
  onBookFallback,
}: Props) {
  const live = uiState === 'listening' || uiState === 'speaking' || uiState === 'connecting'
  const idle = uiState === 'idle' || uiState === 'ended'
  const statusLabel =
    uiState === 'connecting'
      ? 'Connecting'
      : uiState === 'listening'
        ? 'Listening'
        : uiState === 'speaking'
          ? 'Agent speaking'
          : uiState === 'ended'
            ? 'Call ended'
            : null

  return (
    <div className={`voice-mic${idle ? ' voice-mic--pulse' : ''}${live ? ' voice-mic--live' : ''}`}>
      <p className="sr-only">
        You&apos;ll talk to an AI assistant trained on Vishnu&apos;s GTM work—not Vishnu live.
      </p>

      {statusLabel ? (
        <p className="sr-only" aria-live="polite">
          {statusLabel}
        </p>
      ) : null}

      {uiState === 'mic_prompt' && (
        <div className="voice-mic__row" role="status">
          <p className="sr-only">
            This uses your microphone so you can speak with the agent. Your browser will ask for
            permission next.
          </p>
          <button type="button" className="voice-mic__btn" onClick={onConfirmMic} aria-label="Allow microphone and start">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
          <button type="button" className="voice-mic__btn voice-mic__btn--ghost" onClick={onCancelMic} aria-label="Cancel">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      )}

      {idle ? (
        <button type="button" className="voice-mic__btn voice-mic__btn--talk" onClick={onBegin} aria-label="Talk to the agent">
          <MicGlyph />
        </button>
      ) : null}

      {live ? (
        <div className="voice-mic__row">
          <button
            type="button"
            className="voice-mic__btn voice-mic__btn--ghost"
            onClick={onToggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 5l14 14M9 9v3a3 3 0 0 0 4.5 2.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <rect x="9" y="3" width="6" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
              </svg>
            ) : (
              <MicGlyph />
            )}
          </button>
          <button type="button" className="voice-mic__btn voice-mic__btn--stop" onClick={onEnd} aria-label="End call">
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <rect width="14" height="14" rx="3" fill="currentColor" />
            </svg>
          </button>
        </div>
      ) : null}

      {uiState === 'error' && errorMessage ? (
        <div className="voice-mic__row" role="alert">
          <p className="sr-only">{errorMessage}</p>
          <button type="button" className="voice-mic__btn" onClick={onBookFallback} aria-label="Book a 20-min call">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M3 9h18M8 3v4M16 3v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <a className="voice-mic__btn voice-mic__btn--ghost" href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Vishnu">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M4 7l8 6 8-6" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
          </a>
        </div>
      ) : null}

      <div className="sr-only" aria-label="Live captions">
        {lines.length === 0 ? (
          <p>Captions appear here during the call.</p>
        ) : (
          <ul>
            {lines.map((line) => (
              <li key={line.id}>
                {line.role === 'user' ? 'You' : 'Agent'}: {line.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
