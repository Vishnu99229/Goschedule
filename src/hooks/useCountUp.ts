import { useEffect, useState } from 'react'

export function useCountUp(target: number, enabled: boolean, durationMs = 1600) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!enabled) return
        let raf = 0
        const start = performance.now()
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs)
            const eased = 1 - (1 - t) ** 2.2
            setValue(Math.round(eased * target))
            if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [enabled, target, durationMs])

    return value
}
