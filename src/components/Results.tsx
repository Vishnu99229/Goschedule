import Reveal from './Reveal'

export default function Results() {
    const metrics = [
        { value: "24/7", label: "Agent Coverage" },
        { value: "6+", label: "Agent Categories" },
        { value: "3\u20135x", label: "Workflow Throughput" },
        { value: "End-to-end", label: "Process Ownership" }
    ]

    return (
        <section className="section" style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
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
