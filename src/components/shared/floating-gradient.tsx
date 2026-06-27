import { useEffect, useRef } from 'react'

/**
 * Signature animated rose/terracotta blob behind the hero and page headers.
 * Colors ported from the Paper design. The blob centers itself inside its
 * offset parent (top/left 50%), so the CALLER positions/sizes the parent box
 * to control where it sits.
 */
const variants = {
  large: {
    size: 750,
    outerGradient:
      'radial-gradient(circle at 50% 50%, rgba(210, 140, 130, 0.30) 0%, rgba(210, 140, 130, 0.15) 40%, rgba(210, 140, 130, 0) 70%)',
    innerGradient:
      'radial-gradient(circle at 50% 50%, rgba(190, 115, 95, 0.25) 0%, rgba(190, 115, 95, 0.10) 40%, rgba(190, 115, 95, 0) 70%)',
  },
  small: {
    size: 265,
    outerGradient:
      'radial-gradient(circle at 50% 50%, rgba(210, 140, 130, 0.28) 0%, rgba(210, 140, 130, 0.13) 40%, rgba(210, 140, 130, 0) 70%)',
    innerGradient:
      'radial-gradient(circle at 50% 50%, rgba(190, 115, 95, 0.22) 0%, rgba(190, 115, 95, 0.09) 40%, rgba(190, 115, 95, 0) 70%)',
  },
}

export function FloatingGradient({ variant = 'large' }: { variant?: 'large' | 'small' }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isDesktop = window.innerWidth >= 1024
    const base = variants[variant].size
    const size = isDesktop ? base : Math.round(base * 0.7)
    const innerSize = Math.round(size * 0.93)

    el.style.width = `${size}px`
    el.style.height = `${size}px`

    const inner = el.querySelector('[data-inner]') as HTMLElement | null
    if (inner) {
      inner.style.width = `${innerSize}px`
      inner.style.height = `${innerSize}px`
    }

    // The large hero blob drifts widely side-to-side (matches allumi-website);
    // the small page-header blob keeps a narrower range (it sits in a clipped half-width box).
    const xRange1 = variant === 'large' ? (isDesktop ? 550 : 80) : isDesktop ? 220 : 60
    const xRange2 = variant === 'large' ? (isDesktop ? 300 : 50) : isDesktop ? 120 : 40
    // The smaller (page-header) blob drifts 15% less vertically than the hero.
    const yFactor = variant === 'small' ? 0.85 : 1
    const yRange1 = (isDesktop ? 24 : 14) * yFactor
    const yRange2 = (isDesktop ? 14 : 9) * yFactor

    let animId: number
    const startTime = performance.now()

    function animate() {
      const t = (performance.now() - startTime) / 1000
      const x = Math.sin(t * 0.2) * xRange1 + Math.cos(t * 0.13) * xRange2
      const y = Math.cos(t * 0.18) * yRange1 + Math.sin(t * 0.11) * yRange2
      const rotate = Math.sin(t * 0.09) * 3
      el!.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotate}deg)`
      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [variant])

  const v = variants[variant]

  return (
    <div ref={ref} className="absolute left-1/2 top-1/2 will-change-transform">
      <div className="absolute inset-0 rounded-full" style={{ background: v.outerGradient }} />
      <div data-inner className="absolute right-10 top-2 rounded-full" style={{ background: v.innerGradient }} />
    </div>
  )
}
