export default function HeroDashboard() {
    return (
        <div className="hero-dash">
            <div className="hero-dash__live" aria-hidden="true">
                <span className="hero-dash__live-dot" />
            </div>
            <div className="hero-dash__stats">
                <div className="hero-dash__stat">
                    <div className="hero-dash__stat-label">SQLs This Week</div>
                    <div className="hero-dash__stat-row">
                        <span className="hero-dash__stat-num">47</span>
                        <span className="hero-dash__stat-delta">+12%</span>
                    </div>
                </div>
                <div className="hero-dash__stat">
                    <div className="hero-dash__stat-label">Reply Rate</div>
                    <div className="hero-dash__stat-row">
                        <span className="hero-dash__stat-num">8.2%</span>
                        <span className="hero-dash__stat-delta">+2.1%</span>
                    </div>
                </div>
                <div className="hero-dash__stat">
                    <div className="hero-dash__stat-label">Pipeline Value</div>
                    <div className="hero-dash__stat-row">
                        <span className="hero-dash__stat-num">₹24L</span>
                        <span className="hero-dash__stat-delta">+₹6L</span>
                    </div>
                </div>
            </div>

            <div className="hero-dash__chart-wrap">
                <div className="hero-dash__chart-head">
                    <span>SQL trajectory · 4 weeks</span>
                </div>
                <svg className="hero-dash__chart" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id="heroDashGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(124, 58, 237, 0.35)" />
                            <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
                        </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <polygon
                        fill="url(#heroDashGrad)"
                        points="0,100 0,72 120,58 240,38 400,18 400,100"
                    />
                    <polyline
                        fill="none"
                        stroke="#7C3AED"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points="0,72 120,58 240,38 400,18"
                    />
                </svg>
            </div>

            <div className="hero-dash__feed">
                <div className="hero-dash__feed-title">Recent activity</div>
                <ul className="hero-dash__feed-list">
                    <li>
                        <span className="hero-dash__feed-dot" /> New SQL: VP Marketing at FinTech Co — 2 min ago
                    </li>
                    <li>
                        <span className="hero-dash__feed-dot" /> Reply received: CTO at SaaS Startup — 18 min ago
                    </li>
                    <li>
                        <span className="hero-dash__feed-dot" /> Demo booked: Founder at D2C Brand — 1 hr ago
                    </li>
                </ul>
            </div>
        </div>
    )
}
