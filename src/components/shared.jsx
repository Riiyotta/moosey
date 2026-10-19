import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTabIndicator } from '../motion/tabs'
import { useSplideTransition } from '../motion/carousel'

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

export function useMediaQuery(query) {
  const get = () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false)
  const [matches, setMatches] = useState(get)
  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])
  return matches
}

export const MQ_MD = '(min-width: 481px)'
export const MQ_LG = '(min-width: 1025px)'

/**
 * Basic carousel stepping (stand-in for Splide: perPage 1, autoWidth, trimSpace).
 * The list is translated by the active slide's offset, clamped so the last slide
 * never leaves empty space. Move easing/speed: useSplideTransition (src/motion/carousel.js).
 */
export function useCarousel(count, enabled = true) {
  const [index, setIndexRaw] = useState(0)
  const [offset, setOffset] = useState(0)
  const trackRef = useRef(null)
  const listRef = useRef(null)
  const drag = useRef(null)

  const setIndex = useCallback(
    (i) => setIndexRaw(Math.max(0, Math.min(count - 1, typeof i === 'function' ? i(index) : i))),
    [count, index],
  )

  const measure = useCallback(() => {
    const track = trackRef.current
    const list = listRef.current
    if (!enabled || !track || !list || !list.children.length) {
      setOffset(0)
      return
    }
    const slides = list.children
    const first = slides[0]
    const last = slides[slides.length - 1]
    const cur = slides[Math.min(index, slides.length - 1)]
    const cs = getComputedStyle(track)
    const view = track.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight)
    const total = last.offsetLeft + last.offsetWidth - first.offsetLeft
    const max = Math.max(0, total - view)
    setOffset(Math.min(cur.offsetLeft - first.offsetLeft, max))
  }, [enabled, index])

  useLayoutEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    document.fonts?.ready.then(measure)
    return () => window.removeEventListener('resize', measure)
  }, [measure])

  useEffect(() => {
    if (!enabled) setIndexRaw(0)
  }, [enabled])

  // Splide move easing (400ms cubic-bezier(0.25,1,0.5,1)) — runs after `measure` so the offset change animates
  useSplideTransition(listRef, index, enabled)

  const trackHandlers = enabled
    ? {
        onPointerDown: (e) => {
          drag.current = e.clientX
        },
        onPointerUp: (e) => {
          if (drag.current == null) return
          const dx = e.clientX - drag.current
          drag.current = null
          if (Math.abs(dx) > 40) setIndex(index + (dx < 0 ? 1 : -1))
        },
        onPointerCancel: () => {
          drag.current = null
        },
      }
    : {}

  return {
    index,
    setIndex,
    prev: () => setIndex(index - 1),
    next: () => setIndex(index + 1),
    trackRef,
    listRef,
    listStyle: enabled ? { transform: `translateX(${-offset}px)` } : undefined,
    trackHandlers,
  }
}

/* ------------------------------------------------------------------ */
/* Tab bar (§0.7) — hero + compliance                                  */
/* ------------------------------------------------------------------ */

/**
 * Indicator x = (link.offsetLeft + link.offsetWidth/2) - (indicator.offsetLeft + indicator.offsetWidth/2),
 * tweened .5s power2.out by useTabIndicator (src/motion/tabs.js).
 */
export function TabBar({ labels, active, onSelect, ulClass, liClass, indicatorClass, renderAfterLabel, name }) {
  const linkRefs = useRef([])
  const indRef = useRef(null)

  useTabIndicator(indRef, linkRefs, active)

  return (
    <ul className={`tab-links relative m-0 flex justify-between ${ulClass}`} data-tab-links={name} role="tablist">
      {labels.map((label, i) => (
        <li
          key={label}
          ref={(el) => (linkRefs.current[i] = el)}
          role="tab"
          aria-selected={i === active}
          tabIndex={0}
          data-anim-item
          onClick={() => onSelect(i)}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelect(i))}
          className={`tab-link flex cursor-pointer items-center pt-9u ${liClass} ${
            i === active ? 'active opacity-100' : 'opacity-40'
          }`}
        >
          <span className="type-segment text-main-green">{label}</span>
          {renderAfterLabel?.(i)}
        </li>
      ))}
      <li aria-hidden="true" className="position-wrap pointer-events-none absolute bottom-0 left-0 flex h-4u w-full items-center">
        <div className="position-line absolute left-0 h-1u w-full bg-green opacity-20" />
        <div
          ref={indRef}
          data-tab-indicator={name}
          className={`position-indicator absolute left-0 h-2u rounded-2u bg-green md:h-full ${indicatorClass}`}
        />
      </li>
    </ul>
  )
}

/* ------------------------------------------------------------------ */
/* Slider chrome (§0.7)                                                */
/* ------------------------------------------------------------------ */

export function Pagination({ count, active, onSelect, className = '-bottom-24u' }) {
  return (
    <ul className={`absolute left-0 right-0 flex items-center justify-center gap-7u px-[16px] ${className}`} data-carousel-pagination>
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="flex h-6u w-6u">
          <button
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => onSelect(i)}
            className={`m-0 h-full w-full rounded-[50%] bg-green ${i === active ? 'is-active opacity-100' : 'opacity-20'}`}
          />
        </li>
      ))}
    </ul>
  )
}

export function SliderArrow({ dir, disabled, onClick }) {
  return (
    <button
      type="button"
      aria-label={dir === 'prev' ? 'Previous slide' : 'Next slide'}
      disabled={disabled}
      onClick={onClick}
      className="relative flex h-32u w-32u items-center justify-center rounded-full transition-all duration-375 ease-[ease] enabled:hover:opacity-90 disabled:opacity-20 lg:h-46u lg:w-46u"
    >
      <div className="arrow-bg absolute left-0 top-0 h-full w-full rounded-[50%] bg-green5 opacity-40" />
      <div className={`svg-container relative flex h-10u w-14u lg:h-14u lg:w-20u ${dir === 'prev' ? '-scale-x-100' : ''}`}>
        <svg viewBox="0 0 16 12" fill="none" className="flex h-full w-full">
          <path d="M1 6h14M10 1l5 5-5 5" className="stroke-green" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  )
}

/* ------------------------------------------------------------------ */
/* Icons (REDRAW)                                                      */
/* ------------------------------------------------------------------ */

/** Accordion chevron — path from spec §0.7 */
export function Chevron({ className = '' }) {
  return (
    <svg viewBox="0 0 17 16" fill="none" className={`block h-full w-full ${className}`}>
      <path d="M5.5 7l3 3 3-3" className="stroke-green" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** 17x17 link arrow used in the mobile menu and tablet/mobile footer */
export function LinkArrow({ className = 'stroke-white' }) {
  return (
    <svg viewBox="0 0 17 17" fill="none" className="block h-full w-full">
      <path d="M3 8.5h11M9.5 4l4.5 4.5L9.5 13" className={className} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Pricing check: filled circle + check (REDRAW) */
export function CheckCircle() {
  return (
    <svg viewBox="0 0 22 22" fill="none" className="absolute left-0 top-0 ml-2 h-full w-full">
      <circle cx="11" cy="11" r="10" className="fill-main-green" />
      <path d="M6.5 11.2l3 3 6-6.4" className="stroke-white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
