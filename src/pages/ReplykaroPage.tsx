import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { MessageCircle, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import { DEPLOY_AGENT_URL } from '../constants/links'

const ACCENT = '#7C3AED'
const ACCENT_SOFT = '#A78BFA'
const BG = '#FAF8F4'
const TEXT = '#1A1614'
const TEXT_MUTED = '#57514A'
const SURFACE_LIGHT = '#F2EEE6'
const BORDER_LIGHT = '#E5DFD3'

const DEMO_HREF = DEPLOY_AGENT_URL

function ReplykaroHeroVisual() {
    const pulse = 2.4
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 340, height: 240, margin: '0 auto' }}>
            {/* Ripples from phone */}
            <div style={{ position: 'absolute', left: '18%', top: '48%', transform: 'translate(-50%,-50%)' }}>
                <Phone style={{ width: 44, height: 44, color: ACCENT, position: 'relative', zIndex: 2 }} strokeWidth={1.75} />
                {[1, 2, 3].map((i) => (
                    <motion.span
                        key={i}
                        style={{
                            position: 'absolute',
                            left: '50%',
                            top: '50%',
                            width: 44,
                            height: 44,
                            marginLeft: -22,
                            marginTop: -22,
                            borderRadius: '50%',
                            border: `1px solid ${ACCENT}`,
                            pointerEvents: 'none',
                        }}
                        animate={{ scale: [1, 3.4], opacity: [0.45, 0] }}
                        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut', delay: i * 0.55 }}
                    />
                ))}
            </div>
            <motion.div
                style={{
                    position: 'absolute',
                    right: '8%',
                    top: '28%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: 'rgba(37, 211, 102, 0.12)',
                    border: '1px solid rgba(37, 211, 102, 0.35)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                    maxWidth: 200,
                    zIndex: 2,
                }}
                animate={{ scale: [1, 1.04, 1], boxShadow: [`0 0 0 rgba(124,58,237,0)`, `0 0 28px rgba(124,58,237,0.15)`, `0 0 0 rgba(124,58,237,0)`] }}
                transition={{ duration: pulse, repeat: Infinity, ease: 'easeInOut' }}
            >
                <MessageCircle style={{ width: 22, height: 22, color: '#25d366', flexShrink: 0 }} />
                <div>
                    <div style={{ fontSize: 11, color: TEXT_MUTED, marginBottom: 4 }}>WhatsApp</div>
                    <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.4 }}>Can you hold two units for me?</div>
                </div>
            </motion.div>
        </div>
    )
}

function LeadsCounter() {
    const [n, setN] = useState(0)
    useEffect(() => {
        const id = window.setInterval(() => setN((x) => x + 1), 2000)
        return () => clearInterval(id)
    }, [])
    return (
        <div style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontWeight: 800, color: ACCENT, letterSpacing: '-0.04em' }}>{n}</div>
    )
}

const features = [
    {
        title: 'Answers every call, 24/7',
        body: 'Never let voicemail kill another deal.',
        visual: 'sparkle' as const,
    },
    {
        title: 'Replies to WhatsApp instantly',
        body: 'Natural language, your tone, your policies.',
        visual: 'chat' as const,
    },
    {
        title: 'Checks live store stock',
        body: 'Connect inventory so replies stay accurate.',
        visual: 'grid' as const,
    },
    {
        title: 'Routes hot leads to managers',
        body: 'Escalate warm conversations in real time.',
        visual: 'flow' as const,
    },
]

function FeatureVisual({ type }: { type: 'sparkle' | 'chat' | 'grid' }) {
    if (type === 'sparkle') {
        return (
            <div style={{ position: 'relative', width: 64, height: 64, margin: '0 auto' }}>
                <Phone style={{ width: 40, height: 40, color: ACCENT, margin: '12px auto 0', display: 'block' }} />
                <motion.div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 4,
                        width: 18,
                        height: 18,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_SOFT})`,
                        opacity: 0.9,
                    }}
                    animate={{ rotate: [0, 180, 360], scale: [1, 1.15, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
            </div>
        )
    }
    if (type === 'chat') {
        return (
            <motion.div
                style={{
                    width: 120,
                    margin: '0 auto',
                    padding: '10px 12px',
                    borderRadius: 12,
                    background: 'rgba(124,58,237,0.10)',
                    border: `1px solid rgba(124,58,237,0.25)`,
                    fontSize: 12,
                    color: TEXT,
                }}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
                We’re open till 9 — want us to hold a size M?
            </motion.div>
        )
    }
    if (type === 'grid') {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4, width: 100, margin: '0 auto' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            height: 14,
                            borderRadius: 3,
                            background: i % 3 === 0 ? 'rgba(220,38,38,0.40)' : 'rgba(124,58,237,0.40)',
                        }}
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.08 }}
                    />
                ))}
            </div>
        )
    }
    return null
}

function FeatureVisualFlowFixed() {
    return (
        <svg width={120} height={48} viewBox="0 0 120 48" style={{ margin: '0 auto', display: 'block' }}>
            <defs>
                <linearGradient id="flowG2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={ACCENT} />
                    <stop offset="100%" stopColor={ACCENT_SOFT} />
                </linearGradient>
            </defs>
            <motion.path
                d="M 8 24 L 112 24"
                stroke="url(#flowG2)"
                strokeWidth={2}
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
            />
            <motion.circle r={5} cy={24} fill={ACCENT} cx={24} animate={{ cx: [24, 96, 24] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} />
        </svg>
    )
}

export default function ReplykaroPage() {
    return (
        <main style={{ background: BG, color: TEXT, minHeight: '80vh', paddingTop: 48, paddingBottom: 100 }}>
            <SEO
                title="ReplyKaro — AI Inbound Response Agent | Goschedule.ai"
                description="ReplyKaro is an AI agent that responds to every inbound lead within seconds. Enriches contact data, qualifies intent, and books meetings — automatically."
                canonical="https://www.goschedule.ai/products/replykaro"
                jsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'ReplyKaro',
                        applicationCategory: 'BusinessApplication',
                        operatingSystem: 'Web',
                        url: 'https://www.goschedule.ai/products/replykaro',
                        description:
                            'ReplyKaro is an AI agent that responds to every inbound lead within seconds. Enriches contact data, qualifies intent, and books meetings — automatically.',
                        publisher: {
                            '@type': 'Organization',
                            name: 'Goschedule.ai',
                            url: 'https://www.goschedule.ai/',
                        },
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.goschedule.ai/' },
                            { '@type': 'ListItem', position: 2, name: 'ReplyKaro', item: 'https://www.goschedule.ai/products/replykaro' },
                        ],
                    },
                ]}
            />
            {/* Hero */}
            <section className="container" style={{ paddingBottom: 56 }}>
                <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}
                    className="rk-hero"
                >
                    <div>
                        <div className="badge" style={{ marginBottom: 18 }}>
                            Inbound Sales AI Agent
                        </div>
                        <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                            Replykaro — The AI Agent That Never Misses a Lead
                        </h1>
                        <p className="body-lg" style={{ color: TEXT_MUTED, maxWidth: 520, marginBottom: 28 }}>
                            24/7 inbound call and WhatsApp handling in Malayalam, English, and Hindi. Qualifies, books, and routes —
                            instantly.
                        </p>
                        <a href={DEMO_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                            Book a demo
                        </a>
                    </div>
                    <ReplykaroHeroVisual />
                </div>
                <style>{`
          @media (max-width: 900px) {
            .rk-hero { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </section>

            {/* Problem */}
            <section className="container" style={{ padding: '56px 0' }}>
                <motion.div
                    style={{
                        padding: '40px 28px',
                        borderRadius: 24,
                        background: SURFACE_LIGHT,
                        border: `1px solid ${BORDER_LIGHT}`,
                        textAlign: 'center',
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p style={{ fontSize: 18, lineHeight: 1.65, color: TEXT, maxWidth: 720, margin: '0 auto 28px' }}>
                        Retail chains lose <strong>30–40%</strong> of inbound leads to unanswered calls and unread WhatsApps.
                    </p>
                    <p style={{ fontSize: 13, color: TEXT_MUTED, marginBottom: 12 }}>Leads lost in the time you&apos;ve been on this page</p>
                    <LeadsCounter />
                </motion.div>
            </section>

            {/* What Replykaro does */}
            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 28, textAlign: 'center' }}>What Replykaro does</h2>
                <motion.div
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-10% 0px' }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: { staggerChildren: 0.1 },
                        },
                    }}
                    className="rk-card-grid"
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.title}
                            variants={{
                                hidden: { opacity: 0, y: 22 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
                            }}
                            style={{
                                padding: 24,
                                borderRadius: 20,
                                background: SURFACE_LIGHT,
                                border: `1px solid ${BORDER_LIGHT}`,
                                minHeight: 220,
                            }}
                        >
                            <div style={{ marginBottom: 16, minHeight: 72 }}>
                                {f.visual === 'flow' ? <FeatureVisualFlowFixed /> : <FeatureVisual type={f.visual} />}
                            </div>
                            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: TEXT_MUTED, margin: 0 }}>{f.body}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <style>{`
          @media (max-width: 700px) {
            .rk-card-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </section>

            {/* Use cases */}
            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.14em', color: TEXT_MUTED, textAlign: 'center', marginBottom: 20 }}>
                    USE CASES
                </h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
                    {['Retail chains', 'Hospitality', 'D2C brands', 'Service businesses'].map((label) => (
                        <span
                            key={label}
                            style={{
                                padding: '10px 18px',
                                borderRadius: 999,
                                border: '1px solid rgba(124,58,237,0.30)',
                                background: 'rgba(124,58,237,0.08)',
                                fontSize: 14,
                                color: TEXT,
                            }}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="container">
                <motion.div
                    style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        borderRadius: 24,
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.02) 100%)',
                        border: '1px solid rgba(124,58,237,0.22)',
                    }}
                    initial={{ opacity: 0.7, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>See it handle a real call</h2>
                    <p style={{ color: TEXT_MUTED, marginBottom: 24, maxWidth: 460, margin: '0 auto 24px' }}>
                        Book a short walkthrough — we&apos;ll show WhatsApp and voice in action on your workflows.
                    </p>
                    <a href={DEMO_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 28px' }}>
                        Book demo
                    </a>
                </motion.div>
            </section>
        </main>
    )
}
