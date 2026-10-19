import { useEffect, useState, type ComponentType } from 'react'
import { motion, useMotionValueEvent, useTransform, type MotionValue } from 'framer-motion'
import { YouRig } from '../characters/YouRig'
import { StickFigure } from '../rig/StickFigure'
import { YOU_LOOK } from '../rig/looks'
import { ARRIVE_TRACK } from '../rig/tracks'
import { AgentOrb } from '../characters/AgentOrb'
import { OfficeSet } from '../rooms/OfficeSet'
import { StoryClock } from '../StoryClock'

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

const CLOCK: Record<string, string> = {
  'email-meeting': '10:12 am',
  'follow-ups': '2:40 pm',
  'draft-review': '4:20 pm',
  'team-slack': '6:10 pm',
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
  const [walking, setWalking] = useState(true)

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

  useMotionValueEvent(arrive, 'change', (v) => {
    const on = v < 0.72
    setWalking((prev) => (prev === on ? prev : on))
  })

  const arriveOp = useTransform(arrive, [0.55, 1], [1, 0])
  const deskOp = useTransform(arrive, [0.35, 0.85], [0, 1])
  const arriveX = useTransform(arrive, [0, 1], [80, 0])
  const lid = useTransform(slack, [0.88, 1], [0, 1])
  const deskProgress = slackOn ? slack : draftOn ? draft : followOn ? follow : email
  const clock =
    CLOCK[slackOn ? 'team-slack' : draftOn ? 'draft-review' : followOn ? 'follow-ups' : 'email-meeting']

  return (
    <div className="story-work" aria-hidden="true">
      <OfficeSet lid={rm ? undefined : lid} />
      <StoryClock label={clock} />
      {rm ? (
        <>
          <div className="story-work__you">
            <YouRig progress={email} scene="desk" reduceMotion />
          </div>
          {Slack ? <Slack progress={slack} reduceMotion hideYou /> : null}
        </>
      ) : (
        <>
          <motion.div className="story-work__arrive" style={{ opacity: arriveOp, x: arriveX }}>
            {walking ? (
              <StickFigure walk hold="bag" look={YOU_LOOK} />
            ) : (
              <StickFigure progress={arrive} track={ARRIVE_TRACK} look={YOU_LOOK} />
            )}
            <AgentOrb size={28} className="story-work__arrive-orb" />
          </motion.div>
          <motion.div className="story-work__you" style={{ opacity: deskOp }}>
            <YouRig progress={deskProgress} scene="desk" lean={slackOn} />
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
