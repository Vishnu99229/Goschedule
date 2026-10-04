/** Lead payload forwarded to n8n after a voice call (SITE_BRIEF). */
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

export const VOICE_LEAD_FIELDS: (keyof VoiceLeadPayload)[] = [
  'name',
  'email',
  'company',
  'stage',
  'deal_size',
  'buyer',
  'current_motion',
  'timeline',
  'summary',
  'booked',
]

export function emptyVoiceLeadPayload(): VoiceLeadPayload {
  return {
    name: '',
    email: '',
    company: '',
    stage: '',
    deal_size: '',
    buyer: '',
    current_motion: '',
    timeline: '',
    summary: '',
    booked: false,
  }
}

function asString(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  return ''
}

function asBoolean(value: unknown): boolean {
  if (value === true) return true
  if (value === false) return false
  if (typeof value === 'string') {
    const lower = value.trim().toLowerCase()
    if (lower === 'true' || lower === 'yes' || lower === '1') return true
    if (lower === 'false' || lower === 'no' || lower === '0') return false
  }
  if (typeof value === 'number') return value !== 0
  return false
}

/** Coerce a partial client or merged body into the canonical n8n shape. */
export function normalizeVoiceLeadPayload(input: Record<string, unknown>): VoiceLeadPayload {
  const base = emptyVoiceLeadPayload()
  return {
    name: asString(input.name ?? base.name),
    email: asString(input.email ?? base.email),
    company: asString(input.company ?? base.company),
    stage: asString(input.stage ?? base.stage),
    deal_size: asString(input.deal_size ?? base.deal_size),
    buyer: asString(input.buyer ?? base.buyer),
    current_motion: asString(input.current_motion ?? base.current_motion),
    timeline: asString(input.timeline ?? base.timeline),
    summary: asString(input.summary ?? base.summary),
    booked: asBoolean(input.booked ?? base.booked),
  }
}

function n8nWebhookUrl(): string | undefined {
  return process.env.N8N_WEBHOOK_URL ?? process.env.N8N_VOICE_WEBHOOK_URL
}

/** POST lead payload to n8n. No-op when URL env is unset; swallows network errors. */
export async function sendVoiceLeadToN8n(payload: VoiceLeadPayload): Promise<void> {
  const webhook = n8nWebhookUrl()
  if (!webhook) return

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    /* optional integration */
  })
}
