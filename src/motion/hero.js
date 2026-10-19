/**
 * §3 Hero — port of the original HeroSection (index.html-ByEF1glV.js, class `g` + popup `T` + tab item `A`).
 *
 * - Section activation: base trigger "top bottom-=25%" / "bottom top-=25%".
 * - Auto-advance interval = current tab visual duration (16.40 / 13.97 / 2.83s desktop, 2.80s tab 3 on tablet/mobile).
 * - Timer ring: set opacity 1 -> "--percent" 0->100 linear over the interval -> opacity 0.
 * - Tab switch (syncActivate: out THEN in): out .image-block {scale 1->.86, autoAlpha 1->0, .267s, Eas49},
 *   in {scale .86->1, autoAlpha 0->1, .3s, Eas1739}. Clicks are ignored while switching (_isSwitching).
 * - Popup open/close timelines verbatim (f(n) = n/60).
 */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { $, $$, E, MQ, f, gsap, sectionTrigger } from './core'
import { DUR, builders, createVisual, svgRoot } from './visuals'

export function useHeroMotion(active, setActive) {
  const api = useRef(null)
  const activeRef = useRef(active)
  const setRef = useRef(setActive)
  setRef.current = setActive

  useLayoutEffect(() => {
    const section = document.getElementById('homepage-hero')
    if (!section) return
    const mm = gsap.matchMedia()
    mm.add({ isDesktop: MQ.isDesktop, isTablet: MQ.isTablet, isMobile: MQ.isMobile, reduce: MQ.reduce }, (ctx) => {
      const { isDesktop, reduce } = ctx.conditions
      const items = $$('[data-tab-item]', section)
      const last = items.length - 1
      const blocks = items.map((li) => $('[data-hero-visual]', li))
      // the popup drops the *lottie wrap* of the last tab, not the image-block
      const wraps = items.map((li) => $(isDesktop ? '.bodymovin-wrap' : '.bodymovin-wrap-mobile', li))
      const durs = isDesktop ? DUR.heroDesktop : DUR.heroMobile
      const visuals = items.map((_, i) =>
        createVisual(svgRoot(`hero-tab-${i + 1}${isDesktop ? '' : '-m'}`), builders.heroTab[i], { duration: durs[i], reduced: reduce }),
      )
      const popupVisual = isDesktop ? createVisual(svgRoot('hero-popup'), builders.heroPopup, { duration: 1, reduced: reduce }) : null
      const timers = $$('[data-timer-ring]', section)
      const popup = $('[data-hero-popup]', section)
      const popCard = $('[data-hero-popup-card]', section)
      const lineL = $('[data-hero-popup-line="left"]', section)
      const lineR = $('[data-hero-popup-line="right"]', section)

      let cur = activeRef.current
      let switching = false
      let popupOpen = false
      let autoCall = null

      blocks.forEach((b, i) => gsap.set(b, i === cur ? { scale: 1, autoAlpha: 1 } : { scale: 0.86, autoAlpha: 0 }))
      gsap.set(timers, { opacity: 0 })
      // setupSection(): this._visuals[0].activate()
      visuals[cur].play()

      const hideAllTimers = () => {
        gsap.killTweensOf(timers)
        gsap.set(timers, { opacity: 0 })
      }
      const deactivateTimer = () => {
        autoCall?.kill()
        autoCall = null
      }
      const activateTimer = () => {
        const interval = visuals[cur].duration
        const ring = timers[cur]
        hideAllTimers()
        if (reduce) return // no auto-advance under prefers-reduced-motion
        gsap
          .timeline()
          .set(ring, { opacity: 1 })
          .fromTo(ring, { '--percent': 0 }, { '--percent': 100, duration: interval, ease: 'none' })
          .set(ring, { opacity: 0 })
        autoCall = gsap.delayedCall(interval, () => {
          autoCall = null
          if (cur === last) openPopup()
          else select(cur + 1)
        })
      }
      const resetTimer = () => {
        if (popupOpen) return
        deactivateTimer()
        visuals[cur].restart()
        activateTimer()
      }

      const openPopup = () => {
        popupOpen = true
        const visual = wraps[last]
        gsap
          .timeline({ immediateRender: false, force3D: false })
          .set(popup, { opacity: 1, scale: 1 })
          .fromTo(visual, { y: 0 }, { y: 300, duration: f(60), ease: E.Eas7937 })
          .fromTo(visual, { opacity: 1 }, { opacity: 0, duration: f(30), ease: E.Eas7983 }, '<')
          .fromTo(popCard, { opacity: 0, y: -200 }, { opacity: 1, y: 0, duration: f(30), ease: E.Eas17 }, f(35))
          .add(() => popupVisual?.restart(), f(35))
          .fromTo(lineL, { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: f(45), ease: E.Eas17 }, f(45))
          .fromTo(lineR, { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: f(45), ease: E.Eas17 }, '<')
      }
      const closePopup = () => {
        if (!popupOpen) return
        popupOpen = false
        gsap
          .timeline({ immediateRender: false, force3D: false, defaults: { overwrite: 'auto' } })
          .to(popup, { opacity: 0, scale: 0.86, duration: f(15), ease: E.Eas49 })
          .set(wraps[last], { y: 0, opacity: 1 }, f(30))
      }

      const select = (i) => {
        if (i === cur || switching || i < 0 || i > last) return
        setRef.current(i)
      }

      const change = (next) => {
        if (next === cur) return
        const prev = cur
        cur = next
        // onWillChange: popUp.deactivate(); slideTo (TabBar indicator hook); resetTimer()
        closePopup()
        resetTimer()
        if (reduce) {
          gsap.set(blocks[prev], { scale: 0.86, autoAlpha: 0 })
          gsap.set(blocks[next], { scale: 1, autoAlpha: 1 })
          return
        }
        switching = true
        gsap
          .timeline({ immediateRender: false, force3D: false })
          .fromTo(blocks[prev], { scale: 1, autoAlpha: 1 }, { scale: 0.86, autoAlpha: 0, duration: 0.267, ease: E.Eas49 })
          .fromTo(blocks[next], { scale: 0.86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: E.Eas1739 })
          .add(() => {
            switching = false
          })
      }

      sectionTrigger(section, {
        onActivate: resetTimer,
        onDeactivate: deactivateTimer,
      })

      api.current = { select, change }
      return () => {
        deactivateTimer()
        api.current = null
      }
    })
    return () => mm.revert()
  }, [])

  useEffect(() => {
    activeRef.current = active
    api.current?.change(active)
  }, [active])

  return useCallback((i) => (api.current ? api.current.select(i) : setRef.current(i)), [])
}
