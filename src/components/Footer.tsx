export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--border-subtle)', padding: 'var(--space-6) 0' }}>
            <div className="container flex items-center justify-between" style={{ flexWrap: 'wrap', gap: 'var(--space-3)' }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <span style={{ color: '#fff' }}>Goschedule</span><span style={{ color: '#7C3AED' }}>.ai</span>
                </div>
                <div className="body-sm">
                    &copy; {new Date().getFullYear()} Goschedule.ai &middot; Performance Aligned Growth Infrastructure
                </div>
                <div className="flex gap-5">
                    <a href="#" className="body-sm" style={{ transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
                        Privacy
                    </a>
                    <a href="mailto:hello@goschedule.ai" className="body-sm" style={{ transition: 'color 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '')}>
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
}
