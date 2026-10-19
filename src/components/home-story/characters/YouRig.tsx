import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useState } from 'react'
import { YOU_LOOK } from '../rig/looks'
import { StickFigure } from '../rig/StickFigure'
import { OPENING_TRACK, SUBSCRIPTION_TRACK } from '../rig/tracks'

type Scene = 'opening' | 'subscription'

type Props = {
  className?: string
  progress: MotionValue<number>
  scene: Scene
  reduceMotion?: boolean
}

export function YouRig({ className = '', progress, scene, reduceMotion = false }: Props) {
  const [scrollWiggle, setScrollWiggle] = useState(scene === 'subscription')
  useMotionValueEvent(progress, 'change', (v) => {
    if (scene !== 'subscription') return
    const on = v < 0.24
    setScrollWiggle((prev) => (prev === on ? prev : on))
  })

  if (reduceMotion) {
    return (
      <StickFigure
        className={className}
        poseId={scene === 'opening' ? 'sittingBedPhone' : 'sittingSmile'}
        look={YOU_LOOK}
        reduceMotion
      />
    )
  }

  return (
    <StickFigure
      className={className}
      progress={progress}
      track={scene === 'opening' ? OPENING_TRACK : SUBSCRIPTION_TRACK}
      wiggle={scrollWiggle}
      look={YOU_LOOK}
    />
  )
}
