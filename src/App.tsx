import { Routes, Route } from 'react-router-dom'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ResoundPage from './pages/ResoundPage'
import ReplykaroPage from './pages/ReplykaroPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import DocsPage from './pages/DocsPage'
import DocsTechnicalNotePage from './pages/DocsTechnicalNotePage'
import DocsMorningBriefPage from './pages/DocsMorningBriefPage'
import DocsReplyKaroPage from './pages/DocsReplyKaroPage'
import DocsResoundPage from './pages/DocsResoundPage'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import EngagementsPage from './pages/EngagementsPage'
import TermsAndConditions from './components/TermsAndConditions'
import PrivacyPolicy from './components/PrivacyPolicy'

const SITE = 'https://www.goschedule.ai'

const HOME_TITLE =
  'Fractional GTM for AI companies selling into Indian enterprise - Vishnu Rajan'
const HOME_DESCRIPTION =
  'I run GTM for AI companies selling into Indian banks, insurers, and BPOs. Pipeline, pricing, compliance readiness, and the sales motion - two days a week.'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.png`,
  description:
    'Fractional GTM for AI companies selling into Indian enterprise - pipeline, pricing, compliance readiness, and the sales motion.',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  description: HOME_DESCRIPTION,
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Vishnu Rajan',
  url: `${SITE}/`,
  jobTitle: 'Fractional GTM Lead',
  description: HOME_DESCRIPTION,
  sameAs: ['https://www.linkedin.com/in/vishnu-rajan-41515048/'],
  worksFor: {
    '@type': 'Organization',
    name: 'Goschedule.ai',
    url: `${SITE}/`,
  },
}

const professionalServiceJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  description: HOME_DESCRIPTION,
  image: `${SITE}/og-image-v3.png`,
  provider: {
    '@type': 'Person',
    name: 'Vishnu Rajan',
    url: `${SITE}/`,
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  serviceType: ['Fractional GTM leadership', 'GTM teardown', 'Pipeline sprint'],
}

function HomeRoute() {
  return (
    <>
      <SEO
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        canonical="https://www.goschedule.ai/"
        jsonLd={[organizationJsonLd, websiteJsonLd, personJsonLd, professionalServiceJsonLd]}
      />
      <HomePage />
    </>
  )
}

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/replykaro" element={<ReplykaroPage />} />
        <Route path="/work/resound" element={<ResoundPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/engagements" element={<EngagementsPage />} />
        {/* Legacy product routes: vercel.json 301s in prod; kept for local SPA without redirects */}
        <Route path="/products/resound" element={<ResoundPage />} />
        <Route path="/products/replykaro" element={<ReplykaroPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/technical-note" element={<DocsTechnicalNotePage />} />
        <Route path="/docs/morning-brief" element={<DocsMorningBriefPage />} />
        <Route path="/docs/replykaro" element={<DocsReplyKaroPage />} />
        <Route path="/docs/resound" element={<DocsResoundPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
