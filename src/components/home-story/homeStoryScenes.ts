export type StoryPhase = 'morning' | 'day' | 'evening'

export type StoryBeat = {
  id: string
  phase: StoryPhase
}

export const STORY_SCENE_IDS = [
  'subscription',
  'mom-bills',
  'email-meeting',
  'follow-ups',
  'draft-review',
  'team-slack',
] as const

export type StorySceneId = (typeof STORY_SCENE_IDS)[number]

export const WORK_SCENE_IDS = ['email-meeting', 'follow-ups', 'draft-review', 'team-slack'] as const

export const STORY_BEATS: StoryBeat[] = [
  { id: 'opening', phase: 'morning' },
  { id: 'subscription', phase: 'morning' },
  { id: 'mom-bills', phase: 'morning' },
  { id: 'email-meeting', phase: 'day' },
  { id: 'follow-ups', phase: 'day' },
  { id: 'draft-review', phase: 'day' },
  { id: 'team-slack', phase: 'day' },
  { id: 'ending', phase: 'evening' },
]
