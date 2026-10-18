export type StoryPhase = 'morning' | 'day' | 'evening'

export type StoryBeat = {
  id: string
  phase: StoryPhase
  /** Visually hidden description for screen readers */
  description: string
}

export const HOME_STORY_SR_TITLE =
  'GoSchedule: an AI agent that handles everyday personal tasks and work, told as a scroll story without on-screen text.'

export const STORY_BEATS: StoryBeat[] = [
  {
    id: 'opening',
    phase: 'morning',
    description:
      'Opening: morning light. You relax while an AI agent orb appears, ready to help through the day.',
  },
  {
    id: 'subscription',
    phase: 'morning',
    description:
      'You sit relaxed on your phone. A bank statement slides in as grey rows. The agent scans them, finds a recurring subscription you did not notice, cancels it, and a coin returns to your wallet. You smile without looking up.',
  },
  {
    id: 'mom-bills',
    phase: 'morning',
    description:
      "Your mother sips tea in her armchair, never looking up. Electricity, water, and wifi bills drift toward her door with clocks running down. The agent pays each one before it arrives. A heart floats between you and her. She never finds out.",
  },
  {
    id: 'email-meeting',
    phase: 'day',
    description:
      'You work at a laptop, busy with other documents. An email lands. The agent opens it, types a reply in grey lines, sends it, and a calendar slot fills with a video-call icon. Two people meet. You never look up.',
  },
  {
    id: 'follow-ups',
    phase: 'day',
    description:
      'You send an email. Three days pass with an empty inbox. The agent sends a smaller follow-up. A reply envelope bounces back. Check.',
  },
  {
    id: 'draft-review',
    phase: 'day',
    description:
      'You type a short skeleton prompt. The agent expands it into a full draft of grey lines. You approve with one check, and it sends.',
  },
  {
    id: 'team-slack',
    phase: 'day',
    description:
      'A channel with four teammates. One large task splits into four smaller cards that fly to each person. Progress rings fill, then a check appears on each, one by one.',
  },
  {
    id: 'ending',
    phase: 'evening',
    description:
      'Ending: evening calm. You rest while the agent settles nearby; a voice control will appear here in a later stage.',
  },
]
