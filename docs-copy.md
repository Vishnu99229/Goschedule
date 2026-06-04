# DOCS CONTENT REFERENCE
# Claude Code: read this file and use the content below to create docs pages.
# Do not put this file on the website. It is a build reference only.

---
PAGE: technical-note
TITLE: Our Technical Note | GoSchedule.ai
META_DESCRIPTION: How GoSchedule.ai builds vertical AI agents that drive real business outcomes, not generic assistants.
NAV_LABEL: Technical Note
---

## The Problem We Are Solving

Every business loses revenue at the exact moment a customer reaches out. The call that goes unanswered after hours. The WhatsApp message that sits unread for three hours until the lead has gone cold. The walk-in who would have added a dessert if anyone had suggested it. The patient who never got the reminder and did not show up.

For the average local or mid-sized business, the point of customer contact is the single largest source of leaked revenue. The only fix available until now was to hire and train more people, and people are expensive, inconsistent, and impossible to scale on demand.

The roughly 60 million plus small and mid-sized businesses in India never got the bespoke automation that enterprises have, because it was too slow and too expensive. That gap is the opportunity. The technology to close it now exists, but the companies deploying it are using the wrong shape of product.

## Our Thesis

We believe the market is making three structural mistakes.

### 1. The Horizontal Agent Fallacy

A generic assistant has no stake in a specific business outcome. It can answer questions, but it does not know that the goal of this cafe is to lift average order value, or that the goal of this clinic is to fill the 4 PM slot that always goes empty. Generic agents optimize for plausible conversation. Businesses need agents that optimize for a number. Prompting alone does not bridge that gap.

### 2. The Self-Serve Trap

The businesses that need AI the most are the least equipped to build it. A cafe owner or a dental clinic does not want to configure a state machine. They want bookings, answered calls, and higher tickets. The build-it-yourself model quietly excludes the largest market. We invert this: the customer describes the outcome, and we build the agent.

### 3. AI As A Feature Versus AI As The Employee

A chatbot deflects. An employee performs. The difference is whether the system can book the appointment, place the upsell, send the follow-up, and log it in the CRM. We do not ship a chat window. We ship a worker that owns a job and is measured against it.

## Agents On The Fly

We do not sell a builder. We build the agent for the business, fast, after understanding exactly what outcome it needs to drive. The process is a repeatable pipeline:

1. Discovery: understand the business and the outcome it needs.
2. Blueprint: map the agent (channels, actions, persona, guardrails, integrations).
3. Assemble: compose from the vertical template library plus the core engine.
4. Deploy: go live on voice, WhatsApp, or QR in days, not months.
5. Optimize: tune against the real business metric using live interactions.

Every cafe we deploy teaches us how cafes convert. Every clinic teaches us how clinics fill slots. That knowledge is encoded back into templates, so build velocity and outcome quality both improve with scale.

## Platform Architecture

Every GoSchedule agent runs on one shared core. Verticals differ in configuration, not in foundation.

- Reasoning and orchestration: OpenAI GPT-4o, with model selection tuned per task.
- Voice: Vapi for the real-time voice pipeline, ElevenLabs for natural Indian English speech.
- Messaging: Twilio for WhatsApp and telephony connectivity.
- State, memory, and data: Supabase as the system of record.
- Actions: Google Calendar for scheduling, plus webhooks and CRM connectors.
- Infrastructure: Railway for hosting and deployment.

By keeping one hardened core and varying only the configuration layer, we get enterprise-grade reliability with startup-grade build speed.

## Why We Win

Our moat is not a model. It is methodology, vertical templates, India-specific voice tuning, outcome accountability, and compounding configuration data. That is exactly the kind of company that captures value when the underlying models become cheap and abundant. The scarce thing is knowing how to deploy AI to drive a specific business outcome, fast, in a specific market.

---
PAGE: morning-brief
TITLE: Morning Brief Documentation | GoSchedule.ai
META_DESCRIPTION: How Morning Brief works. A personalized AI news agent that calls you every morning with only the stories that matter.
NAV_LABEL: Morning Brief
---

## What is Morning Brief?

Morning Brief is a personalized AI agent that delivers a curated news briefing as a phone call every morning. It pulls from dozens of sources, scores every article against your personal profile, writes a voice-ready script in your preferred tone, and calls you to read it aloud.

No feed to scroll. No inbox to clear. Just the few things worth knowing before your day starts.

## How It Works

The system runs a four-stage pipeline daily.

### 1. Ingest
Every day, Morning Brief pulls articles from eight RSS feeds (Moneycontrol, Inc42, ET Tech, TechCrunch, The Verge AI, Hacker News, Reuters India, BusinessLine) plus five NewsAPI query categories. Articles are deduplicated and full text is scraped for accurate scoring.

### 2. Rank
Each article is scored against your personal profile using a two-stage system. First, a fast heuristic pass matches articles against your VIP entities, active work, financial interests, current city, hometown, hobbies, and personal interests, with weighted scoring and recency decay. Then GPT-4o re-scores the survivors with deeper judgment. Articles that match your explicit filters are dropped.

### 3. Script
The top-scoring articles are handed to GPT-4o, which writes a natural, voice-ready briefing script in your preferred tone. Each story includes a short note on why it matters to you specifically, so it sounds personal, not like a headline dump.

### 4. Call
The script is delivered as an outbound phone call via Vapi and Twilio, using an ElevenLabs Indian English voice. The agent can answer follow-up questions on any story because the full article text is preserved.

## Your Profile

Personalization runs on a structured profile that captures: your name and role, the work you are doing right now (and why news matters for it), your financial interests, personal interests, hobbies, VIP entities you track, your current city and hometown, your preferred tone, and topics you want explicitly filtered out.

Keywords support aliases (for example, "RBI" also matches "Reserve Bank of India"), so matching is thorough without being noisy.

## Tech Stack

- Runtime: Node.js, TypeScript
- Database: Supabase (PostgreSQL)
- AI: OpenAI GPT-4o (ranking and script generation)
- Voice delivery: Vapi outbound calls over Twilio
- Text to speech: ElevenLabs (Indian English tuned)
- Hosting: Railway

---
PAGE: replykaro
TITLE: ReplyKaro Documentation | GoSchedule.ai
META_DESCRIPTION: How ReplyKaro works. An AI receptionist for clinics that answers calls, handles WhatsApp, and books appointments.
NAV_LABEL: ReplyKaro
---

## What is ReplyKaro?

ReplyKaro is an AI-powered WhatsApp and voice receptionist built for dental and aesthetic clinics. It answers calls and messages, books appointments into the clinic's calendar, and handles the routine front-desk load that otherwise leaks revenue through missed contact.

The clinic owner monitors everything through a real-time dashboard. The agent works. The owner watches the numbers.

## How It Works

### The AI Receptionist
When a patient calls or sends a WhatsApp message, the ReplyKaro agent handles the conversation: understanding what they need, checking availability, booking the appointment, and confirming the details. It uses Claude as the AI brain for natural conversation, Vapi and ElevenLabs for voice (tuned for Indian English), and Twilio for WhatsApp and telephony.

Bookings go directly into Google Calendar and Supabase, so nothing falls through the cracks and the dashboard updates in real time.

### The Clinic Dashboard
The owner gets a mobile-first monitoring dashboard with four sections:

**Dashboard:** today's appointments, upcoming bookings, AI conversations handled, and a live "Agent active" indicator. Three tabs let you flip between today's schedule, upcoming appointments (grouped by date), and recent AI conversations.

**Patients:** a searchable directory showing each patient with their total visit count and last appointment date.

**Analytics:** last 30 days of performance. Four stats (monthly total, conversion rate from conversations to bookings, average per day, busiest weekday) plus three charts: appointments per day, bookings by channel (WhatsApp versus Voice), and top treatments.

**Settings:** clinic information and service pricing (read-only view).

The dashboard has dark mode (system-aware with manual toggle) and is designed mobile-first with bottom navigation, because clinic owners check it on their phone between patients.

## Who It Is For

Dental clinics and aesthetic clinics in India, starting with Bangalore. Any clinic where the front desk is a bottleneck: missed calls after hours, WhatsApp messages that sit unread, appointment slots that go unfilled because nobody followed up.

## Tech Stack

- AI brain: Claude (via Anthropic API)
- Voice: Vapi with ElevenLabs (Indian English voice)
- Messaging: Twilio (WhatsApp and telephony)
- Bookings: Google Calendar plus Supabase
- Dashboard: React 19, Vite, Tailwind CSS v4, Recharts
- Hosting: Vercel (dashboard), Railway (agent backend)

---
PAGE: resound
TITLE: Resound.ai Documentation | GoSchedule.ai
META_DESCRIPTION: How Resound.ai works. A multi-tenant outbound sales automation platform with AI reply handling and voice qualification.
NAV_LABEL: Resound.ai
---

## What is Resound.ai?

Resound.ai is a multi-tenant platform for outbound sales automation. It runs your outbound motion from first touch to booked meeting: connecting your CRM and email tools, classifying every reply with AI, capturing explicit consent, and using voice AI to qualify leads and book meetings straight back into your CRM.

It is built to scale outbound without scaling the headcount behind it.

**Status: Early Access.** Resound is in active development. The foundation is live. Advanced features are rolling out in phases.

## The Vision

Most outbound sales teams hit the same ceiling: adding more pipeline means adding more SDRs, and SDRs are expensive, inconsistent, and hard to retain. Resound replaces the repetitive parts of that motion with AI while keeping humans in the loop for the judgment calls that matter.

The end state is a system where a sales team configures a campaign, uploads or syncs leads, and the platform handles sequencing, sending, reply triage, consent, voice qualification, and calendar booking, with the human stepping in only for high-value conversations.

## What Is Built Today (Phase 0)

The current release establishes the multi-tenant foundation:

- pnpm and Turborepo monorepo with a Next.js 15 App Router frontend
- Authentication and organization management via Clerk (sign-in, sign-up, org creation)
- Supabase Postgres schema with Drizzle ORM and migrations
- Clerk webhook sync: users, organizations, and membership changes flow into the database automatically
- tRPC v11 with organization-aware procedures
- Authenticated dashboard shell
- Railway deployment with CI for typecheck, lint, and build

## What Is Coming

The following capabilities are planned for upcoming phases:

- CRM and email sending tool connectors
- Email validation and deliverability checks
- AI reply classification with consent capture
- Voice AI calls for lead qualification
- Calendar booking (Cal.com integration)
- Campaign management and sequencing
- Analytics and reporting

## Tech Stack

- Framework: Next.js 15 (App Router)
- Monorepo: pnpm with Turborepo
- Auth: Clerk (organizations, webhooks)
- Database: Supabase Postgres via Drizzle ORM
- API: tRPC v11
- Hosting: Railway (Singapore region)
