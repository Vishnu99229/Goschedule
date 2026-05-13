/**
 * Post-build script: generates per-route HTML files with correct meta tags.
 *
 * Takes the built dist/index.html (the SPA shell) and creates copies at each
 * route path with the appropriate <title>, description, canonical, og:*, and
 * twitter:* tags already baked in. This means crawlers (including those that
 * don't execute JS) see the correct metadata for every URL.
 *
 * react-helmet-async handles client-side updates after hydration, so users
 * navigating within the SPA still get correct meta tags.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

const ROUTES = [
  {
    path: '/',
    title: 'Goschedule.ai — AI Agents for Revenue, Sales & Operations',
    description:
      'Deploy AI agents that run your revenue engine. From outbound sales to operations — 24/7, learning, outcome-driven.',
    canonical: 'https://www.goschedule.ai/',
  },
  {
    path: '/products/orlena',
    title: 'Orlena — AI Upselling Agent for Cafes | Goschedule.ai',
    description:
      'Orlena is an AI agent that runs inside your QR menu, reading every order and suggesting the perfect pairing. Lift AOV 10-20% with zero training, zero hardware.',
    canonical: 'https://www.goschedule.ai/products/orlena',
  },
  {
    path: '/products/replykaro',
    title: 'ReplyKaro — AI Inbound Response Agent | Goschedule.ai',
    description:
      'ReplyKaro is an AI agent that responds to every inbound lead within seconds. Enriches contact data, qualifies intent, and books meetings — automatically.',
    canonical: 'https://www.goschedule.ai/products/replykaro',
  },
  {
    path: '/terms-and-conditions',
    title: 'Terms and Conditions | Goschedule.ai',
    description:
      'Terms and conditions for using Goschedule.ai products and services.',
    canonical: 'https://www.goschedule.ai/terms-and-conditions',
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Goschedule.ai',
    description:
      'Privacy policy for Goschedule.ai. Learn how we collect, use, and protect your data.',
    canonical: 'https://www.goschedule.ai/privacy-policy',
  },
]

const OG_IMAGE = 'https://www.goschedule.ai/og-image.png'

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function injectMeta(html, route) {
  let result = html

  // Replace <title>
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(route.title)}</title>`
  )

  // Replace meta description
  result = result.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(route.description)}">`
  )

  // Replace canonical
  result = result.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeHtml(route.canonical)}" />`
  )

  // Replace og:title
  result = result.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`
  )

  // Replace og:description
  result = result.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`
  )

  // Replace og:url
  result = result.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeHtml(route.canonical)}" />`
  )

  // Replace og:image
  result = result.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtml(OG_IMAGE)}" />`
  )

  // Replace twitter:title
  result = result.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`
  )

  // Replace twitter:description
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`
  )

  // Replace twitter:url
  result = result.replace(
    /<meta\s+name="twitter:url"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:url" content="${escapeHtml(route.canonical)}" />`
  )

  // Replace twitter:image
  result = result.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeHtml(OG_IMAGE)}" />`
  )

  return result
}

// ── Main ──────────────────────────────────────────────────────────────
const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

let generated = 0

for (const route of ROUTES) {
  const html = injectMeta(baseHtml, route)

  if (route.path === '/') {
    // Overwrite the root index.html with homepage-specific meta
    writeFileSync(join(DIST, 'index.html'), html, 'utf-8')
    console.log(`  ✓ / (dist/index.html)`)
  } else {
    // Create directory and index.html for sub-routes
    const dir = join(DIST, route.path)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html, 'utf-8')
    console.log(`  ✓ ${route.path} (dist${route.path}/index.html)`)
  }
  generated++
}

console.log(`\n✅ Generated ${generated} route-specific HTML files`)
