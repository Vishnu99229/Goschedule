import { motion } from 'framer-motion'
import { Newspaper, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import { DEPLOY_AGENT_URL } from '../constants/links'

const ACCENT = '#7C3AED'
const BG = '#FAF8F4'
const TEXT = '#1A1614'
const TEXT_MUTED = '#57514A'
const SURFACE_LIGHT = '#F2EEE6'
const BORDER_LIGHT = '#E5DFD3'

const DEMO_HREF = DEPLOY_AGENT_URL

function MorningBriefHeroVisual() {
    const pulse = 2.4
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 340, height: 240, margin: '0 auto' }}>
            {/* Phone ripples (the morning call going out) */}
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
            {/* Ranked headlines card */}
            <motion.div
                style={{
                    position: 'absolute',
                    right: '8%',
                    top: '24%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px solid rgba(124,58,237,0.30)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    maxWidth: 200,
                    zIndex: 2,
                }}
                animate={{
                    scale: [1, 1.03, 1],
                    boxShadow: [
                        `0 0 0 rgba(124,58,237,0)`,
                        `0 0 28px rgba(124,58,237,0.15)`,
                        `0 0 0 rgba(124,58,237,0)`,
                    ],
                }}
                transition={{ duration: pulse, repeat: Infinity, ease: 'easeInOut' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Newspaper style={{ width: 16, height: 16, color: ACCENT, flexShrink: 0 }} />
                    <div style={{ fontSize: 11, color: TEXT_MUTED, fontWeight: 500 }}>Today&apos;s brief</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div style={{ height: 6, borderRadius: 3, background: ACCENT, width: '92%' }} />
                    <div style={{ height: 6, borderRadius: 3, background: 'rgba(124,58,237,0.40)', width: '70%' }} />
                    <div style={{ height: 6, borderRadius: 3, background: 'rgba(124,58,237,0.25)', width: '55%' }} />
                </div>
            </motion.div>
        </div>
    )
}

const features = [
    {
        title: 'Pulls from dozens of news sources every day',
        body: 'Dozens of sources, scanned every morning.',
    },
    {
        title: 'Ranks every story against your personal profile',
        body: 'Your work, your markets, the things you care about.',
    },
    {
        title: 'Delivers a natural voice call, not another notification',
        body: 'A short voice briefing in your own tone.',
    },
    {
        title: 'Learns what matters to you over time',
        body: 'The more you listen, the sharper the next brief.',
    },
]

export default function MorningBriefPage() {
    return (
        <main style={{ background: BG, color: TEXT, minHeight: '80vh', paddingTop: 48, paddingBottom: 100 }}>
            <SEO
                title="Morning Brief | GoSchedule.ai"
                description="A personalized AI news agent that calls you every morning with only the stories that matter to you."
                canonical="https://www.goschedule.ai/products/morning-brief"
            />
            {/* Hero */}
            <section className="container" style={{ paddingBottom: 56 }}>
                <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}
                    className="mb-hero"
                >
                    <div>
                        <div className="badge" style={{ marginBottom: 18 }}>
                            Personalized News Agent
                        </div>
                        <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                            Morning Brief. Your morning news, called in.
                        </h1>
                        <p className="body-lg" style={{ color: TEXT_MUTED, maxWidth: 520, marginBottom: 28 }}>
                            An AI agent that reads the news so you do not have to, then calls you with only what matters.
                        </p>
                        <a href={DEMO_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                            Sign me up
                        </a>
                    </div>
                    <MorningBriefHeroVisual />
                </div>
                <style>{`
          @media (max-width: 900px) {
            .mb-hero { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </section>

            {/* Problem (single-paragraph callout) */}
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
                    <p style={{ fontSize: 18, lineHeight: 1.65, color: TEXT, maxWidth: 720, margin: '0 auto' }}>
                        Morning Brief pulls from dozens of sources every morning, ranks each story against your work, your markets, and the things you care about, and calls you with a short voice briefing in your own tone. No feed to scroll. No noise. Just the few things worth knowing, read aloud before your day starts.
                    </p>
                </motion.div>
            </section>

            {/* What Morning Brief does */}
            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 28, textAlign: 'center' }}>What Morning Brief does</h2>
                <motion.div
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-10% 0px' }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="mb-card-grid"
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
                                minHeight: 180,
                            }}
                        >
                            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{f.title}</h3>
                            <p style={{ fontSize: 14, color: TEXT_MUTED, margin: 0 }}>{f.body}</p>
                        </motion.div>
                    ))}
                </motion.div>
                <style>{`
          @media (max-width: 700px) {
            .mb-card-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
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
                    <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>Start your morning with a brief, not a feed</h2>
                    <p style={{ color: TEXT_MUTED, marginBottom: 24, maxWidth: 460, margin: '0 auto 24px' }}>
                        Tell us what you care about and we will call you tomorrow with the short list.
                    </p>
                    <a href={DEMO_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 28px' }}>
                        Sign me up
                    </a>
                </motion.div>
            </section>
        </main>
    )
}
