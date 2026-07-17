const MIN_LENGTH = 10
const MAX_LENGTH = 2000

/** Case-insensitive jailbreak / injection patterns. */
const INJECTION_PATTERNS = [
  /ignore\s+previous\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now/i,
  /disregard/i,
  /forget\s+your\s+instructions/i,
]

export type ValidationResult =
  | { ok: true; prompt: string }
  | { ok: false; error: string; message: string }

/**
 * Trim, length-check, and screen for obvious prompt-injection patterns.
 * On jailbreak match returns error code `invalid_prompt` as specified.
 */
export function validatePrompt(raw: unknown): ValidationResult {
  if (typeof raw !== 'string') {
    return {
      ok: false,
      error: 'empty_prompt',
      message: 'Please describe what you want your agent to do.',
    }
  }

  const prompt = raw.trim()

  if (!prompt) {
    return {
      ok: false,
      error: 'empty_prompt',
      message: 'Please describe what you want your agent to do.',
    }
  }

  if (prompt.length < MIN_LENGTH) {
    return {
      ok: false,
      error: 'too_short',
      message: `Please describe your agent in at least ${MIN_LENGTH} characters.`,
    }
  }

  if (prompt.length > MAX_LENGTH) {
    return {
      ok: false,
      error: 'too_long',
      message: 'Please keep your description under 2000 characters.',
    }
  }

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(prompt)) {
      return {
        ok: false,
        error: 'invalid_prompt',
        message: 'That description is not allowed. Please describe a business agent use case.',
      }
    }
  }

  return { ok: true, prompt }
}
