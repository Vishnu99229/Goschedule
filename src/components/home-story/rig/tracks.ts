import type { PoseKeyframe } from './types'

/** Opening: lie → sit up → stretch → reach phone → overwhelmed → agent. */
export const OPENING_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'lyingInBed' },
  { at: 0.1, pose: 'sittingUp' },
  { at: 0.22, pose: 'stretching' },
  { at: 0.34, pose: 'reachingPhone' },
  { at: 0.44, pose: 'sittingBedPhone' },
  { at: 0.54, pose: 'sittingOverwhelmed' },
  { at: 0.78, pose: 'sittingBedPhone' },
  { at: 1, pose: 'sittingBedPhone' },
]

/** Scene 1: scroll → frown at the red row → relax and smile when cancelled. */
export const SUBSCRIPTION_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'scrolling' },
  { at: 0.18, pose: 'scrolling' },
  { at: 0.28, pose: 'sittingOverwhelmed' },
  { at: 0.56, pose: 'sittingOverwhelmed' },
  { at: 0.7, pose: 'sittingSmile' },
  { at: 1, pose: 'sittingSmile' },
]
