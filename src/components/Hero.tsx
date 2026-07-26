import HeroDashboard from './HeroDashboard'
import AgentDemo from './AgentDemo'
import ClientOnly from './ClientOnly'
import PromptToFlowAnimation, { PromptToFlowStatic } from './PromptToFlowAnimation'

export default function Hero() {
    return (
        <>
        {/* ── Hero: headline left, Live Demo right ── */}
        <section className="section hero" style={{ position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid-12 hero-content">

                    {/* Left: prompt-to-flow animation. The H1 is visually hidden
                        but stays outside the client-only island so it is present
                        in the prerendered HTML for crawlers. */}
                    <div className="col-5 hero-copy">
                        <h1 className="sr-only">
                            Build AI agents with a prompt. GoSchedule.ai turns your workflow
                            ideas into working automations.
                        </h1>
                        <ClientOnly fallback={<PromptToFlowStatic />}>
                            <PromptToFlowAnimation />
                        </ClientOnly>
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
