import { X, Check } from 'lucide-react'
import Reveal from './Reveal'

export default function Problem() {
    const traditional = [
        "High ad spend with low quality leads",
        "SDRs calling unqualified prospects",
        "Manual outreach with low response rates",
        "Marketing that generates MQLs but not SQLs",
        "No accountability on outcomes"
    ];

    const goschedule = [
        "AI powered lead research at scale",
        "Hyper personalized outbound sequences",
        "Organic positioning and authority building",
        "Automated qualification filtering",
        "Sales ready conversations only"
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-raised)' }}>
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-8)' }}>
                        Why Most B2B Companies Burn Cash
                    </h2>
                </Reveal>

                <div className="grid-12">
                    {/* Left: Traditional */}
                    <div className="col-6">
                        <Reveal delayMs={0}>
                        <div className="card" style={{ background: 'var(--bg-base)' }}>
                            <h3 className="h3" style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
                                Traditional Agency Model
                            </h3>
                            <div className="flex flex-col gap-3">
                                {traditional.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="shrink-0 flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(239,68,68,0.1)' }}>
                                            <X style={{ width: 16, height: 16, color: '#EF4444' }} />
                                        </div>
                                        <span style={{ fontSize: 16, color: 'var(--text-secondary)' }}>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </Reveal>
                    </div>

                    {/* Right: Goschedule */}
                    <div className="col-6">
                        <Reveal delayMs={100}>
                        <div className="card" style={{ borderColor: 'rgba(124,58,237,0.15)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                            <h3 className="h3" style={{ marginBottom: 'var(--space-4)', color: '#fff' }}>
                                The Goschedule Model
                            </h3>
                            <div className="flex flex-col gap-3" style={{ position: 'relative', zIndex: 1 }}>
                                {goschedule.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="shrink-0 flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(124,58,237,0.12)' }}>
                                            <Check style={{ width: 16, height: 16, color: '#A5B4FC' }} />
                                        </div>
                                        <span style={{ fontSize: 16, color: 'var(--text-primary)' }}>{item}</span>
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
