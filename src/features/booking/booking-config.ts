import type { Lang } from '@/i18n/language-context'

export type PackageId = 'single' | 'journey-3' | 'transformation-6'

export interface SessionPackage {
  id: PackageId
  sessionCount: number
  /** Price in EUR cents (VAT-inclusive). */
  price: number
  currency: 'EUR'
  /** Session length in minutes. */
  duration: number
  segment: Record<Lang, string>
  name: Record<Lang, string>
  description: Record<Lang, string>
  included: Record<Lang, string[]>
}

/**
 * Static source of truth for the booking funnel.
 * Single Session copy + price (€120) are from the Paper design.
 * The 3- and 6-session prices are PLACEHOLDERS — confirm with Christina.
 * Real availability/scheduling is wired later; TIME_SLOTS is static design data.
 */
export const PACKAGES: SessionPackage[] = [
  {
    id: 'single',
    sessionCount: 1,
    price: 12000, // €120 — from the design
    currency: 'EUR',
    duration: 60,
    segment: { en: 'Single session', de: 'Einzelsitzung' },
    name: { en: 'Single Session', de: 'Einzelsitzung' },
    description: {
      en: "A focused, private hour to untangle what's on your mind and leave with a clear, doable next step. Perfect to begin — or whenever you need a reset.",
      de: 'Eine fokussierte, private Stunde, um zu entwirren, was dich beschäftigt, und mit einem klaren, machbaren nächsten Schritt zu gehen. Ideal zum Start — oder wann immer du einen Reset brauchst.',
    },
    included: {
      en: [
        '60 minutes, 1:1 over Zoom',
        'A focus we set before we meet',
        'Personal takeaways & next steps',
        'Free rescheduling up to 24h before',
      ],
      de: [
        '60 Minuten, 1:1 über Zoom',
        'Ein Fokus, den wir vorab setzen',
        'Persönliche Erkenntnisse & nächste Schritte',
        'Kostenloses Verschieben bis 24h vorher',
      ],
    },
  },
  {
    id: 'journey-3',
    sessionCount: 3,
    price: 33000, // ~€330 PLACEHOLDER
    currency: 'EUR',
    duration: 60,
    segment: { en: '3-session journey', de: '3er-Reise' },
    name: { en: '3-Session Journey', de: '3er-Reise' },
    description: {
      en: 'Three sessions with a guiding thread, so a real change has the continuity and momentum to take hold between calls.',
      de: 'Drei Sitzungen mit rotem Faden, damit echte Veränderung die Kontinuität und den Schwung bekommt, um zwischen den Gesprächen zu greifen.',
    },
    included: {
      en: [
        'Three 60-minute 1:1 sessions',
        'A guiding thread across all three',
        'Practices between sessions',
        'Email support along the way',
      ],
      de: [
        'Drei 60-minütige 1:1 Sitzungen',
        'Ein roter Faden über alle drei',
        'Übungen zwischen den Sitzungen',
        'E-Mail-Begleitung unterwegs',
      ],
    },
  },
  {
    id: 'transformation-6',
    sessionCount: 6,
    price: 60000, // ~€600 PLACEHOLDER
    currency: 'EUR',
    duration: 60,
    segment: { en: '6-session transformation', de: '6er-Transformation' },
    name: { en: '6-Session Transformation', de: '6er-Transformation' },
    description: {
      en: 'A full transformation arc — deep, sustained work for lasting change, with tailored practices and a closing integration session.',
      de: 'Ein kompletter Transformationsbogen — tiefe, nachhaltige Arbeit für bleibende Veränderung, mit maßgeschneiderten Übungen und einer abschließenden Integrationssitzung.',
    },
    included: {
      en: [
        'Six 60-minute 1:1 sessions',
        'A full transformation arc',
        'Tailored practices & reflections',
        'A closing integration session',
      ],
      de: [
        'Sechs 60-minütige 1:1 Sitzungen',
        'Ein kompletter Transformationsbogen',
        'Maßgeschneiderte Übungen & Reflexionen',
        'Eine abschließende Integrationssitzung',
      ],
    },
  },
]

export function getPackage(id: PackageId): SessionPackage {
  const pkg = PACKAGES.find((p) => p.id === id)
  if (!pkg) throw new Error(`Unknown package: ${id}`)
  return pkg
}
