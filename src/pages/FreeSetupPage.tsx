import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { DEPLOY_AGENT_URL } from '../constants/links'

const BG = '#FAF8F4'
const TEXT = '#1A1614'
const TEXT_MUTED = '#57514A'
const SURFACE_LIGHT = '#F2EEE6'
const BORDER_LIGHT = '#E5DFD3'

const INCLUDED = [
    'One production AI agent deployed into your live workflow. Voice, WhatsApp, or a workflow automation.',
    'Full integration with your existing tools. CRM, calendar, WhatsApp Business, or CRM of your choice.',
    'Custom persona and tone matched to your brand.',
    '14-day live trial period with your real customers or workflows.',
    'Weekly review call and iteration during the trial.',
    'Full performance report at the end of trial.',
]

const FAQS = [
    {
        q: 'What happens after the 14-day trial?',
        a: 'If the agent is moving your target metric, you convert to a monthly retainer starting at ₹25,000 per month. If not, we shut it down and part ways with no charge.',
    },
    {
        q: 'What if my business has no CRM or existing infrastructure?',
        a: 'Not a problem. We work with WhatsApp Business, Google Sheets, and simple CRMs. If your workflows exist only in a founder\'s head, we help document them as part of the setup.',
    },
    {
        q: 'Do you offer this for global businesses?',
        a: 'The free setup is currently limited to Indian businesses. We can discuss custom terms for international engagements.',
    },
]

function FooterCta({ heading, cta }: { heading: string; cta: string }) {
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
                    <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>{heading}</h2>
                    <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 28px', display: 'inline-flex', gap: 8 }}>
                        {cta} <ArrowRight style={{ width: 18, height: 18 }} />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

export default function FreeSetupPage() {
    return (
        <main style={{ background: BG, color: TEXT, minHeight: '80vh', paddingTop: 48, paddingBottom: 0 }}>
            <SEO
                title="Free Setup — Goschedule.ai"
                description="Get a working AI agent deployed for free. We build the first agent at zero cost. You only pay if you decide to keep it live."
                canonical="https://www.goschedule.ai/products/free-setup"
            />

            <section className="container" style={{ paddingBottom: 56 }}>
                <div style={{ maxWidth: 720 }}>
                    <div className="badge" style={{ marginBottom: 18 }}>Zero upfront cost</div>
                    <h1 style={{ fontSize: 'clamp(30px, 4.5vw, 46px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                        Get Your First AI Agent Deployed for Free
                    </h1>
                    <p className="body-lg" style={{ color: TEXT_MUTED, maxWidth: 600, marginBottom: 28 }}>
                        We build and deploy one working AI agent into your business at zero upfront cost. You run it for 14 days. If it moves the needle, you keep it and pay the monthly retainer. If not, walk away with no obligation.
                    </p>
                    <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'inline-flex', gap: 8 }}>
                        Claim your free setup <ArrowRight style={{ width: 18, height: 18 }} />
                    </a>
                </div>
            </section>

            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>Why We Offer This</h2>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: TEXT_MUTED, maxWidth: 720 }}>
                    Most businesses have never seen an AI agent handle real customer conversations for them. Slide decks and demos do not build conviction. A working agent handling your real calls, WhatsApp messages, or workflows for two weeks does. We are confident enough in what we build that we will show you before you pay.
                </p>
            </section>

            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 20 }}>What Is Included in Free Setup</h2>
                <ul style={{ margin: 0, paddingLeft: 20, maxWidth: 720, display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {INCLUDED.map((item) => (
                        <li key={item} style={{ fontSize: 16, lineHeight: 1.6, color: TEXT_MUTED }}>{item}</li>
                    ))}
                </ul>
            </section>

            <section className="container" style={{ paddingBottom: 48 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>Who Is Eligible</h2>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: TEXT_MUTED, maxWidth: 720 }}>
                    We offer free setup to businesses that meet all three criteria: an existing customer base or workflow with real volume, a clearly defined pain point that an agent can solve, and a decision maker available for weekly review during the trial. We currently offer free setup for one new business per week to ensure quality of deployment.
                </p>
            </section>

            <section className="container" style={{ paddingBottom: 64 }}>
                <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 28 }}>Common Questions</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 720 }}>
                    {FAQS.map((faq) => (
                        <div key={faq.q} style={{ padding: 24, borderRadius: 16, background: SURFACE_LIGHT, border: `1px solid ${BORDER_LIGHT}` }}>
                            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, color: TEXT }}>{faq.q}</h3>
                            <p style={{ fontSize: 15, lineHeight: 1.6, color: TEXT_MUTED, margin: 0 }}>{faq.a}</p>
                        </div>
                    ))}
                </div>
            </section>

            <FooterCta heading="Ready to see your first agent live?" cta="Claim your free setup" />
        </main>
    )
}
