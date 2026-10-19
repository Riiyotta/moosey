/**
 * Motion core — GSAP + CustomEase + ScrollTrigger, the original's ease table,
 * frame helper, JS rem and the base "Section" activation trigger.
 *
 * Source of every value: the original's shipped modules (animation-BrPXSbUB.js,
 * section-BJpyscwM.js, mobileMenu-CRLiOzfg.js), re-read 2026-10-16.
 */
import { gsap } from 'gsap'
import { CustomEase } from 'gsap/CustomEase'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(CustomEase, ScrollTrigger)
// original: ScrollTrigger.config({ ignoreMobileResize: true })
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, CustomEase }

/** animation-BrPXSbUB.js — CustomEase.create(name, "x1, y1, x2, y2") */
export const E = {
  Eas17: CustomEase.create('nwEas17', '0.17, 0.17, 0.21, 1.00'),
  Eas82: CustomEase.create('nwEas82', '0.82, 0.00, 0.22, 1.00'),
  Eas69: CustomEase.create('nwEas69', '0.69, 0.00, 0.32, 1.27'),
  Eas66: CustomEase.create('nwEas66', '0.66, 0.00, 0.83, 0.83'),
  Eas70: CustomEase.create('nwEas70', '0.70, 0.00, 0.83, 0.83'),
  Eas40: CustomEase.create('nwEas40', '0.40, 0.00, 0.83, 0.83'),
  Eas1739: CustomEase.create('nwEas1739', '0.17, 0.17, 0.39, 1.00'),
  Eas1754: CustomEase.create('nwEas1754', '0.17, 0.17, 0.54, 1.00'),
  Eas7937: CustomEase.create('nwEas7937', '0.79, 0.00, 0.37, 1.00'),
  Eas7983: CustomEase.create('nwEas7983', '0.79, 0.00, 0.83, 0.83'),
  Eas49: CustomEase.create('nwEas49', '0.49, 0.00, 0.83, 0.83'),
  /** mobileMenu: CustomEase.create("customEaseInOut", ".57,0,.43,1") */
  menu: CustomEase.create('nwMenu', '.57,0,.43,1'),
}

/** Shared constants (animation-BrPXSbUB.js) */
export const T = { duration550: 0.55, duration567: 0.567, delay60: 0.06, delay66: 0.066 }

/** Frame helper: f(n) = n / 60 seconds */
export const f = (n) => n / 60

/** Breakpoint media queries (section-BJpyscwM.js) */
export const MQ = {
  isDesktop: '(min-width: 1025px)',
  isTablet: '(min-width: 481px) and (max-width: 1024px)',
  isMobile: '(max-width: 480px)',
  reduce: '(prefers-reduced-motion: reduce)',
}

export const bpName = () =>
  window.matchMedia(MQ.isDesktop).matches ? 'Desktop' : window.matchMedia(MQ.isTablet).matches ? 'Tablet' : 'Mobile'

/** JS rem = document.body.clientWidth / (1440 | 768 | 375) */
export const rem = () => {
  const w = document.body.clientWidth || window.innerWidth
  const b = bpName()
  return w / (b === 'Desktop' ? 1440 : b === 'Tablet' ? 768 : 375)
}

export const prefersReducedMotion = () => window.matchMedia(MQ.reduce).matches

/**
 * Base Section activation (section-BJpyscwM.js):
 * ScrollTrigger.create({ trigger, start: "top bottom-=25%", end: "bottom top-=25%", scrub: true,
 *   onEnter/onEnterBack/onUpdate: activate, onLeave/onLeaveBack: deactivate })
 * activate/deactivate are guarded by an `_active` flag exactly like the original base component.
 */
export function sectionTrigger(trigger, { start = 'top bottom-=25%', end = 'bottom top-=25%', onActivate, onDeactivate } = {}) {
  let active = false
  const activate = () => {
    if (active) return
    active = true
    onActivate?.()
  }
  const deactivate = () => {
    if (!active) return
    active = false
    onDeactivate?.()
  }
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    onEnter: activate,
    onEnterBack: activate,
    onUpdate: (self) => self.isActive && activate(),
    onLeave: deactivate,
    onLeaveBack: deactivate,
  })
}

/** querySelector helpers */
export const $ = (sel, root = document) => root.querySelector(sel)
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel))

// dev-only handle for motion QA in the browser console
if (import.meta.env?.DEV) window.__nwMotion = { gsap, ScrollTrigger }
