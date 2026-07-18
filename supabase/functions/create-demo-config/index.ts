import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { buildWrappedSystemPrompt } from './prompts.ts'
import { validatePrompt, type DemoLanguage } from './validate.ts'
import { checkRateLimit } from './rate-limit.ts'

const ALLOWED_ORIGINS = [
  'https://www.goschedule.ai',
  'https://goschedule.ai',
  'http://localhost:5173',
  'http://localhost:4173',
]

const LANGUAGE_CONFIG = {
  english: {
    voiceGender: 'male' as const,
    transcriber: { provider: 'deepgram', model: 'nova-2', language: 'en' },
    voice: { provider: 'vapi', voiceId: 'Elliot' },
    responseInstruction:
      'Speak as a male agent named Elliot. Keep responses concise, warm, and professional.',
    firstMessage:
      "Hi! I'm the agent you just described. What would you like to try first?",
    endCallMessage:
      'Thanks for trying the demo. Sign up on GoSchedule to build your own agent.',
    endCallPhrases: ['goodbye', 'bye', 'end call', 'hang up'],
  },
  hindi: {
    voiceGender: 'female' as const,
    transcriber: {
      provider: 'soniox',
      model: 'stt-rt-v5',
      language: 'en',
      languages: ['en'],
    },
    voice: {
      provider: 'cartesia',
      voiceId: 'a81fccdc-5595-4dfc-ae76-4de6a515b8a2',
      model: 'sonic-3.5',
    },
    responseInstruction:
      "Speak as a female agent. Use feminine grammatical forms throughout (e.g., 'मैं जा रही हूँ', 'मैं करती हूँ') — never masculine (मैं जा रहा हूँ, मैं करता हूँ). Even if the caller uses masculine forms, respond in feminine grammar consistently. Respond entirely in Hindi (हिन्दी). The user's description above is in English but you must conduct this entire voice conversation in fluent, natural Hindi. Do not switch to English unless the caller explicitly asks you to.",
    firstMessage:
      'नमस्ते! मैं वही एजेंट हूँ जिसका आपने अभी वर्णन किया। आप क्या करना चाहेंगे?',
    endCallMessage:
      'डेमो ट्राई करने के लिए धन्यवाद। अपना खुद का एजेंट बनाने के लिए GoSchedule पर साइन अप करें।',
    endCallPhrases: ['अलविदा', 'बाय', 'goodbye', 'bye'],
  },
  malayalam: {
    voiceGender: 'female' as const,
    transcriber: {
      provider: 'soniox',
      model: 'stt-rt-v5',
      language: 'en',
      languages: ['en'],
    },
    voice: {
      provider: 'cartesia',
      voiceId: 'b426013c-002b-4e89-8874-8cd20b68373a',
      model: 'sonic-3.5',
    },
    responseInstruction:
      "Speak as a female agent. Use feminine grammatical forms and pronouns throughout. Never switch to masculine forms even if the caller does. Respond entirely in Malayalam (മലയാളം). The user's description above is in English but you must conduct this entire voice conversation in fluent, natural Malayalam. Do not switch to English unless the caller explicitly asks you to.",
    firstMessage:
      'നമസ്കാരം! നിങ്ങൾ ഇപ്പോൾ വിവരിച്ച ഏജന്റ് ഞാനാണ്. നിങ്ങൾ എന്ത് ചെയ്യാൻ ആഗ്രഹിക്കുന്നു?',
    endCallMessage:
      'ഡെമോ പരീക്ഷിച്ചതിന് നന്ദി. നിങ്ങളുടെ സ്വന്തം ഏജന്റ് നിർമ്മിക്കാൻ GoSchedule-ൽ സൈൻ അപ്പ് ചെയ്യുക.',
    endCallPhrases: ['വിട', 'goodbye', 'bye'],
  },
  kannada: {
    voiceGender: 'female' as const,
    transcriber: {
      provider: 'soniox',
      model: 'stt-rt-v5',
      language: 'en',
      languages: ['en'],
    },
    voice: {
      provider: 'cartesia',
      voiceId: '7c6219d2-e8d2-462c-89d8-7ecba7c75d65',
      model: 'sonic-3.5',
    },
    responseInstruction:
      "Speak as a female agent. Use feminine grammatical forms and pronouns consistently throughout. Never switch to masculine forms even if the caller does. Respond entirely in Kannada (ಕನ್ನಡ). The user's description above is in English but you must conduct this entire voice conversation in fluent, natural Kannada. Do not switch to English unless the caller explicitly asks you to.",
    firstMessage:
      'ನಮಸ್ಕಾರ! ನೀವು ಈಗ ವಿವರಿಸಿದ ಏಜೆಂಟ್ ನಾನೇ. ನೀವು ಏನು ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?',
    endCallMessage:
      'ಡೆಮೋ ಪ್ರಯತ್ನಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಸ್ವಂತ ಏಜೆಂಟ್ ನಿರ್ಮಿಸಲು GoSchedule ನಲ್ಲಿ ಸೈನ್ ಅಪ್ ಮಾಡಿ.',
    endCallPhrases: ['ವಿದಾಯ', 'goodbye', 'bye'],
  },
} as const satisfies Record<
  DemoLanguage,
  {
    voiceGender: 'male' | 'female'
    transcriber: {
      provider: string
      model: string
      language: string
      languages?: readonly string[]
    }
    voice: { provider: string; voiceId: string; model?: string }
    responseInstruction: string
    firstMessage: string
    endCallMessage: string
    endCallPhrases: readonly string[]
  }
>

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
    const rawLanguage =
      body && typeof body === 'object' && 'language' in body
        ? (body as { language: unknown }).language
        : undefined

    const validation = validatePrompt(rawPrompt, rawLanguage)
    if (!validation.ok) {
      return jsonResponse({ error: validation.error }, 400, origin)
    }

    const { prompt, language } = validation
    const langConfig = LANGUAGE_CONFIG[language]

    console.log(JSON.stringify({
      event: 'voice_provider',
      language,
      provider: langConfig.voice.provider,
      voiceId: langConfig.voice.voiceId,
    }))

    const config = {
      model: {
        provider: 'openai',
        model: 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content: buildWrappedSystemPrompt(prompt, langConfig.responseInstruction),
          },
        ],
      },
      voice: langConfig.voice,
      transcriber: langConfig.transcriber,
      firstMessage: langConfig.firstMessage,
      firstMessageMode: 'assistant-speaks-first',
      maxDurationSeconds: 120,
      silenceTimeoutSeconds: 15,
      recordingEnabled: false,
      endCallMessage: langConfig.endCallMessage,
      endCallPhrases: [...langConfig.endCallPhrases],
      backgroundSound: 'off',
    }

    // Do not log the full config (contains user prompt). Log metadata only.
    console.log(JSON.stringify({
      event: 'config_generated',
      ip,
      prompt_length: prompt.length,
      language,
    }))

    return jsonResponse({ config }, 200, origin)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error(JSON.stringify({ event: 'error', error: message, ip }))
    return jsonResponse({ error: 'internal_error' }, 500, origin)
  }
})
