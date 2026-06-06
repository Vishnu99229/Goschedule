# GoSchedule.ai — Indexing Issues (Phase 1, read-only)

**Date:** 2026-06-06
**Method:** Code + local `dist/` build only. Live indexing status (GSC) is
**not** asserted — see "Manual verification" at the end.

---

## The one issue that matters most

**Body content is not in the static HTML.** Every prerendered file
(`dist/**/index.html`) contains:

```html
<body>
  <div id="root"></div>
  <script type="module" src="/assets/...js"></script>
</body>
```

The `<head>` is fully populated per route (title, description, canonical, OG,
Twitter, JSON-LD via `scripts/postbuild.mjs`), but the **visible content
(H1 text, paragraphs, links) only exists after React mounts in the browser.**

Why this is an indexing risk now that Prerender.io has lapsed:
- **Googlebot** renders JS, so it can likely still index the body — but
  rendering is a deferred, budget-limited second pass. Newer/low-authority pages
  can sit in *"Discovered – currently not indexed"* / *"Crawled – currently not
  indexed"* longer.
- **Non-Google consumers see nothing in the body:** Bing's JS rendering is
  limited; LLM crawlers, and **all OG/social/link-preview scrapers** read raw
  HTML only. (OG *tags* are present, so link previews still work; but body text
  for AI answers / non-rendering indexers is absent.)
- This is precisely what Prerender.io used to paper over for bots. With it gone,
  the gap is live.

**Fix:** Phase 3, Option A (SSG) — render the React tree to HTML at build,
`AgentDemo` as a client-only island. Detailed in `seo-audit-report.md` §8 and
`technical-seo-recommendations.md`.

---

## Indexing issues found (code-derivable)

### I-1 (Critical, verify live) — Catch-all rewrite could mask per-route HTML
`vercel.json` ends with:
```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```
Vercel normally serves an existing static file **before** applying `rewrites`,
so `/products/replykaro` should resolve to
`dist/products/replykaro/index.html` (correct metadata). **But this is not
provable from code.** If the rewrite were applied first, *every* URL would
return the homepage's HTML/title/canonical → mass duplicate-canonical and wrong
snippets. **Must confirm live (Manual #1).**

### I-2 (High) — Product pages are effectively orphaned for crawlers
The only internal links to `/products/morning-brief|replykaro|resound` live
inside the navbar's **conditionally-rendered** dropdown
(`{productsOpen && <panel/>}` in `Navbar.tsx`) and the closed mobile sheet. Those
links are **not in the DOM** until the user opens the menu, so a crawler parsing
the page (even after hydration, pre-interaction) finds **no internal link** to
the product pages. They're in the sitemap (discoverable) but receive **no
internal link equity or anchor-text context**. Details + fix in
`internal-linking-report.md`. (This compounds with the body-prerender gap.)

### I-3 (High) — Broken homepage hash anchors
`Navbar.tsx` links to `/#outbound-agent`, `/#inbound-agent`, `/#ops-agent`,
`/#custom-agent`, but **no element with those `id`s exists** (grep of the home
components finds only `id="agents"`, `id="approach"`, `id="pricing"`,
`id="agent-live"`). These four nav links scroll nowhere. Not a deindex risk, but
broken UX/crawl paths advertised in navigation.

### I-4 (Medium) — Soft 404s for unknown URLs
No catch-all `*` route in `App.tsx`. An unknown top-level URL (e.g.
`/foo`) renders Navbar + Footer + empty `<Routes>` outlet and (via the Vercel
rewrite) returns **HTTP 200 with no content** → a soft 404 Google may flag.
(`BlogPostPage` does redirect unknown slugs to `/blog`, so blog is covered; the
gap is arbitrary top-level paths.) Confirm behavior live (Manual #4).

### I-5 (Medium, verify live) — Duplicate head tags after hydration
Static HTML already has canonical/OG/Twitter (postbuild). On the client,
`react-helmet-async` (`SEO.tsx`) injects its own canonical/OG/Twitter. Helmet
only manages tags it created, so the live DOM may contain **two** of each after
JS runs. Generally tolerated by Google but ambiguous; confirm in DevTools
(Manual #5) and de-duplicate in Phase 2/3.

### I-6 (Low) — Sitemap `lastmod` churns on every build
Marketing routes get `lastmod = build date` every deploy regardless of real
changes (`scripts/postbuild.mjs` → `generateSitemap`). Repeatedly signaling
"changed today" can erode trust in the freshness signal. Blog posts correctly
use frontmatter `date`.

### I-7 (Low) — Shared OG image alt/dimensions on all pages
`postbuild.mjs` rewrites `og:image` per route but leaves the homepage's
`og:image:alt` ("AI Agents That Run Your Revenue Engine.") and `1200×630`
dimensions on every page, including blog posts with a different cover image.
Cosmetic / accessibility-of-preview issue.

### I-8 (Informational) — AI crawler blocks in robots.txt
`GPTBot`, `ClaudeBot`, `CCBot`, `anthropic-ai` are `Disallow: /` and
`Google-Extended: Disallow: /`. None of these block **Google Search indexing**
(`Google-Extended` only governs Gemini training). So this does **not** harm
classic SEO. It does opt the site out of AI training / some AI-answer surfaces —
a business choice (note the Claude-partner badge in the footer). No SEO fix
needed.

---

## What is already healthy (so we don't "fix" it)

- ✅ Per-route static `<head>`: unique title/description/canonical/OG/Twitter on
  all 13 routes (`postbuild.mjs`).
- ✅ Canonicals are absolute, self-referential, and match the sitemap exactly.
- ✅ `robots.txt` does not block Googlebot or any asset path; sitemap referenced.
- ✅ Sitemap contains all 13 routes, no stale/orphan URLs.
- ✅ Legacy URLs 301'd in `vercel.json` (`/replykaro.html`, `/orlena*`,
  `/waitlist*`) — good consolidation (verify live, Manual #2).
- ✅ BlogPosting + FAQPage + Blog JSON-LD already implemented and baked into
  static HTML.
- ✅ `google-site-verification` + `robots: index, follow` present in base HTML
  and preserved across routes.

---

## Manual verification needed (live / GSC — you run these)

1. **(Critical) Per-route HTML served, not homepage:**
   `curl -s https://www.goschedule.ai/products/replykaro | grep -i "<title>"`
   → expect the ReplyKaro title. Repeat for `/products/resound`, `/docs`,
   `/blog/replykaro-ai-calling-whatsapp-agent`. (Confirms/denies I-1.)
2. **Redirects:** `curl -sI https://www.goschedule.ai/replykaro.html` → expect
   308/301 to `/products/replykaro`; same for `/orlena`, `/orlena.html`,
   `/waitlist`, `/waitlist.html`.
3. **sitemap/robots:** `curl -sI https://www.goschedule.ai/sitemap.xml` and
   `/robots.txt` → 200 + correct content-type.
4. **Soft 404:** load `https://www.goschedule.ai/does-not-exist` — blank 200
   SPA or real 404? (Confirms I-4.)
5. **Duplicate head tags:** DevTools → `<head>` on a product page; count
   `<link rel=canonical>` and `<meta property="og:title">` (expect 1 each).
   (Confirms I-5.)
6. **GSC Pages report:** Indexed vs *Discovered/Crawled – currently not
   indexed*; any *Duplicate without user-selected canonical*; *Excluded by
   noindex* (expect none); *Blocked by robots.txt* (expect none for Googlebot).
7. **GSC URL Inspection → "View crawled page" (rendered HTML):** does Google's
   rendered body actually contain the page text? This is the definitive test of
   whether the JS-only body is being indexed today.
8. **Crawl stats** (GSC → Settings): is Googlebot actually hitting the site
   (total crawl requests > ~0)?
9. **Prerender.io detached:** no leftover Prerender token/middleware or
   `X-Prerender*` headers on Vercel/DNS.

---

*No code changed in this phase.*
