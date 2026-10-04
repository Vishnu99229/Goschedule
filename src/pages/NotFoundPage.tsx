import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  useEffect(() => {
    const el = document.head.querySelector('meta[name="robots"]')
    const prev = el?.getAttribute('content') ?? 'index, follow'
    if (el) el.setAttribute('content', 'noindex, nofollow')
    return () => {
      if (el) el.setAttribute('content', prev)
    }
  }, [])

  return (
    <main className="site-main home-lp" id="main-content">
      <SEO
        title="Page not found | Goschedule.ai"
        description="This page does not exist. Return to the homepage or browse work and writing."
        canonical="https://www.goschedule.ai/404"
      />
      <section className="home-lp__hero">
        <div className="home-lp__container">
          <h1 className="home-lp__h1">Page not found</h1>
          <p className="home-lp__sub home-lp__sub--wide">
            The URL may be outdated or mistyped. Try one of these instead.
          </p>
          <div className="home-lp__hero-cta" style={{ marginTop: 'var(--space-4)' }}>
            <Link to="/" className="home-lp__btn home-lp__btn--primary">
              Home
            </Link>
            <Link to="/work" className="home-lp__btn home-lp__btn--secondary">
              Work
            </Link>
            <Link to="/blog" className="home-lp__btn home-lp__btn--secondary">
              Writing
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
