/** Mom's living room — armchair, lamp, tea table, front door. */
export function LivingRoomSet() {
  return (
    <div className="story-room story-room--living" aria-hidden="true">
      <div className="story-room__wall" />
      <div className="story-room__window story-room__window--living">
        <span className="story-room__pane" />
        <span className="story-room__light" />
      </div>
      <div className="story-room__floor" />
      <div className="story-room__rug" />
      <div className="story-room__door">
        <span className="story-room__door-panel" />
        <span className="story-room__knob" />
      </div>
      <div className="story-room__armchair">
        <span className="story-room__chair-back" />
        <span className="story-room__chair-seat" />
        <span className="story-room__chair-arm story-room__chair-arm--l" />
        <span className="story-room__chair-arm story-room__chair-arm--r" />
      </div>
      <div className="story-room__tea-table">
        <span className="story-room__tea-cup" />
        <span className="story-room__living-lamp">
          <span className="story-room__lamp-shade" />
          <span className="story-room__lamp-stem" />
        </span>
      </div>
    </div>
  )
}
