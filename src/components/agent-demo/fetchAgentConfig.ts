import type {
  AssistantConfig,
  CreateDemoConfigError,
  CreateDemoConfigResponse,
  DemoLanguage,
} from './types'
import { DemoConfigError } from './types'

/**
 * Fetch a transient Vapi assistant config from the create-demo-config edge function.
 */
export async function fetchAgentConfig(
  prompt: string,
  language: DemoLanguage = 'english',
): Promise<AssistantConfig> {
  const baseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

  if (!baseUrl || !anonKey) {
    throw new DemoConfigError('edge_fn_error', 'Something went wrong — try again.')
  }

  let res: Response
  try {
    res = await fetch(`${baseUrl}/functions/v1/create-demo-config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
      },
      body: JSON.stringify({ prompt, language }),
    })
  } catch {
    throw new DemoConfigError('edge_fn_error', 'Something went wrong — try again.')
  }

  let data: CreateDemoConfigResponse | CreateDemoConfigError | null = null
  try {
    data = await res.json()
  } catch {
    throw new DemoConfigError('edge_fn_error', 'Something went wrong — try again.')
  }

  if (res.status === 429) {
    const minutes =
      data && 'retry_after_minutes' in data && typeof data.retry_after_minutes === 'number'
        ? data.retry_after_minutes
        : 60
    throw new DemoConfigError(
      'rate_limited',
      `You've hit the demo limit. Try again in ${minutes} minutes.`,
      minutes,
    )
  }

  if (!res.ok) {
    const code =
      data && 'error' in data && typeof data.error === 'string' ? data.error : 'edge_fn_error'

    if (code === 'invalid_prompt') {
      throw new DemoConfigError(code, 'Please describe a real use case for your agent.')
    }
    if (code === 'invalid_language') {
      throw new DemoConfigError(code, 'Please choose a supported language.')
    }
    if (code === 'too_short') {
      throw new DemoConfigError(code, 'Please describe your agent in at least 10 characters.')
    }
    if (code === 'too_long') {
      throw new DemoConfigError(code, 'Please keep your description under 2000 characters.')
    }

    throw new DemoConfigError('edge_fn_error', 'Something went wrong — try again.')
  }

  if (!data || !('config' in data) || !data.config) {
    throw new DemoConfigError('edge_fn_error', 'Something went wrong — try again.')
  }

  return data.config
}
