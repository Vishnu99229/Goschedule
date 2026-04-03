import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            height: 'var(--nav-height)',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'rgba(11, 11, 18, 0.8)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
        }}>
            <div className="container flex items-center justify-between" style={{ height: '100%' }}>

                {/* Left: Logo - Clickable, links to homepage */}
                <Link to="/" style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '-0.02em', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src="/favicon.png" alt="Goschedule.ai logo" style={{ width: '32px', height: '32px', borderRadius: '6px' }} />
                    <span>
                        <span style={{ color: '#fff' }}>Goschedule</span>
                        <span style={{ color: '#7C3AED' }}>.ai</span>
                    </span>
                </Link>

                {/* Center: Nav Links */}
                <nav className="flex items-center gap-5" style={{ display: 'none' }} id="desktop-nav">
                    <a href="/#approach" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                        SQL Model
                    </a>
                    <a href="/#ecosystem" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                        Platform
                    </a>
                    <a href="/#pricing" style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-secondary)', transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                        Pricing
                    </a>
                </nav>

                {/* Right: CTA */}
                <div className="flex items-center">
                    <a href="/#book" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '15px' }}>Get Started</a>
                </div>
            </div>

            <style>{`
        @media (min-width: 768px) {
          #desktop-nav { display: flex !important; }
        }
      `}</style>
        </header>
    );
}
