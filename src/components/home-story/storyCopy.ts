export type CaptionLine = {
  at: number
  text: string
}

export const STORY_HERO = {
  h1: 'Your own AI agent. Built around your life and your work.',
  sub: 'I set up a personal AI agent that handles your inbox, meetings, follow-ups, bills and team, so your day runs itself.',
  book: 'Book a 20-min call',
  seeDay: 'See a day with it ↓',
}

export const ENDING_CTA = {
  line1: "I'll build this for you.",
  line2: 'Set up around your email, your calendar, your bills and your team. Live in two weeks.',
  book: 'Book a 20-min call',
  whatsapp: 'WhatsApp me',
  whatsappHref: 'https://wa.me/91XXXXXXXXXX',
}

export const SCENE_NARRATION: Record<
  string,
  { durationMs: number; lines: CaptionLine[] }
> = {
  opening: {
    durationMs: 8000,
    lines: [
      { at: 0.1, text: 'Every morning starts like this.' },
      { at: 0.32, text: 'Now meet your agent.' },
    ],
  },
  subscription: {
    durationMs: 8500,
    lines: [
      { at: 0.04, text: '7:40 am. Half awake, scrolling.' },
      { at: 0.26, text: '₹649 a month. For an app you stopped using in March.' },
      { at: 0.64, text: 'Your agent caught it and cancelled it. Money back where it belongs.' },
      { at: 0.86, text: 'Then it remembers someone else.' },
    ],
  },
  'mom-bills': {
    durationMs: 9000,
    lines: [
      { at: 0.06, text: "Amma's electricity bill is due tomorrow." },
      { at: 0.22, text: 'She has no idea.' },
      { at: 0.78, text: "Your agent flagged it and set up the payment. She's still on her tea." },
      { at: 0.92, text: 'Now, work.' },
    ],
  },
  'email-meeting': {
    durationMs: 8000,
    lines: [
      { at: 0.06, text: "10:12 am. A prospect replies while you're stuck in a review." },
      { at: 0.55, text: 'Your agent answers, finds a time that works for both of you, and books it.' },
    ],
  },
  'follow-ups': {
    durationMs: 8000,
    lines: [
      { at: 0.06, text: 'The proposal you sent Monday. No reply.' },
      { at: 0.28, text: 'Day 1. Day 2. Day 3.' },
      { at: 0.62, text: 'Your agent follows up, politely. They reply within the hour.' },
    ],
  },
  'draft-review': {
    durationMs: 7000,
    lines: [
      { at: 0.08, text: 'You type one line.' },
      { at: 0.48, text: 'Your agent writes the whole email. You read it and hit send.' },
    ],
  },
  'team-slack': {
    durationMs: 9000,
    lines: [
      { at: 0.08, text: 'One launch. Four people. A hundred small tasks.' },
      { at: 0.55, text: "Your agent splits it up, assigns it on Slack, and tracks it till it's done." },
    ],
  },
  ending: {
    durationMs: 9000,
    lines: [
      { at: 0.08, text: '9:30 pm. Phone face-down. Nothing slipped.' },
      { at: 0.72, text: "I'll build this for you." },
      { at: 0.82, text: 'Set up around your email, your calendar, your bills and your team. Live in two weeks.' },
    ],
  },
}
