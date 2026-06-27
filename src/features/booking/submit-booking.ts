import { sendBookingRequest } from '@/app/actions/send-booking-request'
import type { Lang } from '@/i18n/language-context'
import type { CustomerDetails } from './booking-context'

export interface BookingEmailPayload {
  packageSlug: string
  /** Localized package name as the visitor saw it. */
  packageName: string
  /** Localized, formatted price string (e.g. "€120"). */
  packagePrice: string
  customer: CustomerDetails
  lang: Lang
}

/**
 * Single seam for booking submission. Calls the Next.js server action, which
 * emails Christina + the visitor (templates editable from the dashboard) and
 * records the request in the dashboard inbox.
 *
 * Throws on failure so the calling page surfaces an error toast.
 */
export async function submitBookingRequest(payload: BookingEmailPayload): Promise<void> {
  const result = await sendBookingRequest(payload)
  if (!result.ok) throw new Error(result.emailError || 'Failed to send request')
}
