import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { DEPLOY_AGENT_URL } from '../constants/links'

const TIERS = [
  {
    title: 'GTM Teardown',
    meta: 'One week · Fixed fee · ₹50,000',
    body: 'I audit your current motion end to end: ICP, positioning, pricing, sales collateral, outbound sequences, compliance readiness. You get a written teardown with the specific things I\'d change and the order I\'d change them in.',
    deliverable: 'Deliverable: a document and a 90-minute walkthrough.',
  },
  {
    title: 'Pipeline Sprint',
    meta: 'Six weeks minimum · ₹1,25,000/month',
    body: 'I build and run the outbound motion myself. WhatsApp, email, and voice to your ICP. You get a proven playbook, the agent automation that runs it, and whatever pipeline it generated.',
    deliverable: 'Best for: companies with a working product and no repeatable pipeline.',
  },
  {
    title: 'Fractional GTM Lead',
    meta: 'Three-month minimum · ₹1,50,000/month · 2 slots available',
    body: 'Two days a week. I own the GTM function: motion, pricing, pipeline, compliance readiness, and your first sales hires. I\'m in your standups, on your calls, and in front of your customers.',
    deliverable: 'Best for: seed to Series A, founder-led sales hitting its ceiling.',
  },
]

export default function EngagementsPage() {
  return (
    <main className="home-lp">
      <SEO
        title="Engagements & Pricing — Fractional GTM"
        description="Three ways in: GTM Teardown, Pipeline Sprint, or Fractional GTM Lead. Fees from ₹50,000."
        canonical="https://www.goschedule.ai/engagements"
      />

      <section className="home-lp__hero">
        <div className="home-lp__container">
          <h1 className="home-lp__h1 home-lp__h1--wide">How we work together</h1>
          <p className="home-lp__sub home-lp__sub--wide">
            Three ways in, depending on how sure you are. Most people start with the first and move
            up.
          </p>
        </div>
      </section>

      <section className="home-lp__section" style={{ paddingTop: 0 }}>
        <div className="home-lp__container">
          <div className="home-lp__cards" style={{ gridTemplateColumns: '1fr' }}>
            {TIERS.map((tier) => (
              <article key={tier.title} className="home-lp__card">
                <p className="home-lp__card-stat" style={{ marginBottom: 4 }}>
                  {tier.meta}
                </p>
                <h2 className="home-lp__card-title" style={{ fontSize: 24 }}>
                  {tier.title}
                </h2>
                <p className="home-lp__card-body">{tier.body}</p>
                <p className="home-lp__card-stat">{tier.deliverable}</p>
              </article>
            ))}
          </div>

          <p className="home-lp__closing" style={{ marginTop: 40, maxWidth: '52ch' }}>
            Not sure which? Book a call. If it isn&apos;t a fit I&apos;ll say so on the call rather
            than after the invoice.
          </p>

          <div className="home-lp__cta-row" style={{ marginTop: 28 }}>
            <a
              href={DEPLOY_AGENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="home-lp__btn home-lp__btn--primary"
            >
              Book a 20-min call →
            </a>
            <Link to="/work" className="home-lp__btn home-lp__btn--secondary">
              See the work
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
