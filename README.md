# GoSchedule (goschedule.ai)

Personal consulting site for Vishnu Rajan — fractional GTM for AI companies selling into Indian enterprise.

## Features

- Homepage with live ElevenLabs Conversational AI voice demo
- Work, about, engagements, blog, and product pages
- Static prerender for SEO

## Setup

```bash
npm install
cp .env.example .env.local
# Add ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID for the voice demo
npm run dev
```

For production-like API routes locally, `npm run dev` proxies `/api/voice-session` via Vite middleware. On Vercel, use the `api/` serverless functions.

## Env vars (server — Vercel → Environment Variables)

| Variable | Purpose |
|----------|---------|
| `ELEVENLABS_API_KEY` | ElevenLabs API key (never expose to the client) |
| `ELEVENLABS_AGENT_ID` | Conversational AI agent ID (private mode + signed URL) |
| `VOICE_COOLDOWN_SECONDS` | Optional cooldown between sessions (default 120) |
| `N8N_WEBHOOK_URL` | Optional post-call lead payload to n8n (server only) |
| `ELEVENLABS_WEBHOOK_SECRET` | HMAC secret for `/api/elevenlabs-post-call` (ElevenLabs post-call webhook) |

Optional client: `VITE_VOICE_PROVIDER=elevenlabs`

## Tech stack

- React, Vite, TypeScript
- ElevenLabs `@elevenlabs/client` for the voice widget
- Vercel serverless for signed session tokens

## License

MIT
