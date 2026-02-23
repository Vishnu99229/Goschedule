export default function Results() {
    const metrics = [
        { value: "100+", label: "SQLs Generated" },
        { value: "$0", label: "Ad Spend Required" },
        { value: "3\u20135x", label: "Pipeline Growth" },
        { value: "70%+", label: "Meeting Quality Rate" }
    ];

    return (
        <section className="section" style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="container">
                <div className="grid-12">
                    {metrics.map((m, i) => (
                        <div key={i} className="col-3 text-center">
                            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 'var(--space-2)', color: '#fff' }}>
                                {m.value}
                            </div>
                            <div className="body-sm" style={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                {m.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
