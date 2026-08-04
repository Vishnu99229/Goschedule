import { useState } from 'react'
import { Check } from 'lucide-react'
import Reveal from './Reveal'
import { DEPLOY_AGENT_URL } from '../constants/links'

type Currency = 'USD' | 'INR'

const TIERS = [
    {
        name: 'Starter',
        desc: 'Launch one high-leverage agent.',
        usdPrice: '$400',
        inrSetup: '₹40,000',
        inrPrice: '₹35,000',
        features: ['Workflow mapping', 'Single-agent deployment', 'Tool integration setup'],
        cta: 'Deploy Starter Agent',
        href: DEPLOY_AGENT_URL,
        external: true,
    },
    {
        name: 'Growth',
        desc: 'Scale proven outreach across channels.',
        usdPrice: '$800',
        inrSetup: '₹75,000',
        inrPrice: '₹65,000',
        features: ['Outbound + inbound agents', 'Qualification automation', 'Continuous optimization'],
        cta: 'Build Agent Stack',
        href: '#book',
        external: false,
    },
    {
        name: 'Scale',
        desc: 'Multi-channel qualified-lead engine.',
        usdPrice: '$1000',
        inrSetup: '₹1,50,000',
        inrPrice: '₹85,000',
        features: ['WhatsApp + email + voice agents', 'Voice and workflow automation', 'Advanced orchestration layer'],
        cta: 'Talk to Us',
        href: '#book',
        external: false,
    },
]

export default function Pricing() {
    const [currency, setCurrency] = useState<Currency>('USD')

    return (
        <section id="pricing" className="section" style={{ background: 'var(--bg-base)' }}>
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                        Plans for qualified-lead generation
                    </h2>
                    <p className="body-lg text-center mx-auto" style={{ maxWidth: 520, marginBottom: 'var(--space-5)' }}>
                        Start with manual outreach and one proven agent, then expand across WhatsApp, email, and voice as the playbook scales.
                    </p>

                    <div
                        className="pricing-currency-toggle"
                        role="tablist"
                        aria-label="Pricing currency"
                        style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 'var(--space-6)' }}
                    >
                        {(['USD', 'INR'] as const).map((c) => (
                            <button
                                key={c}
                                type="button"
                                role="tab"
                                aria-selected={currency === c}
                                aria-controls={`pricing-panel-${c}`}
                                id={`pricing-tab-${c}`}
                                onClick={() => setCurrency(c)}
                                className={`pricing-currency-toggle__btn${currency === c ? ' pricing-currency-toggle__btn--active' : ''}`}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </Reveal>

                <Reveal stagger className="grid-12">
                    {TIERS.map((tier, i) => (
                        <div key={i} className="col-4">
                            <div className="card" id={`pricing-panel-${currency}`} role="tabpanel" aria-labelledby={`pricing-tab-${currency}`}>
                                <div>
                                    <h3 className="card-title" style={{ marginBottom: 'var(--space-1)' }}>{tier.name}</h3>
                                    <p className="body-sm" style={{ marginBottom: 'var(--space-4)' }}>{tier.desc}</p>

                                    {currency === 'INR' ? (
                                        <>
                                            <p className="body-sm" style={{ marginBottom: 8, color: 'var(--text-muted)' }}>
                                                One-time setup: <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{tier.inrSetup}</strong>
                                            </p>
                                            <div className="flex items-center" style={{ marginBottom: 8, gap: '4px' }}>
                                                <span className="pricing-tier-price">{tier.inrPrice}</span>
                                                <span className="body-sm" style={{ alignSelf: 'flex-end', paddingBottom: '6px' }}>/ month</span>
                                            </div>
                                            <p className="body-sm" style={{ marginBottom: 'var(--space-4)', color: 'var(--text-muted)', fontSize: 12 }}>
                                                GST invoice provided. Payment via UPI or bank transfer.
                                            </p>
                                        </>
                                    ) : (
                                        <div className="flex items-center" style={{ marginBottom: 'var(--space-4)', gap: '4px' }}>
                                            <span className="pricing-tier-price">{tier.usdPrice}</span>
                                            <span className="body-sm" style={{ alignSelf: 'flex-end', paddingBottom: '6px' }}>/ month</span>
                                        </div>
                                    )}
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
