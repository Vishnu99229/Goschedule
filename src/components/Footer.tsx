import { Link } from 'react-router-dom'
import Logo from './Logo'
import { CLAUDE_PARTNER_NETWORK_URL } from '../constants/links'

export default function Footer() {
    return (
        <footer
            className="footer"
            style={{
                borderTop: '1px solid var(--border-subtle)',
                padding: '48px 0 32px',
                marginTop: 0,
            }}
        >
            <div
                className="container"
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: 24,
                    alignItems: 'start',
                }}
            >
                <div>
                    <Link to="/" aria-label="Goschedule.ai home" style={{ textDecoration: 'none' }}>
                        <Logo size={24} />
                    </Link>
                </div>

                <nav
                    aria-label="Footer"
                    className="footer-nav"
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '32px 64px',
                    }}
                >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.7 }}>Products</div>
                        <Link to="/products/morning-brief" className="footer-text">Morning Brief</Link>
                        <Link to="/products/replykaro" className="footer-text">ReplyKaro</Link>
                        <Link to="/products/resound" className="footer-text">Resound.ai</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.7 }}>Resources</div>
                        <Link to="/blog" className="footer-text">Blog</Link>
                        <Link to="/docs" className="footer-text">Docs</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.7 }}>Company</div>
                        <a href="/#approach" className="footer-text">Approach</a>
                        <a href="/#pricing" className="footer-text">Pricing</a>
                    </div>
                </nav>

                <div
                    className="footer-bottom"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 16,
                        paddingTop: 24,
                        borderTop: '1px solid var(--border-subtle)',
                    }}
                >
                    <div
                        className="footer-links"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '16px 24px',
                        }}
                    >
                        <Link to="/terms-and-conditions" className="footer-text">Terms &amp; Conditions</Link>
                        <Link to="/privacy-policy" className="footer-text">Privacy Policy</Link>
                        <a href="mailto:hello@goschedule.ai" className="footer-text">Contact</a>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            gap: 16,
                        }}
                    >
                        <div className="footer-text">
                            &copy; {new Date().getFullYear()} Goschedule.ai
                        </div>
                        <a
                            href={CLAUDE_PARTNER_NETWORK_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="claude-partner-badge"
                            aria-label="Claude Partner Network"
                        >
                            <img
                                src="/images/claude-partner-network.png"
                                alt="Claude Partner Network - Goschedule.ai (Partner)"
                                className="claude-partner-badge__image"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
