import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { StoryBeat } from './homeStoryScenes'
import { SceneWorkday } from './scenes/SceneWorkday'
import { StoryCaptions } from './StoryCaptions'
import { StoryReplay } from './StoryReplay'
import { SCENE_NARRATION } from './storyCopy'
import { useInView } from './useInView'
import { useScenePlayback } from './useScenePlayback'

type Props = {
  beats: StoryBeat[]
  onComplete: (id: string) => void
}

export function WorkSpan({ beats, onComplete }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const emailRef = useRef<HTMLElement>(null)
  const followRef = useRef<HTMLElement>(null)
  const draftRef = useRef<HTMLElement>(null)
  const slackRef = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const wrapInView = useInView(wrapRef, 0.15)
  const [active, setActive] = useState(beats[0]?.id ?? 'email-meeting')

  useEffect(() => {
    const nodes = [emailRef.current, followRef.current, draftRef.current, slackRef.current].filter(
      (n): n is HTMLElement => Boolean(n),
    )
    if (nodes.length === 0 || typeof IntersectionObserver === 'undefined') return
    const ratios: Record<string, number> = {}
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.scene
          if (id) ratios[id] = entry.intersectionRatio
        }
        let best = beats[0]?.id ?? 'email-meeting'
        let bestRatio = -1
        for (const beat of beats) {
          const r = ratios[beat.id] ?? 0
          if (r > bestRatio) {
            bestRatio = r
            best = beat.id
          }
        }
        if (bestRatio > 0) setActive((prev) => (prev === best ? prev : best))
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    )
    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [beats])

  const emailOn = active === 'email-meeting'
  const followOn = active === 'follow-ups'
  const draftOn = active === 'draft-review'
  const slackOn = active === 'team-slack'

  const arrive = useScenePlayback({
    inView: wrapInView,
    reduceMotion,
    durationMs: 1600,
  })
  const email = useScenePlayback({
    inView: wrapInView && emailOn,
    reduceMotion,
    durationMs: SCENE_NARRATION['email-meeting'].durationMs,
    onComplete: () => onComplete('email-meeting'),
  })
  const follow = useScenePlayback({
    inView: wrapInView && followOn,
    reduceMotion,
    durationMs: SCENE_NARRATION['follow-ups'].durationMs,
    onComplete: () => onComplete('follow-ups'),
  })
  const draft = useScenePlayback({
    inView: wrapInView && draftOn,
    reduceMotion,
    durationMs: SCENE_NARRATION['draft-review'].durationMs,
    onComplete: () => onComplete('draft-review'),
  })
  const slack = useScenePlayback({
    inView: wrapInView && slackOn,
    reduceMotion,
    durationMs: SCENE_NARRATION['team-slack'].durationMs,
    onComplete: () => onComplete('team-slack'),
  })

  const live = wrapInView && !reduceMotion
  const activeCopy = SCENE_NARRATION[active] ?? SCENE_NARRATION['email-meeting']
  const plays = {
    'email-meeting': email,
    'follow-ups': follow,
    'draft-review': draft,
    'team-slack': slack,
  }
  const current = plays[active as keyof typeof plays] ?? email
  const refs = [emailRef, followRef, draftRef, slackRef]

  return (
    <div ref={wrapRef} className={`home-story__work-wrap${live ? ' is-live' : ''}`}>
      <div className="home-story__pin home-story__pin--work">
        <div className="home-story__copy">
          <StoryCaptions progress={current.progress} lines={activeCopy.lines} reduceMotion={reduceMotion} />
        </div>
        <div className="home-story__stage-wrap">
          <div className="home-story__stage home-story__stage--scene">
            <div className="home-story__stage-fit">
              <SceneWorkday
                reduceMotion={reduceMotion}
                arrive={arrive.progress}
                email={email.progress}
                follow={follow.progress}
                draft={draft.progress}
                slack={slack.progress}
                emailOn={emailOn}
                followOn={followOn}
                draftOn={draftOn}
                slackOn={slackOn}
              />
            </div>
          </div>
          <StoryReplay onReplay={current.replay} hidden={reduceMotion} />
        </div>
      </div>
      {beats.map((beat, i) => (
        <section
          key={beat.id}
          ref={refs[i]}
          id={beat.id}
          data-scene={beat.id}
          className="home-story__work-marker"
          style={{ top: `${i * 100}svh`, height: '100svh' }}
        />
      ))}
    </div>
  )
}
