# GoSchedule.ai — Internal Linking Report (Phase 1, read-only)

**Date:** 2026-06-06
**Method:** Static analysis of every `<Link to=…>` / `<a href="/…">` in `src/`.
No live crawl.

---

## 1. How links are emitted (critical nuance)

Internal links fall into three buckets by **crawlability**:

| Bucket | Always in the DOM? | Crawlable? |
|---|---|---|
| **Always-rendered** links (Footer, top-level navbar `Blogs`/`Docs`, brand logo, in-content `<Link>`s on blog/docs pages, card grids on `/blog` & `/docs`) | Yes | Yes |
| **Conditionally-rendered** nav dropdowns (`{agentsOpen && …}`, `{productsOpen && …}`) and the closed mobile sheet | **No** — only mount on hover/click | **No** (absent from DOM pre-interaction) |
| **Hash anchors** to homepage sections (`/#approach`, etc.) | Depends (some in always-rendered nav) | Yes, but several targets are broken |

The conditional-rendering detail is the crux of the biggest finding: the
**Products** and **Agents** menus only exist in the DOM after the user opens
them, so links inside them don't count as durable internal links for crawlers.

---

## 2. Always-crawlable internal links (the real graph)

From code, the links that are **always present** in the DOM:

- **Navbar (always-rendered portion):**
  - brand logo → `/`
  - `Blogs` → `/blog`
  - `Docs` → `/docs`
  - `Approach` → `/#approach` ✅ (target `id="approach"` exists in `System.tsx`)
  - `Pricing` → `/#pricing` ✅ (target `id="pricing"` exists in `Pricing.tsx`)
- **Footer (always-rendered, every page):**
  - logo → `/`
  - `Terms & Conditions` → `/terms-and-conditions`
  - `Privacy Policy` → `/privacy-policy`
  - `Contact` → `mailto:hello@goschedule.ai` (not a crawlable internal page link)
- **`/blog` index:** card grid → each `/blog/<slug>` (always rendered)
- **`/docs` index:** card grid → each `/docs/<slug>` (always rendered)
- **`/blog/<slug>` (`BlogPostPage`):** → `/blog`, → `/`
- **`/docs/<slug>` (`DocsArticleLayout`):** → `/docs`, → `/`

### Adjacency list (always-crawlable only)

```
/ (home)
  ├─ /blog        (navbar)
  ├─ /docs        (navbar)
  ├─ /#approach   (navbar, same page)
  ├─ /#pricing    (navbar, same page)
  ├─ /terms-and-conditions   (footer, sitewide)
  └─ /privacy-policy         (footer, sitewide)

/blog
  └─ /blog/replykaro-ai-calling-whatsapp-agent   (card)

/blog/<slug>
  ├─ /blog
  └─ /

/docs
  ├─ /docs/technical-note      (card)
  ├─ /docs/morning-brief       (card)
  ├─ /docs/replykaro           (card)
  └─ /docs/resound             (card)

/docs/<slug>
  ├─ /docs
  └─ /

/products/morning-brief   ──► (no internal links out at all; only external demo CTA)
/products/replykaro       ──► (same)
/products/resound         ──► (same)

(every page) ──► / , /terms-and-conditions , /privacy-policy   via footer
```

### Conditionally-rendered (NOT durably crawlable) links
Inside the navbar dropdowns / closed mobile sheet only:
- Products menu → `/products/morning-brief`, `/products/replykaro`,
  `/products/resound`
- Agents menu → `/#outbound-agent`, `/#inbound-agent`, `/#ops-agent`,
  `/#custom-agent` **(targets don't exist — broken, see F-2)**

---

## 3. Orphan & equity findings

### F-1 (High) — Product pages are effectively orphaned
`/products/morning-brief`, `/products/replykaro`, `/products/resound` have **no
always-rendered internal link pointing to them** (the only links are in the
conditionally-rendered Products dropdown and the closed mobile sheet). They are
in the sitemap, so they're *discoverable*, but they receive **no internal
PageRank/anchor-text context** and aren't reachable by a crawler that doesn't
execute the hover/click interaction.
- **Impact:** weak ranking signals + weak topical association for your three
  flagship product pages.
- **Fix:** add **always-rendered** contextual links to them (see §4).

### F-2 (High) — Broken homepage anchors in the Agents menu
Navbar links `/#outbound-agent`, `/#inbound-agent`, `/#ops-agent`,
`/#custom-agent` have **no matching `id`** anywhere (only `id="agents"`,
`#approach`, `#pricing`, `#agent-live` exist).
- **Impact:** dead in-page navigation; advertised crawl paths that go nowhere.
- **Fix:** add the four `id`s to the relevant blocks in
  `src/components/Agents.tsx`, **or** repoint the nav links to `#agents`.

### F-3 (Medium) — Product pages have zero outbound internal links
`MorningBriefPage`, `ReplykaroPage`, `ResoundPage` contain **no `<Link>`** — only
external "Book a demo"/"Request early access" CTAs. No link to pricing, to their
own docs page, to related products, or to contact.
- **Impact:** dead-ends; no equity flow; no cross-sell crawl path.
- **Fix:** see §4.

### F-4 (Medium) — Blog/Docs articles don't cross-link to the product they describe
- `content/blog/replykaro-ai-calling-whatsapp-agent.md` is entirely about
  ReplyKaro but `BlogPostPage` only links to `/blog` and `/`. It should link to
  `/products/replykaro` and `/docs/replykaro`.
- Each `/docs/<product>` article should link to its `/products/<product>` page
  (and vice-versa).
- **Impact:** missing the most natural, highest-relevance internal links on the
  site.

### F-5 (Low) — No links to product/blog/docs from homepage body
The homepage reaches `/blog` and `/docs` only via the navbar, and product pages
only via the (conditional) dropdown. The homepage **body** links to no internal
page. Adding a few body links (e.g. product cards in the Agents/System sections)
would strengthen the hub.

### Click-depth note
With the sitemap, nominal depth is shallow, but **functionally** the product
pages require a dropdown interaction to reach via nav → for a crawler they are
"linked from sitemap only." Treat them as depth-risk until §4 is done.

---

## 4. Recommended contextual links to add — [P2]

Add only where editorially natural (no link stuffing). Each maps to the brief's
requested patterns (Blog→Products/Agents, Docs→Products, Products→Pricing,
Agents→Contact).

| From | Add link → To | Anchor / placement | Why |
|---|---|---|---|
| `BlogPostPage` (replykaro post) | `/products/replykaro` | in-body + a "Related product" link near the footer of the article | Most relevant link on the site; fixes F-1 & F-4 |
| `BlogPostPage` (replykaro post) | `/docs/replykaro` | "Technical details" inline | F-4 |
| `DocsReplyKaroPage` | `/products/replykaro` | intro or footer | F-3/F-4 cross-link |
| `DocsMorningBriefPage` | `/products/morning-brief` | same | F-4 |
| `DocsResoundPage` | `/products/resound` | same | F-4 |
| `MorningBriefPage` / `ReplykaroPage` / `ResoundPage` | `/#pricing` | a "See pricing" link in/under the hero CTA | Products→Pricing (F-3) |
| `MorningBriefPage` / `ReplykaroPage` / `ResoundPage` | `/docs/<product>` | "Read the docs" secondary link | F-3 cross-link |
| Product pages | `mailto:hello@goschedule.ai` or contact | a "Talk to us" link | Agents/Products→Contact |
| Homepage Agents/System section | `/products/*` | product cards/links in body | F-1/F-5 — makes products always-crawlable from `/` |
| Fix (not add) | navbar Agents menu | repoint to real `#` ids or add ids | F-2 |

**Most important single change:** ensure at least one **always-rendered** link
to each `/products/*` page (homepage body cards and/or the relevant blog/docs
article). That alone resolves the orphan problem (F-1).

**Constraint (per brief):** preserve UI/UX; add links only where they read
naturally; do not restyle.

---

## 5. Summary

- **Healthy:** footer is sitewide; `/blog` and `/docs` index→article linking is
  solid and always-rendered; navbar exposes Blog/Docs/Approach/Pricing.
- **Broken/at-risk:**
  - Product pages effectively orphaned (links hidden in conditional dropdown) —
    **F-1, High.**
  - Four navbar Agents anchors point to non-existent ids — **F-2, High.**
  - Product pages have no outbound internal links — **F-3, Medium.**
  - Blog/Docs don't cross-link to the products they describe — **F-4, Medium.**
- All fixes above are Phase-2 safe (additive links + id fixes), no architecture
  change, no restyle.

*No code changed in this phase.*
