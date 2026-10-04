import { useEffect, useRef } from 'react'
import { buildBookingUrl, type BookingPrefill } from '../../constants/booking'
import { trackEvent } from '../../lib/analytics'

type Props = {
  open: boolean
  onClose: () => void
  prefill?: BookingPrefill
  skipAnalytics?: boolean
}

export default function BookingModal({ open, onClose, prefill, skipAnalytics }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const bookingUrl = buildBookingUrl(prefill)

  useEffect(() => {
    if (!open || skipAnalytics) return
    trackEvent('booking_clicked')
  }, [open, skipAnalytics])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="booking-modal" role="presentation">
      <button type="button" className="booking-modal__backdrop" aria-label="Close booking" onClick={onClose} />
      <div
        className="booking-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label="Book a 20-minute call"
      >
        <div className="booking-modal__header">
          <h2 className="booking-modal__title">Book a 20-min call</h2>
          <button type="button" className="booking-modal__close" onClick={onClose}>
            Close
          </button>
        </div>
        <iframe
          ref={iframeRef}
          title="Cal.com scheduling"
          className="booking-modal__frame"
          src={bookingUrl}
          loading="lazy"
        />
      </div>
    </div>
  )
}
