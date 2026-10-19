import { motion, useTransform, type MotionValue } from 'framer-motion'

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

/** One sun/moon that travels across the whole day; sky colour follows it. */
export function StorySky({ progress, reduceMotion }: Props) {
  const morning = useTransform(progress, [0, 0.22, 0.38], [1, 0.55, 0])
  const day = useTransform(progress, [0.18, 0.36, 0.72, 0.86], [0, 1, 1, 0])
  const evening = useTransform(progress, [0.7, 0.86, 1], [0, 0.7, 1])

  const sunX = useTransform(progress, [0, 0.18, 0.5, 0.78, 0.88], ['10%', '34%', '58%', '82%', '94%'])
  const sunY = useTransform(progress, [0, 0.14, 0.48, 0.78, 0.9], ['58%', '22%', '10%', '42%', '78%'])
  const sunOp = useTransform(progress, [0, 0.8, 0.9], [1, 1, 0])
  const moonX = useTransform(progress, [0.82, 1], ['78%', '64%'])
  const moonY = useTransform(progress, [0.82, 1], ['70%', '18%'])
  const moonOp = useTransform(progress, [0.82, 0.9, 1], [0, 1, 1])

  if (reduceMotion) {
    return (
      <div className="story-sky" aria-hidden="true">
        <div className="story-sky__layer story-sky__layer--morning" />
        <span className="story-sky__sun" style={{ left: '34%', top: '22%' }} />
      </div>
    )
  }

  return (
    <div className="story-sky" aria-hidden="true">
      <motion.div className="story-sky__layer story-sky__layer--morning" style={{ opacity: morning }} />
      <motion.div className="story-sky__layer story-sky__layer--day" style={{ opacity: day }} />
      <motion.div className="story-sky__layer story-sky__layer--evening" style={{ opacity: evening }} />
      <span className="story-sky__cloud story-sky__cloud--a" />
      <span className="story-sky__cloud story-sky__cloud--b" />
      <motion.span className="story-sky__sun" style={{ left: sunX, top: sunY, opacity: sunOp }} />
      <motion.span className="story-sky__moon" style={{ left: moonX, top: moonY, opacity: moonOp }} />
    </div>
  )
}
