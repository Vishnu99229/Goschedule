type Props = {
  onReplay: () => void
  hidden?: boolean
}

export function StoryReplay({ onReplay, hidden }: Props) {
  if (hidden) return null
  return (
    <button type="button" className="story-replay" onClick={onReplay} aria-label="Replay scene">
      ↻
    </button>
  )
}
