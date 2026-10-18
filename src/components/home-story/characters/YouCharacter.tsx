type Props = {
  className?: string
}

/** Simple flat "You" figure — no text. */
export function YouCharacter({ className = '' }: Props) {
  return (
    <svg
      className={`home-story__you ${className}`.trim()}
      viewBox="0 0 80 120"
      width={80}
      height={120}
      aria-hidden="true"
    >
      <circle cx="40" cy="22" r="14" fill="currentColor" />
      <path
        d="M18 118c2-28 14-42 22-46s20 18 22 46"
        fill="currentColor"
      />
      <path
        d="M28 62c8 4 16 4 24 0v22H28V62z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  )
}
