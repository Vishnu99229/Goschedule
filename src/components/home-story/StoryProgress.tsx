import type { ComponentType } from 'react'
import { CheckIcon } from './icons/StoryIcons'
import { QUEUE_TASKS } from './queueTasks'

type IconProps = { className?: string; size?: number }

type Props = {
  completed: Set<string>
  queueReady: boolean
  reduceMotion: boolean
}

function QueueItem({
  Icon,
  checked,
  gathering,
}: {
  Icon: ComponentType<IconProps>
  checked: boolean
  gathering: boolean
}) {
  return (
    <li className={`story-progress__item${checked ? ' is-checked' : ''}${gathering ? ' is-gathering' : ''}`}>
      <span className="story-progress__icon" style={{ opacity: checked ? 0 : 1 }}>
        <Icon size={16} />
      </span>
      <span className="story-progress__check" style={{ opacity: checked ? 1 : 0, transform: checked ? 'scale(1)' : 'scale(0.4)' }}>
        <CheckIcon size={16} />
      </span>
    </li>
  )
}

/** Six task icons — the same row that formed in the opening. Checks fill as scenes complete. */
export function StoryProgress({ completed, queueReady, reduceMotion }: Props) {
  const gathering = completed.has('ending')
  if (!queueReady && !reduceMotion) return null

  return (
    <nav className="story-progress" aria-label="Day's tasks">
      <ol className="story-progress__list">
        {QUEUE_TASKS.map((task) => (
          <QueueItem
            key={task.id}
            Icon={task.Icon}
            checked={completed.has(task.id) || gathering}
            gathering={gathering}
          />
        ))}
      </ol>
    </nav>
  )
}
