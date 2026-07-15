import { Link } from 'react-router-dom'
import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { Bot, ChevronDown, MessageCircle, Menu, Settings2, Target, Wrench, X, Zap } from 'lucide-react'
import Logo from './Logo'
import { DEPLOY_AGENT_URL } from '../constants/links'

function NavMenuRow({
    to,
    title,
    subtitle,
    icon,
    onClick,
}: {
    to: string
    title: string
    subtitle: string
    icon: ReactNode
    onClick?: () => void
}) {
    const content = (
        <>
            <div className="nav-products__icon" aria-hidden>
                {icon}
            </div>
            <div>
                <div className="nav-products__title">{title}</div>
                <div className="nav-products__subtitle">{subtitle}</div>
            </div>
        </>
    )

    if (to.startsWith('/#')) {
        return (
            <a href={to} className="nav-products__item" onClick={onClick}>
                {content}
            </a>
        )
    }

    return (
        <Link to={to} className="nav-products__item" onClick={onClick}>
            {content}
        </Link>
    )
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mobileAgentsOpen, setMobileAgentsOpen] = useState(false)
    const [mobileProductsOpen, setMobileProductsOpen] = useState(false)
    const [agentsOpen, setAgentsOpen] = useState(false)
    const [productsOpen, setProductsOpen] = useState(false)

    const closeAll = useCallback(() => {
        setMobileOpen(false)
        setMobileAgentsOpen(false)
        setMobileProductsOpen(false)
        setAgentsOpen(false)
        setProductsOpen(false)
    }, [])

    useEffect(() => {
        const onResize = () => {
            if (window.matchMedia('(min-width: 768px)').matches) {
                setMobileOpen(false)
                setMobileAgentsOpen(false)
                setMobileProductsOpen(false)
            } else {
                setAgentsOpen(false)
                setProductsOpen(false)
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
                        <li
                            className={`nav-products ${agentsOpen ? 'nav-products--open' : ''}`}
                            onMouseEnter={() => setAgentsOpen(true)}
                            onMouseLeave={() => setAgentsOpen(false)}
                            onFocus={() => setAgentsOpen(true)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setAgentsOpen(false)
                                }
                            }}
                        >
                            <button
                                type="button"
                                className="nav-products__trigger"
                                aria-expanded={agentsOpen}
                                aria-haspopup="menu"
                                onClick={() => setAgentsOpen(true)}
                            >
                                Agents
                                <ChevronDown className="nav-products__chevron" aria-hidden />
                            </button>
                            {agentsOpen && (
                                <div className="nav-products__panel" role="menu">
                                    <NavMenuRow
                                        to="/#outbound-agent"
                                        title="Outbound"
                                        subtitle="Cold outreach that books meetings"
                                        icon={<Target style={{ width: 20, height: 20 }} />}
                                        onClick={() => setAgentsOpen(false)}
                                    />
                                    <NavMenuRow
                                        to="/#inbound-agent"
                                        title="Inbound"
                                        subtitle="24/7 lead qualification"
                                        icon={<Bot style={{ width: 20, height: 20 }} />}
                                        onClick={() => setAgentsOpen(false)}
                                    />
                                    <NavMenuRow
                                        to="/#ops-agent"
                                        title="Ops"
                                        subtitle="Back-office workflow automation"
                                        icon={<Settings2 style={{ width: 20, height: 20 }} />}
                                        onClick={() => setAgentsOpen(false)}
                                    />
                                    <NavMenuRow
                                        to="/#custom-agent"
                                        title="Custom"
                                        subtitle="Agents built for your process"
                                        icon={<Zap style={{ width: 20, height: 20 }} />}
                                        onClick={() => setAgentsOpen(false)}
                                    />
                                </div>
                            )}
                        </li>
                        <li
                            className={`nav-products ${productsOpen ? 'nav-products--open' : ''}`}
                            onMouseEnter={() => setProductsOpen(true)}
                            onMouseLeave={() => setProductsOpen(false)}
                            onFocus={() => setProductsOpen(true)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') {
                                    setProductsOpen(false)
                                }
                            }}
                        >
                            <button
                                type="button"
                                className="nav-products__trigger"
                                aria-expanded={productsOpen}
                                aria-haspopup="menu"
                                onClick={() => setProductsOpen(true)}
                            >
                                Products
                                <ChevronDown className="nav-products__chevron" aria-hidden />
                            </button>
                            {productsOpen && (
                                <div className="nav-products__panel" role="menu">
                                    <NavMenuRow
                                        to="/products/replykaro"
                                        title="ReplyKaro"
                                        subtitle="24/7 AI agent for WhatsApp & voice automation"
                                        icon={<MessageCircle style={{ width: 20, height: 20 }} />}
                                        onClick={() => setProductsOpen(false)}
                                    />
                                    <NavMenuRow
                                        to="/products/fde-services"
                                        title="FDE Services"
                                        subtitle="Forward deployed engineering for AI agents"
                                        icon={<Wrench style={{ width: 20, height: 20 }} />}
                                        onClick={() => setProductsOpen(false)}
                                    />
                                    <NavMenuRow
                                        to="/products/free-setup"
                                        title="Free Setup"
                                        subtitle="Your first agent deployed at zero upfront cost"
                                        icon={<Zap style={{ width: 20, height: 20 }} />}
                                        onClick={() => setProductsOpen(false)}
                                    />
                                </div>
                            )}
                        </li>
                        <li>
                            <Link to="/blog" className="nav-link-plain">
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link to="/docs" className="nav-link-plain">
                                Docs
                            </Link>
                        </li>
                        <li>
                            <a href="/#approach" className="nav-link-plain">
                                Approach
                            </a>
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
                    <a
                        href={DEPLOY_AGENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary nav-cta"
                        style={{ padding: '10px 18px', fontSize: '14px' }}
                    >
                        Deploy Agent
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
                <div className={`nav-mobile-products ${mobileAgentsOpen ? 'nav-mobile-products--open' : ''}`}>
                    <button
                        type="button"
                        className="nav-mobile-products__toggle"
                        aria-expanded={mobileAgentsOpen}
                        onClick={() => setMobileAgentsOpen((v) => !v)}
                    >
                        <span>Agents</span>
                        <ChevronDown
                            style={{
                                width: 16,
                                height: 16,
                                transform: mobileAgentsOpen ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.25s ease',
                            }}
                        />
                    </button>
                    <div className="nav-mobile-products__sub">
                        <a href="/#outbound-agent" className="nav-link-plain">
                            Outbound
                        </a>
                        <a href="/#inbound-agent" className="nav-link-plain">
                            Inbound
                        </a>
                        <a href="/#ops-agent" className="nav-link-plain">
                            Ops
                        </a>
                        <a href="/#custom-agent" className="nav-link-plain">
                            Custom
                        </a>
                    </div>
                </div>
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
                        <Link to="/products/replykaro" className="nav-link-plain">
                            ReplyKaro
                        </Link>
                        <Link to="/products/fde-services" className="nav-link-plain">
                            FDE Services
                        </Link>
                        <Link to="/products/free-setup" className="nav-link-plain">
                            Free Setup
                        </Link>
                    </div>
                </div>
                <Link to="/blog" className="nav-link-plain">
                    Blogs
                </Link>
                <Link to="/docs" className="nav-link-plain">
                    Docs
                </Link>
                <a href="/#approach" className="nav-link-plain">
                    Approach
                </a>
                <a href="/#pricing" className="nav-link-plain">
                    Pricing
                </a>
                <a
                    href={DEPLOY_AGENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ marginTop: 16, width: '100%' }}
                >
                    Deploy Agent
                </a>
            </div>
        </header>
    )
}
