/**
 * Splide 4 move easing (measured live on the original testimonials slider, 2026-10-16):
 * while a move runs the list carries `transition: transform 400ms cubic-bezier(0.25, 1, 0.5, 1)`,
 * removed again once the move ends (so resize re-layout is instant). Splide defaults: speed 400.
 *
 * Also emits `nw:carousel-active` (detail.index) on the list, the stand-in for Splide's "active"
 * event (peace slides play their art on it).
 */
import { useLayoutEffect, useRef } from 'react'
import { prefersReducedMotion } from './core'

export const SPLIDE_TRANSITION = 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)'

export function useSplideTransition(listRef, index, enabled) {
  const prev = useRef(index)
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list || prev.current === index) return
    prev.current = index
    list.dispatchEvent(new CustomEvent('nw:carousel-active', { detail: { index } }))
    if (!enabled || prefersReducedMotion()) return
    list.style.transition = SPLIDE_TRANSITION
    const done = () => {
      list.style.transition = ''
      list.removeEventListener('transitionend', onEnd)
    }
    const onEnd = (e) => e.target === list && done()
    list.addEventListener('transitionend', onEnd)
    const t = setTimeout(done, 450)
    return () => clearTimeout(t)
  }, [index, enabled, listRef])
}
