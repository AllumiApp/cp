/**
 * Shared style tokens so buttons and type stay consistent across the site.
 * The primary pill mirrors the hero CTA the user signed off on:
 * compact on mobile (px-5 py-3 / text-sm), full size from `sm:` up.
 */

/** Gold primary pill button. Compose with cn() to add w-full, gap, etc. */
export const btnPrimary =
  'inline-flex items-center justify-center rounded-full bg-gold px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:px-9 sm:py-[17px] sm:text-base'

/** Dark primary pill button (same geometry as btnPrimary). */
export const btnDark =
  'inline-flex items-center justify-center rounded-full bg-dark px-5 py-3 text-sm font-semibold text-cream transition-opacity hover:opacity-90 sm:px-9 sm:py-[17px] sm:text-base'

/** Standard section heading scale (smaller on mobile, full size on desktop). */
export const sectionHeading =
  'font-serif font-bold tracking-[-0.02em] text-dark text-[30px] md:text-[40px] lg:text-[46px]'

/** Standard section lead paragraph / subtitle size. */
export const sectionLead =
  'text-base leading-[26px] text-dark/65 sm:text-[17px] sm:leading-[28px]'
