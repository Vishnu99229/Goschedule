import { STORY_BEATS } from './homeStoryScenes'
import { StoryScenePanel } from './StoryScenePanel'

export default function HomeStory() {
  return (
    <div className="home-story__scroll">
      {STORY_BEATS.map((beat, index) => (
        <StoryScenePanel key={beat.id} beat={beat} index={index} />
      ))}
    </div>
  )
}
