import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CarryIn } from '../CarryIn'
import { AgentOrb } from '../characters/AgentOrb'
import { YouRig } from '../characters/YouRig'
import { CheckIcon, EnvelopeIcon } from '../icons/StoryIcons'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
  hideYou?: boolean
}

const CELLS = 12

export function SceneEmailMeeting({ progress, reduceMotion, hideYou }: Props) {
  const p = progress
  const rm = reduceMotion

  const mailOp = useTransform(p, [0.12, 0.22, 1], [0, 1, 1])
  const mailY = useTransform(p, [0.12, 0.24], [-36, 0])
  const mailScale = useTransform(p, [0.18, 0.28, 0.4], [1.15, 1, 1])

  const composeOp = useTransform(p, [0.36, 0.46, 0.64, 0.72], [0, 1, 1, 0])
  const calOp = useTransform(p, [0.62, 0.72], [0, 1])
  const slotScale = useTransform(p, [0.7, 0.82], [0.6, 1])
  const slotOp = useTransform(p, [0.7, 0.8], [0, 1])
  const handsOp = useTransform(p, [0.78, 0.88], [0, 1])
  const checkOp = useTransform(p, [0.84, 0.92], [0, 1])

  const agentLeft = useTransform(
    p,
    [0, 0.32, 0.42, 0.58, 0.7, 0.84, 0.94, 1],
    ['22%', '22%', '58%', '58%', '58%', '58%', '22%', '22%'],
  )
  const agentTop = useTransform(
    p,
    [0, 0.32, 0.42, 0.58, 0.7, 0.84, 0.94, 1],
    ['78%', '78%', '22%', '22%', '48%', '48%', '78%', '78%'],
  )

  return (
    <div className="story-s3" aria-hidden="true">
      <CarryIn progress={p} reduceMotion={rm} Icon={EnvelopeIcon} />
      <div className="story-s3__busy">
        <span className="story-label">Review call</span>
        <span className="home-story__skeleton" />
        <span className="home-story__skeleton home-story__skeleton--short" />
      </div>

      {hideYou ? null : (
        <div className="story-s3__you">
          <YouRig progress={p} scene="desk" reduceMotion={rm} />
        </div>
      )}

      {rm ? (
        <>
          <div className="story-s3__mail story-s3__mail--card">
            Re: Proposal — can we talk this week?
          </div>
          <div className="story-s3__calendar">
            {Array.from({ length: CELLS }, (_, i) => (
              <span key={i} className={`story-s3__cell${i === 4 ? ' story-s3__cell--booked' : ''}`}>
                {i === 4 ? <span className="story-s3__slot-label">Thu 4:00 pm · Intro call</span> : null}
              </span>
            ))}
          </div>
          <div className="story-s3__hands">
            <span className="story-label">Booked</span>
            <CheckIcon size={22} />
          </div>
        </>
      ) : (
        <>
          <motion.div
            className="story-s3__mail story-s3__mail--card"
            style={{ opacity: mailOp, y: mailY, scale: mailScale }}
          >
            Re: Proposal — can we talk this week?
          </motion.div>

          <motion.div className="story-s3__compose" style={{ opacity: composeOp }}>
            <p className="story-s3__reply">Happy to — does Thu 4:00 pm work?</p>
          </motion.div>

          <motion.div className="story-s3__calendar" style={{ opacity: calOp }}>
            {Array.from({ length: CELLS }, (_, i) => (
              <span key={i} className="story-s3__cell">
                {i === 4 ? (
                  <motion.span className="story-s3__cell-booked" style={{ opacity: slotOp, scale: slotScale }}>
                    <span className="story-s3__slot-label">Thu 4:00 pm · Intro call</span>
                  </motion.span>
                ) : null}
              </span>
            ))}
          </motion.div>

          <motion.div className="story-s3__hands" style={{ opacity: handsOp }}>
            <span className="story-label">Booked</span>
            <motion.span style={{ opacity: checkOp }}>
              <CheckIcon size={22} />
            </motion.span>
          </motion.div>
        </>
      )}

      <AgentOrb
        size={28}
        className="story-s3__agent"
        style={rm ? { left: '22%', top: '78%' } : { left: agentLeft, top: agentTop }}
      />
    </div>
  )
}
