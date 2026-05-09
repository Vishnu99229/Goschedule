import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { useCountUp } from '../hooks/useCountUp'

const LINE_PATH = 'M 0 72 L 120 58 L 240 38 L 400 18'
const FILL_PATH = 'M 0 100 L 0 72 L 120 58 L 240 38 L 400 18 L 400 100 Z'

const ROTATING_ACTIVITIES = [
    'New SQL: VP Marketing at FinTech Co — just now',
    'Reply received: CTO at SaaS Startup — 1 min ago',
    'Demo booked: Founder at D2C Brand — 3 min ago',
    'New SQL: Head of Growth at HRTech — 5 min ago',
    'Reply received: COO at LogisticsCo — 8 min ago',
    'Demo booked: Co-Founder at FinTech — 12 min ago',
    'New SQL: CMO at SaaS — 15 min ago',
]

const DELTA_DELAY_MS = 1500
const DELTA_TRANSITION_MS = 500

export default function HeroDashboard() {
    const dashRef = useRef<HTMLDivElement>(null)
    const inView = useInView(dashRef, { once: true, amount: 0.25 })
    const reduceMotion = useReducedMotion()
    const uid = useId()
    const gradId = `heroDashGrad-${uid}`
    const lineGrad = `heroDashLine-${uid}`

    const countEnabled = Boolean(inView && !reduceMotion)
    const sqls = useCountUp(47, countEnabled, 1500, 0)
    const replyRate = useCountUp(8.2, countEnabled, 1500, 1)
    const pipelineL = useCountUp(24, countEnabled, 1500, 0)

    const sqlDisplay = reduceMotion ? 47 : sqls
    const replyDisplay = reduceMotion ? 8.2 : replyRate
    const pipeDisplay = reduceMotion ? 24 : pipelineL

    const [deltaDelayPassed, setDeltaDelayPassed] = useState(false)
    useEffect(() => {
        if (!inView || reduceMotion) return
        const t = window.setTimeout(() => setDeltaDelayPassed(true), DELTA_DELAY_MS)
        return () => clearTimeout(t)
    }, [inView, reduceMotion])
    const showDeltas = Boolean(reduceMotion) || deltaDelayPassed

    const [rotateIdx, setRotateIdx] = useState(0)
    useEffect(() => {
        if (reduceMotion) return
        const id = window.setInterval(() => {
            setRotateIdx((i) => (i + 1) % ROTATING_ACTIVITIES.length)
        }, 6000)
        return () => clearInterval(id)
    }, [reduceMotion])

    const [entranceTimerDone, setEntranceTimerDone] = useState(false)
    useEffect(() => {
        if (!inView || reduceMotion) return
        const t = window.setTimeout(() => setEntranceTimerDone(true), 900)
        return () => clearTimeout(t)
    }, [inView, reduceMotion])
    const entranceDone = Boolean(reduceMotion) || entranceTimerDone

    return (
        <div ref={dashRef} className="hero-dash">
            <div className="hero-dash__live" aria-hidden="true">
                <span className="hero-dash__live-dot" />
            </div>
            <div className="hero-dash__stats">
                <div className="hero-dash__stat">
                    <div className="hero-dash__stat-label">SQLs This Week</div>
                    <div className="hero-dash__stat-row">
                        <span className="hero-dash__stat-num">{sqlDisplay}</span>
                        <motion.span
                            className="hero-dash__stat-delta"
                            initial={{ opacity: 0, y: 10 }}
                            animate={showDeltas ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{
                                duration: DELTA_TRANSITION_MS / 1000,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            +12%
                        </motion.span>
                    </div>
                </div>
                <div className="hero-dash__stat">
                    <div className="hero-dash__stat-label">Reply Rate</div>
                    <div className="hero-dash__stat-row">
                        <span className="hero-dash__stat-num">{replyDisplay.toFixed(1)}%</span>
                        <motion.span
                            className="hero-dash__stat-delta"
                            initial={{ opacity: 0, y: 10 }}
                            animate={showDeltas ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{
                                duration: DELTA_TRANSITION_MS / 1000,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            +2.1%
                        </motion.span>
                    </div>
                </div>
                <div className="hero-dash__stat">
                    <div className="hero-dash__stat-label">Pipeline Value</div>
                    <div className="hero-dash__stat-row">
                        <span className="hero-dash__stat-num">₹{pipeDisplay}L</span>
                        <motion.span
                            className="hero-dash__stat-delta"
                            initial={{ opacity: 0, y: 10 }}
                            animate={showDeltas ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                            transition={{
                                duration: DELTA_TRANSITION_MS / 1000,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            +₹6L
                        </motion.span>
                    </div>
                </div>
            </div>

            <div className="hero-dash__chart-wrap">
                <div className="hero-dash__chart-head">
                    <span>SQL trajectory · 4 weeks</span>
                </div>
                <svg className="hero-dash__chart" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="rgba(124, 58, 237, 0.35)" />
                            <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
                        </linearGradient>
                        <linearGradient id={lineGrad} x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#7C3AED" />
                            <stop offset="100%" stopColor="#a78bfa" />
                        </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="400" y2="20" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="0" y1="60" x2="400" y2="60" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <line x1="0" y1="100" x2="400" y2="100" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    <motion.path
                        d={FILL_PATH}
                        fill={`url(#${gradId})`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: inView ? 1 : 0 }}
                        transition={{ duration: 0.35, delay: reduceMotion ? 0 : 1.1 }}
                    />
                    <motion.path
                        d={LINE_PATH}
                        fill="none"
                        stroke={`url(#${lineGrad})`}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: reduceMotion ? 1 : 0 }}
                        animate={{ pathLength: inView ? 1 : reduceMotion ? 1 : 0 }}
                        transition={{
                            pathLength: { duration: reduceMotion ? 0 : 2, ease: [0.4, 0, 0.2, 1] },
                        }}
                    />
                </svg>
            </div>

            <div className="hero-dash__feed">
                <div className="hero-dash__feed-title">Recent activity</div>
                <ul className="hero-dash__feed-list">
                    {[0, 1, 2].map((slot) => {
                        const text = ROTATING_ACTIVITIES[(rotateIdx + slot) % ROTATING_ACTIVITIES.length]
                        return (
                            <motion.li
                                key={slot}
                                layout="position"
                                initial={false}
                                className="hero-dash__feed-row"
                            >
                                <span className="hero-dash__feed-dot hero-dash__feed-dot--pulse" aria-hidden />
                                <motion.span
                                    key={text}
                                    className="hero-dash__feed-text"
                                    initial={{ opacity: 0, x: -14 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        duration: 0.38,
                                        delay: entranceDone ? 0 : slot * 0.2,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                >
                                    {text}
                                </motion.span>
                            </motion.li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}
