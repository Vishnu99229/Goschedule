import { FooterCta } from '../components/aadi/FooterCta'
import { Hero } from '../components/aadi/Hero'
import { Ticker } from '../components/aadi/Ticker'
import { Vision } from '../components/aadi/Vision'
import { WaveBackground } from '../components/aadi/WaveBackground'
import '../styles/aadi.css'

export default function HomePage() {
  return (
    <div className="aadi-root">
      <WaveBackground />
      <main id="main-content" className="relative z-10 flex flex-col">
        <Hero />
        <Vision />
        <Ticker />
        <FooterCta />
      </main>
    </div>
  )
}
