import { LayoutTemplate, Cpu, Filter } from 'lucide-react';

export default function System() {
    const cards = [
        {
            icon: <LayoutTemplate style={{ width: 28, height: 28, color: '#A5B4FC' }} />,
            title: "Organic Positioning Engine",
            desc: "We position founders as authorities using strategic content and AI distribution channels."
        },
        {
            icon: <Cpu style={{ width: 28, height: 28, color: '#A5B4FC' }} />,
            title: "Smart AI Outbound",
            desc: "Personalized, research-driven outreach powered by intelligent AI data workflows."
        },
        {
            icon: <Filter style={{ width: 28, height: 28, color: '#A5B4FC' }} />,
            title: "Automated Qualification",
            desc: "Leads are filtered and scored against strict SQL criteria before reaching your calendar."
        }
    ];

    return (
        <section id="approach" className="section">
            <div className="container">
                <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-8)' }}>
                    How We Generate SQLs Without Ads
                </h2>

                <div className="grid-12">
                    {cards.map((card, i) => (
                        <div key={i} className="col-4">
                            <div className="card">
                                <div className="flex items-center justify-center" style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 16,
                                    background: 'rgba(124,58,237,0.08)',
                                    border: '1px solid rgba(124,58,237,0.15)',
                                    marginBottom: 'var(--space-4)'
                                }}>
                                    {card.icon}
                                </div>
                                <h3 className="h3" style={{ marginBottom: 'var(--space-2)' }}>{card.title}</h3>
                                <p className="body-lg flex-grow">{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
