import { useEffect, useState } from 'react'

/**
 * Counts from 0 toward `target` when `enabled` is true.
 * @param decimals - pass 1 for values like 8.2%
 */
export function useCountUp(target: number, enabled: boolean, durationMs = 1500, decimals = 0) {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (!enabled) return
        let raf = 0
        const start = performance.now()
        const tick = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs)
            const eased = 1 - (1 - t) ** 2.2
            const raw = eased * target
            const next = decimals > 0 ? Number(raw.toFixed(decimals)) : Math.round(raw)
            setValue(next)
            if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [enabled, target, durationMs, decimals])

    return value
}
