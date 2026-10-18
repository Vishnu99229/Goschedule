import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'

type Props = {
  className?: string
  /** 0 = working at the laptop, 1 = leaned back from the desk. */
  lean?: MotionValue<number>
}

/** You at a laptop — looking at the screen, not the inbox. */
export function YouAtDesk({ className = '', lean }: Props) {
  const fallback = useMotionValue(0)
  const src = lean ?? fallback
  const rotate = useTransform(src, [0, 1], [0, -18])
  const x = useTransform(src, [0, 1], [0, -10])
  const y = useTransform(src, [0, 1], [0, 4])
  const workMouth = useTransform(src, [0, 0.45], [1, 0])
  const restMouth = useTransform(src, [0.45, 1], [0, 1])

  return (
    <svg
      className={`home-story__you-desk ${className}`.trim()}
      viewBox="0 0 100 90"
      width="100"
      height="90"
      aria-hidden="true"
    >
      <rect x="4" y="72" width="92" height="10" rx="2" fill="#c8d0db" />
      <rect x="28" y="48" width="44" height="26" rx="3" fill="#141c26" />
      <rect x="32" y="52" width="36" height="18" rx="2" fill="#9aa8b8" />
      <rect x="22" y="74" width="56" height="4" rx="1" fill="#2a3544" />
      <motion.g style={{ rotate, x, y, originX: 0.5, originY: 0.78 }}>
        <circle cx="50" cy="22" r="11" fill="#f3d3b8" />
        <path d="M40 18c4-8 16-8 20 0-6-1-14-1-20 0z" fill="#141c26" />
        <motion.path
          d="M44 26h12"
          fill="none"
          stroke="#8a5a40"
          strokeWidth="1.4"
          strokeLinecap="round"
          style={{ opacity: workMouth }}
        />
        <motion.path
          d="M44 25c2 4 8 4 12 0"
          fill="none"
          stroke="#8a5a40"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ opacity: restMouth }}
        />
        <path d="M38 36c4 8 16 8 24 0v16H38V36z" fill="#141c26" />
      </motion.g>
    </svg>
  )
}
