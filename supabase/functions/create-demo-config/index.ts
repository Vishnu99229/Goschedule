import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { buildWrappedSystemPrompt, FIRST_MESSAGE } from './prompts.ts'
import { validatePrompt } from './validate.ts'
import { checkRateLimit } from './rate-limit.ts'

const ALLOWED_ORIGINS = [
  'https://www.goschedule.ai',
  'https://goschedule.ai',
  'http://localhost:5173',
  'http://localhost:4173',
]

// ── helpers (mirrors generate-agent-demo) ──

function corsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0]
  return {
    'Access-Control-Allow-Origin': allowed,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, apikey',
  }
}

function jsonResponse(body: unknown, status: number, origin: string | null): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  })
}

function getClientIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return 'unknown'
}

function buildVoiceConfig(): { provider: string; voiceId: string; model?: string } {
  const provider = (Deno.env.get('VOICE_PROVIDER') ?? '11labs').toLowerCase()

  if (provider === 'vapi') {
    console.log(JSON.stringify({ event: 'voice_provider', provider: 'vapi', voiceId: 'Elliot' }))
    return { provider: 'vapi', voiceId: 'Elliot' }
  }

  // Default / "11labs"
  console.log(JSON.stringify({ event: 'voice_provider', provider: '11labs', voiceId: 'andrea' }))
  return { provider: '11labs', voiceId: 'andrea', model: 'eleven_turbo_v2_5' }
}

// ── handler ──

serve(async (req: Request) => {
  const origin = req.headers.get('origin')
  const ip = getClientIp(req)

  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin) })
    }

    if (req.method !== 'POST') {
      return jsonResponse({ error: 'Method not allowed' }, 405, origin)
    }

    // Rate limiting (5 / hour via Upstash — fail-open)
    const rate = await checkRateLimit(ip)
    if (!rate.allowed) {
      return jsonResponse(
        { error: 'rate_limited', retry_after_minutes: rate.retry_after_minutes },
        429,
        origin,
      )
    }

    // Parse body
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return jsonResponse({ error: 'invalid_body' }, 400, origin)
    }

    const rawPrompt =
      body && typeof body === 'object' && 'prompt' in body
        ? (body as { prompt: unknown }).prompt
        : undefined

    const validation = validatePrompt(rawPrompt)
    if (!validation.ok) {
      return jsonResponse({ error: validation.error }, 400, origin)
    }

    const { prompt } = validation
    const voice = buildVoiceConfig()

    const config = {
      model: {
        provider: 'openai',
        model: 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: buildWrappedSystemPrompt(prompt) },
        ],
      },
      voice,
      transcriber: {
        provider: 'deepgram',
        model: 'nova-2',
        language: 'en',
      },
      firstMessage: FIRST_MESSAGE,
      firstMessageMode: 'assistant-speaks-first',
      maxDurationSeconds: 120,
      silenceTimeoutSeconds: 15,
      recordingEnabled: false,
      endCallMessage:
        'Thanks for trying the demo. Sign up on GoSchedule to build your own agent.',
      endCallPhrases: ['goodbye', 'bye', 'end call', 'hang up'],
      backgroundSound: 'off',
    }

    // Do not log the full config (contains user prompt). Log metadata only.
    console.log(JSON.stringify({
      event: 'config_generated',
      ip,
      prompt_length: prompt.length,
    }))

    return jsonResponse({ config }, 200, origin)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(JSON.stringify({ event: 'error', error: message, ip }))
    return jsonResponse({ error: 'internal_error' }, 500, origin)
  }
})
