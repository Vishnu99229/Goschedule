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
import { execSync } from 'child_process'
import matter from 'gray-matter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const CONTENT_BLOG = join(ROOT, 'content', 'blog')

const SITE = 'https://www.goschedule.ai'
const DEFAULT_OG = `${SITE}/og-image-v3.png`

const HOME_TITLE =
  'Fractional GTM for AI companies selling into Indian enterprise — Vishnu Rajan'
const HOME_DESCRIPTION =
  'I run GTM for AI companies selling into Indian banks, insurers, and BPOs. Pipeline, pricing, compliance readiness, and the sales motion — two days a week.'

// ── Shared JSON-LD builders (mirror the client-side <SEO jsonLd> values so
//    the same schema appears in the raw static HTML, not only after hydration) ──
const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.png`,
  description:
    'Fractional GTM for AI companies selling into Indian enterprise — pipeline, pricing, compliance readiness, and the sales motion.',
}

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  description: HOME_DESCRIPTION,
}

const PERSON_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vishnu Rajan',
  url: `${SITE}/`,
  jobTitle: 'Fractional GTM Lead',
  description: HOME_DESCRIPTION,
  sameAs: ['https://www.linkedin.com/in/vishnu-rajan-41515048/'],
  worksFor: {
    '@type': 'Organization',
    name: 'Goschedule.ai',
    url: `${SITE}/`,
  },
}

const PROFESSIONAL_SERVICE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  description: HOME_DESCRIPTION,
  image: DEFAULT_OG,
  provider: {
    '@type': 'Person',
    name: 'Vishnu Rajan',
    url: `${SITE}/`,
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: [
    'Fractional GTM leadership',
    'GTM teardown',
    'Pipeline sprint',
  ],
}

function softwareAppJsonLd({ name, url, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url,
    description,
    publisher: { '@type': 'Organization', name: 'Goschedule.ai', url: `${SITE}/` },
  }
}

function productBreadcrumbJsonLd(name, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name, item: url },
    ],
  }
}

// Real per-page last-modified from git (committer date, YYYY-MM-DD). Returns
// null when git is unavailable so the sitemap falls back to today's date —
// this keeps the existing behaviour intact while removing build-date churn for
// pages that have not actually changed.
function gitLastmod(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cs -- "${relPath}"`, {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim()
    return out || null
  } catch {
    return null
  }
}

const MARKETING_ROUTES = [
  {
    path: '/',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: `${SITE}/`,
    ogType: 'website',
    priority: 1.0,
    changefreq: 'weekly',
    source: 'index.html',
    imageAlt:
      'Fractional GTM for AI companies selling into Indian enterprise — Vishnu Rajan',
    jsonLd: [ORG_JSONLD, WEBSITE_JSONLD, PERSON_JSONLD, PROFESSIONAL_SERVICE_JSONLD],
  },
  // /products/* and /case-studies/cafe-muziris are 301'd in vercel.json.
  {
    path: '/work',
    title: 'Work — Vishnu Rajan',
    description:
      'Portfolio of GTM and product work: Vodex.ai, Epicode, ReplyKaro, Resound.ai.',
    canonical: `${SITE}/work`,
    ogType: 'website',
    priority: 0.9,
    changefreq: 'monthly',
    source: 'src/pages/WorkPage.tsx',
    imageAlt: 'Work portfolio — Vishnu Rajan',
  },
  {
    path: '/work/replykaro',
    title: 'ReplyKaro — Built and shipped | Work',
    description:
      'WhatsApp and voice AI receptionist for Indian clinics. Built end to end and deployed to production.',
    canonical: `${SITE}/work/replykaro`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'monthly',
    source: 'src/pages/ReplykaroPage.tsx',
    imageAlt: 'ReplyKaro — built and shipped WhatsApp and voice receptionist',
  },
  {
    path: '/work/resound',
    title: 'Resound.ai — Built and shipped | Work',
    description:
      'Multi-tenant outbound sales automation with AI reply handling and voice qualification. Built and deployed.',
    canonical: `${SITE}/work/resound`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'monthly',
    source: 'src/pages/ResoundPage.tsx',
    imageAlt: 'Resound.ai — built and shipped outbound sales automation',
  },
  {
    path: '/engagements',
    title: 'Engagements & Pricing — Fractional GTM',
    description:
      'Three ways in: GTM Teardown (₹50,000), Pipeline Sprint (₹1,25,000/month), or Fractional GTM Lead (₹1,50,000/month).',
    canonical: `${SITE}/engagements`,
    ogType: 'website',
    priority: 0.9,
    changefreq: 'monthly',
    source: 'src/pages/EngagementsPage.tsx',
    imageAlt: 'Engagements and pricing — fractional GTM',
  },
  {
    path: '/blog',
    title: 'Writing — Vishnu Rajan | Goschedule.ai',
    description:
      'Notes on GTM, voice AI, and selling into Indian enterprise — from Vishnu Rajan.',
    canonical: `${SITE}/blog`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'weekly',
    source: 'src/pages/BlogIndexPage.tsx',
    imageAlt: 'Writing on GTM and voice AI — Goschedule.ai',
  },
  {
    path: '/docs',
    title: 'Documentation — Shipped agents | Goschedule.ai',
    description:
      'Technical notes on ReplyKaro, Resound.ai, and Morning Brief — portfolio agents built end to end.',
    canonical: `${SITE}/docs`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'monthly',
    source: 'src/pages/DocsPage.tsx',
    imageAlt: 'Documentation for shipped agents — Goschedule.ai',
  },
  {
    path: '/docs/technical-note',
    title: 'Our Technical Note | Goschedule.ai',
    description:
      'How vertical AI agents are built for real business outcomes, not generic assistants.',
    canonical: `${SITE}/docs/technical-note`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
    source: 'src/pages/DocsTechnicalNotePage.tsx',
    imageAlt: 'Technical note — Goschedule.ai',
  },
  {
    path: '/docs/morning-brief',
    title: 'Morning Brief Documentation | Goschedule.ai',
    description:
      'Technical documentation for Morning Brief. A personalized AI news agent that calls you every morning with only the stories that matter.',
    canonical: `${SITE}/docs/morning-brief`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
    source: 'src/pages/DocsMorningBriefPage.tsx',
    imageAlt: 'Morning Brief documentation',
  },
  {
    path: '/docs/replykaro',
    title: 'ReplyKaro Documentation | Goschedule.ai',
    description:
      'Technical documentation for ReplyKaro. An AI receptionist for clinics that answers calls, handles WhatsApp, and books appointments.',
    canonical: `${SITE}/docs/replykaro`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
    source: 'src/pages/DocsReplyKaroPage.tsx',
    imageAlt: 'ReplyKaro documentation',
  },
  {
    path: '/docs/resound',
    title: 'Resound.ai Documentation | Goschedule.ai',
    description:
      'Technical documentation for Resound.ai. A multi-tenant outbound sales automation platform with AI reply handling and voice qualification.',
    canonical: `${SITE}/docs/resound`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
    source: 'src/pages/DocsResoundPage.tsx',
    imageAlt: 'Resound.ai documentation',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Goschedule.ai',
    description:
      'Terms and conditions for using Goschedule.ai services.',
    canonical: `${SITE}/terms-and-conditions`,
    ogType: 'website',
    priority: 0.4,
    changefreq: 'yearly',
    source: 'src/components/TermsAndConditions.tsx',
    imageAlt: 'Terms and conditions — Goschedule.ai',
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
    source: 'src/components/PrivacyPolicy.tsx',
    imageAlt: 'Privacy policy — Goschedule.ai',
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
  // Per-route og:image:alt — only override when the route supplies one, so
  // routes without imageAlt keep the base (homepage) alt exactly as before.
  if (route.imageAlt) {
    result = result.replace(
      /<meta\s+property="og:image:alt"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:image:alt" content="${escapeHtml(route.imageAlt)}" />`
    )
  }
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
    imageAlt: fm.coverAlt,
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

// Populate real per-page lastmod from git for marketing routes (blog posts
// already carry lastmod = frontmatter date). Falls back to today via
// generateSitemap when git is unavailable or the file has no history.
for (const r of MARKETING_ROUTES) {
  if (!r.lastmod && r.source) r.lastmod = gitLastmod(r.source)
}

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
