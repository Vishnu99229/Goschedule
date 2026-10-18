import { motion, useTransform, type MotionValue } from 'framer-motion'
import { AgentOrb } from '../characters/AgentOrb'
import { YouCharacter } from '../characters/YouCharacter'
import { QUEUE_TASKS } from '../queueTasks'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneOpening({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const phoneOp = useTransform(p, [0, 0.06, 0.16, 0.22], [1, 1, 1, 0])
  const youX = useTransform(p, [0, 0.08], [8, 0])

  const clutter0 = useTransform(p, [0.06, 0.14], [0, 1])
  const clutter1 = useTransform(p, [0.09, 0.17], [0, 1])
  const clutter2 = useTransform(p, [0.12, 0.2], [0, 1])
  const clutter3 = useTransform(p, [0.15, 0.23], [0, 1])
  const clutter4 = useTransform(p, [0.18, 0.26], [0, 1])
  const clutter5 = useTransform(p, [0.21, 0.28], [0, 1])
  const clutters = [clutter0, clutter1, clutter2, clutter3, clutter4, clutter5]

  const gather = useTransform(p, [0.34, 0.52], [1, 0])
  const c0x = useTransform(gather, (v) => v * -36)
  const c0y = useTransform(gather, (v) => v * -168)
  const c0r = useTransform(gather, (v) => v * -14)
  const c1x = useTransform(gather, (v) => v * 72)
  const c1y = useTransform(gather, (v) => v * -150)
  const c1r = useTransform(gather, (v) => v * 10)
  const c2x = useTransform(gather, (v) => v * -88)
  const c2y = useTransform(gather, (v) => v * -92)
  const c2r = useTransform(gather, (v) => v * 8)
  const c3x = useTransform(gather, (v) => v * 110)
  const c3y = useTransform(gather, (v) => v * -78)
  const c3r = useTransform(gather, (v) => v * -9)
  const c4x = useTransform(gather, (v) => v * 28)
  const c4y = useTransform(gather, (v) => v * -210)
  const c4r = useTransform(gather, (v) => v * 16)
  const c5x = useTransform(gather, (v) => v * -20)
  const c5y = useTransform(gather, (v) => v * -40)
  const c5r = useTransform(gather, (v) => v * -6)
  const xs = [c0x, c1x, c2x, c3x, c4x, c5x]
  const ys = [c0y, c1y, c2y, c3y, c4y, c5y]
  const rs = [c0r, c1r, c2r, c3r, c4r, c5r]

  const agentOp = useTransform(p, [0.26, 0.34], [0, 1])
  const agentScale = useTransform(p, [0.26, 0.32, 0.4], [0.2, 1.28, 1])
  const overwhelmed = useTransform(p, [0.12, 0.22, 0.38, 0.5], [0, 1, 1, 0])
  const calm = useTransform(p, [0.4, 0.52], [0, 1])

  const badges = QUEUE_TASKS.map((task, i) => {
    const Icon = task.Icon
    return rm ? (
      <span key={task.id} className="story-open__badge">
        <Icon size={20} />
      </span>
    ) : (
      <motion.span
        key={task.id}
        className="story-open__badge"
        style={{ opacity: clutters[i], x: xs[i], y: ys[i], rotate: rs[i] }}
      >
        <Icon size={20} />
      </motion.span>
    )
  })

  if (rm) {
    return (
      <div className="story-open" aria-hidden="true">
        <div className="story-open__bed" />
        <div className="story-open__you">
          <YouCharacter pose="phone-smile" />
        </div>
        <div className="story-open__line">{badges}</div>
        <AgentOrb size={36} className="story-open__agent" />
      </div>
    )
  }

  return (
    <div className="story-open" aria-hidden="true">
      <div className="story-open__bed" />
      <motion.div className="story-open__you" style={{ x: youX }}>
        <motion.div style={{ opacity: phoneOp }}>
          <YouCharacter pose="phone" />
        </motion.div>
        <motion.div className="story-open__you-swap" style={{ opacity: overwhelmed }}>
          <YouCharacter pose="overwhelmed" />
        </motion.div>
        <motion.div className="story-open__you-swap" style={{ opacity: calm }}>
          <YouCharacter pose="phone-smile" />
        </motion.div>
      </motion.div>

      <div className="story-open__line">{badges}</div>

      <AgentOrb size={36} className="story-open__agent" style={{ opacity: agentOp, scale: agentScale }} />
    </div>
  )
}
