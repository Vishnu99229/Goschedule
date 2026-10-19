/** Evening living room — sofa, lamp on, moon in the window. */
export function EveningSet() {
  return (
    <div className="story-room story-room--evening" aria-hidden="true">
      <div className="story-room__wall story-room__wall--evening" />
      <div className="story-room__window story-room__window--night">
        <span className="story-room__moon" />
        <span className="story-room__pane" />
      </div>
      <div className="story-room__floor story-room__floor--evening" />
      <div className="story-room__sofa">
        <span className="story-room__sofa-back" />
        <span className="story-room__sofa-seat" />
        <span className="story-room__sofa-arm story-room__sofa-arm--l" />
        <span className="story-room__sofa-arm story-room__sofa-arm--r" />
      </div>
      <div className="story-room__floor-lamp is-on">
        <span className="story-room__lamp-shade" />
        <span className="story-room__lamp-stem" />
        <span className="story-room__lamp-glow" />
      </div>
    </div>
  )
}
