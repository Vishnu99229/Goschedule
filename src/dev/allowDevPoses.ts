/** Preview + local only. Production builds compile this to false so the route is dropped. */
export const ALLOW_DEV_POSES =
  import.meta.env.DEV || import.meta.env.VITE_VERCEL_ENV === 'preview'
