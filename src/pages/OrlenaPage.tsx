import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useCountUp } from '../hooks/useCountUp'

const ACCENT = '#8b5cf6'
const ACCENT_SOFT = '#a78bfa'
const BG = '#050508'
const TEXT = '#ffffff'
const TEXT_MUTED = '#a1a1aa'

function QrMorphVisual() {
    return (
        <div style={{ width: '100%', maxWidth: 320, height: 220, position: 'relative', margin: '0 auto' }}>
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                animate={{ opacity: [1, 0, 0, 1], scale: [1, 0.88, 0.88, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.32, 0.38, 1] }}
            >
                <svg width={160} height={160} viewBox="0 0 64 64" aria-hidden>
                    <defs>
                        <linearGradient id="orQr" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor={ACCENT} />
                            <stop offset="100%" stopColor={ACCENT_SOFT} />
                        </linearGradient>
                    </defs>
                    {Array.from({ length: 64 }, (_, i) => {
                        const r = Math.floor(i / 8)
                        const c = i % 8
                        const on =
                            (r < 3 && c < 3) ||
                            (r < 3 && c > 4) ||
                            (r > 4 && c < 3) ||
                            (r > 2 && r < 5 && c > 2 && c < 5) ||
                            (r % 2 === 0 && c % 2 === 0 && r > 4 && c > 4)
                        if (!on) return null
                        return (
                            <rect
                                key={`${r}-${c}`}
                                x={4 + c * 7}
                                y={4 + r * 7}
                                width={5}
                                height={5}
                                rx={1}
                                fill="url(#orQr)"
                            />
                        )
                    })}
                </svg>
            </motion.div>
            <motion.div
                style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 8px',
                }}
                animate={{ opacity: [0, 1, 1, 0], scale: [0.9, 1, 1, 0.92] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', times: [0, 0.32, 0.38, 1] }}
            >
                <div
                    style={{
                        background: 'linear-gradient(145deg, rgba(139,92,246,0.35) 0%, rgba(55,48,100,0.55) 100%)',
                        border: `1px solid rgba(139,92,246,0.35)`,
                        borderRadius: 18,
                        padding: '16px 18px',
                        maxWidth: 280,
                        boxShadow: `0 0 40px rgba(139,92,246,0.2)`,
                    }}
                >
                    <p style={{ color: TEXT, fontSize: 14, lineHeight: 1.5, margin: 0 }}>
                        Try our hazelnut latte with that croissant?
                    </p>
                    <div style={{ marginTop: 8, fontSize: 11, color: ACCENT_SOFT }}>Suggested by Orlena</div>
                </div>
            </motion.div>
        </div>
    )
}

function StepCard({
    step,
    title,
    children,
}: {
    step: string
    title: string
    children: React.ReactNode
}) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-12% 0px' })
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(139,92,246,0.15)',
                borderRadius: 20,
                padding: 28,
                height: '100%',
            }}
        >
            <div style={{ fontSize: 12, fontWeight: 600, color: ACCENT, letterSpacing: '0.12em', marginBottom: 12 }}>{step}</div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: TEXT, marginBottom: 16 }}>{title}</h3>
            <div style={{ display: 'flex', justifyContent: 'center', minHeight: 120 }}>{children}</div>
        </motion.div>
    )
}

function PhoneQrPreview() {
    return (
        <div style={{ position: 'relative', width: 100, margin: '0 auto' }}>
            <div
                style={{
                    borderRadius: 24,
                    border: '2px solid rgba(139,92,246,0.3)',
                    padding: 12,
                    background: '#0a0a0a',
                }}
            >
                <div style={{ width: 64, height: 64, background: '#111', borderRadius: 8, margin: '0 auto' }} />
            </div>
            <motion.div
                style={{
                    position: 'absolute',
                    inset: -6,
                    border: `2px solid ${ACCENT}`,
                    borderRadius: 28,
                    opacity: 0.5,
                }}
                animate={{ opacity: [0.35, 0.85, 0.35], scale: [1, 1.02, 1] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    )
}

function BrainNodesPreview() {
    const nodes = [
        { x: 50, y: 18 },
        { x: 22, y: 48 },
        { x: 78, y: 48 },
        { x: 50, y: 72 },
    ]
    const edges = [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 3],
        [1, 2],
    ]
    return (
        <svg width={100} height={100} viewBox="0 0 100 100">
            <defs>
                <linearGradient id="brainG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={ACCENT} />
                    <stop offset="100%" stopColor={ACCENT_SOFT} />
                </linearGradient>
            </defs>
            {edges.map(([a, b], i) => (
                <motion.line
                    key={`${a}-${b}`}
                    x1={nodes[a].x}
                    y1={nodes[a].y}
                    x2={nodes[b].x}
                    y2={nodes[b].y}
                    stroke="url(#brainG)"
                    strokeWidth={1}
                    animate={{ opacity: [0.2, 0.75, 0.2] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.12 }}
                />
            ))}
            {nodes.map((n, i) => (
                <motion.circle
                    key={i}
                    cx={n.x}
                    cy={n.y}
                    r={6}
                    fill={ACCENT}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                />
            ))}
        </svg>
    )
}

function UpsellBubblePreview() {
    return (
        <motion.div
            style={{
                background: 'linear-gradient(180deg, rgba(139,92,246,0.25) 0%, rgba(40,30,70,0.6) 100%)',
                border: `1px solid rgba(139,92,246,0.35)`,
                borderRadius: 14,
                padding: '10px 14px',
                maxWidth: 200,
                margin: '0 auto',
            }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, damping: 22 }}
        >
            <p style={{ margin: 0, fontSize: 12, color: TEXT }}>Add cold foam +₹40?</p>
        </motion.div>
    )
}

function StatsStrip() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10% 0px' })
    const aov = useCountUp(23, inView)
    const setup = useCountUp(30, inView)

    return (
        <motion.section
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '40px 0',
                marginTop: 48,
            }}
        >
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 24,
                    textAlign: 'center',
                    maxWidth: 900,
                    margin: '0 auto',
                }}
                className="orlena-stats-grid"
            >
                <div>
                    <div style={{ fontSize: 44, fontWeight: 700, color: TEXT, letterSpacing: '-0.03em' }}>
                        {aov}%
                    </div>
                    <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 4 }}>higher AOV</div>
                </div>
                <div>
                    <div style={{ fontSize: 44, fontWeight: 700, color: TEXT, letterSpacing: '-0.03em' }}>0</div>
                    <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 4 }}>staff training</div>
                </div>
                <div>
                    <div style={{ fontSize: 44, fontWeight: 700, color: TEXT, letterSpacing: '-0.03em' }}>
                        {setup} sec
                    </div>
                    <div style={{ fontSize: 13, color: TEXT_MUTED, marginTop: 4 }}>setup</div>
                </div>
            </div>
            <style>{`
        @media (max-width: 600px) {
          .orlena-stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </motion.section>
    )
}

export default function OrlenaPage() {
    return (
        <main style={{ background: BG, color: TEXT, minHeight: '80vh', paddingTop: 48, paddingBottom: 100 }}>
            {/* Hero */}
            <section className="container" style={{ paddingBottom: 72 }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 48,
                        alignItems: 'center',
                    }}
                    className="orlena-hero-grid"
                >
                    <div>
                        <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 48px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                            AI QR menus that increase café revenue by 23%
                        </h1>
                        <p className="body-lg" style={{ color: TEXT_MUTED, maxWidth: 520, marginBottom: 28 }}>
                            Plug Orlena into your QR menu. No staff training. Customers see smart, personalized upsells at every
                            order — like a great server, working at every table simultaneously.
                        </p>
                        <a
                            href="https://orlena.talk"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{ display: 'inline-flex' }}
                        >
                            See it in action
                        </a>
                    </div>
                    <QrMorphVisual />
                </div>
                <style>{`
          @media (max-width: 900px) {
            .orlena-hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </section>

            {/* How it works */}
            <section className="container" style={{ paddingBottom: 32 }}>
                <h2 style={{ fontSize: 28, fontWeight: 600, marginBottom: 32, textAlign: 'center' }}>How it works</h2>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3,1fr)',
                        gap: 20,
                    }}
                    className="orlena-steps"
                >
                    <StepCard step="STEP 1" title="Customer scans QR">
                        <PhoneQrPreview />
                    </StepCard>
                    <StepCard step="STEP 2" title="AI analyzes order context">
                        <BrainNodesPreview />
                    </StepCard>
                    <StepCard step="STEP 3" title="Smart upsell appears">
                        <UpsellBubblePreview />
                    </StepCard>
                </div>
                <style>{`
          @media (max-width: 900px) {
            .orlena-steps { grid-template-columns: 1fr !important; }
          }
        `}</style>
            </section>

            <div className="container">
                <StatsStrip />
            </div>

            {/* CTA */}
            <section className="container" style={{ paddingTop: 64 }}>
                <motion.div
                    style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        borderRadius: 24,
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(30,27,50,0.9) 100%)',
                        border: '1px solid rgba(139,92,246,0.25)',
                    }}
                    initial={{ opacity: 0.6, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 12 }}>Get a free missed-revenue calculation for your café</h2>
                    <p style={{ color: TEXT_MUTED, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
                        See what Orlena could recover on your current traffic — no commitment.
                    </p>
                    <a
                        href="https://hello.orlena.talk/calculator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                        style={{ fontSize: 17, padding: '14px 28px' }}
                    >
                        Start calculator
                    </a>
                </motion.div>
            </section>
        </main>
    )
}
