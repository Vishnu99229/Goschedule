import { ArrowRight, Play } from 'lucide-react'
import HeroDashboard from './HeroDashboard'
import Reveal from './Reveal'

export default function Hero() {
    return (
        <section className="section hero" style={{ position: 'relative' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <div className="grid-12 hero-content">

                    {/* Left Column: Content */}
                    <div className="col-6 hero-copy">
                        <Reveal>
                            <h1 className="hero-title">
                                AI Agents That Run Your Revenue Engine.
                            </h1>

                            <p className="hero-sub">
                                Ship Outcomes, Not Dashboards.
                            </p>

                            <div className="hero-cta-row">
                                <a href="#book" className="btn btn-primary btn-hero-primary">
                                    Deploy an AI Agent <ArrowRight style={{ width: 18, height: 18, marginLeft: 8 }} />
                                </a>
                                <a href="#agents" className="btn btn-ghost btn-hero-secondary">
                                    <Play style={{ width: 16, height: 16, marginRight: 8 }} /> See Our Agents
                                </a>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column: Customer logo wall */}
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
