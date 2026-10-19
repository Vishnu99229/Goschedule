import HomeStory from '../components/home-story/HomeStory'
import { HOME_STORY_SR_TITLE } from '../components/home-story/homeStoryScenes'

export default function HomePage() {
  return (
    <main id="main-content" className="home-story">
      <h1 className="sr-only">{HOME_STORY_SR_TITLE}</h1>
      <HomeStory />
    </main>
  )
}
