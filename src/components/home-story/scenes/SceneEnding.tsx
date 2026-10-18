import { lazy, Suspense } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import Logo from '../../Logo'
import { AgentOrb } from '../characters/AgentOrb'
import { YouCharacter } from '../characters/YouCharacter'

const VoiceAgent = lazy(() => import('../../voice/VoiceAgent'))

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneEnding({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion

  const orbOp = useTransform(p, [0.08, 0.22, 0.52, 0.72], [0.2, 1, 1, 0])
  const orbScale = useTransform(p, [0.5, 0.74], [1, 0.12])
  const markOp = useTransform(p, [0.58, 0.78], [0, 1])
  const markScale = useTransform(p, [0.58, 0.8], [0.4, 1])
  const micOp = useTransform(p, [0.72, 0.9], [0, 1])

  return (
    <div className="story-end" aria-hidden="false">
      <div className="story-end__couch" aria-hidden="true" />
      <div className="story-end__you" aria-hidden="true">
        <YouCharacter pose="rest" />
      </div>
      <div className="story-end__phone" aria-hidden="true" />

      {rm ? (
        <>
          <div className="story-end__mark" aria-hidden="true">
            <Logo variant="mark-only" size={36} />
          </div>
          <div className="story-end__mic">
            <Suspense fallback={<span className="voice-mic__placeholder" />}>
              <VoiceAgent compact variant="mic" />
            </Suspense>
          </div>
        </>
      ) : (
        <>
          <AgentOrb
            size={40}
            className="story-end__orb"
            style={{ opacity: orbOp, scale: orbScale }}
          />
          <motion.div className="story-end__mark" style={{ opacity: markOp, scale: markScale }} aria-hidden="true">
            <Logo variant="mark-only" size={36} />
          </motion.div>
          <motion.div className="story-end__mic" style={{ opacity: micOp }}>
            <Suspense fallback={<span className="voice-mic__placeholder" />}>
              <VoiceAgent compact variant="mic" />
            </Suspense>
          </motion.div>
        </>
      )}
    </div>
  )
}
