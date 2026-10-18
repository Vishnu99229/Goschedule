import { useRef } from 'react'
import { useReducedMotion, useScroll } from 'framer-motion'
import type { StoryBeat } from './homeStoryScenes'
import { SceneWorkday } from './scenes/SceneWorkday'

type Props = {
  beats: StoryBeat[]
}

const MARKER_TOP: Record<string, string> = {
  'email-meeting': '0',
  'follow-ups': '200vh',
  'draft-review': '400vh',
  'team-slack': '560vh',
}

const MARKER_HEIGHT: Record<string, string> = {
  'email-meeting': '200vh',
  'follow-ups': '200vh',
  'draft-review': '160vh',
  'team-slack': '200vh',
}

export function WorkSpan({ beats }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  return (
    <div ref={ref} className="home-story__work-wrap">
      <div className="home-story__pin home-story__pin--work">
        <div className="home-story__stage home-story__stage--scene">
          <SceneWorkday progress={scrollYProgress} reduceMotion={reduceMotion} />
        </div>
      </div>
      {beats.map((beat, i) => (
        <section
          key={beat.id}
          data-scene={beat.id}
          className="home-story__work-marker"
          style={{ top: MARKER_TOP[beat.id], height: MARKER_HEIGHT[beat.id] }}
          aria-labelledby={`story-work-${i}`}
        >
          <p className="sr-only" id={`story-work-${i}`}>
            {beat.description}
          </p>
        </section>
      ))}
    </div>
  )
}
