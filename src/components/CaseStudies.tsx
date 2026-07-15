import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'

export default function CaseStudies() {
    return (
        <section className="section" style={{ background: 'var(--bg-base)' }}>
            <div className="container">
                <Reveal>
                    <h2 className="h2 text-center" style={{ marginBottom: 'var(--space-3)' }}>
                        Real Deployments, Real Numbers
                    </h2>
                    <p className="body-lg text-center mx-auto" style={{ maxWidth: 520, marginBottom: 'var(--space-6)' }}>
                        Every agent we ship gets measured. Here is one we can talk about publicly.
                    </p>
                </Reveal>

                <Reveal>
                    <div className="card" style={{ maxWidth: 720, margin: '0 auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                            <div
                                style={{
                                    width: 56,
                                    height: 56,
                                    borderRadius: 10,
                                    border: '1px solid var(--border-subtle)',
                                    background: 'var(--bg-base)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 10,
                                    flexShrink: 0,
                                }}
                            >
                                <img
                                    src="/logos/cafe-muziris.svg"
                                    alt="Cafe Muziris"
                                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                                />
                            </div>
                            <div>
                                <h3 className="card-title" style={{ marginBottom: 4 }}>Cafe Muziris</h3>
                                <p className="body-sm" style={{ margin: 0 }}>Restaurant and hospitality. Bangalore.</p>
                            </div>
                        </div>

                        <div
                            style={{
                                padding: '20px 24px',
                                borderRadius: 12,
                                background: 'var(--bg-base)',
                                border: '1px solid var(--border-subtle)',
                                marginBottom: 20,
                            }}
                        >
                            <div className="results-stat-value" style={{ fontSize: 36, marginBottom: 4 }}>+9%</div>
                            <div className="results-stat-label">Customer footfall increase over 90 days</div>
                        </div>

                        <p className="body-lg" style={{ marginBottom: 24, color: 'var(--text-secondary)' }}>
                            We deployed a voice and WhatsApp agent that handles reservations during peak hours, syncs to a single Google Calendar, and eliminates missed calls. Zero double bookings after week 3.
                        </p>

                        <Link
                            to="/case-studies/cafe-muziris"
                            className="nav-link-plain"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: 15,
                                fontWeight: 500,
                                color: 'var(--accent-text)',
                                textDecoration: 'none',
                            }}
                        >
                            Read the full case study <ArrowRight style={{ width: 16, height: 16 }} />
                        </Link>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
