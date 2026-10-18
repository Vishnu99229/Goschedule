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
      'Scene three placeholder: the agent replies to email and books a meeting on your calendar.',
  },
  {
    id: 'follow-ups',
    phase: 'day',
    description:
      'Scene four placeholder: the agent sends a follow-up when no reply arrives after several days.',
  },
  {
    id: 'draft-review',
    phase: 'day',
    description:
      'Scene five placeholder: the agent expands a short prompt into a full draft for you to approve and send.',
  },
  {
    id: 'team-slack',
    phase: 'day',
    description:
      'Scene six placeholder: the agent splits work across a team channel and tracks completion.',
  },
  {
    id: 'ending',
    phase: 'evening',
    description:
      'Ending: evening calm. You rest while the agent settles nearby; a voice control will appear here in a later stage.',
  },
]
