import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, CheckCircle, Sparkles, Phone, Volume2, VolumeX } from 'lucide-react'
import { DEPLOY_AGENT_URL } from '../constants/links'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type DemoState = 'idle' | 'building' | 'result'

interface ConversationTurn {
  role: 'agent' | 'customer'
  text: string
}

interface DemoResponse {
  agentName: string
  agentType: 'voice' | 'text'
  industry: string
  conversation: ConversationTurn[]
  capabilities: string[]
}

interface SubDemoProps {
  demo: DemoResponse
  onReset: () => void
}

interface ErrorMsg {
  type: 'rate_limit'
  message: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const BUILD_STEPS = [
  'Analyzing your requirements...',
  'Selecting the optimal voice model...',
  'Configuring conversation flow...',
  'Wiring up connectors...',
  'Finalizing your agent...',
]

const EXAMPLE_CHIPS = [
  {
    label: 'D2C: Recover abandoned carts',
    prompt: 'Send WhatsApp messages to recover abandoned carts for my D2C store and answer product questions',
  },
  {
    label: 'D2C: COD confirmation calls',
    prompt: 'Call customers to confirm their cash-on-delivery orders so I can reduce return-to-origin losses',
  },
  {
    label: 'Clinic: Book & cut no-shows',
    prompt: 'Book patient appointments and call to remind them so we reduce no-shows',
  },
  {
    label: 'SaaS: Qualify inbound leads',
    prompt: "Qualify inbound leads, score their buying intent, and book a demo if they're a good fit",
  },
  {
    label: 'Lending: EMI reminder calls',
    prompt: 'Call borrowers with friendly EMI payment reminders and help them pay on time',
  },
  {
    label: 'Real estate: Instant lead callback',
    prompt: 'Instantly call back new property leads, qualify their budget and timeline, and book a site visit',
  },
]

// Stored for reference — matches the Edge Function system prompt verbatim.
export const AGENT_DEMO_SYSTEM_PROMPT = `You generate a single realistic demo conversation for an AI agent, based on the user's described use case. You must detect the industry and pick the most fitting high-demand use case, then produce a believable conversation.

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

TOPIC GUARD — CRITICAL: This endpoint ONLY generates business AI agent demos. If the user's input is clearly unrelated to a business use case — do NOT fulfill it. Return the polite redirect JSON instead.

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

// Waveform bar heights — symmetric, tallest in centre
const WAVEFORM_BARS = [
  { low: 4, high: 12 },
  { low: 5, high: 20 },
  { low: 5, high: 26 },
  { low: 6, high: 34 },
  { low: 5, high: 26 },
  { low: 5, high: 20 },
  { low: 4, high: 12 },
]

// ─────────────────────────────────────────────────────────────────────────────
// Mock data (used when env vars are not set, or as fallback)
// ─────────────────────────────────────────────────────────────────────────────

const MOCK_BY_VERTICAL: Record<string, DemoResponse> = {
  cart: {
    agentName: 'Cart Recovery Agent',
    agentType: 'text',
    industry: 'D2C E-commerce',
    conversation: [
      { role: 'agent', text: "Hey! You left something behind 👀 Your cart at Zara Home still has 3 items worth ₹2,840. Want me to hold them for you?" },
      { role: 'customer', text: "Oh I forgot about that. What items are in there?" },
      { role: 'agent', text: "A ceramic planter (₹1,200), a linen throw (₹980), and a scented candle set (₹660). All in stock right now." },
      { role: 'customer', text: "Okay cool. Can I get a discount?" },
      { role: 'agent', text: "You're in luck — use WELCOME10 for 10% off your first order. That brings your total to ₹2,556. Want me to send you the checkout link?" },
      { role: 'customer', text: "Yes please!" },
    ],
    capabilities: ['Recovers abandoned carts via WhatsApp', 'Shares discount codes automatically', 'Sends one-tap checkout links'],
  },
  cod: {
    agentName: 'COD Confirmation Agent',
    agentType: 'voice',
    industry: 'D2C E-commerce',
    conversation: [
      { role: 'agent', text: "Hello, am I speaking with Priya? I'm calling from StyleCart regarding your Cash on Delivery order #SC-48291." },
      { role: 'customer', text: "Yes, that's me." },
      { role: 'agent', text: "Great! I'm confirming your order for a kurti set worth ₹1,499, arriving tomorrow between 10am and 2pm. Can you confirm you'll be available to receive it?" },
      { role: 'customer', text: "Yes, I'll be home in the morning." },
      { role: 'agent', text: "Perfect. Please keep ₹1,499 in cash ready. You'll get an SMS with the delivery partner's number an hour before arrival." },
    ],
    capabilities: ['Confirms COD orders before dispatch', 'Reduces return-to-origin losses', 'Schedules delivery time slots'],
  },
  clinic: {
    agentName: 'Clinic Booking Agent',
    agentType: 'voice',
    industry: 'Healthcare',
    conversation: [
      { role: 'agent', text: "Hello, this is MedCare Clinic. I'm calling to remind you about your appointment with Dr. Sharma tomorrow at 11am." },
      { role: 'customer', text: "Oh thanks for calling. Actually can I shift it to 2pm?" },
      { role: 'agent', text: "Let me check availability... Dr. Sharma has a 2:30pm slot open tomorrow. Shall I book that for you?" },
      { role: 'customer', text: "2:30 works perfectly." },
      { role: 'agent', text: "Done! Your appointment is confirmed for tomorrow at 2:30pm. You'll receive a reminder SMS one hour before. Is there anything else I can help you with?" },
    ],
    capabilities: ['Books and reschedules appointments', 'Sends automated no-show reminders', 'Handles after-hours bookings'],
  },
  lead: {
    agentName: 'Lead Qualification Agent',
    agentType: 'voice',
    industry: 'SaaS / B2B Tech',
    conversation: [
      { role: 'agent', text: "Hi Rahul, thanks for signing up for a demo of FlowCRM. I have a few quick questions to personalise it. What's the size of your sales team?" },
      { role: 'customer', text: "We have about 12 reps right now." },
      { role: 'agent', text: "Got it. And what CRM are you currently using, if any?" },
      { role: 'customer', text: "We're on spreadsheets honestly. It's become a mess." },
      { role: 'agent', text: "That's exactly the problem we solve. Based on your team size, you'd be on our Growth plan at ₹8,400/month. Our founder can walk you through a live demo — would Thursday 3pm or Friday 11am work?" },
      { role: 'customer', text: "Thursday 3pm is perfect." },
    ],
    capabilities: ['Qualifies buying intent automatically', 'Scores leads by team size and budget', 'Books demos directly into calendar'],
  },
  emi: {
    agentName: 'EMI Reminder Agent',
    agentType: 'voice',
    industry: 'Lending / Fintech',
    conversation: [
      { role: 'agent', text: "Hello Amit, this is a friendly reminder from FinServe regarding your EMI of ₹4,200 due this Friday, the 7th." },
      { role: 'customer', text: "Yes I know, I've been a bit tight this month." },
      { role: 'agent', text: "I understand. If you'd like, I can note a 3-day extension to Monday the 10th — that way there's no late fee on your record. Would that help?" },
      { role: 'customer', text: "That would be really helpful, yes." },
      { role: 'agent', text: "Done! Your EMI is now due on Monday the 10th. I'll send you a payment link via SMS so it takes just 30 seconds to pay when you're ready." },
    ],
    capabilities: ['Sends friendly EMI reminders before due date', 'Offers payment extensions to reduce defaults', 'Delivers one-tap payment links via SMS'],
  },
  realestate: {
    agentName: 'Property Lead Agent',
    agentType: 'voice',
    industry: 'Real Estate',
    conversation: [
      { role: 'agent', text: "Hi Sneha, I saw you enquired about 2BHK flats in Whitefield. I'm from Prestige Estates — great timing, we just launched a new project there. Is this a good moment?" },
      { role: 'customer', text: "Yes sure, what's the price range?" },
      { role: 'agent', text: "Units start at ₹68 lakhs for a 1,050 sq ft 2BHK. We have ready-to-move and under-construction options. What's your budget range?" },
      { role: 'customer', text: "We're looking at up to ₹80 lakhs." },
      { role: 'agent', text: "Perfect — you have several great options. Our site visits happen on weekends. Can I book you a slot this Saturday at 11am?" },
      { role: 'customer', text: "Yes, Saturday 11am works." },
    ],
    capabilities: ['Calls back new leads within 60 seconds', 'Qualifies budget and timeline', 'Books site visits directly'],
  },
}

const DEFAULT_MOCK: DemoResponse = MOCK_BY_VERTICAL.clinic

function getMockForPrompt(promptText: string): DemoResponse {
  const p = promptText.toLowerCase()
  if (p.includes('cart') || p.includes('abandon')) return MOCK_BY_VERTICAL.cart
  if (p.includes('cod') || p.includes('cash-on-delivery') || p.includes('cash on delivery') || p.includes('return-to-origin') || p.includes('rto')) return MOCK_BY_VERTICAL.cod
  if (p.includes('emi') || p.includes('loan') || p.includes('borrow') || p.includes('lending') || p.includes('payment reminder')) return MOCK_BY_VERTICAL.emi
  if (p.includes('property') || p.includes('real estate') || p.includes('site visit') || p.includes('flat') || p.includes('lead callback')) return MOCK_BY_VERTICAL.realestate
  if (p.includes('lead') || p.includes('qualify') || p.includes('saas') || p.includes('inbound')) return MOCK_BY_VERTICAL.lead
  if (p.includes('appointment') || p.includes('patient') || p.includes('clinic') || p.includes('no-show') || p.includes('no show')) return MOCK_BY_VERTICAL.clinic
  return DEFAULT_MOCK
}

// ─────────────────────────────────────────────────────────────────────────────
// Network helpers
// ─────────────────────────────────────────────────────────────────────────────

function sleep(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms))
}

class RateLimitError extends Error {
  msg: string
  constructor(message: string) {
    super(message)
    this.name = 'RateLimitError'
    this.msg = message
  }
}

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

async function fetchDemo(promptText: string): Promise<DemoResponse> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    await sleep(200)
    return getMockForPrompt(promptText)
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12_000)

  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/generate-agent-demo`, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ prompt: promptText }),
    })

    if (res.status === 429) {
      const data = await res.json().catch(() => ({}))
      throw new RateLimitError(data.message ?? "You've hit the demo limit. Book a quick call to see the full thing in action.")
    }

    if (!res.ok) throw new Error(`HTTP ${res.status}`)

    const data: DemoResponse = await res.json()
    return data
  } catch (err) {
    if (err instanceof RateLimitError) throw err
    return getMockForPrompt(promptText)
  } finally {
    clearTimeout(timeout)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TypingDots — animated "..." indicator for text agent messages
// ─────────────────────────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '3px 0' }}>
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-text)' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ChatDemo — text/WhatsApp agent UI (chat bubbles + typing indicator)
// ─────────────────────────────────────────────────────────────────────────────

function ChatDemo({ demo, onReset }: SubDemoProps) {
  const [visibleBubbles, setVisibleBubbles] = useState(0)
  const [typingFor, setTypingFor] = useState(-1)

  useEffect(() => {
    setVisibleBubbles(0)
    setTypingFor(-1)
    const timers: ReturnType<typeof setTimeout>[] = []
    let t = 300

    demo.conversation.forEach((turn, i) => {
      if (turn.role === 'agent') {
        // Show typing dots, then reveal bubble
        timers.push(setTimeout(() => setTypingFor(i), t))
        t += 720
        timers.push(setTimeout(() => { setTypingFor(-1); setVisibleBubbles(i + 1) }, t))
        t += 580
      } else {
        timers.push(setTimeout(() => setVisibleBubbles(i + 1), t))
        t += 580
      }
    })

    return () => timers.forEach(clearTimeout)
  }, [demo])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Sparkles style={{ width: 17, height: 17, color: 'var(--accent)' }} />
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{demo.agentName}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 3, flexWrap: 'wrap' }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>💬 Text Agent</p>
              {demo.industry && (
                <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 20, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                  {demo.industry}
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={onReset}
          style={{ fontSize: 13, color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.18s, color 0.18s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
        >
          Try another ↩
        </button>
      </div>

      {/* Conversation bubbles */}
      <div style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '14px 12px', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 10, minHeight: 120 }}>
        {demo.conversation.map((turn, i) =>
          i < visibleBubbles ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28 }}
              style={{ display: 'flex', justifyContent: turn.role === 'agent' ? 'flex-start' : 'flex-end' }}
            >
              <div style={{
                maxWidth: '78%', padding: '9px 13px',
                borderRadius: turn.role === 'agent' ? '3px 14px 14px 14px' : '14px 3px 14px 14px',
                background: turn.role === 'agent' ? 'var(--accent-soft)' : 'var(--bg-elevated)',
                border: `1px solid ${turn.role === 'agent' ? 'var(--accent-soft-border)' : 'var(--border-subtle)'}`,
                fontSize: 14, lineHeight: 1.5,
                color: turn.role === 'agent' ? 'var(--accent-text)' : 'var(--text-primary)',
              }}>
                {turn.text}
              </div>
            </motion.div>
          ) : null,
        )}

        {/* Typing indicator */}
        {typingFor >= 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', justifyContent: 'flex-start' }}
          >
            <div style={{ padding: '9px 14px', borderRadius: '3px 14px 14px 14px', background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-border)' }}>
              <TypingDots />
            </div>
          </motion.div>
        )}
      </div>

      {/* Capabilities */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
        {demo.capabilities.map(cap => (
          <span key={cap} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
            ✓ {cap}
          </span>
        ))}
      </div>

      {/* Deploy CTA */}
      <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
        style={{ display: 'flex', width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', gap: 8 }}
      >
        Deploy This Agent <ArrowRight style={{ width: 18, height: 18 }} />
      </a>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// VoiceCallDemo — phone-call UI for voice agents
// ─────────────────────────────────────────────────────────────────────────────

function VoiceCallDemo({ demo, onReset }: SubDemoProps) {
  const [callPhase, setCallPhase] = useState<'calling' | 'connected'>('calling')
  const [seconds, setSeconds] = useState(0)
  const [activeTurn, setActiveTurn] = useState(-1)
  const [shownTurns, setShownTurns] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const isMutedRef = useRef(true)
  const transcriptRef = useRef<HTMLDivElement>(null)

  useEffect(() => { isMutedRef.current = isMuted }, [isMuted])

  // "Calling…" → "Connected" after 1.2s
  useEffect(() => {
    const t = setTimeout(() => setCallPhase('connected'), 1200)
    return () => clearTimeout(t)
  }, [])

  // Live timer
  useEffect(() => {
    if (callPhase !== 'connected') return
    const interval = setInterval(() => setSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [callPhase])

  // Reveal transcript turns one by one, animate waveform per turn
  useEffect(() => {
    if (callPhase !== 'connected') return
    const timers: ReturnType<typeof setTimeout>[] = []
    let t = 500

    demo.conversation.forEach((turn, i) => {
      timers.push(setTimeout(() => {
        setActiveTurn(i)
        setShownTurns(i + 1)
        // Scroll to latest transcript line
        if (transcriptRef.current) {
          transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight
        }
        // TTS — browser-native, only agent lines, respects mute ref
        if (!isMutedRef.current && turn.role === 'agent' && 'speechSynthesis' in window) {
          try {
            window.speechSynthesis.cancel()
            const utt = new SpeechSynthesisUtterance(turn.text)
            utt.rate = 1.05
            window.speechSynthesis.speak(utt)
          } catch { /* unsupported browser — ignore */ }
        }
      }, t))
      t += 1250
    })

    // Deactivate waveform after last turn
    timers.push(setTimeout(() => setActiveTurn(-1), t - 100))

    return () => {
      timers.forEach(clearTimeout)
      try { window.speechSynthesis?.cancel() } catch { /* ignore */ }
    }
  }, [callPhase, demo])

  // Cancel TTS on unmount (e.g. "Try another")
  useEffect(() => {
    return () => { try { window.speechSynthesis?.cancel() } catch { /* ignore */ } }
  }, [])

  const handleMuteToggle = () => {
    const next = !isMuted
    setIsMuted(next)
    isMutedRef.current = next
    if (next) { try { window.speechSynthesis?.cancel() } catch { /* ignore */ } }
  }

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`

  const isSpeaking = activeTurn >= 0 && demo.conversation[activeTurn]?.role === 'agent'
  const speakerLabel =
    activeTurn >= 0
      ? demo.conversation[activeTurn].role === 'agent'
        ? 'Agent is speaking...'
        : 'Customer replied'
      : shownTurns >= demo.conversation.length && shownTurns > 0
        ? 'Call complete'
        : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <AnimatePresence mode="wait">

        {/* ── CALLING phase ── */}
        {callPhase === 'calling' && (
          <motion.div
            key="calling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '28px 0' }}
          >
            <motion.div
              animate={{ scale: [1, 1.18, 1], opacity: [1, 0.65, 1] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-flex', width: 58, height: 58, borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-border)', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}
            >
              <Phone style={{ width: 24, height: 24, color: 'var(--accent)' }} />
            </motion.div>
            <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)' }}>
              Calling <span style={{ color: 'var(--text-primary)' }}>{demo.agentName}</span>...
            </p>
          </motion.div>
        )}

        {/* ── CONNECTED phase ── */}
        {callPhase === 'connected' && (
          <motion.div
            key="connected"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Call header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone style={{ width: 17, height: 17, color: 'var(--accent)' }} />
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>{demo.agentName}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3, flexWrap: 'wrap' }}>
                    <motion.span
                      animate={{ opacity: [1, 0.35, 1] }}
                      transition={{ duration: 1.6, repeat: Infinity }}
                      style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)', display: 'inline-block', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 12, color: 'var(--success)', fontWeight: 500 }}>Connected</span>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{fmt(seconds)}</span>
                    {demo.industry && (
                      <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 20, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)' }}>
                        {demo.industry}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  onClick={handleMuteToggle}
                  title={isMuted ? 'Unmute voice (browser TTS)' : 'Mute voice'}
                  style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid var(--border-subtle)', background: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', fontFamily: 'inherit', transition: 'border-color 0.18s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--border-hover)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border-subtle)')}
                >
                  {isMuted ? <VolumeX style={{ width: 14, height: 14 }} /> : <Volume2 style={{ width: 14, height: 14 }} />}
                </button>
                <button
                  onClick={onReset}
                  style={{ fontSize: 13, color: 'var(--text-muted)', background: 'none', border: '1px solid var(--border-subtle)', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontFamily: 'inherit', transition: 'border-color 0.18s, color 0.18s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                >
                  Try another ↩
                </button>
              </div>
            </div>

            {/* Waveform */}
            <div style={{ display: 'flex', gap: 4, alignItems: 'center', justifyContent: 'center', height: 52, marginBottom: 4 }}>
              {WAVEFORM_BARS.map((bar, i) => (
                <motion.div
                  key={i}
                  style={{ width: 4, borderRadius: 3, background: 'var(--accent)', flexShrink: 0 }}
                  animate={{ height: isSpeaking ? [bar.low, bar.high, bar.low] : 3 }}
                  transition={isSpeaking
                    ? { duration: 0.38 + i * 0.055, repeat: Infinity, delay: i * 0.07, ease: 'easeInOut' }
                    : { duration: 0.25, ease: 'easeOut' }
                  }
                />
              ))}
            </div>
            <p style={{ textAlign: 'center', fontSize: 11, minHeight: 18, marginBottom: 16, color: isSpeaking ? 'var(--accent)' : 'var(--text-muted)', fontWeight: isSpeaking ? 500 : 400, transition: 'color 0.3s' }}>
              {speakerLabel}
            </p>

            {/* Live transcript */}
            <div
              ref={transcriptRef}
              style={{ background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', borderRadius: 12, padding: '14px 16px', marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 220, overflowY: 'auto', minHeight: 80 }}
            >
              {Array.from({ length: shownTurns }).map((_, i) => {
                const turn = demo.conversation[i]
                const isActive = i === activeTurn
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderLeft: `2px solid ${isActive ? 'var(--accent)' : turn.role === 'agent' ? 'var(--accent-soft-border)' : 'var(--border-subtle)'}`, paddingLeft: 10, transition: 'border-color 0.3s' }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: turn.role === 'agent' ? 'var(--accent)' : 'var(--text-muted)' }}>
                      {turn.role === 'agent' ? 'Agent' : 'Customer'}
                    </span>
                    <p style={{ fontSize: 14, lineHeight: 1.55, marginTop: 2, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: isActive ? 500 : 400, transition: 'color 0.3s, font-weight 0.15s' }}>
                      {turn.text}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Capabilities */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {demo.capabilities.map(cap => (
                <span key={cap} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 12, fontWeight: 500, background: 'var(--bg-base)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                  ✓ {cap}
                </span>
              ))}
            </div>

            {/* Deploy CTA */}
            <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary"
              style={{ display: 'flex', width: '100%', justifyContent: 'center', fontSize: 15, padding: '14px', gap: 8 }}
            >
              Deploy This Agent <ArrowRight style={{ width: 18, height: 18 }} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// AgentDemo — main component (orchestration + idle/building states)
// ─────────────────────────────────────────────────────────────────────────────

export default function AgentDemo() {
  const [state, setState] = useState<DemoState>('idle')
  const [prompt, setPrompt] = useState('')
  const [demo, setDemo] = useState<DemoResponse | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [errorMsg, setErrorMsg] = useState<ErrorMsg | null>(null)

  // Chip click immediately starts the demo build with that chip's full prompt.
  const handleChipClick = async (chipPrompt: string) => {
    setErrorMsg(null)
    setPrompt(chipPrompt)
    setState('building')
    setCurrentStep(0)
    setCompletedSteps([])

    try {
      const [result] = await Promise.all([fetchDemo(chipPrompt), sleep(6000)])
      setDemo(result)
      setState('result')
    } catch (err) {
      if (err instanceof RateLimitError) {
        setErrorMsg({ type: 'rate_limit', message: err.msg })
        setState('idle')
      } else {
        setDemo(getMockForPrompt(chipPrompt))
        setState('result')
      }
    }
  }

  const handleReset = () => {
    setState('idle')
    setPrompt('')
    setDemo(null)
    setCurrentStep(0)
    setCompletedSteps([])
    setErrorMsg(null)
  }

  // Advance build steps
  useEffect(() => {
    if (state !== 'building') return
    const STEP_MS = 1150
    const timers: ReturnType<typeof setTimeout>[] = []

    for (let i = 1; i < BUILD_STEPS.length; i++) {
      timers.push(setTimeout(() => {
        setCurrentStep(i)
        setCompletedSteps(prev => [...prev, i - 1])
      }, i * STEP_MS))
    }
    timers.push(setTimeout(() => setCompletedSteps(prev => [...prev, BUILD_STEPS.length - 1]), 5700))

    return () => timers.forEach(clearTimeout)
  }, [state])

  return (
    <section style={{ padding: '0 0 80px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent)', marginBottom: 12 }}>
            Live Demo
          </span>
          <h2 style={{ fontSize: 'clamp(22px, 2.6vw, 32px)', fontWeight: 700, letterSpacing: '-0.018em', lineHeight: 1.15, color: 'var(--text-primary)', marginBottom: 12 }}>
            Build Your AI Agent in 10 Seconds
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>
            Pick a use case and watch your agent come to life.
          </p>
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <div style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 20, padding: '32px' }}>
            <AnimatePresence mode="wait">

              {/* ── IDLE ── */}
              {state === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0 4px' }}
                >
                  {/* Chips are the sole trigger. Visual centerpiece of the idle card. */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', maxWidth: 560 }}>
                    {EXAMPLE_CHIPS.map(chip => (
                      <button
                        key={chip.label}
                        type="button"
                        onClick={() => handleChipClick(chip.prompt)}
                        style={{ padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500, border: '1px solid var(--accent-soft-border)', background: 'var(--accent-soft)', color: 'var(--accent)', cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.15s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(124,58,237,0.16)')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'var(--accent-soft)')}
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Rate-limit / error friendly card */}
                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{ marginTop: 20, width: '100%', padding: '12px 16px', background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-border)', borderRadius: 10, textAlign: 'left' }}
                      >
                        <p style={{ fontSize: 13, color: 'var(--text-primary)', marginBottom: 10 }}>
                          {errorMsg.message}
                        </p>
                        <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 13, padding: '8px 18px', display: 'inline-flex', gap: 6 }}>
                          Book a Call <ArrowRight style={{ width: 14, height: 14 }} />
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* ── BUILDING ── */}
              {state === 'building' && (
                <motion.div
                  key="building"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ marginBottom: 22 }}>
                    <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>Building agent for:</p>
                    <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', fontStyle: 'italic' }}>"{prompt}"</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {BUILD_STEPS.map((step, i) => {
                      const isCompleted = completedSteps.includes(i)
                      const isCurrent = currentStep === i && !isCompleted
                      const isHidden = i > currentStep && !completedSteps.includes(i)

                      return (
                        <AnimatePresence key={step}>
                          {!isHidden && (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                            >
                              <div style={{ width: 22, height: 22, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {isCompleted ? (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}>
                                    <CheckCircle style={{ width: 20, height: 20, color: 'var(--success)' }} />
                                  </motion.div>
                                ) : (
                                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }} style={{ display: 'flex' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round">
                                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                                    </svg>
                                  </motion.div>
                                )}
                              </div>
                              <span style={{ fontSize: 14, color: isCompleted ? 'var(--text-muted)' : isCurrent ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: isCurrent ? 500 : 400, transition: 'color 0.3s' }}>
                                {step}
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── RESULT — dispatch to voice or chat UI ── */}
              {state === 'result' && demo && (
                <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  {demo.agentType === 'voice'
                    ? <VoiceCallDemo demo={demo} onReset={handleReset} />
                    : <ChatDemo demo={demo} onReset={handleReset} />
                  }
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
