import { Link } from 'react-router-dom'
import Logo from '../Logo'

/** Home-only chrome: mark without wordmark, fixed top-left. */
export function HomeStoryLogo() {
  return (
    <Link
      to="/"
      className="home-story__logo"
      aria-label="Goschedule.ai home"
    >
      <Logo variant="mark-only" size={28} />
    </Link>
  )
}
