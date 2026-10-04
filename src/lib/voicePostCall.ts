export type VoiceLeadPayload = {
  name: string
  email: string
  company: string
  stage: string
  deal_size: string
  buyer: string
  current_motion: string
  timeline: string
  summary: string
  booked: boolean
}

/** Notify server to forward lead payload to n8n (no-op server-side if N8N_WEBHOOK_URL unset). */
export function postVoiceLeadEnded(payload: Partial<VoiceLeadPayload>): void {
  void fetch('/api/voice-ended', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name ?? '',
      email: payload.email ?? '',
      company: payload.company ?? '',
      stage: payload.stage ?? '',
      deal_size: payload.deal_size ?? '',
      buyer: payload.buyer ?? '',
      current_motion: payload.current_motion ?? '',
      timeline: payload.timeline ?? '',
      summary: payload.summary ?? '',
      booked: payload.booked ?? false,
    }),
  })
}
