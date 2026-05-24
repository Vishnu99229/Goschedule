import { X, Check } from 'lucide-react'
import Reveal from './Reveal'

export default function Problem() {
    const traditional = [
        "Manual processes buried across tools",
        "Teams waiting on humans for every handoff",
        "Generic automations that break outside scripts",
        "Data stuck in inboxes, calls, CRMs, and sheets",
        "Dashboards that report work instead of doing it"
    ];

    const goschedule = [
        "AI agents deployed into your live workflows",
        "Revenue, sales, ops, and admin processes handled 24/7",
        "Tool-integrated agents that act across your stack",
        "Continuous learning from outcomes and operator feedback",
        "Business processes shipped end to end"
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-base)' }}>
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-8)' }}>
                        Why Most B2B Teams Still Run On Manual Work
                    </h2>
                </Reveal>

                <div className="grid-12">
                    {/* Left: Traditional */}
                    <div className="col-6">
                        <Reveal delayMs={0}>
                        <div className="card">
                            <h3 className="card-title" style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
                                Manual Operating Model
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
                                The Goschedule Agent Model
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
