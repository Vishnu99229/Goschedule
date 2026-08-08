import { Link } from 'react-router-dom'
import { DEPLOY_AGENT_URL, LINKEDIN_URL } from '../constants/links'

const PROBLEM = [
  {
    title: 'It kills it in compliance.',
    body: 'DLT registration, TRAI regulations, data residency, PII retention policy. Your buyer\'s compliance team asks a question in week six that you can\'t answer, and the deal quietly stops moving.',
  },
  {
    title: 'It kills it in InfoSec.',
    body: 'A security questionnaire with 180 rows, a VAPT report you don\'t have, and a SOC 2 you haven\'t started. Most AI startups discover this after the champion has already sold internally.',
  },
  {
    title: 'It kills it in procurement.',
    body: 'Pilot budget is not production budget. The pilot succeeds, everyone is happy, and then the contract sits with a procurement team that has never bought AI before and has no category for it.',
  },
]

const OWN = [
  {
    title: 'ICP and segmentation',
    body: 'Which Indian enterprise segments will actually buy at your ACV and cycle length, and which will burn six months of runway.',
  },
  {
    title: 'Pricing and packaging',
    body: 'Pilot pricing that converts to production, not pilot pricing that anchors you into a discount.',
  },
  {
    title: 'Sales motion',
    body: 'The qualification framework, discovery structure, and the objections that matter in BFSI, telecom, and BPO.',
  },
  {
    title: 'Compliance and security readiness',
    body: 'The artifacts your buyer\'s teams will ask for, prepared before they ask.',
  },
  {
    title: 'Pipeline',
    body: 'Outbound across WhatsApp, email, and voice, run by hand until the playbook is proven, then handed to agents.',
  },
  {
    title: 'First hires',
    body: 'What to look for in your first AE and SDR here, and how to onboard them into a motion that exists.',
  },
]

const STEPS = [
  {
    title: 'I do it by hand.',
    body: 'I run outbound to your ICP myself across WhatsApp, email, and voice. I read every reply and note what starts a real conversation versus silence.',
  },
  {
    title: 'I learn what works for your product.',
    body: 'I map the objections, the channels that convert, and what a qualified lead looks like for your ACV and buyer. No generic playbook.',
  },
  {
    title: 'I deploy agents that scale what worked.',
    body: 'Once the playbook is proven, I hand it to AI agents — WhatsApp automation, voice callers, email sequences — that keep running the plays that got replies.',
  },
]

const RESULTS = [
  {
    label: 'Vodex.ai',
    value: '$600K ARR led as VP Sales. Seed-stage voice AI, Indian BFSI and BPO.',
  },
  {
    label: 'Crown Security',
    value:
      '7 deals closed · ~₹2.4 Cr booked. Inbound sales agent and automated outbound for a physical security services company. 2025.',
  },
  {
    label: 'Epicode',
    value:
      '₹1.2 Cr closed. Fractional GTM for enterprise telephony middleware selling to Indian voice AI companies. Multi-party enterprise deals including a KYC voicebot for a life insurer.',
  },
  {
    label: 'Portfolio',
    value: 'Two shipped products (ReplyKaro, Resound.ai). Built end to end in Node, Python, Go.',
  },
]

const PORTFOLIO = [
  { title: 'Vodex.ai', href: '/work' },
  { title: 'Epicode', href: '/work' },
  { title: 'ReplyKaro', href: '/work/replykaro' },
  { title: 'Resound.ai', href: '/work/resound' },
]

function CtaPair({ className = '' }: { className?: string }) {
  return (
    <div className={`home-lp__cta-row ${className}`.trim()}>
      <a
        href={DEPLOY_AGENT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="home-lp__btn home-lp__btn--primary"
      >
        Book a 20-min call →
      </a>
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="home-lp__btn home-lp__btn--secondary"
      >
        Message me on LinkedIn
      </a>
    </div>
  )
}

export default function HomePage() {
  return (
    <main className="home-lp">
      {/* Hero */}
      <section className="home-lp__hero">
        <div className="home-lp__container">
          <h1 className="home-lp__h1 home-lp__h1--wide">
            Fractional GTM for AI companies selling into{' '}
            <em className="home-lp__accent-italic">Indian enterprise</em>.
          </h1>

          <p className="home-lp__sub home-lp__sub--wide">
            Your demo works. Your pipeline doesn&apos;t. I&apos;ve sold voice AI into Indian banks,
            insurers, and BPOs — through DLT approvals, InfoSec reviews, and eighteen-week
            procurement cycles. I do that for two or three companies at a time.
          </p>

          <CtaPair />
        </div>
      </section>

      {/* Credibility strip */}
      <section className="home-lp__proof" aria-label="Background">
        <div className="home-lp__container">
          <p className="home-lp__proof-line">
            VP Sales at Vodex.ai — $600K ARR through seed · Currently running GTM at Epicode · Built
            and shipped ReplyKaro and Morning Brief. Resound.ai in progress · Self-taught engineer —
            Python, Node.js, Go
          </p>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* The problem */}
      <section className="home-lp__section" id="problem">
        <div className="home-lp__container">
          <h2 className="home-lp__h2 home-lp__h2--wide">
            Indian enterprise doesn&apos;t kill your deal on the demo.
          </h2>

          <div className="home-lp__steps">
            {PROBLEM.map((item) => (
              <article key={item.title} className="home-lp__step">
                <h3 className="home-lp__step-title">{item.title}</h3>
                <p className="home-lp__step-body">{item.body}</p>
              </article>
            ))}
          </div>

          <p className="home-lp__closing">
            I&apos;ve been on the vendor side of all three, in this market, repeatedly. That&apos;s
            the whole offer.
          </p>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* What I own */}
      <section className="home-lp__section" id="own">
        <div className="home-lp__container">
          <h2 className="home-lp__h2 home-lp__h2--wide">What a fractional GTM lead actually does.</h2>

          <div className="home-lp__own-grid">
            {OWN.map((item) => (
              <article key={item.title} className="home-lp__own-item">
                <h3 className="home-lp__own-title">{item.title}</h3>
                <p className="home-lp__own-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* Approach */}
      <section className="home-lp__section" id="approach">
        <div className="home-lp__container">
          <h2 className="home-lp__h2 home-lp__h2--wide">I run it by hand before I automate it.</h2>

          <div className="home-lp__steps">
            {STEPS.map((step) => (
              <article key={step.title} className="home-lp__step">
                <h3 className="home-lp__step-title">{step.title}</h3>
                <p className="home-lp__step-body">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* Numbers */}
      <section className="home-lp__section" id="results">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Numbers.</h2>

          <div className="home-lp__results">
            {RESULTS.map((row) => (
              <div key={row.label} className="home-lp__result-row">
                <span className="home-lp__result-label">{row.label}</span>
                <span className="home-lp__result-value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* Portfolio teaser */}
      <section className="home-lp__section" id="work-teaser">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Work.</h2>

          <div className="home-lp__cards home-lp__cards--four">
            {PORTFOLIO.map((item) => (
              <Link key={item.title} to={item.href} className="home-lp__card home-lp__card--link">
                <h3 className="home-lp__card-title">{item.title}</h3>
                <span className="home-lp__card-link">
                  See it <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* Closing CTA */}
      <section className="home-lp__section home-lp__close" id="book">
        <div className="home-lp__container home-lp__close-inner">
          <h2 className="home-lp__h2 home-lp__h2--close home-lp__h2--wide">
            If you&apos;re selling AI into Indian enterprise and pipeline is the problem,
            let&apos;s talk.
          </h2>
          <p className="home-lp__close-sub home-lp__close-sub--wide">
            Twenty minutes. Bring your current motion and where it&apos;s stalling. I&apos;ll tell
            you what I&apos;d change whether or not we work together.
          </p>
          <CtaPair />
        </div>
      </section>
    </main>
  )
}
