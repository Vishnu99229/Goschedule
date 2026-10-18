import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CarryIn } from '../CarryIn'
import { AgentOrb } from '../characters/AgentOrb'
import { MomCharacter } from '../characters/MomCharacter'
import { YouCharacter } from '../characters/YouCharacter'
import {
  BillIcon,
  CardIcon,
  CheckIcon,
  ClockFace,
  HeartIcon,
  LightningIcon,
  WaterIcon,
  WifiIcon,
} from '../icons/StoryIcons'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneMomBills({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const hours = useTransform(p, [0.16, 0.45], [0, 270])
  const minutes = useTransform(p, [0.16, 0.45], [0, 720])

  const bill0x = useTransform(p, [0.14, 0.36], ['78%', '22%'])
  const bill1x = useTransform(p, [0.18, 0.4], ['78%', '22%'])
  const bill2x = useTransform(p, [0.22, 0.44], ['78%', '22%'])

  const bill0op = useTransform(p, [0.12, 0.18, 0.5, 0.56], [0, 1, 1, 0])
  const bill1op = useTransform(p, [0.16, 0.22, 0.6, 0.66], [0, 1, 1, 0])
  const bill2op = useTransform(p, [0.2, 0.26, 0.7, 0.76], [0, 1, 1, 0])

  const bill0green = useTransform(p, [0.48, 0.54], [0, 1])
  const bill1green = useTransform(p, [0.58, 0.64], [0, 1])
  const bill2green = useTransform(p, [0.68, 0.74], [0, 1])

  const face0 = useTransform(bill0green, (g) => 1 - g)
  const face1 = useTransform(bill1green, (g) => 1 - g)
  const face2 = useTransform(bill2green, (g) => 1 - g)

  const agentLeft = useTransform(
    p,
    [0, 0.42, 0.48, 0.56, 0.62, 0.72, 0.82, 1],
    ['20%', '20%', '72%', '72%', '72%', '72%', '20%', '20%'],
  )
  const agentTop = useTransform(
    p,
    [0, 0.42, 0.48, 0.56, 0.62, 0.72, 0.82, 1],
    ['78%', '78%', '22%', '22%', '42%', '62%', '78%', '78%'],
  )

  const card0 = useTransform(p, [0.46, 0.5, 0.55], [0, 1, 0])
  const card1 = useTransform(p, [0.56, 0.6, 0.65], [0, 1, 0])
  const card2 = useTransform(p, [0.66, 0.7, 0.75], [0, 1, 0])

  const heartOp = useTransform(p, [0.78, 0.86, 0.92], [0, 1, 0.4])
  const heartY = useTransform(p, [0.78, 0.9], [16, -28])
  const doorCheck = useTransform(p, [0.76, 0.86], [0, 1])
  const pathOp = useTransform(p, [0, 0.08, 0.2], [1, 1, 0])
  const bagOp = useTransform(p, [0.9, 0.96], [0, 1])
  const youPhoneOp = useTransform(p, [0.9, 1], [1, 0])

  const bills = [
    { id: 'power', Icon: LightningIcon, y: '16%', x: bill0x, op: bill0op, green: bill0green, face: face0, card: card0 },
    { id: 'water', Icon: WaterIcon, y: '38%', x: bill1x, op: bill1op, green: bill1green, face: face1, card: card1 },
    { id: 'wifi', Icon: WifiIcon, y: '60%', x: bill2x, op: bill2op, green: bill2green, face: face2, card: card2 },
  ]

  return (
    <div className="story-s2" aria-hidden="true">
      <CarryIn progress={p} reduceMotion={rm} Icon={BillIcon} />
      {rm ? null : (
        <motion.svg className="story-s2__path" viewBox="0 0 200 80" style={{ opacity: pathOp }} aria-hidden="true">
          <path
            d="M20 70 C 60 10, 140 10, 190 28"
            fill="none"
            stroke="#0a8f7a"
            strokeWidth="2"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />
        </motion.svg>
      )}
      <div className="story-s2__house">
        <div className="story-s2__roof" />
        <div className="story-s2__wall" />
        <div className="story-s2__door">
          <span className="story-s2__knob" />
          {rm ? (
            <span className="story-s2__door-check">
              <CheckIcon size={22} />
            </span>
          ) : (
            <motion.span className="story-s2__door-check" style={{ opacity: doorCheck, scale: doorCheck }}>
              <CheckIcon size={22} />
            </motion.span>
          )}
        </div>
        <div className="story-s2__window" />
      </div>

      <div className="story-s2__mom">
        <MomCharacter />
      </div>

      {!rm ? (
        <div className="story-s2__bills">
          {bills.map((bill) => {
            const Icon = bill.Icon
            return (
              <motion.div
                key={bill.id}
                className="story-s2__bill"
                style={{ top: bill.y, left: bill.x, opacity: bill.op }}
              >
                <motion.span className="story-s2__bill-face" style={{ opacity: bill.face }}>
                  <span className="story-s2__bill-icon">
                    <Icon size={16} />
                  </span>
                  <ClockFace hours={hours} minutes={minutes} />
                </motion.span>
                <motion.span className="story-s2__bill-paid" style={{ opacity: bill.green }}>
                  <CheckIcon size={20} />
                </motion.span>
                <motion.span className="story-s2__card" style={{ opacity: bill.card, scale: bill.card }}>
                  <CardIcon size={26} />
                </motion.span>
              </motion.div>
            )
          })}
        </div>
      ) : null}

      <div className="story-s2__you">
        {rm ? (
          <YouCharacter pose="bag" />
        ) : (
          <>
            <motion.div style={{ opacity: youPhoneOp }}>
              <YouCharacter pose="phone" />
            </motion.div>
            <motion.div className="story-s2__you-bag" style={{ opacity: bagOp }}>
              <YouCharacter pose="bag" />
            </motion.div>
          </>
        )}
      </div>

      {rm ? (
        <span className="story-s2__heart story-s2__heart--static">
          <HeartIcon size={24} />
        </span>
      ) : (
        <motion.span className="story-s2__heart" style={{ opacity: heartOp, y: heartY }}>
          <HeartIcon size={24} />
        </motion.span>
      )}

      <AgentOrb
        size={30}
        className="story-s2__agent"
        style={rm ? { left: '20%', top: '78%' } : { left: agentLeft, top: agentTop }}
      />
    </div>
  )
}
