import { useCallback, useEffect, useRef, useState } from 'react'
import { postVoiceLeadEnded } from '../../lib/voicePostCall'
import type { VoiceUiState } from './VoiceAgentShell'

export type TranscriptLine = {
  id: string
  role: 'user' | 'agent'
  text: string
}

const MOCK_SCRIPT: { role: 'user' | 'agent'; text: string; delayMs: number }[] = [
  { role: 'agent', text: 'Hi — I am Vishnu’s GTM assistant. What are you selling, and who is the buyer?', delayMs: 800 },
  { role: 'user', text: 'Voice AI into Indian banks. Founder-led sales.', delayMs: 2200 },
  {
    role: 'agent',
    text: 'Got it. Are you stuck on pipeline, pricing, or getting through InfoSec and procurement?',
    delayMs: 2000,
  },
]

export function useMockVoiceSession() {
  const [uiState, setUiState] = useState<VoiceUiState>('idle')
  const [muted, setMuted] = useState(false)
  const [lines, setLines] = useState<TranscriptLine[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const timersRef = useRef<number[]>([])

  const clearTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id))
    timersRef.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const schedule = (fn: () => void, ms: number) => {
    const id = window.setTimeout(fn, ms)
    timersRef.current.push(id)
  }

  const beginMicPrompt = () => {
    setErrorMessage(null)
    setUiState('mic_prompt')
  }

  const cancelMicPrompt = () => setUiState('idle')

  const confirmAndStart = () => {
    clearTimers()
    setLines([])
    setUiState('connecting')

    schedule(() => setUiState('listening'), 1500)

    let accumulated = 1500
    MOCK_SCRIPT.forEach((line, index) => {
      accumulated += line.delayMs
      schedule(() => {
        if (line.role === 'agent') setUiState('speaking')
        else setUiState('listening')
        setLines((prev) => [...prev, { id: `mock-${index}`, role: line.role, text: line.text }])
      }, accumulated)
    })

    schedule(() => {
      setUiState('ended')
      const summary = MOCK_SCRIPT.map((l) => `${l.role}: ${l.text}`).join(' ')
      postVoiceLeadEnded({
        summary,
        buyer: 'Founder-led sales',
        current_motion: 'Voice AI into Indian banks',
        booked: false,
      })
    }, accumulated + 1200)
  }

  const endSession = () => {
    clearTimers()
    setUiState('ended')
  }

  const toggleMute = () => setMuted((m) => !m)

  const resetToIdle = () => {
    clearTimers()
    setUiState('idle')
    setLines([])
    setErrorMessage(null)
  }

  return {
    uiState,
    muted,
    lines,
    errorMessage,
    beginMicPrompt,
    cancelMicPrompt,
    confirmAndStart,
    endSession,
    toggleMute,
    resetToIdle,
    setErrorMessage,
  }
}
