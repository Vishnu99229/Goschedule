/**
 * Per-IP rate limit via Upstash Redis REST.
 * Limit: 5 demos per hour (vs generate-agent-demo's 5 per 60 seconds).
 * Fail-open if Upstash is unset or unreachable — same pattern as generate-agent-demo.
 */

const LIMIT = 5
const WINDOW_SECONDS = 60 * 60 // 1 hour

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retry_after_minutes: number }

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const upstashUrl = Deno.env.get('UPSTASH_REDIS_REST_URL')
  const upstashToken = Deno.env.get('UPSTASH_REDIS_REST_TOKEN')

  // If Upstash is not configured, skip rate limiting
  if (!upstashUrl || !upstashToken) return { allowed: true }

  try {
    const key = `demo_config_rl:${ip}`
    const headers = { Authorization: `Bearer ${upstashToken}` }

    // INCR counter (Upstash REST: GET /incr/<key>)
    const res = await fetch(`${upstashUrl}/incr/${encodeURIComponent(key)}`, { headers })
    if (!res.ok) return { allowed: true }

    const { result: count } = await res.json()

    // On first hit, set 1-hour fixed window — fire and forget
    if (count === 1) {
      fetch(
        `${upstashUrl}/expire/${encodeURIComponent(key)}/${WINDOW_SECONDS}`,
        { headers },
      ).catch(() => {})
    }

    if (count <= LIMIT) return { allowed: true }

    // Best-effort TTL for retry_after_minutes; fall back to full window
    let retryAfterMinutes = Math.ceil(WINDOW_SECONDS / 60)
    try {
      const ttlRes = await fetch(
        `${upstashUrl}/ttl/${encodeURIComponent(key)}`,
        { headers },
      )
      if (ttlRes.ok) {
        const { result: ttl } = await ttlRes.json()
        if (typeof ttl === 'number' && ttl > 0) {
          retryAfterMinutes = Math.max(1, Math.ceil(ttl / 60))
        }
      }
    } catch {
      // keep default
    }

    return { allowed: false, retry_after_minutes: retryAfterMinutes }
  } catch {
    // Fail open: if Redis is unreachable, allow the request
    return { allowed: true }
  }
}
