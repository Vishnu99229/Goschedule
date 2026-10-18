import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'
import { AgentOrb } from '../characters/AgentOrb'
import { YouAtDesk } from '../characters/YouAtDesk'
import { CheckIcon } from '../icons/StoryIcons'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

const TEAM = [
  { id: 'a', color: '#2a3544', left: '48%', top: '14%' },
  { id: 'b', color: '#0a8f7a', left: '72%', top: '14%' },
  { id: 'c', color: '#5a6572', left: '48%', top: '40%' },
  { id: 'd', color: '#3d4d62', left: '72%', top: '40%' },
] as const

function ProgressRing({ value }: { value: MotionValue<number> }) {
  return (
    <svg className="story-s6__ring" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
      <circle cx="18" cy="18" r="10" fill="none" stroke="rgba(20,28,38,0.12)" strokeWidth="3" />
      <motion.circle
        cx="18"
        cy="18"
        r="10"
        fill="none"
        stroke="#0a8f7a"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength: value, rotate: -90, originX: 0.5, originY: 0.5 }}
      />
    </svg>
  )
}

export function SceneTeamSlack({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const bigOp = useTransform(p, [0.12, 0.22, 0.48, 0.56], [0, 1, 1, 0])
  const bigScale = useTransform(p, [0.14, 0.24], [0.85, 1])

  const card0op = useTransform(p, [0.48, 0.56], [0, 1])
  const card1op = useTransform(p, [0.5, 0.58], [0, 1])
  const card2op = useTransform(p, [0.52, 0.6], [0, 1])
  const card3op = useTransform(p, [0.54, 0.62], [0, 1])
  const cardOps = [card0op, card1op, card2op, card3op]

  const ring0 = useTransform(p, [0.58, 0.72], [0, 1])
  const ring1 = useTransform(p, [0.62, 0.76], [0, 1])
  const ring2 = useTransform(p, [0.66, 0.8], [0, 1])
  const ring3 = useTransform(p, [0.7, 0.84], [0, 1])
  const rings = [ring0, ring1, ring2, ring3]

  const check0 = useTransform(p, [0.72, 0.78], [0, 1])
  const check1 = useTransform(p, [0.76, 0.82], [0, 1])
  const check2 = useTransform(p, [0.8, 0.86], [0, 1])
  const check3 = useTransform(p, [0.84, 0.9], [0, 1])
  const checks = [check0, check1, check2, check3]
  const lean = useTransform(p, [0.9, 0.98], [0, 1])
  const restLean = useMotionValue(1)

  const agentLeft = useTransform(
    p,
    [0, 0.3, 0.4, 0.55, 0.7, 0.88, 1],
    ['22%', '22%', '38%', '60%', '72%', '22%', '22%'],
  )
  const agentTop = useTransform(
    p,
    [0, 0.3, 0.4, 0.55, 0.7, 0.88, 1],
    ['78%', '78%', '58%', '28%', '42%', '78%', '78%'],
  )

  return (
    <div className="story-s6" aria-hidden="true">
      <div className="story-s6__channel">
        <span className="story-s6__rail" />
        {TEAM.map((member, i) => (
          <div
            key={member.id}
            className="story-s6__seat"
            style={{ left: member.left, top: member.top }}
          >
            <span className="story-s6__avatar" style={{ background: member.color }} />
            {rm ? (
              <CheckIcon size={18} />
            ) : (
              <>
                <motion.div className="story-s6__mini" style={{ opacity: cardOps[i] }}>
                  <span className="home-story__skeleton home-story__skeleton--short" />
                </motion.div>
                <motion.div className="story-s6__ring-wrap" style={{ opacity: rings[i] }}>
                  <ProgressRing value={rings[i]} />
                </motion.div>
                <motion.span className="story-s6__done" style={{ opacity: checks[i], scale: checks[i] }}>
                  <CheckIcon size={18} />
                </motion.span>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="story-s6__you">
        <YouAtDesk lean={rm ? restLean : lean} />
      </div>

      {rm ? null : (
        <motion.div className="story-s6__big" style={{ opacity: bigOp, scale: bigScale }}>
          <span className="home-story__skeleton home-story__skeleton--wide" />
          <span className="home-story__skeleton" />
          <span className="home-story__skeleton home-story__skeleton--short" />
        </motion.div>
      )}

      <AgentOrb
        size={28}
        className="story-s6__agent"
        style={rm ? { left: '22%', top: '78%' } : { left: agentLeft, top: agentTop }}
      />
    </div>
  )
}
