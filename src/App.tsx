import { Navigate, Routes, Route, useLocation } from 'react-router-dom'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import ReplykaroPage from './pages/ReplykaroPage'
import BlogIndexPage from './pages/BlogIndexPage'
import BlogPostPage from './pages/BlogPostPage'
import DocsPage from './pages/DocsPage'
import DocsTechnicalNotePage from './pages/DocsTechnicalNotePage'
import DocsMorningBriefPage from './pages/DocsMorningBriefPage'
import DocsReplyKaroPage from './pages/DocsReplyKaroPage'
import WorkPage from './pages/WorkPage'
import AboutPage from './pages/AboutPage'
import EngagementsPage from './pages/EngagementsPage'
import TermsAndConditions from './components/TermsAndConditions'
import PrivacyPolicy from './components/PrivacyPolicy'
import NotFoundPage from './pages/NotFoundPage'
import { HomeStoryLogo } from './components/home-story/HomeStoryLogo'

const SITE = 'https://www.goschedule.ai'

import {
  HOME_DESCRIPTION,
  HOME_OG_DESCRIPTION,
  HOME_OG_TITLE,
  HOME_TITLE,
  JSONLD_ORG_DESCRIPTION,
  JSONLD_WEBSITE_DESCRIPTION,
} from './constants/copy'

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'GoSchedule',
      url: `${SITE}/`,
      logo: `${SITE}/favicon.png`,
      description: JSONLD_ORG_DESCRIPTION,
    },
    {
      '@type': 'WebSite',
      name: 'GoSchedule',
      url: `${SITE}/`,
      description: JSONLD_WEBSITE_DESCRIPTION,
    },
  ],
}

function HomeRoute() {
  return (
    <>
      <SEO
        title={HOME_TITLE}
        description={HOME_DESCRIPTION}
        ogTitle={HOME_OG_TITLE}
        ogDescription={HOME_OG_DESCRIPTION}
        canonical="https://www.goschedule.ai/"
        jsonLd={homeJsonLd}
      />
      <HomePage />
    </>
  )
}

function App() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="app-shell">
      <a href="#main-content" className="site-skip">Skip to content</a>
      <ScrollToTop />
      {isHome ? <HomeStoryLogo /> : <Navbar />}
      <Routes>
        <Route path="/" element={<HomeRoute />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/replykaro" element={<ReplykaroPage />} />
        <Route path="/work/resound" element={<Navigate to="/work" replace />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/engagements" element={<EngagementsPage />} />
        {/* Legacy product routes: vercel.json 301s in prod; kept for local SPA without redirects */}
        <Route path="/products/resound" element={<Navigate to="/work" replace />} />
        <Route path="/products/replykaro" element={<ReplykaroPage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/docs/technical-note" element={<DocsTechnicalNotePage />} />
        <Route path="/docs/morning-brief" element={<DocsMorningBriefPage />} />
        <Route path="/docs/replykaro" element={<DocsReplyKaroPage />} />
        <Route path="/docs/resound" element={<Navigate to="/docs" replace />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
