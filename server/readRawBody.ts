import type { IncomingMessage } from 'node:http'
import type { VercelRequest } from '@vercel/node'

/** Read unparsed request body (required for ElevenLabs HMAC verification). */
export async function readRawBody(req: VercelRequest | IncomingMessage): Promise<string> {
  const existing = (req as VercelRequest).body
  if (typeof existing === 'string') return existing
  if (Buffer.isBuffer(existing)) return existing.toString('utf8')

  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks).toString('utf8')
}
