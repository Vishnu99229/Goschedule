import HeroDashboard from './HeroDashboard'
import Reveal from './Reveal'
import AgentDemo from './AgentDemo'
import ClientOnly from './ClientOnly'

const CAPABILITIES = [
  'AI voice agent',
  'WhatsApp automation',
  'Books appointments',
  'Syncs to your CRM',
]

export default function Hero() {
    return (
        <>
        {/* ── Hero: voice/WhatsApp copy left, Live Demo right ── */}
        <section className="section hero" style={{ position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid-12 hero-content">

                    {/* Left: LIVE WORKFLOW copy */}
                    <div className="col-5 hero-copy">
                        <Reveal>
                            <span className="hero-eyebrow">Live Workflow</span>
                            <h1 className="hero-title">
                                Voice and WhatsApp, working as one agent.
                            </h1>
                            <p className="hero-sub">
                                An AI voice agent picks up every inbound call. A WhatsApp automation runs every chat. Every conversation ends with a booked appointment on your calendar.
                            </p>
                            <div className="hero-caps" aria-label="Capabilities">
                                {CAPABILITIES.map((label) => (
                                    <span key={label}>{label}</span>
                                ))}
                            </div>
                        </Reveal>
                    </div>

                    {/* Right: Live Demo (full AgentDemo component) — client-only
                        island so the static prerender doesn't run its browser-only
                        code; mounts and works identically after hydration. */}
                    <div className="col-7 hero-demo-col">
                        <ClientOnly
                            fallback={
                                <div
                                    aria-hidden
                                    style={{ minHeight: 480, width: '100%' }}
                                />
                            }
                        >
                            <AgentDemo />
                        </ClientOnly>
                    </div>

                </div>
            </div>
        </section>

        {/* ── Trusted-by logos — moved here from old standalone Live Demo slot ── */}
        <section className="logos-section">
            <div className="container">
                <p className="logos-label">Trusted by teams shipping outcomes</p>
                <HeroDashboard />
            </div>
        </section>
        </>
    )
}
