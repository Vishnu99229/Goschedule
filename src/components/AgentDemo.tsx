import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Loader2, Mic, MicOff, PhoneOff, RefreshCw, X } from 'lucide-react'
import { DEPLOY_AGENT_URL } from '../constants/links'
import { useVapiCall } from './agent-demo/useVapiCall'
import VoiceOrb from './agent-demo/VoiceOrb'
import type { DemoErrorCode } from './agent-demo/types'

const PROMPT_MAX_LENGTH = 2000

const PROMPT_PLACEHOLDER =
  'Describe the agent you want. For example: A warm, patient AI receptionist for a small dental clinic in Bangalore. She should introduce herself as Priya from Bright Smile Dental, book appointments Monday through Saturday between 9 AM and 7 PM, confirm the patient\'s name and phone number, ask about the reason for the visit (cleaning, filling, emergency), and gently reschedule if the requested slot is taken. She should never mention pricing over the phone — if asked, she offers to have the manager call back. Her tone is calm, unrushed, and reassuring.'

function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function statusAnnouncement(
  state: string,
  errorCode: DemoErrorCode | null,
  remainingSeconds: number,
): string {
  switch (state) {
    case 'idle':
      return 'Ready to start a demo call'
    case 'connecting':
      return 'Connecting to your AI agent'
    case 'live':
      return `Call in progress, ${formatCountdown(remainingSeconds)} remaining`
    case 'ended':
      return 'Call ended'
    case 'error':
      return errorCode === 'mic_denied'
        ? 'Microphone access required'
        : 'Something went wrong with the demo'
    default:
      return ''
  }
}

const cardShell: CSSProperties = {
  position: 'relative',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 20,
  padding: 32,
}

const iconBtnStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '10px 16px',
  borderRadius: 10,
  border: '1px solid var(--border-subtle)',
  background: 'var(--bg-base)',
  color: 'var(--text-secondary)',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 500,
  minHeight: 44,
}

/**
 * Live "Talk to AI Agent" demo — replaces the theatrical AgentDemo.
 * Root <section> + .container preserved for .hero-demo-col CSS.
 */
export default function AgentDemo() {
  const [prompt, setPrompt] = useState('')
  const {
    state,
    volume,
    muted,
    remainingSeconds,
    errorCode,
    errorMessage,
    startCall,
    endCall,
    toggleMute,
    cancelStartup,
    reset,
  } = useVapiCall()

  const trimmedLen = prompt.trim().length
  const canSubmit =
    trimmedLen >= 10 && trimmedLen <= PROMPT_MAX_LENGTH && state === 'idle'

  const handleTalk = () => {
    const trimmed = prompt.trim()
    if (
      trimmed.length < 10 ||
      trimmed.length > PROMPT_MAX_LENGTH ||
      state === 'connecting' ||
      state === 'live'
    ) {
      return
    }
    void startCall(trimmed)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter submits; Cmd/Ctrl+Enter inserts a newline
    if (e.key === 'Enter' && !(e.metaKey || e.ctrlKey)) {
      e.preventDefault()
      handleTalk()
    }
  }

  return (
    <section style={{ padding: '0 0 80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: 11,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--accent)',
              marginBottom: 12,
            }}
          >
            Live Demo
          </span>
          <h2
            style={{
              fontSize: 'clamp(22px, 2.6vw, 32px)',
              fontWeight: 700,
              letterSpacing: '-0.018em',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              marginBottom: 12,
            }}
          >
            Talk to Your AI Agent
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
            Describe an agent, then start a live voice call.
          </p>
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={cardShell}>
            <p
              aria-live="polite"
              style={{
                position: 'absolute',
                width: 1,
                height: 1,
                padding: 0,
                margin: -1,
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              {statusAnnouncement(state, errorCode, remainingSeconds)}
            </p>

            <AnimatePresence mode="wait">
              {/* ── IDLE ── */}
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  <textarea
                    id="agent-demo-prompt"
                    aria-label="Describe your agent and the goal"
                    placeholder={PROMPT_PLACEHOLDER}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={8}
                    maxLength={PROMPT_MAX_LENGTH}
                    style={{
                      width: '100%',
                      minHeight: 180,
                      padding: 14,
                      borderRadius: 12,
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-base)',
                      color: 'var(--text-primary)',
                      fontFamily: 'inherit',
                      fontSize: 15,
                      lineHeight: 1.5,
                      resize: 'vertical',
                      outline: 'none',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'var(--accent-soft-border)'
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)'
                    }}
                  />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 8,
                      marginBottom: 16,
                    }}
                  >
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      Enter to start · ⌘/Ctrl+Enter for new line
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {prompt.trim().length}/{PROMPT_MAX_LENGTH}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={!canSubmit}
                    onClick={handleTalk}
                    aria-label="Talk to AI Agent"
                    style={{
                      width: '100%',
                      gap: 8,
                      opacity: canSubmit ? 1 : 0.5,
                      cursor: canSubmit ? 'pointer' : 'not-allowed',
                    }}
                  >
                    <Mic style={{ width: 16, height: 16 }} />
                    Talk to AI Agent
                  </button>
                </motion.div>
              )}

              {/* ── CONNECTING ── */}
              {state === 'connecting' && (
                <motion.div
                  key="connecting"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 16,
                    padding: '28px 0 12px',
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                    style={{ display: 'flex' }}
                  >
                    <Loader2 style={{ width: 28, height: 28, color: 'var(--accent)' }} />
                  </motion.div>
                  <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
                    Connecting…
                  </p>
                  <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
                    Building your agent and starting the voice call
                  </p>
                  <button
                    type="button"
                    onClick={cancelStartup}
                    aria-label="Cancel connecting"
                    style={{
                      ...iconBtnStyle,
                      marginTop: 4,
                      color: 'var(--text-muted)',
                    }}
                  >
                    <X style={{ width: 14, height: 14 }} />
                    Cancel
                  </button>
                </motion.div>
              )}

              {/* ── LIVE ── */}
              {state === 'live' && (
                <motion.div
                  key="live"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 18,
                    padding: '8px 0 4px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      alignSelf: 'stretch',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--success)',
                          display: 'inline-block',
                        }}
                      />
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--success)' }}>
                        Connected
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        fontVariantNumeric: 'tabular-nums',
                        color: 'var(--text-primary)',
                      }}
                      aria-label={`${formatCountdown(remainingSeconds)} remaining`}
                    >
                      {formatCountdown(remainingSeconds)}
                    </span>
                  </div>

                  <VoiceOrb volume={volume} />

                  <p style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'center' }}>
                    Speak naturally — your agent is listening
                  </p>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <button
                      type="button"
                      aria-label={muted ? 'Unmute microphone' : 'Mute microphone'}
                      onClick={toggleMute}
                      style={iconBtnStyle}
                    >
                      {muted ? (
                        <MicOff style={{ width: 16, height: 16 }} />
                      ) : (
                        <Mic style={{ width: 16, height: 16 }} />
                      )}
                      {muted ? 'Unmute' : 'Mute'}
                    </button>
                    <button
                      type="button"
                      aria-label="End call"
                      onClick={endCall}
                      style={{
                        ...iconBtnStyle,
                        borderColor: 'rgba(220, 38, 38, 0.35)',
                        color: 'var(--danger)',
                        background: 'rgba(220, 38, 38, 0.06)',
                      }}
                    >
                      <PhoneOff style={{ width: 16, height: 16 }} />
                      End call
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── ENDED ── */}
              {state === 'ended' && (
                <motion.div
                  key="ended"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ textAlign: 'center', padding: '8px 0' }}
                >
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: 8,
                    }}
                  >
                    Call ended
                  </p>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--text-secondary)',
                      marginBottom: 24,
                      maxWidth: 400,
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                  >
                    Ready to put an agent like this to work on your real workflows?
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                  >
                    <button
                      type="button"
                      onClick={reset}
                      className="btn btn-secondary"
                      style={{ gap: 8 }}
                    >
                      <RefreshCw style={{ width: 14, height: 14 }} />
                      Try another
                    </button>
                    <a
                      href={DEPLOY_AGENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ gap: 8 }}
                    >
                      Build yours on GoSchedule
                      <ArrowRight style={{ width: 16, height: 16 }} />
                    </a>
                  </div>
                </motion.div>
              )}

              {/* ── ERROR ── */}
              {state === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    padding: '8px 0',
                  }}
                >
                  <div
                    style={{
                      padding: '14px 16px',
                      borderRadius: 12,
                      background: 'rgba(220, 38, 38, 0.06)',
                      border: '1px solid rgba(220, 38, 38, 0.22)',
                      marginBottom: 16,
                    }}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--danger)',
                        marginBottom: errorCode === 'mic_denied' ? 8 : 0,
                      }}
                    >
                      {errorMessage ?? 'Something went wrong — try again.'}
                    </p>
                    {errorCode === 'mic_denied' && (
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        Enable microphone access for this site in your browser settings, then try
                        again. On Chrome: click the lock icon in the address bar → Site settings →
                        Microphone → Allow.
                      </p>
                    )}
                    {errorCode === 'rate_limited' && (
                      <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 8 }}>
                        Prefer a live walkthrough? Book a short call and we&apos;ll demo on your
                        use case.
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={reset}
                      className="btn btn-primary"
                      style={{ gap: 8 }}
                    >
                      <RefreshCw style={{ width: 14, height: 14 }} />
                      Try again
                    </button>
                    {errorCode === 'rate_limited' && (
                      <a
                        href={DEPLOY_AGENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ gap: 8 }}
                      >
                        Book a Call
                        <ArrowRight style={{ width: 14, height: 14 }} />
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
