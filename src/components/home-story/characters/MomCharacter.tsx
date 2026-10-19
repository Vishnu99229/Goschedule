type Props = {
  className?: string
}

/** Mom in an armchair, always looking at her tea — never at the bills. */
export function MomCharacter({ className = '' }: Props) {
  return (
    <svg
      className={`home-story__mom ${className}`.trim()}
      viewBox="0 0 120 150"
      width="120"
      height="150"
      aria-hidden="true"
    >
      <path d="M18 148h88" stroke="#c8d0db" strokeWidth="4" strokeLinecap="round" />
      <path d="M28 148 V78 h64 v70" fill="#d9c4a8" />
      <path d="M24 86 h72 v14 H24z" fill="#c4ad90" />
      <path d="M22 72c0-10 10-16 22-16h32c12 0 22 6 22 16v18H22V72z" fill="#b89b7a" />
      <ellipse cx="60" cy="92" rx="22" ry="16" fill="#6b4a3a" />
      <circle cx="60" cy="48" r="14" fill="#e8c4a8" />
      <path d="M48 44c4-10 20-10 24 0-6-1-18-1-24 0z" fill="#4a3428" />
      <path d="M54 54h12" stroke="#8a5a40" strokeWidth="1.5" strokeLinecap="round" />
      <g className="story-live__sip" transform="rotate(-8 78 78)">
        <path d="M70 70c8 2 14 8 16 16" fill="none" stroke="#6b4a3a" strokeWidth="5" strokeLinecap="round" />
        <rect x="74" y="78" width="16" height="12" rx="3" fill="#f4efe6" stroke="#c4ad90" strokeWidth="1.5" />
        <path d="M90 82h6c2 0 3 2 3 4s-1 4-3 4h-6" fill="none" stroke="#c4ad90" strokeWidth="1.5" />
        <path d="M78 76c2-4 8-4 10 0" fill="none" stroke="#d8d0c4" strokeWidth="1.2" opacity="0.7" />
      </g>
      <g className="story-live__steam" fill="none" stroke="#c4ad90" strokeWidth="1.2" strokeLinecap="round">
        <path d="M86 70c1-6 4-6 3-12" />
        <path d="M92 68c2-7 5-6 4-13" />
      </g>
    </svg>
  )
}
