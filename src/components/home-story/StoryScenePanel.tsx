import { useEffect, useRef, useState, type ComponentType } from 'react'
import { useMotionValueEvent, useReducedMotion, type MotionValue } from 'framer-motion'
import { EndingCta } from './EndingCta'
import type { StoryBeat } from './homeStoryScenes'
import { SceneOpening } from './scenes/SceneOpening'
import { StoryCaptions } from './StoryCaptions'
import { StoryHero } from './StoryHero'
import { StoryReplay } from './StoryReplay'
import { SCENE_NARRATION } from './storyCopy'
import { useInView } from './useInView'
import { useScenePlayback } from './useScenePlayback'

type SceneProps = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

const SCENE_LOADERS: Record<string, () => Promise<ComponentType<SceneProps>>> = {
  subscription: () => import('./scenes/SceneSubscription').then((m) => m.SceneSubscription),
  'mom-bills': () => import('./scenes/SceneMomBills').then((m) => m.SceneMomBills),
  ending: () => import('./scenes/SceneEnding').then((m) => m.SceneEnding),
}

function DeferredScene({
  beatId,
  progress,
  reduceMotion,
}: {
  beatId: string
  progress: SceneProps['progress']
  reduceMotion: boolean
}) {
  const hostRef = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(() => typeof IntersectionObserver === 'undefined')
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '160% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!near) return
    const load = SCENE_LOADERS[beatId]
    if (!load) return
    let cancelled = false
    void load().then((Comp) => {
      if (!cancelled) setScene(() => Comp)
    })
    return () => {
      cancelled = true
    }
  }, [near, beatId])

  return (
    <div ref={hostRef} className="home-story__stage home-story__stage--scene">
      {Scene ? (
        <Scene progress={progress} reduceMotion={reduceMotion} />
      ) : (
        <div className="home-story__stage-fallback" aria-hidden="true" />
      )}
    </div>
  )
}

type Props = {
  beat: StoryBeat
  onComplete: (id: string) => void
}

export function StoryScenePanel({ beat, onComplete }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const inView = useInView(ref, 0.35)
  const isOpening = beat.id === 'opening'
  const isEnding = beat.id === 'ending'
  const isPersonal = beat.id === 'subscription' || beat.id === 'mom-bills'
  const copy = SCENE_NARRATION[beat.id]
  const { progress, replay } = useScenePlayback({
    inView,
    reduceMotion,
    durationMs: copy?.durationMs ?? 8000,
    onComplete: () => onComplete(beat.id),
  })
  const [ctaOn, setCtaOn] = useState(reduceMotion)
  useMotionValueEvent(progress, 'change', (v) => {
    if (isEnding) setCtaOn(v >= 0.8)
  })

  const live = inView && !reduceMotion

  return (
    <section
      ref={ref}
      id={beat.id}
      className={`home-story__panel home-story__panel--${beat.phase}${
        isOpening ? ' home-story__panel--opening' : ''
      }${isEnding ? ' home-story__panel--ending' : ''}${isPersonal ? ' home-story__panel--scene' : ''}${
        live ? ' is-live' : ''
      }`}
      data-scene={beat.id}
    >
      <div className="home-story__pin">
        <div className="home-story__copy">
          {isOpening ? <StoryHero /> : null}
          {copy ? <StoryCaptions progress={progress} lines={copy.lines} reduceMotion={reduceMotion} /> : null}
          {isEnding ? <EndingCta visible={ctaOn} /> : null}
        </div>

        <div className="home-story__stage-wrap">
          {isOpening ? (
            <div className="home-story__stage home-story__stage--scene">
              <SceneOpening progress={progress} reduceMotion={reduceMotion} />
            </div>
          ) : (
            <DeferredScene beatId={beat.id} progress={progress} reduceMotion={reduceMotion} />
          )}
          <StoryReplay onReplay={replay} hidden={reduceMotion} />
        </div>
      </div>
    </section>
  )
}
