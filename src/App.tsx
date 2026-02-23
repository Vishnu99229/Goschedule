import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import System from './components/System'
import Results from './components/Results'
import Ecosystem from './components/Ecosystem'
import Pricing from './components/Pricing'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-base)', color: 'var(--text-primary)' }}>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <System />
        <Results />
        <Ecosystem />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
