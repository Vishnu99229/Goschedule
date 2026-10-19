import { BookCallButton } from '../voice/BookingActions'
import { ENDING_CTA } from './storyCopy'

type Props = {
  visible: boolean
}

export function EndingCta({ visible }: Props) {
  if (!visible) return null
  return (
    <div className="story-end-cta">
      <div className="story-hero__actions">
        <BookCallButton className="btn btn-primary story-hero__btn" />
        <a className="story-hero__btn story-hero__btn--ghost" href={ENDING_CTA.whatsappHref}>
          {ENDING_CTA.whatsapp}
        </a>
      </div>
    </div>
  )
}
