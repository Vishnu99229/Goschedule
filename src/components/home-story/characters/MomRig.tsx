import { useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useState } from 'react'
import { MOM_LOOK } from '../rig/looks'
import { StickFigure } from '../rig/StickFigure'
import { MOM_TRACK } from '../rig/tracks'

type Props = {
  className?: string
  progress: MotionValue<number>
  reduceMotion?: boolean
}

export function MomRig({ className = '', progress, reduceMotion = false }: Props) {
  const [wiggle, setWiggle] = useState<'sip' | 'page' | false>('sip')
  useMotionValueEvent(progress, 'change', (v) => {
    const next = v >= 0.3 && v < 0.56 ? 'page' : v < 0.88 ? 'sip' : false
    setWiggle((prev) => (prev === next ? prev : next))
  })

  if (reduceMotion) {
    return <StickFigure className={className} poseId="momSip" look={MOM_LOOK} reduceMotion />
  }

  return (
    <StickFigure
      className={className}
      progress={progress}
      track={MOM_TRACK}
      wiggle={wiggle}
      look={MOM_LOOK}
    />
  )
}
