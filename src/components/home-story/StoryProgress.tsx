import { motion, useTransform, type MotionValue } from 'framer-motion'
import type { ComponentType } from 'react'
import { CheckIcon } from './icons/StoryIcons'
import { QUEUE_TASKS } from './queueTasks'

type IconProps = { className?: string; size?: number }

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

function QueueItem({
  Icon,
  checked,
  gather,
  index,
  reduceMotion,
}: {
  Icon: ComponentType<IconProps>
  checked: MotionValue<number>
  gather: MotionValue<number>
  index: number
  reduceMotion: boolean
}) {
  const iconOp = useTransform(checked, (v) => 1 - v)
  const gx = useTransform(gather, (v) => v * (2.5 - index) * 8)
  const gy = useTransform(gather, (v) => v * -16)

  return (
    <li className="story-progress__item">
      {reduceMotion ? (
        <span className="story-progress__icon">
          <Icon size={16} />
        </span>
      ) : (
        <>
          <motion.span className="story-progress__icon" style={{ opacity: iconOp }}>
            <Icon size={16} />
          </motion.span>
          <motion.span className="story-progress__check" style={{ opacity: checked, scale: checked, x: gx, y: gy }}>
            <CheckIcon size={16} />
          </motion.span>
        </>
      )}
    </li>
  )
}

/** Six task icons — the same row that formed in the opening. Checks fill as scenes complete. */
export function StoryProgress({ progress, reduceMotion }: Props) {
  const visible = useTransform(progress, [0.04, 0.08], [0, 1])
  const check0 = useTransform(progress, [0.2, 0.24], [0, 1])
  const check1 = useTransform(progress, [0.38, 0.42], [0, 1])
  const check2 = useTransform(progress, [0.52, 0.55], [0, 1])
  const check3 = useTransform(progress, [0.65, 0.68], [0, 1])
  const check4 = useTransform(progress, [0.76, 0.78], [0, 1])
  const check5 = useTransform(progress, [0.88, 0.91], [0, 1])
  const checks = [check0, check1, check2, check3, check4, check5]
  const gather = useTransform(progress, [0.93, 0.98], [0, 1])

  return (
    <motion.nav className="story-progress" aria-label="Day's tasks" style={reduceMotion ? undefined : { opacity: visible }}>
      <ol className="story-progress__list">
        {QUEUE_TASKS.map((task, i) => (
          <QueueItem
            key={task.id}
            Icon={task.Icon}
            checked={checks[i]}
            gather={gather}
            index={i}
            reduceMotion={reduceMotion}
          />
        ))}
      </ol>
    </motion.nav>
  )
}
