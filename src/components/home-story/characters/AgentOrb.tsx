import type { MotionStyle } from 'framer-motion'
import { motion } from 'framer-motion'

type Props = {
  className?: string
  size?: number
  style?: MotionStyle
}

/** Glowing agent orb. Position and scale are owned by the parent scene. */
export function AgentOrb({ className = '', size = 36, style }: Props) {
  return (
    <motion.div
      className={`home-story__agent-orb ${className}`.trim()}
      style={{ width: size, height: size, ...style }}
      aria-hidden="true"
    />
  )
}
