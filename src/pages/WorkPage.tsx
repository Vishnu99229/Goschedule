import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CASES = [
  {
    title: 'Vodex.ai',
    role: 'VP Sales',
    body: 'Built enterprise sales from zero for a seed-stage voice AI company. Owned the motion into Indian BFSI and BPO — the compliance path, the pricing, the pilot-to-production conversion. Contributed to the seed raise.',
    stat: 'Led $600K ARR through the seed round. First enterprise logos in Indian BFSI and BPO.',
    href: null as string | null,
  },
  {
    title: 'Epicode',
    role: 'Fractional GTM (current)',
    body: 'Running GTM and pre-sales for enterprise telephony middleware serving Indian voice AI companies. Accounts, pre-sales engineering, technical and commercial proposals, webinars, and the website. Multi-party enterprise implementations including a KYC voicebot for a life insurer.',
    stat: '[FILL]',
    href: null,
  },
  {
    title: 'ReplyKaro',
    role: 'Built and shipped',
    body: 'WhatsApp and voice AI receptionist for Indian clinics. Node.js, Vapi, Twilio, Supabase, React dashboard. Built end to end and deployed to production.',
    stat: null,
    href: '/work/replykaro',
  },
  {
    title: 'Resound.ai',
    role: 'Built and shipped',
    body: 'Multi-tenant outbound sales automation with AI reply handling and voice qualification. Built and deployed.',
    stat: null,
    href: '/work/resound',
  },
]

export default function WorkPage() {
  return (
    <main className="home-lp">
      <SEO
        title="Work — Vishnu Rajan"
        description="Portfolio of GTM and product work: Vodex.ai, Epicode, ReplyKaro, Resound.ai."
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
          <div className="home-lp__cards" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
            {CASES.map((item) => {
              const inner = (
                <>
                  <p className="home-lp__card-stat" style={{ marginBottom: 4 }}>
                    {item.role}
                  </p>
                  <h2 className="home-lp__card-title" style={{ fontSize: 24 }}>
                    {item.title}
                  </h2>
                  <p className="home-lp__card-body">{item.body}</p>
                  {item.stat ? <p className="home-lp__card-stat">{item.stat}</p> : null}
                  {item.href ? (
                    <span className="home-lp__card-link">
                      Read more <span aria-hidden="true">→</span>
                    </span>
                  ) : null}
                </>
              )

              return item.href ? (
                <Link key={item.title} to={item.href} className="home-lp__card home-lp__card--link">
                  {inner}
                </Link>
              ) : (
                <article key={item.title} className="home-lp__card">
                  {inner}
                </article>
              )
            })}
          </div>

          <article className="home-lp__card" style={{ marginTop: 16, maxWidth: 640 }}>
            <p className="home-lp__card-body" style={{ margin: 0 }}>
              Morning Brief — Built and shipped. Personalised AI voice news briefing via daily
              outbound calls. RSS + NewsAPI → GPT-4o → Vapi pipeline.
            </p>
          </article>

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
