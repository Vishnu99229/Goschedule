/**
 * Minimal, dependency-free YAML frontmatter parser.
 *
 * We own every blog post so the frontmatter shape is fixed and small.
 * gray-matter pulls in Node-only deps (Buffer, section-matter) that need
 * polyfilling in Vite browser builds — not worth the hassle for the
 * tiny YAML dialect we actually use.
 *
 * Supported:
 *   key: "string"        → string
 *   key: 'string'        → string
 *   key: bare-string     → string
 *   key:                 → starts a list of objects
 *     - subkey: value
 *       another: value
 *     - subkey: value
 *
 * Everything else is treated as a bare string. No nested mappings beyond
 * the single faqs[] list, no anchors, no multi-line scalars.
 */

export type FaqEntry = { question: string; answer: string }

export type PostFrontmatter = {
  title: string
  description: string
  slug: string
  date: string
  author: string
  excerpt?: string
  focusKeyword?: string
  coverImage?: string
  ogImage?: string
  coverAlt?: string
  faqs?: FaqEntry[]
}

export type ParsedMarkdown = {
  data: PostFrontmatter
  content: string
}

function unquote(raw: string): string {
  const s = raw.trim()
  if (s.length >= 2 && s.startsWith('"') && s.endsWith('"')) {
    return s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
  }
  if (s.length >= 2 && s.startsWith("'") && s.endsWith("'")) {
    return s.slice(1, -1)
  }
  return s
}

export function parseFrontmatter(raw: string): ParsedMarkdown {
  const m = raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/)
  if (!m) {
    return { data: {} as PostFrontmatter, content: raw }
  }

  const [, yaml, body] = m
  const data: Record<string, unknown> = {}
  const lines = yaml.split(/\r?\n/)

  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i++
      continue
    }

    const kv = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/)
    if (!kv) {
      i++
      continue
    }

    const key = kv[1]
    const valuePart = kv[2]

    if (valuePart.trim() === '') {
      const arr: Record<string, string>[] = []
      i++
      let current: Record<string, string> | null = null
      while (i < lines.length) {
        const nl = lines[i]
        if (!nl.trim()) {
          i++
          continue
        }
        if (/^[A-Za-z_]/.test(nl)) break

        const itemStart = nl.match(/^\s*-\s*([A-Za-z_][\w-]*)\s*:\s*(.*)$/)
        const itemCont = nl.match(/^\s+([A-Za-z_][\w-]*)\s*:\s*(.*)$/)

        if (itemStart) {
          if (current) arr.push(current)
          current = {}
          current[itemStart[1]] = unquote(itemStart[2])
        } else if (itemCont && current) {
          current[itemCont[1]] = unquote(itemCont[2])
        }
        i++
      }
      if (current) arr.push(current)
      data[key] = arr
    } else {
      data[key] = unquote(valuePart)
      i++
    }
  }

  return { data: data as PostFrontmatter, content: body }
}
