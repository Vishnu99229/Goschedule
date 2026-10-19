import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CarryIn } from '../CarryIn'
import { AgentOrb } from '../characters/AgentOrb'
import { YouRig } from '../characters/YouRig'
import { CheckIcon, PaperPlaneIcon } from '../icons/StoryIcons'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
  hideYou?: boolean
}

const DAYS = ['Mon', 'Tue', 'Wed'] as const

export function SceneFollowUps({ progress, reduceMotion, hideYou }: Props) {
  const p = progress
  const rm = reduceMotion

  const sendLeft = useTransform(p, [0.04, 0.18], ['22%', '78%'])
  const sendOp = useTransform(p, [0.02, 0.08, 0.16, 0.22], [0, 1, 1, 0])

  const day1 = useTransform(p, [0.18, 0.26], [0.35, 1])
  const day2 = useTransform(p, [0.28, 0.36], [0.35, 1])
  const day3 = useTransform(p, [0.38, 0.46], [0.35, 1])
  const days = [day1, day2, day3]

  const emptyOp = useTransform(p, [0.22, 0.3, 0.62, 0.7], [0, 1, 1, 0])
  const dashedOp = useTransform(p, [0.22, 0.32], [0, 1])

  const nudgeLeft = useTransform(p, [0.54, 0.68], ['28%', '78%'])
  const nudgeOp = useTransform(p, [0.52, 0.58, 0.66, 0.72], [0, 1, 1, 0])

  const replyLeft = useTransform(p, [0.7, 0.84], ['78%', '36%'])
  const replyOp = useTransform(p, [0.68, 0.74, 1], [0, 1, 1])
  const replyY = useTransform(p, [0.7, 0.78, 0.86], [0, -18, 0])
  const checkOp = useTransform(p, [0.82, 0.9], [0, 1])

  const agentLeft = useTransform(
    p,
    [0, 0.5, 0.58, 0.68, 0.86, 1],
    ['22%', '22%', '48%', '48%', '22%', '22%'],
  )
  const agentTop = useTransform(
    p,
    [0, 0.5, 0.58, 0.68, 0.86, 1],
    ['78%', '78%', '42%', '42%', '78%', '78%'],
  )

  return (
    <div className="story-s4" aria-hidden="true">
      <CarryIn progress={p} reduceMotion={rm} Icon={PaperPlaneIcon} />
      {hideYou ? null : (
        <div className="story-s4__you">
          <YouRig progress={p} scene="desk" reduceMotion={rm} />
        </div>
      )}

      {rm ? (
        <>
          <div className="story-s4__send-card">Proposal — Q4 partnership</div>
          <div className="story-s4__days">
            {DAYS.map((d) => (
              <span key={d} className="story-s4__day story-s4__day--on">
                {d}
              </span>
            ))}
          </div>
          <div className="story-s4__reply-rest">
            <span className="story-s4__reply-card">Sorry for the delay, let&apos;s do it!</span>
            <CheckIcon size={22} />
          </div>
        </>
      ) : (
        <>
          <motion.div className="story-s4__send-card" style={{ left: sendLeft, opacity: sendOp }}>
            Proposal — Q4 partnership
          </motion.div>

          <div className="story-s4__days">
            {DAYS.map((d, i) => (
              <motion.span key={d} className="story-s4__day" style={{ opacity: days[i], scale: days[i] }}>
                {d}
              </motion.span>
            ))}
          </div>

          <motion.div className="story-s4__wait" style={{ opacity: dashedOp }}>
            <span className="story-s4__dots" />
            <motion.div className="story-s4__empty" style={{ opacity: emptyOp }}>
              <span className="story-s4__empty-label">No reply</span>
            </motion.div>
          </motion.div>

          <motion.div className="story-s4__nudge" style={{ left: nudgeLeft, opacity: nudgeOp }}>
            Just floating this back to the top of your inbox 🙂
          </motion.div>

          <motion.div className="story-s4__reply-card" style={{ left: replyLeft, opacity: replyOp, y: replyY }}>
            Sorry for the delay, let&apos;s do it!
          </motion.div>
          <motion.div className="story-s4__check" style={{ opacity: checkOp, scale: checkOp }}>
            <CheckIcon size={24} />
          </motion.div>
        </>
      )}

      <AgentOrb
        size={28}
        className="story-s4__agent"
        style={rm ? { left: '22%', top: '78%' } : { left: agentLeft, top: agentTop }}
      />
    </div>
  )
}
