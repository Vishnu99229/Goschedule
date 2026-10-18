import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { StoryBeat } from './homeStoryScenes'
import { AgentOrb } from './characters/AgentOrb'
import { YouCharacter } from './characters/YouCharacter'

type Props = {
  beat: StoryBeat
  index: number
}

export function StoryScenePanel({ beat, index }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.35, 1, 1, 0.35])
  const contentY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [24, 0, 0, -24])

  return (
    <section
      ref={ref}
      className={`home-story__panel home-story__panel--${beat.phase}`}
      data-scene={beat.id}
      aria-labelledby={`story-beat-${index}`}
    >
      <div className="home-story__pin">
        <p className="sr-only" id={`story-beat-${index}`}>
          {beat.description}
        </p>

        <motion.div
          className="home-story__stage"
          style={
            reduceMotion
              ? undefined
              : {
                  opacity: contentOpacity,
                  y: contentY,
                }
          }
        >
          <div className="home-story__placeholder-ui" aria-hidden="true">
            <div className="home-story__skeleton home-story__skeleton--wide" />
            <div className="home-story__skeleton" />
            <div className="home-story__skeleton home-story__skeleton--short" />
          </div>

          <div className="home-story__cast">
            <YouCharacter />
            <AgentOrb size={beat.id === 'ending' ? 40 : 44} />
          </div>

          {beat.id === 'ending' && (
            <div className="home-story__ending-mark" aria-hidden="true">
              <span className="home-story__mic-placeholder" />
              <span className="sr-only">Voice agent control will appear here.</span>
            </div>
          )}

          <div className="home-story__scene-index" aria-hidden="true">
            <span className="home-story__scene-dot" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
