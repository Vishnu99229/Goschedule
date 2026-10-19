import { BONES, clamp, ELBOW_MAX, KNEE_MAX, polar } from './bones'
import type { PoseAngles, Skeleton } from './types'

function elbowBend(upper: number, bend: number, side: 1 | -1) {
  return upper + side * clamp(bend, 0, ELBOW_MAX)
}

function kneeBend(thigh: number, bend: number) {
  return thigh - clamp(bend, 0, KNEE_MAX)
}

export function computeSkeleton(pose: PoseAngles): Skeleton {
  const hip = { x: pose.hipX, y: pose.hipY }
  const neck = polar(hip.x, hip.y, pose.spine, BONES.torso)
  const head = polar(neck.x, neck.y, pose.spine + pose.neck + pose.head, BONES.neck + BONES.headR)

  const shoulderAt = polar(neck.x, neck.y, pose.spine, -BONES.shoulderDrop)
  const halfShoulder = BONES.shoulderWidth / 2
  const lShoulder = polar(shoulderAt.x, shoulderAt.y, pose.spine - 90, halfShoulder)
  const rShoulder = polar(shoulderAt.x, shoulderAt.y, pose.spine + 90, halfShoulder)

  const lFore = elbowBend(pose.lArm, pose.lElbow, -1)
  const rFore = elbowBend(pose.rArm, pose.rElbow, 1)
  const lHandA = lFore + pose.lWrist
  const rHandA = rFore + pose.rWrist

  const lElbow = polar(lShoulder.x, lShoulder.y, pose.lArm, BONES.upperArm)
  const rElbow = polar(rShoulder.x, rShoulder.y, pose.rArm, BONES.upperArm)
  const lWrist = polar(lElbow.x, lElbow.y, lFore, BONES.forearm)
  const rWrist = polar(rElbow.x, rElbow.y, rFore, BONES.forearm)
  const lHand = polar(lWrist.x, lWrist.y, lHandA, BONES.hand)
  const rHand = polar(rWrist.x, rWrist.y, rHandA, BONES.hand)

  const halfHip = BONES.hipWidth / 2
  const lHip = polar(hip.x, hip.y, pose.spine - 90, halfHip)
  const rHip = polar(hip.x, hip.y, pose.spine + 90, halfHip)

  const lShinA = kneeBend(pose.lThigh, pose.lKnee)
  const rShinA = kneeBend(pose.rThigh, pose.rKnee)
  const lKnee = polar(lHip.x, lHip.y, pose.lThigh, BONES.thigh)
  const rKnee = polar(rHip.x, rHip.y, pose.rThigh, BONES.thigh)
  const lAnkle = polar(lKnee.x, lKnee.y, lShinA, BONES.shin)
  const rAnkle = polar(rKnee.x, rKnee.y, rShinA, BONES.shin)
  const lToe = polar(lAnkle.x, lAnkle.y, lShinA + 90 + pose.lFoot, BONES.foot)
  const rToe = polar(rAnkle.x, rAnkle.y, rShinA + 90 + pose.rFoot, BONES.foot)

  return {
    hip,
    neck,
    head,
    lShoulder,
    rShoulder,
    lElbow,
    rElbow,
    lWrist,
    rWrist,
    lHand,
    rHand,
    lHip,
    rHip,
    lKnee,
    rKnee,
    lAnkle,
    rAnkle,
    lToe,
    rToe,
    lArmAngle: pose.lArm,
    rArmAngle: pose.rArm,
    lForeAngle: lFore,
    rForeAngle: rFore,
    spine: pose.spine,
    headAngle: pose.spine + pose.neck + pose.head,
    face: pose.face,
    hold: pose.hold,
  }
}

export function plantSkeleton(sk: Skeleton, anchor: PoseAngles['anchor']): Skeleton {
  let dy = 0
  if (anchor === 'feet') {
    dy = -Math.max(sk.lAnkle.y, sk.rAnkle.y, sk.lToe.y, sk.rToe.y)
  } else {
    dy = -Math.max(sk.hip.y, sk.lShoulder.y, sk.rShoulder.y, sk.lHip.y, sk.rHip.y)
  }
  const shift = (p: { x: number; y: number }) => ({ x: p.x, y: p.y + dy })
  return {
    ...sk,
    hip: shift(sk.hip),
    neck: shift(sk.neck),
    head: shift(sk.head),
    lShoulder: shift(sk.lShoulder),
    rShoulder: shift(sk.rShoulder),
    lElbow: shift(sk.lElbow),
    rElbow: shift(sk.rElbow),
    lWrist: shift(sk.lWrist),
    rWrist: shift(sk.rWrist),
    lHand: shift(sk.lHand),
    rHand: shift(sk.rHand),
    lHip: shift(sk.lHip),
    rHip: shift(sk.rHip),
    lKnee: shift(sk.lKnee),
    rKnee: shift(sk.rKnee),
    lAnkle: shift(sk.lAnkle),
    rAnkle: shift(sk.rAnkle),
    lToe: shift(sk.lToe),
    rToe: shift(sk.rToe),
  }
}
