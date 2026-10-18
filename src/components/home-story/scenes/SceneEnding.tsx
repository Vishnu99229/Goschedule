import { motion, useTransform, type MotionValue } from 'framer-motion'
import Logo from '../../Logo'
import { AgentOrb } from '../characters/AgentOrb'
import { YouCharacter } from '../characters/YouCharacter'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneEnding({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const youX = useTransform(p, [0, 0.28], [-24, 0])
  const youOp = useTransform(p, [0, 0.18], [0.4, 1])
  const orbOp = useTransform(p, [0.08, 0.22, 0.58, 0.78], [1, 1, 1, 0])
  const orbScale = useTransform(p, [0.52, 0.78], [1, 0.12])
  const markOp = useTransform(p, [0.62, 0.82], [0, 1])
  const markScale = useTransform(p, [0.62, 0.84], [0.4, 1])

  if (rm) {
    return (
      <div className="story-end" aria-hidden="true">
        <div className="story-end__couch" />
        <div className="story-end__you">
          <YouCharacter pose="rest" />
        </div>
        <div className="story-end__phone" />
        <div className="story-end__mark">
          <Logo variant="mark-only" size={36} />
        </div>
      </div>
    )
  }

  return (
    <div className="story-end" aria-hidden="true">
      <div className="story-end__couch" />
      <motion.div className="story-end__you" style={{ x: youX, opacity: youOp }}>
        <YouCharacter pose="rest" />
      </motion.div>
      <div className="story-end__phone" />
      <AgentOrb size={40} className="story-end__orb" style={{ opacity: orbOp, scale: orbScale }} />
      <motion.div className="story-end__mark" style={{ opacity: markOp, scale: markScale }}>
        <Logo variant="mark-only" size={36} />
      </motion.div>
    </div>
  )
}
