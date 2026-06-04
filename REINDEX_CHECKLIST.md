# Google Re-Index Checklist

Use this after the SEO-hygiene commit is deployed to production. The goal is to
force Google to drop the old snippet ("Schedule.ai reduces no-shows by
40%... Join the waitlist") and pick up the live positioning ("AI Agents for
Revenue, Sales & Operations").

Search Console property assumed: `https://www.goschedule.ai/` (Domain or
URL-prefix property). Substitute if yours is different.

---

## 0. Wait for the deploy to go live

Before doing anything in Search Console, confirm the latest commit is live:

```bash
curl -s https://www.goschedule.ai/ | grep -E "<title|revised"
curl -sI https://www.goschedule.ai/replykaro.html | head -5
```

Expected:
- `<title>` shows "Goschedule.ai — AI Agents for Revenue, Sales & Operations"
- `<meta name="revised" content="2026-06-04">` is present
- `/replykaro.html` returns `HTTP/2 308` (Vercel permanent redirect) to
  `/products/replykaro`

If `/replykaro.html` still returns `200`, the deploy has not gone out yet. Wait
and retry.

---

## 1. Resubmit the sitemap

In Search Console:

1. Left nav → **Sitemaps**.
2. If `sitemap.xml` is already listed, click it and hit **Submit a refresh**.
3. If it is not listed, add `sitemap.xml` and submit.

The live sitemap is at `https://www.goschedule.ai/sitemap.xml`, includes all
11 current routes, and every `<lastmod>` is dated `2026-06-04`. Google uses
`<lastmod>` to prioritise re-crawling.

---

## 2. Request indexing for the highest-priority pages

Search Console → **URL Inspection** (top search bar). For each URL below,
paste it, wait for the inspection to finish, then click **Request indexing**.

Quota is roughly 10 requests per day, so do these in order:

1. `https://www.goschedule.ai/` (homepage — most important)
2. `https://www.goschedule.ai/products/morning-brief`
3. `https://www.goschedule.ai/products/replykaro`
4. `https://www.goschedule.ai/products/resound`
5. `https://www.goschedule.ai/docs`
6. `https://www.goschedule.ai/docs/technical-note`
7. `https://www.goschedule.ai/blog`

For each: confirm the inspector reports
- **URL is on Google** (or "available to Google" if previously indexed) → request indexing
- Coverage shows the page is **indexable**
- The **Crawled page** preview shows the current title (not the old snippet)

If the preview still shows the old "Schedule.ai" snippet, that is expected
until Google re-crawls; clicking **Request indexing** queues the re-crawl.

---

## 3. Confirm the legacy URL is now a 301

In **URL Inspection**, inspect:

- `https://www.goschedule.ai/replykaro.html`

Expected: coverage report shows **Page with redirect** with target
`/products/replykaro`. If it still shows as indexable, click **Request
indexing** so Google sees the 301 sooner.

Do the same for any of these only if they appear in the **Pages → Why pages are
not indexed** list:

- `/orlena.html`
- `/orlena`
- `/waitlist`
- `/waitlist.html`

All four are 301 redirected by the latest `vercel.json`.

---

## 4. Audit the Pages (Coverage) report

Search Console → **Pages**.

Check each section:

- **Not indexed → Page with redirect**: should now include
  `/replykaro.html` (and any legacy URL that was previously indexed). This
  is the desired outcome.
- **Not indexed → Duplicate without user-selected canonical**: should be
  empty. If anything shows up, click in and verify the canonical points to
  the right URL.
- **Not indexed → Excluded by 'noindex' tag**: should be empty.
- **Not indexed → Blocked by robots.txt**: should be empty. (Our
  `robots.txt` only blocks AI training bots; Googlebot is fully allowed.)
- **Indexed**: should list the 11 routes in the sitemap. Anything else is a
  red flag and should be inspected.

---

## 5. Check Removals

Search Console → **Removals**.

Confirm there are **no active removal requests**. If a stale removal is in
place for the homepage or any product page, that alone would keep the old
snippet around. Cancel any active removal that targets a current URL.

---

## 6. Verify no manual actions or security issues

Left nav → **Manual actions** and **Security issues**. Both should read "No
issues detected." If either has a flag, address it first; nothing else here
will help until those clear.

---

## 7. Domain history (skip if you have always been on goschedule.ai)

If the site previously lived on a different domain (for example,
`schedule.ai` or a `*.vercel.app` subdomain):

1. In Search Console for the **old** property, go to **Settings → Change of
   address** and complete the move to `goschedule.ai`.
2. Confirm the old domain serves a 301 to the new one.
3. Keep both Search Console properties verified for at least 180 days so
   Google can transfer authority cleanly.

If the site has always been on `goschedule.ai`, ignore this step.

---

## 8. Wait, then verify

- 24 to 72 hours after requesting indexing: search `site:goschedule.ai` on
  Google. The snippets for the indexed routes should match the live
  `<title>` and `<meta description>`.
- 7 to 14 days: search `goschedule.ai` (no `site:` prefix). The brand
  snippet should now read "AI Agents for Revenue, Sales & Operations".

If the snippet has not updated after two weeks:

1. Re-run **URL Inspection → Request indexing** for the homepage.
2. Check **Pages → Indexed** to confirm the homepage is still indexed under
   its current canonical (`https://www.goschedule.ai/`).
3. As a last resort, use the **Crawl stats** report (Settings → Crawl stats)
   to confirm Googlebot is actually hitting the site. If `Total crawl
   requests` is near zero, there is a deeper crawl-budget or
   server-availability issue.

---

## Reference: what the codebase changes fix

- Deleted `public/replykaro.html` and its assets so the legacy duplicate page
  no longer exists.
- Added 301 redirects in `vercel.json` for `/replykaro.html`, `/orlena.html`,
  `/orlena`, `/waitlist`, `/waitlist.html`. Google will follow these and
  consolidate signals to the current canonicals.
- Added `<meta name="revised" content="2026-06-04">` in `index.html`. This
  tag is preserved by the per-route HTML generator (`scripts/postbuild.mjs`),
  so it appears on every page.
- The `sitemap.xml` is regenerated on every build with today's date as
  `<lastmod>` for every route, which signals freshness to Googlebot.

Nothing here changes copy or positioning. The goal is purely to make Google
re-crawl and replace the cached snippet.
