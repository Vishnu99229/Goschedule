import { BookCallButton } from '../voice/BookingActions'
import { STORY_HERO } from './storyCopy'

export function StoryHero() {
  return (
    <header className="story-hero">
      <h1 className="story-hero__h1">{STORY_HERO.h1}</h1>
      <p className="story-hero__sub">{STORY_HERO.sub}</p>
      <div className="story-hero__actions">
        <BookCallButton className="btn btn-primary story-hero__btn" />
        <a className="story-hero__btn story-hero__btn--ghost" href="#subscription">
          {STORY_HERO.seeDay}
        </a>
      </div>
    </header>
  )
}
