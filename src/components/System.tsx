import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { OrganicNetworkIcon, OutboundRadarIcon, QualificationFunnelIcon } from './system-icons/SystemAnimationIcons'

const CARDS: { icon: ReactNode; title: string; desc: string; tags: string[] }[] = [
    {
        icon: <OrganicNetworkIcon />,
        title: 'Conversation Layer',
        desc: 'Voice agents built on Vapi with Indian English and Hinglish support. WhatsApp automations via Twilio and Meta Cloud API. Each conversation is routed through Claude Sonnet for reasoning, with fallback prompts for reliability.',
        tags: ['Vapi', 'Twilio', 'Meta WhatsApp API', 'Claude Sonnet 4.5'],
    },
    {
        icon: <OutboundRadarIcon />,
        title: 'Orchestration Layer',
        desc: 'Workflows run on self-hosted n8n with Instance-level MCP exposed to LLM clients. Every agent action, from calendar booking to CRM update, runs as a modular workflow with typed inputs and error handling.',
        tags: ['n8n', 'MCP', 'Railway', 'Webhooks'],
    },
    {
        icon: <QualificationFunnelIcon />,
        title: 'Data and Integrations Layer',
        desc: 'Structured data lives in Supabase and Google Sheets. CRM enrichment via Apollo. Calendar sync via Google Calendar API. Every conversation, booking, and outcome is logged and queryable for continuous improvement.',
        tags: ['Supabase', 'Apollo', 'Google Calendar', 'Google Sheets'],
    },
]

export default function System() {
    return (
        <section id="approach" className="section">
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                        How Our Agents Work
                    </h2>
                    <p className="body-lg text-center mx-auto" style={{ maxWidth: 620, marginBottom: 'var(--space-8)' }}>
                        Every Goschedule agent runs on the same production stack. No proprietary black boxes. Real tools, real observability, real reliability.
                    </p>
                </Reveal>

                <Reveal stagger className="grid-12">
                    {CARDS.map((card, i) => (
                        <div key={i} className="col-4">
                            <div className="system-card">
                                <div className="system-card__animation">
                                    {card.icon}
                                </div>
                                <h3 className="system-card__title">
                                    {card.title}
                                </h3>
                                <p className="system-card__description">{card.desc}</p>
                                <div className="system-card__tags" aria-label={`${card.title} technologies`}>
                                    {card.tags.map((tag) => (
                                        <span key={tag} className="system-tag">
                                            {tag}
                                        </span>
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
