/**
 * Marketing group B motion: About blocks (specs/marketing.md §1.17) and TestimonialsLite (§1.16).
 * Values are verbatim from the spec: y offsets in u go through the JS rem (rem() = width/1440|768|375), frames
 * via f(n). One gsap.matchMedia per hook (breakpoints + reduced motion), so a breakpoint change reverts and
 * rebuilds; mm.revert() on unmount makes it StrictMode-safe. Reveals run once (Section `isActivated` flag).
 */
import { useLayoutEffect } from 'react'
import { $, $$, E, MQ, T, f, gsap, rem, sectionTrigger } from './core'

/** run `build(conditions, r)` inside a per-breakpoint gsap.matchMedia; reverted on unmount */
function useMatchMedia(build, deps = []) {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add({ isDesktop: MQ.isDesktop, isTablet: MQ.isTablet, isMobile: MQ.isMobile, reduce: MQ.reduce }, (ctx) => {
      if (ctx.conditions.reduce) return
      build(ctx.conditions, rem())
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** once-only activation on the base Section trigger */
function onceOnActivate(trigger, start, play) {
  let done = false
  sectionTrigger(trigger, {
    start,
    onActivate: () => {
      if (done) return
      done = true
      play()
    },
  })
}

/* ---------------------------------------------------------------------------------------------- */
/* §1.17 About                                                                                     */
/* ---------------------------------------------------------------------------------------------- */
export function useAboutMotion() {
  useMatchMedia((c, r) => {
    aboutHero(r)
    titleWithDesc(r)
    ourStory(r)
    careers(r)
  })
}

/** a. eyebrow y 30u 20f Eas17 @0; title y 30u 32f @+5f; image autoAlpha + scale .95→1 32f Eas1739 @+15f */
function aboutHero(r) {
  const sec = document.getElementById('about-hero')
  if (!sec) return
  const eyebrow = $('[data-anim="about-eyebrow"]', sec)
  const title = $('[data-anim="about-title"]', sec)
  const image = $('[data-anim="about-image"]', sec)
  gsap.set([eyebrow, title], { y: 30 * r, autoAlpha: 0 })
  gsap.set(image, { scale: 0.95, autoAlpha: 0 })
  onceOnActivate(sec, undefined, () =>
    gsap
      .timeline()
      .to(eyebrow, { y: 0, autoAlpha: 1, duration: f(20), ease: E.Eas17 }, 0)
      .to(title, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, f(5))
      .to(image, { scale: 1, autoAlpha: 1, duration: f(32), ease: E.Eas1739 }, f(15)),
  )
}

/** b. trigger 30%: .text-anim ×2 y 50u → 0, stagger 5f, 35f, Eas17 */
function titleWithDesc(r) {
  const sec = document.getElementById('title-with-desc')
  if (!sec) return
  const items = $$('.text-anim', sec)
  gsap.set(items, { y: 50 * r, autoAlpha: 0 })
  onceOnActivate(sec, 'top bottom-=30%', () =>
    gsap.to(items, { y: 0, autoAlpha: 1, stagger: f(5), duration: f(35), ease: E.Eas17 }),
  )
}

/** c. .text-anim ×2 y 100u stagger 5f 35f Eas17; .bg autoAlpha 0→1 35f @+5f */
function ourStory(r) {
  const sec = document.getElementById('our-story')
  if (!sec) return
  const items = $$('.text-anim', sec)
  const bg = $('.bg', sec)
  gsap.set(items, { y: 100 * r, autoAlpha: 0 })
  gsap.set(bg, { autoAlpha: 0 })
  onceOnActivate(sec, undefined, () =>
    gsap
      .timeline()
      .to(items, { y: 0, autoAlpha: 1, stagger: f(5), duration: f(35), ease: E.Eas17 }, 0)
      .to(bg, { autoAlpha: 1, duration: f(35), ease: E.Eas17 }, f(5)),
  )
}

/** e. title y 50u 32f @0; desc 32f @+5f; rows y 10u stagger 5f 35f @+15f; button y 30u 32f Eas1739 @+20f */
function careers(r) {
  const sec = document.getElementById('careers')
  if (!sec) return
  const title = $('[data-anim="careers-title"]', sec)
  const desc = $('[data-anim="careers-desc"]', sec)
  const rows = $$('[data-anim="careers-row"]', sec)
  const btn = $('[data-anim="careers-btn"]', sec)
  gsap.set([title, desc], { y: 50 * r, autoAlpha: 0 })
  gsap.set(rows, { y: 10 * r, autoAlpha: 0 })
  gsap.set(btn, { y: 30 * r, autoAlpha: 0 })
  onceOnActivate(sec, undefined, () =>
    gsap
      .timeline()
      .to(title, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, 0)
      .to(desc, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, f(5))
      .to(rows, { y: 0, autoAlpha: 1, stagger: f(5), duration: f(35), ease: E.Eas17 }, f(15))
      .to(btn, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas1739 }, f(20)),
  )
}

/* ---------------------------------------------------------------------------------------------- */
/* §1.16 TestimonialsLite                                                                          */
/* ---------------------------------------------------------------------------------------------- */
/**
 * Desktop/tablet: title, then slider (+.06s), from y 100u + autoAlpha, .567s Eas17.
 * Mobile: title, then slider (+.066s), from y 40·rem. (The spec also lists a mobile divider step; the
 * telehealth markup has no title divider, so there is nothing to animate there.)
 */
export function useTestimonialsLiteMotion(ref) {
  useMatchMedia(({ isMobile }, r) => {
    const sec = ref.current
    if (!sec) return
    const title = $('[data-tl-title]', sec)
    const slider = $('[data-tl-slider]', sec)
    gsap.set([title, slider], { autoAlpha: 0, y: (isMobile ? 40 : 100) * r })
    onceOnActivate(sec, undefined, () =>
      gsap
        .timeline()
        .to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
        .to(slider, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, isMobile ? T.delay66 : T.delay60),
    )
  })
}
