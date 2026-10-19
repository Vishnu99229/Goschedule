import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CarryIn } from '../CarryIn'
import { AgentOrb } from '../characters/AgentOrb'
import { YouCharacter } from '../characters/YouCharacter'
import { CheckIcon, CoinIcon, ReceiptIcon, RepeatIcon, WalletIcon } from '../icons/StoryIcons'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneSubscription({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const statementX = useTransform(p, [0, 0.08, 0.22, 1], ['8%', '8%', '0%', '0%'])
  const statementY = useTransform(p, [0, 0.08, 0.22], ['42%', '42%', '0%'])
  const statementScale = useTransform(p, [0, 0.08, 0.22], [0.28, 0.32, 1])
  const statementOp = useTransform(p, [0, 0.04, 0.12, 1], [0, 1, 1, 1])
  const photoOp = useTransform(p, [0.84, 0.92], [0, 1])
  const pathOp = useTransform(p, [0.88, 0.96], [0, 1])

  const problemGlow = useTransform(p, [0.24, 0.3, 0.38, 0.5, 0.58], [0, 1, 1.12, 1, 0])
  const problemOp = useTransform(p, [0.22, 0.28, 0.52, 0.62], [0, 1, 1, 0])
  const problemScale = useTransform(p, [0.5, 0.62], [1, 0.2])
  const problemRotate = useTransform(p, [0.5, 0.62], [0, 18])

  const checkOp = useTransform(p, [0.6, 0.7, 1], [0, 1, 1])
  const checkScale = useTransform(p, [0.6, 0.72], [0.4, 1])

  const coinLeft = useTransform(p, [0.6, 0.78], ['48%', '82%'])
  const coinTop = useTransform(p, [0.6, 0.78], ['32%', '82%'])
  const coinOp = useTransform(p, [0.58, 0.64, 0.82, 0.9], [0, 1, 1, 0])
  const coinScale = useTransform(p, [0.6, 0.7, 0.82], [0.6, 1, 0.5])

  const walletPop = useTransform(p, [0.74, 0.84, 1], [1, 1.12, 1])

  const agentLeft = useTransform(p, [0, 0.4, 0.5, 0.62, 0.8, 1], ['32%', '32%', '52%', '52%', '28%', '28%'])
  const agentTop = useTransform(p, [0, 0.4, 0.5, 0.62, 0.8, 1], ['74%', '74%', '34%', '34%', '74%', '74%'])
  const agentScale = useTransform(p, [0.48, 0.54, 0.64, 0.72], [1, 1.15, 1.15, 1])

  const calmYou = useTransform(p, [0.76, 0.86], [1, 0])
  const smileYou = useTransform(p, [0.76, 0.86], [0, 1])

  return (
    <div className="story-s1" aria-hidden="true">
      <CarryIn progress={p} reduceMotion={rm} Icon={ReceiptIcon} />
      <motion.div
        className="story-s1__statement"
        style={
          rm
            ? undefined
            : { x: statementX, y: statementY, scale: statementScale, opacity: statementOp, originX: 0, originY: 1 }
        }
      >
        <div className="story-s1__row">
          <span className="home-story__skeleton home-story__skeleton--wide" />
          <span className="home-story__skeleton home-story__skeleton--short" />
        </div>
        <div className="story-s1__row">
          <span className="home-story__skeleton" />
          <span className="home-story__skeleton home-story__skeleton--short" />
        </div>
        <div className="story-s1__row story-s1__row--slot">
          {rm ? (
            <div className="story-s1__check-slot">
              <CheckIcon size={26} />
            </div>
          ) : (
            <>
              <motion.div
                className="story-s1__problem"
                style={{
                  opacity: problemOp,
                  scale: problemScale,
                  rotate: problemRotate,
                }}
              >
                <motion.span className="story-s1__problem-glow" style={{ opacity: problemGlow, scale: problemGlow }} />
                <span className="home-story__skeleton story-s1__problem-bar" />
                <span className="story-s1__repeat">
                  <RepeatIcon size={16} />
                </span>
              </motion.div>
              <motion.div
                className="story-s1__check-slot"
                style={{ opacity: checkOp, scale: checkScale }}
              >
                <CheckIcon size={26} />
              </motion.div>
            </>
          )}
        </div>
        <div className="story-s1__row">
          <span className="home-story__skeleton home-story__skeleton--wide" />
          <span className="home-story__skeleton home-story__skeleton--short" />
        </div>
      </motion.div>

      {!rm ? (
        <motion.div
          className="story-s1__coin"
          style={{ left: coinLeft, top: coinTop, opacity: coinOp, scale: coinScale }}
        >
          <CoinIcon size={20} />
        </motion.div>
      ) : null}

      <motion.div className="story-s1__wallet" style={rm ? undefined : { scale: walletPop }}>
        <WalletIcon size={44} />
        {rm ? (
          <span className="story-s1__coin-rest">
            <CoinIcon size={16} />
          </span>
        ) : null}
      </motion.div>

      <div className="story-s1__you">
        {rm ? (
          <YouCharacter pose="phone-smile" />
        ) : (
          <>
            <motion.div className="story-s1__you-layer" style={{ opacity: calmYou }}>
              <YouCharacter pose="phone" />
            </motion.div>
            <motion.div className="story-s1__you-layer" style={{ opacity: smileYou }}>
              <YouCharacter pose="phone-smile" />
            </motion.div>
          </>
        )}
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
        style={
          rm
            ? { left: '28%', top: '74%' }
            : { left: agentLeft, top: agentTop, scale: agentScale }
        }
      />
    </div>
  )
}
