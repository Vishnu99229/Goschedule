import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * Returns false during the server (build) render AND the initial client
 * hydration render, then true once mounted in the browser.
 *
 * Uses useSyncExternalStore with a server snapshot of `false`, which is the
 * React-sanctioned way to gate client-only content without a hydration
 * mismatch: the hydration render uses the server snapshot (false), then React
 * immediately re-renders with the client snapshot (true). No setState-in-effect.
 */
export default function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )
}
