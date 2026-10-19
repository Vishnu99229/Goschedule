import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { useState } from 'react'

type Scene = 'opening' | 'subscription'

type Props = {
  className?: string
  progress: MotionValue<number>
  scene: Scene
  reduceMotion?: boolean
}

function jointStyle(rotate: MotionValue<number>, origin: string) {
  return {
    rotate,
    transformBox: 'fill-box' as const,
    transformOrigin: origin,
  }
}

const T: number[] = [0, 0.1, 0.22, 0.34, 0.46, 0.56, 0.68, 1]

const OPEN: Record<string, number[]> = {
  torso: [32, 6, -10, 10, 8, 16, 10, 8],
  head: [16, -4, -16, 12, -8, 6, -12, -6],
  armL: [26, 10, -155, 14, 12, 24, 12, 10],
  foreL: [22, 16, -18, 14, 12, 20, 14, 12],
  handL: [0, 0, -8, 0, 0, 4, 0, 0],
  armR: [20, 8, -148, 52, -18, -10, -14, -12],
  foreR: [18, 14, -22, 38, -62, -48, -52, -50],
  handR: [0, 0, -6, 8, -18, -12, -14, -12],
  thighL: [-64, -62, -60, -62, -62, -64, -62, -62],
  shinL: [58, 56, 54, 56, 56, 58, 56, 56],
  thighR: [-58, -56, -54, -58, -56, -58, -56, -56],
  shinR: [52, 50, 48, 50, 50, 52, 50, 50],
  hip: [0, 0, -2, 3, 0, 5, 2, 1],
  lookX: [0, 0, 0, 8, 4, 3, 8, 6],
  lookY: [6, 0, -4, 5, 8, 4, -6, -2],
  brow: [0, 0, 0.2, 0.1, 0.4, -1, -0.35, -0.15],
  mouth: [0, 0, 0.25, 0, -0.15, -1, -0.2, 0.15],
  eyeWide: [-0.15, 0, -0.25, 0.1, 0.7, 0.9, 0.25, 0.1],
  phone: [0, 0, 0, 0, 1, 1, 1, 1],
}

const SUB: Record<string, number[]> = {
  torso: [8, 8, 10, 12, 10, 6, 4, 4],
  head: [-6, -8, -8, -4, -6, -8, -4, -2],
  armL: [10, 12, 14, 16, 12, 8, 8, 8],
  foreL: [12, 14, 16, 16, 14, 10, 10, 10],
  handL: [0, 0, 2, 4, 0, 0, 0, 0],
  armR: [-16, -18, -16, -14, -16, -12, -10, -10],
  foreR: [-58, -62, -60, -56, -58, -48, -44, -44],
  handR: [-16, -18, -14, -12, -16, -10, -8, -8],
  thighL: [-62, -62, -62, -62, -62, -60, -60, -60],
  shinL: [56, 56, 56, 56, 56, 54, 54, 54],
  thighR: [-56, -56, -56, -56, -56, -54, -54, -54],
  shinR: [50, 50, 50, 50, 50, 48, 48, 48],
  hip: [1, 2, 0, 3, 1, 0, -1, 0],
  lookX: [4, 4, 2, -6, -4, 6, 8, 8],
  lookY: [8, 8, 6, 2, 4, -2, -4, -2],
  brow: [0.1, 0.15, -0.7, -1, -0.4, 0.4, 0.5, 0.45],
  mouth: [0, 0, -0.6, -1, -0.3, 0.85, 1, 1],
  eyeWide: [0.05, 0.1, 0.2, 0.35, 0.15, 0.05, 0, 0],
  phone: [1, 1, 1, 1, 1, 1, 1, 1],
}

/**
 * Flat-illustration "You" — separate limb groups with joint origins.
 * Opening and Scene 1 drive the same rig from scene progress.
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
  const browL = useTransform(brow, [-1, 0, 1], [16, 0, -10])
  const browR = useTransform(brow, [-1, 0, 1], [-16, 0, 10])
  const frownOp = useTransform(mouth, [-1, -0.2, 0], [1, 0.2, 0])
  const flatOp = useTransform(mouth, [-0.7, 0, 0.7], [0, 1, 0])
  const smileOp = useTransform(mouth, [0, 0.25, 1], [0, 0.35, 1])
  const eyeScale = useTransform(eyeWide, [-0.4, 0, 1], [0.82, 1, 1.22])
  const irisX = useTransform(lookX, (v) => v * 0.28)
  const irisY = useTransform(lookY, (v) => v * 0.22)

  const [scrolling, setScrolling] = useState(scene === 'subscription')
  useMotionValueEvent(progress, 'change', (v) => {
    if (scene !== 'subscription') return
    const on = v < 0.28
    setScrolling((prev) => (prev === on ? prev : on))
  })
  return (
    <svg
      className={`story-rig ${scrolling && !reduceMotion ? 'story-rig--scroll' : ''} ${className}`.trim()}
      viewBox="0 0 180 280"
      aria-hidden="true"
    >
      <ellipse cx="90" cy="268" rx="42" ry="8" fill="#c8d0db" opacity="0.55" />

      <motion.g className="story-rig__weight" style={jointStyle(hip, '50% 70%')}>
        <g className="story-rig__breath">
        <motion.g style={jointStyle(thighL, '50% 0%')}>
          <path d="M70 168c0-8 16-8 16 0v46c0 8-16 8-16 0V168z" fill="#2c3544" />
          <motion.g style={jointStyle(shinL, '50% 0%')}>
            <path d="M71 210c0-7 14-7 14 0v44c0 7-14 7-14 0V210z" fill="#2c3544" />
            <ellipse cx="78" cy="258" rx="13" ry="6" fill="#1a1f28" />
          </motion.g>
        </motion.g>

        <motion.g style={jointStyle(thighR, '50% 0%')}>
          <path d="M94 168c0-8 16-8 16 0v46c0 8-16 8-16 0V168z" fill="#232b38" />
          <motion.g style={jointStyle(shinR, '50% 0%')}>
            <path d="M97 210c0-7 14-7 14 0v44c0 7-14 7-14 0V210z" fill="#232b38" />
            <ellipse cx="104" cy="258" rx="13" ry="6" fill="#1a1f28" />
          </motion.g>
        </motion.g>

        <motion.g style={jointStyle(torso, '50% 100%')}>
          <path d="M64 102c2-16 12-24 26-24s24 8 26 24v62c0 10-10 16-26 16s-26-6-26-16V102z" fill="#1c2430" />
          <path d="M78 86h24l4 16H74l4-16z" fill="#141c26" />

          <motion.g style={jointStyle(armL, '80% 10%')}>
            <path d="M56 98c-8 2-12 10-10 18l12 28c4 8 14 8 16 0l-8-36c-2-8-8-12-10-10z" fill="#e8b892" />
            <path d="M57 100c-2 0-8 4-6 12l8 22h10l-6-28c-1-6-5-8-6-6z" fill="#1c2430" />
            <motion.g style={jointStyle(foreL, '50% 0%')}>
              <path d="M50 138c-6 2-8 10-6 16l8 24c3 8 14 6 14-2l-8-32c-2-6-6-8-8-6z" fill="#e8b892" />
              <motion.g className="story-rig__hand-l" style={jointStyle(handL, '50% 0%')}>
                <ellipse cx="54" cy="176" rx="8" ry="10" fill="#e8b892" />
              </motion.g>
            </motion.g>
          </motion.g>

          <motion.g style={jointStyle(armR, '20% 10%')}>
            <path d="M124 98c8 2 12 10 10 18l-12 28c-4 8-14 8-16 0l8-36c2-8 8-12 10-10z" fill="#e0ad86" />
            <path d="M123 100c2 0 8 4 6 12l-8 22h-10l6-28c1-6 5-8 6-6z" fill="#1c2430" />
            <motion.g style={jointStyle(foreR, '50% 0%')}>
              <path d="M130 138c6 2 8 10 6 16l-8 24c-3 8-14 6-14-2l8-32c2-6 6-8 8-6z" fill="#e0ad86" />
              <motion.g className="story-rig__hand-r" style={jointStyle(handR, '50% 0%')}>
                <ellipse cx="126" cy="176" rx="8" ry="10" fill="#e0ad86" />
                <ellipse className="story-rig__thumb" cx="132" cy="168" rx="2.6" ry="3.4" fill="#e0ad86" />
                <motion.g style={{ opacity: phoneOp }}>
                  <rect x="118" y="150" width="18" height="30" rx="3.5" fill="#141c26" />
                  <rect x="121" y="154" width="12" height="20" rx="1.5" fill="#7ec9bc" />
                </motion.g>
              </motion.g>
            </motion.g>
          </motion.g>

          <motion.g style={jointStyle(head, '50% 100%')}>
            <rect x="84" y="78" width="12" height="14" rx="4" fill="#e8b892" />
            <circle cx="90" cy="58" r="22" fill="#e8b892" />
            <path d="M70 58c2-20 16-28 28-26 8 1 16 8 18 18 1 8-4 12-10 8-6-10-22-12-32-4-4 3-6-2-4 4z" fill="#1a1f28" />
            <path d="M68 60c-2 6 0 12 4 14 1-6 2-12 0-16-1-1-3 0-4 2z" fill="#e8b892" />
            <path d="M112 60c2 6 0 12-4 14-1-6-2-12 0-16 1-1 3 0 4 2z" fill="#e0ad86" />

            <motion.g style={jointStyle(browL, '100% 100%')}>
              <path d="M72 48c6-4 14-4 18 0" fill="none" stroke="#1a1f28" strokeWidth="2.4" strokeLinecap="round" />
            </motion.g>
            <motion.g style={jointStyle(browR, '0% 100%')}>
              <path d="M90 48c6-4 14-4 18 0" fill="none" stroke="#1a1f28" strokeWidth="2.4" strokeLinecap="round" />
            </motion.g>

            <motion.g style={{ scale: eyeScale, transformOrigin: '80px 58px' }}>
              <ellipse cx="80" cy="58" rx="6.5" ry="5.2" fill="#fff" />
              <motion.circle cx="80" cy="58" r="3.1" fill="#5c3a28" style={{ x: irisX, y: irisY }} />
              <motion.circle cx="80.8" cy="56.8" r="1.1" fill="#1a1f28" style={{ x: irisX, y: irisY }} />
              <rect className="story-rig__lid" x="73" y="52" width="14" height="12" rx="6" fill="#e8b892" />
            </motion.g>
            <motion.g style={{ scale: eyeScale, transformOrigin: '100px 58px' }}>
              <ellipse cx="100" cy="58" rx="6.5" ry="5.2" fill="#fff" />
              <motion.circle cx="100" cy="58" r="3.1" fill="#5c3a28" style={{ x: irisX, y: irisY }} />
              <motion.circle cx="100.8" cy="56.8" r="1.1" fill="#1a1f28" style={{ x: irisX, y: irisY }} />
              <rect className="story-rig__lid" x="93" y="52" width="14" height="12" rx="6" fill="#e8b892" />
            </motion.g>

            <path d="M90 62c0 4 3 6 0 8" fill="none" stroke="#c48a6a" strokeWidth="1.4" strokeLinecap="round" />

            <motion.path
              d="M82 72c4 2 12 2 16 0"
              fill="none"
              stroke="#8a5a40"
              strokeWidth="1.8"
              strokeLinecap="round"
              style={{ opacity: frownOp }}
            />
            <motion.path
              d="M83 73h14"
              fill="none"
              stroke="#8a5a40"
              strokeWidth="1.7"
              strokeLinecap="round"
              style={{ opacity: flatOp }}
            />
            <motion.path
              d="M82 71c4 6 12 6 16 0"
              fill="none"
              stroke="#8a5a40"
              strokeWidth="1.9"
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
