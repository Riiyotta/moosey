/**
 * Motion for the shared marketing blocks (src/components/blocks/*), per specs/marketing.md §1 and §4.
 *
 * Every block owns its motion through one hook below, so a page only has to render the block.
 * Each hook = one gsap.matchMedia() scoped to the block (desktop / tablet / mobile / reduced motion):
 * a breakpoint change reverts and rebuilds every tween, ScrollTrigger and pin; unmount reverts everything
 * (StrictMode-safe). After each (re)build a single debounced ScrollTrigger.refresh() runs on the next frame
 * and again once webfonts are ready, so triggers measure the freshly mounted route.
 *
 * Offsets: `N * r` where the spec gives u (JS rem = body.clientWidth / 1440|768|375, src/motion/core.js);
 * raw px where the spec says px (Ecosystem text y 100, GenericCta card y 100).
 */
import { useLayoutEffect, useRef } from 'react'
import { $, $$, E, MQ, ScrollTrigger, T, f, gsap, rem, sectionTrigger } from './core'
import { DUR, builders, createVisual, svgRoot } from './visuals'

const MEDIA = { isDesktop: MQ.isDesktop, isTablet: MQ.isTablet, isMobile: MQ.isMobile, reduce: MQ.reduce }

let refreshQueued = false
/** One ScrollTrigger.refresh() per frame, however many blocks (re)build in it */
export function scheduleRefresh() {
  if (refreshQueued) return
  refreshQueued = true
  requestAnimationFrame(() => {
    refreshQueued = false
    ScrollTrigger.refresh()
  })
}

/**
 * setup(root, conditions, r) runs inside a matchMedia context; it may return a cleanup.
 * `deps` rebuild the motion (e.g. item counts).
 */
function useBlockMotion(ref, setup, deps = []) {
  const setupRef = useRef(setup)
  setupRef.current = setup
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return undefined
    const mm = gsap.matchMedia()
    mm.add(MEDIA, (ctx) => {
      const cleanup = setupRef.current(root, ctx.conditions, rem())
      scheduleRefresh()
      document.fonts?.ready.then(() => !ctx.isReverted && scheduleRefresh())
      return cleanup
    })
    return () => mm.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** Reveal that runs once on the section's activation (base Section trigger) */
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

/* §1.1 PageHero — `top bottom-=30%`, once ------------------------------------------------------- */
export function usePageHeroMotion(ref) {
  useBlockMotion(ref, (root, { reduce }, r) => {
    if (reduce) return
    const eyebrow = $('[data-hero-eyebrow]', root)
    const title = $('[data-hero-title]', root)
    const desc = $('[data-hero-desc]', root)
    const visual = $$('[data-hero-visual]', root)
    gsap.set([eyebrow, title, desc], { y: 30 * r, autoAlpha: 0 })
    gsap.set(visual, { autoAlpha: 0, scale: 0.95 })
    onceOnActivate(root, 'top bottom-=30%', () =>
      gsap
        .timeline()
        .to(eyebrow, { y: 0, autoAlpha: 1, duration: f(20), ease: E.Eas17 }, 0)
        .to(title, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, f(5))
        .to(desc, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, f(10))
        .to(visual, { autoAlpha: 1, scale: 1, duration: f(32), ease: E.Eas1739 }, f(15)),
    )
  })
}

/* §1.2 HeroStatic — looping art (Solutions_hero stand-in: 151f @ 30fps), plays while active ----------- */
const HERO_STATIC_DUR = 151 / 30 // 5.033s

/** Seamless loop: connector dashes flow, nodes drift and settle, the hub pulses twice */
function heroStaticArt(tl, { q, qa }) {
  const lines = qa('.line')
  if (lines.length) {
    tl.fromTo(lines, { strokeDasharray: '0.02 0.02', strokeDashoffset: 0 }, { strokeDashoffset: -0.2, duration: HERO_STATIC_DUR, ease: 'none', autoRound: false }, 0)
  }
  qa('.node').forEach((n, i) => {
    tl.to(n, { y: i % 2 ? 5 : -5, duration: HERO_STATIC_DUR / 2, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0)
  })
  const pulse = q('pulse')
  if (pulse) {
    ;[0.2, 2.7].forEach((at) =>
      tl.fromTo(pulse, { scale: 0.6, opacity: 0.5, transformOrigin: '50% 50%' }, { scale: 1.15, opacity: 0, duration: 1.8, ease: 'power1.out' }, at),
    )
  }
}

export function useHeroStaticMotion(ref, uid) {
  useBlockMotion(ref, (root, { isDesktop, reduce }) => {
    const art = createVisual(svgRoot(isDesktop ? uid : `${uid}-m`), heroStaticArt, { duration: HERO_STATIC_DUR, loop: true, reduced: reduce })
    sectionTrigger(root, { onActivate: () => art.activate(), onDeactivate: () => art.deactivate() })
  }, [uid])
}

/* §1.3 FeatureGroup — desktop pin per card, progress -> accordion index; first-card reveal ------------- */
/**
 * onPinIndex(cardIndex, itemIndex) is called when a pinned card's rounded scroll progress changes item.
 * The component owns the accordion state and calls swapFeatureImage() when the open item changes.
 */
export function useFeatureGroupMotion(ref, onPinIndex) {
  const cb = useRef(onPinIndex)
  cb.current = onPinIndex
  useBlockMotion(ref, (root, { isDesktop, reduce }, r) => {
    const cards = $$('[data-fg-card]', root)
    if (isDesktop) {
      cards.forEach((li, ci) => {
        const wrap = $('[data-fg-wrap]', li)
        const spacing = $('[data-fg-spacing]', li)
        const n = $$('[data-fg-item]', li).length
        let cur = 0
        ScrollTrigger.create({
          trigger: wrap,
          start: 'center-=5% center',
          endTrigger: spacing,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const i = Math.round(self.progress * (n - 1))
            if (i === cur) return
            cur = i
            cb.current?.(ci, i)
          },
        })
      })
    }
    if (reduce || !cards[0]) return
    // original uses querySelector: only the first card's elements reveal
    const titleMobile = $('[data-fg-title-mobile]', cards[0])
    const content = $('[data-fg-content]', cards[0])
    gsap.set([titleMobile, content], { y: 50 * r, autoAlpha: 0 })
    onceOnActivate(root, undefined, () =>
      gsap
        .timeline()
        .to(titleMobile, { y: 0, autoAlpha: 1, duration: f(20), ease: E.Eas17 }, 0)
        .to(content, { y: 0, autoAlpha: 1, duration: f(20), ease: E.Eas17 }, f(5)),
    )
  })
}

/** Image swap: all items out (20f Eas66), THEN the target in (20f Eas17) — sequential, not a cross-fade */
export function swapFeatureImage(imgWrap, index) {
  if (!imgWrap) return null
  const items = $$('[data-fg-img]', imgWrap)
  if (!items[index]) return null
  gsap.killTweensOf(items)
  if (window.matchMedia(MQ.reduce).matches) {
    gsap.set(items, { autoAlpha: 0 })
    gsap.set(items[index], { autoAlpha: 1 })
    return null
  }
  return gsap
    .timeline()
    .to(items, { autoAlpha: 0, duration: f(20), ease: E.Eas66 })
    .to(items[index], { autoAlpha: 1, duration: f(20), ease: E.Eas17 })
}

/* §1.4 FeatureList A (per item `top+=25% bottom`) and §1.6 Engine (`top bottom-=25%`) ----------------- */
function itemTimeline(item, r) {
  const text = $('[data-fl-text]', item)
  const rows = $$('[data-fl-row]', item)
  const img = $('[data-fl-img]', item)
  gsap.set(text, { autoAlpha: 0, y: 50 * r })
  gsap.set(rows, { autoAlpha: 0, y: 10 * r })
  gsap.set(img, { autoAlpha: 0, scale: 0.98 })
  return gsap
    .timeline({ paused: true })
    .to(text, { autoAlpha: 1, y: 0, duration: f(30), ease: E.Eas17 }, 0)
    .to(rows, { autoAlpha: 1, y: 0, duration: f(35), stagger: f(5), ease: E.Eas17 }, f(5))
    .to(img, { autoAlpha: 1, scale: 1, duration: f(20), ease: E.Eas1739 }, f(8))
}

export function useFeatureListMotion(ref, { start = 'top+=25% bottom', enabled = true } = {}) {
  useBlockMotion(ref, (root, { reduce }, r) => {
    if (!enabled || reduce) return
    $$('[data-fl-item]', root).forEach((item) => {
      const tl = itemTimeline(item, r)
      ScrollTrigger.create({ trigger: item, start, once: true, onEnter: () => tl.play() })
    })
  }, [start, enabled])
}

/* §1.5 Ecosystem — `top bottom-=30%`, once ---------------------------------------------------------- */
export function useEcosystemMotion(ref) {
  useBlockMotion(ref, (root, { reduce }, r) => {
    if (reduce) return
    const text = $$('[data-eco-text]', root)
    const items = $$('[data-eco-item]', root)
    gsap.set(text, { autoAlpha: 0, y: 100 }) // raw px, as the original
    gsap.set(items, { autoAlpha: 0, y: 10 * r })
    onceOnActivate(root, 'top bottom-=30%', () =>
      gsap
        .timeline()
        .to(text, { autoAlpha: 1, y: 0, stagger: f(5), duration: f(35), ease: E.Eas17 }, 0)
        .to(items, { autoAlpha: 1, y: 0, stagger: f(5), duration: f(35), ease: E.Eas17 }, f(5)),
    )
  })
}

/* §1.8 GenericCta — card rises 100px once (`top bottom-=10%`), art loops while in view ----------------- */
export function useGenericCtaMotion(ref, uid) {
  useBlockMotion(ref, (root, { isDesktop, isMobile, reduce }) => {
    const card = $('[data-gcta-card]', root)
    const art = createVisual(svgRoot(isDesktop ? uid : `${uid}-m`), builders.complianceCta, { duration: DUR.cta, loop: true, reduced: reduce })
    const bg = createVisual(svgRoot(isMobile ? `${uid}-bg-m` : `${uid}-bg`), builders.ctaBg, { duration: DUR.cta, loop: true, reduced: reduce })
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
        gsap.to(card, { y: 0, duration: f(32), ease: E.Eas17 })
      },
      onDeactivate: () => {
        art.deactivate()
        bg.deactivate()
      },
    })
  }, [uid])
}

/* §1.9 BenefitsVariant — homepage benefits reveal (cards 2-1-3 on md+, slider on mobile) --------------- */
export function useBenefitsVariantMotion(ref) {
  useBlockMotion(ref, (root, { isMobile, reduce }, r) => {
    if (reduce) return
    const title = $('[data-bv-title]', root)
    const desc = $('[data-bv-desc]', root)
    const slider = $('[data-bv-slider]', root)
    const cards = $$('[data-bv-card]', root)
    const y = (isMobile ? 40 : 100) * r
    gsap.set([title, desc], { autoAlpha: 0, y })
    gsap.set(isMobile ? slider : cards, { autoAlpha: 0, y })
    onceOnActivate(root, undefined, () => {
      const tl = gsap.timeline().to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
      if (isMobile) {
        tl.to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay66)
        tl.to(slider, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay66)
        return
      }
      tl.to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, T.delay60)
      tl.to(cards[1], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, 0)
      tl.to(cards[0], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, T.delay60)
      tl.to(cards[2], { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration550 }, T.delay60)
    })
  })
}

/* LogoMarquee variants — homepage ticker (row 1 moves right, row 2 left; never stops) ------------------ */
export function useMarqueeMotion(ref) {
  useBlockMotion(ref, (root, { isMobile, reduce }) => {
    const row = $('[data-bm-row]', root)
    if (reduce || !row) return
    const duration = row.offsetWidth / (isMobile ? 5 : 10)
    const fwd = $$('.ticker-items', root)
    const rev = $$('.ticker-items-reverse', root)
    if (fwd.length) gsap.fromTo(fwd, { xPercent: -100 }, { duration, xPercent: 0, ease: 'none', repeat: -1 })
    if (rev.length) gsap.fromTo(rev, { xPercent: 0 }, { duration, xPercent: -100, ease: 'none', repeat: -1 })
  })
}

/* §1.11 GetStarted — homepage peace module with static images ------------------------------------------ */
export function useGetStartedMotion(ref) {
  useBlockMotion(ref, (root, { isDesktop, isMobile, reduce }, r) => {
    const title = $('[data-gs-title]', root)
    const desc = $('[data-gs-desc]', root)
    if (isDesktop) {
      const steps = $$('[data-gs-step]', root)
      const images = $$('[data-gs-image]', root)
      const pin = $('[data-gs-pin]', root)
      const wrapper = $('[data-gs-wrapper]', root)
      const tl = gsap.timeline()
      steps.forEach((step, e) => {
        if (e !== 0) gsap.set(step, { opacity: 0.5 })
        const a = gsap.timeline()
        a.to(step, { opacity: 1, duration: 15 }, 0)
        if (e !== 0) a.fromTo(images[e], { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 30 }, 0)
        a.to({ wait: 0 }, { wait: 40, ease: 'none', duration: 40 }, e !== 0 ? 15 : 0)
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
    }
    if (reduce) return
    const y = (isMobile ? 40 : 100) * r
    gsap.set([title, desc], { autoAlpha: 0, y })
    onceOnActivate(root, undefined, () =>
      gsap
        .timeline()
        .to(title, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, 0)
        .to(desc, { y: 0, autoAlpha: 1, ease: E.Eas17, duration: T.duration567 }, isDesktop ? T.delay60 : T.delay66),
    )
  })
}

/* §1.7 ScrollTabs — desktop pin (`top top+=20%` → spacer bottom, scrub); progress → 1 of 4 tabs ------------- */
/**
 * Returns select(i) for link clicks. setActive(i) mirrors the active index into React (link `.active` classes).
 * Switch (syncActivate): outgoing scale 1→.86 + autoAlpha→0 (.267s Eas49), THEN incoming .86→1 / 0→1 (.3s Eas1739).
 * A URL hash equal to a tab id activates that tab after 500ms (desktop). Tablet/mobile: all items stacked, no motion.
 */
export function useScrollTabsMotion(ref, setActive) {
  const api = useRef(null)
  const setRef = useRef(setActive)
  setRef.current = setActive
  useBlockMotion(ref, (root, { isDesktop, reduce }) => {
    if (!isDesktop) {
      setRef.current(0)
      return undefined
    }
    const wrap = $('[data-st-wrap]', root)
    const spacer = $('[data-st-spacer]', root)
    const items = $$('[data-st-item]', root)
    const last = items.length - 1
    let cur = 0
    let tl = null
    items.forEach((it, i) => gsap.set(it, i === 0 ? { autoAlpha: 1, scale: 1 } : { autoAlpha: 0, scale: 0.86 }))
    setRef.current(0)

    const activate = (next) => {
      if (next === cur || next < 0 || next > last) return
      const prev = cur
      cur = next
      setRef.current(next)
      tl?.kill()
      items.forEach((it, i) => i !== prev && i !== next && gsap.set(it, { autoAlpha: 0, scale: 0.86 }))
      if (reduce) {
        gsap.set(items[prev], { autoAlpha: 0, scale: 0.86 })
        gsap.set(items[next], { autoAlpha: 1, scale: 1 })
        return
      }
      tl = gsap
        .timeline()
        .to(items[prev], { scale: 0.86, autoAlpha: 0, duration: 0.267, ease: E.Eas49 })
        .fromTo(items[next], { scale: 0.86, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.3, ease: E.Eas1739 })
    }

    ScrollTrigger.create({
      trigger: wrap,
      start: 'top top+=20%',
      endTrigger: spacer,
      end: 'bottom bottom',
      pin: wrap,
      pinSpacing: false,
      scrub: true,
      onUpdate: (self) => activate(Math.round(self.progress * last)),
      onEnter: () => activate(0),
      onLeaveBack: () => activate(0),
      onLeave: () => activate(last),
      onEnterBack: () => activate(last),
    })

    let hashTimer = null
    const onHash = () => {
      const i = items.findIndex((it) => it.id && `#${it.id}` === window.location.hash)
      if (i < 0) return
      clearTimeout(hashTimer)
      hashTimer = setTimeout(() => activate(i), 500)
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    api.current = { activate }
    return () => {
      clearTimeout(hashTimer)
      window.removeEventListener('hashchange', onHash)
      tl?.kill()
      api.current = null
    }
  })
  return (i) => api.current?.activate(i)
}

/* §1.10 BenefitGroup — homepage compliance tabs (HomeComplianceSection/TabItem port) without lottie art --------- */
/**
 * Same timings as src/motion/compliance.js, scoped to `ref` instead of #homepage-compliance.
 * Returns select(i); `active` is React state, `setShownItem` receives the item that carries `.active`.
 */
export function useBenefitGroupMotion(ref, active, setActive, setShownItem) {
  const api = useRef(null)
  const activeRef = useRef(active)
  const setRef = useRef(setActive)
  setRef.current = setActive
  const shownRef = useRef(setShownItem)
  shownRef.current = setShownItem

  useBlockMotion(ref, (section, { isDesktop, reduce }) => {
    const title = $('[data-bg-title]', section)
    const tabsWrap = $('[data-bg-tabs]', section)
    const items = $$('[data-bg-items] > [data-bg-item]', section)
    const bgList = $('[data-bg-list]', section)
    const parts = items.map((li) => ({
      li,
      texts: $$('[data-bg-text]', li),
      dividers: $$('[data-bg-divider]', li),
      visual: $('[data-bg-image]', li),
      list: $('.list-element', li),
    }))
    let cur = activeRef.current
    shownRef.current?.(cur)
    let switching = false
    let revealed = false
    const heightOf = (i) => (isDesktop ? parts[i].li.getBoundingClientRect().height : parts[i].list.getBoundingClientRect().height)
    parts.forEach((p, i) => gsap.set(p.li, { autoAlpha: i === cur ? 1 : 0, zIndex: i === cur ? 1 : 0 }))
    const placeBg = () => !switching && bgList && gsap.set(bgList, { height: heightOf(cur) })
    placeBg()
    document.fonts?.ready.then(placeBg)
    window.addEventListener('resize', placeBg)

    if (!reduce) gsap.set([title, tabsWrap], { y: 100, autoAlpha: 0 })
    sectionTrigger(section, {
      onActivate: () => {
        if (revealed || reduce) return
        revealed = true
        gsap
          .timeline()
          .fromTo(title, { y: 100 }, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, 0)
          .fromTo(tabsWrap, { y: 100 }, { y: 0, autoAlpha: 1, duration: f(32), ease: E.Eas17 }, f(10))
      },
    })

    const select = (i) => {
      if (i === cur || switching || i < 0 || i >= parts.length) return
      setRef.current(i)
    }
    const change = (next) => {
      if (next === cur) return
      const prev = cur
      cur = next
      const o = parts[prev]
      const n = parts[next]
      if (reduce) {
        gsap.set(o.li, { autoAlpha: 0, zIndex: 0 })
        gsap.set(n.li, { autoAlpha: 1, zIndex: 1 })
        gsap.set(bgList, { height: heightOf(next) })
        shownRef.current?.(next)
        return
      }
      switching = true
      gsap
        .timeline({ immediateRender: false, force3D: false })
        .fromTo(o.texts, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -55, stagger: f(5), duration: f(28), ease: E.Eas66 }, 0)
        .fromTo(o.dividers, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -55, stagger: f(5), duration: f(28), ease: E.Eas66 }, 0)
        .fromTo(o.visual, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 1.07, duration: f(28), ease: E.Eas66, transformOrigin: '100% 100%' }, 0)
        .set(o.li, { autoAlpha: 0, zIndex: 0 })
        .eventCallback('onComplete', () => {
          shownRef.current?.(next)
          gsap
            .timeline({ immediateRender: false, force3D: false, onComplete: () => (switching = false) })
            .set(n.li, { autoAlpha: 1, zIndex: 1 })
            .to(bgList, { height: heightOf(next), duration: 0.1, ease: E.Eas17 })
            .fromTo(n.texts, { autoAlpha: 0, y: 55 }, { autoAlpha: 1, y: 0, stagger: f(5), duration: f(28), ease: E.Eas17 }, 0)
            .fromTo(n.dividers, { autoAlpha: 0, y: 55 }, { autoAlpha: 1, y: 0, stagger: f(5), duration: f(28), ease: E.Eas17 }, f(5))
            .fromTo(n.visual, { scale: 0.93, autoAlpha: 0 }, { autoAlpha: 1, scale: 1, duration: f(28), ease: E.Eas17, transformOrigin: '100% 100%' }, 0)
        })
    }
    api.current = { select, change }
    return () => {
      window.removeEventListener('resize', placeBg)
      api.current = null
    }
  })

  useLayoutEffect(() => {
    activeRef.current = active
    api.current?.change(active)
  }, [active])

  return (i) => (api.current ? api.current.select(i) : setRef.current(i))
}
