import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { useState } from 'react'

type Scene = 'opening' | 'subscription'

type Props = {
  className?: string
  progress: MotionValue<number>
  scene: Scene
  reduceMotion?: boolean
}

/** Rotate a limb group around a fill-box joint (proximal end of the drawn bone). */
function joint(rotate: MotionValue<number>, origin: string) {
  return { rotate, transformBox: 'fill-box' as const, transformOrigin: origin }
}

const T: number[] = [0, 0.1, 0.22, 0.34, 0.46, 0.58, 0.72, 1]

/** Deltas from a drawn sitting rest pose — not a standing figure folded over. */
const OPEN: Record<string, number[]> = {
  torso: [18, 3, -8, 8, 5, 12, 6, 4],
  head: [10, 0, -12, 8, -6, 5, -8, -3],
  armL: [6, 2, -150, 4, 2, 14, 4, 2],
  foreL: [8, 4, -18, 4, 2, 10, 4, 2],
  handL: [0, 0, -8, 0, 0, 4, 0, 0],
  armR: [8, 4, -155, 42, -12, -6, -10, -8],
  foreR: [10, 6, -16, 32, -58, -42, -48, -44],
  handR: [0, 0, -6, 6, -16, -10, -12, -10],
  thighL: [4, 2, 0, 2, 2, 4, 2, 2],
  shinL: [-4, -2, 0, -2, -2, -4, -2, -2],
  thighR: [2, 0, -2, 2, 0, 3, 1, 0],
  shinR: [-2, 0, 2, -2, 0, -3, -1, 0],
  hip: [0, 0, -2, 2, 0, 3, 1, 0],
  lookX: [0, 0, 0, 7, 4, 3, 7, 5],
  lookY: [5, 0, -3, 4, 7, 3, -5, -1],
  brow: [0, 0, 0.15, 0.1, 0.45, -1, -0.3, -0.1],
  mouth: [0, 0, 0.2, 0, -0.2, -1, -0.15, 0.2],
  eyeWide: [-0.1, 0, -0.2, 0.15, 0.75, 0.95, 0.2, 0.08],
  phone: [0, 0, 0, 0.15, 1, 1, 1, 1],
}

const SUB: Record<string, number[]> = {
  torso: [4, 4, 6, 8, 6, 2, 0, 0],
  head: [-4, -6, -6, -2, -4, -6, -2, 0],
  armL: [2, 4, 6, 8, 4, 2, 2, 2],
  foreL: [4, 6, 8, 8, 6, 2, 2, 2],
  handL: [0, 0, 2, 4, 0, 0, 0, 0],
  armR: [-12, -14, -12, -10, -12, -8, -6, -6],
  foreR: [-54, -58, -56, -50, -54, -40, -36, -36],
  handR: [-14, -16, -12, -10, -14, -8, -6, -6],
  thighL: [2, 2, 2, 2, 2, 1, 1, 1],
  shinL: [-2, -2, -2, -2, -2, -1, -1, -1],
  thighR: [0, 0, 0, 0, 0, 0, 0, 0],
  shinR: [0, 0, 0, 0, 0, 0, 0, 0],
  hip: [1, 2, 0, 3, 1, 0, -1, 0],
  lookX: [3, 3, 1, -6, -3, 5, 7, 6],
  lookY: [7, 7, 5, 2, 3, -2, -3, -1],
  brow: [0.1, 0.15, -0.75, -1, -0.35, 0.45, 0.5, 0.4],
  mouth: [0, 0, -0.65, -1, -0.25, 0.9, 1, 1],
  eyeWide: [0.05, 0.08, 0.22, 0.35, 0.12, 0.04, 0, 0],
  phone: [1, 1, 1, 1, 1, 1, 1, 1],
}

/**
 * Seated flat-illustration "You". Bones are drawn in a sitting rest pose;
 * Framer only adds acting deltas around neck, shoulders, elbows, wrists, hips, knees.
 */
export function YouRig({ className = '', progress, scene, reduceMotion = false }: Props) {
  const keys = scene === 'opening' ? OPEN : SUB
  const p = progress
  const torso = useTransform(p, T, keys.torso)
  const head = useTransform(p, T, keys.head)
  const armL = useTransform(p, T, keys.armL)
  const foreL = useTransform(p, T, keys.foreL)
  const handL = useTransform(p, T, keys.handL)
  const armR = useTransform(p, T, keys.armR)
  const foreR = useTransform(p, T, keys.foreR)
  const handR = useTransform(p, T, keys.handR)
  const thighL = useTransform(p, T, keys.thighL)
  const shinL = useTransform(p, T, keys.shinL)
  const thighR = useTransform(p, T, keys.thighR)
  const shinR = useTransform(p, T, keys.shinR)
  const hip = useTransform(p, T, keys.hip)
  const lookX = useTransform(p, T, keys.lookX)
  const lookY = useTransform(p, T, keys.lookY)
  const brow = useTransform(p, T, keys.brow)
  const mouth = useTransform(p, T, keys.mouth)
  const eyeWide = useTransform(p, T, keys.eyeWide)
  const phoneOp = useTransform(p, T, keys.phone)
  const browL = useTransform(brow, [-1, 0, 1], [14, 0, -9])
  const browR = useTransform(brow, [-1, 0, 1], [-14, 0, 9])
  const frownOp = useTransform(mouth, [-1, -0.2, 0], [1, 0.15, 0])
  const flatOp = useTransform(mouth, [-0.65, 0, 0.65], [0, 1, 0])
  const smileOp = useTransform(mouth, [0, 0.25, 1], [0, 0.4, 1])
  const eyeScale = useTransform(eyeWide, [-0.4, 0, 1], [0.84, 1, 1.18])
  const irisX = useTransform(lookX, (v) => v * 0.32)
  const irisY = useTransform(lookY, (v) => v * 0.24)

  const [scrolling, setScrolling] = useState(scene === 'subscription')
  useMotionValueEvent(progress, 'change', (v) => {
    if (scene !== 'subscription') return
    const on = v < 0.28
    setScrolling((prev) => (prev === on ? prev : on))
  })

  return (
    <svg
      className={`story-rig ${scrolling && !reduceMotion ? 'story-rig--scroll' : ''} ${className}`.trim()}
      viewBox="0 0 210 230"
      aria-hidden="true"
    >
      <ellipse cx="118" cy="216" rx="48" ry="7" fill="#c8d0db" opacity="0.45" />

      <motion.g className="story-rig__weight" style={joint(hip, '50% 55%')}>
        <g className="story-rig__breath">
          {/* Back (left) leg — already sitting, hip at left of thigh */}
          <motion.g style={joint(thighL, '0% 50%')}>
            <rect x="78" y="138" width="64" height="18" rx="9" fill="#2a3342" />
            <motion.g style={joint(shinL, '50% 0%')}>
              <rect x="128" y="144" width="16" height="52" rx="8" fill="#2a3342" />
              <ellipse cx="136" cy="198" rx="13" ry="6" fill="#151920" />
            </motion.g>
          </motion.g>

          {/* Front (right) leg */}
          <motion.g style={joint(thighR, '0% 50%')}>
            <rect x="90" y="146" width="68" height="18" rx="9" fill="#1f2733" />
            <motion.g style={joint(shinR, '50% 0%')}>
              <rect x="142" y="152" width="16" height="50" rx="8" fill="#1f2733" />
              <ellipse cx="150" cy="204" rx="13" ry="6" fill="#151920" />
            </motion.g>
          </motion.g>

          <motion.g style={joint(torso, '50% 100%')}>
            <path d="M74 96c2-18 14-28 31-28s29 10 31 28v52c0 10-12 16-31 16s-31-6-31-16V96z" fill="#1c2430" />
            <path d="M92 78h26l5 18H87l5-18z" fill="#141c26" />

            {/* Left arm, hanging toward the bed */}
            <motion.g style={joint(armL, '70% 8%')}>
              <rect x="62" y="90" width="16" height="40" rx="8" fill="#1c2430" />
              <rect x="64" y="118" width="14" height="16" rx="7" fill="#e8b892" />
              <motion.g style={joint(foreL, '50% 0%')}>
                <rect x="62" y="128" width="15" height="36" rx="7.5" fill="#e8b892" />
                <motion.g className="story-rig__hand-l" style={joint(handL, '50% 0%')}>
                  <ellipse cx="70" cy="168" rx="8" ry="9" fill="#e8b892" />
                </motion.g>
              </motion.g>
            </motion.g>

            {/* Right arm, reaches the phone */}
            <motion.g style={joint(armR, '30% 8%')}>
              <rect x="126" y="90" width="16" height="40" rx="8" fill="#1c2430" />
              <rect x="127" y="118" width="14" height="16" rx="7" fill="#d9a57a" />
              <motion.g style={joint(foreR, '50% 0%')}>
                <rect x="127" y="128" width="15" height="36" rx="7.5" fill="#d9a57a" />
                <motion.g className="story-rig__hand-r" style={joint(handR, '50% 0%')}>
                  <ellipse cx="135" cy="168" rx="8" ry="9" fill="#d9a57a" />
                  <ellipse className="story-rig__thumb" cx="144" cy="160" rx="3" ry="3.6" fill="#d9a57a" />
                  <motion.g style={{ opacity: phoneOp }}>
                    <rect x="128" y="140" width="20" height="34" rx="4" fill="#141c26" />
                    <rect x="131" y="144" width="14" height="24" rx="2" fill="#7ec9bc" />
                  </motion.g>
                </motion.g>
              </motion.g>
            </motion.g>

            <motion.g style={joint(head, '50% 100%')}>
              <rect x="98" y="66" width="14" height="16" rx="5" fill="#e8b892" />
              <circle cx="105" cy="48" r="24" fill="#e8b892" />
              <path d="M83 50c3-22 18-30 32-28 9 1 18 9 20 20 1 8-5 12-11 7-7-11-24-14-36-5-4 3-7-2-5 6z" fill="#1a1f28" />
              <ellipse cx="82" cy="52" rx="5" ry="7" fill="#e8b892" />
              <ellipse cx="128" cy="52" rx="5" ry="7" fill="#d9a57a" />

              <motion.g style={joint(browL, '100% 100%')}>
                <path d="M90 38c7-4 16-4 20 0" fill="none" stroke="#1a1f28" strokeWidth="2.6" strokeLinecap="round" />
              </motion.g>
              <motion.g style={joint(browR, '0% 100%')}>
                <path d="M110 38c7-4 16-4 20 0" fill="none" stroke="#1a1f28" strokeWidth="2.6" strokeLinecap="round" />
              </motion.g>

              <motion.g style={{ scale: eyeScale, transformOrigin: '96px 50px' }}>
                <ellipse cx="96" cy="50" rx="7.2" ry="5.6" fill="#fff" />
                <motion.circle cx="96" cy="50.5" r="3.4" fill="#5c3a28" style={{ x: irisX, y: irisY }} />
                <motion.circle cx="97" cy="49.2" r="1.2" fill="#1a1f28" style={{ x: irisX, y: irisY }} />
                <rect className="story-rig__lid" x="88" y="43" width="16" height="14" rx="7" fill="#e8b892" />
              </motion.g>
              <motion.g style={{ scale: eyeScale, transformOrigin: '116px 50px' }}>
                <ellipse cx="116" cy="50" rx="7.2" ry="5.6" fill="#fff" />
                <motion.circle cx="116" cy="50.5" r="3.4" fill="#5c3a28" style={{ x: irisX, y: irisY }} />
                <motion.circle cx="117" cy="49.2" r="1.2" fill="#1a1f28" style={{ x: irisX, y: irisY }} />
                <rect className="story-rig__lid" x="108" y="43" width="16" height="14" rx="7" fill="#e8b892" />
              </motion.g>

              <path d="M105 54c0 5 3 7 0 9" fill="none" stroke="#c48a6a" strokeWidth="1.5" strokeLinecap="round" />

              <motion.path
                d="M96 64c5 2 13 2 18 0"
                fill="none"
                stroke="#8a5a40"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ opacity: frownOp }}
              />
              <motion.path
                d="M97 65h16"
                fill="none"
                stroke="#8a5a40"
                strokeWidth="1.8"
                strokeLinecap="round"
                style={{ opacity: flatOp }}
              />
              <motion.path
                d="M96 63c5 7 13 7 18 0"
                fill="none"
                stroke="#8a5a40"
                strokeWidth="2.1"
                strokeLinecap="round"
                style={{ opacity: smileOp }}
              />
            </motion.g>
          </motion.g>
        </g>
      </motion.g>
    </svg>
  )
}
