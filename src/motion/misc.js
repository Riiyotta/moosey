/**
 * Motion for specs/misc.md templates.
 *
 * Template A replaces the original's Swiper 8 (unpkg CDN, inline window.onload init, §2.9/§2.11/§10) with a
 * tiny local slider:
 *   - testimonials: { autoplay: { delay: 5000 }, slidesPerView: 1, loop: true, pagination: { clickable: true } }
 *   - pricing:      autoplay every 5s, loop false (rewinds to the first slide at the end), 3 per view at
 *                   viewport >= 1260px, else 1; bullets hidden when every slide fits (Swiper "lock").
 * Swiper defaults kept: speed 300ms, wrapper timing-function `initial` (= CSS `ease`), autoplay
 * disableOnInteraction: true (a bullet click / swipe stops autoplay).
 *
 * gsap tweens on the wrapper's x; everything is reverted on unmount (StrictMode-safe).
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { CustomEase, gsap, prefersReducedMotion } from './core'

/** CSS `ease` = cubic-bezier(.25,.1,.25,1) (Swiper's wrapper transition) */
const CSS_EASE = CustomEase.create('nwCssEase', '.25,.1,.25,1')
const SPEED = 0.3

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function useViewportMatch(query) {
  const [m, setM] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false))
  useEffect(() => {
    const mql = window.matchMedia(query)
    const on = () => setM(mql.matches)
    on()
    mql.addEventListener('change', on)
    return () => mql.removeEventListener('change', on)
  }, [query])
  return m
}

/**
 * @param {object} o
 * @param {number} o.count       real slide count
 * @param {boolean} [o.loop]     Swiper loop (renders one clone at each end; caller renders `slides(clones)`)
 * @param {string} [o.multiQuery] media query at which `multiPerView` slides show
 * @param {number} [o.multiPerView]
 * @param {number} [o.delay]     autoplay delay (ms)
 */
export function useLegacySwiper({ count, loop = false, multiQuery, multiPerView = 1, delay = 5000 }) {
  const multi = useViewportMatch(multiQuery || '(min-width: 99999px)')
  const perView = multiQuery && multi ? multiPerView : 1
  const maxReal = loop ? count - 1 : Math.max(0, count - perView)
  const locked = !loop && maxReal === 0 // Swiper "lock": nothing to slide, pagination hidden

  const viewportRef = useRef(null)
  const wrapperRef = useRef(null)
  const [active, setActive] = useState(0)
  const s = useRef({ v: loop ? 1 : 0, autoplay: true, timer: 0, tween: null, drag: null })

  const slideW = () => (viewportRef.current ? viewportRef.current.clientWidth / perView : 0)
  const place = useCallback(() => {
    if (wrapperRef.current) gsap.set(wrapperRef.current, { x: -s.current.v * slideW() })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perView])

  const moveTo = useCallback(
    (v, onDone) => {
      const st = s.current
      st.v = v
      st.tween?.kill()
      const dur = prefersReducedMotion() ? 0 : SPEED
      st.tween = gsap.to(wrapperRef.current, { x: -v * slideW(), duration: dur, ease: CSS_EASE, onComplete: onDone })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [perView],
  )

  const schedule = useRef(() => {})
  const goTo = useCallback(
    (real, { user = false, dir = 0 } = {}) => {
      const st = s.current
      if (user) {
        st.autoplay = false // disableOnInteraction: true
        clearTimeout(st.timer)
      }
      if (loop) {
        const cur = st.v - 1
        let target = real + 1
        // wrap through the clones so the move keeps its direction
        if (dir > 0 && cur === count - 1 && real === 0) target = count + 1
        if (dir < 0 && cur === 0 && real === count - 1) target = 0
        setActive(real)
        moveTo(target, () => {
          if (st.v === count + 1 || st.v === 0) {
            st.v = st.v === 0 ? count : 1
            place()
          }
          schedule.current()
        })
      } else {
        const r = Math.max(0, Math.min(maxReal, real))
        setActive(r)
        moveTo(r, () => schedule.current())
      }
    },
    [count, loop, maxReal, moveTo, place],
  )

  schedule.current = () => {
    const st = s.current
    clearTimeout(st.timer)
    if (!st.autoplay || locked || count < 2 || prefersReducedMotion()) return
    st.timer = setTimeout(() => {
      const cur = loop ? (st.v - 1 + count) % count : st.v
      if (loop) goTo((cur + 1) % count, { dir: 1 })
      else goTo(cur >= maxReal ? 0 : cur + 1) // non-loop autoplay rewinds at the end
    }, delay)
  }

  // initial position + re-place on resize / perView change
  useIsoLayoutEffect(() => {
    const st = s.current
    st.v = loop ? Math.min(st.v, count) : Math.min(st.v, maxReal)
    if (!loop) setActive(st.v)
    place()
    const onResize = () => place()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [place, loop, count, maxReal])

  // autoplay lifecycle
  useEffect(() => {
    const st = s.current
    schedule.current()
    return () => {
      clearTimeout(st.timer)
      st.tween?.kill()
      if (wrapperRef.current) gsap.set(wrapperRef.current, { clearProps: 'transform' })
    }
  }, [locked, perView])

  const dragHandlers = {
    onPointerDown: (e) => {
      s.current.drag = e.clientX
    },
    onPointerUp: (e) => {
      const st = s.current
      if (st.drag == null) return
      const dx = e.clientX - st.drag
      st.drag = null
      if (Math.abs(dx) < 40 || locked) return
      const cur = loop ? (st.v - 1 + count) % count : st.v
      const dir = dx < 0 ? 1 : -1
      if (loop) goTo((cur + dir + count) % count, { user: true, dir })
      else goTo(cur + dir, { user: true })
    },
    onPointerCancel: () => {
      s.current.drag = null
    },
  }

  return { viewportRef, wrapperRef, active, perView, locked, goTo: (i) => goTo(i, { user: true }), dragHandlers }
}
