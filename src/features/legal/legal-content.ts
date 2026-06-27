export type LegalSlug = 'impressum' | 'datenschutz' | 'agb' | 'widerruf'

export const LEGAL_SLUGS: LegalSlug[] = ['impressum', 'datenschutz', 'agb', 'widerruf']

export interface LegalSection {
  heading: string
  lines: string[]
}

/**
 * Placeholder legal copy mirroring the Paper "Legal template" artboard. The
 * Paper design itself notes the final wording (Impressum, Datenschutz, AGB,
 * Widerruf) is to be provided by Christina's Steuerberater / lawyer before
 * launch — these German sections are structural placeholders only.
 */
const CONTENT: Record<LegalSlug, LegalSection[]> = {
  impressum: [
    {
      heading: 'Angaben gemäß § 5 DDG',
      lines: ['Christina Pfeiffer', '[Straße & Hausnummer]', '[PLZ] [Ort]', 'Deutschland'],
    },
    {
      heading: 'Kontakt',
      lines: ['Telefon: [+49 … ]', 'E-Mail: hello@christinapfeiffer.com'],
    },
    {
      heading: 'Umsatzsteuer-ID',
      lines: [
        'Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz: [DE …]. Hinweis: Sofern die Kleinunternehmerregelung nach § 19 UStG gilt, wird keine Umsatzsteuer ausgewiesen — finale Angabe durch die Steuerberatung.',
      ],
    },
    {
      heading: 'Redaktionell verantwortlich',
      lines: ['Christina Pfeiffer, Anschrift wie oben.'],
    },
    {
      heading: 'EU-Streitschlichtung',
      lines: [
        'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr. Unsere E-Mail-Adresse finden Sie oben im Impressum.',
      ],
    },
    {
      heading: 'Verbraucherstreitbeilegung',
      lines: [
        'Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
      ],
    },
  ],
  datenschutz: [
    {
      heading: 'Datenschutz auf einen Blick',
      lines: [
        'Der Schutz deiner persönlichen Daten ist mir ein wichtiges Anliegen. Diese Erklärung informiert über die Verarbeitung personenbezogener Daten auf dieser Website.',
      ],
    },
    {
      heading: 'Verantwortliche Stelle',
      lines: ['Christina Pfeiffer', '[Anschrift wie im Impressum]', 'E-Mail: hello@christinapfeiffer.com'],
    },
    {
      heading: 'Buchungsanfragen',
      lines: [
        'Bei einer Buchungsanfrage werden Name, E-Mail-Adresse und freiwillige Angaben zum Anliegen verarbeitet, um deine Sitzung zu organisieren. Eine Weitergabe an Dritte erfolgt nicht.',
      ],
    },
  ],
  agb: [
    {
      heading: 'Geltungsbereich',
      lines: ['Diese Bedingungen gelten für alle Coaching-Leistungen von Christina Pfeiffer.'],
    },
    {
      heading: 'Leistungen',
      lines: [
        'Coaching ist eine Begleitung zur persönlichen Entwicklung und ersetzt keine medizinische oder therapeutische Behandlung.',
      ],
    },
    {
      heading: 'Termine & Zahlung',
      lines: [
        'Termine werden nach Anfrage per E-Mail bestätigt. Zahlungsdetails werden nach der Bestätigung mitgeteilt.',
      ],
    },
  ],
  widerruf: [
    {
      heading: 'Widerrufsrecht',
      lines: [
        'Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.',
      ],
    },
    {
      heading: 'Folgen des Widerrufs',
      lines: [
        'Im Falle eines wirksamen Widerrufs werden bereits geleistete Zahlungen unverzüglich zurückerstattet.',
      ],
    },
  ],
}

export function isLegalSlug(value: string | undefined): value is LegalSlug {
  return !!value && (LEGAL_SLUGS as string[]).includes(value)
}

export function getLegalSections(slug: LegalSlug): LegalSection[] {
  return CONTENT[slug]
}
