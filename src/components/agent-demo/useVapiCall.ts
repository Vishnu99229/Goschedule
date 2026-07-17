import { useCallback, useEffect, useRef, useState } from 'react'
import Vapi from '@vapi-ai/web'
import type { AssistantConfig, DemoCallState, DemoErrorCode } from './types'
import { DemoConfigError, messageForErrorCode } from './types'
import { fetchAgentConfig } from './fetchAgentConfig'

const CALL_DURATION_SECONDS = 120

const DEMO_CONFIG_CODES = new Set([
  'rate_limited',
  'invalid_prompt',
  'too_short',
  'too_long',
  'edge_fn_error',
])

function isMicDeniedError(err: unknown): boolean {
  if (!err || typeof err !== 'object') return false
  const e = err as { name?: string; message?: string }
  if (
    e.name === 'NotAllowedError' ||
    e.name === 'PermissionDeniedError' ||
    e.name === 'SecurityError'
  ) {
    return true
  }
  const msg = (e.message ?? '').toLowerCase()
  return msg.includes('permission') || msg.includes('not allowed') || msg.includes('microphone')
}

function classifyDemoConfigCode(code: string): DemoErrorCode {
  if (DEMO_CONFIG_CODES.has(code)) return code as DemoErrorCode
  return 'edge_fn_error'
}

export interface UseVapiCallResult {
  state: DemoCallState
  volume: number
  muted: boolean
  remainingSeconds: number
  errorCode: DemoErrorCode | null
  errorMessage: string | null
  retryAfterMinutes: number | undefined
  startCall: (prompt: string) => Promise<void>
  endCall: () => void
  toggleMute: () => void
  cancelStartup: () => void
  reset: () => void
}

/**
 * Owns the Vapi SDK instance, call state machine, volume, mute, and countdown.
 */
export function useVapiCall(): UseVapiCallResult {
  const [state, setState] = useState<DemoCallState>('idle')
  const [volume, setVolume] = useState(0)
  const [muted, setMuted] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(CALL_DURATION_SECONDS)
  const [errorCode, setErrorCode] = useState<DemoErrorCode | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [retryAfterMinutes, setRetryAfterMinutes] = useState<number | undefined>(undefined)

  const vapiRef = useRef<Vapi | null>(null)
  const liveStartedAtRef = useRef<number | null>(null)
  const listenersAttachedRef = useRef(false)
  const abortRef = useRef(false)

  const setClassifiedError = useCallback((code: DemoErrorCode, minutes?: number) => {
    setErrorCode(code)
    setRetryAfterMinutes(minutes)
    setErrorMessage(messageForErrorCode(code, minutes))
    setState('error')
  }, [])

  const ensureVapi = useCallback((): Vapi | null => {
    if (vapiRef.current) return vapiRef.current
    const publicKey = import.meta.env.VITE_VAPI_PUBLIC_KEY as string | undefined
    if (!publicKey) return null
    vapiRef.current = new Vapi(publicKey)
    return vapiRef.current
  }, [])

  const attachListeners = useCallback(
    (vapi: Vapi) => {
      if (listenersAttachedRef.current) return

      const onCallStart = () => {
        liveStartedAtRef.current = Date.now()
        setRemainingSeconds(CALL_DURATION_SECONDS)
        setState('live')
      }
      const onCallEnd = () => {
        liveStartedAtRef.current = null
        setVolume(0)
        setState((prev) => (prev === 'error' ? prev : 'ended'))
      }
      const onVolume = (v: number) => setVolume(v)
      const onError = (e: unknown) => {
        console.error(e)
        if (abortRef.current) return
        if (isMicDeniedError(e)) {
          setClassifiedError('mic_denied')
        } else {
          setClassifiedError('vapi_start_failed')
        }
      }

      vapi.on('call-start', onCallStart)
      vapi.on('call-end', onCallEnd)
      vapi.on('volume-level', onVolume)
      vapi.on('error', onError)
      listenersAttachedRef.current = true
    },
    [setClassifiedError],
  )

  useEffect(() => {
    abortRef.current = false
    const vapi = ensureVapi()
    if (vapi) attachListeners(vapi)

    return () => {
      abortRef.current = true
      const instance = vapiRef.current
      if (instance) {
        try {
          instance.removeAllListeners()
          instance.stop()
        } catch {
          // ignore
        }
      }
      listenersAttachedRef.current = false
    }
  }, [ensureVapi, attachListeners])

  // Countdown while live — display only; Vapi ends via maxDurationSeconds: 120
  useEffect(() => {
    if (state !== 'live') return

    const tick = () => {
      const started = liveStartedAtRef.current
      if (!started) return
      const elapsed = Math.floor((Date.now() - started) / 1000)
      const remaining = Math.max(0, CALL_DURATION_SECONDS - elapsed)
      setRemainingSeconds(remaining)
    }

    tick()
    const id = window.setInterval(tick, 250)
    return () => window.clearInterval(id)
  }, [state])

  const endCall = useCallback(() => {
    try {
      vapiRef.current?.stop()
    } catch {
      // ignore
    }
  }, [])

  const cancelStartup = useCallback(() => {
    abortRef.current = true
    setState((prev) => (prev === 'connecting' ? 'idle' : prev))
  }, [])

  const toggleMute = useCallback(() => {
    const vapi = vapiRef.current
    if (!vapi) return
    const next = !muted
    try {
      vapi.setMuted(next)
      setMuted(next)
    } catch {
      // ignore
    }
  }, [muted])

  const reset = useCallback(() => {
    abortRef.current = false
    setErrorCode(null)
    setErrorMessage(null)
    setRetryAfterMinutes(undefined)
    setVolume(0)
    setMuted(false)
    setRemainingSeconds(CALL_DURATION_SECONDS)
    liveStartedAtRef.current = null
    setState('idle')
  }, [])

  const startCall = useCallback(
    async (prompt: string) => {
      abortRef.current = false
      setErrorCode(null)
      setErrorMessage(null)
      setRetryAfterMinutes(undefined)
      setMuted(false)
      setVolume(0)

      const vapi = ensureVapi()
      if (!vapi) {
        setClassifiedError('unknown')
        return
      }
      attachListeners(vapi)
      setState('connecting')

      // Unlock mic in the click-handler chain for iOS Safari autoplay policy
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        stream.getTracks().forEach((t) => t.stop())
      } catch (err) {
        if (abortRef.current) return
        console.error(err)
        setClassifiedError(isMicDeniedError(err) ? 'mic_denied' : 'unknown')
        return
      }
      if (abortRef.current) return

      let config: AssistantConfig
      try {
        config = await fetchAgentConfig(prompt)
      } catch (err) {
        if (abortRef.current) return
        console.error(err)
        if (err instanceof DemoConfigError) {
          setClassifiedError(classifyDemoConfigCode(err.code), err.retryAfterMinutes)
        } else {
          setClassifiedError('edge_fn_error')
        }
        return
      }
      if (abortRef.current) return

      try {
        // Transient assistant — inline config only, never create via REST
        await vapi.start(config as never)
        if (abortRef.current) {
          try {
            vapi.stop()
          } catch {
            // ignore
          }
        }
      } catch (err) {
        if (abortRef.current) return
        console.error(err)
        if (isMicDeniedError(err)) {
          setClassifiedError('mic_denied')
        } else {
          setClassifiedError('vapi_start_failed')
        }
      }
    },
    [ensureVapi, attachListeners, setClassifiedError],
  )

  return {
    state,
    volume,
    muted,
    remainingSeconds,
    errorCode,
    errorMessage,
    retryAfterMinutes,
    startCall,
    endCall,
    toggleMute,
    cancelStartup,
    reset,
  }
}
