import { webcrypto } from 'node:crypto'
import type { VoiceLeadPayload } from './voiceLeadPayload'
import { emptyVoiceLeadPayload, normalizeVoiceLeadPayload } from './voiceLeadPayload'

const crypto = globalThis.crypto ?? webcrypto

const DATA_COLLECTION_KEYS = [
  'name',
  'email',
  'company',
  'stage',
  'deal_size',
  'buyer',
  'current_motion',
  'timeline',
  'booked',
] as const

async function hmacSha256V0(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder()
  const keyData = enc.encode(secret)
  const msgData = enc.encode(message)
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, msgData)
  const hex = Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
  return `v0=${hex}`
}

export class ElevenLabsWebhookError extends Error {
  statusCode: number

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
  }
}

/**
 * Verify ElevenLabs-Signature (t=...,v0=...) per official SDK / post-call webhook docs.
 * @see https://elevenlabs.io/docs/eleven-agents/workflows/post-call-webhooks
 */
export async function verifyElevenLabsWebhook(
  rawBody: string,
  sigHeader: string | undefined,
  secret: string | undefined
): Promise<Record<string, unknown>> {
  if (!sigHeader) {
    throw new ElevenLabsWebhookError('Missing signature header', 401)
  }
  if (!secret) {
    throw new ElevenLabsWebhookError('Webhook secret not configured', 503)
  }

  const headers = sigHeader.split(',')
  const timestamp = headers.find((e) => e.startsWith('t='))?.substring(2)
  const signature = headers.find((e) => e.startsWith('v0='))

  if (!timestamp || !signature) {
    throw new ElevenLabsWebhookError('No signature hash found with expected scheme v0', 401)
  }

  const reqTimestamp = Number(timestamp) * 1000
  const tolerance = Date.now() - 30 * 60 * 1000
  if (!Number.isFinite(reqTimestamp) || reqTimestamp < tolerance) {
    throw new ElevenLabsWebhookError('Timestamp outside the tolerance zone', 401)
  }

  const message = `${timestamp}.${rawBody}`
  const digest = await hmacSha256V0(secret, message)
  if (signature !== digest) {
    throw new ElevenLabsWebhookError('Signature hash does not match', 401)
  }

  return JSON.parse(rawBody) as Record<string, unknown>
}

function extractDataCollectionValue(entry: unknown): unknown {
  if (entry == null) return undefined
  if (typeof entry !== 'object') return entry
  if ('value' in entry && (entry as { value: unknown }).value !== undefined) {
    return (entry as { value: unknown }).value
  }
  if ('data_collection_value' in entry) {
    return (entry as { data_collection_value: unknown }).data_collection_value
  }
  return entry
}

function transcriptUsedOpenBooking(transcript: unknown): boolean {
  if (!Array.isArray(transcript)) return false
  for (const turn of transcript) {
    if (!turn || typeof turn !== 'object') continue
    const t = turn as Record<string, unknown>
    const toolCalls = t.tool_calls
    const toolResults = t.tool_results
    const blobs = [toolCalls, toolResults]
    for (const blob of blobs) {
      if (!Array.isArray(blob)) continue
      for (const item of blob) {
        if (!item || typeof item !== 'object') continue
        const name =
          (item as { tool_name?: string }).tool_name ??
          (item as { name?: string }).name ??
          (item as { client_tool_name?: string }).client_tool_name
        if (name === 'open_booking') return true
      }
    }
  }
  return false
}

/** Map post_call_transcription event data to the n8n lead payload. */
export function mapPostCallTranscriptionToLead(data: Record<string, unknown>): VoiceLeadPayload {
  const analysis =
    data.analysis && typeof data.analysis === 'object'
      ? (data.analysis as Record<string, unknown>)
      : {}
  const results =
    analysis.data_collection_results && typeof analysis.data_collection_results === 'object'
      ? (analysis.data_collection_results as Record<string, unknown>)
      : {}

  const partial: Record<string, unknown> = {}
  for (const key of DATA_COLLECTION_KEYS) {
    if (key in results) {
      partial[key] = extractDataCollectionValue(results[key])
    }
  }

  const summary =
    typeof analysis.transcript_summary === 'string' ? analysis.transcript_summary : ''
  partial.summary = summary

  if (partial.booked === undefined || partial.booked === '') {
    partial.booked = transcriptUsedOpenBooking(data.transcript)
  }

  const normalized = normalizeVoiceLeadPayload(partial)
  if (!normalized.summary && typeof analysis.call_summary === 'string') {
    normalized.summary = analysis.call_summary
  }
  return normalized
}

export function mapElevenLabsPostCallEvent(event: Record<string, unknown>): VoiceLeadPayload | null {
  const type = event.type
  if (type !== 'post_call_transcription') return null
  const data = event.data
  if (!data || typeof data !== 'object') return emptyVoiceLeadPayload()
  return mapPostCallTranscriptionToLead(data as Record<string, unknown>)
}
