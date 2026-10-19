/**
 * §0.7 tab indicator (hero + compliance): slideTo(link) =
 * gsap.to(indicator, { x: (link.offsetLeft + link.offsetWidth/2) - (indicator.offsetLeft + indicator.offsetWidth/2),
 *                      duration: .5, ease: "power2.out" })
 * Initial placement and resize re-placement are instant.
 */
import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './core'

export function useTabIndicator(indRef, linkRefs, active) {
  const placed = useRef(false)

  useLayoutEffect(() => {
    const ind = indRef.current
    if (!ind) return
    const calc = () => {
      const link = linkRefs.current[active]
      if (!link) return null
      return link.offsetLeft + link.offsetWidth / 2 - (ind.offsetLeft + ind.offsetWidth / 2)
    }
    const place = () => {
      const x = calc()
      if (x == null) return
      gsap.killTweensOf(ind, 'x')
      gsap.set(ind, { x })
    }
    if (!placed.current || prefersReducedMotion()) {
      place()
      if (!placed.current) document.fonts?.ready.then(place) // web-font swap moves the links once
      placed.current = true
    } else {
      const x = calc()
      if (x != null) gsap.to(ind, { x, duration: 0.5, ease: 'power2.out', overwrite: 'auto' })
    }
    window.addEventListener('resize', place)
    return () => window.removeEventListener('resize', place)
  }, [active, indRef, linkRefs])
}
