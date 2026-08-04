import { Routes, Route } from 'react-router-dom'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import FdeServicesPage from './pages/FdeServicesPage'
import FreeSetupPage from './pages/FreeSetupPage'
import CafeMuzirisCaseStudyPage from './pages/CafeMuzirisCaseStudyPage'
import MorningBriefPage from './pages/MorningBriefPage'
import ResoundPage from './pages/ResoundPage'
import ReplykaroPage from './pages/ReplykaroPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import DocsPage from './pages/DocsPage'
import DocsTechnicalNotePage from './pages/DocsTechnicalNotePage'
import DocsMorningBriefPage from './pages/DocsMorningBriefPage'
import DocsReplyKaroPage from './pages/DocsReplyKaroPage'
import DocsResoundPage from './pages/DocsResoundPage'
import TermsAndConditions from './components/TermsAndConditions'
import PrivacyPolicy from './components/PrivacyPolicy'

const SITE = 'https://www.goschedule.ai'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.png`,
  description:
    'Goschedule.ai gets you qualified leads with AI agents across WhatsApp, email, and voice — running outreach by hand first, then scaling what works.',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
}

function HomeRoute() {
  return (
    <>
      <SEO
        title="Goschedule.ai — Qualified Leads from AI Agents on WhatsApp, Email & Voice"
        description="Qualified leads from AI agents across WhatsApp, email & voice. We run your outreach by hand first — learning what converts — then agents scale what works."
        canonical="https://www.goschedule.ai/"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
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
        <Route path="/products/morning-brief" element={<MorningBriefPage />} />
        <Route path="/products/resound" element={<ResoundPage />} />
        <Route path="/products/replykaro" element={<ReplykaroPage />} />
        <Route path="/products/fde-services" element={<FdeServicesPage />} />
        <Route path="/products/free-setup" element={<FreeSetupPage />} />
        <Route path="/case-studies/cafe-muziris" element={<CafeMuzirisCaseStudyPage />} />
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
