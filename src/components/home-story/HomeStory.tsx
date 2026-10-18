import { STORY_BEATS } from './homeStoryScenes'
import { StoryProgress } from './StoryProgress'
import { StoryScenePanel } from './StoryScenePanel'

export default function HomeStory() {
  return (
    <div className="home-story__scroll">
      <StoryProgress />
      {STORY_BEATS.map((beat, index) => (
        <StoryScenePanel key={beat.id} beat={beat} index={index} />
      ))}
    </div>
  )
}
