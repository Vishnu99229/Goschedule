type Pose = 'phone' | 'smile' | 'phone-smile'

type Props = {
  className?: string
  pose?: Pose
}

/** Simple flat "You" figure — no text. */
export function YouCharacter({ className = '', pose = 'phone' }: Props) {
  const smiling = pose === 'smile' || pose === 'phone-smile'
  const phone = pose === 'phone' || pose === 'phone-smile'

  return (
    <svg
      className={`home-story__you ${className}`.trim()}
      viewBox="0 0 80 120"
      width="80"
      height="120"
      aria-hidden="true"
    >
      <ellipse cx="40" cy="108" rx="18" ry="5" fill="#c8d0db" opacity="0.7" />
      <path
        d="M26 118c1-22 6-38 14-44 8 6 13 22 14 44"
        fill="#2a3544"
      />
      <path d="M24 52c2-12 8-18 16-18s14 6 16 18v28H24V52z" fill="#141c26" />
      <circle cx="40" cy="22" r="13" fill="#f3d3b8" />
      <path d="M28 18c4-10 20-10 24 0-8-2-16-2-24 0z" fill="#141c26" />
      {smiling ? (
        <path
          d="M34 26c2 4 10 4 12 0"
          fill="none"
          stroke="#8a5a40"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <path
          d="M35 27h10"
          fill="none"
          stroke="#8a5a40"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      )}
      {phone ? (
        <>
          <path d="M54 58c6 4 10 12 10 20" fill="none" stroke="#141c26" strokeWidth="6" strokeLinecap="round" />
          <rect x="58" y="72" width="14" height="22" rx="3" fill="#141c26" />
          <rect x="60" y="75" width="10" height="14" rx="1.5" fill="#7a8490" />
        </>
      ) : null}
    </svg>
  )
}
