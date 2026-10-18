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

export function BillIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 28" aria-hidden="true">
      <rect x="2" y="1" width="20" height="26" rx="3" fill="#fff" stroke="#141c26" strokeWidth="1.4" />
      <rect x="6" y="6" width="12" height="2.4" rx="1" fill="#c8d0db" />
      <rect x="6" y="11" width="8" height="2" rx="1" fill="#c8d0db" />
      <circle cx="12" cy="20" r="3.2" fill="#e8c36a" />
    </svg>
  )
}

export function CalendarIcon({ className = '', size = 26 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="2" y="4" width="20" height="18" rx="3" fill="#fff" stroke="#141c26" strokeWidth="1.4" />
      <rect x="2" y="4" width="20" height="6" rx="3" fill="#141c26" />
      <rect x="6" y="13" width="4" height="4" rx="0.8" fill="#c8d0db" />
      <rect x="14" y="13" width="4" height="4" rx="0.8" fill="#0a8f7a" />
    </svg>
  )
}

export function ChatBubbleIcon({ className = '', size = 26 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H10l-6 5V6a2 2 0 0 1 2-2z"
        fill="#141c26"
      />
      <rect x="7" y="8" width="10" height="2" rx="1" fill="#c8d0db" />
      <rect x="7" y="12" width="6" height="2" rx="1" fill="#c8d0db" />
    </svg>
  )
}

export function ReceiptIcon({ className = '', size = 24 }: IconProps) {
  return (
    <svg className={className} width={size} height={size * 1.2} viewBox="0 0 22 28" aria-hidden="true">
      <path d="M2 1h18v24l-3-2-3 2-3-2-3 2-3-2-3 2V1z" fill="#fff" stroke="#141c26" strokeWidth="1.3" />
      <rect x="6" y="6" width="10" height="2" rx="1" fill="#c8d0db" />
      <rect x="6" y="11" width="7" height="2" rx="1" fill="#c8d0db" />
      <rect x="6" y="16" width="8" height="2" rx="1" fill="#c8d0db" />
    </svg>
  )
}

export function EnvelopeIcon({ className = '', size = 28 }: IconProps) {
  return (
    <svg className={className} width={size} height={size * 0.75} viewBox="0 0 32 24" aria-hidden="true">
      <rect x="1" y="3" width="30" height="18" rx="3" fill="#141c26" />
      <path d="M2 5 16 14 30 5" fill="none" stroke="#edf1f6" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}

export function PaperPlaneIcon({ className = '', size = 22 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 11 21 3 14 21 11 13 3 11z" fill="#141c26" />
      <path d="M11 13 21 3" stroke="#edf1f6" strokeWidth="1.4" />
    </svg>
  )
}

export function VideoCallIcon({ className = '', size = 16 }: IconProps) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2" y="6" width="14" height="12" rx="2" fill="#fff" />
      <path d="M16 10 22 7v10l-6-3V10z" fill="#fff" />
    </svg>
  )
}

export function AvatarPair({ className = '' }: { className?: string }) {
  return (
    <svg className={className} width="56" height="28" viewBox="0 0 56 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="#2a3544" />
      <circle cx="14" cy="11" r="5" fill="#f3d3b8" />
      <circle cx="42" cy="14" r="12" fill="#0a8f7a" />
      <circle cx="42" cy="11" r="5" fill="#f3d3b8" />
    </svg>
  )
}
