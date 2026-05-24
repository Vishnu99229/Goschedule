import type { CSSProperties } from 'react'

interface LogoProps {
  variant?: 'full' | 'mark-only'
  size?: number
  className?: string
  style?: CSSProperties
}

/**
 * Goschedule.ai logo — Loop-Cut G.
 *
 * A stroked geometric near-circle with a horizontal G terminal extending
 * inward from the right. A short interior status bar sits in the right-
 * center counter — the "loop cut" detail that suggests agents running in
 * continuous loops / status: active, without being literal.
 *
 * Construction:
 *   - 28x28 viewBox, centered on (14, 14)
 *   - Outer ring: stroked arc, radius 9, 2.5px stroke, rounded caps
 *   - Opening on the right between angles ~-36° and ~+36° (y=10 → y=18)
 *   - G terminal: horizontal stroke from (22, 18) inward to (14, 18)
 *   - Loop-cut bar: 7×2 rounded rect at (13, 13) — interior status indicator
 *   - Uses currentColor so it themes automatically (white on dark, dark on light)
 */
export default function Logo({ variant = 'full', size = 28, className = '', style }: LogoProps) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        textDecoration: 'none',
        color: 'inherit',
        ...style,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Goschedule.ai"
        role="img"
        style={{ flexShrink: 0, display: 'block' }}
      >
        <path
          d="M 22 10 A 9 9 0 1 0 22 18 L 14 18"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <rect x="13" y="13" width="7" height="2" rx="1" fill="currentColor" />
      </svg>
      {variant === 'full' && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-primary)',
            fontWeight: 600,
            fontSize: '17px',
            letterSpacing: '-0.015em',
            lineHeight: 1,
          }}
        >
          Goschedule<span style={{ color: 'var(--accent)' }}>.ai</span>
        </span>
      )}
    </span>
  )
}
