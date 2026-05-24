import { Database, Linkedin, Mic, Inbox, Link2 } from 'lucide-react'
import Reveal from './Reveal'

export default function Ecosystem() {
    const tools = [
        {
            name: 'Clay',
            icon: <Database style={{ width: 24, height: 24 }} />,
            label: 'Data Architecture',
            more: '+ 8 enrichment tools',
        },
        {
            name: 'LinkedIn Automation',
            icon: <Linkedin style={{ width: 24, height: 24 }} />,
            label: 'Organic Distribution',
            more: '+ 4 cadence tools',
        },
        {
            name: 'Voice AI',
            icon: <Mic style={{ width: 24, height: 24 }} />,
            label: 'Automated Calling',
            more: '+ Replykaro, Vapi, ElevenLabs',
        },
        {
            name: 'Email Infrastructure',
            icon: <Inbox style={{ width: 24, height: 24 }} />,
            label: 'Smart Outbound',
            more: '+ Smartlead, Instantly, Lemlist',
        },
        {
            name: 'CRM Integration',
            icon: <Link2 style={{ width: 24, height: 24 }} />,
            label: 'Pipeline Sync',
            more: '+ HubSpot, Salesforce, Pipedrive, Attio',
        },
    ]

    return (
        <section id="ecosystem" className="section">
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                        Powered by Modern Agent Infrastructure
                    </h2>
                    <p className="body-lg text-center mx-auto" style={{ maxWidth: 560, marginBottom: 'var(--space-8)' }}>
                        We deploy as your AI systems architect, wiring agents into the tools your team already uses.
                    </p>
                </Reveal>

                <Reveal stagger className="grid-12" style={{ maxWidth: 1000, margin: '0 auto' }}>
                    {tools.map((tool, i) => (
                        <div key={i} className={i < 3 ? 'col-4' : 'col-6'}>
                            <div
                                className="card ecosystem-card flex items-center gap-4"
                                style={{ padding: 'var(--space-3) var(--space-4)', flexDirection: 'row' }}
                            >
                                <span className="ecosystem-more" aria-label={`More tools: ${tool.more}`}>
                                    {tool.more}
                                </span>
                                <div
                                    className="shrink-0 flex items-center justify-center ecosystem-card__icon-wrap"
                                    style={{
                                        width: 48,
                                        height: 48,
                                        borderRadius: 12,
                                        background: 'rgba(139,92,246,0.10)',
                                        border: '1px solid rgba(139,92,246,0.20)',
                                        color: 'var(--accent)',
                                    }}
                                >
                                    {tool.icon}
                                </div>
                                <div style={{ minWidth: 0 }}>
                                    <div className="card-title ecosystem-card__name">{tool.name}</div>
                                    <div className="body-sm">{tool.label}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Reveal>

                <Reveal>
                    <p className="ecosystem-tagline">We don't pick favorites. We architect what fits your stack.</p>
                </Reveal>
            </div>
        </section>
    )
}
