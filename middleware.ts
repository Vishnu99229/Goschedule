/** Removed voice APIs: reject leftover /api/* paths before the SPA fallback. */
export default function middleware() {
  return new Response('Not Found', { status: 404 })
}

export const config = {
  matcher: '/api/:path*',
}
