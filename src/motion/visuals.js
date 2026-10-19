/**
 * Lottie stand-ins. The original's Lottie art is NOT reproduced; these are original, simple
 * GSAP timelines over our own inline SVG art (InlineSvg ids are `<uid>-<data-id>`).
 *
 * Each stand-in mirrors the original lottie-web wrapper (lottie-C5q3F-Vq.js) contract:
 *   - exact duration (totalFrames / frameRate of the original JSON, re-read 2026-10-16)
 *   - loop or once (once = hold the last frame, like lottie with loop:false)
 *   - activate():  show (if hideOnDeactivate) + play; a completed animation restarts from 0
 *   - deactivate(): hide (if hideOnDeactivate) + goToAndStop(0)
 *   - restart():   goToAndPlay(0)
 */
import { E, gsap } from './core'

/** Durations (s) of the original Lottie files: (op - ip) / fr */
export const DUR = {
  heroDesktop: [492 / 30, 419 / 30, 85 / 30], // 16.400, 13.967, 2.833
  heroMobile: [492 / 30, 419 / 30, 84 / 30], // 16.400, 13.967, 2.800 (also used on tablet)
  linesDesktop: 127 / 60, // 2.117 (desktop + tablet)
  linesMobile: 95 / 60, // 1.583
  dotsDesktop: 371 / 60, // 6.183
  dotsMobile: 228 / 60, // 3.800
  cta: 120 / 60, // 2.000 (compliance CTA + bottom CTA)
  roadmap: [479 / 60, 320 / 60, 360 / 60], // 7.983, 5.333, 6.000
  peace: [146 / 30, 191 / 30, 183 / 30, 214 / 30], // 4.867, 6.367, 6.100, 7.133
}

const back = 'back.out(1.6)'
const sine = 'sine.inOut'

/* ---------------------------------------------------------------- helpers */

function scope(root) {
  const q = (id) => root.querySelector(`[data-id="${id}"]`)
  const qa = (sel) => Array.from(root.querySelectorAll(sel))
  const ids = (prefix) => qa(`[data-id^="${prefix}"]`)
  return { q, qa, ids }
}

const alive = (els) => (Array.isArray(els) ? els.filter(Boolean) : els ? [els] : [])

function popIn(tl, els, at, { stagger = 0, duration = 0.4, from = 0.6, ease = back } = {}) {
  els = alive(els)
  if (!els.length) return
  tl.fromTo(
    els,
    { autoAlpha: 0, scale: from, transformOrigin: '50% 50%' },
    { autoAlpha: 1, scale: 1, duration, ease, stagger },
    at,
  )
}

/** relative offsets (SVG groups often carry a translate() attribute GSAP parses into x/y) */
function riseIn(tl, els, at, { x = 0, y = 12, stagger = 0, duration = 0.5, ease = E.Eas17 } = {}) {
  els = alive(els)
  if (!els.length) return
  const from = { autoAlpha: 0, immediateRender: true }
  if (x) from.x = `${x > 0 ? '+=' : '-='}${Math.abs(x)}`
  if (y) from.y = `${y > 0 ? '+=' : '-='}${Math.abs(y)}`
  tl.from(els, { ...from, duration, ease, stagger }, at)
}

/** pathLength="1" paths */
function draw(tl, el, at, duration, ease = 'power2.out') {
  if (!el) return
  tl.fromTo(el, { strokeDasharray: '1 2', strokeDashoffset: 1 }, { strokeDashoffset: 0, duration, ease }, at)
}

/** paths without pathLength */
function drawLen(tl, el, at, duration, ease = 'power2.out') {
  if (!el) return
  const len = el.getTotalLength ? el.getTotalLength() : 100
  tl.fromTo(el, { strokeDasharray: `${len} ${len + 2}`, strokeDashoffset: len }, { strokeDashoffset: 0, duration, ease }, at)
}

/** stroke-dasharray "<on> <circ>" arcs: grow the dash from 0 */
function arcGrow(tl, el, at, duration, ease = 'power2.out') {
  if (!el) return
  const [on, total] = (el.getAttribute('stroke-dasharray') || '0 0').split(/[\s,]+/).map(Number)
  tl.fromTo(el, { strokeDasharray: `0 ${total}` }, { strokeDasharray: `${on} ${total}`, duration, ease }, at)
}

function bob(tl, el, at, { y = 6, period = 2, cycles = 2 } = {}) {
  if (!el) return
  tl.to(el, { y: `${y > 0 ? '+=' : '-='}${Math.abs(y)}`, duration: period / 2, ease: sine, yoyo: true, repeat: cycles * 2 - 1 }, at)
}

/**
 * Create a lottie-like controller.
 * build(tl, scope) adds tweens; the timeline is padded to exactly `duration`.
 */
export function createVisual(root, build, { duration, loop = false, hideOnDeactivate = false, hideTarget, reduced = false } = {}) {
  if (!root) return nullVisual(duration)
  const tl = gsap.timeline({ paused: true, repeat: loop ? -1 : 0 })
  build(tl, scope(root), root)
  if (tl.duration() < duration) tl.set({}, {}, duration)
  const hide = hideTarget || root
  let completed = true
  let active = false
  tl.eventCallback('onComplete', () => {
    completed = true
  })
  if (reduced) tl.progress(loop ? 0 : 1).pause()
  else tl.progress(0).pause()
  if (hideOnDeactivate) gsap.set(hide, { autoAlpha: 0 })

  const api = {
    tl,
    duration,
    get isActive() {
      return active
    },
    play() {
      if (reduced) return
      if (completed) {
        tl.pause(0)
        completed = false
      }
      tl.play()
    },
    restart() {
      if (reduced) return
      completed = false
      tl.play(0)
    },
    stop() {
      if (reduced) return
      tl.pause(0)
      completed = false
    },
    activate({ fade = 0 } = {}) {
      if (active) return
      active = true
      if (hideOnDeactivate) {
        gsap.killTweensOf(hide)
        if (fade && !reduced) gsap.to(hide, { autoAlpha: 1, duration: fade, ease: E.Eas17 })
        else gsap.set(hide, { autoAlpha: 1 })
      }
      api.play()
    },
    deactivate() {
      if (!active) return
      active = false
      if (hideOnDeactivate) {
        gsap.killTweensOf(hide)
        gsap.set(hide, { autoAlpha: 0 })
      }
      api.stop()
    },
  }
  return api
}

function nullVisual(duration = 0) {
  const noop = () => {}
  return { tl: null, duration, isActive: false, play: noop, restart: noop, stop: noop, activate: noop, deactivate: noop }
}

export const svgRoot = (uid) => document.querySelector(`[data-svg="${uid}"]`)

/* ------------------------------------------------------------- builders */

/** Hero tab 1 — "Company Setup": building + checklist. 16.40s once. */
function heroTab1(tl, { q, qa }) {
  qa('.edge').forEach((p, i) => draw(tl, p, 0.1 + i * 0.15, 1.1, 'power1.inOut'))
  popIn(tl, qa('.edge-node'), 0, { stagger: 0.2, from: 0 })
  tl.from(q('progress-fill'), { scaleX: 0, transformOrigin: '0% 50%', duration: 1.8, ease: 'power2.inOut', immediateRender: true }, 0.2)
  riseIn(tl, q('scene'), 0.35, { y: 20, duration: 0.7 })
  tl.from(q('flag'), { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, ease: E.Eas17, immediateRender: true }, 1.0)
  popIn(tl, qa('.row'), 1.3, { stagger: 0.3, from: 0.4 })
  riseIn(tl, q('float-left'), 1.8, { x: -24, y: 0, duration: 0.6 })
  popIn(tl, q('float-check'), 2.2, { from: 0 })
  riseIn(tl, q('float-right'), 2.3, { y: -16, duration: 0.6 })
  // flag flutter + idle drift, back at rest before the 16.40s interval ends
  const flag = q('flag')
  if (flag) tl.to(flag, { skewY: 6, transformOrigin: '0% 50%', duration: 0.6, ease: sine, yoyo: true, repeat: 15 }, 3.0)
  bob(tl, q('float-left'), 3.2, { y: -6, period: 4, cycles: 3 })
  bob(tl, q('float-right'), 3.6, { y: 6, period: 4, cycles: 3 })
}

/** Hero tab 2 — "Monthly": calendar + reminders. 13.97s once. */
function heroTab2(tl, { q, qa }) {
  qa('[data-id="edges"] .edge').forEach((p, i) => draw(tl, p, 0.1 + i * 0.15, 1.1, 'power1.inOut'))
  popIn(tl, qa('.edge-node'), 0, { stagger: 0.2, from: 0 })
  riseIn(tl, q('scene'), 0.2, { y: 20, duration: 0.7 })
  popIn(tl, qa('.cal-dot'), 0.6, { stagger: 0.02, from: 0 })
  popIn(tl, qa('.chip'), 0.9, { stagger: 0.15, from: 0.8 })
  qa('.edge').filter((p) => !p.closest('[data-id="edges"]')).forEach((p, i) => draw(tl, p, 1.2 + i * 0.15, 0.6))
  popIn(tl, q('cal-highlight'), 1.9, { from: 0.3 })
  popIn(tl, q('bell'), 2.1, { from: 0.5 })
  riseIn(tl, q('float-right'), 2.4, { x: 24, y: 0, duration: 0.6 })
  const bell = q('bell')
  const ring = (at) =>
    bell && tl.to(bell, { keyframes: { rotation: [0, 14, -12, 9, -6, 0] }, transformOrigin: '50% 0%', duration: 1, ease: 'none' }, at)
  ring(3.0)
  ring(7.0)
  ring(11.0)
  const hl = q('cal-highlight')
  ;[5, 9, 12].forEach((at) => hl && tl.to(hl, { scale: 1.2, transformOrigin: '50% 50%', duration: 0.35, yoyo: true, repeat: 1, ease: sine }, at))
  bob(tl, q('float-right'), 3.4, { y: -5, period: 5, cycles: 2 })
}

/** Hero tab 3 — "Quarterly": document gets filed. 2.83s (2.80s mobile/tablet) once, then the popup opens. */
function heroTab3(tl, { q, qa }) {
  qa('.edge').forEach((p) => draw(tl, p, 0, 0.7, 'power1.inOut'))
  popIn(tl, qa('.edge-node'), 0, { from: 0, duration: 0.3 })
  riseIn(tl, q('document'), 0.05, { y: 16, duration: 0.45 })
  popIn(tl, q('status-pill'), 0.2, { duration: 0.35, from: 0.7 })
  riseIn(tl, qa('[data-id^="detail-"]'), 0.35, { x: -10, y: 0, stagger: 0.08, duration: 0.35 })
  draw(tl, q('stepper-line'), 0.3, 1.4, 'power1.inOut')
  popIn(tl, qa('.step'), 0.3, { stagger: 0.45, duration: 0.3 })
  riseIn(tl, q('float-left'), 0.6, { x: -20, y: 0, duration: 0.5 })
  riseIn(tl, q('float-right'), 0.8, { x: 20, y: 0, duration: 0.5 })
  popIn(tl, q('stamp'), 1.95, { from: 1.6, duration: 0.4, ease: 'back.out(2)' })
}

/** Hero popup visual rows (plays with the popup open timeline) */
function heroPopup(tl, { qa }) {
  riseIn(tl, qa('.stat'), 0, { stagger: 0.08, y: 10, duration: 0.4 })
  riseIn(tl, qa('[data-id^="row-"]'), 0.15, { x: -12, y: 0, stagger: 0.12, duration: 0.45 })
}

/** Everything network — lines lottie (once). */
function networkLines(L) {
  return (tl, { q, qa }) => {
    const lines = qa('.line')
    const rings = q('rings')
    if (rings) tl.from(rings, { autoAlpha: 0, scale: 0.92, transformOrigin: '50% 50%', duration: L * 0.45, ease: E.Eas17, immediateRender: true }, 0)
    popIn(tl, q('hub'), 0, { duration: 0.45, from: 0.7 })
    const drawDur = L * 0.42
    const stagger = lines.length > 1 ? (L - 0.1 - drawDur - 0.3) / (lines.length - 1) : 0
    lines.forEach((line, i) => {
      const at = 0.1 + i * stagger
      draw(tl, line, at, drawDur, 'power1.inOut')
      const n = line.getAttribute('data-id').replace('line-', '')
      popIn(tl, q(`node-${n}`), at + drawDur - 0.08, { duration: 0.3, from: 0.5 })
    })
  }
}

/** Everything network — dots lottie (loop): dots travel hub -> node along their data-line path. */
function networkDots(D) {
  return (tl, { q, qa }, root) => {
    const dots = qa('.dot')
      .map((dot) => {
        const path = root.querySelector(`[id="${dot.getAttribute('data-line')}"]`)
        if (!path) return null
        return { dot, path, len: path.getTotalLength(), off: parseFloat(dot.getAttribute('data-offset') || '0') }
      })
      .filter(Boolean)
    const proxy = { v: 0 }
    const render = () => {
      for (const d of dots) {
        const p = (proxy.v + d.off) % 1
        const pt = d.path.getPointAtLength(p * d.len)
        d.dot.setAttribute('cx', pt.x.toFixed(2))
        d.dot.setAttribute('cy', pt.y.toFixed(2))
        d.dot.style.opacity = Math.max(0, Math.min(1, p / 0.12, (1 - p) / 0.12)).toFixed(3)
      }
    }
    tl.fromTo(proxy, { v: 0 }, { v: 1, duration: D, ease: 'none', onUpdate: render, immediateRender: true, onStart: render }, 0)
    render()
    const halo = q('hub-halo')
    if (halo) {
      tl.fromTo(
        halo,
        { scale: 1, opacity: 0.5, transformOrigin: '50% 50%' },
        { scale: 1.14, opacity: 0.18, duration: D / 4, ease: sine, yoyo: true, repeat: 3 },
        0,
      )
    }
  }
}

/** Compliance tab art — one-shot detail pass when a role tab comes in (~1.2s). */
const complianceArt = {
  finance(tl, { q, qa }) {
    riseIn(tl, qa('[data-id^="row-"]'), 0.05, { x: -10, y: 0, stagger: 0.08, duration: 0.45 })
    riseIn(tl, q('chart-card'), 0.15, { y: 12 })
    tl.from(qa('.bar'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.55, ease: E.Eas17, stagger: 0.08, immediateRender: true }, 0.3)
  },
  'head-of-people'(tl, { q, qa }) {
    riseIn(tl, q('side-card'), 0.1, { y: 12 })
    riseIn(tl, qa('[data-id^="row-"]'), 0.15, { x: -10, y: 0, stagger: 0.08, duration: 0.45 })
    popIn(tl, qa('.loc-on'), 0.2, { stagger: 0.06, duration: 0.35, from: 0.3 })
  },
  legal(tl, { q, qa }) {
    riseIn(tl, qa('[data-id^="row-"]'), 0.05, { x: -10, y: 0, stagger: 0.08, duration: 0.45 })
    riseIn(tl, q('mail-card'), 0.1, { y: 12 })
    drawLen(tl, q('envelope'), 0.2, 0.6)
    riseIn(tl, q('sign-card'), 0.25, { y: 12 })
    draw(tl, q('signature'), 0.45, 0.8, 'power1.inOut')
  },
  startup(tl, { q, qa }) {
    riseIn(tl, qa('[data-id^="row-"]'), 0.05, { x: -10, y: 0, stagger: 0.07, duration: 0.45 })
    riseIn(tl, q('ring-card'), 0.15, { y: 12 })
    arcGrow(tl, q('progress-ring'), 0.3, 0.9)
  },
}

/** Compliance CTA card art — 2.00s loop, every property returns to its frame-0 value. */
function complianceCta(tl, { q, qa }) {
  const D = DUR.cta
  tl.to(q('front-card'), { keyframes: { y: [0, -4, 0] }, duration: D, ease: sine }, 0)
  tl.to(q('back-card-1'), { keyframes: { y: [0, -2, 0] }, duration: D, ease: sine }, 0)
  tl.to(q('back-card-2'), { keyframes: { y: [0, -1, 0] }, duration: D, ease: sine }, 0)
  const bar = q('scan-bar')
  if (bar) tl.fromTo(bar, { opacity: 0, scaleY: 0, transformOrigin: '50% 0%' }, { keyframes: { opacity: [0, 0.9, 0.9, 0], scaleY: [0, 1, 1, 1] }, duration: 1.2, ease: 'none' }, 0.2)
  qa('.toggle-knob').forEach((k, i) =>
    tl.to(k, { keyframes: { scale: [1, 0.72, 1] }, transformOrigin: '50% 50%', duration: 0.32, ease: sine }, 0.3 + i * 0.3),
  )
  const pill = q('status-pill')
  if (pill) tl.to(pill, { keyframes: { scale: [1, 1.08, 1] }, transformOrigin: '50% 50%', duration: 0.45, ease: sine }, 1.3)
}

/** CTA soft background — ring pulse + glow breathe, 2.00s loop (runs with its CTA). */
function ctaBg(tl, { q, qa }) {
  const D = DUR.cta
  qa('.ring').forEach((r, i) =>
    tl.to(r, { keyframes: { scale: [1, 1.035, 1], opacity: [1, 0.55, 1] }, transformOrigin: '50% 50%', duration: D * 0.7, ease: sine }, i * 0.15),
  )
  const glow = q('glow-fill')
  if (glow) tl.to(glow, { keyframes: { opacity: [1, 0.7, 1] }, duration: D, ease: sine }, 0)
}

/** Bottom CTA art — 2.00s loop. */
function bottomCta(tl, { q, qa }) {
  const D = DUR.cta
  qa('.ripple').forEach((r, i) =>
    tl.fromTo(
      r,
      { scale: 0.94, opacity: 0, transformOrigin: '50% 50%' },
      { keyframes: { scale: [0.94, 1, 1.04], opacity: [0, 1, 0] }, duration: 1.2, ease: 'none' },
      i * 0.3,
    ),
  )
  tl.to(q('card'), { keyframes: { y: [0, -4, 0] }, duration: D, ease: sine }, 0)
  const check = q('big-check')
  if (check) tl.to(check, { keyframes: { scale: [1, 1.12, 1] }, transformOrigin: '50% 50%', duration: 0.5, ease: sine }, 0.1)
  tl.to(q('chip-left'), { keyframes: { y: [0, 4, 0] }, duration: D, ease: sine }, 0)
  tl.to(q('chip-right'), { keyframes: { y: [0, -4, 0] }, duration: D, ease: sine }, 0)
}

/** Benefits pictograms — once, with the card reveal (~1.2s). */
const benefitArt = {
  1(tl, { q, qa }) {
    draw(tl, q('trend'), 0, 1.0)
    const area = qa('.area')
    if (area.length) tl.fromTo(area, { opacity: 0 }, { opacity: 0.35, duration: 0.8, ease: E.Eas17 }, 0.3)
    popIn(tl, q('points')?.children ? Array.from(q('points').children) : [], 0.45, { stagger: 0.15, duration: 0.35, from: 0 })
  },
  2(tl, { q, qa }) {
    tl.from(qa('.bar'), { scaleY: 0, transformOrigin: '50% 100%', duration: 0.5, ease: E.Eas17, stagger: 0.08, immediateRender: true }, 0)
    popIn(tl, q('badge'), 0.55, { from: 0.3 })
  },
  3(tl, { q }) {
    drawLen(tl, q('gauge-arc'), 0, 0.9)
    const needle = q('needle')
    if (needle) tl.from(needle, { rotation: -100, svgOrigin: '86 58', duration: 1.1, ease: 'back.out(1.4)', immediateRender: true }, 0.1)
  },
}

/** Roadmap step art — once, original lengths 7.98s / 5.33s / 6.00s. */
const roadmapArt = [
  (tl, { q, qa }) => {
    popIn(tl, qa('.cell-on'), 0.3, { stagger: 0.5, duration: 0.35, from: 0.4 })
    const mag = q('magnifier')
    if (mag) tl.from(mag, { x: '-=230', y: '-=40', duration: 4.5, ease: sine, immediateRender: true }, 0.2)
    popIn(tl, qa('[data-id^="tag-"]'), 5.0, { stagger: 0.25, from: 0.7 })
  },
  (tl, { q, qa }) => {
    riseIn(tl, qa('.field'), 0.3, { x: -12, y: 0, stagger: 0.5 })
    popIn(tl, q('submit'), 2.2, { from: 0.8 })
    const submit = q('submit')
    if (submit) tl.to(submit, { keyframes: { scale: [1, 0.94, 1] }, transformOrigin: '50% 50%', duration: 0.3, ease: sine }, 3.0)
    riseIn(tl, q('toast'), 3.4, { y: 16, duration: 0.6 })
  },
  (tl, { q, qa }) => {
    popIn(tl, qa('.event'), 0.4, { stagger: 0.45, duration: 0.35, from: 0.4 })
    riseIn(tl, q('toast'), 2.4, { y: 16, duration: 0.6 })
    const icon = q('renew-icon')
    if (icon) tl.to(icon, { rotation: 360, transformOrigin: '50% 50%', duration: 1.2, ease: 'power2.inOut' }, 3.0)
  },
]

/** Peace step art — once on step/slide activation, original lengths 4.87 / 6.37 / 6.10 / 7.13s. */
const peaceArt = [
  (tl, { qa }) => {
    riseIn(tl, qa('.alert'), 0.3, { x: 30, y: 0, stagger: 0.6, duration: 0.6 })
    qa('.alert').forEach((a, i) =>
      tl.to(a, { keyframes: { scale: [1, 1.03, 1] }, transformOrigin: '50% 50%', duration: 0.5, ease: sine }, 2.4 + i * 0.4),
    )
  },
  (tl, { q }) => {
    riseIn(tl, q('envelope'), 0.3, { y: 14 })
    riseIn(tl, q('arrow'), 0.9, { x: -16, y: 0, duration: 0.5 })
    riseIn(tl, q('document'), 1.3, { y: 16 })
    const scan = q('scan-line')
    if (scan) {
      tl.fromTo(scan, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2 }, 1.9)
      tl.to(scan, { y: '+=76', duration: 1, ease: sine, yoyo: true, repeat: 1 }, 2.0)
      tl.to(scan, { autoAlpha: 0, duration: 0.2 }, 4.0)
    }
    const hl = q('highlight')
    if (hl) tl.from(hl, { scaleX: 0, transformOrigin: '0% 50%', duration: 0.5, ease: E.Eas17, immediateRender: true }, 4.2)
    popIn(tl, q('status-pill'), 5.0, { from: 0.7 })
  },
  (tl, { q, qa }) => {
    popIn(tl, q('shield'), 0.3, { from: 0.6, duration: 0.5 })
    const orbit = q('orbit')
    if (orbit) tl.fromTo(orbit, { rotation: 0 }, { rotation: 120, svgOrigin: '212 132', duration: DUR.peace[2], ease: 'none' }, 0)
    popIn(tl, qa('[data-id^="chip-"]'), 1.0, { stagger: 0.5, from: 0.6 })
  },
  (tl, { q, qa }) => {
    draw(tl, q('timeline'), 0.3, 3, 'power1.inOut')
    qa('.milestone').forEach((m, i) => popIn(tl, m, 0.4 + i * 0.95, { duration: 0.35, from: 0.4 }))
    riseIn(tl, q('badge'), 4.0, { y: 14 })
  },
]

/** Footer edge line draw-on (once on view). */
export function footerLine(root, reduced) {
  return createVisual(
    root,
    (tl, { q }) => {
      draw(tl, q('line'), 0, 1.6, E.Eas17)
      popIn(tl, q('dot'), 1.35, { from: 0, duration: 0.4 })
    },
    { duration: 1.75, reduced },
  )
}

/* -------------------------------------------------------------- factory */

export const builders = {
  heroTab: [heroTab1, heroTab2, heroTab3],
  heroPopup,
  networkLines,
  networkDots,
  complianceArt,
  complianceCta,
  ctaBg,
  bottomCta,
  benefitArt,
  roadmapArt,
  peaceArt,
}
