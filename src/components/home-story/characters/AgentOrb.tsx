import { motion, useReducedMotion } from 'framer-motion'

type Props = {
  className?: string
  size?: number
}

/** Glowing agent orb with soft trail hint. */
export function AgentOrb({ className = '', size = 48 }: Props) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`home-story__agent-wrap ${className}`.trim()} aria-hidden="true">
      <svg width={size * 1.8} height={size} viewBox="0 0 90 48" className="home-story__agent-trail">
        <path
          d="M8 24 Q 30 8 52 24 T 82 24"
          fill="none"
          stroke="var(--story-agent)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
      <motion.div
        className="home-story__agent-orb"
        style={{ width: size, height: size }}
        animate={
          reduceMotion
            ? undefined
            : {
                scale: [1, 1.06, 1],
                opacity: [0.92, 1, 0.92],
              }
        }
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
