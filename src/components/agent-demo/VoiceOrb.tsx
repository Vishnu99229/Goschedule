import { motion } from 'framer-motion'

/**
 * Voice orb — scales with Vapi volume-level (0–1) from 1.0 → 1.15.
 */
export default function VoiceOrb({ volume }: { volume: number }) {
  const scale = 1 + Math.min(Math.max(volume, 0), 1) * 0.15

  return (
    <div
      aria-hidden
      style={{
        width: 112,
        height: 112,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Soft pulse ring */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid var(--accent-soft-border)',
          background: 'var(--accent-soft)',
        }}
        animate={{ scale, opacity: 0.55 + Math.min(volume, 1) * 0.35 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.4 }}
      />
      <motion.div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'var(--accent)',
          boxShadow: '0 0 0 6px var(--accent-soft)',
        }}
        animate={{ scale }}
        transition={{ type: 'spring', stiffness: 320, damping: 20, mass: 0.35 }}
      />
    </div>
  )
}
