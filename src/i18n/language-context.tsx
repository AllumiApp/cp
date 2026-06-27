'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react'
import { en, type Dictionary } from './en'
import { de } from './de'
import { fetchCpContent, buildContent, type DbRows, type CpImages, type CpLinks } from '@/content/cp-content'
import type { SessionPackage } from '@/features/booking/booking-config'

export type Lang = 'en' | 'de'

const DICTIONARIES: Record<Lang, Dictionary> = { en, de }
const STORAGE_KEY = 'cp-lang'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  /** Typed dictionary for the current language — DB content merged over the bundled defaults. */
  d: Dictionary
  /** Convenience resolver for dot-paths to scalar strings, e.g. t('hero.eyebrow'). */
  t: (path: string) => string
  /** Section images from the CMS (null → use the component's bundled fallback). */
  images: CpImages
  /** Footer / store / show links from the CMS (null while loading or unconfigured). */
  links: CpLinks | null
  /** Booking packages from the CMS (null → use the bundled booking-config). */
  packages: SessionPackage[] | null
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'de') return stored
  return 'en'
}

export function LanguageProvider({
  children,
  initialRows = null,
}: {
  children: ReactNode
  /** Content fetched server-side (mirrors allumi-website). Null → client refetch fallback. */
  initialRows?: DbRows | null
}) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)
  const [rows, setRows] = useState<DbRows | null>(initialRows)

  // Frontend fallback: if the server didn't supply content (fetch failed or
  // Supabase unconfigured at render time), retry on the client.
  useEffect(() => {
    if (initialRows) return
    let active = true
    fetchCpContent().then((r) => {
      if (active && r) setRows(r)
    })
    return () => {
      active = false
    }
  }, [initialRows])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore storage failures */
    }
  }, [])

  const toggle = useCallback(() => {
    setLang(lang === 'en' ? 'de' : 'en')
  }, [lang, setLang])

  const content = useMemo(() => buildContent(DICTIONARIES[lang], rows, lang), [lang, rows])
  const { d, images, links, packages } = content

  const t = useCallback(
    (path: string): string => {
      const value = path.split('.').reduce<unknown>((acc, key) => {
        if (acc && typeof acc === 'object' && key in acc) {
          return (acc as Record<string, unknown>)[key]
        }
        return undefined
      }, d)
      return typeof value === 'string' ? value : path
    },
    [d],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, d, t, images, links, packages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
