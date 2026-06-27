import { useState } from 'react'
import { cn } from '@/lib/utils'

export interface AccordionItemData {
  q: string
  a: string
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="flex w-full flex-col border-b border-[#2C18101F]">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={i} className={cn(i > 0 && 'border-t border-[#2C18101F]')}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 py-7 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-serif text-lg font-bold leading-7 text-dark md:text-[22px]">{item.q}</span>
              <span
                className={cn(
                  'w-6 shrink-0 text-center text-2xl leading-[30px]',
                  isOpen ? 'font-medium text-gold' : 'text-dark/35',
                )}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] pb-7 opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-180 text-base leading-[26px] text-dark/65">{item.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
