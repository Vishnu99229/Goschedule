import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  checkVoiceCooldown,
  fetchElevenLabsSignedUrl,
  voiceCooldownSetCookieHeader,
} from './server/voiceSession'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'voice-api-dev',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.startsWith('/api/voice-session')) {
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
