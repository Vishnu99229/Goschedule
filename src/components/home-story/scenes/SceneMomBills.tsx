import { motion, useTransform, type MotionValue } from 'framer-motion'
import { CarryIn } from '../CarryIn'
import { AgentOrb } from '../characters/AgentOrb'
import { MomRig } from '../characters/MomRig'
import { YouRig } from '../characters/YouRig'
import { BillIcon, CardIcon, CheckIcon, HeartIcon } from '../icons/StoryIcons'
import { LivingRoomSet } from '../rooms/LivingRoomSet'
import { StoryClock } from '../StoryClock'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

const BILLS = [
  { id: 'power', label: 'BESCOM · due tomorrow' },
  { id: 'water', label: 'BWSSB · Water' },
  { id: 'wifi', label: 'Airtel Fiber' },
] as const

export function SceneMomBills({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const bill0x = useTransform(p, [0.14, 0.36], ['78%', '22%'])
  const bill1x = useTransform(p, [0.18, 0.4], ['78%', '22%'])
  const bill2x = useTransform(p, [0.22, 0.44], ['78%', '22%'])

  const bill0op = useTransform(p, [0.12, 0.18, 0.5, 0.56], [0, 1, 1, 0.15])
  const bill1op = useTransform(p, [0.16, 0.22, 0.6, 0.66], [0, 1, 1, 0.15])
  const bill2op = useTransform(p, [0.2, 0.26, 0.7, 0.76], [0, 1, 1, 0.15])

  const bill0green = useTransform(p, [0.48, 0.54], [0, 1])
  const bill1green = useTransform(p, [0.58, 0.64], [0, 1])
  const bill2green = useTransform(p, [0.68, 0.74], [0, 1])

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
  const youX = useTransform(p, [0.84, 1], ['0%', '-18%'])

  const bills = [
    { ...BILLS[0], y: '16%', x: bill0x, op: bill0op, green: bill0green, card: card0 },
    { ...BILLS[1], y: '38%', x: bill1x, op: bill1op, green: bill1green, card: card1 },
    { ...BILLS[2], y: '60%', x: bill2x, op: bill2op, green: bill2green, card: card2 },
  ]

  return (
    <div className="story-s2" aria-hidden="true">
      <LivingRoomSet />
      <StoryClock label="8:10 am" />
      <CarryIn progress={p} reduceMotion={rm} Icon={BillIcon} />

      {rm ? (
        <span className="story-s2__door-check story-s2__door-check--room">
          <CheckIcon size={22} />
        </span>
      ) : (
        <motion.span className="story-s2__door-check story-s2__door-check--room" style={{ opacity: doorCheck, scale: doorCheck }}>
          <CheckIcon size={22} />
        </motion.span>
      )}

      <div className="story-s2__mom">
        <MomRig progress={p} reduceMotion={rm} />
      </div>

      <div className="story-s2__bills">
        {bills.map((bill) =>
          rm ? (
            <div key={bill.id} className="story-s2__bill" style={{ top: bill.y, left: '22%' }}>
              <span className="story-s2__bill-face story-s2__bill-face--paid">
                {bill.label}
                <i className="story-s2__paid-chip">Payment set up ✓</i>
              </span>
            </div>
          ) : (
            <motion.div key={bill.id} className="story-s2__bill" style={{ top: bill.y, left: bill.x, opacity: bill.op }}>
              <span className="story-s2__bill-face">
                {bill.label}
                <motion.i className="story-s2__paid-chip" style={{ opacity: bill.green }}>
                  Payment set up ✓
                </motion.i>
              </span>
              <motion.span className="story-s2__card" style={{ opacity: bill.card, scale: bill.card }}>
                <CardIcon size={26} />
              </motion.span>
            </motion.div>
          ),
        )}
      </div>

      <motion.div className="story-s2__you" style={rm ? undefined : { x: youX }}>
        <YouRig progress={p} scene="mom" reduceMotion={rm} />
      </motion.div>

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
