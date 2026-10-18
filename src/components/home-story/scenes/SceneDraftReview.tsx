import { motion, useTransform, type MotionValue } from 'framer-motion'
import { AgentOrb } from '../characters/AgentOrb'
import { YouAtDesk } from '../characters/YouAtDesk'
import { CheckIcon, PaperPlaneIcon } from '../icons/StoryIcons'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneDraftReview({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const promptOp = useTransform(p, [0.08, 0.18, 0.48, 0.56], [0, 1, 1, 0])
  const promptScale = useTransform(p, [0.16, 0.28, 0.4], [0.9, 1.12, 1])

  const draftOp = useTransform(p, [0.46, 0.56, 0.88, 0.95], [0, 1, 1, 0])
  const line1 = useTransform(p, [0.48, 0.54], [0.2, 1])
  const line2 = useTransform(p, [0.52, 0.58], [0.2, 1])
  const line3 = useTransform(p, [0.56, 0.62], [0.2, 1])
  const line4 = useTransform(p, [0.6, 0.66], [0.2, 1])
  const line5 = useTransform(p, [0.64, 0.7], [0.2, 1])
  const lines = [line1, line2, line3, line4, line5]

  const approveOp = useTransform(p, [0.7, 0.78, 0.9, 0.96], [0, 1, 1, 0])
  const approveScale = useTransform(p, [0.7, 0.8], [0.6, 1])

  const sendLeft = useTransform(p, [0.82, 0.94], ['62%', '92%'])
  const sendOp = useTransform(p, [0.8, 0.86, 0.94, 1], [0, 1, 1, 0])

  const agentLeft = useTransform(
    p,
    [0, 0.32, 0.42, 0.7, 0.82, 0.94, 1],
    ['22%', '22%', '62%', '62%', '62%', '22%', '22%'],
  )
  const agentTop = useTransform(
    p,
    [0, 0.32, 0.42, 0.7, 0.82, 0.94, 1],
    ['78%', '78%', '28%', '28%', '52%', '78%', '78%'],
  )

  return (
    <div className="story-s5" aria-hidden="true">
      <div className="story-s5__you">
        <YouAtDesk />
      </div>

      {rm ? (
        <div className="story-s5__draft">
          <span className="home-story__skeleton" />
          <span className="home-story__skeleton home-story__skeleton--wide" />
          <span className="home-story__skeleton" />
          <span className="home-story__skeleton home-story__skeleton--short" />
          <span className="story-s5__sent">
            <CheckIcon size={22} />
            <PaperPlaneIcon size={18} />
          </span>
        </div>
      ) : (
        <>
          <motion.div
            className="story-s5__prompt"
            style={{ opacity: promptOp, scale: promptScale }}
          >
            <span className="home-story__skeleton home-story__skeleton--short" />
          </motion.div>

          <motion.div className="story-s5__draft" style={{ opacity: draftOp }}>
            {lines.map((w, i) => (
              <motion.span
                key={i}
                className={`home-story__skeleton${i === 4 ? ' home-story__skeleton--short' : ''}`}
                style={{ scaleX: w, originX: 0 }}
              />
            ))}
          </motion.div>

          <motion.div
            className="story-s5__approve"
            style={{ opacity: approveOp, scale: approveScale }}
          >
            <CheckIcon size={28} />
          </motion.div>

          <motion.div
            className="story-s5__send"
            style={{ left: sendLeft, opacity: sendOp }}
          >
            <PaperPlaneIcon size={20} />
          </motion.div>
        </>
      )}

      <AgentOrb
        size={28}
        className="story-s5__agent"
        style={rm ? { left: '22%', top: '78%' } : { left: agentLeft, top: agentTop }}
      />
    </div>
  )
}
