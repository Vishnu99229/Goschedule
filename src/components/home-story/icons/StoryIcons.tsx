import { motion, type MotionValue } from 'framer-motion'

type IconProps = { className?: string; size?: number }

export function RepeatIcon({ className = '', size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 7h8a4 4 0 0 1 0 8h-1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M7 7 9.5 4.5M7 7l2.5 2.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M17 17H9a4 4 0 0 1 0-8h1"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d="M17 17 14.5 19.5M17 17l-2.5-2.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  )
}

export function WalletIcon({ className = '', size = 40 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 40 32" fill="none" aria-hidden="true">
      <rect x="1" y="6" width="38" height="24" rx="5" fill="#141c26" />
      <rect x="1" y="4" width="30" height="10" rx="3" fill="#2a3544" />
      <circle cx="30" cy="18" r="3.5" fill="#e8c36a" />
    </svg>
  )
}

export function CoinIcon({ className = '', size = 22 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#e8c36a" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="#c9a227" strokeWidth="1.5" />
    </svg>
  )
}

export function CheckIcon({ className = '', size = 22 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#0a8f7a" />
      <path d="M7 12.5 10.5 16 17 8.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function LightningIcon({ className = '', size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M13 2 4 14h8l-1 8 9-12h-8l1-8z" fill="currentColor" />
    </svg>
  )
}

export function WaterIcon({ className = '', size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3c4 6 7 9 7 12a7 7 0 1 1-14 0c0-3 3-6 7-12z" fill="currentColor" />
    </svg>
  )
}

export function WifiIcon({ className = '', size = 18 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 10c3.8-3.6 10.2-3.6 14 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M8 13.5c2.2-2 5.8-2 8 0" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1.8" fill="currentColor" />
    </svg>
  )
}

export function HeartIcon({ className = '', size = 22 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 20s-7-4.4-9-8.2C1.4 8.6 3.2 5 6.6 5 8.6 5 10 6.2 12 8.2 14 6.2 15.4 5 17.4 5 20.8 5 22.6 8.6 21 11.8 19 15.6 12 20 12 20z"
        fill="#d94a6a"
      />
    </svg>
  )
}

export function CardIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg className={className} width={size} height={size * 0.64} viewBox="0 0 36 22" aria-hidden="true">
      <rect x="1" y="1" width="34" height="20" rx="3" fill="#141c26" />
      <rect x="1" y="6" width="34" height="5" fill="#2a3544" />
      <rect x="6" y="15" width="10" height="3" rx="1" fill="#e8c36a" />
    </svg>
  )
}

export function ClockFace({
  hours,
  minutes,
  className = '',
}: {
  hours: MotionValue<number>
  minutes: MotionValue<number>
  className?: string
}) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="#fff" stroke="#b42318" strokeWidth="1.4" />
      <motion.g style={{ rotate: hours, originX: 0.5, originY: 0.5 }}>
        <line x1="8" y1="8" x2="8" y2="4.2" stroke="#141c26" strokeWidth="1.3" strokeLinecap="round" />
      </motion.g>
      <motion.g style={{ rotate: minutes, originX: 0.5, originY: 0.5 }}>
        <line x1="8" y1="8" x2="8" y2="3.4" stroke="#b42318" strokeWidth="1" strokeLinecap="round" />
      </motion.g>
    </svg>
  )
}
