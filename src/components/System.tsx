import type { ReactNode } from 'react'
import Reveal from './Reveal'
import { OrganicNetworkIcon, OutboundRadarIcon, QualificationFunnelIcon } from './system-icons/SystemAnimationIcons'

const CARDS: { icon: ReactNode; title: string; desc: ReactNode }[] = [
    {
        icon: <OrganicNetworkIcon />,
        title: 'Organic Positioning Engine',
        desc: (
            <>
                Founders are positioned as authorities by analyzing thousands of high-performing posts in their niche. Powered by{' '}
                <strong>LSTM engagement predictors</strong>, <strong>BERT topic embeddings</strong>, and{' '}
                <strong>GPT-4o content synthesis</strong> — every draft is scored before it goes live.
            </>
        ),
    },
    {
        icon: <OutboundRadarIcon />,
        title: 'Smart AI Outbound',
        desc: (
            <>
                Personalized outreach driven by deep research workflows. A <strong>Q-learning agent</strong> picks the optimal
                channel, message variant, and timing per lead. Built on <strong>multi-agent orchestration</strong>,{' '}
                <strong>Claude Sonnet 4</strong> reasoning, and <strong>vector-embedded prospect memory</strong>.
            </>
        ),
    },
    {
        icon: <QualificationFunnelIcon />,
        title: 'Automated Qualification',
        desc: (
            <>
                Leads filtered against strict SQL criteria using a stacked classification pipeline — <strong>XGBoost</strong> for hard
                signals, <strong>fine-tuned transformers</strong> for intent extraction, and a rule-based override for compliance.
                The model retrains weekly on your closed-won data.
            </>
        ),
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
                            <div className="card" style={{ height: '100%' }}>
                                <div
                                    className="flex items-center justify-center ecosystem-card__icon-wrap"
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 16,
                                        background: 'rgba(139,92,246,0.08)',
                                        border: '1px solid rgba(139,92,246,0.18)',
                                        marginBottom: 'var(--space-4)',
                                    }}
                                >
                                    {card.icon}
                                </div>
                                <h3 className="card-title" style={{ marginBottom: 'var(--space-2)' }}>
                                    {card.title}
                                </h3>
                                <p className="body-lg flex-grow" style={{ marginBottom: 0 }}>
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    )
}
