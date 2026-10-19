import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CarryIn } from '../CarryIn'
import { AgentOrb } from '../characters/AgentOrb'
import { YouRig } from '../characters/YouRig'
import { ReceiptIcon, RepeatIcon, WalletIcon } from '../icons/StoryIcons'
import { BedroomSet } from '../rooms/BedroomSet'
import { StoryClock } from '../StoryClock'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneSubscription({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const statementOp = useTransform(p, [0, 0.06, 1], [0, 1, 1])
  const statementY = useTransform(p, [0, 0.1], [18, 0])
  const redGlow = useTransform(p, [0.2, 0.28, 0.5, 0.6], [0, 1, 1, 0.2])
  const cancelOp = useTransform(p, [0.58, 0.68], [0, 1])
  const refundOp = useTransform(p, [0.62, 0.7, 0.86, 0.94], [0, 1, 1, 0])
  const refundX = useTransform(p, [0.62, 0.82], [0, 86])
  const refundY = useTransform(p, [0.62, 0.82], [0, 92])
  const walletPop = useTransform(p, [0.74, 0.84, 1], [1, 1.12, 1])
  const photoOp = useTransform(p, [0.84, 0.92], [0, 1])
  const pathOp = useTransform(p, [0.88, 0.96], [0, 1])
  const agentLeft = useTransform(p, [0, 0.22, 0.36, 0.58, 0.78], ['28%', '28%', '58%', '58%', '30%'])
  const agentTop = useTransform(p, [0, 0.22, 0.36, 0.58, 0.78], ['62%', '62%', '28%', '28%', '62%'])
  const agentScale = useTransform(p, [0.32, 0.4, 0.62, 0.72], [1, 1.18, 1.18, 1])

  const rows = (
    <>
      <div className="story-s1__tx">
        <span>Swiggy · ₹340</span>
      </div>
      <div className="story-s1__tx">
        <span>Uber · ₹210</span>
      </div>
      <div className="story-s1__tx story-s1__tx--slot">
        <div className={`story-s1__tx story-s1__tx--red${rm ? ' is-done' : ''}`}>
          <span className="story-s1__tx-main">
            StreamMax Premium · ₹649/mo
            <i className="story-s1__repeat">
              <RepeatIcon size={14} />
            </i>
          </span>
          {rm ? <span className="story-s1__cancelled">Cancelled</span> : null}
        </div>
        {rm ? null : (
          <>
            <motion.span className="story-s1__problem-glow" style={{ opacity: redGlow, scale: redGlow }} />
            <motion.span className="story-s1__cancelled" style={{ opacity: cancelOp }}>
              Cancelled
            </motion.span>
          </>
        )}
      </div>
      <div className="story-s1__tx">
        <span>Groceries · ₹1,120</span>
      </div>
    </>
  )

  return (
    <div className="story-s1" aria-hidden="true">
      <BedroomSet />
      <StoryClock label="7:40 am" />
      <CarryIn progress={p} reduceMotion={rm} Icon={ReceiptIcon} />

      <motion.div
        className="story-s1__statement"
        style={rm ? undefined : { opacity: statementOp, y: statementY }}
      >
        <p className="story-s1__bank">Apex Bank · March</p>
        {rows}
      </motion.div>

      {rm ? null : (
        <motion.div className="story-s1__refund" style={{ opacity: refundOp, x: refundX, y: refundY }}>
          +₹649
        </motion.div>
      )}

      <motion.div className="story-s1__wallet" style={rm ? undefined : { scale: walletPop }}>
        <WalletIcon size={40} />
      </motion.div>

      <div className="story-s1__you">
        <YouRig progress={p} scene="subscription" reduceMotion={rm} />
      </div>

      {rm ? null : (
        <>
          <motion.div className="story-s1__photo" style={{ opacity: photoOp }}>
            <span className="story-s1__photo-face" />
          </motion.div>
          <motion.svg className="story-s1__path" viewBox="0 0 200 80" style={{ opacity: pathOp }} aria-hidden="true">
            <path
              d="M20 70 C 60 10, 140 10, 190 28"
              fill="none"
              stroke="#0a8f7a"
              strokeWidth="2"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          </motion.svg>
        </>
      )}

      <AgentOrb
        size={32}
        className="story-s1__agent"
        style={rm ? { left: '30%', top: '62%' } : { left: agentLeft, top: agentTop, scale: agentScale }}
      />
    </div>
  )
}
