import { ArrowRight, Play } from 'lucide-react'
import HeroDashboard from './HeroDashboard'
import HeroParallaxBg from './HeroParallaxBg'
import Reveal from './Reveal'

export default function Hero() {
    return (
        <section className="section" style={{ paddingTop: '160px', position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid-12" style={{ alignItems: 'center' }}>

                    {/* Left Column: Content */}
                    <div className="col-6" style={{ position: 'relative', zIndex: 1 }}>
                        <HeroParallaxBg />
                        <Reveal>
                            <div className="badge" style={{ marginBottom: 'var(--space-4)' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }}></span>
                                Helping B2B founders grow without ad spend
                            </div>

                            <h1 className="h1" style={{ marginBottom: 'var(--space-3)' }}>
                                Sales Qualified Leads. <br />
                                <span style={{ color: 'var(--text-tertiary)' }}>Or You Don't Pay.</span>
                            </h1>

                            <p className="body-lg" style={{ marginBottom: 'var(--space-5)', maxWidth: '520px' }}>
                                We build organic, AI-powered sales systems that generate real SQLs. No ads, no per-lead pricing,
                                no spray-and-pray.
                            </p>

                            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-6)' }}>
                                <a href="#book" className="btn btn-primary">
                                    Get Qualified Leads <ArrowRight style={{ width: 18, height: 18, marginLeft: 8 }} />
                                </a>
                                <a href="#approach" className="btn btn-ghost">
                                    <Play style={{ width: 16, height: 16, marginRight: 8, color: '#A5B4FC' }} /> See How It Works
                                </a>
                            </div>

                            <div className="trusted-by-section">
                                <p className="body-sm" style={{ marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: 12 }}>
                                    Trusted by founders shipping in production
                                </p>
                                <div className="trusted-by-list">
                                    <span className="trusted-by-item" style={{ animationDelay: '0.1s' }}>Replyka.ai</span>
                                    <span className="trusted-by-item" style={{ animationDelay: '0.15s' }}>Astral Ltd</span>
                                    <span className="trusted-by-item" style={{ animationDelay: '0.2s' }}>Cafe Muziris</span>
                                    <span className="trusted-by-item" style={{ animationDelay: '0.25s' }}>Arrowhead.ai</span>
                                    <span className="trusted-by-item" style={{ animationDelay: '0.3s' }}>eShipz</span>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Dashboard mockup */}
                    <div className="col-6" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}>
                        <Reveal delayMs={300} className="w-full">
                            <HeroDashboard />
                        </Reveal>
                    </div>

                </div>
            </div>
        </section>
    )
}
