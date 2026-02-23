import { Check } from 'lucide-react';

export default function Pricing() {
    const tiers = [
        {
            name: "Starter",
            desc: "For early stage founders.",
            price: "$400",
            features: ["Outbound system setup", "Organic positioning base", "Performance aligned pricing"],
            cta: "Get Started"
        },
        {
            name: "Growth",
            desc: "Scaling system with content.",
            price: "$800",
            features: ["Full outbound + content engine", "Qualification automation", "Monthly performance model"],
            cta: "Apply Now"
        },
        {
            name: "Scale",
            desc: "Full AI sales engine.",
            price: "$1000",
            features: ["CRM & ATS integration", "Voice AI follow-ups", "Advanced automation stack"],
            cta: "Talk to Us"
        }
    ];

    return (
        <section id="pricing" className="section" style={{ background: 'var(--bg-raised)' }}>
            <div className="container">
                <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                    Performance Based Growth
                </h2>
                <p className="body-lg text-center mx-auto" style={{ maxWidth: 480, marginBottom: 'var(--space-8)' }}>
                    If we don't generate SQLs, you don't pay.
                </p>

                <div className="grid-12">
                    {tiers.map((tier, i) => (
                        <div key={i} className="col-4">
                            <div className="card">
                                <div>
                                    <h3 className="h3" style={{ marginBottom: 'var(--space-1)' }}>{tier.name}</h3>
                                    <p className="body-sm" style={{ marginBottom: 'var(--space-4)' }}>{tier.desc}</p>
                                    <div className="flex items-center" style={{ marginBottom: 'var(--space-4)', gap: '4px' }}>
                                        <span style={{ fontSize: 38, fontWeight: 700, color: '#fff', letterSpacing: '-0.03em' }}>{tier.price}</span>
                                        <span className="body-sm" style={{ alignSelf: 'flex-end', paddingBottom: '6px' }}>/ month</span>
                                    </div>
                                </div>

                                <a href="#book" className="btn btn-ghost w-full" style={{ marginBottom: 'var(--space-4)' }}>
                                    {tier.cta}
                                </a>

                                <div className="flex flex-col gap-3 flex-grow">
                                    {tier.features.map((feat, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <Check style={{ width: 18, height: 18, color: 'var(--text-tertiary)', flexShrink: 0 }} />
                                            <span style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
