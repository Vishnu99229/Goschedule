import { motion } from 'framer-motion'

const PURPLE = '#8b5cf6'
const LILAC = '#a78bfa'

/** Card 1: pulsing network graph + animating connection paths, ~4s loop */
export function OrganicNetworkIcon() {
    const nodes = [
        { x: 32, y: 14 },
        { x: 12, y: 28 },
        { x: 52, y: 28 },
        { x: 20, y: 50 },
        { x: 44, y: 50 },
    ]
    const edges: [number, number][] = [
        [0, 1],
        [0, 2],
        [1, 3],
        [2, 4],
        [3, 4],
        [1, 2],
    ]
    return (
        <svg width={64} height={64} viewBox="0 0 64 64" style={{ overflow: 'visible' }} aria-hidden>
            <defs>
                <linearGradient id="sysNetGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={PURPLE} />
                    <stop offset="100%" stopColor={LILAC} />
                </linearGradient>
            </defs>
            {edges.map(([a, b], i) => {
                const p1 = nodes[a]
                const p2 = nodes[b]
                const d = `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`
                return (
                    <motion.path
                        key={`${a}-${b}-${i}`}
                        d={d}
                        fill="none"
                        stroke="url(#sysNetGrad)"
                        strokeWidth={1.35}
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={{
                            pathLength: [0.2, 1, 1, 0.2],
                            opacity: [0.25, 0.95, 0.95, 0.25],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.07 }}
                    />
                )
            })}
            {nodes.map((n, i) => (
                <motion.circle
                    key={i}
                    cx={n.x}
                    cy={n.y}
                    r={5}
                    fill={PURPLE}
                    animate={{ scale: [0.88, 1.14, 0.88], opacity: [0.65, 1, 0.65] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.14 }}
                />
            ))}
        </svg>
    )
}

/** Card 2: radar ripples + rotating target dot */
export function OutboundRadarIcon() {
    const cx = 32
    const cy = 32

    return (
        <svg width={64} height={64} viewBox="0 0 64 64" style={{ overflow: 'visible' }} aria-hidden>
            <defs>
                <radialGradient id="sysRadStroke" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={PURPLE} stopOpacity="0.45" />
                    <stop offset="100%" stopColor={LILAC} stopOpacity="0.08" />
                </radialGradient>
            </defs>
            {[1, 2, 3].map((_, i) => (
                <motion.circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    fill="none"
                    stroke="url(#sysRadStroke)"
                    strokeWidth={1}
                    initial={{ r: 6, opacity: 0.6 }}
                    animate={{ r: [8, 32], opacity: [0.5, 0] }}
                    transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: 'easeOut',
                        delay: i * 0.55,
                    }}
                />
            ))}
            <circle cx={cx} cy={cy} r={2.5} fill={LILAC} opacity={0.95} />
            <motion.g
                animate={{ rotate: 360 }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '32px 32px' }}
            >
                <circle cx={54} cy={cy} r={4} fill={PURPLE} stroke={LILAC} strokeWidth={0.75} />
            </motion.g>
        </svg>
    )
}

/** Card 3: funnel layers + falling dots */
export function QualificationFunnelIcon() {
    return (
        <svg width={64} height={64} viewBox="0 0 64 64" style={{ overflow: 'visible' }} aria-hidden>
            <defs>
                <linearGradient id="sysFunGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={PURPLE} stopOpacity="0.55" />
                    <stop offset="100%" stopColor={LILAC} stopOpacity="0.2" />
                </linearGradient>
            </defs>
            <path
                d="M 12 14 L 52 14 L 46 26 L 18 26 Z"
                fill="none"
                stroke="url(#sysFunGrad)"
                strokeWidth={1.2}
                opacity={0.7}
            />
            <path
                d="M 18 28 L 46 28 L 42 40 L 22 40 Z"
                fill="none"
                stroke="url(#sysFunGrad)"
                strokeWidth={1.2}
                opacity={0.55}
            />
            <path
                d="M 24 42 L 40 42 L 38 54 L 26 54 Z"
                fill="none"
                stroke="url(#sysFunGrad)"
                strokeWidth={1.2}
                opacity={0.45}
            />
            <motion.circle
                cx={22}
                cy={8}
                r={2.5}
                fill={PURPLE}
                animate={{ cy: [8, 48], opacity: [1, 1, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', times: [0, 0.5, 1] }}
            />
            <motion.circle
                cx={36}
                cy={6}
                r={2.5}
                fill={PURPLE}
                animate={{ cy: [6, 36], opacity: [1, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: 0.35 }}
            />
            <motion.circle
                cx={32}
                cy={10}
                r={2.8}
                fill={LILAC}
                animate={{ cy: [10, 52], opacity: [1, 1, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'linear', delay: 0.15 }}
            />
        </svg>
    )
}
