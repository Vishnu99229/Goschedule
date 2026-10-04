import { Link } from 'react-router-dom'
import { getAllPosts, formatPostDate } from '../blog/posts'
import VoiceAgent, { BookCallButton } from '../components/voice/VoiceAgent'
import { HOME_HEADLINE, HOME_SUBLINE } from '../constants/copy'
import { LINKEDIN_URL } from '../constants/links'

const PROOF = [
  {
    label: 'Vodex.ai',
    value: 'VP Sales · $600K ARR through seed. Seed-stage voice AI, Indian BFSI and BPO.',
  },
  {
    label: 'Crown Security',
    value: '7 deals closed · ~₹2.4 Cr booked. Inbound sales agent and automated outbound, 2025.',
  },
  {
    label: 'ReplyKaro',
    value: 'WhatsApp and voice receptionist for Indian clinics — built end to end and live.',
  },
  {
    label: 'Builder',
    value: 'Self-taught engineer: Python, Node.js, Go.',
  },
]

const WORK = [
  {
    title: 'Vodex.ai',
    outcome: '$600K ARR through seed as VP Sales.',
    href: '/work',
  },
  {
    title: 'Crown Security',
    outcome: '7 deals · ~₹2.4 Cr booked in 2025.',
    href: '/work',
  },
  {
    title: 'ReplyKaro',
    outcome: 'WhatsApp and voice receptionist for Indian clinics.',
    href: '/work/replykaro',
  },
]

const SERVICES = [
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
    body: "The artifacts your buyer's teams will ask for, prepared before they ask.",
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

const PRODUCTS = [
  {
    title: 'ReplyKaro',
    body: 'WhatsApp and voice AI for clinic front desks — booking, reminders, and inbound that does not hit voicemail.',
    href: '/work/replykaro',
  },
]

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <main id="main-content" className="site-main home-lp">
      <section className="site-hero home-lp__hero" aria-labelledby="hero-heading">
        <div className="site-hero-noise home-lp__hero-noise" aria-hidden="true" />
        <div className="site-container home-lp__container site-hero-grid home-lp__hero-grid">
          <div className="site-hero-copy home-lp__hero-copy">
            <h1 id="hero-heading" className="site-h1 home-lp__h1 home-lp__h1--wide">
              {HOME_HEADLINE}
            </h1>
            <p className="site-lead home-lp__sub home-lp__sub--wide">{HOME_SUBLINE}</p>
          </div>
          <div className="site-hero-voice home-lp__hero-voice">
            <VoiceAgent />
          </div>
          <div className="site-cta-row home-lp__cta-row home-lp__hero-cta">
            <BookCallButton className="site-btn site-btn--secondary home-lp__btn home-lp__btn--secondary" />
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="site-btn site-btn--ghost home-lp__btn home-lp__btn--ghost"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="home-lp__proof" aria-label="Proof">
        <div className="home-lp__container">
          <div className="home-lp__results">
            {PROOF.map((row) => (
              <div key={row.label} className="home-lp__result-row">
                <span className="home-lp__result-label">{row.label}</span>
                <span className="home-lp__result-value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section" id="work">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Selected work</h2>
          <div className="home-lp__cards">
            {WORK.map((item) => (
              <Link key={item.title} to={item.href} className="home-lp__card home-lp__card--link">
                <h3 className="home-lp__card-title">{item.title}</h3>
                <p className="home-lp__card-body">{item.outcome}</p>
                <span className="home-lp__card-link">Read more</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section" id="services">
        <div className="home-lp__container">
          <h2 className="home-lp__h2 home-lp__h2--wide">What I do</h2>
          <div className="home-lp__accordion">
            {SERVICES.map((item) => (
              <details key={item.title} className="home-lp__accordion-item">
                <summary className="home-lp__accordion-summary">{item.title}</summary>
                <p className="home-lp__accordion-body">{item.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section" id="approach">
        <div className="home-lp__container">
          <h2 className="home-lp__h2 home-lp__h2--wide">Approach</h2>
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

      <section className="home-lp__section" id="founder">
        <div className="home-lp__container home-lp__founder">
          <img
            className="home-lp__founder-photo"
            src="/images/vishnu.svg"
            alt="Vishnu Rajan"
            width={200}
            height={200}
            loading="lazy"
            decoding="async"
          />
          <div>
            <h2 className="home-lp__h2">You work directly with me</h2>
            <p className="home-lp__closing">
              Fractional GTM for AI and B2B software selling into Indian enterprise. I take on two
              companies at a time — pipeline, pricing, compliance readiness, and the sales motion.
            </p>
            <p className="home-lp__closing" style={{ marginTop: 16 }}>
              <Link to="/about" className="home-lp__card-link">About Vishnu</Link>
            </p>
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section" id="products">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Beyond consulting</h2>
          <p className="home-lp__section-sub">Products I build when the problem is worth owning.</p>
          <div className="home-lp__cards" style={{ gridTemplateColumns: 'minmax(0, 1fr)' }}>
            {PRODUCTS.map((item) => (
              <Link key={item.title} to={item.href} className="home-lp__card home-lp__card--link">
                <h3 className="home-lp__card-title">{item.title}</h3>
                <p className="home-lp__card-body">{item.body}</p>
                <span className="home-lp__card-link">View product</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section" id="writing">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Writing</h2>
          <ul className="home-lp__post-list">
            {latestPosts.map((post) => (
              <li key={post.frontmatter.slug}>
                <Link to={`/blog/${post.frontmatter.slug}`} className="home-lp__post-link">
                  <span className="home-lp__post-title">{post.frontmatter.title}</span>
                  <span className="home-lp__post-date">{formatPostDate(post.frontmatter.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 24 }}>
            <Link to="/blog" className="home-lp__card-link">All posts</Link>
          </p>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section" id="engagements-teaser">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Engagements</h2>
          <p className="home-lp__closing">
            GTM teardown, pipeline sprint, or fractional lead — fees and scope on the engagements
            page.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link to="/engagements" className="home-lp__btn home-lp__btn--secondary">
              See engagements and pricing
            </Link>
          </p>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section home-lp__close" id="book">
        <div className="home-lp__container home-lp__close-inner">
          <h2 className="home-lp__h2 home-lp__h2--close home-lp__h2--wide">Ready when you are.</h2>
          <p className="home-lp__close-sub home-lp__close-sub--wide">
            Talk to the GTM agent or book twenty minutes. Bring your motion and where it is stalling.
          </p>
          <div className="home-lp__close-voice">
            <VoiceAgent compact />
          </div>
          <div className="home-lp__cta-row" style={{ marginTop: 24 }}>
            <BookCallButton className="home-lp__btn home-lp__btn--primary" />
          </div>
        </div>
      </section>
    </main>
  )
}
