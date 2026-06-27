import type { BookingRequestPayload } from './booking-context'

/**
 * Single seam for booking submission.
 *
 * Phase 1 (now): no backend — this resolves after a short delay and logs the
 * payload so we can confirm the exact data the email will carry.
 *
 * Phase 2 (later): swap the body for a real send (Resend / Supabase edge
 * function / Cloudflare email) + persist the request row. The signature and
 * the calling component do NOT need to change.
 */
export async function submitBookingRequest(payload: BookingRequestPayload): Promise<void> {
  console.debug('[booking] request payload (email send stubbed):', payload)
  await new Promise((resolve) => setTimeout(resolve, 700))
}
