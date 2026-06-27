import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import { en, type Dictionary } from './en'
import { de } from './de'

export type Lang = 'en' | 'de'

const DICTIONARIES: Record<Lang, Dictionary> = { en, de }
const STORAGE_KEY = 'cp-lang'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
  /** Typed dictionary for the current language. Preferred for structured access. */
  d: Dictionary
  /** Convenience resolver for dot-paths to scalar strings, e.g. t('hero.eyebrow'). */
  t: (path: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'en' || stored === 'de') return stored
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang)

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

  const d = DICTIONARIES[lang]

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
    <LanguageContext.Provider value={{ lang, setLang, toggle, d, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within a LanguageProvider')
  return ctx
}
