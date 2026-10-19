import { motion, useMotionValue, useTransform, type MotionValue } from 'framer-motion'

type Props = {
  lid?: MotionValue<number>
}

/** Home office for Scenes 3–6 — desk, laptop, lamp, plant, day window. */
export function OfficeSet({ lid }: Props) {
  const fallback = useMotionValue(0)
  const lidScale = useTransform(lid ?? fallback, [0, 1], [1, 0.1])
  return (
    <div className="story-room story-room--office" aria-hidden="true">
      <div className="story-room__wall story-room__wall--office" />
      <div className="story-room__window story-room__window--day">
        <span className="story-room__pane" />
        <span className="story-room__light" />
      </div>
      <div className="story-room__floor" />
      <div className="story-room__plant">
        <span className="story-room__pot" />
        <span className="story-room__leaf" />
        <span className="story-room__leaf story-room__leaf--r" />
      </div>
      <div className="story-room__desk">
        <span className="story-room__desk-top" />
        <span className="story-room__desk-leg story-room__desk-leg--l" />
        <span className="story-room__desk-leg story-room__desk-leg--r" />
        <span className="story-room__desk-lamp">
          <span className="story-room__lamp-shade" />
          <span className="story-room__lamp-stem" />
        </span>
        <div className="story-room__laptop">
          <motion.span className="story-room__laptop-lid" style={{ scaleY: lidScale }} />
          <span className="story-room__laptop-base" />
        </div>
      </div>
    </div>
  )
}
