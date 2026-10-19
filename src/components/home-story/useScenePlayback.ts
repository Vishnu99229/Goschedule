import { animate, useMotionValue } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

type Options = {
  inView: boolean
  reduceMotion: boolean
  durationMs: number
  completeAt?: number
  onComplete?: () => void
}

/** Auto-plays a 0→1 timeline while the scene is on screen, then holds the end frame. */
export function useScenePlayback({
  inView,
  reduceMotion,
  durationMs,
  completeAt = 1,
  onComplete,
}: Options) {
  const progress = useMotionValue(reduceMotion ? 1 : 0)
  const [token, setToken] = useState(0)
  const finishedRef = useRef(reduceMotion)
  const firedRef = useRef(reduceMotion)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const replay = useCallback(() => {
    if (reduceMotion) {
      progress.set(1)
      return
    }
    finishedRef.current = false
    firedRef.current = false
    progress.set(0)
    setToken((n) => n + 1)
  }, [progress, reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1)
      finishedRef.current = true
      if (!firedRef.current) {
        firedRef.current = true
        onCompleteRef.current?.()
      }
      return
    }
    if (!inView) return
    if (finishedRef.current && progress.get() >= 0.999) return

    const mark = (v: number) => {
      if (!firedRef.current && v >= completeAt) {
        firedRef.current = true
        onCompleteRef.current?.()
      }
    }
    mark(progress.get())

    const from = progress.get()
    const remaining = Math.max(0.05, (1 - from) * (durationMs / 1000))
    const controls = animate(progress, 1, {
      duration: remaining,
      ease: 'linear',
      onUpdate: mark,
      onComplete: () => {
        finishedRef.current = true
        mark(1)
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, durationMs, completeAt, token, progress])

  return { progress, replay }
}
