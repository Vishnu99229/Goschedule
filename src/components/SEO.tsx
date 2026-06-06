import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  ogType?: 'website' | 'article'
  jsonLd?: object | object[]
}

function setMeta(selector: string, content: string) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

/**
 * Head metadata is owned by the build-time pipeline (scripts/postbuild.mjs),
 * which bakes a correct, de-duplicated <head> into every route's static HTML.
 *
 * This component intentionally emits NO head elements. It only mirrors the
 * per-route values onto the EXISTING postbuild-created tags, in place, after
 * hydration — so client-side SPA navigation keeps the tab title and metadata
 * in sync. Because it updates existing tags and never creates new ones, runtime
 * duplication is impossible. JSON-LD stays owned by postbuild (static <head>);
 * Google/scrapers fetch each URL directly and get the correct static head.
 *
 * (The `jsonLd` prop is retained so call sites are unchanged; postbuild renders
 * it statically per route.)
 */
export default function SEO({
  title,
  description,
  canonical,
  ogImage = 'https://www.goschedule.ai/og-image-v2.png',
  ogType = 'website',
}: SEOProps) {
  useEffect(() => {
    document.title = title
    setMeta('meta[name="description"]', description)

    const canon = document.head.querySelector('link[rel="canonical"]')
    if (canon) canon.setAttribute('href', canonical)

    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', canonical)
    setMeta('meta[property="og:image"]', ogImage)
    setMeta('meta[property="og:type"]', ogType)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    setMeta('meta[name="twitter:image"]', ogImage)
    setMeta('meta[name="twitter:url"]', canonical)
  }, [title, description, canonical, ogImage, ogType])

  return null
}
