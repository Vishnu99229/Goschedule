type Props = {
  label: string
}

/** Small time-of-day chip on the stage, matching the sun’s place in the day. */
export function StoryClock({ label }: Props) {
  return (
    <div className="story-clock" aria-hidden="true">
      {label}
    </div>
  )
}
