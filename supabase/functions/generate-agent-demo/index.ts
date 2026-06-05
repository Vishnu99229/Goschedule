import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const ALLOWED_ORIGINS = [
  'https://www.goschedule.ai',
  'https://goschedule.ai',
  'http://localhost:5173',
  'http://localhost:4173',
]

const SYSTEM_PROMPT = `You generate a single realistic demo conversation for an AI agent, based on the user's described use case. You must detect the industry and pick the most fitting high-demand use case, then produce a believable conversation.

Return ONLY valid JSON (no markdown, no preamble) in this exact schema:
{
  "agentName": "string name for the agent, e.g. 'COD Confirmation Agent'",
  "agentType": "voice" or "text",
  "industry": "string — the detected industry, e.g. 'D2C E-commerce'",
  "conversation": [{ "role": "agent" or "customer", "text": "string" }],
  "capabilities": ["3 short capability tags"]
}

Rules:
- Generate 4 to 6 conversation turns. Keep each turn natural and concise (one or two sentences).
- Choose agentType correctly: use "voice" for phone-call use cases (COD/order confirmation, delivery/NDR resolution, appointment reminders, EMI/payment reminders, lead callbacks, collections). Use "text" for chat/WhatsApp use cases (cart recovery, order tracking/WISMO, FAQ answering, product questions).
- Make the conversation specific to the actual business described, not generic. Use realistic details (order numbers, time slots, amounts) where natural.
- End the conversation on a successful, satisfying outcome (booking confirmed, payment scheduled, cart recovered, lead qualified).

TOPIC GUARD — CRITICAL: This endpoint ONLY generates business AI agent demos. If the user's input is clearly unrelated to a business use case (examples: "write me a poem", "what is the capital of France", "solve this math problem", "tell me a joke", or any personal / general-knowledge request) — do NOT fulfill the off-topic request. Instead return ONLY this exact JSON and nothing else:
{"agentName":"Let's build your agent","agentType":"text","industry":"General","conversation":[{"role":"agent","text":"I build AI agents for business use cases — sales, support, bookings, and operations. Try describing what you'd like your agent to do, like recovering abandoned carts or qualifying leads."}],"capabilities":["Sales agents","Support agents","Voice & text"]}

Use this knowledge of the highest-demand AI agent use cases by industry to ground your output:

D2C / E-commerce: COD order confirmation calls to reduce return-to-origin (RTO) losses; abandoned cart recovery via WhatsApp; failed-delivery / NDR resolution calls; order tracking and "where is my order" deflection; returns and exchange handling.

Healthcare / clinics / diagnostics: appointment booking; no-show reminder calls; after-hours patient FAQ and triage routing; lab report delivery and follow-up; prescription refill reminders.

Lending / fintech / NBFC: EMI and payment reminder calls; polite overdue collections; loan application follow-up; KYC completion nudges.

SaaS / B2B tech: inbound lead qualification and buying-intent scoring; outbound SDR prospecting; demo and meeting booking; free-trial-to-paid conversion nudges; onboarding assistance.

Real estate: instant speed-to-lead callback; lead qualification by budget, location, and timeline; site visit scheduling.

Restaurants / cafes / QSR: table reservations; order taking; upsell and add-on suggestions; feedback collection.

Insurance: policy renewal reminders; policy Q&A; first notice of loss / claims intake.

Education / EdTech: admission inquiry follow-up; counselor call booking; fee payment reminders.

If the user's prompt does not clearly match an industry, pick the closest fit and produce a sensible, professional conversation.`

const FALLBACK_RESPONSE = {
  agentName: 'Business Assistant',
  agentType: 'voice',
  industry: 'General',
  conversation: [
    { role: 'agent', text: "Hi! I'm your AI assistant. How can I help you today?" },
    { role: 'customer', text: "I'd like to know more about your services." },
    { role: 'agent', text: "Of course! I can help with bookings, answer questions, and follow up with your customers 24/7. What would you like to automate first?" },
    { role: 'customer', text: "Let's start with appointment reminders." },
    { role: 'agent', text: "Great choice. I'll set that up now — you'll see a significant drop in no-shows within the first week." },
  ],
  capabilities: ['24/7 availability', 'Handles bookings and reminders', 'Reduces manual follow-up'],
}

// ── helpers ──

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

async function checkRateLimit(ip: string): Promise<{ allowed: boolean }> {
  const upstashUrl = Deno.env.get('UPSTASH_REDIS_REST_URL')
  const upstashToken = Deno.env.get('UPSTASH_REDIS_REST_TOKEN')

  // If Upstash is not configured, skip rate limiting
  if (!upstashUrl || !upstashToken) return { allowed: true }

  try {
    const key = `demo_rl:${ip}`
    const headers = { Authorization: `Bearer ${upstashToken}` }

    // INCR counter (Upstash REST: GET /incr/<key>)
    const res = await fetch(`${upstashUrl}/incr/${encodeURIComponent(key)}`, { headers })
    if (!res.ok) return { allowed: true }

    const { result: count } = await res.json()

    // On first hit, set 60s fixed window — fire and forget
    if (count === 1) {
      fetch(`${upstashUrl}/expire/${encodeURIComponent(key)}/60`, { headers }).catch(() => {})
    }

    return { allowed: count <= 5 }
  } catch {
    // Fail open: if Redis is unreachable, allow the request
    return { allowed: true }
  }
}

// ── handler ──

serve(async (req: Request) => {
  const origin = req.headers.get('origin')

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) })
  }

  if (req.method !== 'POST') {
    return jsonResponse({ error: 'Method not allowed' }, 405, origin)
  }

  // Rate limiting
  const ip = getClientIp(req)
  const { allowed } = await checkRateLimit(ip)
  if (!allowed) {
    return jsonResponse(
      { error: 'rate_limited', message: "You've hit the demo limit. Book a quick call to see the full thing in action." },
      429,
      origin,
    )
  }

  // Parse body
  let prompt: string
  try {
    const body = await req.json()
    prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : ''
  } catch {
    return jsonResponse({ error: 'invalid_body', message: 'Invalid JSON body.' }, 400, origin)
  }

  // Input validation
  if (!prompt) {
    return jsonResponse({ error: 'empty_prompt', message: 'Please describe what you want your agent to do.' }, 400, origin)
  }
  if (prompt.length > 500) {
    return jsonResponse({ error: 'too_long', message: 'Please keep your description under 500 characters.' }, 400, origin)
  }

  const apiKey = Deno.env.get('ANTHROPIC_API_KEY')
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY secret is not set')
    return jsonResponse(FALLBACK_RESPONSE, 200, origin)
  }

  // Call Anthropic
  let rawText: string
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 800,
        system: SYSTEM_PROMPT,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Anthropic API error:', response.status, err)
      return jsonResponse(FALLBACK_RESPONSE, 200, origin)
    }

    const data = await response.json()
    rawText = data?.content?.[0]?.text ?? ''
  } catch (err) {
    console.error('Fetch to Anthropic failed:', err)
    return jsonResponse(FALLBACK_RESPONSE, 200, origin)
  }

  // Strip accidental ```json fences before parsing
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()

  try {
    const parsed = JSON.parse(cleaned)
    if (
      typeof parsed.agentName !== 'string' ||
      !Array.isArray(parsed.conversation) ||
      !Array.isArray(parsed.capabilities)
    ) {
      throw new Error('Schema mismatch')
    }
    return jsonResponse(parsed, 200, origin)
  } catch (err) {
    console.error('JSON parse failed:', err, '\nRaw:', rawText)
    return jsonResponse(FALLBACK_RESPONSE, 200, origin)
  }
})
