# DOCS CONTENT V2 — EXPANDED
# Claude Code: read this file. Replace all existing docs page content with the
# content below. Each PAGE block maps to one page component.
# DIAGRAM blocks should be rendered as styled React components (colored boxes,
# arrows, flow layouts) using the site's existing CSS variables. Do NOT add
# mermaid as a dependency.

---
PAGE: technical-note
TITLE: Our Technical Note | GoSchedule.ai
META_DESCRIPTION: How GoSchedule.ai builds vertical AI agents that drive real business outcomes, not generic assistants.
NAV_LABEL: Technical Note
---

## The Global Problem We Are Solving

Despite massive investment in AI tooling, the businesses that stand to gain the most from automation are the ones least served by it. Enterprises get bespoke systems and dedicated teams. The roughly 60 million small and mid-sized businesses in India get generic chatbots that deflect rather than perform.

The core problem is not access to AI. It is that the shape of the product is wrong. A horizontal assistant optimizes for plausible conversation. A business needs an agent that optimizes for a specific number: bookings filled, order value lifted, calls answered, leads qualified. These are fundamentally different objectives, and prompting a general model does not bridge them.

Every business leaks revenue at the point of customer contact. The call that rings out after hours. The WhatsApp that sits unread until the lead goes cold. The patient who never got a reminder. The happy customer who was never asked for a review. This is not an edge case. It is the daily reality for most local businesses, and the gap between what they need and what current AI tools offer is where we operate.

## Our Contrarian Thesis: Three Assumptions The Market Gets Wrong

### 1. The Horizontal Agent Fallacy

The market assumes one powerful general assistant can serve any business with the right prompt.

The reality: a generic agent carries no business context. It cannot know that this cafe's goal is lifting average order value from 280 to 400, or that this clinic's 4 PM slot goes empty every Tuesday. Without that grounding, the agent produces plausible responses but not business outcomes.

| What generic agents do | What business-outcome agents do |
| --- | --- |
| Answer questions | Drive a specific metric |
| Respond when prompted | Proactively upsell, remind, follow up |
| Treat every business the same | Carry vertical-specific configuration |
| Optimize for conversation quality | Optimize for revenue impact |
| No accountability to a number | Measured against a KPI |

### 2. The Self-Serve Configuration Trap

The market assumes the path to scale is a no-code builder where the business owner assembles their own agent.

The reality: a cafe owner in Kochi or a dental clinic in Bangalore does not want to configure states, transitions, and prompt chains. They want results. The build-it-yourself model excludes the exact customers who represent the largest addressable market. We invert this: the customer describes the outcome, we build the agent.

### 3. AI As A Feature Versus AI As The Employee

The market assumes you bolt a chatbot onto an existing product and call it AI-powered.

The reality: a chatbot deflects. An employee performs. The difference is whether the system can take the action that creates value: book the appointment, place the upsell, send the follow-up, route the lead, log it in the CRM, and close the loop. We do not ship a chat window. We ship a worker that owns a job and is measured against it.

## What A Business Outcome Actually Requires

When a customer contacts a business, closing the loop on revenue requires four layers working in concert. Most AI tools deliver one. The gap between one layer and four is the reason generic agents fail in the field.

| Layer | What it means | What it requires | Why generic agents miss it |
| --- | --- | --- | --- |
| Vertical understanding | The agent knows this specific business: menu, services, pricing, policies, peak hours, upsell logic | Deep per-business configuration that encodes domain knowledge | Generic agents start cold every conversation, reconstructing context from a prompt |
| Channel reach | The customer is met where they already are: voice call, WhatsApp, QR at the table, web widget | Multi-channel orchestration with unified state | Most tools live on one channel and force the business to adapt |
| Local fluency | Real Indian English, code-mixed speech, names and places pronounced correctly | India-tuned STT and TTS, local context awareness | Western-trained voice stacks degrade on Indian accents, breaking trust in the first seconds |
| Action and memory | The agent does not just talk. It books, upsells, follows up, remembers the customer | Calendar, CRM, payments, and state persistence integrations | Chat-only tools have no hands. They cannot complete the transaction |

DIAGRAM: four-layer-stack
TYPE: vertical stack, four rows
DESCRIPTION: Four colored horizontal bars stacked vertically.
Row 1 (top, purple): "Vertical Understanding" — "Menu, services, pricing, upsell logic"
Row 2 (indigo): "Channel Reach" — "Voice, WhatsApp, QR, Web"
Row 3 (violet): "Local Fluency" — "Indian English STT/TTS, names, code-mixing"
Row 4 (bottom, dark): "Action + Memory" — "Book, upsell, follow up, remember"
Left label: "What we compose per business"

## Our Approach: Agents On The Fly

This is the core methodology and the part competitors cannot replicate by reading marketing copy, because it is institutional knowledge, not a feature.

DIAGRAM: pipeline-flow
TYPE: horizontal flow, five steps with arrows
DESCRIPTION: Five connected boxes flowing left to right with arrows between them and a feedback arrow from step 5 back to step 2.
Step 1 (purple): "Discovery" — "Understand the business and the outcome"
Step 2 (indigo): "Blueprint" — "Map channels, actions, persona, guardrails"
Step 3 (violet): "Assemble" — "Compose from vertical templates + core engine"
Step 4 (dark purple): "Deploy" — "Live on voice, WhatsApp, QR in days"
Step 5 (purple): "Optimize" — "Tune against real metrics from live interactions"
Feedback arrow from Step 5 back to Step 2, labeled "Continuous improvement"

**Discovery.** We start from the outcome, not the technology. What number should move? Bookings, average order value, answered call rate, review volume, qualified leads. We capture business context that a generic prompt would never surface.

**Blueprint.** We map the agent: which channels, which actions it can take, its persona and tone, its escalation rules, and the integrations it touches (calendar, CRM, payments).

**Assemble.** We compose the agent from a growing library of vertical templates running on a shared core engine. Each new build makes the next one in that vertical faster and better.

**Deploy.** Live in days, not the three to six months of a bespoke enterprise project. The customer sees value before patience runs out.

**Optimize.** The agent is tuned against the real business metric using live interaction data, and the loop feeds back into the blueprint. Improvement is continuous, not a one-time delivery.

## Platform Architecture

Every GoSchedule agent runs on one shared core. Verticals differ in configuration, not in foundation.

DIAGRAM: architecture
TYPE: three-column architecture diagram
DESCRIPTION: Three columns connected by arrows.
LEFT COLUMN titled "Customer Channels":
  Box: "Voice (Phone)"
  Box: "WhatsApp"
  Box: "QR / Web Widget"
CENTER COLUMN titled "GoSchedule Core Engine":
  Box: "Orchestration + Reasoning (GPT-4o)"
  Box: "Voice Layer (Vapi + ElevenLabs, Indian English)"
  Box: "Per-business config + memory"
RIGHT COLUMN titled "Actions + Integrations":
  Box: "Calendar / Bookings"
  Box: "Supabase (state, leads, logs)"
  Box: "CRM / Webhooks / Payments"
Arrows flow from left to center to right.

| Component | Technology | Role |
| --- | --- | --- |
| Reasoning | OpenAI GPT-4o | Agent brain, model selection tuned per task |
| Voice | Vapi + ElevenLabs | Real-time voice pipeline, Indian English tuned |
| Messaging | Twilio | WhatsApp and telephony connectivity |
| Data | Supabase (PostgreSQL) | Configuration, bookings, leads, interaction logs |
| Scheduling | Google Calendar | Appointment booking and availability |
| Infrastructure | Railway | Hosting, deployment, fast iteration |

## Why We Win

| Moat | Why it compounds |
| --- | --- |
| Methodology | The agents-on-the-fly pipeline is institutional knowledge that gets faster with every build |
| Vertical templates | Each deployment encodes configuration knowledge for that vertical. New builds inherit it |
| India and local tuning | Voice fluency for Indian English, names, and code-mixing is a real engineering investment |
| Outcome accountability | We sell against a business metric, not a chat window. Churn is structurally low |
| Distribution and GTM | Deep voice-AI go-to-market experience with live reference customers |
| Compounding config data | Every interaction teaches the system how that vertical converts |

---
PAGE: morning-brief
TITLE: Morning Brief Documentation | GoSchedule.ai
META_DESCRIPTION: Technical documentation for Morning Brief. A personalized AI news agent that calls you every morning with only the stories that matter.
NAV_LABEL: Morning Brief
---

## Overview

Morning Brief is a personalized AI agent that delivers a curated news briefing as a phone call every morning. It pulls from dozens of sources, scores every article against your personal profile using a two-stage ranking system, writes a voice-ready script in your preferred tone, and calls you to read it aloud.

No feed to scroll. No inbox to clear. Just the few things worth knowing before your day starts.

## System Architecture

DIAGRAM: morning-brief-pipeline
TYPE: vertical flow, four stages with data stores
DESCRIPTION: Four stages flowing top to bottom, with data stores on the side.
Stage 1 (top, purple): "INGEST" — "RSS (8 feeds) + NewsAPI (5 categories)"
  Side box: "news_pool table (Supabase)"
  Arrow down, labeled "Deduplicate + scrape full text"
Stage 2 (indigo): "RANK" — "Heuristic scoring + GPT-4o re-ranking"
  Side box: "User profile_json"
  Arrow down, labeled "Top articles selected"
Stage 3 (violet): "SCRIPT" — "GPT-4o generates voice-ready briefing"
  Side box: "daily_briefing table"
  Arrow down, labeled "Script saved"
Stage 4 (bottom, dark): "CALL" — "Vapi + Twilio outbound phone call"
  Side box: "ElevenLabs TTS (Indian English)"

## Stage 1: News Ingestion

Every day, Morning Brief pulls articles from a curated set of sources chosen for coverage of Indian business, global tech, and startup ecosystems.

**RSS Feeds (8 sources):**

| Source | Coverage |
| --- | --- |
| Moneycontrol Business | Indian markets and business |
| Inc42 | Indian startup ecosystem |
| ET Tech | Indian technology sector |
| TechCrunch | Global startups and venture |
| The Verge AI | AI and machine learning |
| Hacker News (front page) | Developer and tech community |
| Reuters India | Asia-focused global news |
| BusinessLine Info-tech | Indian IT industry |

**NewsAPI** adds five additional query categories covering broader themes.

Articles are deduplicated by URL, then full text is scraped using article extraction so the ranking system works on complete content, not just headlines.

## Stage 2: Two-Stage Ranking

This is the core intelligence. A cheap, fast heuristic pass filters the pool, then GPT-4o applies deeper judgment to the survivors.

### Stage 2a: Heuristic Scoring

Each article is matched against seven dimensions of the user's profile, with weighted scoring:

| Match dimension | Weight | Example |
| --- | --- | --- |
| VIP entities | 4 | Companies, people, or brands you track closely |
| Active work | 3 | Your current projects and why news matters for them |
| Financial interests | 3 | Markets, sectors, or instruments you follow |
| Current city | 2 | Local news from where you live now |
| Personal interests | 2 | Topics you care about personally |
| Hometown | 1 | News from your hometown |
| Hobbies | 1 | Hobby-related stories |

A recency bonus is added with linear decay:

| Article age | Bonus points |
| --- | --- |
| Under 1 hour | +3 |
| 1 to 6 hours | +2 |
| 6 to 12 hours | +1 |
| 12 to 24 hours | +0.5 |
| Over 24 hours | 0 |

Articles matching the user's explicit filters (topics to exclude) are flagged with negative signals and suppressed.

### Stage 2b: LLM Re-Ranking

Surviving articles are sent to GPT-4o with a detailed scoring rubric. The model assigns a refined score and classifies each article into a trigger type:

| Trigger type | Meaning |
| --- | --- |
| outreach_hook | Useful for your professional outreach |
| market_signal | Relevant market or industry movement |
| competitor_move | Activity from a competitor or adjacent player |
| learning | Something worth knowing for personal growth |
| local_relevance | News tied to your geography |
| lifestyle | Hobby, culture, or personal interest |

Each article also receives a short "why relevant" explanation that feeds directly into the voice script, making the briefing personal rather than generic.

## Stage 3: Script Generation

The top-scoring articles are handed to GPT-4o with the user's tone preference (for example, "warm, direct, slightly informal"). The model writes a continuous, natural briefing script where each story flows into the next and every item explains why it matters to this specific person.

The script is saved to the daily_briefing table along with the full article data and the complete ranking debug trace.

## Stage 4: Voice Delivery

The script is delivered via an outbound phone call using Vapi and a Twilio-backed phone number, spoken through an ElevenLabs voice tuned for Indian English. The agent can answer follow-up questions on any story because the full article text is preserved on each enriched article.

## The Personalization Profile

The entire system runs on a structured user profile:

| Field | Purpose |
| --- | --- |
| name, role_context | Who you are and what you do |
| active_work[] | Current projects, each with why news matters for it |
| personal_interests | Topics you care about |
| financial_interests | Markets and instruments you follow |
| locations (current_city, hometown) | Geographic relevance |
| hobbies | Leisure interests |
| vip_entities | High-priority names, companies, brands |
| tone_preference | How the briefing should sound |
| explicit_filters | Topics to actively exclude |

Keywords support aliases (for example, "RBI" also matches "Reserve Bank of India"), so matching is thorough without being noisy.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Node.js, TypeScript (ESM) |
| Database | Supabase (PostgreSQL) |
| AI | OpenAI GPT-4o (ranking + script) |
| News | RSS (rss-parser) + NewsAPI |
| Text extraction | @extractus/article-extractor |
| Voice | Vapi outbound calls + Twilio |
| TTS | ElevenLabs (Indian English) |
| Hosting | Railway |

---
PAGE: replykaro
TITLE: ReplyKaro Documentation | GoSchedule.ai
META_DESCRIPTION: Technical documentation for ReplyKaro. An AI receptionist for clinics that answers calls, handles WhatsApp, and books appointments.
NAV_LABEL: ReplyKaro
---

## Overview

ReplyKaro is an AI-powered WhatsApp and voice receptionist built for dental and aesthetic clinics. It answers calls and messages, books appointments into the clinic's calendar, and handles the routine front-desk load that otherwise leaks revenue through missed contact.

The clinic owner monitors everything through a real-time dashboard. The agent works. The owner watches the numbers.

## System Architecture

DIAGRAM: replykaro-architecture
TYPE: three-column flow
DESCRIPTION: Three columns with arrows flowing left to right.
LEFT COLUMN titled "Patient Contact":
  Box: "Phone call"
  Box: "WhatsApp message"
CENTER COLUMN titled "ReplyKaro Agent":
  Box: "Claude (AI brain)"
  Box: "Vapi + ElevenLabs (Voice, Indian English)"
  Box: "Twilio (WhatsApp + telephony)"
RIGHT COLUMN titled "Actions":
  Box: "Google Calendar (book appointment)"
  Box: "Supabase (patient record, conversation log)"
  Box: "Clinic Dashboard (real-time monitoring)"
Arrows: Patient Contact -> ReplyKaro Agent -> Actions

## How The Agent Works

When a patient calls or sends a WhatsApp message, the ReplyKaro agent handles the full conversation loop:

1. **Receives the contact** via Twilio (voice call or WhatsApp message)
2. **Understands the intent** using Claude as the AI brain
3. **Checks availability** against the clinic's Google Calendar
4. **Books the appointment** directly into the calendar and Supabase
5. **Confirms with the patient** with details (date, time, treatment, location)
6. **Logs everything** so the dashboard updates in real time

The voice pipeline uses Vapi for real-time audio and ElevenLabs with an Indian English voice, so the agent sounds natural to patients in India rather than robotic or foreign.

## Data Model

The system writes to five core tables in Supabase:

| Table | Key fields | Purpose |
| --- | --- | --- |
| clinics | id, slug, name, address | Clinic identity, selected by slug |
| services | id, clinic_id, name, price | Treatment menu and pricing |
| patients | id, name, phone, created_at | Patient directory |
| appointments | id, patient_id, date, time, treatment, booked_via, status | Booking records with channel tracking |
| messages | id, patient_id, created_at | AI conversation log |

The `booked_via` field on appointments tracks whether the booking came through voice or WhatsApp, which powers the channel breakdown analytics.

## The Clinic Dashboard

The owner gets a mobile-first monitoring dashboard with four sections.

DIAGRAM: dashboard-layout
TYPE: four-quadrant grid
DESCRIPTION: A 2x2 grid showing the four dashboard sections.
Top-left (purple): "Dashboard" — "Today's appointments, upcoming bookings, live agent status, conversations handled"
Top-right (indigo): "Patients" — "Searchable directory with visit count and last appointment"
Bottom-left (violet): "Analytics" — "30-day trends, channel breakdown, top treatments, conversion rate"
Bottom-right (dark): "Settings" — "Clinic info and service pricing (read-only)"

### Dashboard (home)
The cockpit view. Shows the clinic name, an "Agent live" pulse indicator, and four stat cards: today's appointments, this week's count, total patients, and conversations handled by AI. Three tabs let you switch between today's schedule, upcoming appointments (grouped by date), and recent conversations.

### Patients
A searchable directory showing each patient with their total visit count and last appointment date. Patient data is enriched at read time by joining against the appointments table.

### Analytics
Last 30 days of performance with four computed metrics and three charts:

| Metric | How it is calculated |
| --- | --- |
| Monthly total | Count of appointments in the last 30 days |
| Conversion rate | Bookings divided by unique conversations, capped at 100% |
| Average per day | Monthly total divided by 30 |
| Busiest day | Day of week with the highest appointment count |

**Charts:**
- Appointments per day (30-day bar chart)
- Bookings by channel (WhatsApp vs Voice donut chart)
- Top treatments (horizontal bar, top 7 treatments)

### Settings
Read-only display of clinic information and service pricing. Editing is intentionally out of scope for the monitoring dashboard.

## Who It Is For

Dental clinics and aesthetic clinics in India, starting with Bangalore. The ideal customer is any clinic where the front desk is a bottleneck: missed calls after hours, WhatsApp messages that sit unread, appointment slots that go unfilled because nobody followed up.

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| AI brain | Claude (Anthropic API) | Natural conversation and intent handling |
| Voice | Vapi + ElevenLabs | Real-time voice, Indian English |
| Messaging | Twilio | WhatsApp and telephony |
| Bookings | Google Calendar | Appointment scheduling |
| Data | Supabase (PostgreSQL) | Patients, appointments, conversations |
| Dashboard | React 19, Vite 8, Tailwind v4 | Mobile-first monitoring UI |
| Charts | Recharts 3 | Analytics visualizations |
| Dashboard hosting | Vercel | Static SPA deployment |
| Agent hosting | Railway | Backend services |

---
PAGE: resound
TITLE: Resound.ai Documentation | GoSchedule.ai
META_DESCRIPTION: Technical documentation for Resound.ai. A multi-tenant outbound sales automation platform with AI reply handling and voice qualification.
NAV_LABEL: Resound.ai
---

## Overview

Resound.ai is a multi-tenant platform for outbound sales automation. It runs your outbound motion from first touch to booked meeting: connecting your CRM and email tools, classifying every reply with AI, capturing explicit consent, and using voice AI to qualify leads and book meetings straight back into your CRM.

Built to scale outbound without scaling the headcount behind it.

**Status: Early Access.** The foundation is live. Advanced capabilities are rolling out in phases.

## The Problem

Most outbound sales teams hit the same ceiling: adding more pipeline means adding more SDRs, and SDRs are expensive, inconsistent, and hard to retain. The repetitive parts of the motion (sequencing, sending, reply sorting, follow-up, scheduling) eat most of the SDR's day while the high-judgment work (qualifying, negotiating, closing) gets squeezed.

Resound replaces the repetitive parts with AI and keeps humans in the loop for the decisions that matter.

## Target Architecture

DIAGRAM: resound-architecture
TYPE: horizontal flow with feedback loop
DESCRIPTION: Five stages flowing left to right with a feedback arrow.
Stage 1 (purple): "Lead Ingestion" — "CRM sync, CSV upload, enrichment"
Stage 2 (indigo): "Campaign + Sequencing" — "Multi-step outreach, personalization"
Stage 3 (violet): "Send + Deliver" — "Email via ESP, deliverability checks"
Stage 4 (dark purple): "Reply Engine" — "AI classification, consent capture"
Stage 5 (purple): "Qualification" — "Voice AI call, meeting booking"
Feedback arrow from Stage 4 and 5 back to Stage 2 labeled "Re-sequence based on reply type"
Bottom bar spanning all: "Multi-tenant foundation: Clerk auth, org management, Supabase, tRPC"

## What Is Built Today (Phase 0)

Phase 0 establishes the multi-tenant foundation that every future capability builds on.

| Component | Technology | Status |
| --- | --- | --- |
| Monorepo | pnpm + Turborepo | Live |
| Frontend | Next.js 15 (App Router) | Live |
| Auth + orgs | Clerk (sign-in, sign-up, org creation, membership) | Live |
| Database | Supabase Postgres via Drizzle ORM + migrations | Live |
| Webhook sync | Clerk events into users, organizations, org_members | Live |
| API layer | tRPC v11 with org-aware procedures | Live |
| Dashboard shell | Authenticated, org-scoped | Live |
| CI | Typecheck, lint, build on every PR | Live |
| Hosting | Railway (Singapore region) | Live |

### Clerk Webhook Sync

The system listens for seven Clerk webhook events and syncs them into the database in real time:

| Event | What it does |
| --- | --- |
| user.created | Creates a user record |
| user.updated | Updates user details |
| user.deleted | Removes user record |
| organization.created | Creates an org record |
| organization.updated | Updates org details |
| organization.deleted | Removes org record |
| organizationMembership.created | Links user to org |
| organizationMembership.deleted | Unlinks user from org |

This means the database always reflects the current state of Clerk without manual sync, and every tRPC procedure can be org-scoped out of the box.

## What Is Coming

The following capabilities are planned for upcoming phases:

| Phase | Capability | Description |
| --- | --- | --- |
| Phase 1 | CRM connector | Sync contacts from HubSpot, Salesforce, or custom CRM |
| Phase 1 | ESP integration | Connect email sending tools for deliverability |
| Phase 2 | Lead enrichment | Apollo API integration for contact enrichment |
| Phase 2 | Campaign management | Multi-step sequences with personalization |
| Phase 3 | Reply engine | AI classification of inbound replies |
| Phase 3 | Consent capture | Explicit opt-in tracking and compliance |
| Phase 4 | Voice AI | Outbound qualification calls via Vapi |
| Phase 4 | Calendar booking | Cal.com integration for meeting scheduling |
| Future | Analytics | Campaign performance and pipeline metrics |
| Future | Billing | Subscription management and usage tracking |

## Tech Stack

| Layer | Technology | Purpose |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | Frontend and API routes |
| Monorepo | pnpm + Turborepo | Build orchestration |
| Auth | Clerk | Users, orgs, SSO, webhooks |
| Database | Supabase Postgres | Primary data store |
| ORM | Drizzle | Schema, migrations, type-safe queries |
| API | tRPC v11 | Type-safe, org-aware procedures |
| Hosting | Railway (Singapore) | Production deployment |
| CI | GitHub Actions | Typecheck, lint, build per PR |
