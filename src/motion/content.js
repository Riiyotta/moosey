/**
 * Motion for the content templates (specs/content.md §8, §12).
 *
 * - useContentPageMotion(key): every content page. Bottom CTA art loops while the section is active
 *   (same contract as the homepage), the Trusted marquee runs if present, and ScrollTrigger is refreshed
 *   after mount / font load / late image loads (prose images change the page height).
 * - useGuideHeroMotion(ref): §8.1 staggered hero reveal.
 * - useGuideBenefitsMotion(ref): §8.2 benefits card reveal (homepage timing, no title row).
 * - useFeatureGroupMotion(ref, count, setActive) + useFeatureCrossfade(ref, active): §8.5 reveal,
 *   desktop pin with scroll-driven item index, image crossfade.
 *
 * Every hook builds inside gsap.matchMedia() (breakpoint change = full revert + rebuild) and reverts on
 * unmount, so route changes and StrictMode double-mounts leave no tweens, pins or triggers behind.
 */
import { useEffect, useLayoutEffect, useRef } from 'react'
import { $, $$, E, MQ, ScrollTrigger, T, f, gsap, rem, sectionTrigger } from './core'
import { DUR, builders, createVisual, svgRoot } from './visuals'

const CONDITIONS = { isDesktop: MQ.isDesktop, isTablet: MQ.isTablet, isMobile: MQ.isMobile, reduce: MQ.reduce }

function useMatchMedia(build, deps) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(CONDITIONS, (ctx) => build(ctx.conditions, ctx))
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/* ------------------------------------------------------------------ page-level */

export function useContentPageMotion(key) {
  useMatchMedia(
    ({ isMobile, reduce }, ctx) => {
      const cleanups = []
      bottomCta(isMobile, reduce)
      marquee(isMobile, reduce)

      // refresh once layout settles: next frame, fonts, and any image that finishes loading later
      let raf = requestAnimationFrame(() => !ctx.isReverted && ScrollTrigger.refresh())
      document.fonts?.ready.then(() => !ctx.isReverted && ScrollTrigger.refresh())
      let timer = null
      const onLoad = (e) => {
        if (e.target.tagName !== 'IMG') return
        clearTimeout(timer)
        timer = setTimeout(() => !ctx.isReverted && ScrollTrigger.refresh(), 100)
      }
      const main = document.getElementById('content') || document
      main.addEventListener('load', onLoad, true)
      cleanups.push(() => {
        cancelAnimationFrame(raf)
        clearTimeout(timer)
        main.removeEventListener('load', onLoad, true)
      })
      return () => cleanups.forEach((fn) => fn())
    },
    [key],
  )
}

/** §14 (reused): loop the CTA art while the section is active — same as src/motion/page.js */
function bottomCta(isMobile, reduce) {
  const sec = document.getElementById('cta-section')
  if (!sec) return
  const art = createVisual(svgRoot(isMobile ? 'bottom-cta-m' : 'bottom-cta'), builders.bottomCta, { duration: DUR.cta, loop: true, reduced: reduce })
  const bg = createVisual(svgRoot('bottom-cta-bg'), builders.ctaBg, { duration: DUR.cta, loop: true, reduced: reduce })
  sectionTrigger(sec, {
    onActivate: () => {
      art.activate()
      bg.activate()
    },
    onDeactivate: () => {
      art.deactivate()
      bg.deactivate()
    },
  })
}

/** §8.4 Trusted (reused LogoMarquee): rows run from load, duration = row width / speed (5 mobile, 10) */
function marquee(isMobile, reduce) {
  const sec = document.getElementById('homepage-trusted')
  if (!sec || reduce) return
  const row = $('[data-marquee-row="1"]', sec)
  if (!row) return
  const duration = row.offsetWidth / (isMobile ? 5 : 10)
  gsap.fromTo($$('.ticker-items', sec), { xPercent: -100 }, { duration, xPercent: 0, ease: 'none', repeat: -1 })
  gsap.fromTo($$('.ticker-items-reverse', sec), { xPercent: 0 }, { duration, xPercent: -100, ease: 'none', repeat: -1 })
}

/* ------------------------------------------------------------------ §8.1 guide hero */

export function useGuideHeroMotion(ref, key) {
  useMatchMedia(
    ({ reduce }) => {
      const sec = ref.current
      if (!sec || reduce) return
      const eyebrow = $('[data-anim="eyebrow"]', sec)
      const title = $('[data-anim="title"]', sec)
      const desc = $('[data-anim="desc"]', sec)
      const images = $$('[data-anim="image"]', sec)
      // mobile: JS rem = vw/375, so 30·rem ≈ 26u
      gsap.set([eyebrow, title, desc], { y: 30 * rem(), autoAlpha: 0 })
      gsap.set(images, { autoAlpha: 0, scale: 0.95 })
      let done = false
      sectionTrigger(sec, {
        start: 'top bottom-=30%',
        onActivate: () => {
          if (done) return
          done = true
          gsap
            .timeline()
            .to(eyebrow, { y: 0, autoAlpha: 1, duration: f(20), ease: E.Eas17 }, 0)
            .to(title, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, f(5))
            .to(desc, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, f(10))
            .to(images, { autoAlpha: 1, scale: 1, duration: f(32), ease: E.Eas1739 }, f(15))
        },
      })
    },
    [key],
  )
}

/* ------------------------------------------------------------------ §8.2 guide benefits */

export function useGuideBenefitsMotion(ref, key) {
  useMatchMedia(
    ({ isMobile, reduce }) => {
      const sec = ref.current
      if (!sec || reduce) return
      const slider = $('[data-anim="cards"]', sec)
      const cards = $$('[data-benefit-card]', sec)
      const y = (isMobile ? 40 : 100) * rem()
      gsap.set(isMobile ? slider : cards, { autoAlpha: 0, y })
      let done = false
      sectionTrigger(sec, {
        onActivate: () => {
          if (done) return
          done = true
          const tl = gsap.timeline()
          if (isMobile) {
            // title/desc targets are absent on guides: only the slider runs, at +.066
            tl.to(slider, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay66)
            return
          }
          // middle card first, then the outer two (+.06)
          tl.to(cards[1], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, 0)
          tl.to(cards[0], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, T.delay60)
          tl.to(cards[2], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, T.delay60)
        },
      })
    },
    [key],
  )
}

/* ------------------------------------------------------------------ §8.5 FeatureGroup */

/**
 * Reveal (top bottom-=25%, once): mobile title row + .content-wrap from y 50·rem, autoAlpha 0.
 * Desktop pin: trigger .list-item-wrap "center-=5% center" -> endTrigger .spacing "bottom bottom",
 * pinSpacing false, scrub; onUpdate index = round(progress × (count-1)) opens that item.
 */
export function useFeatureGroupMotion(ref, count, setActive, key) {
  const setRef = useRef(setActive)
  setRef.current = setActive
  useMatchMedia(
    ({ isDesktop, reduce }) => {
      const sec = ref.current
      if (!sec) return
      const card = $('[data-fg-card]', sec)
      const spacing = $('[data-fg-spacing]', sec)
      if (isDesktop && card && spacing) {
        let last = -1
        ScrollTrigger.create({
          trigger: card,
          start: 'center-=5% center',
          endTrigger: spacing,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const i = Math.round(self.progress * (count - 1))
            if (i !== last) {
              last = i
              setRef.current(i)
            }
          },
        })
      }
      if (reduce) return
      const title = $('[data-fg-title]', sec)
      const content = $('[data-fg-content]', sec)
      gsap.set([title, content], { y: 50 * rem(), autoAlpha: 0 })
      let done = false
      sectionTrigger(sec, {
        onActivate: () => {
          if (done) return
          done = true
          // content duration not given by the spec: same f(20) as the title
          gsap
            .timeline()
            .to(title, { y: 0, autoAlpha: 1, duration: f(20), ease: E.Eas17 }, 0)
            .to(content, { y: 0, autoAlpha: 1, duration: f(20), ease: E.Eas17 }, f(5))
        },
      })
    },
    [key, count],
  )
}

/** Crossfade when the open item changes: all images -> 0 (f(20), Eas66), then the selected -> 1 (f(20), Eas17) */
export function useFeatureCrossfade(ref, active) {
  const first = useRef(true)
  const tl = useRef(null)
  useEffect(() => {
    const images = $$('[data-fg-img]', ref.current)
    if (!images.length) return
    if (first.current) {
      first.current = false
      gsap.set(images, { autoAlpha: (i) => (i === active ? 1 : 0) })
      return
    }
    tl.current?.kill()
    tl.current = gsap
      .timeline()
      .to(images, { autoAlpha: 0, duration: f(20), ease: E.Eas66 })
      .to(images[active], { autoAlpha: 1, duration: f(20), ease: E.Eas17 })
  }, [ref, active])
  useEffect(
    () => () => {
      tl.current?.kill()
      first.current = true
    },
    [],
  )
}
