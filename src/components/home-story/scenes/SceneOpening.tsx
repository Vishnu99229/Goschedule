import { motion, useTransform, type MotionValue } from 'framer-motion'
import { AgentOrb } from '../characters/AgentOrb'
import { YouRig } from '../characters/YouRig'
import { QUEUE_TASKS } from '../queueTasks'
import { BedroomSet } from '../rooms/BedroomSet'
import { StoryClock } from '../StoryClock'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

const NOTIFS = [
  { at: 0.4, text: 'Electricity bill due' },
  { at: 0.44, text: '3 unread emails' },
  { at: 0.48, text: 'Meeting at 11?' },
  { at: 0.52, text: 'StreamMax renewed' },
]

export function SceneOpening({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion
  const tablePhone = useTransform(p, [0, 0.34, 0.42], [1, 1, 0])
  const phoneUi = useTransform(p, [0.36, 0.44, 0.78, 0.9], [0, 1, 1, 0.35])
  const n0 = useTransform(p, [0.4, 0.46], [0, 1])
  const n1 = useTransform(p, [0.44, 0.5], [0, 1])
  const n2 = useTransform(p, [0.48, 0.54], [0, 1])
  const n3 = useTransform(p, [0.52, 0.58], [0, 1])
  const notifOps = [n0, n1, n2, n3]

  const clutter0 = useTransform(p, [0.6, 0.7], [0, 1])
  const clutter1 = useTransform(p, [0.62, 0.72], [0, 1])
  const clutter2 = useTransform(p, [0.64, 0.74], [0, 1])
  const clutter3 = useTransform(p, [0.66, 0.76], [0, 1])
  const clutter4 = useTransform(p, [0.68, 0.78], [0, 1])
  const clutter5 = useTransform(p, [0.7, 0.8], [0, 1])
  const clutters = [clutter0, clutter1, clutter2, clutter3, clutter4, clutter5]
  const gather = useTransform(p, [0.78, 0.96], [1, 0])
  const c0x = useTransform(gather, (v) => v * -36)
  const c0y = useTransform(gather, (v) => v * -168)
  const c1x = useTransform(gather, (v) => v * 72)
  const c1y = useTransform(gather, (v) => v * -150)
  const c2x = useTransform(gather, (v) => v * -88)
  const c2y = useTransform(gather, (v) => v * -92)
  const c3x = useTransform(gather, (v) => v * 110)
  const c3y = useTransform(gather, (v) => v * -78)
  const c4x = useTransform(gather, (v) => v * 28)
  const c4y = useTransform(gather, (v) => v * -210)
  const c5x = useTransform(gather, (v) => v * -20)
  const c5y = useTransform(gather, (v) => v * -40)
  const xs = [c0x, c1x, c2x, c3x, c4x, c5x]
  const ys = [c0y, c1y, c2y, c3y, c4y, c5y]

  const agentOp = useTransform(p, [0.56, 0.66], [0, 1])
  const agentScale = useTransform(p, [0.56, 0.64, 0.74], [0.2, 1.28, 1])
  const youLift = useTransform(p, [0, 0.08, 0.16], ['-30%', '-10%', '0%'])

  const badges = QUEUE_TASKS.map((task, i) => {
    const Icon = task.Icon
    return rm ? (
      <span key={task.id} className="story-open__badge">
        <Icon size={20} />
      </span>
    ) : (
      <motion.span key={task.id} className="story-open__badge" style={{ opacity: clutters[i], x: xs[i], y: ys[i] }}>
        <Icon size={20} />
      </motion.span>
    )
  })

  return (
    <div className="story-open" aria-hidden="true">
      <BedroomSet tablePhoneOp={rm ? undefined : tablePhone} />
      <StoryClock label="7:15 am" />

      <motion.div className="story-open__you" style={rm ? undefined : { y: youLift }}>
        <YouRig progress={p} scene="opening" reduceMotion={rm} />
      </motion.div>

      {rm ? (
        <div className="story-open__phone-ui">
          {NOTIFS.map((n) => (
            <span key={n.text} className="story-open__chip">
              {n.text}
            </span>
          ))}
        </div>
      ) : (
        <motion.div className="story-open__phone-ui" style={{ opacity: phoneUi }}>
          <span className="story-open__phone-notch" />
          {NOTIFS.map((n, i) => (
            <motion.span key={n.text} className="story-open__chip" style={{ opacity: notifOps[i] }}>
              {n.text}
            </motion.span>
          ))}
        </motion.div>
      )}

      <div className="story-open__line">{badges}</div>
      <AgentOrb size={36} className="story-open__agent" style={rm ? undefined : { opacity: agentOp, scale: agentScale }} />
    </div>
  )
}
