# GoSchedule.ai — SEO Audit Report (Phase 1, read-only)

**Date:** 2026-06-06
**Scope:** Derived from the codebase and the local `dist/` build only. No live
crawl, no Google Search Console, no Lighthouse. Anything that can only be
checked on the live site is in **[§9 Manual verification needed](#9-manual-verification-needed)** and is *not* asserted as fact here.

---

## 0. Most important correction to the brief

The brief states: *"bots currently receive the bare JS shell."* That is **only
half true**, and the distinction drives the whole plan:

| Layer | Status in the current build |
|---|---|
| `<head>` metadata (title, description, canonical, OG, Twitter, JSON-LD) | **Already prerendered to static HTML** per route by `scripts/postbuild.mjs`. Bots see correct, unique metadata *without* running JS. |
| `<body>` content (H1 text, paragraphs, headings, links) | **Not prerendered.** Every `dist/**/index.html` ships `<div id="root"></div>` and nothing else. Body content exists only after React mounts. |

So the live indexing risk from the Prerender.io lapse is specifically: **crawlers
and scrapers that don't execute JS see correct metadata but zero body content.**
Googlebot does render JS (so it can likely still read the body, budget
permitting), but LLM/social/secondary crawlers and OG scrapers generally do not.

This means:
- The "metadata" half of typical SEO hygiene is **mostly already done** and done
  well (per-route `postbuild.mjs` + a generated sitemap).
- Phase 2 is therefore smaller than the brief assumes (mostly: missing schema,
  a few weak titles, and internal-linking fixes).
- Phase 3 (body-content prerendering) is the one change that actually closes the
  Prerender.io gap. **Recommended: Option A — extend the existing build to render
  the React tree to HTML (SSG), with `AgentDemo` as a client-only island.**

---

## 1. Stack & rendering pipeline (as built)

- **React 19 + Vite 7**, TypeScript, `react-router-dom` v7 with `BrowserRouter`
  (`src/main.tsx`), client-rendered via `createRoot`.
- **Head management:** `react-helmet-async` via `src/components/SEO.tsx`
  (client-side) **plus** static head injection at build time
  (`scripts/postbuild.mjs`).
- **Build:** `tsc -b && vite build && node scripts/postbuild.mjs`. The postbuild
  step:
  1. Reads the Vite-built `dist/index.html`.
  2. For each marketing route and each `content/blog/*.md` post, writes a
     directory-style `dist/<route>/index.html` with route-specific
     title/description/canonical/OG/Twitter and (for posts) BlogPosting +
     optional FAQPage JSON-LD injected into `<head>`.
  3. Regenerates `dist/sitemap.xml` from the union of routes + posts.
- **Hosting:** Vercel. `vercel.json` has 301 redirects for legacy URLs and a
  catch-all rewrite `/(.*) → /index.html`.
  - ⚠️ The catch-all rewrite *vs.* the per-route static files is the single most
    important thing to verify live (see §9). If Vercel applies the rewrite
    *before* the filesystem, every URL would serve the homepage's HTML/metadata
    and the whole postbuild benefit is lost. Vercel normally serves existing
    static files first, so this is *expected* to be fine — but it is not
    verifiable from code alone.

---

## 2. Route inventory

From `src/App.tsx` `<Routes>`:

| # | Route | Type | Component | In sitemap? | Static HTML in dist? |
|---|---|---|---|---|---|
| 1 | `/` | static | `HomePage` (Hero, Agents, Problem, System, Results, AgentInAction, Pricing, CTA) | ✅ | ✅ |
| 2 | `/products/morning-brief` | static | `MorningBriefPage` | ✅ | ✅ |
| 3 | `/products/replykaro` | static | `ReplykaroPage` | ✅ | ✅ |
| 4 | `/products/resound` | static | `ResoundPage` | ✅ | ✅ |
| 5 | `/blog` | static | `BlogIndexPage` | ✅ | ✅ |
| 6 | `/blog/:slug` | **dynamic** | `BlogPostPage` (1 post today: `replykaro-ai-calling-whatsapp-agent`) | ✅ (per post) | ✅ (per post) |
| 7 | `/docs` | static | `DocsPage` | ✅ | ✅ |
| 8 | `/docs/technical-note` | static | `DocsTechnicalNotePage` | ✅ | ✅ |
| 9 | `/docs/morning-brief` | static | `DocsMorningBriefPage` | ✅ | ✅ |
| 10 | `/docs/replykaro` | static | `DocsReplyKaroPage` | ✅ | ✅ |
| 11 | `/docs/resound` | static | `DocsResoundPage` | ✅ | ✅ |
| 12 | `/terms-and-conditions` | static | `TermsAndConditions` | ✅ | ✅ |
| 13 | `/privacy-policy` | static | `PrivacyPolicy` | ✅ | ✅ |

**Notes / discrepancies vs. the brief's expected page list:**
- **"Agents pages", "Approach", "Pricing" are NOT routes.** They are *homepage
  sections* reached by hash anchors: `#agents` (`Agents.tsx`), `#approach`
  (`System.tsx`), `#pricing` (`Pricing.tsx`), `#agent-live`
  (`AgentInAction.tsx`). There is no standalone `/pricing`, `/approach`, or
  `/agents` URL to index. If you want those to rank as pages, they would need
  their own routes.
- **No catch-all `*` / 404 route.** Unknown URLs render Navbar + Footer with an
  empty `<Routes>` outlet → a blank page that returns HTTP 200 = **soft 404**
  risk. (`BlogPostPage` does handle an unknown slug by redirecting to `/blog`,
  but arbitrary top-level URLs do not.) See §9 for live confirmation.

---

## 3. Per-route metadata audit

Source of truth at build time is `scripts/postbuild.mjs` (head) + each page's
`<SEO>` (client). Titles/descriptions below are the **static** (crawlable)
values.

| Route | `<title>` | Meta description | Canonical | H1 (on-page) | Flags |
|---|---|---|---|---|---|
| `/` | Goschedule.ai — AI Agents for Revenue, Sales & Operations | Deploy AI agents that run your revenue engine… | `…/` | "AI Agents That Run Your Revenue Engine." | OK |
| `/products/morning-brief` | **Morning Brief \| GoSchedule.ai** | A personalized AI news agent that calls you every morning… | `…/products/morning-brief` | "Morning Brief. Your morning news, called in." | Title weak (brand-only suffix, no keyword like "AI news agent") |
| `/products/replykaro` | ReplyKaro — AI Inbound Response Agent \| Goschedule.ai | ReplyKaro is an AI agent that responds to every inbound lead… | `…/products/replykaro` | "Replykaro — The AI Agent That Never Misses a Lead" | OK (strong) |
| `/products/resound` | **Resound.ai \| GoSchedule.ai** | Multi-tenant outbound sales automation with AI reply handling… | `…/products/resound` | "Resound.ai. Outbound sales, automated end to end." | Title weak (no value prop / keyword) |
| `/blog` | Blog \| Goschedule.ai | Insights on AI agents for revenue, sales, and operations… | `…/blog` | "Notes from the team building agents that run revenue." | OK |
| `/blog/replykaro-ai-calling-whatsapp-agent` | ReplyKaro: AI Calling and WhatsApp Agent That Books Appointments | ReplyKaro answers thousands of inbound calls… | `…/blog/<slug>` | "ReplyKaro: The AI Agent That Answers Every Call and Books Every Lead" | OK. (Title vs on-page H1 differ — acceptable.) |
| `/docs` | **Documentation \| GoSchedule.ai** | **Technical documentation for GoSchedule.ai products.** | `…/docs` | "Documentation" | Title + description both thin/generic |
| `/docs/technical-note` | Our Technical Note \| GoSchedule.ai | How GoSchedule.ai builds vertical AI agents… | `…/docs/technical-note` | (heading prop) | OK |
| `/docs/morning-brief` | Morning Brief Documentation \| GoSchedule.ai | Technical documentation for Morning Brief… | `…/docs/morning-brief` | "Morning Brief Documentation" | OK |
| `/docs/replykaro` | ReplyKaro Documentation \| GoSchedule.ai | Technical documentation for ReplyKaro… | `…/docs/replykaro` | "ReplyKaro Documentation" | OK |
| `/docs/resound` | Resound.ai Documentation \| GoSchedule.ai | Technical documentation for Resound.ai… | `…/docs/resound` | "Resound.ai Documentation" | OK |
| `/terms-and-conditions` | Terms and Conditions \| Goschedule.ai | Terms and conditions for using Goschedule.ai… | `…/terms-and-conditions` | "Terms and Conditions" | OK |
| `/privacy-policy` | Privacy Policy \| Goschedule.ai | Privacy policy for Goschedule.ai… | `…/privacy-policy` | "Privacy Policy" | OK |

**Cross-cutting metadata findings:**

- **F-META-1 (Low): Brand-casing inconsistency in titles.** Some titles use
  `Goschedule.ai`, others `GoSchedule.ai`. Pick one (the logo/most copy uses
  `Goschedule.ai`). Cosmetic but affects brand-snippet consistency.
- **F-META-2 (Medium): Weak/generic titles** on `/products/morning-brief`,
  `/products/resound`, and `/docs` (title *and* description). These bury the
  searchable terms behind the brand name.
- **F-META-3 (Low): Shared OG image alt + dimensions leak to every page.**
  `postbuild.mjs` rewrites `og:image` but leaves `og:image:alt`,
  `og:image:width`, `og:image:height` from the base `index.html` (the homepage
  values: alt "AI Agents That Run Your Revenue Engine.", 1200×630) on *all*
  pages, including blog posts whose `og:image` is a differently-sized cover.
  Mostly harmless; the alt is just wrong on non-home pages.
- **F-META-4 (Medium, verify live): Possible duplicate head tags after
  hydration.** Each page's static HTML already contains canonical/OG/Twitter
  tags (from postbuild). On the client, `react-helmet-async` (`SEO.tsx`) injects
  its *own* canonical/OG/Twitter. Helmet only de-dupes tags it manages; the
  pre-existing static tags were not rendered by Helmet, so the live DOM may end
  up with **two** canonicals / two `og:title` etc. after JS runs. Needs a
  DevTools check (see §9). Low real-world impact but worth removing the
  ambiguity (e.g. let postbuild own the head and have client SEO only set
  `<title>`, or vice-versa).
- **F-META-5 (Low): `summary_large_image` Twitter card has no `twitter:site` /
  `twitter:creator`.** Optional, add if a brand X/Twitter handle exists.

---

## 4. robots.txt (`public/robots.txt`)

```
User-agent: *            Allow: /
User-agent: GPTBot       Disallow: /
User-agent: ClaudeBot    Disallow: /
User-agent: CCBot        Disallow: /
User-agent: Google-Extended  Disallow: /
User-agent: anthropic-ai Disallow: /
Sitemap: https://www.goschedule.ai/sitemap.xml
```

- ✅ Syntax valid. Googlebot/Bingbot fully allowed. Sitemap correctly referenced
  with absolute URL.
- ✅ No rule blocks any important path. No accidental `Disallow: /assets` etc.
- ℹ️ **F-ROBOTS-1 (Informational, business choice):** GPTBot, ClaudeBot, CCBot,
  anthropic-ai are blocked → the site is opted **out** of AI training and, for
  some of these, out of being cited in AI answers. `Google-Extended` only
  affects Gemini/Vertex training, **not** Google Search indexing, so it does not
  hurt classic SEO. If appearing in ChatGPT/Claude/Perplexity answers is
  desired, reconsider. No change recommended without your call.
- ℹ️ Note the company is a "Claude Partner" (footer badge) yet blocks
  `ClaudeBot`/`anthropic-ai`. Possibly intentional; flagging the tension.

---

## 5. sitemap.xml (`dist/sitemap.xml`, generated)

- ✅ 13 `<url>` entries = exactly the 13 routes in §2. Every `<loc>` matches the
  page's canonical. No orphan or stale URL.
- ✅ Valid XML, correct namespace, `changefreq` + `priority` present.
- ⚠️ **F-SITEMAP-1 (Low): `lastmod` churns every build.** Marketing routes get
  `lastmod = build date` (today) on *every* deploy regardless of whether content
  changed. Repeatedly telling Google "everything changed today" can dilute the
  freshness signal. Prefer a real per-page last-modified (e.g. git commit date
  of the page/source, or a stored date). Blog posts already use the frontmatter
  `date` — good.
- ℹ️ **F-SITEMAP-2 (Low): No `sitemap.xml` in `public/`** — it only exists after
  build, in `dist/`. Fine for Vercel (it deploys `dist/`), but if anything ever
  serves `public/` without running the build, the sitemap is missing. Not a live
  problem today.
- 🔎 Live check needed: that `https://www.goschedule.ai/sitemap.xml` actually
  returns this file (see §9) and not the SPA fallback HTML.

---

## 6. Structured data (JSON-LD)

Present today (both client `<SEO jsonLd>` and static postbuild injection):

| Schema | Where | Status |
|---|---|---|
| `BlogPosting` | each blog post | ✅ present (`BlogPostPage.tsx`, `postbuild.mjs`) |
| `FAQPage` | blog posts with `faqs` frontmatter | ✅ present |
| `Blog` + `BlogPosting` list | `/blog` index | ✅ present (`BlogIndexPage.tsx`) |

**Missing (high-value), with recommended placement:**

- **F-SCHEMA-1 (High): `Organization` (+ `WebSite`) on the homepage.** No
  Organization schema anywhere. Add to `/` with `name`, `url`, `logo`,
  `sameAs` (social profiles), and optionally `WebSite` with `potentialAction`
  (SearchAction) if you add site search. This is the standard signal for brand
  knowledge-panel / logo in results.
- **F-SCHEMA-2 (High): `SoftwareApplication` or `Product` on the three product
  pages** (`/products/morning-brief`, `/products/replykaro`, `/products/resound`).
  None today. Add `name`, `description`, `applicationCategory`,
  `offers`/pricing where applicable.
- **F-SCHEMA-3 (Medium): `BreadcrumbList` on nested pages** (`/products/*`,
  `/docs/*`, `/blog/*`). `DocsArticleLayout` and `BlogPostPage` render a *visual*
  "Back to docs/blog" breadcrumb but emit no `BreadcrumbList` JSON-LD.
- **F-SCHEMA-4 (Low/optional): `FAQPage` on product pages** if/when you add a
  Q&A block (none today). The blog post already does this well.

---

## 7. Thin-content assessment

Two lenses, because of the body-prerender gap (§0):

**(a) Rendered (JS-on) content — what a user / Googlebot-with-render sees:**

| Page | Assessment |
|---|---|
| `/blog/replykaro-…` | Healthy (~800+ words, good H2 structure, FAQ). |
| `/products/replykaro` | Reasonable (hero + problem + feature grid + more; 351-line component). |
| `/products/morning-brief`, `/products/resound` | Moderate; visual-heavy, likely near or just above ~300 words. Could use more indexable prose. |
| `/docs/*` articles | Reasonable technical prose + diagrams. |
| `/docs` index | **Thin** — eyebrow + H1 "Documentation" + one-line sub + link cards. ~30 words of unique prose. |
| `/`, homepage | Lots of sections, but copy is short/punchy; the demo is interactive, not text. |
| `/terms-and-conditions`, `/privacy-policy` | Long (legal), fine. |
| `/blog` index | One post → the blog as a content hub is thin *sitewide* (only 1 article). Each post is fine; the section needs volume. |

**(b) Raw HTML (JS-off) content — what non-rendering crawlers/scrapers see:**

> **Every page is effectively zero-content**, because `<body>` is just
> `<div id="root"></div>`. This is the dominant thin-content issue and is an
> architecture problem (§8), not a copy problem.

- **F-THIN-1 (Medium): `/docs` index is thin even rendered** — add an intro
  paragraph / description per doc.
- **F-THIN-2 (Medium): Blog hub depth** — only one post. More posts (and
  internal links from them, §below) materially help.

---

## 8. Architecture finding (root cause + options)

**Root cause of the indexing risk:** client-only rendering of `<body>`. With
Prerender.io lapsed, any crawler/scraper that doesn't execute JS gets correct
metadata but **no body content**. Googlebot renders JS so it can *probably* still
index the body, but: render is deferred and budget-limited, and all non-Google
consumers (Bing's render is limited, LLM crawlers, social/OG scrapers, link
previews) see nothing. The existing `postbuild.mjs` already solved the *head*;
it does not touch the *body*.

**Options evaluated for THIS codebase:**

| Option | What it is | Effort | Impact | Fit here |
|---|---|---|---|---|
| **A — Static prerender / SSG** (e.g. `vite-react-ssg`, or extend the existing build to `renderToString` each route via React Router `StaticRouter`) | Render the React tree to real HTML at build, hydrate on client. | **Low–Med** | **High** | **Best.** Reuses the existing route list + markdown pipeline. Blog is file-based (`gray-matter`, already enumerated in `postbuild.mjs`). Only one true browser-only blocker: `AgentDemo`. |
| B — Vite SSR (runtime) | A Node server renders per request. | Med–High | High | Overkill for a static marketing site; adds a server to run/operate. Not recommended. |
| C — Next.js migration | Rewrite to Next App Router. | **High** | High | Large rewrite (router, head/metadata, page structure, `AgentDemo` → `'use client'`). Only worth it if you want ISR, a big editorial blog, image optimization, etc. Not recommended now. |

**Recommendation: Option A — static prerendering (SSG).**

Justification specific to this repo:
- The route table is small and fully enumerable; `postbuild.mjs` already lists
  every marketing route and discovers blog posts from `content/blog/*.md`. SSG
  slots directly into this.
- `react-helmet-async` is already in use and is SSR/SSG-compatible (it can emit
  the head on the server too — potentially *replacing* the manual head-injection
  in `postbuild.mjs` and eliminating F-META-4's duplicate-tag risk).
- The **only** hard SSR blocker is browser-only code, principally
  `src/components/AgentDemo.tsx` (`window.speechSynthesis`, timers, Framer
  Motion). It must be a **client-only island** (render a static placeholder on
  the server, mount the real component after hydration) so the build doesn't
  crash on `window`/`document`/`speechSynthesis`. Other components touch `window`
  only inside `useEffect` (e.g. `Navbar`, `ScrollToTop`), which is SSR-safe; a
  pre-Phase-3 grep for render-time/module-scope `window`/`document` access is
  still warranted.
- Tooling note: `vite-react-ssg` is the lowest-friction path (purpose-built for
  Vite + React Router, ships a `ClientOnly` wrapper). Alternatively, extend the
  existing `postbuild.mjs`/build to do a `react-dom/server` static render — more
  control, slightly more code. Either keeps Vite.

**Not implemented in this phase.** Detailed plan belongs to Phase 3.

---

## 9. Manual verification needed (live-only — NOT asserted here)

Run these yourself; they cannot be derived from code:

1. **Per-route HTML actually served (critical).**
   `curl -s https://www.goschedule.ai/products/replykaro | grep -i "<title>"`
   → must show the **ReplyKaro** title, not the homepage title. Repeat for
   `/products/resound`, `/docs`, `/blog/replykaro-ai-calling-whatsapp-agent`.
   If they all show the homepage title, the Vercel catch-all rewrite is
   overriding the static files (see §1) and that becomes the #1 issue.
2. **HTTP status codes.**
   `curl -sI https://www.goschedule.ai/` (expect 200);
   `curl -sI https://www.goschedule.ai/replykaro.html` (expect 308/301 →
   `/products/replykaro`); same for `/orlena`, `/orlena.html`, `/waitlist`,
   `/waitlist.html`.
3. **sitemap & robots reachable.**
   `curl -sI https://www.goschedule.ai/sitemap.xml` and `/robots.txt` (expect
   200, correct content-type).
4. **Soft-404 behavior.** Visit a nonsense URL e.g.
   `https://www.goschedule.ai/this-does-not-exist` — does it 200 with a blank
   SPA (soft 404) or serve a real 404? Confirms the missing `*` route impact.
5. **Duplicate head tags after hydration (F-META-4).** Load a product page,
   open DevTools → Elements → `<head>`, count `<link rel="canonical">` and
   `<meta property="og:title">`. Should be exactly one each.
6. **Google Search Console:** Coverage/Pages report — counts of *Indexed* vs
   *Discovered – currently not indexed* / *Crawled – currently not indexed*;
   any *Duplicate without user-selected canonical*; URL Inspection → "View
   crawled page" to confirm Googlebot's **rendered** HTML contains body content
   (this is the real test of whether the JS-only body is being indexed).
7. **PageSpeed Insights / Lighthouse:** real Core Web Vitals (LCP/INP/CLS),
   performance, SEO score — for `/` and one product page.
8. **Prerender.io fully detached:** confirm no leftover Prerender token,
   middleware, or `X-Prerender` header path on Vercel/DNS.

---

## 10. Prioritized action plan

Legend: **[P2]** = safe Phase-2 fix (no architecture change). **[P3]** =
architecture (separate approval). **[GSC]** = manual/live, you run it.

### Critical
- **C1 [GSC]** Verify per-route HTML is actually served live (§9.1). Everything
  else assumes it is.
- **C2 [P3]** Body content is not in static HTML (§8). The architecture fix
  (Option A, SSG with `AgentDemo` as a client-only island) is the only thing
  that truly closes the Prerender.io gap. **Needs its own phase + your explicit
  go-ahead.**

### High
- **H1 [P2]** Add `Organization` (+ `WebSite`) JSON-LD on homepage (F-SCHEMA-1).
- **H2 [P2]** Add `SoftwareApplication`/`Product` JSON-LD on the 3 product pages
  (F-SCHEMA-2).
- **H3 [P2]** Fix internal linking: product pages are only linked from the
  *conditionally-rendered* nav dropdown → effectively orphaned for crawlers; add
  always-present contextual links (details in `internal-linking-report.md`).
- **H4 [P2]** Fix the **broken homepage anchors** `#outbound-agent`,
  `#inbound-agent`, `#ops-agent`, `#custom-agent` in the navbar — no matching
  `id` exists (only `#agents`). (See linking report.)

### Medium
- **M1 [P2]** Add `BreadcrumbList` JSON-LD to `/products/*`, `/docs/*`,
  `/blog/*` (F-SCHEMA-3).
- **M2 [P2]** Strengthen weak titles/descriptions: `/products/morning-brief`,
  `/products/resound`, `/docs` (F-META-2).
- **M3 [P2]** Resolve duplicate-head-tag ambiguity between postbuild and Helmet
  (F-META-4) — after live confirmation (§9.5).
- **M4 [P2/P3]** Decide on a `*` / 404 route to avoid soft 404s (a basic
  client 404 is P2; a properly-statused 404 may need Phase-3/host config).
- **M5 [P2]** Thicken `/docs` index copy (F-THIN-1); plan more blog posts
  (F-THIN-2).

### Low
- **L1 [P2]** Normalize brand casing in titles (F-META-1).
- **L2 [P2]** Fix per-page `og:image:alt` / dimensions leak (F-META-3).
- **L3 [P2]** Make sitemap `lastmod` reflect real change dates, not build date
  (F-SITEMAP-1).
- **L4 [P2]** Optional: `twitter:site`/`twitter:creator` (F-META-5).
- **L5 [—]** Reconsider robots AI-bot blocks vs. Claude-partner positioning
  (F-ROBOTS-1) — business decision, no code change recommended without your call.

### Separation summary
- **Safe for Phase 2 (no architecture change):** H1, H2, H3, H4, M1, M2, M3,
  M5, L1, L2, L3, L4, and the client-side part of M4.
- **Architecture, needs its own phase + explicit approval:** C2 (Option A SSG),
  and any properly-statused-404 part of M4.
- **You run (live/GSC):** C1 and everything in §9.

---

*End of audit. No code was changed in this phase. Awaiting approval before
Phase 2. See companion files: `indexing-issues.md`,
`technical-seo-recommendations.md`, `internal-linking-report.md`.*
