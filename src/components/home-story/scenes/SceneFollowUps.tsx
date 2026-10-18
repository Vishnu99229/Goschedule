import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CarryIn } from '../CarryIn'
import { AgentOrb } from '../characters/AgentOrb'
import { YouAtDesk } from '../characters/YouAtDesk'
import { CheckIcon, EnvelopeIcon, PaperPlaneIcon } from '../icons/StoryIcons'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
  hideYou?: boolean
}

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
  const weedLeft = useTransform(p, [0.28, 0.5], ['12%', '72%'])
  const weedR = useTransform(p, [0.28, 0.5], [0, 220])
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
          <YouAtDesk />
        </div>
      )}

      {rm ? (
        <>
          <div className="story-s4__days">
            <span className="story-s4__day story-s4__day--on" />
            <span className="story-s4__day story-s4__day--on" />
            <span className="story-s4__day story-s4__day--on" />
          </div>
          <div className="story-s4__reply-rest">
            <EnvelopeIcon size={28} />
            <CheckIcon size={22} />
          </div>
        </>
      ) : (
        <>
          <motion.div
            className="story-s4__plane story-s4__plane--out"
            style={{ left: sendLeft, opacity: sendOp }}
          >
            <PaperPlaneIcon size={22} />
          </motion.div>

          <div className="story-s4__days">
            {days.map((op, i) => (
              <motion.span key={i} className="story-s4__day" style={{ opacity: op, scale: op }} />
            ))}
          </div>

          <motion.div className="story-s4__wait" style={{ opacity: dashedOp }}>
            <span className="story-s4__dots" />
            <motion.span className="story-s4__weed" style={{ left: weedLeft, rotate: weedR, opacity: emptyOp }}>
              <span className="story-s4__weed-ball" />
            </motion.span>
            <motion.div className="story-s4__empty" style={{ opacity: emptyOp }}>
              <span className="home-story__skeleton home-story__skeleton--wide" />
              <span className="home-story__skeleton home-story__skeleton--short" />
            </motion.div>
          </motion.div>

          <motion.div
            className="story-s4__plane story-s4__plane--nudge"
            style={{ left: nudgeLeft, opacity: nudgeOp }}
          >
            <PaperPlaneIcon size={16} />
          </motion.div>

          <motion.div
            className="story-s4__reply"
            style={{ left: replyLeft, opacity: replyOp, y: replyY }}
          >
            <EnvelopeIcon size={28} />
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
