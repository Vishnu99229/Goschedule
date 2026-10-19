import { useEffect, useState, type ComponentType } from 'react'
import { motion, useTransform, type MotionValue } from 'framer-motion'
import { YouAtDesk } from '../characters/YouAtDesk'
import { YouCharacter } from '../characters/YouCharacter'
import { AgentOrb } from '../characters/AgentOrb'

type SceneProps = {
  progress: MotionValue<number>
  reduceMotion: boolean
  hideYou?: boolean
}

type Props = {
  progress: MotionValue<number>
  reduceMotion: boolean
}

export function SceneWorkday({ progress, reduceMotion }: Props) {
  const p = progress
  const rm = reduceMotion
  const [Email, setEmail] = useState<ComponentType<SceneProps> | null>(null)
  const [Follow, setFollow] = useState<ComponentType<SceneProps> | null>(null)
  const [Draft, setDraft] = useState<ComponentType<SceneProps> | null>(null)
  const [Slack, setSlack] = useState<ComponentType<SceneProps> | null>(null)

  useEffect(() => {
    let cancelled = false
    void Promise.all([
      import('./SceneEmailMeeting').then((m) => m.SceneEmailMeeting),
      import('./SceneFollowUps').then((m) => m.SceneFollowUps),
      import('./SceneDraftReview').then((m) => m.SceneDraftReview),
      import('./SceneTeamSlack').then((m) => m.SceneTeamSlack),
    ]).then(([A, B, C, D]) => {
      if (cancelled) return
      setEmail(() => A)
      setFollow(() => B)
      setDraft(() => C)
      setSlack(() => D)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const emailP = useTransform(p, [0.08, 0.263], [0, 1])
  const followP = useTransform(p, [0.263, 0.526], [0, 1])
  const draftP = useTransform(p, [0.526, 0.737], [0, 1])
  const slackP = useTransform(p, [0.737, 1], [0, 1])

  const arriveOp = useTransform(p, [0, 0.07], [1, 0])
  const deskOp = useTransform(p, [0.04, 0.1], [0, 1])
  const emailOp = useTransform(p, [0.07, 0.1, 0.25, 0.28], [0, 1, 1, 0])
  const followOp = useTransform(p, [0.25, 0.28, 0.51, 0.54], [0, 1, 1, 0])
  const draftOp = useTransform(p, [0.51, 0.54, 0.72, 0.75], [0, 1, 1, 0])
  const slackOp = useTransform(p, [0.72, 0.75, 1], [0, 1, 1])

  const lean = useTransform(p, [0.94, 0.99], [0, 1])
  const lid = useTransform(p, [0.96, 1], [0, 1])

  return (
    <div className="story-work" aria-hidden="true">
      {rm ? (
        <>
          <div className="story-work__you">
            <YouAtDesk />
          </div>
          {Slack ? <Slack progress={slackP} reduceMotion hideYou /> : null}
        </>
      ) : (
        <>
          <motion.div className="story-work__arrive" style={{ opacity: arriveOp }}>
            <YouCharacter pose="bag" />
            <AgentOrb size={28} className="story-work__arrive-orb" />
          </motion.div>
          <motion.div className="story-work__you" style={{ opacity: deskOp }}>
            <YouAtDesk lean={lean} lid={lid} />
          </motion.div>
          <motion.div className="story-work__chapter" style={{ opacity: emailOp }}>
            {Email ? <Email progress={emailP} reduceMotion={false} hideYou /> : null}
          </motion.div>
          <motion.div className="story-work__chapter" style={{ opacity: followOp }}>
            {Follow ? <Follow progress={followP} reduceMotion={false} hideYou /> : null}
          </motion.div>
          <motion.div className="story-work__chapter" style={{ opacity: draftOp }}>
            {Draft ? <Draft progress={draftP} reduceMotion={false} hideYou /> : null}
          </motion.div>
          <motion.div className="story-work__chapter" style={{ opacity: slackOp }}>
            {Slack ? <Slack progress={slackP} reduceMotion={false} hideYou /> : null}
          </motion.div>
        </>
      )}
    </div>
  )
}
