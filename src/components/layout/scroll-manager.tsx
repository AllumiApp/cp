'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Replaces the Vite SiteLayout scroll effect: on route change, scroll to the
 * URL hash target if present, otherwise to the top.
 */
export function ScrollManager() {
  const pathname = usePathname()

  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
