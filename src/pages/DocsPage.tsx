import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import SEO from '../components/SEO'

const SITE = 'https://www.goschedule.ai'

const ACCENT = '#7C3AED'
const ACCENT_SOFT = '#A78BFA'
const ACCENT_DARK = '#4C1D95'
const ACCENT_INDIGO = '#6366F1'

function TechnicalNoteArt() {
  return (
    <svg viewBox="0 0 600 315" preserveAspectRatio="xMidYMid slice" role="img" style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Connected nodes diagram">
      <defs>
        <linearGradient id="tn-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2EEE6" />
          <stop offset="100%" stopColor="#E8E0CF" />
        </linearGradient>
      </defs>
      <rect width="600" height="315" fill="url(#tn-bg)" />
      {/* edges */}
      <g stroke={ACCENT_SOFT} strokeWidth="2" fill="none" opacity="0.7">
        <line x1="150" y1="100" x2="300" y2="60" />
        <line x1="300" y1="60" x2="450" y2="100" />
        <line x1="150" y1="100" x2="300" y2="170" />
        <line x1="450" y1="100" x2="300" y2="170" />
        <line x1="300" y1="170" x2="200" y2="240" />
        <line x1="300" y1="170" x2="400" y2="240" />
        <line x1="200" y1="240" x2="400" y2="240" />
      </g>
      {/* nodes */}
      <g>
        <circle cx="300" cy="60" r="22" fill={ACCENT} />
        <circle cx="150" cy="100" r="18" fill={ACCENT_INDIGO} />
        <circle cx="450" cy="100" r="18" fill={ACCENT_INDIGO} />
        <circle cx="300" cy="170" r="24" fill={ACCENT_DARK} />
        <circle cx="200" cy="240" r="16" fill={ACCENT_SOFT} />
        <circle cx="400" cy="240" r="16" fill={ACCENT_SOFT} />
      </g>
    </svg>
  )
}

function MorningBriefArt() {
  return (
    <svg viewBox="0 0 600 315" preserveAspectRatio="xMidYMid slice" role="img" style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Newspaper with broadcast waves">
      <defs>
        <linearGradient id="mb-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2EEE6" />
          <stop offset="100%" stopColor="#E8E0CF" />
        </linearGradient>
      </defs>
      <rect width="600" height="315" fill="url(#mb-bg)" />
      {/* newspaper */}
      <g transform="translate(180,90)">
        <rect width="240" height="160" rx="10" fill={ACCENT_DARK} />
        <rect x="16" y="20" width="208" height="14" rx="3" fill="#fff" opacity="0.95" />
        <rect x="16" y="44" width="140" height="8" rx="2" fill="#fff" opacity="0.7" />
        <rect x="16" y="60" width="170" height="8" rx="2" fill="#fff" opacity="0.55" />
        <rect x="16" y="80" width="100" height="56" rx="4" fill={ACCENT_SOFT} opacity="0.85" />
        <rect x="124" y="80" width="100" height="8" rx="2" fill="#fff" opacity="0.7" />
        <rect x="124" y="94" width="100" height="8" rx="2" fill="#fff" opacity="0.55" />
        <rect x="124" y="108" width="84" height="8" rx="2" fill="#fff" opacity="0.45" />
        <rect x="124" y="122" width="100" height="8" rx="2" fill="#fff" opacity="0.55" />
      </g>
      {/* sound waves on left */}
      <g stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M 130 170 Q 110 170 110 150" />
        <path d="M 130 170 Q 90 170 90 130" />
        <path d="M 130 170 Q 70 170 70 110" />
      </g>
      {/* sound waves on right */}
      <g stroke={ACCENT} strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M 470 170 Q 490 170 490 150" />
        <path d="M 470 170 Q 510 170 510 130" />
        <path d="M 470 170 Q 530 170 530 110" />
      </g>
    </svg>
  )
}

function ReplyKaroArt() {
  return (
    <svg viewBox="0 0 600 315" preserveAspectRatio="xMidYMid slice" role="img" style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Phone, chat bubble, and calendar">
      <defs>
        <linearGradient id="rk-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2EEE6" />
          <stop offset="100%" stopColor="#E8E0CF" />
        </linearGradient>
      </defs>
      <rect width="600" height="315" fill="url(#rk-bg)" />
      {/* phone */}
      <g transform="translate(120,80)">
        <rect width="110" height="170" rx="18" fill={ACCENT_DARK} />
        <rect x="10" y="14" width="90" height="130" rx="6" fill={ACCENT_SOFT} opacity="0.85" />
        <circle cx="55" cy="156" r="6" fill="#fff" opacity="0.85" />
      </g>
      {/* chat bubble (center) */}
      <g transform="translate(255,100)">
        <rect width="120" height="80" rx="14" fill={ACCENT} />
        <path d="M 30 78 L 38 96 L 50 78 Z" fill={ACCENT} />
        <rect x="16" y="20" width="88" height="8" rx="2" fill="#fff" opacity="0.95" />
        <rect x="16" y="36" width="64" height="8" rx="2" fill="#fff" opacity="0.7" />
        <rect x="16" y="52" width="80" height="8" rx="2" fill="#fff" opacity="0.55" />
      </g>
      {/* calendar */}
      <g transform="translate(400,90)">
        <rect width="110" height="130" rx="12" fill={ACCENT_INDIGO} />
        <rect width="110" height="28" rx="12" fill={ACCENT_DARK} />
        <rect x="6" y="-6" width="10" height="16" rx="3" fill={ACCENT_DARK} />
        <rect x="94" y="-6" width="10" height="16" rx="3" fill={ACCENT_DARK} />
        <g fill="#fff" opacity="0.9">
          <rect x="14" y="40" width="14" height="14" rx="2" />
          <rect x="34" y="40" width="14" height="14" rx="2" />
          <rect x="54" y="40" width="14" height="14" rx="2" />
          <rect x="74" y="40" width="14" height="14" rx="2" />
          <rect x="14" y="60" width="14" height="14" rx="2" />
          <rect x="34" y="60" width="14" height="14" rx="2" />
          <rect x="54" y="60" width="14" height="14" rx="2" opacity="0.5" />
          <rect x="74" y="60" width="14" height="14" rx="2" opacity="0.5" />
          <rect x="14" y="80" width="14" height="14" rx="2" opacity="0.5" />
          <rect x="34" y="80" width="14" height="14" rx="2" opacity="0.5" />
        </g>
      </g>
    </svg>
  )
}

function ResoundArt() {
  return (
    <svg viewBox="0 0 600 315" preserveAspectRatio="xMidYMid slice" role="img" style={{ width: '100%', height: '100%', display: 'block' }} aria-label="Outbound send with connected arrows">
      <defs>
        <linearGradient id="rs-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F2EEE6" />
          <stop offset="100%" stopColor="#E8E0CF" />
        </linearGradient>
      </defs>
      <rect width="600" height="315" fill="url(#rs-bg)" />
      {/* paper plane */}
      <g transform="translate(100,110)">
        <polygon points="0,40 110,0 110,30 50,40 110,50 110,80" fill={ACCENT} />
        <polygon points="110,30 70,40 110,50" fill={ACCENT_DARK} />
      </g>
      {/* trajectory dots */}
      <g fill={ACCENT_SOFT}>
        <circle cx="260" cy="150" r="4" />
        <circle cx="280" cy="146" r="4" />
        <circle cx="300" cy="144" r="4" />
      </g>
      {/* fan-out arrows */}
      <g stroke={ACCENT_INDIGO} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 320 158 L 460 80" />
        <polyline points="446,76 460,80 456,94" />
        <path d="M 320 158 L 470 158" />
        <polyline points="458,150 470,158 458,166" />
        <path d="M 320 158 L 460 240" />
        <polyline points="456,226 460,240 446,244" />
      </g>
      {/* nodes */}
      <g>
        <circle cx="470" cy="80" r="14" fill={ACCENT_DARK} />
        <circle cx="482" cy="158" r="14" fill={ACCENT_DARK} />
        <circle cx="470" cy="240" r="14" fill={ACCENT_DARK} />
      </g>
    </svg>
  )
}

const docs: {
  slug: string
  title: string
  excerpt: string
  art: ReactNode
  badge?: string
}[] = [
  {
    slug: 'technical-note',
    title: 'Technical Note',
    excerpt:
      'How GoSchedule.ai builds vertical AI agents that drive real business outcomes, not generic assistants.',
    art: <TechnicalNoteArt />,
  },
  {
    slug: 'morning-brief',
    title: 'Morning Brief',
    excerpt:
      'A personalized AI news agent that calls you every morning with only the stories that matter.',
    art: <MorningBriefArt />,
  },
  {
    slug: 'replykaro',
    title: 'ReplyKaro',
    excerpt:
      'An AI receptionist for clinics that answers calls, handles WhatsApp, and books appointments.',
    art: <ReplyKaroArt />,
  },
  {
    slug: 'resound',
    title: 'Resound.ai',
    excerpt:
      'A multi-tenant outbound sales automation platform with AI reply handling and voice qualification.',
    art: <ResoundArt />,
    badge: 'Early access',
  },
]

export default function DocsPage() {
  return (
    <main>
      <SEO
        title="Documentation | GoSchedule.ai"
        description="Technical documentation for GoSchedule.ai products."
        canonical={`${SITE}/docs`}
      />

      <section className="section">
        <div className="container">
          <header
            className="blog-header"
            style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <p className="blog-eyebrow" style={{ textAlign: 'center' }}>Docs</p>
            <h1 className="blog-title" style={{ textAlign: 'center' }}>Documentation</h1>
            <p className="blog-sub" style={{ textAlign: 'center' }}>
              Technical documentation for GoSchedule.ai products.
            </p>
          </header>

          <ul className="blog-grid">
            {docs.map((d) => (
              <li key={d.slug}>
                <Link to={`/docs/${d.slug}`} className="blog-card">
                  <div className="blog-card__media" aria-hidden>
                    {d.art}
                  </div>
                  <div className="blog-card__body">
                    <h2 className="blog-card__title">{d.title}</h2>
                    <p className="blog-card__excerpt">{d.excerpt}</p>
                    {d.badge && (
                      <div className="blog-card__meta">
                        <span className="badge">{d.badge}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
