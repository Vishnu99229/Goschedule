import { X, Check } from 'lucide-react'
import Reveal from './Reveal'

export default function Problem() {
    const traditional = [
        "Generic AI SDR spam that never learned your product",
        "One-size-fits-all sequences that ignore how your buyers respond",
        "Automation deployed before anyone knows what converts",
        "Vanity activity metrics instead of qualified pipeline",
        "Tools that sell access — not accountability for outcomes",
    ];

    const goschedule = [
        "Manual outreach first — we learn your product and prospects by hand",
        "Playbooks built from real replies, objections, and wins",
        "AI agents deployed only after messaging is proven",
        "WhatsApp, email, and voice running the same validated sequence",
        "Accountable for qualified leads — not dashboards",
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-base)' }}>
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-8)' }}>
                        Why Most AI Outreach Doesn&apos;t Convert
                    </h2>
                </Reveal>

                <div className="grid-12">
                    {/* Left: Traditional */}
                    <div className="col-6">
                        <Reveal delayMs={0}>
                        <div className="card">
                            <h3 className="card-title" style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
                                Generic AI SDR Tools
                            </h3>
                            <div className="flex flex-col gap-3">
                                {traditional.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="shrink-0 flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.18)' }}>
                                            <X style={{ width: 16, height: 16, color: 'var(--danger)' }} />
                                        </div>
                                        <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </Reveal>
                    </div>

                    {/* Right: Goschedule */}
                    <div className="col-6">
                        <Reveal delayMs={100}>
                        <div className="card" style={{ position: 'relative' }}>
                            <h3 className="card-title" style={{ marginBottom: 'var(--space-4)', color: 'var(--text-primary)' }}>
                                The GoSchedule Approach
                            </h3>
                            <div className="flex flex-col gap-3" style={{ position: 'relative', zIndex: 1 }}>
                                {goschedule.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="shrink-0 flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.20)' }}>
                                            <Check style={{ width: 16, height: 16, color: 'var(--accent)' }} />
                                        </div>
                                        <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}
