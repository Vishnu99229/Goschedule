import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { StoryBeat } from './homeStoryScenes'
import { AgentOrb } from './characters/AgentOrb'
import { YouCharacter } from './characters/YouCharacter'
import { SceneDraftReview } from './scenes/SceneDraftReview'
import { SceneEmailMeeting } from './scenes/SceneEmailMeeting'
import { SceneFollowUps } from './scenes/SceneFollowUps'
import { SceneMomBills } from './scenes/SceneMomBills'
import { SceneSubscription } from './scenes/SceneSubscription'
import { SceneTeamSlack } from './scenes/SceneTeamSlack'

type Props = {
  beat: StoryBeat
  index: number
}

const PERSONAL_SCENES = new Set(['subscription', 'mom-bills'])
const WORK_SCENES = new Set(['email-meeting', 'follow-ups', 'draft-review', 'team-slack'])

export function StoryScenePanel({ beat, index }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const isPersonal = PERSONAL_SCENES.has(beat.id)
  const isWork = WORK_SCENES.has(beat.id)
  const isStory = isPersonal || isWork

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isStory ? ['start start', 'end end'] : ['start end', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.35, 1, 1, 0.35])
  const contentY = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [24, 0, 0, -24])

  return (
    <section
      ref={ref}
      className={`home-story__panel home-story__panel--${beat.phase}${
        isPersonal ? ' home-story__panel--tall' : ''
      }${isWork ? ' home-story__panel--work' : ''}`}
      data-scene={beat.id}
      aria-labelledby={`story-beat-${index}`}
    >
      <div className="home-story__pin">
        <p className="sr-only" id={`story-beat-${index}`}>
          {beat.description}
        </p>

        {isStory ? (
          <div className="home-story__stage home-story__stage--scene">
            {beat.id === 'subscription' ? (
              <SceneSubscription progress={scrollYProgress} reduceMotion={reduceMotion} />
            ) : null}
            {beat.id === 'mom-bills' ? (
              <SceneMomBills progress={scrollYProgress} reduceMotion={reduceMotion} />
            ) : null}
            {beat.id === 'email-meeting' ? (
              <SceneEmailMeeting progress={scrollYProgress} reduceMotion={reduceMotion} />
            ) : null}
            {beat.id === 'follow-ups' ? (
              <SceneFollowUps progress={scrollYProgress} reduceMotion={reduceMotion} />
            ) : null}
            {beat.id === 'draft-review' ? (
              <SceneDraftReview progress={scrollYProgress} reduceMotion={reduceMotion} />
            ) : null}
            {beat.id === 'team-slack' ? (
              <SceneTeamSlack progress={scrollYProgress} reduceMotion={reduceMotion} />
            ) : null}
          </div>
        ) : (
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
              </div>
            )}

            <div className="home-story__scene-index" aria-hidden="true">
              <span className="home-story__scene-dot" />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
