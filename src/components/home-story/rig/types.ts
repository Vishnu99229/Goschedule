export type Hold = 'none' | 'phone' | 'bag'

export type FacePose = {
  lookX: number
  lookY: number
  brow: number
  mouth: number
}

export type PoseAngles = {
  hipX: number
  hipY: number
  /** World angle of the spine from the hip. 180 = upright. */
  spine: number
  neck: number
  head: number
  lArm: number
  rArm: number
  lElbow: number
  rElbow: number
  lWrist: number
  rWrist: number
  lThigh: number
  rThigh: number
  lKnee: number
  rKnee: number
  lFoot: number
  rFoot: number
  face: FacePose
  hold: Hold
  /** 'feet' plants ankles on y=0; 'back' plants the torso on y=0 (lying). */
  anchor: 'feet' | 'back'
}

export type PoseId =
  | 'lyingInBed'
  | 'sittingUp'
  | 'stretching'
  | 'reachingPhone'
  | 'sittingBedPhone'
  | 'sittingOverwhelmed'
  | 'sittingSmile'
  | 'scrolling'
  | 'standing'
  | 'walk0'
  | 'walk1'
  | 'walk2'
  | 'walk3'
  | 'walk4'
  | 'walk5'
  | 'pickingUpBag'
  | 'deskTyping'
  | 'deskLean'
  | 'sofaRelax'
  | 'placingPhone'

export type PoseKeyframe = {
  at: number
  pose: PoseId
}

export type Joint = { x: number; y: number }

export type Skeleton = {
  hip: Joint
  neck: Joint
  head: Joint
  lShoulder: Joint
  rShoulder: Joint
  lElbow: Joint
  rElbow: Joint
  lWrist: Joint
  rWrist: Joint
  lHand: Joint
  rHand: Joint
  lHip: Joint
  rHip: Joint
  lKnee: Joint
  rKnee: Joint
  lAnkle: Joint
  rAnkle: Joint
  lToe: Joint
  rToe: Joint
  lArmAngle: number
  rArmAngle: number
  lForeAngle: number
  rForeAngle: number
  spine: number
  headAngle: number
  face: FacePose
  hold: Hold
}
