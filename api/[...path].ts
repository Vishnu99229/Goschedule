import type { VercelRequest, VercelResponse } from '@vercel/node'

/** Former voice/ElevenLabs endpoints are gone. All /api/* paths 404. */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.status(404).send('Not Found')
}
