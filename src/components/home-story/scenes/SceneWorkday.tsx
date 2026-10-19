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
  reduceMotion: boolean
  arrive: MotionValue<number>
  email: MotionValue<number>
  follow: MotionValue<number>
  draft: MotionValue<number>
  slack: MotionValue<number>
  emailOn: boolean
  followOn: boolean
  draftOn: boolean
  slackOn: boolean
}

export function SceneWorkday({
  reduceMotion,
  arrive,
  email,
  follow,
  draft,
  slack,
  emailOn,
  followOn,
  draftOn,
  slackOn,
}: Props) {
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

  const arriveOp = useTransform(arrive, [0.55, 1], [1, 0])
  const deskOp = useTransform(arrive, [0.35, 0.85], [0, 1])
  const arriveX = useTransform(arrive, [0, 1], [28, 0])
  const lean = useTransform(slack, [0.82, 0.96], [0, 1])
  const lid = useTransform(slack, [0.88, 1], [0, 1])

  return (
    <div className="story-work" aria-hidden="true">
      {rm ? (
        <>
          <div className="story-work__you">
            <YouAtDesk />
          </div>
          {Slack ? <Slack progress={slack} reduceMotion hideYou /> : null}
        </>
      ) : (
        <>
          <motion.div className="story-work__arrive" style={{ opacity: arriveOp, x: arriveX }}>
            <YouCharacter pose="bag" />
            <AgentOrb size={28} className="story-work__arrive-orb" />
          </motion.div>
          <motion.div className="story-work__you" style={{ opacity: deskOp }}>
            <YouAtDesk lean={lean} lid={lid} />
          </motion.div>
          <motion.div
            className="story-work__chapter"
            animate={{ opacity: emailOn ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          >
            {Email ? <Email progress={email} reduceMotion={false} hideYou /> : null}
          </motion.div>
          <motion.div
            className="story-work__chapter"
            animate={{ opacity: followOn ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          >
            {Follow ? <Follow progress={follow} reduceMotion={false} hideYou /> : null}
          </motion.div>
          <motion.div
            className="story-work__chapter"
            animate={{ opacity: draftOn ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          >
            {Draft ? <Draft progress={draft} reduceMotion={false} hideYou /> : null}
          </motion.div>
          <motion.div
            className="story-work__chapter"
            animate={{ opacity: slackOn ? 1 : 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 22 }}
          >
            {Slack ? <Slack progress={slack} reduceMotion={false} hideYou /> : null}
          </motion.div>
        </>
      )}
    </div>
  )
}
