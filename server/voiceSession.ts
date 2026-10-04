const ELEVENLABS_SIGNED_URL =
  'https://api.elevenlabs.io/v1/convai/conversation/get-signed-url'

const COOKIE_NAME = 'gs_voice_cd'
const DEFAULT_COOLDOWN_SEC = 120
const MAX_SESSION_MS = 5 * 60 * 1000

export type VoiceSessionSuccess = {
  signedUrl: string
  maxDurationMs: number
}

export type VoiceSessionError = {
  status: number
  code: string
  message: string
}

function parseCookies(header: string | undefined): Record<string, string> {
  if (!header) return {}
  return header.split(';').reduce<Record<string, string>>((acc, part) => {
    const [k, ...rest] = part.trim().split('=')
    if (k) acc[k] = decodeURIComponent(rest.join('='))
    return acc
  }, {})
}

function cooldownSeconds(): number {
  const raw = process.env.VOICE_COOLDOWN_SECONDS
  const n = raw ? Number.parseInt(raw, 10) : DEFAULT_COOLDOWN_SEC
  return Number.isFinite(n) && n >= 0 ? n : DEFAULT_COOLDOWN_SEC
}

export function checkVoiceCooldown(cookieHeader: string | undefined): VoiceSessionError | null {
  const cooldown = cooldownSeconds()
  if (cooldown === 0) return null

  const cookies = parseCookies(cookieHeader)
  const last = cookies[COOKIE_NAME]
  if (!last) return null

  const lastMs = Number.parseInt(last, 10)
  if (!Number.isFinite(lastMs)) return null

  const elapsed = Date.now() - lastMs
  if (elapsed < cooldown * 1000) {
    const retryAfter = Math.ceil((cooldown * 1000 - elapsed) / 1000)
    return {
      status: 429,
      code: 'cooldown',
      message: `Please wait ${retryAfter}s before starting another call.`,
    }
  }

  return null
}

export function voiceCooldownSetCookieHeader(): string {
  const cooldown = cooldownSeconds()
  const maxAge = cooldown > 0 ? cooldown : 60
  return `${COOKIE_NAME}=${Date.now()}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax; Secure`
}

export async function fetchElevenLabsSignedUrl(): Promise<VoiceSessionSuccess | VoiceSessionError> {
  const apiKey = process.env.ELEVENLABS_API_KEY
  const agentId = process.env.ELEVENLABS_AGENT_ID

  if (!apiKey || !agentId) {
    return {
      status: 503,
      code: 'not_configured',
      message: 'Voice agent is not configured.',
    }
  }

  const url = `${ELEVENLABS_SIGNED_URL}?agent_id=${encodeURIComponent(agentId)}`
  const response = await fetch(url, {
    headers: { 'xi-api-key': apiKey },
  })

  if (!response.ok) {
    return {
      status: 502,
      code: 'provider_error',
      message: 'Could not start voice session.',
    }
  }

  const body = (await response.json()) as { signed_url?: string }
  if (!body.signed_url) {
    return {
      status: 502,
      code: 'provider_error',
      message: 'Invalid response from voice provider.',
    }
  }

  return {
    signedUrl: body.signed_url,
    maxDurationMs: MAX_SESSION_MS,
  }
}

export async function notifyVoiceEnded(payload: Record<string, unknown>): Promise<void> {
  const webhook = process.env.N8N_VOICE_WEBHOOK_URL
  if (!webhook) return

  await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {
    /* optional webhook — ignore failures */
  })
}
