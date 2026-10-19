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
