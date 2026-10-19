/** @type {import('tailwindcss').Config} */
// CommonJS on purpose: on Node >=20.19 an ESM tailwind.config.js is loaded via native
// require(esm) and never hot-reloads in the running Vite dev server.
const plugin = require('tailwindcss/plugin')

// ---------------------------------------------------------------------------
// Fluid unit (CLONE_SPEC §0.1). `--u` is defined in src/index.css:
//   <=480px: 100vw/320 · 481–1024px: 100vw/768 · >=1025px: 100vw/1440
// Every spacing/size key `<N>u` resolves to calc(var(--u) * N), e.g. `pt-55u`,
// `w-1302u`, `-top-147u`, `gap-24.5u`. Default Tailwind px spacing is kept for
// the spec's fixed-pixel exceptions (banner, flyout panel, hairlines, pt-12).
// ---------------------------------------------------------------------------
const u = (n) => `calc(var(--u) * ${n})`

const uSpacing = {}
for (let i = 0; i <= 2200; i++) uSpacing[`${i}u`] = u(i)
// fractional values that appear in the spec
;[0.5, 1.5, 2.5, 24.5, 54.4, 144.2, 276.1, 392.5, 407.6, 484.8].forEach((n) => {
  uSpacing[`${n}u`] = u(n)
})
uSpacing['3000u'] = u(3000)

// ---------------------------------------------------------------------------
// Type scale (CLONE_SPEC §0.4) — [size, line-height, letter-spacing, weight] in u
// m = mobile (<=480), t = tablet (481–1024), d = desktop (>=1025)
// ---------------------------------------------------------------------------
const type = {
  h0: { m: [55, 70, -2.2, 450], t: [75, 90, -3.6, 450], d: [130, 156, -5.2, 450] },
  h1: { m: [24, 28.8, -0.72, 500], t: [38, 45.6, -1.14, 500], d: [55, 66, -1.65, 500] },
  // h2 has no tablet class on the original -> tablet = mobile
  h2: { m: [32, 38.4, -0.64, 450], t: [32, 38.4, -0.64, 450], d: [42, 50.4, -0.84, 450] },
  h3: { m: [24, 26, -0.72, 500], t: [28, 33.6, -0.84, 500], d: [38, 45.6, -1.14, 500] },
  h4: { m: [20, 24, -0.04, 500], t: [20, 24, -0.04, 500], d: [28, 33.6, -0.64, 500] },
  h5: { m: [17, 22.1, -0.68, 500], t: [17, 22.1, -0.68, 500], d: [24, 31.2, -0.96, 500] },
  h6: { m: [13, 20.8, -0.26, 500], t: [13, 20.8, -0.26, 500], d: [18, 28.8, -0.36, 500] },
  p1: { m: [12, 16.8, -0.12, 500], t: [12, 16.8, -0.12, 500], d: [17, 23.8, -0.12, 500] },
  p2: { m: [12, 19.2, -0.12, 450], t: [12, 19.2, -0.12, 450], d: [15, 24, -0.3, 450] },
  p3: { m: [12, 19.2, -0.12, 450], t: [12, 19.2, -0.2, 450], d: [14, 22.4, -0.26, 450] },
  p4: { m: [12, 19.2, -0.24, 450], t: [12, 19.2, -0.24, 450], d: [12, 19.2, -0.24, 450] },
  cp1: { m: [14, 22.4, -0.42, 500], t: [14, 22.4, -0.42, 500], d: [18, 28.8, -0.54, 500] },
  cp2: { m: [12, 19.2, -0.12, 500], t: [12, 19.2, -0.12, 500], d: [12, 19.2, -0.12, 500] },
  cp3: { m: [12, 16.8, -0.24, 450], t: [12, 16.8, -0.24, 450], d: [14, 19.6, -0.28, 450] },
  ch1: { m: [38, 44, -0.14, 500], t: [38, 44, -0.14, 500], d: [38, 44, -0.14, 500] },
  segment: { m: [10, 14, -0.02, 500], t: [12, 16.8, -0.024, 500], d: [14, 19.6, -0.28, 500] },
  nav: { m: [12, 19.2, -0.24, 500], t: [14, 22.4, -0.28, 500], d: [14, 15.4, -0.28, 500] },
  'nav-large': { d: [18, 28.8, -0.18, 500] },
}

// Visual-weight compensation for Figtree vs Circular Std (measured in the pixel audit by
// stem width + ink coverage on identical strings): Circular Book (450) ~ Figtree wght 475,
// Circular Medium (500) ~ Figtree wght 600. Computed font-weight stays 450/500 like the
// original; only the rendered variable-font axis changes. At wght 600 Figtree's advance
// widths also land within 0.3% of Circular Medium (at 500 they ran ~2% narrow).
const WGHT = { 400: 600, 450: 475, 500: 600 } // 400 = banner, which renders Circular *Medium*
const fvs = (w) => `'wght' ${WGHT[w]}`

const fontSize = {}
const typeDecl = ([s, lh, ls, w]) => ({
  fontSize: u(s),
  lineHeight: u(lh),
  letterSpacing: u(ls),
  fontWeight: String(w),
  fontVariationSettings: fvs(w),
})
Object.entries(type).forEach(([name, bps]) => {
  Object.entries(bps).forEach(([bp, v]) => {
    const d = typeDecl(v)
    fontSize[`${name}-${bp}`] = [d.fontSize, { lineHeight: d.lineHeight, letterSpacing: d.letterSpacing, fontWeight: d.fontWeight }]
  })
})

// `.type-<token>` = the token's mobile + md + lg values in one class.
const typePlugin = plugin(({ addComponents }) => {
  const comps = {}
  Object.entries(type).forEach(([name, bps]) => {
    if (!bps.m) return
    comps[`.type-${name}`] = {
      ...typeDecl(bps.m),
      '@media (min-width: 481px)': typeDecl(bps.t),
      '@media (min-width: 1025px)': typeDecl(bps.d),
    }
  })
  addComponents(comps)
})

// `text-<token>-<bp>` fontSize utilities can't carry font-variation-settings in the tuple, so
// register a same-named utility that adds it (variants like `lg:` apply to both rules).
const weightAxisPlugin = plugin(({ addUtilities }) => {
  const utils = {
    '.font-normal': { fontVariationSettings: fvs(400) },
    '.font-book': { fontVariationSettings: fvs(450) },
    '.font-medium': { fontVariationSettings: fvs(500) },
  }
  Object.entries(type).forEach(([name, bps]) => {
    Object.entries(bps).forEach(([bp, v]) => {
      utils[`.text-${name}-${bp}`] = { fontVariationSettings: fvs(v[3]) }
    })
  })
  addUtilities(utils)
})

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { md: '481px', lg: '1025px' },
    // CLONE_SPEC §0.5 — full palette replaced so no stray default colors leak in
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: '#000000',
      'main-green': '#203435',
      green: '#285D60',
      green2: '#516B66',
      green4: '#AEBFBD',
      green5: '#CFD7D4',
      white: '#F3F1EC', // overridden "white"
      'main-white': '#FCFBFA',
      beige: '#E4E4DC', // a.k.a. orange1
      'pricing-hover': '#E9E6DB',
      'nav-grey': '#9FA5A3',
      'menu-dark': '#2E2F2F',
      'menu-logo': '#EFEFEF',
      plan1: '#A5B287',
      plan2: '#C1BA95',
      plan3: '#889C98',
    },
    extend: {
      fontFamily: {
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontWeight: { book: '450' },
      spacing: uSpacing,
      fontSize,
      borderRadius: {
        '2u': u(2),
        '5u': u(5),
        '6u': u(6),
        '8u': u(8),
        '9u': u(9),
        '12u': u(12),
        '14u': u(14),
      },
      boxShadow: {
        // Platform flyout: Tailwind shadow-lg + ring-1 ring-gray-900/5 (§0.6)
        flyout:
          '0 0 0 1px rgba(17,24,39,.05), 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)',
      },
      backgroundImage: {
        'mask-gradient': 'linear-gradient(90deg, #FCFBFA, #FCFBFA00)',
        'orange-gradient': 'linear-gradient(180deg, #F3F1EC 44.87%, #F3F1EC00)',
        'price-gradient':
          'linear-gradient(0deg, transparent 0%, #F3F1EC 7%, #F3F1EC 14%, #F3F1EC 100%)',
      },
      transitionDuration: { 375: '375ms', 400: '400ms', 500: '500ms', 667: '667ms' },
      transitionTimingFunction: {
        accordion: 'cubic-bezier(.17,.17,.43,1)',
        menu: 'cubic-bezier(.57,0,.43,1)',
      },
      zIndex: { 99: '99', 100: '100' },
    },
  },
  plugins: [typePlugin, weightAxisPlugin],
}
