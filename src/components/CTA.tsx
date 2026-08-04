import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { DEPLOY_AGENT_URL } from '../constants/links'

export default function CTA() {
    return (
        <section id="book" className="section section-cta" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <Reveal>
                    <div className="text-center mx-auto" style={{ maxWidth: 900 }}>
                        <h2 className="cta-headline" style={{ marginBottom: 'var(--space-3)' }}>
                            Ready for qualified leads that actually convert?
                        </h2>
                        <p className="body-lg" style={{ marginBottom: 'var(--space-5)', color: 'var(--text-secondary)' }}>
                            Tell us about your product. We&apos;ll start with manual outreach, learn what works, then deploy AI agents to scale it.
                        </p>
                        <a
                            href={DEPLOY_AGENT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-hero-primary cta-button"
                        >
                            Get Qualified Leads <ArrowRight style={{ width: 18, height: 18, marginLeft: 8 }} />
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
