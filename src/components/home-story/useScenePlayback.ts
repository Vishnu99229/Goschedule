import { animate, useMotionValue } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

type Options = {
  inView: boolean
  reduceMotion: boolean
  durationMs: number
  onComplete?: () => void
}

/** Auto-plays a 0→1 timeline while the scene is on screen, then holds the end frame. */
export function useScenePlayback({ inView, reduceMotion, durationMs, onComplete }: Options) {
  const progress = useMotionValue(reduceMotion ? 1 : 0)
  const [token, setToken] = useState(0)
  const finishedRef = useRef(reduceMotion)
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
    progress.set(0)
    setToken((n) => n + 1)
  }, [progress, reduceMotion])

  useEffect(() => {
    if (reduceMotion) {
      progress.set(1)
      finishedRef.current = true
      onCompleteRef.current?.()
      return
    }
    if (!inView) return
    if (finishedRef.current && progress.get() >= 0.999) return

    const from = progress.get()
    const remaining = Math.max(0.05, (1 - from) * (durationMs / 1000))
    const controls = animate(progress, 1, {
      duration: remaining,
      ease: 'linear',
      onComplete: () => {
        finishedRef.current = true
        onCompleteRef.current?.()
      },
    })
    return () => controls.stop()
  }, [inView, reduceMotion, durationMs, token, progress])

  return { progress, replay }
}
