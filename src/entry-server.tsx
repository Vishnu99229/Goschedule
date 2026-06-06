import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'

/**
 * Build-time (Node) render entry for static prerendering.
 *
 * Renders the app's BODY for a given route to an HTML string. The <head> is
 * owned entirely by `scripts/postbuild.mjs`; `scripts/prerender.mjs` only
 * injects this body into the existing (head-correct) dist HTML. The <SEO>
 * component emits no head elements (it mirrors postbuild's tags in place on the
 * client), so nothing head-related is rendered here.
 */
export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
}
