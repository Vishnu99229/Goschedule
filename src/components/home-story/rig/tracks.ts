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

/** Scene 2 You: watches, then picks up a bag and starts walking out. */
export const MOM_YOU_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'standing' },
  { at: 0.72, pose: 'standing' },
  { at: 0.84, pose: 'pickingUpBag' },
  { at: 0.94, pose: 'walk0' },
  { at: 1, pose: 'walk2' },
]

/** Scene 2 Mom: sip tea, turn the paper, back to tea. Never looks at the door. */
export const MOM_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'momArmchair' },
  { at: 0.1, pose: 'momSip' },
  { at: 0.22, pose: 'momArmchair' },
  { at: 0.34, pose: 'momNewspaper' },
  { at: 0.5, pose: 'momNewspaper' },
  { at: 0.64, pose: 'momSip' },
  { at: 0.82, pose: 'momSip' },
  { at: 1, pose: 'momArmchair' },
]

/** Walk in, then sit and type. Sampled against the arrive 0–1 clip. */
export const ARRIVE_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'walk0' },
  { at: 0.55, pose: 'walk3' },
  { at: 0.7, pose: 'standing' },
  { at: 0.86, pose: 'deskTyping' },
  { at: 1, pose: 'deskTyping' },
]

export const DESK_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'deskTyping' },
  { at: 1, pose: 'deskTyping' },
]

export const DESK_LEAN_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'deskTyping' },
  { at: 0.9, pose: 'deskTyping' },
  { at: 1, pose: 'deskLean' },
]

/** Ending: stand, stretch, walk to the sofa, phone face-down, smile. */
export const ENDING_TRACK: readonly PoseKeyframe[] = [
  { at: 0, pose: 'standing' },
  { at: 0.1, pose: 'standingStretch' },
  { at: 0.22, pose: 'standing' },
  { at: 0.34, pose: 'walk2' },
  { at: 0.46, pose: 'walk4' },
  { at: 0.58, pose: 'sofaRelax' },
  { at: 0.7, pose: 'placingPhone' },
  { at: 0.82, pose: 'sofaRelax' },
  { at: 1, pose: 'sofaRelax' },
]
