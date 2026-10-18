import { useEffect, useState } from 'react'
import { STORY_SCENE_IDS } from './homeStoryScenes'

export function StoryProgress() {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'))
    if (nodes.length === 0) return

    const ratios = new Map<string, number>()

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.getAttribute('data-scene')
          if (!id) continue
          ratios.set(id, entry.isIntersecting ? entry.intersectionRatio : 0)
        }

        let bestId: string | null = null
        let best = 0
        for (const id of STORY_SCENE_IDS) {
          const r = ratios.get(id) ?? 0
          if (r > best) {
            best = r
            bestId = id
          }
        }
        setActive(best > 0.28 ? bestId : null)
      },
      { threshold: [0.12, 0.28, 0.45, 0.6, 0.8] },
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])

  const visible = active !== null

  return (
    <nav
      className={`story-progress${visible ? '' : ' story-progress--hidden'}`}
      aria-label="Story scenes"
      aria-hidden={!visible}
    >
      <ol className="story-progress__list">
        {STORY_SCENE_IDS.map((id) => (
          <li key={id}>
            <span
              className={`story-progress__dot${active === id ? ' story-progress__dot--active' : ''}`}
            />
          </li>
        ))}
      </ol>
    </nav>
  )
}
