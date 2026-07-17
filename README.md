# GoSchedule

GoSchedule is a scheduling AI platform.

## Features
- Agent scheduling and system animations
- Hero Dashboard for overview
- Pricing and feature sections
- Live "Talk to AI Agent" voice demo (Vapi Web SDK)

## Setup
```bash
npm install
cp .env.example .env.local
# Fill in the three VITE_ values in .env.local
npm run dev
```

## Env vars

These are required for the live voice demo in the hero. All three must also be set in **Vercel → Project → Settings → Environment Variables** for production.

| Variable | Purpose |
|----------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL (e.g. `https://lagzlyizyhagwtnychkt.supabase.co`) |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon/public key — used to call `create-demo-config` |
| `VITE_VAPI_PUBLIC_KEY` | Vapi Web SDK public key — starts the browser voice call |

Copy `.env.example` to `.env.local` for local development. Never commit real keys.

## Tech Stack
- React
- Vite
- TypeScript
- Framer Motion
- Vapi Web SDK (`@vapi-ai/web`)
- Supabase Edge Functions

## License
MIT
