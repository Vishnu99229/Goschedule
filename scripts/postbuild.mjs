/**
 * Post-build script.
 *
 * Generates per-route static HTML for every marketing route AND every
 * blog post discovered in `content/blog/*.md`. Each output HTML has its
 * own <title>, meta description, canonical, OG/Twitter tags, and (for
 * posts) JSON-LD blocks for BlogPosting + optional FAQPage baked into
 * the <head>, so crawlers and OG scrapers see correct metadata without
 * executing any JS.
 *
 * Also regenerates dist/sitemap.xml from the union of marketing routes
 * and blog routes so the deployed sitemap always reflects current posts.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const CONTENT_BLOG = join(ROOT, 'content', 'blog')

const SITE = 'https://www.goschedule.ai'
const DEFAULT_OG = `${SITE}/og-image.png`

const MARKETING_ROUTES = [
  {
    path: '/',
    title: 'Goschedule.ai — AI Agents for Revenue, Sales & Operations',
    description:
      'Deploy AI agents that run your revenue engine. From outbound sales to operations — 24/7, learning, outcome-driven.',
    canonical: `${SITE}/`,
    ogType: 'website',
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/products/morning-brief',
    title: 'Morning Brief | GoSchedule.ai',
    description:
      'A personalized AI news agent that calls you every morning with only the stories that matter to you.',
    canonical: `${SITE}/products/morning-brief`,
    ogType: 'website',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/products/replykaro',
    title: 'ReplyKaro — AI Inbound Response Agent | Goschedule.ai',
    description:
      'ReplyKaro is an AI agent that responds to every inbound lead within seconds. Enriches contact data, qualifies intent, and books meetings — automatically.',
    canonical: `${SITE}/products/replykaro`,
    ogType: 'website',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/products/resound',
    title: 'Resound.ai | GoSchedule.ai',
    description:
      'Multi-tenant outbound sales automation with AI reply handling and voice AI that qualifies leads and books meetings.',
    canonical: `${SITE}/products/resound`,
    ogType: 'website',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/blog',
    title: 'Blog | Goschedule.ai',
    description:
      'Insights on AI agents for revenue, sales, and operations — how to deploy them, what they replace, and what they unlock for your business.',
    canonical: `${SITE}/blog`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'weekly',
  },
  {
    path: '/docs',
    title: 'Documentation | GoSchedule.ai',
    description: 'Technical documentation for GoSchedule.ai products.',
    canonical: `${SITE}/docs`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/docs/technical-note',
    title: 'Our Technical Note | GoSchedule.ai',
    description:
      'How GoSchedule.ai builds vertical AI agents that drive real business outcomes, not generic assistants.',
    canonical: `${SITE}/docs/technical-note`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/docs/morning-brief',
    title: 'Morning Brief Documentation | GoSchedule.ai',
    description:
      'Technical documentation for Morning Brief. A personalized AI news agent that calls you every morning with only the stories that matter.',
    canonical: `${SITE}/docs/morning-brief`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/docs/replykaro',
    title: 'ReplyKaro Documentation | GoSchedule.ai',
    description:
      'Technical documentation for ReplyKaro. An AI receptionist for clinics that answers calls, handles WhatsApp, and books appointments.',
    canonical: `${SITE}/docs/replykaro`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/docs/resound',
    title: 'Resound.ai Documentation | GoSchedule.ai',
    description:
      'Technical documentation for Resound.ai. A multi-tenant outbound sales automation platform with AI reply handling and voice qualification.',
    canonical: `${SITE}/docs/resound`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Goschedule.ai',
    description:
      'Terms and conditions for using Goschedule.ai products and services.',
    canonical: `${SITE}/terms-and-conditions`,
    ogType: 'website',
    priority: 0.4,
    changefreq: 'yearly',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Goschedule.ai',
    description:
      'Privacy policy for Goschedule.ai. Learn how we collect, use, and protect your data.',
    canonical: `${SITE}/privacy-policy`,
    ogType: 'website',
    priority: 0.4,
    changefreq: 'yearly',
  },
]

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeJsonLd(jsonString) {
  return jsonString.replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
}

function abs(maybeRel) {
  if (!maybeRel) return DEFAULT_OG
  if (/^https?:\/\//.test(maybeRel)) return maybeRel
  return `${SITE}${maybeRel.startsWith('/') ? '' : '/'}${maybeRel}`
}

function injectMeta(html, route) {
  let result = html
  const ogImage = abs(route.ogImage)

  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  )
  result = result.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}">`
  )
  result = result.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`
  )
  result = result.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  )
  result = result.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  )
  result = result.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(route.canonical)}" />`
  )
  result = result.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`
  )
  result = result.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeHtml(route.ogType ?? 'website')}" />`
  )
  result = result.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  )
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  )
  result = result.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:url" content="${escapeHtml(route.canonical)}" />`
  )
  result = result.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`
  )

  if (route.jsonLd && route.jsonLd.length > 0) {
    const scripts = route.jsonLd
      .map(
        (obj) =>
          `<script type="application/ld+json">${escapeJsonLd(JSON.stringify(obj))}</script>`
      )
      .join('\n    ')
    result = result.replace('</head>', `    ${scripts}\n  </head>`)
  }

  return result
}

function writeRouteHtml(baseHtml, route) {
  const html = injectMeta(baseHtml, route)
  if (route.path === '/') {
    writeFileSync(join(DIST, 'index.html'), html, 'utf-8')
    console.log(`  ✓ / (dist/index.html)`)
  } else {
    const dir = join(DIST, route.path)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html, 'utf-8')
    console.log(`  ✓ ${route.path} (dist${route.path}/index.html)`)
  }
}

function loadBlogPosts() {
  let entries
  try {
    entries = readdirSync(CONTENT_BLOG)
  } catch {
    return []
  }
  const posts = []
  for (const entry of entries) {
    if (!entry.endsWith('.md')) continue
    const raw = readFileSync(join(CONTENT_BLOG, entry), 'utf-8')
    const { data, content } = matter(raw)
    if (!data.slug) {
      console.warn(`  ⚠ skipping ${entry}: missing slug in frontmatter`)
      continue
    }
    posts.push({ frontmatter: data, body: content, file: entry })
  }
  posts.sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  )
  return posts
}

function buildPostRoute(post) {
  const fm = post.frontmatter
  const canonical = `${SITE}/blog/${fm.slug}`
  const ogImage = abs(fm.ogImage ?? fm.coverImage)

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonical,
    },
    headline: fm.title,
    description: fm.description,
    image: ogImage,
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

  const jsonLd = [articleJsonLd]

  if (Array.isArray(fm.faqs) && fm.faqs.length > 0) {
    jsonLd.push({
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
    })
  }

  return {
    path: `/blog/${fm.slug}`,
    title: fm.title,
    description: fm.description,
    canonical,
    ogType: 'article',
    ogImage,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: fm.date,
    jsonLd,
  }
}

function generateSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10)
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ]
  for (const r of routes) {
    xml.push('  <url>')
    xml.push(`    <loc>${r.canonical}</loc>`)
    xml.push(`    <lastmod>${r.lastmod ?? today}</lastmod>`)
    xml.push(`    <changefreq>${r.changefreq ?? 'monthly'}</changefreq>`)
    xml.push(`    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>`)
    xml.push('  </url>')
  }
  xml.push('</urlset>')
  return xml.join('\n') + '\n'
}

// ── Main ──────────────────────────────────────────────────────────────
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

const posts = loadBlogPosts()
const postRoutes = posts.map(buildPostRoute)
const allRoutes = [...MARKETING_ROUTES, ...postRoutes]

let generated = 0
for (const route of allRoutes) {
  writeRouteHtml(baseHtml, route)
  generated++
}

writeFileSync(
  join(DIST, 'sitemap.xml'),
  generateSitemap(allRoutes),
  'utf-8'
)
console.log(`  ✓ sitemap.xml (${allRoutes.length} URLs)`)

console.log(
  `\n✅ Generated ${generated} route-specific HTML files (${posts.length} blog post${posts.length === 1 ? '' : 's'})`
)
