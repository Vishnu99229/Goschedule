import HeroDashboard from './HeroDashboard'
import Reveal from './Reveal'
import AgentDemo from './AgentDemo'
import ClientOnly from './ClientOnly'

export default function Hero() {
    return (
        <>
        {/* ── Hero: headline left, Live Demo right ── */}
        <section className="section hero" style={{ position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid-12 hero-content">

                    {/* Left: headline + subtext + channels */}
                    <div className="col-5 hero-copy">
                        <Reveal>
                            <h1 className="hero-title">
                                Qualified Leads from AI Agents — WhatsApp, Email &amp; Voice
                            </h1>
                            <p className="hero-sub">
                                We run your outreach by hand first — learning what actually converts for your product. Then we deploy the agents that scale it.
                            </p>
                            <p className="hero-channels" aria-label="Channels">
                                <span>WhatsApp</span>
                                <span className="hero-channels__sep" aria-hidden="true">·</span>
                                <span>Email</span>
                                <span className="hero-channels__sep" aria-hidden="true">·</span>
                                <span>Voice</span>
                            </p>
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
                <p className="logos-label">Trusted by teams building pipeline</p>
                <HeroDashboard />
            </div>
        </section>
        </>
    )
}
