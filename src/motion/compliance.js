/**
 * §7 Compliance by role — port of HomeComplianceSection (index.html-ByEF1glV.js class `E`) and
 * HomeComplianceTabItem (HomeComplianceTabItem-D7tgyNx4.js). syncActivate: out completes, THEN in.
 *
 * Section reveal (base trigger "top bottom-=25%"): .title-wrap {y 100->0, autoAlpha->1, f(32), Eas17} at 0,
 * .tabs-wrap same at f(10). y is raw px (no rem) in the original.
 * Out: text blocks + dividers {autoAlpha 1->0, y 0->-55, stagger f(5), f(28), Eas66};
 *      image {autoAlpha->0, scale 1->1.07, origin 100% 100%, f(28), Eas66}; then item autoAlpha 0, z 0.
 * In:  item autoAlpha 1, z 1; .bg-list height -> new height (.1s, Eas17);
 *      text {autoAlpha 0->1, y 55->0, stagger f(5), f(28), Eas17} at 0; dividers same at f(5);
 *      image {scale .93->1, autoAlpha 0->1, origin 100% 100%, f(28), Eas17} at 0.
 * bg-list height = item height on desktop, list-element height otherwise (getHeightList()).
 */
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { $, $$, E, MQ, f, gsap, sectionTrigger } from './core'
import { builders, createVisual, svgRoot } from './visuals'

const ART = ['startup', 'head-of-people', 'finance', 'legal']

export function useComplianceMotion(active, setActive, setShownItem) {
  const api = useRef(null)
  const activeRef = useRef(active)
  const setRef = useRef(setActive)
  setRef.current = setActive
  const shownRef = useRef(setShownItem)
  shownRef.current = setShownItem

  useLayoutEffect(() => {
    const section = document.getElementById('homepage-compliance')
    if (!section) return
    const mm = gsap.matchMedia()
    mm.add({ isDesktop: MQ.isDesktop, isTablet: MQ.isTablet, isMobile: MQ.isMobile, reduce: MQ.reduce }, (ctx) => {
      const { isDesktop, reduce } = ctx.conditions
      const title = $('[data-anim="compliance-title"]', section)
      const tabsWrap = $('[data-anim="compliance-tabs"]', section)
      const items = $$('[data-tab-items="compliance"] > [data-tab-item]', section)
      const bgList = $('[data-compliance-bg-list]', section)
      const parts = items.map((li) => ({
        li,
        texts: $$('[data-compliance-text]', li),
        dividers: $$('[data-compliance-divider]', li),
        visual: $('[data-compliance-image]', li),
        list: $('.list-element', li),
      }))
      const art = ART.map((name) => createVisual(svgRoot(`compliance-${name}`), builders.complianceArt[name], { duration: 1.3, reduced: reduce }))

      let cur = activeRef.current
      shownRef.current?.(cur) // rebuild (breakpoint change mid-switch) -> resync the item class
      let switching = false
      let revealed = false

      const heightOf = (i) => (isDesktop ? parts[i].li.getBoundingClientRect().height : parts[i].list.getBoundingClientRect().height)
      parts.forEach((p, i) => gsap.set(p.li, { autoAlpha: i === cur ? 1 : 0, zIndex: i === cur ? 1 : 0 }))
      const placeBg = () => !switching && gsap.set(bgList, { height: heightOf(cur) })
      placeBg()
      document.fonts?.ready.then(() => ctx.isReverted || placeBg())
      window.addEventListener('resize', placeBg)

      if (!reduce) {
        gsap.set([title, tabsWrap], { y: 100, autoAlpha: 0 })
      }
      sectionTrigger(section, {
        onActivate: () => {
          if (revealed) return
          revealed = true
          art[cur].restart()
          if (reduce) return
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
        const out = gsap
          .timeline({ immediateRender: false, force3D: false })
          .fromTo(o.texts, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -55, stagger: f(5), duration: f(28), ease: E.Eas66 }, 0)
          .fromTo(o.dividers, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -55, stagger: f(5), duration: f(28), ease: E.Eas66 }, 0)
          .fromTo(o.visual, { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 1.07, duration: f(28), ease: E.Eas66, transformOrigin: '100% 100%' }, 0)
          .set(o.li, { autoAlpha: 0, zIndex: 0 })
          .add(() => art[prev].stop())
        out.eventCallback('onComplete', () => {
          // original: incoming .tab-item gets `.active` here (~640ms after click), not on click
          shownRef.current?.(next)
          art[next].restart()
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
    return () => mm.revert()
  }, [])

  useEffect(() => {
    activeRef.current = active
    api.current?.change(active)
  }, [active])

  return useCallback((i) => (api.current ? api.current.select(i) : setRef.current(i)), [])
}
