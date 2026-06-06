import { type ReactNode } from 'react'
import useHydrated from '../hooks/useHydrated'

/**
 * Renders `children` only in the browser, after hydration.
 *
 * During the build-time (Node) render and the initial client hydration render
 * it returns `fallback`, so the server HTML and the first client paint match
 * exactly — no hydration mismatch. After mount, the real `children` take over.
 *
 * Used to keep browser-only islands (e.g. AgentDemo, which touches
 * window.speechSynthesis) out of the static prerender while still mounting and
 * working identically once JS runs.
 */
export default function ClientOnly({
  children,
  fallback = null,
}: {
  children: ReactNode
  fallback?: ReactNode
}) {
  return <>{useHydrated() ? children : fallback}</>
}
