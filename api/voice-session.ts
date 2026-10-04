import type { VercelRequest, VercelResponse } from '@vercel/node'
import {
  checkVoiceCooldown,
  fetchElevenLabsSignedUrl,
  voiceCooldownSetCookieHeader,
} from '../server/voiceSession'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const cooldownError = checkVoiceCooldown(req.headers.cookie)
  if (cooldownError) {
    res.setHeader('Retry-After', String(Math.max(1, cooldownError.status)))
    return res.status(cooldownError.status).json({
      code: cooldownError.code,
      message: cooldownError.message,
    })
  }

  const result = await fetchElevenLabsSignedUrl()
  if ('status' in result && 'code' in result) {
    return res.status(result.status).json({ code: result.code, message: result.message })
  }

  res.setHeader('Set-Cookie', voiceCooldownSetCookieHeader())
  return res.status(200).json(result)
}
