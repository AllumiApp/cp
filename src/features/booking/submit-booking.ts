import { supabase } from '@/lib/supabase'
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
 * Single seam for booking submission. Invokes the `send-booking-request` edge
 * function, which records the request in the dashboard inbox and emails Christina
 * + the visitor (templates editable from the dashboard).
 *
 * Throws on failure so the calling page surfaces an error toast.
 */
export async function submitBookingRequest(payload: BookingEmailPayload): Promise<void> {
  if (!supabase) throw new Error('Booking is temporarily unavailable.')
  const { data, error } = await supabase.functions.invoke('send-booking-request', { body: payload })
  if (error) throw new Error(error.message || 'Failed to send request')
  if (!data?.ok) throw new Error(data?.error || 'Failed to send request')
}
