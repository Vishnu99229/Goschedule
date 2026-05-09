import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { ChevronDown, Coffee, MessageCircle, Menu, X } from 'lucide-react'

function ProductRow({
    to,
    title,
    subtitle,
    icon,
}: {
    to: string
    title: string
    subtitle: string
    icon: ReactNode
}) {
    return (
        <Link to={to} className="nav-products__item">
            <div className="nav-products__icon" aria-hidden>
                {icon}
            </div>
            <div>
                <div className="nav-products__title">{title}</div>
                <div className="nav-products__subtitle">{subtitle}</div>
            </div>
        </Link>
    )
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false)

    const closeAll = useCallback(() => {
        setMobileOpen(false)
        setMobileProductsOpen(false)
    }, [])

    useEffect(() => {
        const onResize = () => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setMobileOpen(false)
                setMobileProductsOpen(false)
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
                background: 'rgba(11, 11, 18, 0.8)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
            }}
        >
            <div className="container flex items-center justify-between nav-root" style={{ height: '100%' }}>
                <Link
                    to="/"
                    style={{
                        fontSize: '20px',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                    }}
                >
                    <img
                        src="/favicon.png"
                        alt="Goschedule.ai logo"
                        style={{ width: '32px', height: '32px', borderRadius: '6px' }}
                    />
                    <span>
                        <span style={{ color: '#fff' }}>Goschedule</span>
                        <span style={{ color: '#7C3AED' }}>.ai</span>
                    </span>
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
                            <a href="/#approach" className="nav-link-plain">
                                SQL Model
                            </a>
                        </li>
                        <li>
                            <a href="/#ecosystem" className="nav-link-plain">
                                Platform
                            </a>
                        </li>
                        <li className="nav-products">
                            <span className="nav-products__trigger" style={{ cursor: 'default', padding: '8px 4px' }}>
                                Products
                                <ChevronDown className="nav-products__chevron" aria-hidden />
                            </span>
                            <div className="nav-products__panel" role="menu">
                                <ProductRow
                                    to="/products/orlena"
                                    title="Orlena"
                                    subtitle="AI QR menus that increase café revenue"
                                    icon={<Coffee style={{ width: 20, height: 20 }} />}
                                />
                                <ProductRow
                                    to="/products/replykaro"
                                    title="Replykaro"
                                    subtitle="24/7 AI agent for WhatsApp & voice automation"
                                    icon={<MessageCircle style={{ width: 20, height: 20 }} />}
                                />
                            </div>
                        </li>
                        <li>
                            <a href="/#pricing" className="nav-link-plain">
                                Pricing
                            </a>
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
                    <a href="/#book" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '15px' }}>
                        Get Started
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
                <a href="/#approach" className="nav-link-plain">
                    SQL Model
                </a>
                <a href="/#ecosystem" className="nav-link-plain">
                    Platform
                </a>
                <div className={`nav-mobile-products ${mobileProductsOpen ? 'nav-mobile-products--open' : ''}`}>
                    <button
                        type="button"
                        className="nav-mobile-products__toggle"
                        aria-expanded={mobileProductsOpen}
                        onClick={() => setMobileProductsOpen((v) => !v)}
                    >
                        <span>Products</span>
                        <ChevronDown
                            style={{
                                width: 16,
                                height: 16,
                                transform: mobileProductsOpen ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.25s ease',
                            }}
                        />
                    </button>
                    <div className="nav-mobile-products__sub">
                        <Link to="/products/orlena" className="nav-link-plain">
                            Orlena
                        </Link>
                        <Link to="/products/replykaro" className="nav-link-plain">
                            Replykaro
                        </Link>
                    </div>
                </div>
                <a href="/#pricing" className="nav-link-plain">
                    Pricing
                </a>
            </div>
        </header>
    )
}
