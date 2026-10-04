import { useState } from 'react'
import BookingModal from './BookingModal'
import VoiceAgentShell from './VoiceAgentShell'
import { useMockVoiceSession } from './useMockVoiceSession'

type Props = {
  compact?: boolean
}

export default function MockVoiceAgent({ compact }: Props) {
  const session = useMockVoiceSession()
  const [bookingOpen, setBookingOpen] = useState(false)

  const onBegin = () => {
    if (session.uiState === 'ended') session.resetToIdle()
    session.beginMicPrompt()
  }

  return (
    <>
      <VoiceAgentShell
        compact={compact}
        uiState={session.uiState}
        muted={session.muted}
        lines={session.lines}
        errorMessage={session.errorMessage}
        onBegin={onBegin}
        onConfirmMic={session.confirmAndStart}
        onCancelMic={session.cancelMicPrompt}
        onEnd={session.endSession}
        onToggleMute={session.toggleMute}
        onBookFallback={() => setBookingOpen(true)}
      />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  )
}
