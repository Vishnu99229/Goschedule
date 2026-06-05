import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
  ogType?: 'website' | 'article'
  jsonLd?: object | object[]
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = 'https://www.goschedule.ai/og-image-v2.png',
  ogType = 'website',
  jsonLd,
}: SEOProps) {
  const jsonLdBlocks = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : []

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={ogType} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={canonical} />
      {jsonLdBlocks.map((block, idx) => (
        <script
          key={`jsonld-${idx}`}
          type="application/ld+json"
        >
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
