import { useCallback, useRef, useState } from 'react'
import { useReducedMotion, useScroll } from 'framer-motion'
import { STORY_BEATS, WORK_SCENE_IDS } from './homeStoryScenes'
import { completeInOrder } from './queueTasks'
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
  const [done, setDone] = useState<Set<string>>(() => new Set())
  const markDone = useCallback((id: string) => {
    setDone((prev) => {
      const next = completeInOrder(prev, id)
      if (next.size === prev.size && prev.has(id)) return prev
      return next
    })
  }, [])

  const workBeats = STORY_BEATS.filter((b) => WORK_SET.has(b.id))
  const before = STORY_BEATS.filter((b) => b.id === 'opening' || b.id === 'subscription' || b.id === 'mom-bills')
  const ending = STORY_BEATS.find((b) => b.id === 'ending')

  return (
    <div className="home-story__scroll" ref={scrollRef}>
      <StorySky progress={scrollYProgress} reduceMotion={reduceMotion} />
      <StoryProgress
        completed={done}
        queueReady={done.has('opening') || reduceMotion}
        reduceMotion={reduceMotion}
      />
      {before.map((beat) => (
        <StoryScenePanel key={beat.id} beat={beat} onComplete={markDone} />
      ))}
      <WorkSpan beats={workBeats} onComplete={markDone} />
      {ending ? <StoryScenePanel beat={ending} onComplete={markDone} /> : null}
    </div>
  )
}
