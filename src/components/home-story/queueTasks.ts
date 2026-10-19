import type { ComponentType } from 'react'
import {
  BillIcon,
  ChatBubbleIcon,
  DraftPageIcon,
  EnvelopeIcon,
  PaperPlaneIcon,
  ReceiptIcon,
} from './icons/StoryIcons'
import type { StorySceneId } from './homeStoryScenes'

type IconProps = { className?: string; size?: number }

export const QUEUE_TASKS: {
  id: StorySceneId
  Icon: ComponentType<IconProps>
}[] = [
  { id: 'subscription', Icon: ReceiptIcon },
  { id: 'mom-bills', Icon: BillIcon },
  { id: 'email-meeting', Icon: EnvelopeIcon },
  { id: 'follow-ups', Icon: PaperPlaneIcon },
  { id: 'draft-review', Icon: DraftPageIcon },
  { id: 'team-slack', Icon: ChatBubbleIcon },
]

export const QUEUE_ORDER = QUEUE_TASKS.map((task) => task.id)

/** Check this scene and every earlier queue item so ticks never skip ahead. */
export function completeInOrder(prev: Set<string>, id: string): Set<string> {
  const next = new Set(prev)
  const i = QUEUE_ORDER.indexOf(id as StorySceneId)
  if (i === -1) {
    next.add(id)
    return next
  }
  for (let k = 0; k <= i; k++) next.add(QUEUE_ORDER[k])
  return next
}
