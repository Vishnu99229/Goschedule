import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Agents from './components/Agents'
import Problem from './components/Problem'
import System from './components/System'
import Results from './components/Results'
import Ecosystem from './components/Ecosystem'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'
import TermsAndConditions from './components/TermsAndConditions'
import PrivacyPolicy from './components/PrivacyPolicy'
import ScrollToTop from './components/ScrollToTop'
import OrlenaPage from './pages/OrlenaPage'
import ReplykaroPage from './pages/ReplykaroPage'

function HomePage() {
  return (
    <main>
      <Hero />
      <Agents />
      <Problem />
      <System />
      <Results />
      <Ecosystem />
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
        <Route path="/products/orlena" element={<OrlenaPage />} />
        <Route path="/products/replykaro" element={<ReplykaroPage />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
