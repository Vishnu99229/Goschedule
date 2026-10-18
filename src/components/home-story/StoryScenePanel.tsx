import { useEffect, useRef, useState, type ComponentType } from 'react'
import { useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { StoryBeat } from './homeStoryScenes'
import { SceneOpening } from './scenes/SceneOpening'

type SceneProps = {
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  reduceMotion: boolean
}

const SCENE_LOADERS: Record<string, () => Promise<ComponentType<SceneProps>>> = {
  subscription: () => import('./scenes/SceneSubscription').then((m) => m.SceneSubscription),
  'mom-bills': () => import('./scenes/SceneMomBills').then((m) => m.SceneMomBills),
  ending: () => import('./scenes/SceneEnding').then((m) => m.SceneEnding),
}

const PERSONAL_SCENES = new Set(['subscription', 'mom-bills'])

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
  const [near, setNear] = useState(false)
  const [Scene, setScene] = useState<ComponentType<SceneProps> | null>(null)

  useEffect(() => {
    const el = hostRef.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
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
  index: number
}

export function StoryScenePanel({ beat, index }: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion() ?? false
  const isPersonal = PERSONAL_SCENES.has(beat.id)
  const isOpening = beat.id === 'opening'
  const isEnding = beat.id === 'ending'
  const isStory = isPersonal

  const { scrollY } = useScroll()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: isStory ? ['start start', 'end end'] : ['start end', 'end start'],
  })

  // Opening is exactly 100svh (no pin slack). Ending is a short pin. Map both
  // from window scrollY so the beats don't stall at 0.
  const mappedProgress = useTransform(scrollY, (y) => {
    const el = ref.current
    if (!el) return 0
    const start = el.offsetTop
    const h = el.offsetHeight || 1
    if (isOpening) {
      return Math.min(1, Math.max(0, (y - start) / h))
    }
    const dist = Math.max(1, h - (typeof window === 'undefined' ? h : window.innerHeight))
    return Math.min(1, Math.max(0, (y - start) / dist))
  })

  return (
    <section
      ref={ref}
      className={`home-story__panel home-story__panel--${beat.phase}${
        isOpening ? ' home-story__panel--opening' : ''
      }${isEnding ? ' home-story__panel--ending' : ''}${isPersonal ? ' home-story__panel--tall' : ''}`}
      data-scene={beat.id}
      aria-labelledby={`story-beat-${index}`}
    >
      <div className="home-story__pin">
        <p className="sr-only" id={`story-beat-${index}`}>
          {beat.description}
        </p>

        {isOpening ? (
          <div className="home-story__stage home-story__stage--scene">
            <SceneOpening progress={mappedProgress} reduceMotion={reduceMotion} />
          </div>
        ) : (
          <DeferredScene
            beatId={beat.id}
            progress={isEnding ? mappedProgress : scrollYProgress}
            reduceMotion={reduceMotion}
          />
        )}
      </div>
    </section>
  )
}
