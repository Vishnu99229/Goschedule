import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { OrganicNetworkIcon, OutboundRadarIcon, QualificationFunnelIcon } from './system-icons/SystemAnimationIcons'

const CARDS: { icon: ReactNode; title: string; tags: string[] }[] = [
    {
        icon: <OrganicNetworkIcon />,
        title: 'Organic Positioning Engine',
        tags: ['LSTM', 'BERT', 'GPT-4o', 'Engagement Predictor'],
    },
    {
        icon: <OutboundRadarIcon />,
        title: 'Smart AI Outbound',
        tags: ['Q-Learning', 'Multi-Agent', 'Claude Sonnet 4', 'Vector Memory'],
    },
    {
        icon: <QualificationFunnelIcon />,
        title: 'Automated Qualification',
        tags: ['XGBoost', 'Fine-Tuned Transformers', 'Rule-Based Override', 'Weekly Retraining'],
    },
]

export default function System() {
    return (
        <section id="approach" className="section">
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-8)' }}>
                        How We Generate SQLs Without Ads
                    </h2>
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
