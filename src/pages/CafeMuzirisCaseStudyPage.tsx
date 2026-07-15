import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SEO from '../components/SEO'
import { DEPLOY_AGENT_URL } from '../constants/links'

const BG = '#FAF8F4'
const TEXT = '#1A1614'
const TEXT_MUTED = '#57514A'
const SURFACE_LIGHT = '#F2EEE6'
const BORDER_LIGHT = '#E5DFD3'

const STATS = [
    { value: '9%', label: 'Increase in customer footfall.' },
    { value: '0', label: 'Double bookings after week 3.' },
    { value: '31 sec', label: 'Average WhatsApp response time.' },
    { value: '₹2.1L', label: 'Estimated monthly revenue recovered.' },
]

const META_ITEMS = [
    { label: 'Vertical', value: 'Restaurant and hospitality' },
    { label: 'Location', value: 'Indiranagar, Bangalore' },
    { label: 'Deployment period', value: '90 days' },
    { label: 'Agent stack', value: 'Vapi voice, WhatsApp via Twilio, Google Calendar sync' },
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
                    <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 12 }}>Want results like Cafe Muziris?</h2>
                    <p style={{ color: TEXT_MUTED, marginBottom: 24, maxWidth: 480, margin: '0 auto 24px' }}>
                        We build the same agent stack for your business, deployed and live in 30 days.
                    </p>
                    <a href={DEPLOY_AGENT_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ fontSize: 17, padding: '14px 28px', display: 'inline-flex', gap: 8 }}>
                        Book a scoping call <ArrowRight style={{ width: 18, height: 18 }} />
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
    return (
        <section className="container" style={{ paddingBottom: 48 }}>
            <h2 style={{ fontSize: 26, fontWeight: 600, marginBottom: 16 }}>{title}</h2>
            {children}
        </section>
    )
}

function Body({ children }: { children: ReactNode }) {
    return (
        <p style={{ fontSize: 17, lineHeight: 1.65, color: TEXT_MUTED, maxWidth: 720, marginBottom: 16 }}>
            {children}
        </p>
    )
}

export default function CafeMuzirisCaseStudyPage() {
    return (
        <main style={{ background: BG, color: TEXT, minHeight: '80vh', paddingTop: 48, paddingBottom: 0 }}>
            <SEO
                title="Cafe Muziris Case Study — Goschedule.ai"
                description="How Goschedule deployed a voice and WhatsApp agent for Cafe Muziris that increased customer footfall by 9 percent and eliminated missed reservations across peak weeks."
                canonical="https://www.goschedule.ai/case-studies/cafe-muziris"
            />

            <section className="container" style={{ paddingBottom: 48 }}>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-text)', marginBottom: 14 }}>
                    Case Study
                </p>
                <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, lineHeight: 1.12, marginBottom: 20, maxWidth: 800 }}>
                    How Cafe Muziris increased customer footfall by 9 percent using an AI voice and WhatsApp agent
                </h1>
                <p className="body-lg" style={{ color: TEXT_MUTED, maxWidth: 720, marginBottom: 24 }}>
                    A 90 day deployment across peak reservation weeks eliminated missed calls, automated bookings, and freed the floor staff to focus on guests already at the table.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px 24px', maxWidth: 800 }}>
                    {META_ITEMS.map((item) => (
                        <div key={item.label} style={{ fontSize: 13, color: TEXT_MUTED }}>
                            <span style={{ fontWeight: 600, color: TEXT }}>{item.label}:</span> {item.value}
                        </div>
                    ))}
                </div>
            </section>

            <Section title="About Cafe Muziris">
                <Body>
                    Cafe Muziris is a Kerala coastal cuisine restaurant located in Indiranagar, Bangalore. The restaurant serves roughly 180 to 220 guests per weekday and up to 340 guests on weekends, with peak dinner service between 7 pm and 10 pm. Reservations are handled primarily through phone calls and WhatsApp, with a small percentage arriving through third party aggregators.
                </Body>
            </Section>

            <Section title="The Problem">
                <Body>
                    Before the Goschedule agent deployment, Cafe Muziris was losing an estimated 22 to 28 potential reservations per week during peak evening hours. The restaurant has two phone lines and a WhatsApp Business number. Between 7 pm and 10 pm on Fridays and Saturdays, all three channels would ring simultaneously while the manager was seating guests, answering table queries, and coordinating with the kitchen. Calls went to voicemail. WhatsApp messages went unread for 45 minutes to two hours. By the time the manager circled back, most inquirers had already booked elsewhere.
                </Body>
                <Body>
                    The manual reservation logbook created a second problem. Handwritten entries during peak service led to double bookings on Saturday nights. On average, the restaurant handled 4 to 6 double booking incidents per month, each requiring an apology, a comp on drinks or dessert, and a hit to guest satisfaction. The estimated revenue impact of missed and mishandled reservations was between ₹1.8 lakh and ₹2.4 lakh per month.
                </Body>
            </Section>

            <Section title="What We Built">
                <Body>
                    We deployed a two channel agent stack over four weeks. The voice agent runs on Vapi with an Indian English voice tuned for the restaurant&apos;s tone. Inbound calls to the restaurant&apos;s primary reservation line route to the agent if unanswered within 4 rings. The agent handles reservation inquiries, quotes availability across dinner slots, confirms guest count, captures dietary requirements, and books the reservation directly into the restaurant&apos;s shared Google Calendar. Confirmation goes to the guest via WhatsApp within 30 seconds of the call ending.
                </Body>
                <Body>
                    The WhatsApp agent runs on Twilio&apos;s WhatsApp Business API. It handles inquiries in English, Malayalam, and Hindi. The agent recognizes intent using Claude Sonnet, checks live availability against the same Google Calendar, and books the reservation. For any request that involves special arrangements such as private dining, chef specials, or events over 12 guests, the agent escalates to the manager over WhatsApp with a summary of the conversation.
                </Body>
                <Body>
                    A nightly n8n workflow syncs all reservations, cancellations, and no shows into a Google Sheet the manager reviews each morning. Weekly, the same workflow generates a summary of reservation volume, source channel, average party size, and no show rate. This gave Cafe Muziris its first structured view of reservation data.
                </Body>
            </Section>

            <Section title="Results Over 90 Days">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28, maxWidth: 800 }} className="case-stats-grid">
                    {STATS.map((stat) => (
                        <div key={stat.label} style={{ padding: 20, borderRadius: 16, background: SURFACE_LIGHT, border: `1px solid ${BORDER_LIGHT}`, textAlign: 'center' }}>
                            <div className="results-stat-value" style={{ fontSize: 32, marginBottom: 6 }}>{stat.value}</div>
                            <div className="results-stat-label" style={{ fontSize: 11 }}>{stat.label}</div>
                        </div>
                    ))}
                </div>
                <style>{`@media (max-width: 768px) { .case-stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }`}</style>
                <Body>
                    Over the 90 day deployment period, Cafe Muziris saw a 9 percent increase in total guest footfall compared to the same 90 day window in the previous year. The increase was concentrated in Friday and Saturday dinner service, where the agent captured reservations that would previously have gone to voicemail or unread WhatsApp threads.
                </Body>
                <Body>
                    Double bookings dropped from an average of 4 to 6 per month to zero after week 3 of deployment. This was achieved by routing all bookings through a single source of truth, the shared Google Calendar, with the agent as the sole write access. The manager retained edit access for special arrangements.
                </Body>
                <Body>
                    Average WhatsApp response time dropped from 45 minutes to 31 seconds during peak hours. The agent handles roughly 78 percent of inbound WhatsApp reservation inquiries end to end. The remaining 22 percent escalate to the manager for events, private dining, or special requests.
                </Body>
                <Body>
                    The estimated revenue impact is ₹2.1 lakh per month in recovered bookings, calculated as an average party size of 3.2 guests, an average spend per guest of ₹720, and 92 additional reservations per month attributable to the agent based on call and WhatsApp logs.
                </Body>
            </Section>

            <Section title="What Changed for the Team">
                <Body>
                    The restaurant manager estimates 6 to 8 hours per week were freed up from reservation handling. This time now goes into floor management and guest experience. Servers report that the front-of-house feels calmer during peak hours because the phones are no longer ringing constantly. The kitchen receives cleaner reservation data with accurate party sizes and dietary flags, reducing prep waste and rush.
                </Body>
            </Section>

            <section className="container" style={{ paddingBottom: 48 }}>
                <blockquote
                    style={{
                        margin: 0,
                        padding: '32px 28px',
                        borderRadius: 20,
                        background: SURFACE_LIGHT,
                        border: `1px solid ${BORDER_LIGHT}`,
                        maxWidth: 720,
                    }}
                >
                    <p style={{ fontSize: 20, lineHeight: 1.55, fontStyle: 'italic', color: TEXT, marginBottom: 16 }}>
                        Before Goschedule, we were losing bookings we did not even know we were losing. The agent handles our peak hour rush better than a full time reservationist would, and it never forgets a booking. Our footfall on weekends has visibly increased, and my floor team is finally focused on the guests actually sitting at our tables.
                    </p>
                    <footer style={{ fontSize: 14, color: TEXT_MUTED, fontStyle: 'normal' }}>
                        Restaurant Manager, Cafe Muziris
                    </footer>
                </blockquote>
            </section>

            <Section title="The Technical Setup">
                <Body>
                    The agent stack runs on n8n self-hosted on Railway, with Instance-level MCP for observability. Voice conversations use Vapi with Deepgram for speech to text and ElevenLabs Flash for text to speech, chosen for its Indian English pronunciation quality. Language model calls route through Claude Sonnet 4.5 with a system prompt tuned for restaurant hospitality tone. WhatsApp uses Twilio&apos;s Business API with a message template approved by Meta for booking confirmations. Google Calendar is the single source of truth for availability. Nightly analytics run via an n8n workflow that writes to a Google Sheet shared with the restaurant&apos;s owners.
                </Body>
            </Section>

            <FooterCta />
        </main>
    )
}
