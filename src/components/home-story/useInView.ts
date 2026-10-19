import { useEffect, useState, type RefObject } from 'react'

export function useInView(ref: RefObject<Element | null>, amount = 0.4) {
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
      },
      { threshold: amount },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, amount])

  return inView
}
