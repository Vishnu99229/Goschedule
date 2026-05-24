import { Link } from 'react-router-dom'
import Logo from './Logo'

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
                    <div className="footer-text">
                        &copy; {new Date().getFullYear()} Goschedule.ai
                    </div>
                </div>
            </div>
        </footer>
    )
}
