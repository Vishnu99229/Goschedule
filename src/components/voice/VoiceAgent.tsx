import VoiceAgentShell from './VoiceAgentShell'

export { BookCallButton } from './BookingActions'

export type VoiceProvider = 'vapi' | 'retell'

export type VoiceAgentVariant = 'default' | 'mic'

type Props = {
  provider?: VoiceProvider
  compact?: boolean
  variant?: VoiceAgentVariant
}

/**
 * Provider-agnostic entry. Unused until a voice provider is wired.
 * Renders the idle shell so the UI building blocks stay compileable.
 */
export default function VoiceAgent({ compact, variant = 'default' }: Props) {
  return (
    <VoiceAgentShell
      compact={compact}
      variant={variant}
      uiState="idle"
      muted={false}
      lines={[]}
      errorMessage={null}
      onBegin={() => {}}
      onConfirmMic={() => {}}
      onCancelMic={() => {}}
      onEnd={() => {}}
      onToggleMute={() => {}}
      onBookFallback={() => {}}
    />
  )
}
