/**
 * Blog post loader.
 *
 * Eagerly loads every *.md file under `/content/blog/` at build time via
 * Vite's `import.meta.glob` and exposes them as a sorted array (newest
 * first). Adding a new post = drop a new .md file in that folder; no
 * other code changes required.
 */

import { parseFrontmatter, type FaqEntry, type PostFrontmatter } from './frontmatter'

type RawModule = string

const rawModules = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, RawModule>

export type Post = {
  frontmatter: PostFrontmatter
  body: string
  readingMinutes: number
  url: string
  filePath: string
}

const SITE = 'https://www.goschedule.ai'
const WORDS_PER_MIN = 200

function calcReadingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MIN))
}

const POSTS: Post[] = Object.entries(rawModules)
  .map(([filePath, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      frontmatter: data,
      body: content,
      readingMinutes: calcReadingMinutes(content),
      url: `${SITE}/blog/${data.slug}`,
      filePath,
    }
  })
  .filter((p) => Boolean(p.frontmatter.slug))
  .sort((a, b) =>
    a.frontmatter.date < b.frontmatter.date ? 1 : -1
  )

export function getAllPosts(): Post[] {
  return POSTS
}

export function getPostBySlug(slug: string): Post | null {
  return POSTS.find((p) => p.frontmatter.slug === slug) ?? null
}

export function formatPostDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export type { FaqEntry, PostFrontmatter }
