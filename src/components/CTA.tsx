import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function CTA() {
    return (
        <section id="book" className="section section-cta" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Ambient background glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 800,
                height: 800,
                background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 60%)',
                filter: 'blur(80px)',
                pointerEvents: 'none'
            }}></div>

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <Reveal>
                    <div className="text-center mx-auto" style={{ maxWidth: 900 }}>
                        <h2 className="cta-headline" style={{ marginBottom: 'var(--space-4)' }}>
                            Deploy AI Agents Into Real Workflows.<br />
                            <span className="text-gradient">Ship Outcomes, Not Dashboards.</span>
                        </h2>
                        <a href="https://cal.com/vishnu-rajan-3siibd/goschedule" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                            Deploy an AI Agent <ArrowRight style={{ width: 18, height: 18, marginLeft: 8 }} />
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
