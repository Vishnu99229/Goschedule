import { motion, useTransform, type MotionValue } from 'framer-motion'
import Logo from '../../Logo'
import { AgentOrb } from '../characters/AgentOrb'
import { YouRig } from '../characters/YouRig'
import { EveningSet } from '../rooms/EveningSet'
import { StoryClock } from '../StoryClock'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneEnding({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const youX = useTransform(p, [0, 0.22, 0.58], ['-18%', '0%', '12%'])
  const phoneOp = useTransform(p, [0.68, 0.8], [0, 1])
  const orbOp = useTransform(p, [0.08, 0.22, 0.58, 0.78], [1, 1, 1, 0])
  const orbScale = useTransform(p, [0.52, 0.78], [1, 0.12])
  const markOp = useTransform(p, [0.62, 0.82], [0, 1])
  const markScale = useTransform(p, [0.62, 0.84], [0.4, 1])

  return (
    <div className="story-end" aria-hidden="true">
      <EveningSet />
      <StoryClock label="9:30 pm" />
      <motion.div className="story-end__you" style={rm ? undefined : { x: youX }}>
        <YouRig progress={p} scene="ending" reduceMotion={rm} />
      </motion.div>
      {rm ? (
        <div className="story-end__phone" />
      ) : (
        <motion.div className="story-end__phone" style={{ opacity: phoneOp }} />
      )}
      {rm ? null : <AgentOrb size={40} className="story-end__orb" style={{ opacity: orbOp, scale: orbScale }} />}
      <motion.div className="story-end__mark" style={rm ? undefined : { opacity: markOp, scale: markScale }}>
        <Logo variant="mark-only" size={36} />
      </motion.div>
    </div>
  )
}
