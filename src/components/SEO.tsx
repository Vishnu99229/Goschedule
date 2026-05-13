import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  canonical: string
  ogImage?: string
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = 'https://www.goschedule.ai/og-image.png',
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:url" content={canonical} />
    </Helmet>
  )
}
