import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  ElevenLabsWebhookError,
  mapElevenLabsPostCallEvent,
  verifyElevenLabsWebhook,
} from './server/elevenlabsWebhook'
import { readRawBody } from './server/readRawBody'
import {
  checkVoiceCooldown,
  fetchElevenLabsSignedUrl,
  voiceCooldownSetCookieHeader,
} from './server/voiceSession'
import { normalizeVoiceLeadPayload, sendVoiceLeadToN8n } from './server/voiceLeadPayload'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'voice-api-dev',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          const path = req.url?.split('?')[0] ?? ''

          if (path === '/api/voice-ended' && req.method === 'POST') {
            try {
              const raw = await readRawBody(req)
              const body = raw ? (JSON.parse(raw) as Record<string, unknown>) : {}
              await sendVoiceLeadToN8n(normalizeVoiceLeadPayload(body))
              res.statusCode = 204
              res.end()
            } catch {
              res.statusCode = 400
              res.end('Invalid JSON')
            }
            return
          }

          if (path === '/api/elevenlabs-post-call' && req.method === 'POST') {
            try {
              const raw = await readRawBody(req)
              const sig =
                req.headers['elevenlabs-signature'] ?? req.headers['ElevenLabs-Signature']
              const sigHeader = Array.isArray(sig) ? sig[0] : sig
              const event = await verifyElevenLabsWebhook(
                raw,
                sigHeader,
                process.env.ELEVENLABS_WEBHOOK_SECRET
              )
              const lead = mapElevenLabsPostCallEvent(event)
              if (lead) await sendVoiceLeadToN8n(lead)
              res.statusCode = 200
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ received: true }))
            } catch (err) {
              const status =
                err instanceof ElevenLabsWebhookError ? err.statusCode : 500
              const message =
                err instanceof ElevenLabsWebhookError ? err.message : 'Webhook processing failed'
              res.statusCode = status
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ error: message }))
            }
            return
          }

          if (!path.startsWith('/api/voice-session')) {
            next()
            return
          }

          if (req.method !== 'GET' && req.method !== 'POST') {
            res.statusCode = 405
            res.end('Method not allowed')
            return
          }

          const cooldownError = checkVoiceCooldown(req.headers.cookie)
          if (cooldownError) {
            res.statusCode = cooldownError.status
            res.setHeader('Content-Type', 'application/json')
            res.end(
              JSON.stringify({ code: cooldownError.code, message: cooldownError.message })
            )
            return
          }

          const result = await fetchElevenLabsSignedUrl()
          if ('code' in result && 'status' in result) {
            res.statusCode = result.status
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ code: result.code, message: result.message }))
            return
          }

          res.statusCode = 200
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Set-Cookie', voiceCooldownSetCookieHeader())
          res.end(JSON.stringify(result))
        })
      },
    },
  ],
})
