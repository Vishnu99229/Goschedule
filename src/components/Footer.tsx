import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="footer" style={{ borderTop: '1px solid var(--border-subtle)', padding: 'var(--space-6) 0' }}>
            <div className="container flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <Link to="/" className="brand-link footer-text" style={{ fontWeight: 600 }}>
                    <span style={{ color: '#fff' }}>Goschedule</span><span style={{ color: '#7C3AED' }}>.ai</span>
                </Link>
                <div className="footer-text">
                    &copy; {new Date().getFullYear()} Goschedule.ai &middot; Performance Aligned Growth Infrastructure
                </div>
                <div className="flex gap-5">
                    <Link to="/terms-and-conditions" className="footer-text" style={{ transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
                        Terms &amp; Conditions
                    </Link>
                    <Link to="/privacy-policy" className="footer-text" style={{ transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
                        Privacy Policy
                    </Link>
                    <a href="mailto:hello@goschedule.ai" className="footer-text" style={{ transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    )
}
