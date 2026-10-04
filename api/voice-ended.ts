import type { VercelRequest, VercelResponse } from '@vercel/node'
import { notifyVoiceEnded } from '../server/voiceSession'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  await notifyVoiceEnded({
    ...body,
    receivedAt: new Date().toISOString(),
  })

  return res.status(204).end()
}
