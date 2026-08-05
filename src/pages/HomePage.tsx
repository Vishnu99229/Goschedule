import { Link } from 'react-router-dom'
import AgentDemo from '../components/AgentDemo'
import ClientOnly from '../components/ClientOnly'
import { DEPLOY_AGENT_URL, LINKEDIN_URL } from '../constants/links'

const STEPS = [
  {
    title: 'I do it by hand.',
    body: 'I run WhatsApp, email, and voice outbound to your ICP myself. I read every reply and note what starts a real conversation versus silence.',
  },
  {
    title: 'I learn what works for your product.',
    body: 'I map the objections, the channels that convert, and what a qualified lead looks like for your ACV and buyer. No generic playbook.',
  },
  {
    title: 'I deploy agents that scale what worked.',
    body: 'Once the playbook is proven, I hand it to AI agents. WhatsApp automation, voice callers, and email sequences keep running the plays that got replies.',
  },
]

const BUILT = [
  {
    title: 'ReplyKaro',
    body: 'WhatsApp + voice AI receptionist for Indian clinics.',
    stat: 'Live at Cafe Muziris. +9% footfall over 90 days.',
    href: '/products/replykaro',
  },
  {
    title: 'Epicode (GTM)',
    body: 'Running GTM and pre-sales for enterprise voice telephony middleware serving Indian enterprise voice AI.',
    stat: null,
    href: null,
  },
  {
    title: 'Resound.ai',
    body: 'Outbound sales automation with AI reply handling and voice qualification.',
    stat: 'Built and live as a multi-tenant platform.',
    href: '/products/resound',
  },
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
      {/* ── Hero ── */}
      <section className="home-lp__hero">
        <div className="home-lp__container">
          <h1 className="home-lp__h1">
            Qualified leads for B2B teams that need <em className="home-lp__accent-italic">pipeline</em>, not
            another tool.
          </h1>

          <p className="home-lp__sub">
            I run outbound to your ideal customers by hand across WhatsApp, email, and voice. I
            learn what makes your prospects reply. Then I deploy AI agents that keep doing what
            worked.
          </p>

          <CtaPair />
        </div>
      </section>

      {/* ── Proof strip ── */}
      <section className="home-lp__proof" aria-label="Background">
        <div className="home-lp__container">
          <p className="home-lp__proof-line">
            Currently running GTM at Epicode (enterprise telephony middleware). Previously VP Sales
            at Vodex.ai (seed-stage voice AI). Built ReplyKaro, live in production.
          </p>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* ── How I actually work ── */}
      <section className="home-lp__section" id="how">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">How I actually work</h2>

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

      {/* ── What I've built ── */}
      <section className="home-lp__section" id="built">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">What I&apos;ve built</h2>

          <div className="home-lp__cards">
            {BUILT.map((item) => (
              <article key={item.title} className="home-lp__card">
                <h3 className="home-lp__card-title">{item.title}</h3>
                <p className="home-lp__card-body">{item.body}</p>
                {item.stat ? <p className="home-lp__card-stat">{item.stat}</p> : null}
                {item.href ? (
                  <Link to={item.href} className="home-lp__card-link">
                    See it <span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* ── Try what I build (AgentDemo) ── */}
      <section className="home-lp__section home-lp__demo-section" id="try">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">See the kind of agents I ship.</h2>
          <p className="home-lp__section-sub">Pick a use case. Watch it come to life.</p>

          <div className="home-lp__demo-wrap">
            <ClientOnly
              fallback={
                <div aria-hidden style={{ minHeight: 480, width: '100%' }} />
              }
            >
              <AgentDemo />
            </ClientOnly>
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      {/* ── Closing CTA ── */}
      <section className="home-lp__section home-lp__close" id="book">
        <div className="home-lp__container home-lp__close-inner">
          <h2 className="home-lp__h2 home-lp__h2--close">
            If you need pipeline and want to talk to someone who actually replies, let&apos;s have a
            call.
          </h2>
          <p className="home-lp__close-sub">
            Fastest way to reach me: LinkedIn DM or the call link below. I read every message.
          </p>
          <CtaPair />
        </div>
      </section>
    </main>
  )
}
