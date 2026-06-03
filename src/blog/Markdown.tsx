/**
 * Markdown renderer for blog post bodies.
 *
 * Renders the raw markdown to semantic HTML using react-markdown +
 * remark-gfm. Elements are styled by `.markdown` CSS rules in index.css
 * so post bodies pick up the site's existing typography tokens.
 */

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { ComponentPropsWithoutRef } from 'react'

interface MarkdownProps {
  children: string
}

function slugify(input: string): string {
  return String(input)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function extractText(node: unknown): string {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node && typeof node === 'object' && 'props' in (node as Record<string, unknown>)) {
    const props = (node as { props: { children?: unknown } }).props
    return extractText(props.children)
  }
  return ''
}

export default function Markdown({ children }: MarkdownProps) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children, ...rest }) => {
            const id = slugify(extractText(children))
            return (
              <h1 id={id} className="markdown__h1" {...rest}>
                {children}
              </h1>
            )
          },
          h2: ({ children, ...rest }) => {
            const id = slugify(extractText(children))
            return (
              <h2 id={id} className="markdown__h2" {...rest}>
                {children}
              </h2>
            )
          },
          h3: ({ children, ...rest }) => {
            const id = slugify(extractText(children))
            return (
              <h3 id={id} className="markdown__h3" {...rest}>
                {children}
              </h3>
            )
          },
          p: ({ children, ...rest }) => (
            <p className="markdown__p" {...rest}>
              {children}
            </p>
          ),
          ul: ({ children, ...rest }) => (
            <ul className="markdown__ul" {...rest}>
              {children}
            </ul>
          ),
          ol: ({ children, ...rest }) => (
            <ol className="markdown__ol" {...rest}>
              {children}
            </ol>
          ),
          li: ({ children, ...rest }) => (
            <li className="markdown__li" {...rest}>
              {children}
            </li>
          ),
          blockquote: ({ children, ...rest }) => (
            <blockquote className="markdown__blockquote" {...rest}>
              {children}
            </blockquote>
          ),
          a: ({ children, href, ...rest }: ComponentPropsWithoutRef<'a'>) => {
            const isExternal =
              typeof href === 'string' &&
              /^https?:\/\//.test(href) &&
              !href.startsWith('https://www.goschedule.ai') &&
              !href.startsWith('https://goschedule.ai')
            return (
              <a
                href={href}
                className="markdown__a"
                {...(isExternal
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                {...rest}
              >
                {children}
              </a>
            )
          },
          strong: ({ children, ...rest }) => (
            <strong className="markdown__strong" {...rest}>
              {children}
            </strong>
          ),
          em: ({ children, ...rest }) => (
            <em className="markdown__em" {...rest}>
              {children}
            </em>
          ),
          code: ({ children, ...rest }) => (
            <code className="markdown__code" {...rest}>
              {children}
            </code>
          ),
          pre: ({ children, ...rest }) => (
            <pre className="markdown__pre" {...rest}>
              {children}
            </pre>
          ),
          hr: (props) => <hr className="markdown__hr" {...props} />,
          img: ({ alt, src, ...rest }: ComponentPropsWithoutRef<'img'>) => (
            <img
              alt={alt ?? ''}
              src={src}
              loading="lazy"
              decoding="async"
              className="markdown__img"
              {...rest}
            />
          ),
          table: ({ children, ...rest }) => (
            <div className="markdown__table-wrap">
              <table className="markdown__table" {...rest}>
                {children}
              </table>
            </div>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
