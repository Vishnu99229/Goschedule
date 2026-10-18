import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ComponentType } from 'react'

type IconProps = { className?: string; size?: number }

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
  Icon: ComponentType<IconProps>
}

/** Orb pulls this scene's queue icon in from the top-right at the start of the beat. */
export function CarryIn({ progress, reduceMotion, Icon }: Props) {
  const op = useTransform(progress, [0, 0.06, 0.16], [1, 1, 0])
  const x = useTransform(progress, [0, 0.14], [72, 8])
  const y = useTransform(progress, [0, 0.14], [-48, 8])
  const scale = useTransform(progress, [0, 0.1], [0.7, 1])

  if (reduceMotion) return null

  return (
    <motion.div className="story-carry" style={{ opacity: op, x, y, scale }} aria-hidden="true">
      <Icon size={22} />
    </motion.div>
  )
}
