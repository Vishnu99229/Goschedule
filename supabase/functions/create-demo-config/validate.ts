const MIN_LENGTH = 10
const MAX_LENGTH = 2000

export const DEMO_LANGUAGES = ['english', 'hindi', 'malayalam', 'kannada'] as const
export type DemoLanguage = (typeof DEMO_LANGUAGES)[number]

/** Case-insensitive jailbreak / injection patterns. */
const INJECTION_PATTERNS = [
  /ignore\s+previous\s+instructions/i,
  /system\s+prompt/i,
  /you\s+are\s+now/i,
  /disregard/i,
  /forget\s+your\s+instructions/i,
]

export type ValidationResult =
  | { ok: true; prompt: string; language: DemoLanguage }
  | { ok: false; error: string; message: string }

function isDemoLanguage(value: unknown): value is DemoLanguage {
  return typeof value === 'string' && (DEMO_LANGUAGES as readonly string[]).includes(value)
}

/**
 * Validate prompt + language from the request body.
 * Missing language defaults to 'english'. Invalid language → invalid_language.
 */
export function validatePrompt(
  rawPrompt: unknown,
  rawLanguage: unknown,
): ValidationResult {
  // Language first — independent of prompt so clients get a clear code
  let language: DemoLanguage = 'english'
  if (rawLanguage !== undefined && rawLanguage !== null && rawLanguage !== '') {
    if (!isDemoLanguage(rawLanguage)) {
      return {
        ok: false,
        error: 'invalid_language',
        message: 'Language must be english, hindi, malayalam, or kannada.',
      }
    }
    language = rawLanguage
  }

  if (typeof rawPrompt !== 'string') {
    return {
      ok: false,
      error: 'empty_prompt',
      message: 'Please describe what you want your agent to do.',
    }
  }

  const prompt = rawPrompt.trim()

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

  return { ok: true, prompt, language }
}
