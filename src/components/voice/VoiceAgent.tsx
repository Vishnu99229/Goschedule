import { lazy, Suspense } from 'react'
import MockVoiceAgent from './MockVoiceAgent'

export { BookCallButton } from './BookingActions'

const ElevenLabsVoiceAgent = lazy(() => import('./ElevenLabsVoiceAgent'))

export type VoiceProvider = 'mock' | 'elevenlabs' | 'vapi' | 'retell'

type Props = {
  provider?: VoiceProvider
  compact?: boolean
}

function VoicePlaceholder({ compact }: { compact?: boolean }) {
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
export default function VoiceAgent({ provider, compact }: Props) {
  const envProvider = import.meta.env.VITE_VOICE_PROVIDER as VoiceProvider | undefined
  const resolved = provider ?? envProvider ?? 'mock'

  if (resolved === 'elevenlabs') {
    return (
      <Suspense fallback={<VoicePlaceholder compact={compact} />}>
        <ElevenLabsVoiceAgent compact={compact} />
      </Suspense>
    )
  }

  return <MockVoiceAgent compact={compact} />
}
