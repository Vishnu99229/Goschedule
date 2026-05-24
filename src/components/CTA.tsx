import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function CTA() {
    return (
        <section id="book" className="section section-cta" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <Reveal>
                    <div className="text-center mx-auto" style={{ maxWidth: 900 }}>
                        <h2 className="cta-headline" style={{ marginBottom: 'var(--space-4)' }}>
                            Deploy AI Agents Into Real Workflows.<br />
                            <span className="text-accent">Ship Outcomes, Not Dashboards.</span>
                        </h2>
                        <a
                            href="https://cal.com/vishnu-rajan-3siibd/goschedule"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-hero-primary cta-button"
                        >
                            Deploy an AI Agent <ArrowRight style={{ width: 18, height: 18, marginLeft: 8 }} />
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
