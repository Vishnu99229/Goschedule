import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const GTM = [
  {
    title: 'Vodex.ai',
    role: 'VP Sales',
    body: 'Built enterprise sales from zero for a seed-stage voice AI company. Owned the motion into Indian BFSI and BPO - the compliance path, the pricing, the pilot-to-production conversion. Contributed to the seed raise.',
    stat: 'Led $600K ARR through the seed round. First enterprise logos in Indian BFSI and BPO.',
    href: null as string | null,
    status: null as string | null,
  },
  {
    title: 'Crown Security',
    role: 'GTM engagement · 2025',
    body: 'Built an inbound sales agent and automated outbound lead generation for a physical security services company. Seven deals closed through the motion, ~₹2.4 Cr in booked revenue.',
    stat: null,
    href: null,
    status: null,
  },
  {
    title: 'Epicode',
    role: 'Fractional GTM (current)',
    body: 'Running GTM, sales, and marketing for enterprise telephony middleware serving Indian voice AI companies - including the website.',
    stat: 'Owned accounts, pre-sales engineering, technical and commercial proposals, webinars, and the marketing site. Led multi-party enterprise implementations including a KYC voicebot for a life insurer.',
    href: null,
    status: null,
  },
]

const PRODUCTS = [
  {
    title: 'ReplyKaro',
    role: 'Built and shipped',
    body: 'WhatsApp and voice AI receptionist for Indian clinics. Node.js, Vapi, Twilio, Supabase, React dashboard. Built end to end and deployed to production.',
    stat: null as string | null,
    href: '/work/replykaro' as string | null,
    status: null as string | null,
  },
  {
    title: 'Morning Brief',
    role: 'Product · Reviving',
    body: 'A voice agent that calls you every morning and briefs you on the news that matters to you - filtered by your interests, your holdings, and the people you\'re tracking. RSS + NewsAPI → Claude Sonnet → Vapi.',
    stat: 'Built and shipped. Reviving now.',
    href: null,
    status: null,
  },
  {
    title: 'Resound.ai',
    role: 'Built and shipped',
    body: 'Multi-tenant outbound sales automation with AI reply handling and voice qualification. Built and deployed.',
    stat: null,
    href: '/work/resound',
    status: 'In progress',
  },
]

type Card = (typeof GTM)[number] | (typeof PRODUCTS)[number]

function CaseCard({ item }: { item: Card }) {
  const inner = (
    <>
      <p className="home-lp__card-stat" style={{ marginBottom: 4 }}>
        {item.role}
        {item.status ? (
          <>
            {' · '}
            <em style={{ fontStyle: 'italic', color: 'var(--text-faint)' }}>{item.status}</em>
          </>
        ) : null}
      </p>
      <h3 className="home-lp__card-title" style={{ fontSize: 24 }}>
        {item.title}
      </h3>
      <p className="home-lp__card-body">{item.body}</p>
      {item.stat ? <p className="home-lp__card-stat">{item.stat}</p> : null}
      {item.href ? (
        <span className="home-lp__card-link">
          Read more <span aria-hidden="true">→</span>
        </span>
      ) : null}
    </>
  )

  if (item.href) {
    return (
      <Link to={item.href} className="home-lp__card home-lp__card--link">
        {inner}
      </Link>
    )
  }

  return <article className="home-lp__card">{inner}</article>
}

export default function WorkPage() {
  return (
    <main className="home-lp">
      <SEO
        title="Work - Vishnu Rajan"
        description="Portfolio of GTM and product work: Vodex.ai, Epicode, ReplyKaro, Morning Brief, Resound.ai."
        canonical="https://www.goschedule.ai/work"
      />

      <section className="home-lp__hero">
        <div className="home-lp__container">
          <h1 className="home-lp__h1">Work</h1>
          <p className="home-lp__sub home-lp__sub--wide">
            Fifteen years across enterprise sales, voice AI, and product. Some of this I sold. Some
            of it I built. All of it informs how I run GTM for the companies I work with now.
          </p>
        </div>
      </section>

      <section className="home-lp__section" style={{ paddingTop: 0 }}>
        <div className="home-lp__container">
          <h2 className="home-lp__h2">GTM engagements</h2>
          <div
            className="home-lp__cards"
            style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
          >
            {GTM.map((item) => (
              <CaseCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Products I&apos;ve built</h2>
          <div
            className="home-lp__cards"
            style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}
          >
            {PRODUCTS.map((item) => (
              <CaseCard key={item.title} item={item} />
            ))}
          </div>

          <p className="home-lp__closing" style={{ marginTop: 40 }}>
            Also: GTM consulting for Arrowhead.ai (voice AI, Stellaris-backed) and eShipz (D2C
            shipping orchestration).
          </p>

          <p style={{ marginTop: 32 }}>
            <Link to="/engagements" className="home-lp__card-link">
              See how we work together <span aria-hidden="true">→</span>
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
