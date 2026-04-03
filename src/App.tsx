import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
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

function HomePage() {
  return (
    <main>
      <Hero />
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
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
