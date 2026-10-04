import type { VercelRequest, VercelResponse } from '@vercel/node'
import { normalizeVoiceLeadPayload, sendVoiceLeadToN8n } from '../server/voiceLeadPayload'

/**
 * Client-side post-call hook (mock demo, or supplemental fields).
 * ElevenLabs production leads should use /api/elevenlabs-post-call when the workspace webhook is configured.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const payload = normalizeVoiceLeadPayload(body as Record<string, unknown>)
  await sendVoiceLeadToN8n(payload)

  return res.status(204).end()
}
