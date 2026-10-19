/**
 * Page orchestrator — every section without React-driven tab state.
 * Ports of the original section classes (index.html-ByEF1glV.js, trustedSection, complianceCta, benefits,
 * roadmap, peace, testimonials, pricing, ctaSection). Values are the original's verbatim:
 * y offsets in raw px where the original uses px, `N * rem` where it uses rem (rem = body.clientWidth/1440|768|375).
 *
 * One gsap.matchMedia() per breakpoint (+ reduced motion) — a breakpoint change reverts every tween,
 * ScrollTrigger and pin and rebuilds, like the original's per-breakpoint setup. StrictMode-safe (revert on unmount).
 */
import { useLayoutEffect } from 'react'
import { $, $$, E, MQ, ScrollTrigger, T, f, gsap, rem, sectionTrigger } from './core'
import { DUR, builders, createVisual, footerLine, svgRoot } from './visuals'

const byId = (id) => document.getElementById(id)

export function usePageMotion() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    mm.add(
      { isDesktop: MQ.isDesktop, isTablet: MQ.isTablet, isMobile: MQ.isMobile, reduce: MQ.reduce },
      (ctx) => {
        const c = ctx.conditions
        const r = rem()
        const cleanups = []
        trusted(c)
        statement(c)
        everything(c)
        complianceCta(c)
        benefits(c, r)
        roadmap(c, r)
        peace(c, r, cleanups)
        testimonials(c, r)
        pricing(c, r, cleanups)
        bottomCta(c)
        footer(c)
        document.fonts?.ready.then(() => !ctx.isReverted && ScrollTrigger.refresh())
        return () => cleanups.forEach((fn) => fn())
      },
    )
    return () => mm.revert()
  }, [])
}

/* §4 Trusted — static title + two-row marquee ------------------------------------------------ */
// Original: the title is never animated (no style writes over a full scroll), and both marquee rows
// run from page load and never stop (style written continuously regardless of scroll position).
function trusted({ isMobile, reduce }) {
  const sec = byId('homepage-trusted')
  if (!sec) return
  const row = $('[data-marquee-row="1"]', sec)
  const fwd = $$('.ticker-items', sec)
  const rev = $$('.ticker-items-reverse', sec)
  if (reduce || !row) return
  const speed = isMobile ? 5 : 10 // resize(): Mobile ? 5 : 10
  const duration = row.offsetWidth / speed // tickerWidth / speed (1110/10 = 111s @1440)
  gsap.fromTo(fwd, { xPercent: -100 }, { duration, xPercent: 0, ease: 'none', repeat: -1 })
  gsap.fromTo(rev, { xPercent: 0 }, { duration, xPercent: -100, ease: 'none', repeat: -1 })
}

/* §5 Statement ----------------------------------------------------------------------------------- */
function statement({ reduce }) {
  const sec = byId('homepage-second')
  if (!sec || reduce) return
  const wraps = $$('.text-anim', sec)
  gsap.set(wraps, { y: 100, autoAlpha: 0 })
  let done = false
  sectionTrigger(sec, {
    start: 'top bottom-=30%',
    onActivate: () => {
      if (done) return
      done = true
      gsap.timeline().fromTo(wraps, { autoAlpha: 0, y: 100 }, { autoAlpha: 1, y: 0, stagger: f(5), duration: f(35), ease: E.Eas17 })
    },
  })
}

/* §6 Everything — headline mask slide-up, lines once, dots loop ------------------------------------ */
function everything({ isMobile, reduce }) {
  const sec = byId('homepage-everything')
  if (!sec) return
  const title = $('[data-anim="everything-title"]', sec)
  const root = svgRoot(isMobile ? 'network-m' : 'network')
  const L = isMobile ? DUR.linesMobile : DUR.linesDesktop
  const D = isMobile ? DUR.dotsMobile : DUR.dotsDesktop
  const lines = createVisual(root, builders.networkLines(L), { duration: L, reduced: reduce })
  const dots = createVisual(root, builders.networkDots(D), {
    duration: D,
    loop: true,
    hideOnDeactivate: true,
    hideTarget: root?.querySelector('[data-id="dots"]'),
    reduced: reduce,
  })
  if (reduce) {
    dots.activate()
    return
  }
  gsap.set(title, { y: 122 })
  let activated = false
  sectionTrigger(sec, {
    start: 'top bottom-=30%',
    onActivate: () => {
      if (activated) {
        dots.activate()
        return
      }
      activated = true
      gsap
        .timeline()
        .fromTo(title, { y: 122 }, { y: 0, duration: f(90), ease: E.Eas82 }, 0)
        .add(() => lines.activate(), f(10))
        .add(() => dots.activate({ fade: 0.3 }), f(10) + L)
    },
    onDeactivate: () => dots.deactivate(),
  })
}

/* §7 Compliance CTA card — own trigger, loop art while in view ------------------------------------ */
function complianceCta({ isDesktop, isMobile, reduce }) {
  const card = $('[data-anim="compliance-cta"]')
  if (!card) return
  const art = createVisual(svgRoot(isDesktop ? 'compliance-cta' : 'compliance-cta-m'), builders.complianceCta, {
    duration: DUR.cta,
    loop: true,
    reduced: reduce,
  })
  const bg = createVisual(svgRoot(isMobile ? 'compliance-cta-bg-m' : 'compliance-cta-bg'), builders.ctaBg, {
    duration: DUR.cta,
    loop: true,
    reduced: reduce,
  })
  if (!reduce) gsap.set(card, { y: 100 })
  let shown = false
  sectionTrigger(card, {
    start: 'top bottom-=10%',
    end: 'bottom top-=10%',
    onActivate: () => {
      art.activate()
      bg.activate()
      if (shown || reduce) return
      shown = true
      gsap.fromTo(card, { y: 100 }, { y: 0, duration: f(32), ease: E.Eas17 })
    },
    onDeactivate: () => {
      art.deactivate()
      bg.deactivate()
    },
  })
}

/* §8 Benefits ------------------------------------------------------------------------------------- */
function benefits({ isMobile, reduce }, r) {
  const sec = byId('homepage-benefits')
  if (!sec) return
  const title = $('[data-anim="title"]', sec)
  const desc = $('[data-anim="desc"]', sec)
  const slider = $('[data-anim="cards"]', sec)
  const cards = $$('[data-benefit-card]', sec)
  const art = [1, 2, 3].map((i) => createVisual(svgRoot(`benefit-${i}`), builders.benefitArt[i], { duration: 1.3, reduced: reduce }))
  if (reduce) return
  const y = (isMobile ? 40 : 100) * r
  gsap.set([desc, title], { autoAlpha: 0, y })
  gsap.set(isMobile ? slider : cards, { autoAlpha: 0, y })
  let done = false
  sectionTrigger(sec, {
    onActivate: () => {
      if (done) return
      done = true
      const tl = gsap.timeline()
      tl.to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
      if (isMobile) {
        tl.to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay66)
        tl.to(slider, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay66)
        tl.add(() => art.forEach((a) => a.restart()), T.delay66 + 0.1)
        return
      }
      tl.to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay60)
      // middle card first, then the outer two together (absolute .06)
      tl.to(cards[1], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, 0)
      tl.to(cards[0], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, T.delay60)
      tl.to(cards[2], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, T.delay60)
      tl.add(() => art[1].restart(), 0.1)
      tl.add(() => (art[0].restart(), art[2].restart()), T.delay60 + 0.1)
    },
  })
}

/* §9 Roadmap — desktop pin + scrub, tablet/mobile per-step reveals --------------------------------- */
function roadmap({ isDesktop, reduce }, r) {
  const sec = byId('homepage-roadmap')
  if (!sec) return
  const title = $('[data-anim="title"]', sec)
  let done = false

  if (isDesktop) {
    const pin = $('[data-roadmap-pin]', sec)
    const stepsBox = $('[data-roadmap-steps]', sec)
    const imagesBox = $('[data-roadmap-images]', sec)
    const steps = $$('[data-roadmap-step]', sec)
    const images = $$('[data-roadmap-image]', sec)
    const bar = $('[data-roadmap-progress]', sec)
    const counter = $('[data-roadmap-counter]', sec)
    const art = images.map((_, i) => createVisual(svgRoot(`roadmap-step-${i + 1}`), builders.roadmapArt[i], { duration: DUR.roadmap[i], reduced: reduce }))

    const s = gsap.timeline()
    steps.forEach((step, t) => {
      const img = images[t]
      gsap.set(step, { y: 100 * (t + 1) * r, opacity: 0 })
      gsap.set(img, { opacity: 0 })
      const seg = 100 / steps.length
      const from = t * seg
      const p = gsap.timeline({
        onUpdate: () => {
          counter.innerHTML = `0${t + 1}`
        },
      })
      p.fromTo(bar, { width: `${from}%` }, { width: `${from + seg}%`, duration: 100 }, 0)
        .to(step, { y: 0, opacity: 1, duration: 30 }, 0)
        .fromTo(img, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, ease: E.Eas17, duration: 15, onStart: () => art[t].restart() }, 0)
        .to({ wait: 0 }, { wait: 100, duration: 70 }, 30)
      s.add(p, '<')
      if (t !== steps.length - 1) {
        s.fromTo(img, { opacity: 1, scale: 1 }, { opacity: 0, scale: 1.05, ease: E.Eas40, duration: 15, onComplete: () => art[t].stop() }, '>')
        s.to(step, { y: -(200 * r), opacity: 0, duration: 30 }, '>')
      }
    })
    ScrollTrigger.create({
      trigger: imagesBox,
      start: 'center+=20% center',
      endTrigger: stepsBox,
      end: 'bottom bottom',
      pin,
      pinSpacing: false,
      anticipatePin: 1,
      animation: s,
      scrub: true,
    })
    if (reduce) return
    gsap.set(title, { autoAlpha: 0, y: 100 * r })
    sectionTrigger(sec, {
      onActivate: () => {
        if (done) return
        done = true
        gsap.timeline().to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
      },
    })
    return
  }

  const steps = $$('[data-roadmap-step-responsive]', sec)
  const art = steps.map((_, i) => createVisual(svgRoot(`roadmap-step-${i + 1}-m`), builders.roadmapArt[i], { duration: DUR.roadmap[i], reduced: reduce }))
  if (reduce) return
  gsap.set(title, { autoAlpha: 0, y: 40 * r })
  gsap.set(steps, { autoAlpha: 0, y: 40 * r })
  sectionTrigger(sec, {
    onActivate: () => {
      if (done) return
      done = true
      gsap.timeline().to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
      steps.forEach((step, t) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: step, start: 'top bottom-=25%', end: 'bottom top-=25%' },
            onStart: () => art[t].restart(),
          })
          .to(step, { autoAlpha: 1, y: 0, ease: E.Eas17, duration: T.duration567 })
      })
    },
  })
}

/* §10 Peace of mind — desktop pin + scrub, tablet/mobile carousel art -------------------------------- */
function peace({ isDesktop, reduce }, r, cleanups) {
  const sec = byId('homepage-peace')
  if (!sec) return
  const title = $('[data-anim="title"]', sec)
  const desc = $('[data-anim="desc"]', sec)
  let done = false

  if (isDesktop) {
    const steps = $$('[data-peace-step]', sec)
    const images = $$('[data-peace-image]', sec)
    const pin = $('[data-peace-pin]', sec)
    const wrapper = $('.peace-image-wrapper', sec)
    const art = images.map((_, i) => createVisual(svgRoot(`peace-step-${i + 1}`), builders.peaceArt[i], { duration: DUR.peace[i], reduced: reduce }))
    const tl = gsap.timeline()
    steps.forEach((step, e) => {
      if (e !== 0) gsap.set(step, { opacity: 0.5 })
      const a = gsap.timeline()
      a.to(step, { opacity: 1, duration: 15 }, 0)
      if (e !== 0) {
        a.fromTo(images[e], { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 30, onStart: () => art[e].restart() }, 0)
      }
      a.to({ wait: 0 }, { wait: 40, ease: 'none', duration: 40, onStart: () => e === 0 && art[e].restart() }, e !== 0 ? 15 : 0)
      if (e !== steps.length - 1) a.fromTo(images[e], { opacity: 1, scale: 1 }, { opacity: 0, scale: 1.05, duration: 30 }, 70)
      tl.add(a, '>')
    })
    ScrollTrigger.create({
      trigger: wrapper,
      start: 'center center',
      endTrigger: steps[steps.length - 1],
      end: 'bottom center',
      pin,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: true,
      animation: tl,
    })
    if (reduce) return
    gsap.set([desc, title], { autoAlpha: 0, y: 100 * r })
    sectionTrigger(sec, {
      onActivate: () => {
        if (done) return
        done = true
        gsap
          .timeline()
          .to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
          .to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay60)
      },
    })
    return
  }

  const list = $('[data-carousel-list="peace"]', sec)
  const slides = list ? Array.from(list.children) : []
  const art = slides.map((_, i) => createVisual(svgRoot(`peace-step-${i + 1}-m`), builders.peaceArt[i], { duration: DUR.peace[i], reduced: reduce }))
  // Splide "active" -> play that slide's art from frame 0
  const onActive = (ev) => art[ev.detail.index]?.restart()
  list?.addEventListener('nw:carousel-active', onActive)
  cleanups.push(() => list?.removeEventListener('nw:carousel-active', onActive))
  if (reduce) return
  gsap.set([desc, title], { autoAlpha: 0, y: 40 * r })
  sectionTrigger(sec, {
    onActivate: () => {
      if (done) return
      done = true
      gsap
        .timeline()
        .to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
        .to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567, onStart: () => art[0]?.restart() }, T.delay66)
    },
  })
}

/* §11 Testimonials ----------------------------------------------------------------------------------- */
function testimonials({ isMobile, reduce }, r) {
  const sec = byId('homepage-testimonials')
  if (!sec || reduce) return
  const title = $('[data-anim="title"]', sec)
  const slider = $('[data-anim="slider"]', sec)
  const divider = $('[data-anim="divider"]', sec)
  if (isMobile) gsap.set([slider, title, divider], { autoAlpha: 0, y: 40 * r })
  else gsap.set([slider, title], { autoAlpha: 0, y: 100 * r })
  let done = false
  sectionTrigger(sec, {
    onActivate: () => {
      if (done) return
      done = true
      const tl = gsap.timeline().to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
      if (isMobile) {
        tl.to(divider, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay66)
        tl.to(slider, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay66)
      } else {
        tl.to(slider, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay60)
      }
    },
  })
}

/* §12 Pricing — reveal, desktop pin + scrubbed collapse, refresh 500ms after accordion click --------------- */
function pricing({ isDesktop, isMobile, reduce }, r, cleanups) {
  const sec = byId('homepage-pricing')
  if (!sec) return
  const title = $('[data-anim="title"]', sec)
  const desc = $('[data-anim="desc"]', sec)

  if (isDesktop) {
    const splide = $('[data-pricing-pin]', sec)
    const list = $('[data-carousel-list="pricing"]', sec)
    const start = `top top+=${r * 82}px`
    ScrollTrigger.create({
      trigger: splide,
      start,
      endTrigger: sec,
      end: `bottom top+=${r * 300}`,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: true,
    })
    const planDesc = $$('[data-pricing-plan-desc]', sec)
    const fee = $$('[data-pricing-fee]', sec)
    // default duration .5 / default ease power1.out, exactly as the original timeline
    const o = gsap
      .timeline()
      .fromTo(planDesc, { height: `${r * 100}px` }, { height: `${r * 30}px` }, 0)
      .fromTo(fee, { autoAlpha: '1' }, { autoAlpha: '0', height: '0', duration: 0.3 }, 0)
      .fromTo(planDesc, { autoAlpha: '1' }, { autoAlpha: '0', duration: 0.3 }, 0)
    ScrollTrigger.create({
      trigger: splide,
      endTrigger: list,
      start,
      end: `bottom top+=${r * 300}`,
      pin: false,
      pinSpacing: false,
      scrub: true,
      animation: o,
    })
    const btn = $('[data-pricing-accordion]', sec)
    let timer = null
    const onClick = () => {
      clearTimeout(timer)
      timer = setTimeout(() => ScrollTrigger.refresh(), 500)
    }
    btn?.addEventListener('click', onClick)
    cleanups.push(() => {
      clearTimeout(timer)
      btn?.removeEventListener('click', onClick)
    })
  }

  if (reduce) return
  gsap.set([title, desc], { autoAlpha: 0, y: (isMobile ? 40 : 100) * r })
  let done = false
  sectionTrigger(sec, {
    onActivate: () => {
      if (done) return
      done = true
      gsap
        .timeline()
        .to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
        .to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, isMobile ? T.delay66 : T.delay60)
    },
  })
}

/* §14 Bottom CTA — loop art while the section is active ------------------------------------------------ */
function bottomCta({ isMobile, reduce }) {
  const sec = byId('cta-section')
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

/* §15 Footer edge lines (desktop only; stand-in art) --------------------------------------------------- */
function footer({ isDesktop, reduce }) {
  if (!isDesktop) return
  const left = svgRoot('footer-line-left')
  const right = svgRoot('footer-line-right')
  const lines = [footerLine(left, reduce), footerLine(right, reduce)]
  if (reduce || !left) return
  ScrollTrigger.create({
    trigger: left,
    start: 'top bottom-=10%',
    once: true,
    onEnter: () => lines.forEach((l) => l.restart()),
  })
}
