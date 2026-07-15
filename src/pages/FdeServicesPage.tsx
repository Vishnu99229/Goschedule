import { motion } from 'framer-motion'
import { ArrowRight, Settings2 } from 'lucide-react'
import SEO from '../components/SEO'
import { DEPLOY_AGENT_URL } from '../constants/links'

const BG = '#FAF8F4'
const TEXT = '#1A1614'
const TEXT_MUTED = '#57514A'
const SURFACE_LIGHT = '#F2EEE6'
const BORDER_LIGHT = '#E5DFD3'

const WHO_CARDS = [
    {
        title: 'Series A to Series C startups',
        body: 'Founders who need production AI agents shipped in weeks, not quarters, and cannot afford to hire a full ML team.',
    },
    {
        title: 'Growth-stage services firms',
        body: 'Agencies, clinics, and B2B services teams with real revenue at stake, drowning in manual sales and ops work.',
    },
    {
        title: 'Enterprise pilots',
        body: 'Teams running a scoped 90-day pilot to prove agent ROI before committing to internal build.',
    },
]

const ENGAGEMENT_STEPS = [
    {
        label: 'Week 1',
        body: 'Workflow mapping and agent scope. We sit with your operators, document the exact process, and pick the single highest-leverage agent to build first.',
    },
    {
        label: 'Week 2 to 4',
        body: 'Build and shadow deploy. We build the agent, wire it into your stack, and run it in shadow mode against real conversations. Your team reviews every output.',
    },
    {
        label: 'Week 5 to 8',
        body: 'Live rollout with weekly iterations. Agent goes live on a subset of traffic. We iterate weekly based on real outcomes, not assumptions.',
    },
    {
        label: 'Week 9 onward',
        body: 'Ownership handoff or ongoing retainer. Your team either takes ownership with documentation and training, or we continue as your embedded agent team.',
    },
]

function FooterCta() {
    return (
        <section className="section section-cta" style={{ paddingTop: 48 }}>
            <div className="container">
                <motion.div
                    style={{
                        textAlign: 'center',
                        padding: '48px 24px',
                        borderRadius: 24,
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.10) 0%, rgba(124,58,237,0.02) 100%)',
                        border: '1px solid rgba(124,58,237,0.22)',
                    }}
                    initial={{ opacity: 0.7, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>Ready to embed AI into your workflows?</h2>
                    <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 28px', display: 'inline-flex', gap: 8 }}>
                        Book a scoping call <ArrowRight style={{ width: 18, height: 18 }} />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default function FdeServicesPage() {
    return (
        <main style={{ background: BG, color: TEXT, minHeight: '80vh', paddingTop: 48, paddingBottom: 0 }}>
            <SEO
                title="FDE Services — Goschedule.ai"
                description="Forward Deployed Engineering. We embed with your team, deploy AI agents into your live workflows, and stay on until outcomes ship."
                canonical="https://www.goschedule.ai/products/fde-services"
            />

            <section className="container" style={{ paddingBottom: 56 }}>
                <div style={{ maxWidth: 720 }}>
                    <div className="badge" style={{ marginBottom: 18 }}>Forward Deployed Engineering</div>
                    <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                        Forward Deployed Engineering for AI Agents
                    </h1>
                    <p className="body-lg" style={{ color: TEXT_MUTED, maxWidth: 600, marginBottom: 28 }}>
                        We embed with your team, ship agents into live workflows, and stay on until outcomes are proven. Not a vendor. Not a consultant. An engineering partner.
                    </p>
                    <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', gap: 8 }}>
                        Book a scoping call <ArrowRight style={{ width: 18, height: 18 }} />
                    </a>
                </div>
            </section>

            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>What Forward Deployed Engineering Means</h2>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: TEXT_MUTED, maxWidth: 720 }}>
                    Most AI vendors sell you a tool and disappear. FDE is different. Our engineers embed with your operations, sales, or product team. We map the actual workflows, deploy the agents into your live stack, run the first cohort of real conversations alongside your team, and iterate until the numbers move. When the agent is stable and your team owns it, we hand off. Not before.
                </p>
            </section>

            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 28, textAlign: 'center' }}>Who This Is For</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="fde-who-grid">
                    {WHO_CARDS.map((card) => (
                        <div key={card.title} style={{ padding: 24, borderRadius: 20, background: SURFACE_LIGHT, border: `1px solid ${BORDER_LIGHT}` }}>
                            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>{card.title}</h3>
                            <p style={{ fontSize: 14, color: TEXT_MUTED, margin: 0, lineHeight: 1.55 }}>{card.body}</p>
                        </div>
                    ))}
                </div>
                <style>{`@media (max-width: 768px) { .fde-who-grid { grid-template-columns: 1fr !important; } }`}</style>
            </section>

            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 28 }}>How We Engage</h2>
                <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}>
                    {ENGAGEMENT_STEPS.map((step, i) => (
                        <li key={step.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                            <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: '50%', background: 'var(--accent-soft)', border: '1px solid var(--accent-soft-border)', color: 'var(--accent-text)', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {i + 1}
                            </span>
                            <div>
                                <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: TEXT }}>{step.label}</p>
                                <p style={{ fontSize: 15, lineHeight: 1.6, color: TEXT_MUTED, margin: 0 }}>{step.body}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="container" style={{ paddingBottom: 64 }}>
                <div style={{ padding: '40px 28px', borderRadius: 24, background: SURFACE_LIGHT, border: `1px solid ${BORDER_LIGHT}`, maxWidth: 720 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <Settings2 style={{ width: 22, height: 22, color: 'var(--accent)' }} />
                        <h2 style={{ fontSize: 26, fontWeight: 600, margin: 0 }}>FDE Engagement Terms</h2>
                    </div>
                    <p style={{ fontSize: 16, lineHeight: 1.65, color: TEXT_MUTED, marginBottom: 24 }}>
                        Engagements start at a 12-week minimum. Pricing depends on scope and team size. Typical range is ₹5 lakh to ₹15 lakh for a 12-week deployment, all-inclusive. We only take on engagements where we believe we can move a measurable business metric.
                    </p>
                    <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', gap: 8 }}>
                        Book a scoping call <ArrowRight style={{ width: 18, height: 18 }} />
                    </a>
                </div>
            </section>

            <FooterCta />
        </main>
    )
}
