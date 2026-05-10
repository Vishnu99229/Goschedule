import type { ReactNode } from 'react'
import Reveal from './Reveal'
import {
    AssistantAgentIcon,
    CustomAgentIcon,
    InboundAgentIcon,
    OperationsAgentIcon,
    OutboundAgentIcon,
    RevenueOpsAgentIcon,
} from './system-icons/AgentIcons'

const agentCategories: {
    id: string
    icon: ReactNode
    title: string
    tagline: string
    description: string
    examples: string[]
}[] = [
    {
        id: 'outbound-agent',
        icon: <OutboundAgentIcon />,
        title: 'Outbound Sales Agents',
        tagline: 'Cold outreach that books meetings',
        description: 'Personalized email + LinkedIn + WhatsApp campaigns that learn from every reply.',
        examples: ['Email sequences', 'LinkedIn DMs', 'Cold call dialing'],
    },
    {
        id: 'inbound-agent',
        icon: <InboundAgentIcon />,
        title: 'Inbound Qualification Agents',
        tagline: 'Never miss a lead, 24/7',
        description: 'AI that answers calls and WhatsApp instantly, qualifies prospects, and books meetings.',
        examples: ['Call handling', 'WhatsApp replies', 'Lead scoring'],
    },
    {
        id: 'revenue-agent',
        icon: <RevenueOpsAgentIcon />,
        title: 'Revenue Ops Agents',
        tagline: 'Pipeline that updates itself',
        description: 'Agents that enrich CRM, score leads, route opportunities, and forecast revenue.',
        examples: ['CRM enrichment', 'Pipeline hygiene', 'Forecasting'],
    },
    {
        id: 'ops-agent',
        icon: <OperationsAgentIcon />,
        title: 'Operations Agents',
        tagline: 'Back-office on autopilot',
        description: 'Automate invoicing, vendor coordination, inventory checks, and internal workflows.',
        examples: ['Invoice processing', 'Vendor ops', 'Inventory sync'],
    },
    {
        id: 'assistant-agent',
        icon: <AssistantAgentIcon />,
        title: 'Executive Assistant Agents',
        tagline: 'A chief of staff for every leader',
        description: 'Calendar, email triage, meeting briefings, and follow-ups — handled before you ask.',
        examples: ['Calendar management', 'Email triage', 'Meeting prep'],
    },
    {
        id: 'custom-agent',
        icon: <CustomAgentIcon />,
        title: 'Custom Process Agents',
        tagline: 'Built for your workflow',
        description: "If it's repetitive, structured, and high-leverage — we'll build an agent for it.",
        examples: ['Domain-specific', 'Multi-step', 'Tool-integrated'],
    },
]

export default function Agents() {
    return (
        <section id="agents" className="agents-section">
            <Reveal>
                <h2 className="agents-section__title">Our AI Agents</h2>
                <p className="agents-section__subtitle">
                    We deploy AI agents that run revenue, sales, operations, and other critical business processes — end to end.
                </p>
            </Reveal>

            <Reveal stagger className="agents-grid">
                {agentCategories.map((agent) => (
                    <article key={agent.id} id={agent.id} className="agent-card">
                        <div className="agent-card__icon">{agent.icon}</div>
                        <h3 className="agent-card__title">{agent.title}</h3>
                        <p className="agent-card__tagline">{agent.tagline}</p>
                        <p className="agent-card__description">{agent.description}</p>
                        <div className="agent-card__examples">
                            {agent.examples.map((example) => (
                                <span key={example} className="agent-card__example">
                                    {example}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </Reveal>
        </section>
    )
}
