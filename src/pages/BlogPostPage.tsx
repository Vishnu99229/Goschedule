/**
 * Single blog post page. Reads the slug from the URL, finds the post,
 * renders the body. Emits BlogPosting JSON-LD on every post, and FAQPage
 * JSON-LD when the post declares faqs in its frontmatter.
 */

import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEO from '../components/SEO'
import Markdown from '../blog/Markdown'
import { getPostBySlug, formatPostDate } from '../blog/posts'

const SITE = 'https://www.goschedule.ai'

export default function BlogPostPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const post = getPostBySlug(slug)
  const navigate = useNavigate()

  useEffect(() => {
    if (!post) {
      const t = window.setTimeout(() => navigate('/blog', { replace: true }), 50)
      return () => window.clearTimeout(t)
    }
  }, [post, navigate])

  if (!post) {
    return (
      <main>
        <section className="section">
          <div className="container">
            <p className="blog-empty">
              Post not found. Heading back to{' '}
              <Link to="/blog" className="blog-inline-link">
                the blog index
              </Link>
              …
            </p>
          </div>
        </section>
      </main>
    )
  }

  const { frontmatter: fm, body, readingMinutes } = post
  const canonical = `${SITE}/blog/${fm.slug}`
  const ogImg =
    fm.ogImage
      ? fm.ogImage.startsWith('http')
        ? fm.ogImage
        : `${SITE}${fm.ogImage}`
      : fm.coverImage
        ? fm.coverImage.startsWith('http')
          ? fm.coverImage
          : `${SITE}${fm.coverImage}`
        : `${SITE}/og-image-v2.png`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    headline: fm.title,
    description: fm.description,
    image: ogImg,
    datePublished: fm.date,
    dateModified: fm.date,
    author: {
      '@type': 'Organization',
      name: fm.author,
      url: SITE,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Goschedule.ai',
      url: SITE,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE}/favicon.svg`,
      },
    },
    url: canonical,
    keywords: fm.focusKeyword,
  }

  const faqJsonLd =
    fm.faqs && fm.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: fm.faqs.map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.answer,
            },
          })),
        }
      : null

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE}/blog` },
      { '@type': 'ListItem', position: 3, name: fm.title, item: canonical },
    ],
  }

  const jsonLdBlocks: object[] = [articleJsonLd, breadcrumbJsonLd]
  if (faqJsonLd) jsonLdBlocks.push(faqJsonLd)

  return (
    <main>
      <SEO
        title={fm.title}
        description={fm.description}
        canonical={canonical}
        ogImage={ogImg}
        ogType="article"
        jsonLd={jsonLdBlocks}
      />

      <article className="section blog-article">
        <div className="container blog-article__container">
          <nav aria-label="Breadcrumb" className="blog-article__back">
            <Link to="/blog" className="blog-back-link">
              <ArrowLeft style={{ width: 16, height: 16 }} aria-hidden />
              <span>Back to blog</span>
            </Link>
          </nav>

          <header className="blog-article__header">
            <div className="blog-article__meta">
              <time dateTime={fm.date}>{formatPostDate(fm.date)}</time>
              <span aria-hidden>·</span>
              <span>{readingMinutes} min read</span>
              <span aria-hidden>·</span>
              <span>By {fm.author}</span>
            </div>
          </header>

          {fm.coverImage && (
            <figure className="blog-article__cover">
              <img
                src={fm.coverImage}
                alt={fm.coverAlt ?? fm.title}
                loading="eager"
                decoding="async"
                width={1200}
                height={630}
              />
            </figure>
          )}

          <div className="blog-article__body">
            <Markdown>{body}</Markdown>
          </div>

          <footer className="blog-article__footer">
            <Link to="/blog" className="blog-back-link">
              <ArrowLeft style={{ width: 16, height: 16 }} aria-hidden />
              <span>Back to all posts</span>
            </Link>
            <Link to="/" className="blog-inline-link">
              Read more from Goschedule.ai →
            </Link>
          </footer>
        </div>
      </article>
    </main>
  )
}
