import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

type RevealProps = {
    children: ReactNode
    className?: string
    style?: CSSProperties
    delayMs?: number
    /** Observe container; stagger direct children (100ms). No opacity on container. */
    stagger?: boolean
}

/**
 * Intersection Observer scroll reveal; respects prefers-reduced-motion via CSS.
 */
export default function Reveal({ children, className = '', style, delayMs = 0, stagger }: RevealProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        setVisible(true)
                    }
                })
            },
            { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    if (stagger) {
        return (
            <div
                ref={ref}
                className={`reveal-stagger ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
                style={style}
            >
                {children}
            </div>
        )
    }

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? 'reveal--visible' : ''} ${className}`.trim()}
            style={{
                ...style,
                transitionDelay: visible ? `${delayMs}ms` : undefined,
            }}
        >
            {children}
        </div>
    )
}
