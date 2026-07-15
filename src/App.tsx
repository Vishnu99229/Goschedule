import { Routes, Route } from 'react-router-dom'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Agents from './components/Agents'
import Problem from './components/Problem'
import System from './components/System'
import Results from './components/Results'
import AgentInAction from './components/AgentInAction'
import CaseStudies from './components/CaseStudies'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import TermsAndConditions from './components/TermsAndConditions'
import PrivacyPolicy from './components/PrivacyPolicy'
import ScrollToTop from './components/ScrollToTop'
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

const SITE = 'https://www.goschedule.ai'

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
  logo: `${SITE}/favicon.png`,
  description:
    'Goschedule.ai deploys AI agents that run revenue, sales, and operations for businesses — 24/7, learning, and outcome-driven.',
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Goschedule.ai',
  url: `${SITE}/`,
}

function HomePage() {
  return (
    <main>
      <SEO
        title="Goschedule.ai — AI Agents for Revenue, Sales & Operations"
        description="Deploy AI agents that run your revenue engine. From outbound sales to operations — 24/7, learning, outcome-driven."
        canonical="https://www.goschedule.ai/"
        jsonLd={[organizationJsonLd, websiteJsonLd]}
      />
      <Hero />
      <Agents />
      <Problem />
      <System />
      <Results />
      <AgentInAction />
      <CaseStudies />
      <Pricing />
      <CTA />
    </main>
  )
}

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
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
