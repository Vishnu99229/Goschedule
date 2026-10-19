/** Static first frame so a lazy scene never shows an empty sky card. */
export function StageIdleFrame() {
  return (
    <div className="story-idle" aria-hidden="true">
      <div className="story-idle__wall" />
      <div className="story-idle__floor" />
    </div>
  )
}
