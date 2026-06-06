import { motion } from 'framer-motion'
import { CheckCheck, Phone } from 'lucide-react'
import SEO from '../components/SEO'
import { DEPLOY_AGENT_URL } from '../constants/links'

const ACCENT = '#7C3AED'
const BG = '#FAF8F4'
const TEXT = '#1A1614'
const TEXT_MUTED = '#57514A'
const SURFACE_LIGHT = '#F2EEE6'
const BORDER_LIGHT = '#E5DFD3'

const DEMO_HREF = DEPLOY_AGENT_URL

function ResoundHeroVisual() {
    const pulse = 2.4
    return (
        <div style={{ position: 'relative', width: '100%', maxWidth: 340, height: 240, margin: '0 auto' }}>
            {/* Phone ripples (the outbound call going out) */}
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
            {/* Reply classified + meeting booked card */}
            <motion.div
                style={{
                    position: 'absolute',
                    right: '8%',
                    top: '24%',
                    padding: '14px 16px',
                    borderRadius: 16,
                    background: 'rgba(5, 150, 105, 0.10)',
                    border: '1px solid rgba(5, 150, 105, 0.30)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    maxWidth: 210,
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
                    <CheckCheck style={{ width: 16, height: 16, color: '#059669', flexShrink: 0 }} />
                    <div style={{ fontSize: 11, color: TEXT_MUTED, fontWeight: 500 }}>Reply classified</div>
                </div>
                <div style={{ fontSize: 13, color: TEXT, lineHeight: 1.4 }}>
                    Meeting booked, synced to CRM.
                </div>
            </motion.div>
        </div>
    )
}

const features = [
    {
        title: 'Connects your CRM and email sending tools',
        body: 'Plugs into the tools your team already runs.',
    },
    {
        title: 'AI reply classification with built-in consent capture',
        body: 'Every reply tagged. Consent captured automatically.',
    },
    {
        title: 'Voice AI that qualifies leads and books meetings',
        body: 'Qualified calls land straight on your calendar.',
    },
    {
        title: 'Multi-tenant, built for teams',
        body: 'Scale outbound without scaling the team behind it.',
    },
]

export default function ResoundPage() {
    return (
        <main style={{ background: BG, color: TEXT, minHeight: '80vh', paddingTop: 48, paddingBottom: 100 }}>
            <SEO
                title="Resound.ai — Outbound Sales Automation, End to End | Goschedule.ai"
                description="Multi-tenant outbound sales automation with AI reply handling and voice AI that qualifies leads and books meetings."
                canonical="https://www.goschedule.ai/products/resound"
                jsonLd={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'Resound.ai',
                        applicationCategory: 'BusinessApplication',
                        operatingSystem: 'Web',
                        url: 'https://www.goschedule.ai/products/resound',
                        description:
                            'Multi-tenant outbound sales automation with AI reply handling and voice AI that qualifies leads and books meetings.',
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
                            { '@type': 'ListItem', position: 2, name: 'Resound.ai', item: 'https://www.goschedule.ai/products/resound' },
                        ],
                    },
                ]}
            />
            {/* Hero */}
            <section className="container" style={{ paddingBottom: 56 }}>
                <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}
                    className="rs-hero"
                >
                    <div>
                        <div className="badge" style={{ marginBottom: 18 }}>
                            Early access
                        </div>
                        <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                            Resound.ai. Outbound sales, automated end to end.
                        </h1>
                        <p className="body-lg" style={{ color: TEXT_MUTED, maxWidth: 520, marginBottom: 28 }}>
                            A multi-tenant platform that runs your outbound motion from first touch to booked meeting.
                        </p>
                        <a href={DEMO_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex' }}>
                            Request early access
                        </a>
                    </div>
                    <ResoundHeroVisual />
                </div>
                <style>{`
          @media (max-width: 900px) {
            .rs-hero { grid-template-columns: 1fr !important; }
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
                        Resound connects your CRM and email tools, classifies every reply with AI, captures consent, and uses voice AI to qualify leads and book meetings straight back into your CRM. It is built to scale outbound without scaling the headcount behind it.
                    </p>
                </motion.div>
            </section>

            {/* What Resound does */}
            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 28, textAlign: 'center' }}>What Resound does</h2>
                <motion.div
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: '-10% 0px' }}
                    variants={{
                        hidden: {},
                        show: { transition: { staggerChildren: 0.1 } },
                    }}
                    className="rs-card-grid"
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
            .rs-card-grid { grid-template-columns: 1fr !important; }
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
                    <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>Get early access to Resound</h2>
                    <p style={{ color: TEXT_MUTED, marginBottom: 24, maxWidth: 460, margin: '0 auto 24px' }}>
                        We are onboarding a small set of teams. Tell us about your outbound motion and we will be in touch.
                    </p>
                    <a href={DEMO_HREF} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 28px' }}>
                        Request early access
                    </a>
                </motion.div>
            </section>
        </main>
    )
}
