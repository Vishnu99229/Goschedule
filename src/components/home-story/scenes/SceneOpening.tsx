import { motion, useTransform, type MotionValue } from 'framer-motion'
import { AgentOrb } from '../characters/AgentOrb'
import { YouCharacter } from '../characters/YouCharacter'
import { BillIcon, CalendarIcon, ChatBubbleIcon, EnvelopeIcon, ReceiptIcon, RepeatIcon } from '../icons/StoryIcons'

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

  const agentOp = useTransform(p, [0.26, 0.34], [0, 1])
  const agentScale = useTransform(p, [0.26, 0.32, 0.4], [0.2, 1.28, 1])
  const overwhelmed = useTransform(p, [0.12, 0.22, 0.38, 0.5], [0, 1, 1, 0])
  const calm = useTransform(p, [0.4, 0.52], [0, 1])

  if (rm) {
    return (
      <div className="story-open" aria-hidden="true">
        <div className="story-open__bed" />
        <div className="story-open__you">
          <YouCharacter pose="phone-smile" />
        </div>
        <div className="story-open__line">
          <span className="story-open__badge"><BillIcon size={22} /></span>
          <span className="story-open__badge"><EnvelopeIcon size={22} /></span>
          <span className="story-open__badge"><CalendarIcon size={20} /></span>
          <span className="story-open__badge"><ChatBubbleIcon size={20} /></span>
          <span className="story-open__badge"><ReceiptIcon size={18} /></span>
          <span className="story-open__badge"><RepeatIcon size={18} /></span>
        </div>
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

      <div className="story-open__line">
        <motion.span className="story-open__badge" style={{ opacity: clutter0, x: c0x, y: c0y, rotate: c0r }}>
          <BillIcon size={22} />
        </motion.span>
        <motion.span className="story-open__badge" style={{ opacity: clutter1, x: c1x, y: c1y, rotate: c1r }}>
          <EnvelopeIcon size={22} />
        </motion.span>
        <motion.span className="story-open__badge" style={{ opacity: clutter2, x: c2x, y: c2y, rotate: c2r }}>
          <CalendarIcon size={20} />
        </motion.span>
        <motion.span className="story-open__badge" style={{ opacity: clutter3, x: c3x, y: c3y, rotate: c3r }}>
          <ChatBubbleIcon size={20} />
        </motion.span>
        <motion.span className="story-open__badge" style={{ opacity: clutter4, x: c4x, y: c4y, rotate: c4r }}>
          <ReceiptIcon size={18} />
        </motion.span>
        <motion.span className="story-open__badge" style={{ opacity: clutter5, x: c5x, y: c5y, rotate: c5r }}>
          <RepeatIcon size={18} />
        </motion.span>
      </div>

      <AgentOrb size={36} className="story-open__agent" style={{ opacity: agentOp, scale: agentScale }} />
    </div>
  )
}
