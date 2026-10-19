import { useRef } from 'react'
import { useReducedMotion, useScroll } from 'framer-motion'
import { STORY_BEATS, WORK_SCENE_IDS } from './homeStoryScenes'
import { StoryProgress } from './StoryProgress'
import { StoryScenePanel } from './StoryScenePanel'
import { StorySky } from './StorySky'
import { WorkSpan } from './WorkSpan'

const WORK_SET = new Set<string>(WORK_SCENE_IDS)

export default function HomeStory() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end start'],
  })

  const workBeats = STORY_BEATS.filter((b) => WORK_SET.has(b.id))
  const before = STORY_BEATS.filter((b) => b.id === 'opening' || b.id === 'subscription' || b.id === 'mom-bills')
  const ending = STORY_BEATS.find((b) => b.id === 'ending')

  return (
    <div className="home-story__scroll" ref={scrollRef}>
      <StorySky progress={scrollYProgress} reduceMotion={reduceMotion} />
      <StoryProgress progress={scrollYProgress} reduceMotion={reduceMotion} />
      {before.map((beat, index) => (
        <StoryScenePanel key={beat.id} beat={beat} index={index} />
      ))}
      <WorkSpan beats={workBeats} />
      {ending ? <StoryScenePanel beat={ending} index={STORY_BEATS.length - 1} /> : null}
    </div>
  )
}
