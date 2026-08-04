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
const DEFAULT_OG = `${SITE}/og-image-v2.png`

// ── Shared JSON-LD builders (mirror the client-side <SEO jsonLd> values so
//    the same schema appears in the raw static HTML, not only after hydration) ──
const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.png`,
  description:
    'Goschedule.ai gets you qualified leads with AI agents across WhatsApp, email, and voice — running outreach by hand first, then scaling what works.',
}

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
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
    title: 'Goschedule.ai — Qualified Leads from AI Agents on WhatsApp, Email & Voice',
    description:
      'Qualified leads from AI agents across WhatsApp, email & voice. We run your outreach by hand first — learning what converts — then agents scale what works.',
    canonical: `${SITE}/`,
    ogType: 'website',
    priority: 1.0,
    changefreq: 'weekly',
    source: 'index.html',
    imageAlt: 'Qualified Leads from AI Agents — WhatsApp, Email & Voice',
    jsonLd: [ORG_JSONLD, WEBSITE_JSONLD],
  },
  {
    path: '/products/morning-brief',
    title: 'Morning Brief — Your Personalized AI News Agent, Called In | Goschedule.ai',
    description:
      'A personalized AI news agent that calls you every morning with only the stories that matter to you.',
    canonical: `${SITE}/products/morning-brief`,
    ogType: 'website',
    priority: 0.8,
    changefreq: 'monthly',
    source: 'src/pages/MorningBriefPage.tsx',
    imageAlt: 'Morning Brief — a personalized AI news agent that calls you every morning.',
    jsonLd: [
      softwareAppJsonLd({
        name: 'Morning Brief',
        url: `${SITE}/products/morning-brief`,
        description:
          'A personalized AI news agent that calls you every morning with only the stories that matter to you.',
      }),
      productBreadcrumbJsonLd('Morning Brief', `${SITE}/products/morning-brief`),
    ],
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
    source: 'src/pages/ReplykaroPage.tsx',
    imageAlt: 'ReplyKaro — an AI agent that answers inbound calls and WhatsApp and books meetings.',
    jsonLd: [
      softwareAppJsonLd({
        name: 'ReplyKaro',
        url: `${SITE}/products/replykaro`,
        description:
          'ReplyKaro is an AI agent that responds to every inbound lead within seconds. Enriches contact data, qualifies intent, and books meetings — automatically.',
      }),
      productBreadcrumbJsonLd('ReplyKaro', `${SITE}/products/replykaro`),
    ],
  },
  {
    path: '/products/fde-services',
    title: 'FDE Services — Goschedule.ai',
    description:
      'Forward Deployed Engineering. We embed with your team, deploy AI agents into your live workflows, and stay on until outcomes ship.',
    canonical: `${SITE}/products/fde-services`,
    ogType: 'website',
    priority: 0.8,
    changefreq: 'monthly',
    source: 'src/pages/FdeServicesPage.tsx',
    imageAlt: 'FDE Services — forward deployed engineering for AI agents.',
    jsonLd: [
      softwareAppJsonLd({
        name: 'FDE Services',
        url: `${SITE}/products/fde-services`,
        description:
          'Forward Deployed Engineering. We embed with your team, deploy AI agents into your live workflows, and stay on until outcomes ship.',
      }),
      productBreadcrumbJsonLd('FDE Services', `${SITE}/products/fde-services`),
    ],
  },
  {
    path: '/products/free-setup',
    title: 'Free Setup — Goschedule.ai',
    description:
      'Get a working AI agent deployed for free. We build the first agent at zero cost. You only pay if you decide to keep it live.',
    canonical: `${SITE}/products/free-setup`,
    ogType: 'website',
    priority: 0.8,
    changefreq: 'monthly',
    source: 'src/pages/FreeSetupPage.tsx',
    imageAlt: 'Free Setup — get your first AI agent deployed at zero upfront cost.',
    jsonLd: [
      softwareAppJsonLd({
        name: 'Free Setup',
        url: `${SITE}/products/free-setup`,
        description:
          'Get a working AI agent deployed for free. We build the first agent at zero cost. You only pay if you decide to keep it live.',
      }),
      productBreadcrumbJsonLd('Free Setup', `${SITE}/products/free-setup`),
    ],
  },
  {
    path: '/case-studies/cafe-muziris',
    title: 'Cafe Muziris Case Study — Goschedule.ai',
    description:
      'How Goschedule deployed a voice and WhatsApp agent for Cafe Muziris that increased customer footfall by 9 percent and eliminated missed reservations across peak weeks.',
    canonical: `${SITE}/case-studies/cafe-muziris`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'monthly',
    source: 'src/pages/CafeMuzirisCaseStudyPage.tsx',
    imageAlt: 'Cafe Muziris case study — 9 percent footfall increase with AI voice and WhatsApp.',
  },
  {
    path: '/products/resound',
    title: 'Resound.ai — Outbound Sales Automation, End to End | Goschedule.ai',
    description:
      'Multi-tenant outbound sales automation with AI reply handling and voice AI that qualifies leads and books meetings.',
    canonical: `${SITE}/products/resound`,
    ogType: 'website',
    priority: 0.8,
    changefreq: 'monthly',
    source: 'src/pages/ResoundPage.tsx',
    imageAlt: 'Resound.ai — outbound sales automation that books meetings end to end.',
    jsonLd: [
      softwareAppJsonLd({
        name: 'Resound.ai',
        url: `${SITE}/products/resound`,
        description:
          'Multi-tenant outbound sales automation with AI reply handling and voice AI that qualifies leads and books meetings.',
      }),
      productBreadcrumbJsonLd('Resound.ai', `${SITE}/products/resound`),
    ],
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
    source: 'src/pages/BlogIndexPage.tsx',
  },
  {
    path: '/docs',
    title: 'Documentation — Guides for Goschedule.ai AI Agents | Goschedule.ai',
    description:
      "Technical guides for Goschedule.ai's AI agents — ReplyKaro, Resound.ai, and Morning Brief — covering architecture, setup, and how each agent works.",
    canonical: `${SITE}/docs`,
    ogType: 'website',
    priority: 0.7,
    changefreq: 'monthly',
    source: 'src/pages/DocsPage.tsx',
  },
  {
    path: '/docs/technical-note',
    title: 'Our Technical Note | Goschedule.ai',
    description:
      'How Goschedule.ai builds vertical AI agents that drive real business outcomes, not generic assistants.',
    canonical: `${SITE}/docs/technical-note`,
    ogType: 'website',
    priority: 0.6,
    changefreq: 'monthly',
    source: 'src/pages/DocsTechnicalNotePage.tsx',
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
    source: 'src/components/TermsAndConditions.tsx',
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
