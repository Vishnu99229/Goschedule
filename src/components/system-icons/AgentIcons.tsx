import { motion } from 'framer-motion'

const ACCENT = '#8b5cf6'
const ACCENT_SOFT = '#a78bfa'

export function OutboundAgentIcon() {
    return (
        <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden>
            <motion.path
                d="M6 25 L39 9 L31 39 L23 28 L6 25 Z"
                fill="none"
                stroke={ACCENT}
                strokeWidth={1.8}
                strokeLinejoin="round"
                animate={{ y: [0, -2, 0], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d="M23 28 L39 9" stroke={ACCENT_SOFT} strokeWidth={1.4} strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    r={2}
                    fill={ACCENT_SOFT}
                    cx={9 + i * 4}
                    cy={34 - i * 3}
                    animate={{ opacity: [0, 1, 0], x: [0, 6, 12] }}
                    transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.25, ease: 'easeOut' }}
                />
            ))}
        </svg>
    )
}

export function InboundAgentIcon() {
    return (
        <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden>
            <rect x={9} y={14} width={30} height={24} rx={5} fill="none" stroke={ACCENT} strokeWidth={1.8} />
            <path d="M11 26 H19 L22 31 H26 L29 26 H37" fill="none" stroke={ACCENT_SOFT} strokeWidth={1.5} strokeLinecap="round" />
            <path d="M22 10 H38 L33 18 V25 L27 28 V18 Z" fill="none" stroke={ACCENT_SOFT} strokeWidth={1.4} strokeLinejoin="round" />
            <motion.circle
                cx={37}
                cy={12}
                r={4}
                fill={ACCENT}
                animate={{ scale: [1, 1.25, 1], opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
        </svg>
    )
}

export function RevenueOpsAgentIcon() {
    const stages = [9, 20, 31]
    return (
        <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden>
            {stages.map((x) => (
                <rect key={x} x={x} y={13} width={8} height={22} rx={3} fill="none" stroke={ACCENT} strokeWidth={1.4} />
            ))}
            <path d="M17 24 H20 M28 24 H31" stroke={ACCENT_SOFT} strokeWidth={1.6} strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
                <motion.circle
                    key={i}
                    r={2.5}
                    cy={24}
                    fill={ACCENT_SOFT}
                    animate={{ cx: [13, 24, 35], opacity: [0, 1, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
                />
            ))}
        </svg>
    )
}

export function OperationsAgentIcon() {
    return (
        <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden>
            <path d="M17 24 H31" stroke={ACCENT_SOFT} strokeWidth={1.3} strokeLinecap="round" />
            {[{ cx: 16, cy: 24, r: 8 }, { cx: 32, cy: 24, r: 7 }].map((gear, i) => (
                <motion.g
                    key={i}
                    animate={{ rotate: i === 0 ? 360 : -360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    style={{ transformOrigin: `${gear.cx}px ${gear.cy}px` }}
                >
                    <circle cx={gear.cx} cy={gear.cy} r={gear.r} fill="none" stroke={ACCENT} strokeWidth={1.6} />
                    {[0, 90, 180, 270].map((angle) => (
                        <rect
                            key={angle}
                            x={gear.cx - 1.5}
                            y={gear.cy - gear.r - 4}
                            width={3}
                            height={5}
                            rx={1}
                            fill={ACCENT_SOFT}
                            transform={`rotate(${angle} ${gear.cx} ${gear.cy})`}
                        />
                    ))}
                    <circle cx={gear.cx} cy={gear.cy} r={2.2} fill={ACCENT_SOFT} />
                </motion.g>
            ))}
        </svg>
    )
}

export function AssistantAgentIcon() {
    return (
        <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden>
            <rect x={10} y={11} width={28} height={28} rx={5} fill="none" stroke={ACCENT} strokeWidth={1.8} />
            <path d="M10 19 H38 M17 8 V14 M31 8 V14" stroke={ACCENT_SOFT} strokeWidth={1.5} strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
                <motion.path
                    key={i}
                    d={`M${17 + i * 7} ${28 - (i % 2) * 4} l2 2 l4 -5`}
                    fill="none"
                    stroke={ACCENT_SOFT}
                    strokeWidth={1.7}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0.75] }}
                    transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.45, ease: 'easeInOut' }}
                />
            ))}
        </svg>
    )
}

export function CustomAgentIcon() {
    const blocks = [
        { x: 10, y: 12 },
        { x: 26, y: 12 },
        { x: 18, y: 28 },
    ]
    return (
        <svg width={48} height={48} viewBox="0 0 48 48" aria-hidden>
            {blocks.map((block, i) => (
                <motion.rect
                    key={i}
                    x={block.x}
                    y={block.y}
                    width={12}
                    height={12}
                    rx={3}
                    fill="none"
                    stroke={i === 2 ? ACCENT_SOFT : ACCENT}
                    strokeWidth={1.7}
                    animate={{ x: [block.x + (i - 1) * 5, block.x], y: [block.y + (i === 2 ? 5 : -4), block.y] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            <motion.path
                d="M22 18 H26 M20 28 L24 24 L28 28"
                fill="none"
                stroke={ACCENT_SOFT}
                strokeWidth={1.4}
                strokeLinecap="round"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
        </svg>
    )
}
