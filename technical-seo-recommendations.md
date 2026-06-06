# GoSchedule.ai — Technical SEO Recommendations (Phase 1, read-only)

**Date:** 2026-06-06
Each recommendation lists: root cause → SEO impact → exact file → specific fix.
Phase tags: **[P2]** safe (no architecture change), **[P3]** architecture
(separate approval), **[GSC]** live/manual.

---

## A. Architecture (the real fix) — [P3]

### A-1 Prerender the `<body>`, not just the `<head>` (Option A: SSG)
- **Root cause:** `BrowserRouter` + `createRoot` render the body only in the
  browser. `dist/**/index.html` ship `<div id="root"></div>` (empty). Prerender.io
  used to fill this for bots; it lapsed.
- **SEO impact:** Non-rendering crawlers/scrapers see no content; Googlebot's
  render pass is deferred/budget-limited → slower/at-risk indexing of body text.
- **Files:** `src/main.tsx`, `vite.config.ts`, `scripts/postbuild.mjs`,
  `src/components/AgentDemo.tsx`, `package.json` build script.
- **Specific fix (Phase 3, incremental):**
  1. Adopt **`vite-react-ssg`** (lowest friction; built for Vite + React Router,
     ships a `ClientOnly` wrapper) **or** extend the build to `renderToString`
     each route via React Router `StaticRouter` and inject into `#root`.
  2. Convert routing to the SSG entry contract (a route list export); the route
     table is small (§ audit §2) and already mirrored in `postbuild.mjs`.
  3. Wrap `AgentDemo` (and anything touching `window`/`speechSynthesis` at
     render time) as a **client-only island**: render a static placeholder on
     the server, mount the live component after hydration. The demo must behave
     exactly as today post-hydration.
  4. Let `react-helmet-async` emit the head **on the server** during SSG; this
     can replace the manual head-injection in `postbuild.mjs` and remove the
     duplicate-tag risk (see C-3).
  5. Keep `postbuild.mjs`'s sitemap generation (or move it into the SSG step).
  6. Pre-flight: `grep -rn "window\.\|document\.\|speechSynthesis\|localStorage"
     src` and ensure every hit is inside `useEffect`/event handlers, not module
     scope or render bodies. Effects are SSR-safe; render-time access crashes the
     build.
  7. **Verification:** `curl -s https://.../products/replykaro | grep "<h1"`
     must show real H1 text; `view-source` shows paragraphs, not an empty root.
- **Do NOT** start without explicit go-ahead. Report after the **homepage**
  renders to HTML before doing the rest.

---

## B. Structured data — [P2]

### B-1 Organization (+ WebSite) on homepage  *(High)*
- **Root cause:** none exists. **Impact:** brand entity / logo signals.
- **File:** `src/App.tsx` `HomePage` (`<SEO ... jsonLd={...}>`).
- **Fix:** add
  ```json
  {"@context":"https://schema.org","@type":"Organization",
   "name":"Goschedule.ai","url":"https://www.goschedule.ai/",
   "logo":"https://www.goschedule.ai/favicon.png","sameAs":["…social…"]}
  ```
  Optionally a `WebSite` object (add `potentialAction`/SearchAction only if you
  add site search). The `<SEO>` component already accepts `jsonLd` as object or
  array — no component change needed.

### B-2 SoftwareApplication / Product on product pages  *(High)*
- **Files:** `src/pages/MorningBriefPage.tsx`, `ReplykaroPage.tsx`,
  `ResoundPage.tsx`.
- **Fix:** pass `jsonLd` to each `<SEO>` with `@type:"SoftwareApplication"`
  (`name`, `description`, `applicationCategory:"BusinessApplication"`,
  `operatingSystem:"Web"`, and `offers` if you list pricing). For Resound
  (early access) omit price or use availability `PreOrder`.
- **Note for parity:** the client `<SEO jsonLd>` covers Googlebot-rendered. To
  also bake it into static HTML, add a `jsonLd` field to the matching entries in
  `scripts/postbuild.mjs` `MARKETING_ROUTES` (it already supports per-route
  `jsonLd`). Do both for full coverage.

### B-3 BreadcrumbList on nested pages  *(Medium)*
- **Files:** `src/pages/DocsArticleLayout.tsx` (covers all `/docs/*`),
  `src/pages/BlogPostPage.tsx`, product pages.
- **Fix:** emit `BreadcrumbList` JSON-LD mirroring the existing visual
  breadcrumb (Home → Docs → <article>, etc.). Also add to postbuild for static
  parity.

### B-4 (optional) FAQPage on product pages — only if you add a Q&A block.

---

## C. Metadata hygiene — [P2]

### C-1 Strengthen weak titles/descriptions  *(Medium)*
- **Files & current values:**
  - `MorningBriefPage.tsx` + `postbuild.mjs`: `Morning Brief | GoSchedule.ai`
    → e.g. *"Morning Brief — Your Personalized AI News Agent That Calls You |
    Goschedule.ai"*.
  - `ResoundPage.tsx` + `postbuild.mjs`: `Resound.ai | GoSchedule.ai`
    → e.g. *"Resound.ai — Outbound Sales Automation, End to End | Goschedule.ai"*.
  - `DocsPage.tsx` + `postbuild.mjs`: title and the one-line description are
    both generic → add product names/keywords.
- **Impact:** keyword relevance + better SERP CTR.
- **Important:** edit **both** the page `<SEO>` (client) **and** the matching
  `MARKETING_ROUTES` entry in `scripts/postbuild.mjs` (static) so they stay in
  sync.

### C-2 Normalize brand casing  *(Low)*
- Pick one of `Goschedule.ai` / `GoSchedule.ai` (logo/most copy = `Goschedule.ai`)
  and apply across all titles in `postbuild.mjs` + page `<SEO>` calls.

### C-3 Remove duplicate head-tag risk  *(Medium, after live confirm)*
- **Root cause:** both postbuild (static) and Helmet (client) inject
  canonical/OG/Twitter → possibly doubled in live DOM.
- **Files:** `src/components/SEO.tsx` and/or `scripts/postbuild.mjs`.
- **Fix options:** (a) once Phase 3 SSG renders Helmet on the server, drop the
  manual head injection in postbuild; or (b) until then, confirm via DevTools
  (Manual #5) and, if duplicated, make one source authoritative. Low risk —
  validate before changing.

### C-4 Per-page OG image alt/dimensions  *(Low)*
- **File:** `scripts/postbuild.mjs` (`injectMeta`) leaves homepage
  `og:image:alt` / `og:image:width|height` on every page.
- **Fix:** also replace `og:image:alt` per route (and ideally width/height for
  blog covers, or drop the hard-coded dimensions for non-home routes).

### C-5 (optional) `twitter:site` / `twitter:creator` if a handle exists.

---

## D. Crawl / status hygiene

### D-1 Fix broken homepage anchors  *(High)* — [P2]
- **File:** `src/components/Navbar.tsx` (lines ~140–166, 297–308).
- **Root cause:** links to `/#outbound-agent`, `/#inbound-agent`, `/#ops-agent`,
  `/#custom-agent` but no such `id` exists.
- **Fix:** either add matching `id`s to the relevant blocks in
  `src/components/Agents.tsx` (preferred — gives real in-page targets), or point
  the nav links to existing anchors (`#agents`). Coordinate with the
  internal-linking changes (see `internal-linking-report.md`).

### D-2 Decide on a 404 route  *(Medium)* — [P2 client / P3 status]
- **File:** `src/App.tsx`.
- **Fix:** add a `<Route path="*" element={<NotFound/>}/>` so unknown URLs show a
  real "not found" page with a link home (kills the blank soft-404). A
  *properly-statused* 404 (HTTP 404, not 200) requires host/SSG config and can
  ride along with Phase 3.

### D-3 Sitemap `lastmod` should reflect real changes  *(Low)* — [P2]
- **File:** `scripts/postbuild.mjs` (`generateSitemap`).
- **Fix:** instead of `today` for all marketing routes, use a real per-page
  modified date (e.g. `git log -1 --format=%cs <source file>`, or a stored
  constant per route). Blog already uses frontmatter `date` — keep that.

---

## E. Content — [P2 / ongoing]

### E-1 Thicken `/docs` index  *(Medium)*
- **File:** `src/pages/DocsPage.tsx` — add an intro paragraph and a sentence of
  context per doc card (it's currently H1 + one line + link cards).

### E-2 Grow the blog hub  *(Medium, editorial)*
- Only one post exists (`content/blog/`). More posts + the contextual internal
  links below materially help topical authority. New posts auto-flow through
  `postbuild.mjs` (gray-matter) — good pipeline, just needs content.

---

## F. Internal linking — [P2]
See `internal-linking-report.md` for the full graph, orphan analysis, and the
exact contextual links to add (Blog→Product/Docs, Docs→Product, Product→Pricing,
Product/Agents→Contact). This is high-value and low-risk.

---

## Suggested Phase-2 order (all safe, no architecture change)
1. D-1 broken anchors (quick, user-visible).
2. Internal-linking fixes (`internal-linking-report.md`) — biggest SEO lift.
3. B-1, B-2, B-3 schema (homepage Org, product SoftwareApplication, breadcrumbs)
   — edit page `<SEO>` **and** `postbuild.mjs` for parity.
4. C-1/C-2 title & brand fixes (both sources).
5. C-4, D-3, E-1 cleanups.
6. C-3, D-2 after the relevant live confirmations.
7. Re-run `npm run build`, confirm it passes, report, then await Phase-3
   approval for A-1.

*No code changed in this phase.*
