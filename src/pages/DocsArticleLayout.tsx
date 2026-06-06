import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import SEO from '../components/SEO'

const SITE = 'https://www.goschedule.ai'

interface DocsArticleLayoutProps {
  title: string
  description: string
  canonical: string
  heading: string
  badge?: string
  relatedHref?: string
  relatedLabel?: string
  children: ReactNode
}

export default function DocsArticleLayout({
  title,
  description,
  canonical,
  heading,
  badge,
  relatedHref,
  relatedLabel,
  children,
}: DocsArticleLayoutProps) {
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Documentation', item: `${SITE}/docs` },
      { '@type': 'ListItem', position: 3, name: heading, item: canonical },
    ],
  }

  return (
    <main>
      <SEO title={title} description={description} canonical={canonical} jsonLd={breadcrumbJsonLd} />

      <article className="section blog-article">
        <div className="container blog-article__container">
          <nav aria-label="Breadcrumb" className="blog-article__back">
            <Link to="/docs" className="blog-back-link">
              <ArrowLeft style={{ width: 16, height: 16 }} aria-hidden />
              <span>Back to docs</span>
            </Link>
          </nav>

          <header className="blog-article__header">
            {badge && (
              <div style={{ marginBottom: 14 }}>
                <span className="badge">{badge}</span>
              </div>
            )}
            <h1 className="markdown__h1">{heading}</h1>
          </header>

          <div className="blog-article__body">
            <div className="markdown">{children}</div>
          </div>

          <footer className="blog-article__footer">
            <Link to="/docs" className="blog-back-link">
              <ArrowLeft style={{ width: 16, height: 16 }} aria-hidden />
              <span>Back to all docs</span>
            </Link>
            {relatedHref ? (
              <Link to={relatedHref} className="blog-inline-link">
                {relatedLabel ?? 'See the product'} →
              </Link>
            ) : (
              <Link to="/" className="blog-inline-link">
                Read more from Goschedule.ai →
              </Link>
            )}
          </footer>
        </div>
      </article>
    </main>
  )
}
