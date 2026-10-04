import ElevenLabsVoiceAgent, { BookCallButton, BookCallLink } from './ElevenLabsVoiceAgent'

export { BookCallButton, BookCallLink }

export type VoiceProvider = 'elevenlabs' | 'vapi' | 'retell'

type Props = {
  provider?: VoiceProvider
  compact?: boolean
}

/**
 * Provider-agnostic entry point for the site voice demo.
 * Swap `provider` (or VITE_VOICE_PROVIDER) to move to Vapi / Retell later.
 */
export default function VoiceAgent({ provider, compact }: Props) {
  const resolved =
    provider ??
    (import.meta.env.VITE_VOICE_PROVIDER as VoiceProvider | undefined) ??
    'elevenlabs'

  if (resolved === 'elevenlabs') {
    return <ElevenLabsVoiceAgent compact={compact} />
  }

  return (
    <div className="voice-agent voice-agent--fallback" role="status">
      <p>Voice provider is not available. Book a call or email hello@goschedule.ai.</p>
    </div>
  )
}
