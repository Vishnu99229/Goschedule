import { useState } from 'react'
import { trackEvent } from '../../lib/analytics'
import BookingModal from './BookingModal'

export function BookCallButton({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => {
          trackEvent('booking_clicked')
          setOpen(true)
        }}
      >
        Book a 20-min call
      </button>
      <BookingModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
