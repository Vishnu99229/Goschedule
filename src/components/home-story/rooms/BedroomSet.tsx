import { motion, type MotionValue } from 'framer-motion'

type Props = {
  tablePhoneOp?: MotionValue<number>
}

/** Shared bedroom for Opening and Scene 1 — bed, morning window, side table. */
export function BedroomSet({ tablePhoneOp }: Props) {
  return (
    <div className="story-room story-room--bedroom" aria-hidden="true">
      <div className="story-room__wall" />
      <div className="story-room__window">
        <span className="story-room__pane" />
        <span className="story-room__pane" />
        <span className="story-room__curtain story-room__curtain--l" />
        <span className="story-room__curtain story-room__curtain--r" />
        <span className="story-room__light" />
      </div>
      <div className="story-room__floor" />
      <div className="story-room__rug" />
      <div className="story-room__bed">
        <div className="story-room__headboard" />
        <div className="story-room__mattress" />
        <div className="story-room__pillow" />
        <div className="story-room__blanket" />
      </div>
      <div className="story-room__table">
        <div className="story-room__lamp">
          <span className="story-room__lamp-shade" />
          <span className="story-room__lamp-stem" />
        </div>
        {tablePhoneOp ? (
          <motion.span className="story-room__phone" style={{ opacity: tablePhoneOp }} />
        ) : (
          <span className="story-room__phone story-room__phone--hidden" />
        )}
      </div>
    </div>
  )
}
