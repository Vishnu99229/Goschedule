import { Database, Linkedin, Mic, Inbox, Link2 } from 'lucide-react';

export default function Ecosystem() {
    const tools = [
        { name: "Clay", icon: <Database style={{ width: 24, height: 24 }} />, label: "Data Architecture" },
        { name: "LinkedIn Automation", icon: <Linkedin style={{ width: 24, height: 24 }} />, label: "Organic Distribution" },
        { name: "Voice AI", icon: <Mic style={{ width: 24, height: 24 }} />, label: "Automated Calling" },
        { name: "Email Infrastructure", icon: <Inbox style={{ width: 24, height: 24 }} />, label: "Smart Outbound" },
        { name: "CRM Integration", icon: <Link2 style={{ width: 24, height: 24 }} />, label: "Pipeline Sync" }
    ];

    return (
        <section id="ecosystem" className="section">
            <div className="container">
                <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                    Powered by Modern Revenue Infrastructure
                </h2>
                <p className="body-lg text-center mx-auto" style={{ maxWidth: 560, marginBottom: 'var(--space-8)' }}>
                    We deploy as your AI systems architect. Not an agency running campaigns.
                </p>

                <div className="grid-12" style={{ maxWidth: 1000, margin: '0 auto' }}>
                    {tools.map((tool, i) => (
                        <div key={i} className={i < 3 ? 'col-4' : 'col-6'}>
                            <div className="card flex items-center gap-4" style={{ padding: 'var(--space-3) var(--space-4)', flexDirection: 'row' }}>
                                <div className="shrink-0 flex items-center justify-center" style={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: 14,
                                    background: 'rgba(124,58,237,0.08)',
                                    border: '1px solid rgba(124,58,237,0.12)',
                                    color: '#A5B4FC'
                                }}>
                                    {tool.icon}
                                </div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>{tool.name}</div>
                                    <div className="body-sm">{tool.label}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
