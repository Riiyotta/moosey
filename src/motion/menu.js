/**
 * §2 mobile/tablet menu — port of mobileMenu-CRLiOzfg.js (class Ra):
 * gsap.timeline({paused:true}).to(menu, { duration: f(40) = .667s, y: header.getBoundingClientRect().bottom + 8,
 *   ease: CustomEase(".57,0,.43,1"), onStart: visibility visible, onReverseComplete: visibility hidden })
 * Open = play(), close = reverse(). The target y is measured once (the original measures at setup).
 */
import { useLayoutEffect, useRef } from 'react'
import { E, f, gsap, prefersReducedMotion } from './core'

export function useMobileMenu(menuRef, headerRef, open) {
  const state = useRef({ tl: null, ctx: null, y: null })

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {})
    state.current.ctx = ctx
    return () => {
      ctx.revert()
      state.current = { tl: null, ctx: null, y: null }
    }
  }, [])

  useLayoutEffect(() => {
    const menu = menuRef.current
    const header = headerRef.current
    const s = state.current
    if (!menu || !header || !s.ctx) return
    if (!open && !s.tl) return
    if (s.y == null) s.y = header.getBoundingClientRect().bottom + 8
    if (prefersReducedMotion()) {
      s.ctx.add(() => gsap.set(menu, { y: open ? s.y : '-100%', visibility: open ? 'visible' : 'hidden' }))
      return
    }
    if (!s.tl) {
      s.ctx.add(() => {
        s.tl = gsap.timeline({ paused: true }).to(menu, {
          duration: f(40),
          y: s.y,
          ease: E.menu,
          onStart: () => {
            menu.style.visibility = 'visible'
          },
          onReverseComplete: () => {
            menu.style.visibility = 'hidden'
          },
        })
      })
    }
    if (open) s.tl.play()
    else s.tl.reverse()
  }, [open, menuRef, headerRef])
}
