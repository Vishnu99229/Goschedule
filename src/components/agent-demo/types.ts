/**
 * Types for the live Talk-to-Agent demo.
 * Config shape mirrors what create-demo-config returns inside { config }.
 */

export type DemoCallState = 'idle' | 'connecting' | 'live' | 'ended' | 'error'

/** Classified error codes for UI messaging. */
export type DemoErrorCode =
  | 'mic_denied'
  | 'rate_limited'
  | 'invalid_prompt'
  | 'too_short'
  | 'too_long'
  | 'edge_fn_error'
  | 'vapi_start_failed'
  | 'unknown'

export interface AssistantConfig {
  model: {
    provider: string
    model: string
    temperature?: number
    messages: Array<{ role: string; content: string }>
  }
  voice: {
    provider: string
    voiceId: string
    model?: string
  }
  transcriber: {
    provider: string
    model: string
    language: string
  }
  firstMessage: string
  firstMessageMode: string
  maxDurationSeconds: number
  silenceTimeoutSeconds: number
  recordingEnabled: boolean
  endCallMessage: string
  endCallPhrases: string[]
  backgroundSound: string
}

export interface CreateDemoConfigResponse {
  config: AssistantConfig
}

export interface CreateDemoConfigError {
  error: string
  retry_after_minutes?: number
}

export class DemoConfigError extends Error {
  readonly code: string
  readonly retryAfterMinutes?: number

  constructor(code: string, message: string, retryAfterMinutes?: number) {
    super(message)
    this.name = 'DemoConfigError'
    this.code = code
    this.retryAfterMinutes = retryAfterMinutes
  }
}

export function messageForErrorCode(
  code: DemoErrorCode,
  retryAfterMinutes?: number,
): string {
  switch (code) {
    case 'mic_denied':
      return 'We need microphone access to run the demo.'
    case 'rate_limited':
      return `You've hit the demo limit. Try again in ${retryAfterMinutes ?? 60} minutes.`
    case 'invalid_prompt':
      return 'Please describe a real use case for your agent.'
    case 'too_short':
      return 'Please describe your agent in at least 10 characters.'
    case 'too_long':
      return 'Please keep your description under 2000 characters.'
    case 'edge_fn_error':
      return 'Something went wrong — try again.'
    case 'vapi_start_failed':
      return 'Could not start the voice call. Please try again.'
    case 'unknown':
    default:
      return 'Something went wrong — try again.'
  }
}
