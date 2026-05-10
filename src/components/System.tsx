import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { OrganicNetworkIcon, OutboundRadarIcon, QualificationFunnelIcon } from './system-icons/SystemAnimationIcons'

const CARDS: { icon: ReactNode; title: string; desc: string; tags: string[] }[] = [
    {
        icon: <OrganicNetworkIcon />,
        title: 'Context Engine',
        desc: 'Every agent ingests your domain, voice, and historical wins via embeddings + fine-tuned models — so it sounds and decides like your best operator.',
        tags: ['LSTM', 'BERT', 'GPT-4o', 'Vector Memory'],
    },
    {
        icon: <OutboundRadarIcon />,
        title: 'Decision Engine',
        desc: 'A multi-agent orchestration layer powered by Q-learning picks the optimal action per task — channel, message, timing, escalation.',
        tags: ['Q-Learning', 'Multi-Agent', 'Claude Sonnet 4', 'Reasoning'],
    },
    {
        icon: <QualificationFunnelIcon />,
        title: 'Outcome Engine',
        desc: 'Stacked classifiers + rule-based overrides ensure every action meets your standards. Models retrain weekly on closed-won data.',
        tags: ['XGBoost', 'Fine-Tuned Transformers', 'Compliance Layer', 'Weekly Retraining'],
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
                        Every Goschedule agent runs on the same infrastructure.
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
