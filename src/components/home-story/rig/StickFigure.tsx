import { useAnimationFrame, useMotionValue, useMotionValueEvent, type MotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import { BONES, H, polar } from './bones'
import { computeSkeleton, plantSkeleton } from './fk'
import { sampleTrack, walkPose } from './interpolate'
import { YOU_LOOK, type CharacterLook } from './looks'
import { POSES } from './poses'
import type { Hold, PoseAngles, PoseId, PoseKeyframe, Skeleton } from './types'

const INK = '#141c26'
const FACE = '#f4efe8'
const VB = { x: -2.4 * H, y: -7.55 * H, w: 11.2 * H, h: 8.35 * H }

type Props = {
  className?: string
  poseId?: PoseId
  progress?: MotionValue<number>
  track?: readonly PoseKeyframe[]
  walk?: boolean
  wiggle?: boolean | 'scroll' | 'type' | 'sip' | 'page'
  hold?: Hold
  reduceMotion?: boolean
  look?: CharacterLook
}

function mouthPath(cx: number, cy: number, mouth: number) {
  const w = 5.2
  const lift = mouth * 4.2
  return `M ${cx - w} ${cy} Q ${cx} ${cy + lift} ${cx + w} ${cy}`
}

function torsoPath(sk: Skeleton) {
  return `M ${sk.lShoulder.x} ${sk.lShoulder.y} L ${sk.rShoulder.x} ${sk.rShoulder.y} L ${sk.rHip.x} ${sk.rHip.y} L ${sk.lHip.x} ${sk.lHip.y} Z`
}

function hairPath(hx: number, hy: number, angle: number, hair: CharacterLook['hair']) {
  if (hair === 'none') return null
  const top = polar(hx, hy, angle, -BONES.headR * 0.92)
  const l = polar(hx, hy, angle - 62, BONES.headR * 0.86)
  const r = polar(hx, hy, angle + 62, BONES.headR * 0.86)
  if (hair === 'bun') {
    const bun = polar(hx, hy, angle, -BONES.headR * 1.15)
    return (
      <>
        <path d={`M ${l.x} ${l.y} Q ${top.x} ${top.y} ${r.x} ${r.y}`} fill={INK} />
        <circle cx={bun.x} cy={bun.y} r={BONES.headR * 0.38} fill={INK} />
      </>
    )
  }
  const peak = polar(hx, hy, angle - 12, -BONES.headR * 1.08)
  return <path d={`M ${l.x} ${l.y} Q ${peak.x} ${peak.y} ${r.x} ${r.y} Q ${top.x} ${top.y} ${l.x} ${l.y}`} fill={INK} />
}

function sampleFigure(props: Props, phase: number, wiggleT: number): PoseAngles {
  let pose: PoseAngles
  if (props.walk) pose = walkPose(phase)
  else if (props.poseId) pose = POSES[props.poseId]
  else if (props.progress && props.track) pose = sampleTrack(props.progress.get(), props.track)
  else pose = POSES.standing
  if (props.hold) pose = { ...pose, hold: props.hold }
  const mode = props.wiggle === true ? 'scroll' : props.wiggle
  if (mode === 'scroll') {
    pose = { ...pose, rWrist: pose.rWrist + Math.sin(wiggleT * 11) * 14 }
  } else if (mode === 'type') {
    pose = {
      ...pose,
      rWrist: pose.rWrist + Math.sin(wiggleT * 14) * 9,
      lWrist: pose.lWrist + Math.sin(wiggleT * 14 + 1.2) * 9,
    }
  } else if (mode === 'sip') {
    pose = {
      ...pose,
      rArm: pose.rArm + Math.sin(wiggleT * 2.4) * 10,
      rElbow: pose.rElbow + (Math.sin(wiggleT * 2.4) + 1) * 8,
    }
  } else if (mode === 'page') {
    pose = { ...pose, lWrist: pose.lWrist + Math.sin(wiggleT * 3.2) * 18 }
  }
  return pose
}

export function StickFigure({
  className = '',
  poseId,
  progress,
  track,
  walk = false,
  wiggle = false,
  hold,
  reduceMotion = false,
  look = YOU_LOOK,
}: Props) {
  const wiggleRef = useRef(0)
  const fallback = useMotionValue(0)
  const [pose, setPose] = useState<PoseAngles>(() =>
    sampleFigure({ poseId, progress, track, walk, wiggle, hold }, 0, 0),
  )

  useMotionValueEvent(progress ?? fallback, 'change', () => {
    if (walk || !progress || !track) return
    setPose(sampleFigure({ poseId, progress, track, walk, wiggle, hold }, 0, wiggleRef.current))
  })

  useAnimationFrame((t) => {
    if (reduceMotion) return
    const phase = (t / 800) % 1
    const wig = t / 1000
    if (walk) {
      setPose(sampleFigure({ poseId, progress, track, walk, wiggle, hold }, phase, wig))
      return
    }
    if (wiggle) {
      wiggleRef.current = wig
      setPose(sampleFigure({ poseId, progress, track, walk, wiggle, hold }, 0, wig))
    }
  })

  const raw = computeSkeleton(pose)
  const sk = plantSkeleton(raw, pose.anchor)
  const stroke = BONES.stroke
  const bodyScale = look.scale ?? 1
  const eyeOffX = sk.face.lookX * 2.2
  const eyeOffY = sk.face.lookY * 1.8
  const eyeL = polar(sk.head.x, sk.head.y, sk.headAngle - 28, BONES.headR * 0.32)
  const eyeR = polar(sk.head.x, sk.head.y, sk.headAngle + 28, BONES.headR * 0.32)
  const browL = polar(eyeL.x, eyeL.y, sk.headAngle, -3.4 - sk.face.brow * 1.6)
  const browR = polar(eyeR.x, eyeR.y, sk.headAngle, -3.4 - sk.face.brow * 1.6)
  const mouthAt = polar(sk.head.x, sk.head.y, sk.headAngle, BONES.headR * 0.38)
  const glassesL = polar(eyeL.x, eyeL.y, sk.headAngle, 0)
  const glassesR = polar(eyeR.x, eyeR.y, sk.headAngle, 0)

  return (
    <svg
      className={`story-stick ${wiggle && !reduceMotion ? 'story-stick--scroll' : ''} ${className}`.trim()}
      viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMax meet"
      aria-hidden="true"
    >
      <g transform={`scale(${bodyScale})`}>
      <g fill="none" stroke={INK} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
        <line x1={sk.lHip.x} y1={sk.lHip.y} x2={sk.lKnee.x} y2={sk.lKnee.y} />
        <line x1={sk.lKnee.x} y1={sk.lKnee.y} x2={sk.lAnkle.x} y2={sk.lAnkle.y} />
        <line x1={sk.lAnkle.x} y1={sk.lAnkle.y} x2={sk.lToe.x} y2={sk.lToe.y} strokeWidth={stroke * 0.72} />
        <line x1={sk.rHip.x} y1={sk.rHip.y} x2={sk.rKnee.x} y2={sk.rKnee.y} />
        <line x1={sk.rKnee.x} y1={sk.rKnee.y} x2={sk.rAnkle.x} y2={sk.rAnkle.y} />
        <line x1={sk.rAnkle.x} y1={sk.rAnkle.y} x2={sk.rToe.x} y2={sk.rToe.y} strokeWidth={stroke * 0.72} />

        <line x1={sk.lShoulder.x} y1={sk.lShoulder.y} x2={sk.lElbow.x} y2={sk.lElbow.y} />
        <line x1={sk.lElbow.x} y1={sk.lElbow.y} x2={sk.lHand.x} y2={sk.lHand.y} />
        <line x1={sk.rShoulder.x} y1={sk.rShoulder.y} x2={sk.rElbow.x} y2={sk.rElbow.y} />
        <line x1={sk.rElbow.x} y1={sk.rElbow.y} x2={sk.rHand.x} y2={sk.rHand.y} />
      </g>

      <path d={torsoPath(sk)} fill={INK} />
      {look.saree ? (
        <>
          <path d={torsoPath(sk)} fill="#c45c4a" />
          <path
            d={`M ${sk.lShoulder.x} ${sk.lShoulder.y} Q ${sk.hip.x} ${sk.hip.y + 8} ${sk.rHip.x + 6} ${sk.rHip.y + 10} L ${sk.rHip.x - 4} ${sk.rAnkle.y - 8} Q ${sk.hip.x + 18} ${sk.hip.y + 22} ${sk.rShoulder.x} ${sk.rShoulder.y}`}
            fill="#a84838"
            opacity="0.92"
          />
        </>
      ) : null}

      <circle cx={sk.head.x} cy={sk.head.y} r={BONES.headR} fill={INK} />
      {hairPath(sk.head.x, sk.head.y, sk.headAngle, look.hair)}

      <g className="story-stick__face">
        <g className="story-stick__eyes">
          <circle cx={eyeL.x + eyeOffX} cy={eyeL.y + eyeOffY} r={1.7} fill={FACE} />
          <circle cx={eyeR.x + eyeOffX} cy={eyeR.y + eyeOffY} r={1.7} fill={FACE} />
        </g>
        <line
          x1={browL.x - 2.4}
          y1={browL.y}
          x2={browL.x + 2.2}
          y2={browL.y - sk.face.brow * 1.2}
          stroke={FACE}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1={browR.x - 2.2}
          y1={browR.y - sk.face.brow * 1.2}
          x2={browR.x + 2.4}
          y2={browR.y}
          stroke={FACE}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <path
          d={mouthPath(mouthAt.x, mouthAt.y, sk.face.mouth)}
          fill="none"
          stroke={FACE}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {look.glasses ? (
          <g fill="none" stroke={FACE} strokeWidth="1.2">
            <circle cx={glassesL.x} cy={glassesL.y} r={3.4} />
            <circle cx={glassesR.x} cy={glassesR.y} r={3.4} />
            <line x1={glassesL.x + 3.4} y1={glassesL.y} x2={glassesR.x - 3.4} y2={glassesR.y} />
          </g>
        ) : null}
      </g>

      {pose.hold === 'phone' ? (
        <g
          transform={`translate(${sk.rWrist.x} ${sk.rWrist.y}) rotate(${sk.rForeAngle - 90})`}
          className="story-stick__phone"
        >
          <rect x={-3.2} y={-16} width={11} height={20} rx={2} fill={INK} />
          <rect x={-1.2} y={-13.6} width={7} height={14} rx={1} fill="#7ec9bc" />
        </g>
      ) : null}
      {pose.hold === 'bag' ? (
        <g transform={`translate(${sk.rHand.x} ${sk.rHand.y})`}>
          <rect x={-6} y={2} width={14} height={12} rx={2} fill={INK} />
          <path d="M -2 2 Q 1 -6 4 2" fill="none" stroke={INK} strokeWidth="1.8" />
        </g>
      ) : null}
      {pose.hold === 'tea' ? (
        <g transform={`translate(${sk.rWrist.x} ${sk.rWrist.y}) rotate(${sk.rForeAngle - 90})`}>
          <rect x={-5} y={-8} width={11} height={9} rx={2} fill="#f4efe6" stroke={INK} strokeWidth="1.4" />
          <path d="M 6 -5 h 4 c 2 0 3 2 3 4 s -1 4 -3 4 h -4" fill="none" stroke={INK} strokeWidth="1.4" />
          <path d="M -1 -10 c 1 -5 4 -5 3 -9" fill="none" stroke="#c4ad90" strokeWidth="1.1" />
        </g>
      ) : null}
      {pose.hold === 'newspaper' ? (
        <g transform={`translate(${sk.lWrist.x} ${sk.lWrist.y}) rotate(${sk.lForeAngle - 90})`}>
          <rect x={-12} y={-16} width={24} height={18} rx={1.5} fill="#f4efe6" stroke={INK} strokeWidth="1.3" />
          <line x1={0} y1={-16} x2={0} y2={2} stroke={INK} strokeWidth="1" />
          <line x1={-8} y1={-10} x2={-2} y2={-10} stroke="#c4ad90" strokeWidth="1" />
          <line x1={2} y1={-8} x2={8} y2={-8} stroke="#c4ad90" strokeWidth="1" />
        </g>
      ) : null}
      </g>
    </svg>
  )
}
