import { useState } from 'react'
import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import type { CaptionLine } from './storyCopy'

type Props = {
  progress: MotionValue<number>
  lines: CaptionLine[]
  reduceMotion: boolean
}

export function StoryCaptions({ progress, lines, reduceMotion }: Props) {
  const [p, setP] = useState(() => (reduceMotion ? 1 : progress.get()))
  useMotionValueEvent(progress, 'change', setP)
  const value = reduceMotion ? 1 : p
  const reached = lines.filter((line) => value >= line.at)
  const shown = reached.slice(-2)
  if (shown.length === 0) return null

  return (
    <div className="story-captions" aria-live="polite">
      {shown.map((line) => (
        <p key={line.text} className="story-captions__line">
          {line.text}
        </p>
      ))}
    </div>
  )
}
