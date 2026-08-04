import Reveal from './Reveal'

export default function Results() {
    const metrics = [
        { value: "Manual-first", label: "Before any automation" },
        { value: "3 channels", label: "WhatsApp · Email · Voice" },
        { value: "Proven", label: "Playbooks before scale" },
        { value: "Qualified", label: "Leads — not vanity metrics" }
    ]

    return (
        <section className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="container">
                <Reveal stagger className="grid-12">
                    {metrics.map((m, i) => (
                        <div key={i} className="col-3 text-center">
                            <div className="results-stat-value">
                                {m.value}
                            </div>
                            <div className="results-stat-label">
                                {m.label}
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}
