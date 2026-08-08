import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { CLAUDE_PARTNER_NETWORK_URL, DEPLOY_AGENT_URL } from '../constants/links'

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)

    const closeAll = useCallback(() => {
        setMobileOpen(false)
    }, [])

    useEffect(() => {
        const onResize = () => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setMobileOpen(false)
            }
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    useEffect(() => {
        if (!mobileOpen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeAll()
        }
        document.addEventListener('keydown', onKey)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = ''
        }
    }, [mobileOpen, closeAll])

    return (
        <header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 100,
                height: 'var(--nav-height)',
                borderBottom: '1px solid var(--border-subtle)',
                background: 'var(--bg-base)',
            }}
        >
            <div className="container flex items-center justify-between nav-root" style={{ height: '100%' }}>
                <Link to="/" className="brand-link" aria-label="Goschedule.ai home">
                    <Logo size={26} />
                </Link>

                <nav id="desktop-nav" aria-label="Main">
                    <ul
                        className="flex items-center gap-5"
                        style={{
                            listStyle: 'none',
                            margin: 0,
                            padding: 0,
                            alignItems: 'center',
                        }}
                    >
                        <li>
                            <Link to="/work" className="nav-link-plain">
                                Work
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="nav-link-plain">
                                About
                            </Link>
                        </li>
                        <li>
                            <a href="/#approach" className="nav-link-plain">
                                Approach
                            </a>
                        </li>
                        <li>
                            <Link to="/engagements" className="nav-link-plain">
                                Engagements
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog" className="nav-link-plain">
                                Writing
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="flex items-center" style={{ gap: 12 }}>
                    <button
                        type="button"
                        className="nav-mobile-toggle"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-nav-sheet"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
                    </button>
                    <a
                        href={CLAUDE_PARTNER_NETWORK_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="claude-partner-badge claude-partner-badge--nav"
                    >
                        <img
                            src="/images/claude-partner-network.png"
                            alt="Claude Partner Network — Goschedule.ai (Partner)"
                            className="claude-partner-badge__image"
                        />
                    </a>
                    <a
                        href={DEPLOY_AGENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary nav-cta"
                        style={{ padding: '10px 18px', fontSize: '14px' }}
                    >
                        Book a call
                    </a>
                </div>
            </div>

            <div
                className={`nav-mobile-backdrop ${mobileOpen ? 'nav-mobile-backdrop--visible' : ''}`}
                aria-hidden
                onClick={closeAll}
            />
            <div
                id="mobile-nav-sheet"
                className={`nav-mobile-sheet ${mobileOpen ? 'nav-mobile-sheet--open' : ''}`}
                role="dialog"
                aria-label="Mobile navigation"
                onClick={(e) => {
                    const t = e.target as HTMLElement
                    if (t.closest('a')) {
                        closeAll()
                    }
                }}
            >
                <Link to="/work" className="nav-link-plain">
                    Work
                </Link>
                <Link to="/about" className="nav-link-plain">
                    About
                </Link>
                <a href="/#approach" className="nav-link-plain">
                    Approach
                </a>
                <Link to="/engagements" className="nav-link-plain">
                    Engagements
                </Link>
                <Link to="/blog" className="nav-link-plain">
                    Writing
                </Link>
                <a
                    href={DEPLOY_AGENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: 16, width: '100%' }}
                >
                    Book a call
                </a>
            </div>
        </header>
    )
}
