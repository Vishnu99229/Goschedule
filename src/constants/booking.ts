import { DEPLOY_AGENT_URL } from './links'

export type BookingPrefill = {
  name?: string
  email?: string
  company?: string
  notes?: string
}

export function buildBookingUrl(prefill?: BookingPrefill): string {
  const url = new URL(DEPLOY_AGENT_URL)

  if (prefill?.name) url.searchParams.set('name', prefill.name)
  if (prefill?.email) url.searchParams.set('email', prefill.email)

  const noteParts: string[] = []
  if (prefill?.company) noteParts.push(`Company: ${prefill.company}`)
  if (prefill?.notes) noteParts.push(prefill.notes)
  if (noteParts.length) url.searchParams.set('notes', noteParts.join('\n'))

  return url.toString()
}

export const CONTACT_EMAIL = 'hello@goschedule.ai'
