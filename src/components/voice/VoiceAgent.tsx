import { lazy, Suspense } from 'react'
import MockVoiceAgent from './MockVoiceAgent'

export { BookCallButton } from './BookingActions'

const ElevenLabsVoiceAgent = lazy(() => import('./ElevenLabsVoiceAgent'))

export type VoiceProvider = 'mock' | 'elevenlabs' | 'vapi' | 'retell'

export type VoiceAgentVariant = 'default' | 'mic'

type Props = {
  provider?: VoiceProvider
  compact?: boolean
  variant?: VoiceAgentVariant
}

function VoicePlaceholder({ compact, variant }: { compact?: boolean; variant?: VoiceAgentVariant }) {
  if (variant === 'mic') {
    return <span className="voice-mic__placeholder" aria-hidden />
  }
  return (
    <div
      className="voice-console voice-console--compact"
      style={{ minHeight: compact ? 'var(--voice-min-height-compact)' : 'var(--voice-min-height)' }}
      aria-hidden
    />
  )
}

/**
 * Provider-agnostic entry. Defaults to mock until ElevenLabs is configured in env.
 */
export default function VoiceAgent({ provider, compact, variant = 'default' }: Props) {
  const envProvider = import.meta.env.VITE_VOICE_PROVIDER as VoiceProvider | undefined
  const resolved = provider ?? envProvider ?? 'mock'

  if (resolved === 'elevenlabs') {
    return (
      <Suspense fallback={<VoicePlaceholder compact={compact} variant={variant} />}>
        <ElevenLabsVoiceAgent compact={compact} variant={variant} />
      </Suspense>
    )
  }

  return <MockVoiceAgent compact={compact} variant={variant} />
}
