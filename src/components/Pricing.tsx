import { Check } from 'lucide-react'
import Reveal from './Reveal'
import { DEPLOY_AGENT_URL } from '../constants/links'

export default function Pricing() {
    const tiers = [
        {
            name: "Starter",
            desc: "Launch one high-leverage agent.",
            price: "$400",
            features: ["Workflow mapping", "Single-agent deployment", "Tool integration setup"],
            cta: "Deploy Starter Agent",
            href: DEPLOY_AGENT_URL,
            external: true,
        },
        {
            name: "Growth",
            desc: "Run multiple revenue workflows.",
            price: "$800",
            features: ["Outbound + inbound agents", "Qualification automation", "Continuous optimization"],
            cta: "Build Agent Stack",
            href: "#book",
            external: false,
        },
        {
            name: "Scale",
            desc: "Agent platform across teams.",
            price: "$1000",
            features: ["Revenue + ops agents", "Voice and workflow automation", "Advanced orchestration layer"],
            cta: "Talk to Us",
            href: "#book",
            external: false,
        }
    ];

    return (
        <section id="pricing" className="section" style={{ background: 'var(--bg-base)' }}>
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                        AI Agent Deployment Plans
                    </h2>
                    <p className="body-lg text-center mx-auto" style={{ maxWidth: 480, marginBottom: 'var(--space-8)' }}>
                        Start with one agent, then expand into a full operating layer across revenue, sales, and operations.
                    </p>
                </Reveal>

                <Reveal stagger className="grid-12">
                    {tiers.map((tier, i) => (
                        <div key={i} className="col-4">
                            <div className="card">
                                <div>
                                    <h3 className="card-title" style={{ marginBottom: 'var(--space-1)' }}>{tier.name}</h3>
                                    <p className="body-sm" style={{ marginBottom: 'var(--space-4)' }}>{tier.desc}</p>
                                    <div className="flex items-center" style={{ marginBottom: 'var(--space-4)', gap: '4px' }}>
                                        <span className="pricing-tier-price">{tier.price}</span>
                                        <span className="body-sm" style={{ alignSelf: 'flex-end', paddingBottom: '6px' }}>/ month</span>
                                    </div>
                                </div>

                                <a
                                    href={tier.href}
                                    target={tier.external ? '_blank' : undefined}
                                    rel={tier.external ? 'noopener noreferrer' : undefined}
                                    className="btn btn-ghost w-full"
                                    style={{ marginBottom: 'var(--space-4)' }}
                                >
                                    {tier.cta}
                                </a>

                                <div className="flex flex-col gap-3 flex-grow">
                                    {tier.features.map((feat, j) => (
                                        <div key={j} className="flex items-center gap-3">
                                            <Check style={{ width: 18, height: 18, color: 'var(--text-tertiary)', flexShrink: 0 }} />
                                            <span style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)' }}>{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}
