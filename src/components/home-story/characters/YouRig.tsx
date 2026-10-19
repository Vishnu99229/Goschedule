import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useState } from 'react'
import { YOU_LOOK } from '../rig/looks'
import { StickFigure } from '../rig/StickFigure'
import {
  DESK_LEAN_TRACK,
  DESK_TRACK,
  ENDING_TRACK,
  MOM_YOU_TRACK,
  OPENING_TRACK,
  SUBSCRIPTION_TRACK,
} from '../rig/tracks'
import type { PoseId } from '../rig/types'

export type YouScene = 'opening' | 'subscription' | 'mom' | 'desk' | 'ending'

type Props = {
  className?: string
  progress: MotionValue<number>
  scene: YouScene
  reduceMotion?: boolean
  /** Scene 6 leans back at the end of the workday. */
  lean?: boolean
}

const TRACKS = {
  opening: OPENING_TRACK,
  subscription: SUBSCRIPTION_TRACK,
  mom: MOM_YOU_TRACK,
  desk: DESK_TRACK,
  ending: ENDING_TRACK,
} as const

const REST: Record<YouScene, PoseId> = {
  opening: 'sittingBedPhone',
  subscription: 'sittingSmile',
  mom: 'pickingUpBag',
  desk: 'deskTyping',
  ending: 'sofaRelax',
}

export function YouRig({
  className = '',
  progress,
  scene,
  reduceMotion = false,
  lean = false,
}: Props) {
  const [scrollWiggle, setScrollWiggle] = useState(scene === 'subscription')
  useMotionValueEvent(progress, 'change', (v) => {
    if (scene !== 'subscription') return
    const on = v < 0.24
    setScrollWiggle((prev) => (prev === on ? prev : on))
  })

  if (reduceMotion) {
    return <StickFigure className={className} poseId={REST[scene]} look={YOU_LOOK} reduceMotion />
  }

  const wiggle =
    scene === 'subscription' && scrollWiggle ? 'scroll' : scene === 'desk' && !lean ? 'type' : false

  return (
    <StickFigure
      className={className}
      progress={progress}
      track={scene === 'desk' && lean ? DESK_LEAN_TRACK : TRACKS[scene]}
      wiggle={wiggle}
      look={YOU_LOOK}
    />
  )
}
