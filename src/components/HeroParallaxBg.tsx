import { useCallback, useEffect, useRef } from 'react'

/**
 * Parallax gradient orb + fine noise overlay. Mouse-driven with lerped follow (~60fps via rAF).
 */
export default function HeroParallaxBg() {
    const wrapRef = useRef<HTMLDivElement>(null)
    const orbRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef({ x: 0.5, y: 0.5 })
    const currentRef = useRef({ x: 0.5, y: 0.5 })
    const rafRef = useRef<number>(0)

    const onMove = useCallback((e: MouseEvent) => {
        const el = wrapRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / Math.max(r.width, 1)
        const y = (e.clientY - r.top) / Math.max(r.height, 1)
        targetRef.current = {
            x: Math.min(1, Math.max(0, x)),
            y: Math.min(1, Math.max(0, y)),
        }
    }, [])

    useEffect(() => {
        window.addEventListener('mousemove', onMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMove)
    }, [onMove])

    useEffect(() => {
        const tick = () => {
            const orb = orbRef.current
            const t = targetRef.current
            const c = currentRef.current
            const k = 0.08
            c.x += (t.x - c.x) * k
            c.y += (t.y - c.y) * k
            if (orb) {
                const px = c.x * 100
                const py = c.y * 100
                orb.style.transform = `translate(calc(-50% + ${(c.x - 0.5) * 36}px), calc(-50% + ${(c.y - 0.5) * 36}px))`
                orb.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(139, 92, 246, 0.55) 0%, rgba(67, 56, 202, 0.25) 35%, transparent 62%)`
            }
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    return (
        <div
            ref={wrapRef}
            aria-hidden
            style={{
                position: 'absolute',
                inset: '-12% -8% -20% -8%',
                pointerEvents: 'none',
                zIndex: 0,
                overflow: 'hidden',
            }}
        >
            <div
                ref={orbRef}
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '42%',
                    width: 'min(140%, 920px)',
                    height: 'min(120%, 720px)',
                    transform: 'translate(-50%, -50%)',
                    filter: 'blur(56px)',
                    borderRadius: '50%',
                    opacity: 0.95,
                    background:
                        'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.5) 0%, rgba(67, 56, 202, 0.2) 40%, transparent 65%)',
                    willChange: 'transform, background',
                }}
            />
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.03,
                    pointerEvents: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '220px 220px',
                    mixBlendMode: 'overlay',
                }}
            />
        </div>
    )
}
