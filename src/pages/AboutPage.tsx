import SEO from '../components/SEO'
import { LINKEDIN_URL } from '../constants/links'

const ABOUT_TITLE = 'About — Vishnu Rajan'
const ABOUT_DESCRIPTION =
  'Bangalore-based GTM operator and builder. Fifteen years in enterprise sales — Concentrix, EY, VP Sales at Vodex.ai — now independent. Fractional GTM and select full-time roles.'

export default function AboutPage() {
  return (
    <main className="home-lp">
      <SEO
        title={ABOUT_TITLE}
        description={ABOUT_DESCRIPTION}
        canonical="https://www.goschedule.ai/about"
        ogImage="https://www.goschedule.ai/og-image-v3.png"
      />

      <section className="home-lp__hero">
        <div className="home-lp__container">
          <div className="about-lp__hero-row">
            <div className="about-lp__hero-copy">
              <h1 className="home-lp__h1">About</h1>
              <p className="home-lp__sub home-lp__sub--wide">
                Bangalore-based. Fifteen years in enterprise sales, then I went and built the
                product myself.
              </p>
            </div>
            <img
              className="about-lp__headshot"
              src="/images/vishnu.jpg"
              alt="Vishnu Rajan"
              width={240}
              height={240}
            />
          </div>
        </div>
      </section>

      <section className="home-lp__section" style={{ paddingTop: 0 }}>
        <div className="home-lp__container">
          <h2 className="home-lp__h2">The short version</h2>
          <p className="home-lp__closing" style={{ maxWidth: '62ch' }}>
            Economics at Christ University, Bangalore. Started in contact centre operations at
            Concentrix, then risk advisory at EY. Enterprise sales at a global BPO, then VP Sales at
            Vodex.ai — a seed-stage voice AI company — where I built the enterprise motion from zero
            into Indian BFSI and BPO, closed $600K ARR through the seed round, and contributed to the
            raise.
          </p>
          <p className="home-lp__closing" style={{ maxWidth: '62ch', marginTop: 20 }}>
            Now independent. Running GTM for AI companies selling into Indian enterprise, and
            shipping voice and WhatsApp AI products in parallel.
          </p>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Timeline</h2>
          <div className="home-lp__cards" style={{ gridTemplateColumns: '1fr' }}>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                2024 — present · Independent
              </h3>
              <p className="home-lp__card-body">
                Fractional GTM for AI companies selling into Indian enterprise — Epicode,
                Arrowhead.ai, eShipz. Building voice and WhatsApp AI products end to end.
              </p>
            </article>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                2022 — 2024 · VP Sales, Vodex.ai
              </h3>
              <p className="home-lp__card-body">
                Built enterprise sales from zero for a seed-stage voice AI company. $600K ARR through
                the seed round. First BFSI and BPO logos in India. Contributed to the seed raise.
              </p>
            </article>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                EY
              </h3>
              <p className="home-lp__card-body">Risk advisory.</p>
            </article>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                Concentrix
              </h3>
              <p className="home-lp__card-body">Contact centre operations.</p>
            </article>
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">What I do</h2>
          <div className="home-lp__cards" style={{ gridTemplateColumns: '1fr' }}>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                Sell.
              </h3>
              <p className="home-lp__card-body">
                Enterprise AI into Indian BFSI, telecom, and BPO. DLT registration, TRAI regulations,
                InfoSec questionnaires, VAPT, procurement — end to end. Pilot pricing that converts
                to production.
              </p>
            </article>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                Build.
              </h3>
              <p className="home-lp__card-body">
                Node.js, Python, Go. Voice AI: Vapi, Retell, Twilio, Deepgram, Sarvam. Data: Supabase,
                Postgres. Automation: n8n. Everything I list, I&apos;ve deployed to production — not
                slideware.
              </p>
            </article>
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Things I&apos;ve shipped</h2>
          <div className="home-lp__cards" style={{ gridTemplateColumns: '1fr' }}>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                ReplyKaro
              </h3>
              <p className="home-lp__card-body">
                WhatsApp and voice AI receptionist for Indian clinics. Live. Node.js, Vapi, Twilio,
                Supabase, React dashboard.
              </p>
            </article>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                Morning Brief
              </h3>
              <p className="home-lp__card-body">
                Personalised AI voice briefing that calls you each morning with news curated to your
                interests. RSS + NewsAPI → Claude Sonnet → Vapi.
              </p>
            </article>
            <article className="home-lp__card">
              <h3 className="home-lp__card-title" style={{ fontSize: 20 }}>
                Resound.ai
              </h3>
              <p className="home-lp__card-body">
                Multi-tenant outbound sales automation with AI reply handling and voice
                qualification. In progress.
              </p>
            </article>
          </div>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Open to</h2>
          <p className="home-lp__closing" style={{ maxWidth: '62ch' }}>
            Fractional GTM engagements, and select full-time Head of GTM, founding GTM, or GTM
            engineering roles at funded (Series A+) tech or AI companies selling into India or
            emerging markets.
          </p>
        </div>
      </section>

      <hr className="home-lp__rule" />

      <section className="home-lp__section">
        <div className="home-lp__container">
          <h2 className="home-lp__h2">Contact</h2>
          <p className="home-lp__closing">
            <a href="mailto:hello@goschedule.ai" className="home-lp__card-link">
              hello@goschedule.ai
            </a>
            {' · '}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="home-lp__card-link"
            >
              LinkedIn
            </a>
            {' · '}
            <a href="/vishnu-rajan-cv.pdf" className="home-lp__card-link">
              Download CV (PDF)
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
