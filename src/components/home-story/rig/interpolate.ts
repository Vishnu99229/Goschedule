import { clamp, ELBOW_MAX, KNEE_MAX } from './bones'
import type { FacePose, PoseAngles, PoseId, PoseKeyframe } from './types'
import { POSES } from './poses'

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpFace(a: FacePose, b: FacePose, t: number): FacePose {
  return {
    lookX: lerp(a.lookX, b.lookX, t),
    lookY: lerp(a.lookY, b.lookY, t),
    brow: lerp(a.brow, b.brow, t),
    mouth: lerp(a.mouth, b.mouth, t),
  }
}

/** Smoothstep with a little overshoot so blends feel springy. */
export function easePose(t: number) {
  const x = clamp(t, 0, 1)
  const s = x * x * (3 - 2 * x)
  const over = Math.sin(x * Math.PI) * 0.06
  return clamp(s + over, 0, 1.08)
}

export function lerpPose(a: PoseAngles, b: PoseAngles, t: number): PoseAngles {
  return {
    hipX: lerp(a.hipX, b.hipX, t),
    hipY: lerp(a.hipY, b.hipY, t),
    spine: lerp(a.spine, b.spine, t),
    neck: lerp(a.neck, b.neck, t),
    head: lerp(a.head, b.head, t),
    lArm: lerp(a.lArm, b.lArm, t),
    rArm: lerp(a.rArm, b.rArm, t),
    lElbow: clamp(lerp(a.lElbow, b.lElbow, t), 0, ELBOW_MAX),
    rElbow: clamp(lerp(a.rElbow, b.rElbow, t), 0, ELBOW_MAX),
    lWrist: lerp(a.lWrist, b.lWrist, t),
    rWrist: lerp(a.rWrist, b.rWrist, t),
    lThigh: lerp(a.lThigh, b.lThigh, t),
    rThigh: lerp(a.rThigh, b.rThigh, t),
    lKnee: clamp(lerp(a.lKnee, b.lKnee, t), 0, KNEE_MAX),
    rKnee: clamp(lerp(a.rKnee, b.rKnee, t), 0, KNEE_MAX),
    lFoot: lerp(a.lFoot, b.lFoot, t),
    rFoot: lerp(a.rFoot, b.rFoot, t),
    face: lerpFace(a.face, b.face, t),
    hold: t < 0.5 ? a.hold : b.hold,
    anchor: t < 0.5 ? a.anchor : b.anchor,
  }
}

export function sampleTrack(progress: number, keys: readonly PoseKeyframe[]): PoseAngles {
  const p = clamp(progress, 0, 1)
  if (keys.length === 0) return POSES.standing
  if (p <= keys[0].at) return POSES[keys[0].pose]
  const last = keys[keys.length - 1]
  if (p >= last.at) return POSES[last.pose]
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i]
    const b = keys[i + 1]
    if (p >= a.at && p <= b.at) {
      const span = b.at - a.at || 1
      return lerpPose(POSES[a.pose], POSES[b.pose], easePose((p - a.at) / span))
    }
  }
  return POSES[last.pose]
}

export function walkPose(phase: number): PoseAngles {
  const cycle: PoseId[] = ['walk0', 'walk1', 'walk2', 'walk3', 'walk4', 'walk5']
  const t = ((phase % 1) + 1) % 1
  const scaled = t * cycle.length
  const i = Math.floor(scaled) % cycle.length
  const n = (i + 1) % cycle.length
  return lerpPose(POSES[cycle[i]], POSES[cycle[n]], easePose(scaled - i))
}
