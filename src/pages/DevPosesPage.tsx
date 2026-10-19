import { useEffect } from 'react'
import { StickFigure } from '../components/home-story/rig/StickFigure'
import { MOM_LOOK, YOU_LOOK } from '../components/home-story/rig/looks'
import { MOM_POSE_SHEET, POSE_LABELS, POSE_SHEET } from '../components/home-story/rig/poses'

export default function DevPosesPage() {
  useEffect(() => {
    document.title = 'Pose sheet — GoSchedule (dev)'
    const el = document.head.querySelector('meta[name="robots"]')
    const prev = el?.getAttribute('content') ?? 'index, follow'
    if (el) el.setAttribute('content', 'noindex, nofollow')
    return () => {
      if (el) el.setAttribute('content', prev)
    }
  }, [])

  return (
    <main className="dev-poses" id="main-content">
      <style>{`
        .dev-poses {
          min-height: 100svh;
          margin: 0;
          padding: 28px 24px 48px;
          background: #f3f1ea;
          color: #141c26;
          font-family: ui-sans-serif, system-ui, sans-serif;
        }
        .dev-poses h1 {
          margin: 0 0 6px;
          font-size: 22px;
          font-weight: 700;
        }
        .dev-poses__h2 {
          margin: 28px 0 10px;
          font-size: 16px;
          font-weight: 700;
        }
        .dev-poses p {
          margin: 0 0 22px;
          color: #5a6570;
          font-size: 13px;
        }
        .dev-poses__grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }
        .dev-poses__cell {
          background:
            linear-gradient(90deg, rgba(20, 28, 38, 0.06) 1px, transparent 1px),
            linear-gradient(rgba(20, 28, 38, 0.06) 1px, transparent 1px);
          background-size: 16px 16px;
          background-color: #fbfaf6;
          border: 1px solid rgba(20, 28, 38, 0.1);
          border-radius: 12px;
          padding: 10px 10px 8px;
          min-height: 260px;
          display: flex;
          flex-direction: column;
        }
        .dev-poses__cell svg {
          width: 100%;
          height: 220px;
          overflow: visible;
        }
        .dev-poses__label {
          margin-top: 4px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.02em;
          text-align: center;
        }
        .dev-poses__walk {
          grid-column: 1 / -1;
          max-width: 280px;
        }
      `}</style>
      <h1>Pose sheet</h1>
      <p>Forward-kinematics stick rig. Standing ≈ 7H. Walk loops on the last You cell.</p>
      <h2 className="dev-poses__h2">You</h2>
      <div className="dev-poses__grid">
        {POSE_SHEET.map((id) => (
          <figure key={id} className="dev-poses__cell">
            <StickFigure poseId={id} look={YOU_LOOK} reduceMotion />
            <figcaption className="dev-poses__label">{POSE_LABELS[id]}</figcaption>
          </figure>
        ))}
        <figure className="dev-poses__cell dev-poses__walk">
          <StickFigure walk look={YOU_LOOK} />
          <figcaption className="dev-poses__label">walking cycle</figcaption>
        </figure>
      </div>
      <h2 className="dev-poses__h2">Mom</h2>
      <p>Same bones, bun + glasses + saree, scale 0.9, softer sit.</p>
      <div className="dev-poses__grid">
        {MOM_POSE_SHEET.map((id) => (
          <figure key={id} className="dev-poses__cell">
            <StickFigure poseId={id} look={MOM_LOOK} reduceMotion />
            <figcaption className="dev-poses__label">{POSE_LABELS[id]}</figcaption>
          </figure>
        ))}
      </div>
    </main>
  )
}
