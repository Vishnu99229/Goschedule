import Reveal from './Reveal'

export default function Results() {
    const metrics = [
        { value: "100+", label: "SQLs Generated" },
        { value: "$0", label: "Ad Spend Required" },
        { value: "3\u20135x", label: "Pipeline Growth" },
        { value: "70%+", label: "Meeting Quality Rate" }
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
