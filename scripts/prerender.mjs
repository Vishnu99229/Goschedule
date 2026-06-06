/**
 * Static prerender step.
 *
 * Runs AFTER scripts/postbuild.mjs. It discovers every `index.html` that
 * postbuild generated under dist/ (one per route, including each blog post),
 * renders that route's BODY using the SSR bundle (dist/server/entry-server.js),
 * and injects it into the already-head-correct HTML.
 *
 * postbuild owns the <head> (metadata/JSON-LD/sitemap); this owns the <body>.
 * Only the empty `<div id="root"></div>` is replaced — nothing else in the file
 * is touched, so the metadata pipeline is preserved. Discovering the files
 * (rather than hard-coding routes) keeps this in lock-step with postbuild.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname, relative, sep } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const SSR_ENTRY = join(DIST, 'server', 'entry-server.js')

const ROOT_DIV = '<div id="root"></div>'

// React 19 + react-helmet-async render head-bound elements (title/meta/link/
// base/JSON-LD) inline in the tree, relying on the browser to hoist them to
// <head>. Under renderToString there is no hoisting, so they appear in the body
// string. The app's visible body never legitimately contains these elements, so
// we strip them here — the static <head> (postbuild) stays the single source,
// and the client hoists its own copies to <head> after hydration (matching).
function stripHoistableHeadTags(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*>/gi, '')
    .replace(/<link\b[^>]*>/gi, '')
    .replace(/<base\b[^>]*>/gi, '')
    .replace(/<script[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
}

// Recursively collect every dist/**/index.html (skipping the SSR bundle dir).
function findRouteHtmlFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    if (dir === DIST && entry === 'server') continue
    const full = join(dir, entry)
    const st = statSync(full)
    if (st.isDirectory()) {
      out.push(...findRouteHtmlFiles(full))
    } else if (entry === 'index.html') {
      out.push(full)
    }
  }
  return out
}

// dist/index.html -> '/', dist/products/replykaro/index.html -> '/products/replykaro'
function routeForFile(file) {
  const rel = relative(DIST, dirname(file))
  if (rel === '') return '/'
  return '/' + rel.split(sep).join('/')
}

async function main() {
  if (!existsSync(SSR_ENTRY)) {
    console.error(`  ✗ SSR bundle not found at ${SSR_ENTRY}. Did the --ssr build run?`)
    process.exit(1)
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href)

  const files = findRouteHtmlFiles(DIST).sort()
  let count = 0
  let skipped = 0

  for (const file of files) {
    const route = routeForFile(file)
    const html = readFileSync(file, 'utf-8')

    if (!html.includes(ROOT_DIV)) {
      console.warn(`  ⚠ ${route}: '${ROOT_DIV}' marker not found; skipping`)
      skipped++
      continue
    }

    const bodyHtml = stripHoistableHeadTags(render(route))
    const out = html.replace(ROOT_DIV, `<div id="root">${bodyHtml}</div>`)
    writeFileSync(file, out, 'utf-8')
    count++
    console.log(`  ✓ ${route} (${relative(ROOT, file)})`)
  }

  console.log(
    `\n✅ Prerendered ${count} route${count === 1 ? '' : 's'}` +
      (skipped ? ` (${skipped} skipped)` : '') +
      ' — body content baked into static HTML',
  )
}

main().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
