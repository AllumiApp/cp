import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Full-bleed width with the Paper / allumi-website side padding
 * (16 · 40 · 80px). No max-width — content spans the full viewport.
 */
export function Container({
  className,
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn('w-full px-4 md:px-10 lg:px-20', className)}>{children}</div>
  )
}
