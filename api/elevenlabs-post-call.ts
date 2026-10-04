import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  ElevenLabsWebhookError,
  mapElevenLabsPostCallEvent,
  verifyElevenLabsWebhook,
} from '../server/elevenlabsWebhook'
import { readRawBody } from '../server/readRawBody'
import { sendVoiceLeadToN8n } from '../server/voiceLeadPayload'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const rawBody = await readRawBody(req)
  const signature =
    req.headers['elevenlabs-signature'] ??
    req.headers['ElevenLabs-Signature'] ??
    undefined
  const sigHeader = Array.isArray(signature) ? signature[0] : signature

  const secret = process.env.ELEVENLABS_WEBHOOK_SECRET

  try {
    const event = await verifyElevenLabsWebhook(rawBody, sigHeader, secret)
    const lead = mapElevenLabsPostCallEvent(event)
    if (lead) {
      await sendVoiceLeadToN8n(lead)
    }
    return res.status(200).json({ received: true })
  } catch (err) {
    if (err instanceof ElevenLabsWebhookError) {
      return res.status(err.statusCode).json({ error: err.message })
    }
    console.error('elevenlabs-post-call', err)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}
