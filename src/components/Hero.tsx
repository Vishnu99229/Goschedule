import { ArrowRight, Play } from 'lucide-react'
import HeroDashboard from './HeroDashboard'
import HeroParallaxBg from './HeroParallaxBg'
import Reveal from './Reveal'

const trustedLogos = [
    'REPLYKARO.AI',
    'ASTRAL LTD',
    'CAFE MUZIRIS',
    'ARROWHEAD.AI',
    'CROWN SECURITY',
]

export default function Hero() {
    return (
        <section className="section hero" style={{ position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid-12 hero-content">

                    {/* Left Column: Content */}
                    <div className="col-6 hero-copy">
                        <HeroParallaxBg />
                        <Reveal>
                            <div className="badge" style={{ marginBottom: 'var(--space-4)' }}>
                                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C3AED' }}></span>
                                Deploying AI agents for revenue, ops &amp; growth
                            </div>

                            <h1 className="hero-title">
                                <span className="hero-title__line1">AI Agents That Run</span>
                                <span className="hero-title__line2">Your Revenue Engine.</span>
                            </h1>

                            <p className="hero-sub">
                                From outbound sales and inbound qualification to operations and back-office workflows — we deploy AI
                                agents that work 24/7, learn continuously, and ship outcomes, not dashboards.
                            </p>

                            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-6)' }}>
                                <a href="#book" className="btn btn-primary btn-hero-primary">
                                    Deploy an AI Agent <ArrowRight style={{ width: 18, height: 18, marginLeft: 8 }} />
                                </a>
                                <a href="#agents" className="btn btn-ghost">
                                    <Play style={{ width: 16, height: 16, marginRight: 8, color: '#A5B4FC' }} /> See Our Agents
                                </a>
                            </div>

                            <div className="trusted-by">
                                <p className="trusted-by__label">
                                    Trusted by founders shipping in production
                                </p>
                                <div className="trusted-by__logos">
                                    {trustedLogos.map((logo, index) => (
                                        <span
                                            key={logo}
                                            className="trusted-by__logo"
                                            style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                                        >
                                            {logo}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Dashboard mockup */}
                    <div className="col-6 hero-visual">
                        <Reveal delayMs={300} className="w-full">
                            <HeroDashboard />
                        </Reveal>
                    </div>

                </div>
            </div>
        </section>
    )
}
