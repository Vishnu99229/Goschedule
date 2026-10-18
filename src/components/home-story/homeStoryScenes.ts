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
      'Scene one placeholder: a forgotten subscription on a bank statement will be caught and cancelled by the agent.',
  },
  {
    id: 'mom-bills',
    phase: 'morning',
    description:
      "Scene two placeholder: the agent pays household bills before they reach your mother's door.",
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
