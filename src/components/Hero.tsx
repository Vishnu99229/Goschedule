import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
    return (
        <section className="section" style={{ paddingTop: '160px' }}>
            <div className="container">
                <div className="grid-12" style={{ alignItems: 'center' }}>

                    {/* Left Column: Content */}
                    <div className="col-6">
                        <div className="badge" style={{ marginBottom: 'var(--space-4)' }}>
                            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }}></span>
                            Helping B2B founders grow without ad spend
                        </div>

                        <h1 className="h1" style={{ marginBottom: 'var(--space-3)' }}>
                            Sales Qualified Leads. <br />
                            <span style={{ color: 'var(--text-tertiary)' }}>Or You Don't Pay.</span>
                        </h1>

                        <p className="body-lg" style={{ marginBottom: 'var(--space-5)', maxWidth: '480px' }}>
                            We build organic, AI-powered sales systems that generate real SQLs without burning thousands on ads.
                        </p>

                        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-8)' }}>
                            <a href="#book" className="btn btn-primary">
                                Get Qualified Leads <ArrowRight style={{ width: 18, height: 18, marginLeft: 8 }} />
                            </a>
                            <a href="#approach" className="btn btn-ghost">
                                <Play style={{ width: 16, height: 16, marginRight: 8, color: '#A5B4FC' }} /> See How It Works
                            </a>
                        </div>

                        {/* Trust Line */}
                        <div>
                            <p className="body-sm" style={{ marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 12 }}>
                                Trusted by founders and operators
                            </p>
                            <div className="flex items-center gap-5" style={{ opacity: 0.35 }}>
                                <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.03em' }}>SaaSWorks</span>
                                <span style={{ fontSize: 16, fontWeight: 700, fontStyle: 'italic' }}>VentureScale</span>
                                <span style={{ fontSize: 16, fontWeight: 700, fontFamily: 'monospace' }}>AcmeTech</span>
                                <span style={{ fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Apex</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Gradient Orb Visual */}
                    <div className="col-6" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}>
                        <div className="gradient-orb"></div>
                        {/* Subtle grid overlay on orb area */}
                        <div style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
                            backgroundSize: '48px 48px',
                            borderRadius: '50%',
                            maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                        }}></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
