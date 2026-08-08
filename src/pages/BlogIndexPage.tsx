/**
 * Blog index page. Lists all posts as cards, newest first.
 */

import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { getAllPosts, formatPostDate } from '../blog/posts'

const SITE = 'https://www.goschedule.ai'

export default function BlogIndexPage() {
  const posts = getAllPosts()

  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Goschedule.ai Blog',
    description:
      'Notes on GTM, voice AI, and selling into Indian enterprise from Vishnu Rajan.',
    url: `${SITE}/blog`,
    publisher: {
      '@type': 'Organization',
      name: 'Goschedule.ai',
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/favicon.svg`,
      },
    },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.frontmatter.title,
      description: p.frontmatter.description,
      url: `${SITE}/blog/${p.frontmatter.slug}`,
      datePublished: p.frontmatter.date,
      author: {
        '@type': 'Organization',
        name: p.frontmatter.author,
      },
    })),
  }

  return (
    <main>
      <SEO
        title="Writing — Vishnu Rajan | Goschedule.ai"
        description="Notes on GTM, voice AI, and selling into Indian enterprise. The clinic-specific posts are from ReplyKaro work."
        canonical={`${SITE}/blog`}
        ogType="website"
        jsonLd={blogJsonLd}
      />

      <section className="section">
        <div className="container">
          <header className="blog-header">
            <p className="blog-eyebrow">Writing</p>
            <h1 className="blog-title">Writing.</h1>
            <p className="blog-sub">
              Notes on GTM, voice AI, and selling into Indian enterprise. The clinic-specific posts
              below are from my ReplyKaro work.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="blog-empty">No posts yet. Check back soon.</p>
          ) : (
            <ul className="blog-grid">
              {posts.map((post) => {
                const fm = post.frontmatter
                const href = `/blog/${fm.slug}`
                return (
                  <li key={fm.slug}>
                    <Link to={href} className="blog-card">
                      {fm.coverImage ? (
                        <div className="blog-card__media">
                          <img
                            src={fm.coverImage}
                            alt={fm.coverAlt ?? fm.title}
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                      ) : (
                        <div className="blog-card__media blog-card__media--fallback" aria-hidden>
                          <span>{fm.title.slice(0, 1)}</span>
                        </div>
                      )}
                      <div className="blog-card__body">
                        <h2 className="blog-card__title">{fm.title}</h2>
                        <p className="blog-card__excerpt">
                          {fm.excerpt ?? post.body.slice(0, 160).trim() + '…'}
                        </p>
                        <div className="blog-card__meta">
                          <time dateTime={fm.date}>
                            {formatPostDate(fm.date)}
                          </time>
                          <span aria-hidden>·</span>
                          <span>{post.readingMinutes} min read</span>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}
