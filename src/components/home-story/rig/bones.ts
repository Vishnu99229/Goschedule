/** Head diameter. Every other length is a multiple of H. */
export const H = 20

export const BONES = {
  headR: 0.5 * H,
  neck: 0.25 * H,
  torso: 2.5 * H,
  shoulderWidth: 1.6 * H,
  hipWidth: 1.1 * H,
  upperArm: 1.4 * H,
  forearm: 1.2 * H,
  hand: 0.35 * H,
  thigh: 1.8 * H,
  shin: 1.8 * H,
  foot: 0.6 * H,
  stroke: 0.32 * H,
  /** Shoulder line sits this far down the spine from the neck. */
  shoulderDrop: 0.4 * H,
  seat: 2.1 * H,
  desk: 3.2 * H,
} as const

export const ELBOW_MAX = 145
export const KNEE_MAX = 140

/**
 * 0° = down, +90° = right, 180° = up, −90° = left.
 * SVG y grows downward.
 */
export function polar(x: number, y: number, deg: number, len: number) {
  const r = (deg * Math.PI) / 180
  return { x: x + len * Math.sin(r), y: y + len * Math.cos(r) }
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}
