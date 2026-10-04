export type AnalyticsEvent =
  | 'voice_start'
  | 'voice_end'
  | 'voice_error'
  | 'booking_opened_from_voice'
  | 'booking_clicked'

type EventPayload = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}

export function trackEvent(event: AnalyticsEvent, payload?: EventPayload): void {
  const detail = { event, ...payload, ts: Date.now() }

  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push(detail)
    if (typeof window.gtag === 'function') {
      window.gtag('event', event, payload ?? {})
    }
  }

  if (import.meta.env.DEV) {
    console.debug('[analytics]', detail)
  }
}
