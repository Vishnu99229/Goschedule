import type { CSSProperties } from 'react'
import type { TranscriptLine } from './useMockVoiceSession'
import { CONTACT_EMAIL } from '../../constants/booking'

export type VoiceUiState =
  | 'idle'
  | 'mic_prompt'
  | 'connecting'
  | 'listening'
  | 'speaking'
  | 'ended'
  | 'error'

type Props = {
  compact?: boolean
  uiState: VoiceUiState
  muted: boolean
  lines: TranscriptLine[]
  errorMessage: string | null
  onBegin: () => void
  onConfirmMic: () => void
  onCancelMic: () => void
  onEnd: () => void
  onToggleMute: () => void
  onBookFallback: () => void
}

function Waveform({ active, speaking }: { active: boolean; speaking: boolean }) {
  const bars = 24
  return (
    <div
      className={`voice-console__wave ${active ? 'voice-console__wave--active' : ''} ${speaking ? 'voice-console__wave--speak' : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} className="voice-console__bar" style={{ '--i': i } as CSSProperties} />
      ))}
    </div>
  )
}

export default function VoiceAgentShell({
  compact,
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
  const stateClass =
    uiState === 'listening'
      ? 'voice-console--listening'
      : uiState === 'speaking'
        ? 'voice-console--speaking'
        : uiState === 'connecting'
          ? 'voice-console--connecting'
          : ''

  const statusLabel =
    uiState === 'connecting'
      ? 'Connecting…'
      : uiState === 'listening'
        ? 'Listening'
        : uiState === 'speaking'
          ? 'Agent speaking'
          : uiState === 'ended'
            ? 'Call ended'
            : null

  const showPrimaryIdle = uiState === 'idle' || uiState === 'ended'
  const showLiveControls = live

  return (
    <div
      className={`voice-console ${compact ? 'voice-console--compact' : ''} ${stateClass}`.trim()}
      style={{ minHeight: compact ? 'var(--voice-min-height-compact)' : 'var(--voice-min-height)' }}
    >
      <p className="voice-console__disclosure">
        You&apos;ll talk to an AI assistant trained on Vishnu&apos;s GTM work—not Vishnu live.
      </p>

      <Waveform active={live} speaking={uiState === 'speaking'} />

      {statusLabel && <p className="voice-console__status" aria-live="polite">{statusLabel}</p>}

      {uiState === 'mic_prompt' && (
        <div className="voice-console__mic-notice" role="status">
          <p>
            This uses your microphone so you can speak with the agent. In this preview, audio is
            simulated—no data is sent.
          </p>
          <div className="voice-console__actions">
            <button type="button" className="voice-console__btn voice-console__btn--primary" onClick={onConfirmMic}>
              Allow microphone and start
            </button>
            <button type="button" className="voice-console__btn voice-console__btn--text" onClick={onCancelMic}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {showPrimaryIdle && (
        <button type="button" className="voice-console__talk" onClick={onBegin}>
          Talk to my GTM agent
        </button>
      )}

      {showLiveControls && (
        <div className="voice-console__actions">
          <button type="button" className="voice-console__btn voice-console__btn--text" onClick={onToggleMute}>
            {muted ? 'Unmute' : 'Mute'}
          </button>
          <button type="button" className="voice-console__btn voice-console__btn--danger" onClick={onEnd}>
            End
          </button>
        </div>
      )}

      {uiState === 'error' && errorMessage && (
        <div className="voice-console__fallback" role="alert">
          <p>{errorMessage}</p>
          <div className="voice-console__actions">
            <button type="button" className="voice-console__btn voice-console__btn--primary" onClick={onBookFallback}>
              Book a 20-min call
            </button>
            <a className="voice-console__btn voice-console__btn--text" href={`mailto:${CONTACT_EMAIL}`}>
              Email Vishnu
            </a>
          </div>
        </div>
      )}

      <div className="voice-console__captions" aria-label="Live captions">
        {lines.length === 0 ? (
          <p className="voice-console__captions-empty">Captions appear here during the call.</p>
        ) : (
          <ul className="voice-console__captions-list">
            {lines.map((line) => (
              <li key={line.id} className={`voice-console__line voice-console__line--${line.role}`}>
                <span className="voice-console__line-role">{line.role === 'user' ? 'You' : 'Agent'}</span>
                {line.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
