import type { Lang } from '@/i18n/language-context'

/** Format a price given in EUR cents → localized currency string. */
export function formatPrice(cents: number, lang: Lang = 'de'): string {
  return new Intl.NumberFormat(lang === 'de' ? 'de-DE' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100)
}
