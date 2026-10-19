Source: https://mosey.com/?ref=saaspo.com

# Mosey homepage: clone build spec

Measured live with Playwright on 2026-10-16 at 1440x900, 1280x800, 768x1024 and 390x844, using `getComputedStyle`/`getBoundingClientRect`, the shipped CSS (`/assets/mobileMenu-CEbHqbvC.css`, the main Tailwind build) and the shipped JS modules (`/assets/*.js`, Vite build). The site is Hugo 0.148.2, Tailwind, and Vite-bundled TypeScript classes. It does not use Webflow.

**Content policy.** Copy appears here only as role plus approximate length. Logos, photos, illustrations and Lottie art are listed as "placeholder needed". See `ASSET_MANIFEST.md` for every asset.

---

## 0. Global system (read first)

### 0.1 Fluid unit: the whole page scales with viewport width

Almost every dimension in the site is `calc(var(--🚲) * N)`. In this spec that unit is written **`u`**.

| Breakpoint | Media query | `--u` | 1u at measured widths |
|---|---|---|---|
| Mobile | `max-width: 480px` (default) | `0.3125vw` (= 100vw/320) | 390 → 1.21875px |
| Tablet | `min-width: 481px` | `calc(100vw / 768)` | 768 → 1px |
| Desktop | `min-width: 1025px` | `calc(100vw / 1440)` | 1440 → 1px, 1280 → 0.8889px |

- **Verified:** at 1280 every measured value equals the 1440 value × 0.8889. For example, h1 is 33.78px, the header container is 1157.3px, and the hero lottie is 1100.8px. There is **no max-width cap** and no separate 1280 layout. Build once in `u` and 1280 follows automatically.
- Tailwind screens: `md` = `min-width: 481px`, `lg` = `min-width: 1025px`. Set `screens: { md: '481px', lg: '1025px' }`.
- Class naming on the original: `*-1NNN` = NNN u (e.g. `pt-1055` = 55u, `w-2020` = 1020u), and `rounded-12gem` = 12u.
- Suggested implementation: `html{--u:.3125vw} @media(min-width:481px){html{--u:calc(100vw/768)}} @media(min-width:1025px){html{--u:calc(100vw/1440)}}`, plus a Tailwind plugin or arbitrary values `[calc(var(--u)*N)]`.
- JS uses the same scale. Its `rem` = `viewportWidth/1440` (desktop), `/768` (tablet) or `/375` (mobile). GSAP offsets written as `100*rem` mean 100u on desktop and tablet. On mobile the JS rem is `/375`, so `40*rem` ≈ 34u.

**Elements that do NOT scale (fixed px):** the announcement banner, burger line spans (12×2px), 1px hairlines, pricing-card borders (2px, top 8px), progress bar fill height (3px), `pt-12` (48px) on the footer, and the whole Platform flyout panel (standard Tailwind px).

### 0.2 Section visibility
`section { visibility: hidden }` in the CSS. Each section's JS sets `style.visibility = visible` on setup. Initial reveal states are set by GSAP (`autoAlpha: 0` and a y offset) before the trigger fires. The clone should render sections visible, with the initial transform and opacity applied by the animation code.

`html { scroll-behavior: smooth }`. `body { overflow-x: hidden; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility }`. `main { overflow: hidden }`.

### 0.3 Fonts

| Face | File (loaded) | Weight | Notes |
|---|---|---|---|
| `circular std` | `/assets/circular-oN0pFJYq.woff2` (28 KB) | declared with **no weight** (so it serves 400) | Name table: "Circular Std Medium". Text set at weight 400, such as the banner, therefore renders the Medium glyphs. |
| `circular std` | `/assets/CircularStd-Book-DCwdhgOH.woff2` (25 KB) | 450 | CircularStd-Book |
| `circular std` | `/assets/CircularStd-Medium-Z42jg6iz.woff2` (28 KB) | 500 | CircularStd-Medium |

- **License: commercial.** The fonts are by the Lineto foundry. The name table manufacturer is "Lineto" and the license string reads "Lawful use of the fonts ... excludes modifying, reassembling...". Do not ship these files.
- Measured metrics (Book/Medium): UPM 1000, hhea ascender 997, descender -268, lineGap 0, x-height 481/487, cap height 709.
- **Replacement:** **Figtree** (Google Fonts, OFL, variable 300–900, so weights 450 and 500 both work). It is the closest open geometric match to Circular. Second choice: **DM Sans** (Google Fonts, OFL, variable). I have not measured Figtree's metrics against Circular. Build should compare x-height and cap height in a test render and apply `size-adjust`/`ascent-override` on the `@font-face` if line boxes shift.
- Computed `font-family` everywhere is just `"circular std"`, with no fallback (`--main-font` is empty). Clone stack: `"Figtree", ui-sans-serif, system-ui, sans-serif`.
- Only two weights are used: **450** (body, "Book") and **500** (headings and UI, "Medium"). The banner uses 400, which maps to the Medium file.

### 0.4 Type scale (u units; line-height and letter-spacing also in u)

Columns are mobile (≤480), tablet (481–1024) and desktop (≥1025). Each value is size/line-height, letter-spacing, weight.

| Token | Mobile | Tablet | Desktop | Used for |
|---|---|---|---|---|
| h0 | 55/70, -2.2, 450 | 75/90, -3.6, 450 | 130/156, -5.2, 450 | "Everything" giant headline |
| h1 | 24/28.8, -0.72, 500 | 38/45.6, -1.14, 500 | 55/66, -1.65, 500 | Roadmap title |
| h2 | 32/38.4, -0.64, 450 | (no tablet class) mobile value | 42/50.4, -0.84, 450 | Benefits card values |
| h3 | 24/26, -0.72, 500 | 28/33.6, -0.84, 500 | 38/45.6, -1.14, 500 | Hero H1 and all section titles |
| h4 | 20/24, -0.04, 500 | 20/24, -0.04, 500 | 28/33.6, -0.64, 500 | Compliance CTA title, pricing fee |
| h5 | 17/22.1, -0.68, 500 | 17/22.1, -0.68, 500 | 24/31.2, -0.96, 500 | Step titles, quotes, counter |
| h6 | 13/20.8, -0.26, 500 | 13/20.8, -0.26, 500 | 18/28.8, -0.36, 500 | List titles, FAQ questions |
| p1 | 12/16.8, -0.12, 500 | 12/16.8, -0.12, 500 | 17/23.8, -0.12, 500 | Compliance eyebrow, author name |
| p2 | 12/19.2, -0.12, 450 | 12/19.2, -0.12, 450 | 15/24, -0.30, 450 | Body copy |
| p3 | 12/19.2, -0.12, 450 | 12/19.2, -0.20, 450 | 14/22.4, -0.26, 450 | Hero desc, card desc, author role |
| p4 | 12/19.2, -0.24, 450 | 12/19.2, -0.24, 450 | 12/19.2, -0.24, 450 | Compliance list desc, plan desc |
| cp1 | 14/22.4, -0.42, 500 | 14/22.4, -0.42, 500 | 18/28.8, -0.54, 500 | Plan title, pricing accordion title |
| cp2 | 12/19.2, -0.12, 500 | 12/19.2, -0.12, 500 | 12/19.2, -0.12, 500 | Plan employee/per-month labels |
| cp3 | 12/16.8, -0.24, 450 | 12/16.8, -0.24, 450 | 14/19.6, -0.28, 450 | Pricing table rows, footnotes |
| ch1 | 38/44, -0.14, 500 | 38/44, -0.14, 500 | 38/44, -0.14, 500 | Plan price (inner span 0.75em on lg) |
| segment | 10/14, -0.02, 500 | 12/16.8, -0.024, 500 | 14/19.6, -0.28, 500 | Tab labels |
| nav | 12/19.2, -0.24, 500 | 14/22.4, -0.28, 500 | 14/15.4, -0.28, 500 | Header, footer and menu links |
| nav-large | – | – | 18/28.8, -0.18, 500 | Footer column headings |

Quirks to reproduce:
- The benefits h2 and testimonial/peace h5 use `md:text-h2-table` and `md:text-h5-table`, which are typos. On tablet they therefore fall back to the mobile size.
- The FAQ accordion title at 1280 computes 16/25.6, which is h6 desktop × 0.889.

### 0.5 Color tokens (computed)

| Token | Hex | Role |
|---|---|---|
| `main_green` | `#203435` | Primary text, banner bg, pricing check circle |
| `green` | `#285D60` | Accent words in headings (`span.text-green`), CTA/roadmap/footer bg, tab indicator, logo fill, pills, arrow strokes |
| `green2` | `#516B66` | Decorative line-art strokes (hero, compliance side lines) |
| `green4` | `#AEBFBD` | Hero desc left border, roadmap line art |
| `green5` | `#CFD7D4` | Hero popup CTA card, slider arrow bg (at op 0.4) |
| `white` (overridden) | `#F3F1EC` | Hero bg, header pill bg, pricing section bg, card bg (at op 0.4), all "white" text on dark |
| `main_white` | `#FCFBFA` | Default section bg, pricing cards, flyout panel, compliance list card |
| `beige` / `orange1` | `#E4E4DC` | Nav-link hover bg, burger bg, compliance dividers, image backplate |
| pricing-row hover | `#E9E6DB` | `.pricing-point:hover` |
| nav grey | `#9FA5A3` | Header nav link color and nav dividers |
| menu dark | `#2E2F2F` | Mobile menu panel, header when menu open, burger lines |
| menu logo | `#EFEFEF` | Logo paths when menu open |
| plan 1 / 2 / 3 | `#A5B287` / `#C1BA95` / `#889C98` | Pricing card borders, labels, top line |
| pill dark text | `#000` | "New" pill text in mobile menu |

Alpha usages: text `main_green/70` (`#203435B3`), `main_green/40`; `white/70` (`#F3F1ECB3`), `white/40` (`#F3F1EC66`), `white/60`; lines `green` at 0.2/0.4 opacity; footer borders `rgba(252,251,250,.2)`; flyout grid bg `rgba(243,241,236,.5)`.

Page background: html/body have no background, so the browser default is white. Every section paints its own bg.

### 0.6 Radii, borders, shadows, gradients, filters

- **Radii:**
  - 12u: header pill, cards, CTA blocks, compliance desktop image, peace image, avatars.
  - 9u: compliance image on tablet. 5u: compliance image on mobile.
  - 8u: pricing card, burger. 6u: nav links.
  - 14u: mobile menu panel. 2u: tab indicator. 3px: progress fill.
  - 50%: slider arrows and pagination dots. 9999px: "New" pills.
  - Flyout uses fixed px: 24px panel, 8px items.
- **Borders:**
  - Hero desc: left 1px `#AEBFBD`, with padding-left 16u.
  - Pricing card: 2px solid on all sides plus 8px top, in the plan color.
  - Footer: desktop wrap border-bottom 1px `rgba(252,251,250,.2)`; on tablet/mobile each nav part and the header block get border-b.
  - Hairlines are 1px divs with bg `#285D60`, opacity .2 (accordion/table rows) or .4 (testimonial divider).
- **Shadows:** only one, on the Platform flyout panel: `0 0 0 1px rgba(17,24,39,.05), 0 10px 15px -3px rgba(0,0,0,.1), 0 4px 6px -4px rgba(0,0,0,.1)` (Tailwind `shadow-lg ring-1 ring-gray-900/5`).
- **backdrop-filter / filter / mix-blend-mode:** none anywhere (checked every element).
- **Gradients:**
  - `bg-mask-gradient`: `linear-gradient(90deg, #FCFBFA, #FCFBFA00)`, the ticker edge fades. The right one is `scale(-1)`.
  - `bg-orange-gradient`: `linear-gradient(180deg, #F3F1EC 44.87%, #F3F1EC00)`, the compliance section backdrop. The element has transform `scale(-1)`, so it is transparent at top and solid at the bottom.
  - `bg-price-gradient`: `linear-gradient(0deg, transparent 0%, #F3F1EC 7%, #F3F1EC 14%, #F3F1EC 100%)`, behind the pinned pricing cards.
  - Tailwind `[mask-image:radial-gradient(closest-side,white,transparent)]` exists in the CSS. I did not find it on the homepage.

### 0.7 Shared components

- **Section title + description row** (benefits, peace, pricing, second, faq):
  - Desktop: flex, space-between. The h3 has one or two words wrapped in `span.text-green` (#285D60). The desc sits in a wrapper with opacity .8, holding a p2 at `main_green/70`, width 424u.
  - Tablet: same row; desc width 332–333u.
  - Mobile: stacked; h3 mb 24u.
- **Tab bar** (hero, compliance):
  - Links are horizontal, `justify-between` inside a padded ul. Each `li` is `opacity .4`; `.active` is `opacity 1` (instant, no transition).
  - A 1u-high track line spans the full width: `#285D60`, opacity .2, 1.5u from the bottom of a 4u wrapper.
  - The indicator bar is `#285D60`, radius 2u, height 4u on tablet/desktop and 2u on mobile.
  - **Indicator motion:** `gsap.to(indicator, {x: (link.offsetLeft + link.offsetWidth/2) - (indicator.offsetLeft + indicator.offsetWidth/2), duration: .5, ease: "power2.out"})`.
- **Accordion:**
  - `button[aria-expanded]` followed by `.accordion-content`.
  - Content: `opacity 0; max-height 0; transform: translateY(-20px); transition: .5s cubic-bezier(.17,.17,.43,1)`. When expanded: `opacity 1; max-height: 800u; transform: none; overflow: auto`.
  - Icon: a chevron-down (path `M5.5 7l3 3 3-3`, viewBox 17×16, stroke `#285D60`, width 2). It rotates 180° on open with `.5s cubic-bezier(.17,.17,.43,1)`.
  - Items have no borders (`.accordion .accordion-item{border:none}` overrides an earlier rule).
- **Slider** (Splide 4):
  - Pagination dots: 6u squares, `border-radius: 50%`, `#285D60` at opacity .2; active is opacity 1. Gap 7u. Sits at bottom -24u by default.
  - Arrows: 46u desktop / 32u otherwise; circular; `.arrow-bg` `#CFD7D4` at op .4. Icon box 20×14u (desktop) / 14×10u holding a right-arrow (viewBox 16×12, stroke `#285D60`); prev is mirrored. Disabled: opacity .2. `transition: all 375ms ease`. No hover style is actually applied, because the CSS selector `arrow-bg` is missing its dot.

---

## 1. Announcement banner (`#announcement-banner`)

- Static, not fixed; it scrolls away. Full width. bg `#203435`, padding 8px 16px (fixed px), text-align center.
- Heights: 40px on desktop/tablet (one line); 56px at 390 (wraps to 2 lines).
- Text:
  - Mobile: `text-sm` 14px/20px. ≥481: `text-base` 16px/24px.
  - Weight 400 (renders Circular Medium), color `#F3F1EC`.
  - Content: one sentence, ~87 chars, beginning with an underlined inline link (~22 chars).
- A script writes its `offsetHeight` to `--banner-height` on load and resize. The header's `top` uses this value.

## 2. Header (`#header.header`)

**Positioning and size**
- `position: fixed; left 0; width 100%; z-index 100; display flex`.
- `top`: mobile `calc(5u + var(--banner-height))`; ≥481 `calc(24u + var(--banner-height))`. At 1440 this is 64px.
- **No scroll-state behavior.** No class or style changes on scroll; I verified this at scrollY 1500. The header keeps its top offset after the banner scrolls away, so a gap equal to the banner height stays above it.

**`.header-container`** (the pill, centered with `margin: 0 auto`)

| | Mobile | Tablet | Desktop |
|---|---|---|---|
| Width | 304u | 704u | 1302u |
| Padding | 8u 8u 8u 15u | 8u 8u 8u 12u | 8u 8u 8u 19u |
| Rendered height | 44u (53.6px @390) | 47u | 52u |

- bg `#F3F1EC`, radius 12u, `transition: .4s` (all).
- Left group (flex, align center):
  - Logo: inline SVG, viewBox 48×12, fill `#285D60`. Width 48u / 53u / 74u (height follows aspect, 18.5u desktop). `lg:mr-25u`. *Placeholder needed:* brand wordmark, 48:12 aspect.
  - Desktop nav (`hidden lg:flex`), 6 items, each `mr 7u`:
    - `a.header-nav__link`: padding 6u, radius 6u, color `#9FA5A3`, nav type (14/15.4u, -0.28u, 500). `transition: .4s`. **Hover:** color `#203435`, bg `#E4E4DC`.
    - Divider after items 1–5: absolute 1px × 16u, bg `#9FA5A3`, top 6u, right -4u.
    - Label lengths: ~8, 7, 9, 5, 4 chars. The 6th item is a pill plus label: pill `bg #285D60`, `#F3F1EC`, 12px/16px w500, padding 4px 8px, radius 9999px, gap 8px, then a ~9-char label.
- Right group: on ≥1025 it holds nothing visible (the burger is `lg:hidden`). There are **no CTA buttons in the header.**
- **Burger** (`.header-burger`, ml 8u):
  - Size 28u (mobile) / 31u (≥481); bg `#E4E4DC`; radius 8u; `transition: .4s`.
  - Two spans, each 12×2px, radius 2px, bg `#2E2F2F`, absolutely centered, `transform-origin: left`, `transition .4s`.
    - Span 1: `translate(-50%) translateY(-2.5u)` (mobile) / `translateY(-5u)` (≥481).
    - Span 2: `translateY(2.5u) scaleX(.58)` (mobile) / `translateY(.5u) scaleX(.7)` (≥481).
  - Active: both spans `translate(-50%,-50%) rotate(±45deg)`, origin center, bg `#F3F1EC`.

**Platform flyout** (desktop)
- Opens on **click** of the first nav link, toggling `.hidden`; there is no hover open. Clicking outside closes it.
- Position: absolute under the link, `mt 40u`, `px 16px`, z 10.
- Panel: width 768px (`max-w-3xl`, fixed px), radius 24px, bg `#FCFBFA`, the shadow from §0.6, overflow hidden.
- Top block: padding 32px.
  - Title: h6, `#203435`, ~43 chars.
  - Desc: p2 `/70`, mt 8px, ~180 chars, 2 lines.
  - Link: p2 `#285D60` underline, hover `main_green/70`, ~10 chars.
- Bottom grid: bg `rgba(243,241,236,.5)`, padding 24px 16px, 2 columns, gap 4px 24px. 4 items:
  - Item: flex, gap 24px, padding 16px, radius 8px; hover bg `#F3F1EC`.
  - Icon tile: 44×44px, radius 8px, bg `#FCFBFA` (hover `#F3F1EC`), holding a 24×20 SVG (small icon art: *placeholder needed*, 24×20).
  - Title: p1 17/23.8 500, ~15–20 chars; one has a "New" pill.
  - Desc: p2 `/70`, mt 4px, ~45–70 chars, 2 lines.
- Item 1 box: 356×109px at 1440. Panel total 768×443px.
- Note: the original page throws a console error (`header-nav-solutions` is null) right after binding this. Do not replicate.

**Mobile/tablet menu** (`#mobile-menu`, ≤1024 only)
- Closed state: `position fixed; top 0; width 100%; z 99`; height 86% (mobile) / auto (≥481); `transform: translateY(-100%)`; `visibility hidden`.
- **Open:** GSAP `to(menu, {y: header.getBoundingClientRect().bottom + 8, duration: 40/60 = .667s, ease: CustomEase(".57,0,.43,1")})`. Visibility goes to visible on start; reversing the tween closes it and sets hidden on reverse complete. At 768 the open y is 119px.
- While open:
  - The header gets `.mobile-menu__open`: container bg `#2E2F2F`, logo paths `#EFEFEF`, burger bg `#000`.
  - body gets `overflow: hidden`.
- Panel `.menu-wrap`: same width as the header container (304u / 704u); padding 24u; radius 14u; bg `#2E2F2F`. Flex: column on mobile, `row-reverse` with space-between on tablet.
- Nav: 256u wide on tablet. 6 links, each `mb 18u`, nav type, color `#F3F1EC99` (white/60), with a 16u arrow icon at right. The last link has a pill (bg white/60, text black, 12/16px, padding 4px 8px).
- Foot block: 256u wide; one p4 line at white/70, ~60 chars, 2 lines.

---

## 3. Hero (`section#homepage-hero`)

- bg `#F3F1EC`.
- Section height: 779px @1440, 692px @1280, 965px @768, 585px @390 (≈480u).
- `.section-container` padding-top: 55u (mobile), 112u (tablet), 121u (desktop). Padding-bottom: 12u, 37u, 40u.

**Title row** (`.title-wrap`, flex, space-between)
- Padding: mobile `pl 24u`; tablet `px 40u`; desktop `px 104u`.
- **H1** (h3 token), `#203435`, 2 lines, ~30 chars. Width 187u / 241u / 345u.
- **Desc** (right): hidden on mobile; tablet width 221u, desktop 343u.
  - p3 `#203435`, border-left 1px `#AEBFBD`, padding-left 16u, 2–3 lines, ~94 chars, with a ~17-char run in `#285D60`.

**Tabs area** (`.tabs-wrap`, flex column, centered)
- `ul.tab-items`: `mt 39u`. It is a spacer with padding-bottom 440u (desktop) / 665u (tablet) / 341.2px (≈280u, mobile).
- 3 absolutely stacked `li.tab-item`. Each holds `.image-block` containing a **Lottie** (SVG renderer):
  - Desktop: `top -147u`; lottie box 1440×570u (`w-full`). File viewBox 1440×566.
  - Tablet: `top 103u`; lottie box 768×400u.
  - Mobile: `top -20u`; lottie box 100% × 275u. Mobile file viewBox 904×804.
  - Inactive tab: `.image-block` at `scale(.86)`, `opacity 0`.
  - *Placeholder needed:* product-UI illustration animation, 1440×566 (desktop) and 904×804 (mobile), 3 sequences.
- Tab 3 also contains the **popup CTA** (`.cta`, absolute, `top 35u / 75u / 165u`, opacity 0 until triggered):
  - `.cta-container`: bg `#CFD7D4`, radius 12u.
    - Desktop: flex row, gap 24px, padding 32u, size 717×340u.
    - Mobile/tablet: column, centered, padding 24u 16u, width 250u.
  - Left block: h5 heading `#285D60`, ~36 chars, 4 lines on desktop (width 144u). Centered on mobile, left on desktop.
  - Right block (desktop only): image 484.8×276.1u. *Placeholder needed:* product screenshot, 790×450 native, 1.756:1, fill.
  - Decorative "spring" lines: `.left-line` / `.right-line`, absolute at the screen edges, top 27u (desktop) / 21u (mobile).
    - Desktop/tablet: SVG viewBox 251×241, rendered 250×241u (tablet 235×241); the right one is rotated 180°.
    - Mobile: viewBox 44×163, rendered 44×163u.
    - Strokes `#285D60`, dot fill `#285D60` with `#F3F1EC` stroke. Redraw: straight line plus a coil plus an end dot.
- **Tab links** (`ul.tab-links`, relative, flex, space-between):
  - Width 465u (desktop/tablet) / 280u (mobile); padding 0 35u (mobile 17u).
  - 3 links, label lengths ~13, 7, 9 chars, segment type, `#203435`. `li` padding 9u top, 19u bottom.
  - Each link has a **timer ring** SVG after the label: 12u, ml 5u, viewBox 15×15, two circles r=6, rotated -90°. Track stroke `#285D6033`, progress stroke `#285D60`, width 2, round caps. Progress: `stroke-dasharray: 380px; stroke-dashoffset: calc(380px - (380px * var(--percent))/1000)`, where `--percent` goes 0→100.
  - Indicator width 113u (2u high on mobile, 4u otherwise); track line full width.

**Bottom decorative curves** (desktop): two SVGs (viewBox 422×170) at 423×170u, pinned to the section bottom-left and bottom-right (the right one `scaleX(-1)`). Strokes `#516B66`. Tablet uses a smaller variant (viewBox 123×154 at 133×144u). Redraw as generic line art: S-curves plus a dot.

**Hero motion** (bundle `index.html-ByEF1glV.js`)
- On activation, tab 1 lottie plays. Auto-advance interval = that lottie's `totalFrames/frameRate`: tab 1 **16.40s**, tab 2 **13.97s**, tab 3 **2.83s**. After the last tab, the popup CTA opens. Use the same mechanism: one timer per tab.
- The timer ring of the active link shows (`opacity 1`) and tweens `--percent` 0→100 linearly over the interval, then hides.
- Tab switch, outgoing `.image-block`: `{scale 1→.86, autoAlpha 1→0, duration .267s, ease Eas49}`.
- Tab switch, incoming: `{scale .86→1, autoAlpha 0→1, duration .3s, ease Eas1739}`.
- The indicator slides (§0.7). Clicking a tab restarts its lottie from frame 0 and its timer, and closes the popup if open.
- **Popup open timeline** (all on one GSAP timeline, ease defaults Eas17):
  1. Set `.cta` to opacity 1, scale 1.
  2. Last tab's visual: `y 0→300px`, 1.0s, Eas7937. At the same time, opacity 1→0 over .5s, Eas7983.
  3. `.cta-container` at +0.583s: `opacity 0→1, y -200→0`, .5s, Eas17.
  4. `.left-line` at +0.75s: `opacity 0→1, x -200→0`, .75s, Eas17. `.right-line` at the same time: `x 200→0`.
- **Popup close:** `.cta` to `opacity 0, scale .86` over .25s, Eas49. The visual is reset to y 0, opacity 1 at +.5s.

---

## 4. Trusted-by logo marquee (`section#homepage-trusted`)

- bg `#FCFBFA`. Padding-top 80u (all breakpoints). Padding-bottom: 110u mobile, 160u tablet, 260u desktop.
- Title: `.medium-container` (272u / 684u / 1100u wide, `margin 0 auto`), h3, ~10 chars, 1 line.
- Marquee wrapper:
  - Top margin: 50u (mobile), 80u (tablet), 110u (desktop).
  - Width: 100vw on mobile, 687u on tablet, 1110u on desktop. `overflow hidden`, centered.
- Two rows (`ul.ticker`, flex). Row 2 has `mt 12u` (mobile/tablet) / `22u` (desktop).
- Each row's content is duplicated in JS into two `.ticker-items` groups (flex, `padding-left 10u`, gap 10u). Row 1 has 6 logos per group and row 2 has 6.
- Logo tile: 127×60u (mobile/tablet), 234×112u (desktop). The `img` is `object-fit: cover`.
  - *Placeholder needed:* customer logo, native 468×224 (2.09:1), mono dark-on-light treatment, 12 unique logos.
- Edge fades: absolute full-height divs at left -2u and right -2u. Width 30u (mobile/tablet) / 166u (desktop). bg `bg-mask-gradient`; the right one is `scale(-1)`.
- **Motion** (GSAP, `ease: "none"`, `repeat: -1`):
  - Row 1 `.ticker-items`: `xPercent -100 → 0`, so content moves **right**.
  - Row 2 `.ticker-items-reverse`: `xPercent 0 → -100`, so content moves **left**.
  - `duration = firstRowUl.offsetWidth / speed`, with speed 10 (tablet/desktop) or 5 (mobile). Measured:
    - 1440: 1110/10 = **111s** per group width of 1464px (≈13.2 px/s).
    - 768: 687/10 = 68.7s for 822px (≈12 px/s).
    - 390: 390/5 = 78s.
  - It starts 10/60s after section activation and is killed 20/60s after deactivation.
  - Title reveal: `y 100→0, autoAlpha 0→1, duration 30/60 = .5s, Eas17`, once. Section trigger `start: "top bottom-=15%"`.

## 5. Statement (`section#homepage-second`)

- bg `#FCFBFA`.
- Layout:
  - Desktop: padding 112u 170u 250u; flex row, space-between, align center. Title width 358u, desc width 422u.
  - Tablet: padding 110u 40u 192u; same row. Title width 249u, desc width 332u.
  - Mobile: padding 100u 24u 177u; column; desc mt 24u.
- Title: h3, 2 lines, ~33 chars; the first ~12 chars in `#285D60`.
- Desc: p2 `#203435` at **opacity .4**, 4 lines, ~205 chars.
- **Motion:** both `.text-anim` wrappers go `autoAlpha 0→1, y 100→0`, duration 35/60 = .583s, stagger 5/60 = .083s, Eas17, once. Trigger `top bottom-=30%`.

## 6. "Everything" headline + line/dot animation (`section#homepage-everything`)

- bg `#FCFBFA`. Container: flex column, centered.
  - Padding-bottom: 40u (mobile), 45u (tablet), 93u (desktop).
  - Padding-x: 0 (mobile), 40u (tablet), 104u (desktop).
  - Section height 1179px @1440.
- Headline wrapper: `overflow hidden; text-align center; z 1`. Width 288u (mobile), 688u (tablet), 1232u (desktop).
  - h2 h0 token, `#203435`, 1 line, ~19 chars.
  - Behind it: an absolute SVG "tab" shape (viewBox 1223×54, fill `#F3F1EC`, z -1), flush with the wrapper bottom. Rendered 1232×54.4u on desktop. Redraw as a wide rounded trapezoid tab.
- Lottie stage (two absolutely stacked lotties: "lines" and "dots"):
  - Desktop: 970×882u, mt 45u (spacer pb 885u).
  - Tablet: 633×575u, mt 20u.
  - Mobile: 250u wide (≈372u tall), mt ≈18u, spacer pb 314u.
  - *Placeholder needed:* abstract connector lines/dots animation, 1936×1760 (desktop) / 517×632 (mobile).
- **Motion** (trigger `top bottom-=30%`):
  - h2: `y 122→0`, 90/60 = **1.5s**, Eas82. It sits inside the overflow-hidden wrapper, so it is a mask slide-up reveal.
  - At +10/60s the "lines" lottie plays once (2.12s desktop / 1.58s mobile). Then the "dots" lottie fades in and loops (6.18s / 3.80s), with `hideOnDeactivate`.

## 7. Compliance by role, tabs (`section#homepage-compliance`)

- bg `#FCFBFA`. Padding-bottom: 39u (mobile), 81u (tablet), 120u (desktop). Container padding-bottom 50u (tablet/desktop).
- Backdrop: `.section-bg.bg-orange-gradient`, absolute at the section bottom. It extends upward past the section top: height 1722px @1440, z 0, flipped. The section therefore fades into `#F3F1EC` toward its bottom.
- Side line art (≥481): `.bg-lines`, two SVGs (viewBox 105×1005) at the left/right edges. 104×1000u on desktop, 64u wide on tablet. Stroke `#516B66`. Redraw as a vertical line with an S-bend and a dot.
- Eyebrow title: h3, p1 token, centered, ~69 chars, 2 lines, with ~15 chars in `#285D60`. Width 202u (mobile), 232u (tablet), 328u (desktop).
- Tabs wrapper `mt 45u`.
- Tab links: 4 labels (~7, 14, 7, 5 chars). Width 272u (mobile), 440u (tablet), 448u (desktop). Padding-x 21u / 35u / 37u. `li` padding 9u top, 16u bottom. Indicator width 90u (mobile) / 115u.
- Tab items:
  - Top margin: 24u (mobile), 40u (tablet), 60u (desktop).
  - Spacer height: 614u (mobile), 800u (tablet), 570u (desktop).
  - 4 stacked absolute `li.tab-item`; only `.active` is visible.
- **Item layout**
  - Desktop: flex `row-reverse`, space-between, width 1020u.
    - Image box: 645×447u, radius 12u, overflow hidden, `img` `object-fit: cover`. *Placeholder needed:* product screenshot, native 1290×894 (1.443:1).
    - Behind it: `li.bg-image-tab` (bg `#E4E4DC`, same radius, z -1).
    - List card (`.future-block`): 359u wide. Behind it: `li.bg-list` (bg `#FCFBFA`, radius 12u, z -1). Its height is tweened to the active list height over 0.1s.
  - Tablet: column, width 510u; image 510×354u, radius 9u; list mt 24u.
  - Mobile: column, width 272u; image 272×189u, radius 5u; list mt 16u.
- List `ul`: flex column, overflow hidden. Padding 16u (mobile/tablet) / 24u (desktop); gap 18u / 24u.
  - 3 entries, each a column with gap 8u:
    - Title row (gap 8u): 26u icon (*placeholder needed*, 26×26 SVG pictogram) plus h6 `#203435`, ~20–29 chars, 1 line.
    - Desc: p4 `main_green/70`, ~123–156 chars, 3 lines.
  - Between entries: 1u divider, bg `#E4E4DC`.
- **Compliance CTA card** (`.compliance-cta`, below the tabs)
  - Container width: 272u (mobile), 510u (tablet), 1020u (desktop).
  - Card: bg `#285D60`, radius 12u, overflow hidden.
  - Padding: 30u 20u 45u (mobile), 50u 67u 45u (tablet), 73u 67u 40u 79u (desktop). Desktop is flex row, space-between.
  - Text column: desktop gap 16u, left aligned; mobile/tablet centered, gap 32u / 30u. The visual sits between the title and the desc on mobile.
    - h4 white, ~49 chars, 2 lines; width 288u (tablet) / 370u (desktop).
    - p2 white/70, ~95 chars, 3 lines, width 288u.
  - Visual: looping Lottie, 454×258u (desktop), 376×177u (tablet), 100%×131u (mobile). *Placeholder needed:* small UI-card animation, 908×516.
  - Decorative bg image: absolute, z 0, behind the visual. Desktop: left 376u, top 31u, 644×324u (`bg-desktop.png` 644×371). Mobile: `bg-tablet.png` (510×402), 272×324u. *Placeholder needed:* soft abstract background, cover.
- **Motion**
  - Section trigger (default `top bottom-=25%`):
    - Title: `y 100→0, autoAlpha→1`, 32/60 = .533s, Eas17.
    - Tabs wrap: same, at +10/60s.
  - Tab switch, outgoing (all at t=0):
    - Text blocks: `autoAlpha 1→0, y 0→-55`, stagger 5/60, duration 28/60 = .467s, Eas66.
    - Dividers: same.
    - Image: `autoAlpha→0, scale 1→1.07`, origin 100% 100%, .467s, Eas66.
  - Tab switch, incoming:
    - Set item `autoAlpha 1, z 1`.
    - `bg-list` height → the new list height (.1s, Eas17).
    - Text blocks: `autoAlpha 0→1, y 55→0`, stagger 5/60, .467s, Eas17.
    - Dividers: same, offset 5/60.
    - Image: `scale .93→1, autoAlpha 0→1`, origin 100% 100%, .467s, Eas17.
  - CTA card: own trigger `top bottom-=10%`. `y 100→0`, 32/60 s, Eas17, once. Its lottie plays (loop) while in view and stops on leave.

## 8. Benefits stats (`section#homepage-benefits`)

- bg `#FCFBFA`. Container padding: 110u top / 140u bottom (mobile), 160u y (tablet), 260u y (desktop).
- Title row: §0.7 pattern.
  - Desktop: padding-x 170u, mb 83u. Title ~20 chars, 1 line, ~9 chars green. Desc ~171 chars, 3 lines.
  - Tablet: padding-x 41u, mb 80u. Mobile: padding-x 25u, mb 73u.
- Cards (3), desktop and tablet:
  - Flex, centered. Gap 40u (desktop) / 21u (tablet). Card 332×407.6u (desktop) / 215×314u (tablet).
  - Padding: 61u 32u 32u (desktop), 35u 24u 24u (tablet).
  - Absolute `.card__bg`: bg `#F3F1EC`, radius 12u, **opacity .4**.
  - Icon: 236×143u (desktop), 163×99u (tablet). mb 46u / 33u, mx 16u / 2u. Inline SVG (viewBox 172×104, fill `#285D60`, wrapped in `<g opacity=.2>`). *Placeholder needed:* simple line-chart pictogram, 172:104.
  - Text: column, gap 12u (first card) / 8u (others, a class-typo quirk).
    - Value: h2 token, ~9–11 chars.
    - Desc: p3, opacity .7, ~74–109 chars, 2–3 lines.
- Mobile: Splide slider with `gap 16u, padding 24.5u, autoWidth, perPage 1, arrows off, pagination on`. Card 265u wide, padding 50u 24u 24u; icon 172×104u, mx auto, mb 55u. Dots 24u below.
- **Hover** (all sizes): `.card:hover .card__bg {opacity 1}`, `.card:hover .card__icon svg g {opacity 1}`; `transition: all 375ms ease`.
- **Motion** (trigger `top bottom-=25%`, once):
  - Tablet/desktop:
    - Title and desc start at `autoAlpha 0, y 100u`. Title tweens to 0 over .567s, Eas17. Desc follows at +.06s.
    - Cards start at `y 100u, autoAlpha 0` (0.55s, Eas17). Order: card 2 (middle) at 0, card 1 at +.06s, card 3 at +.06s.
  - Mobile: title, then desc at +.066s, then the slider at +.066s. Each from `y 40·rem`, .567s, Eas17.

## 9. Roadmap, pinned scroll story (`section#homepage-roadmap`)

- bg `#285D60` on `.roadmap-pin-container`.
- Section height: 3795px @1440 (pinned area), 1539px @768, 1692px @390.
- Container padding:
  - Desktop: 335u 210u 128u. Tablet: 169u 40u 130u. Mobile: 50u 24u 44u.
- Line art (top corners), stroke `#AEBFBD`, redraw as simple lines:
  - Desktop: 382×239u at top 285u. Tablet: 175×169u at top 130u. Mobile: 90×102u at top 53u.
- Title: h1 token, white, centered, `mx auto`, ~31 chars, 2 lines.
  - Width 522u (desktop), 355u (tablet), 168u ≈ 138u (mobile).
  - Margin-bottom 200u (desktop), 119u (tablet), 86u (mobile).

**Desktop (≥1025)**
- `.desktop-roadmap-steps` is 3000u tall. Row (flex, space-between, mb 34u):
  - Left `ul` (389×339u, mt 115u, relative): 3 steps, all absolute at top 0.
    - Each step: column, gap 12u. h5 white, ~16–29 chars, 1 line. p2 white opacity .7, width 319u, ~71–81 chars, 2 lines.
  - Right images box: 434×345u, relative, with 3 stacked absolute Lotties. *Placeholder needed:* 3 step illustrations, 434×345 / 886×690 / 868×690.
- Progress bar below: height 33u, relative.
  - Base line: 1px, bg `#F3F1EC`, opacity .4, at bottom.
  - Dividers: 1×10u `#F3F1EC` at 33.3% and 66.6%.
  - Fill: 3px tall, radius 3px, bg `#F3F1EC`, width animated.
  - Counter ("01"–"03", p3 white) at the fill's right end, bottom 11u.
- **Motion** (one scrubbed ScrollTrigger):
  - Settings: `trigger: .desktop-roadmap-steps__images, start: "center+=20% center", endTrigger: .desktop-roadmap-steps, end: "bottom bottom", pin: .roadmap-pin-container, pinSpacing: false, scrub: true, anticipatePin: 1`.
  - Initial state: each step i (0-based) at `y = 100u·(i+1)`, opacity 0; lotties at opacity 0.
  - Timeline per step i (relative units; the whole timeline maps to scroll):
    1. Progress fill width `i·33.3% → (i+1)·33.3%` (dur 100).
    2. Step text `y→0, opacity→1` (dur 30).
    3. Lottie `opacity 0→1, scale .95→1` (dur 15, Eas17); on start it plays from frame 0.
    4. Hold until 100.
    5. If not the last step: lottie `opacity→0, scale→1.05` (dur 15, Eas40), then text `y→-200u, opacity→0` (dur 30).
  - Counter text updates to `0{i+1}` while step i's segment is running.
  - Title: in-view `y 100u→0, autoAlpha→1`, .567s, Eas17.

**Tablet**
- Steps in a column, gap 140u. Each step: flex row, space-between, centered.
  - Image: 315×250u, on the right.
  - Text: 275u wide, on the left (`order-1`). h5 17/22.1, p2 12/19.2.

**Mobile**
- Column, gap 80u. Image 272×216u, mb 32u; text below it.

**Tablet/mobile motion:** each step has its own trigger `top bottom-=25%`. `autoAlpha 0→1, y 40·rem→0`, .567s, Eas17. The step's lottie plays on start.

## 10. Peace of mind, sticky steps (`section#homepage-peace`)

- bg `#FCFBFA`.
- Container padding:
  - Desktop: 260u 170u 340u. Tablet: 160u y. Mobile: 110u top, 155u bottom.
- Title row: §0.7. Title ~13 chars, 2 lines, 4 chars green. Margin-bottom 110u (desktop), 94u (tablet), 40u (mobile).

**Desktop**
- Flex, space-between, 1100u wide. Left column 483u wide, flex column, **gap 340u**, 4 steps:
  - Each step: flex row, gap 123u.
    - Index number: h5 in `#285D60`, e.g. "01", ~2 chars.
    - Content: column, gap 20u, width 333u. h5 `#203435`, 1–2 lines, ~27–45 chars. p2 opacity .7, 2–4 lines, ~97–166 chars.
  - Steps 2–4 start at opacity .5.
- Right: `.peace-image-container`, pinned, 424u wide. `.peace-image-wrapper` 424×264u, radius 12u, overflow hidden, with 4 stacked Lotties. *Placeholder needed:* 4 illustrations, 848×528.
- **Motion** (scrubbed):
  - Settings: `trigger: .peace-image-wrapper, start: "center center", endTrigger: last .peace-step, end: "bottom center", pin: .peace-image-container, pinSpacing: false, scrub: true`.
  - Per step i, sequenced:
    1. Step `opacity →1` (dur 15).
    2. For i>0: image i `opacity 0→1, scale .95→1` (dur 30) and its lottie plays.
    3. Hold 40.
    4. If not last: image i `opacity→0, scale→1.05` (dur 30) at t=70.
  - Title/desc in-view: `y 100u, autoAlpha 0` → 0/1, .567s, Eas17; desc at +.06s.

**Tablet/mobile**
- Splide carousel, `arrows false, autoWidth, perPage 1, pagination true`. Inactive (`is-prev`/`is-next`) slides at opacity .5 (`transition all 375ms ease`).
- Tablet: track padding 172u, gap 67u. Slide 424u wide.
  - Image 424×264u, radius 12u, mb 24u.
  - h2 at h5 token (17/22.1), p2 12/19.2, text gap 12u.
  - Pagination bottom -70u.
- Mobile: track padding 24.5u, gap 16u. Slide 273u wide.
  - Image height 170u, radius 12u, mb 24u. Text gap 16u.
  - Pagination bottom -39u.
- The active slide's lottie plays on `active`.

## 11. Testimonials (`section#homepage-testimonials`)

- bg `#FCFBFA`.
- Container:
  - Desktop: padding 0 170u 200u; flex, space-between.
  - Tablet: padding 0 40u 100u; same layout.
  - Mobile: padding 0 25u 50u; stacked.
- Title h3: ~41 chars, 4–5 lines; one ~6-char word green. Width 400u (desktop) / 272u (tablet). mb 40u.
- Mobile only: a 1px `#285D60` divider under the title (mb 16u).
- Slider: Splide `{arrows: true, autoWidth: true, pagination: false, perPage: 1}`. Width 424u (desktop), 331u (tablet), 100% (mobile). 6 slides.
- Slide (column, gap 24u, mb 24u desktop / 16u otherwise):
  - Logo: 234×112u (desktop) / 127×60u, `object-fit: contain`. *Placeholder needed:* company logo, native 468×224 or 234×112.
  - Quote: h2 at h5 token, `#203435`, ~77–133 chars, 4 lines (desktop). Min-height 120u (desktop/mobile) / 80u (tablet).
  - Supporting text: p2 opacity .7, min-height 120u, ~39–279 chars.
  - Author row (flex, space-between):
    - Avatar: 48u (desktop) / 45u, radius 12u, `object-fit: cover`. *Placeholder needed:* portrait, native 96×96, square.
    - Name: p1 500, ~11–12 chars.
    - Role: p3 opacity .7, ~15–34 chars.
    - Gap 16u (desktop) / 12u; name/role column gap 2u.
- Below the slider:
  - Divider: 1px `#285D60`, opacity .4, margin-y 24u (desktop) / 16u.
  - Footer row: flex, space-between, align end.
    - Counter: h5 token, format `0{index}/0{total}`, e.g. "01/06".
    - Arrows: §0.7, gap 14u (desktop) / 10u.
- **Motion:**
  - Tablet/desktop: title then slider (+.06s), each `y 100u→0, autoAlpha→1`, .567s, Eas17.
  - Mobile: title, then divider (+.066s), then slider (+.066s), from `y 40·rem`.

## 12. Pricing (`section#homepage-pricing`)

- bg `#F3F1EC`.
- Header:
  - Container padding-top: 24u (mobile), 40u (tablet), 170u (desktop).
  - Row padding-x: 24u / 40u / 170u.
  - Content: title (~39 chars, 2 lines, 13 chars green) plus desc (~151 chars, 3 lines).

**Cards, desktop**
- Splide is not mounted. The list is `display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; gap 10u`.
- Wrapper: margin 108u top, 80u bottom; padding 0 170u 0 368u. Resulting cards are 294×392.5u each, 3 cards.
- Behind the cards: `.bg.bg-price-gradient`, absolute, top -80u, 350u tall.

**Cards, tablet and mobile**
- Splide `{arrows: false, perPage: 1, pagination: true}`.
- Tablet: padding 206u, gap 32u; slide 356u. Mobile: padding 24.5u, gap 16u; slide 271u.
- Inactive slides at opacity .5 (375ms). Pagination bottom -40u.

**Card**
- bg `#FCFBFA`, radius 8u. Border 2px solid in the plan color, top 8px. Padding 34u 24u 27u. Overflow hidden (visible on lg).
- Content, top to bottom:
  1. Employees label: cp2 in plan color, ~10–14 chars, mb 5u.
  2. Plan title: cp1, ~8–9 chars. mb 30u (mobile/tablet), 0 (desktop).
  3. Plan desc: p4 `/70`, ~98–116 chars. **Desktop height 100u** (animated).
  4. Price: h2 ch1, ~7–9 chars, with an inner unit span at 0.75em on lg.
  5. Per-month label: cp2 plan color.
  6. Platform-fee value: h4 on desktop (ch1 otherwise), mt 15u.
  7. Fee label: cp2.

**Comparison accordion**
- Padding-x 24u / 40u / 170u. Flex column, gap 22u. 1 accordion item.
- Button: pb 24u (desktop) / 22u. Title cp1, ~12 chars. Chevron icon 16u. Bottom line: 1px `#285D60`, opacity .2, becoming 1 when expanded (`transition 375ms`).
- Content: 10 `.pricing-point` rows.
  - Desktop row: flex, space-between, gap 10u, padding 24u 0 24u 22u, bottom line 1px `#285D60` at .2. **Hover bg `#E9E6DB`** (375ms).
    - Label: cp3, width 215u, ~8–28 chars.
    - 3 value cells, 282u each: a 20u check icon (circle fill `#203435` with a check stroke `#F3F1EC`; redraw) or short cp3 text, 1–5 lines.
  - Tablet/mobile row: wraps. Label width 642u (tablet); padding 16u 0. Only the active plan's values show (`.accordion.active-N .benefit-point-N {display: block}`), synced to the slider index.
- Open on load: `numberOfVisibleItems` 4 (desktop) / 2, and `isCloseNeighbors: false`.

**Footnotes:** `ul`, cp3, opacity .4, padding 24u 170u (desktop) / 22u 40u (tablet). 2 lines, ~37 and ~51 chars.

**Motion, desktop**
- Pin: the cards wrapper is pinned at `start: top top+=82u`, `endTrigger: section, end: bottom top+=300u`, `pin: true, pinSpacing: false, scrub`.
- Second scrubbed ScrollTrigger (same start, `endTrigger .splide__list`):
  - `.plan-desc` height 100u → 30u, and `autoAlpha 1→0` (duration .3 of the timeline).
  - `.platform-fee` `autoAlpha 1→0, height→0` (duration .3).
  - The pinned cards collapse to a compact sticky header over the table.
- Clicking an accordion triggers `ScrollTrigger.refresh()` after 500ms.
- In-view reveal: title, then desc +.06s, `y 100u`, .567s, Eas17. Mobile uses `40·rem` and +.066s.

## 13. FAQ (`section#homepage-faq`)

- bg `#FCFBFA`. Padding-top: 120u (mobile), 180u (tablet), 160u (desktop).
- `.medium-container`: padding-bottom 125u (tablet/desktop) / 100u (mobile). Flex, space-between on ≥481.
- Left: h3, ~31 chars, 2 lines, 11 chars green. Block width 328u (desktop) / 272u (tablet).
- Right: accordion block, width 530u (desktop), 332u (tablet), 100% with mt 40u (mobile). 5 items, all closed initially; one open at a time.
  - Button: margin-top and padding-bottom 20u (desktop), 12u (tablet), 18u (mobile).
  - Title: h6, ~34–76 chars, 1–2 lines. Width 435u (desktop), 297u (tablet), 237u (mobile).
  - Chevron: 24u (desktop) / 16u, absolute at right 0, top 0.
  - Answer: p2 `/70`, ~63–735 chars; inner pb 20u (desktop) / 16u.
  - Animation per §0.7.
- No reveal animation on this section.

## 14. Bottom CTA (`section#cta-section-25167`)

- bg `#285D60`. Inner `.cta-wrap` is medium-container width, overflow hidden.
  - Desktop: padding 174u top, 170u bottom; flex row, space-between, centered.
  - Tablet: padding 93u top, 120u bottom; align start.
  - Mobile: padding 80u top, 120u bottom; column centered, gap 32u.
- Title: h4 element at h3 token, white, ~21 chars, 1 line. Left aligned on ≥481 (width 360u desktop / 288u tablet), centered on mobile.
- Visual: looping Lottie (`/lottie/footer/cta.json`, 1058×600). 529×300u (desktop), 332×189u (tablet), 100%×134u (mobile). Plays while in view. *Placeholder needed.*
- Decorative bg image (`bg-tablet.png`): absolute z 0 behind the visual.
  - Desktop: left 571u, top 74u, 529×500u. Tablet: 336×279u. Mobile: top 80u, 272×279u.
  - *Placeholder needed:* soft abstract background, cover.

## 15. Footer (`footer`)

- bg `#285D60`. Height 523px @1440, 763px @768, 937px @390.
- Decorative edge lines: `img.line-left` / `img.line-right`, absolute at bottom left/right, 84u wide, ~1003u tall. They rise above the footer into the CTA section. Native SVGs 84×1003 / 86×1003. Redraw as simple vertical line art.
- `.medium-container` (1100u / 684u / 272u).

**Desktop**
- `.footer-desktop-wrap`: padding-top 48px (fixed); padding-bottom 17u; border-bottom 1px `rgba(252,251,250,.2)`; flex row.
- Brand block: width 179u, padding 33u top, 24u bottom.
  - Logo: white wordmark, 82×20.5u, mb 8u. *Placeholder needed.*
  - Tagline: p2-mobile size (12/19.2u), white/40, 2 lines, ~36 chars.
- Nav: flex-grow, `justify-end`, 3 columns.
  - Columns 2 and 3 have `ml 107u`. Each column has padding 24u y.
  - Column heading: nav-large, white, mb 24u. Headings are ~9, 7 and 14 chars.
  - Links: nav token, white/40, item pb 24u. **Hover: white**, 150ms Tailwind `transition` (the `duration-400` class does not exist in the build, so the effective duration is .15s). Column 1 has 6 links, column 2 has 3, column 3 has the social icons (24u each, mr 12u; *redraw* simple X/LinkedIn glyphs or use placeholders).
- Foot row: padding 40u y; flex, space-between.
  - Copyright: nav, white/40, ~19 chars.
  - Legal links ×2: nav, white/40, mr 22u, hover white.

**Tablet/mobile**
- Everything stacked.
- Brand block: padding 24u y, border-b.
- Each nav column: padding 24u y, border-b `rgba(252,251,250,.2)`, no headings.
- Links: nav token (14/22.4 tablet, 12/19.2 mobile), **full white**, item pb 24u, each with a 16u arrow icon at right (redraw: simple arrow).
- Copy row: flex, space-between, with the social icons on the right.
- Legal links: inline with mr 22u (tablet); stacked with mb 22u (mobile).

---

## 16. Motion library summary

| Library | Evidence | Used for |
|---|---|---|
| **GSAP 3** core + **CustomEase** | `gsap.registerPlugin(CustomEase)`, `CustomEase.create(...)` in `animation-BrPXSbUB.js` | All reveals and tab transitions |
| **GSAP ScrollTrigger** | `.pin-spacer` elements, `ScrollTrigger.create({... pin, scrub})`, `config({ignoreMobileResize: true})`, `anticipatePin: 1` when pinning | Section activation, roadmap/peace/pricing pins |
| **lottie-web** (SVG renderer) | `lottie-C7i5I3gT.js`, `data-lottie-path` attributes, `loadAnimation({renderer: "svg"})` | 19 animations (see manifest) |
| **Splide 4** | `splide-BRKXMWAJ.css`, `splide.min` module | Testimonials (all sizes); benefits, peace and pricing on smaller sizes |

Not present: Webflow IX2, Framer Motion, AOS, Lenis/smooth-scroll libs, Swiper, IntersectionObserver-based reveals, CSS `@keyframes`, `<video>`, `<canvas>`.

**Section activation pattern** (base `Section` class)
- Each section has `ScrollTrigger.create({trigger: section, start: "top bottom-=25%", end: "bottom top-=25%", scrub: true, onEnter/onEnterBack/onUpdate: activate, onLeave/onLeaveBack: deactivate})`.
- Overrides: Trusted `top bottom-=15%`, Second and Everything `top bottom-=30%`, Compliance CTA `top bottom-=10%` / `bottom top-=10%`.
- Reveals run once (an `isActivated` flag). Lotties and the ticker pause or stop on deactivate.

**Frame-based durations:** `f(n) = n/60` seconds.

**Shared constants:** `duration567 = .567s`, `duration550 = .55s`, `delay60 = .06s`, `delay66 = .066s`.

**Eases** (cubic-bezier equivalents of the CustomEase definitions):

| Name | cubic-bezier | Use |
|---|---|---|
| Eas17 | (0.17, 0.17, 0.21, 1.00) | Default reveal ease |
| Eas82 | (0.82, 0.00, 0.22, 1.00) | "Everything" headline |
| Eas66 | (0.66, 0.00, 0.83, 0.83) | Tab-out |
| Eas40 | (0.40, 0.00, 0.83, 0.83) | Roadmap image out |
| Eas1739 | (0.17, 0.17, 0.39, 1.00) | Hero tab in |
| Eas49 | (0.49, 0.00, 0.83, 0.83) | Hero tab out / popup close |
| Eas7937 | (0.79, 0.00, 0.37, 1.00) | Popup visual drop |
| Eas7983 | (0.79, 0.00, 0.83, 0.83) | Popup visual fade |
| Eas1754 | (0.17, 0.17, 0.54, 1.00) | Defined, unused on home |
| Eas69 | (0.69, 0, 0.32, 1.27) | Defined, unused on home |
| Eas70 | (0.70, 0, 0.83, 0.83) | Defined, unused on home |
| menu | (.57, 0, .43, 1) | Mobile menu |

**CSS transitions**
- 0.4s (`all`): header container, nav links, burger, logo paths.
- 375ms ease: card bg/icon, slider slides/arrows, pricing rows, accordion lines.
- 0.5s cubic-bezier(.17,.17,.43,1): accordion content and icon.
- 0.4s opacity: lazy images (fade in on load, class `.lazyLoaded`).
- 150ms Tailwind default: footer links.

## 17. Not measurable or caveats

- **Lottie artwork** is SVG-rendered vector illustration, plus embedded base64 PNGs in the hero, CTA and footer-CTA files. Text inside the hero lotties is set in "Circular Std" (lottie font list). I recorded only frame rate, duration, viewBox and rendered size. Its visual content is proprietary and needs placeholders.
- **Hover visuals** come from the CSS rules quoted above. I did not take screenshots of hovered states.
- **Pinned-section geometry** (roadmap, peace, pricing) was measured at scroll position 0, with GSAP's initial transforms applied. Several y values in the raw dumps include the pending `translateY(100u)` of un-revealed items. The resting positions are the values without that offset, as written in this spec.
- I measured the mobile menu open state at 768 only. At 390 it uses the same code path, with height 86% and a column layout.
- The 1280 layout was verified through key elements only (all section boxes plus about 50 anchors). Every value is the 1440 value × 0.8889.
- Figtree/DM Sans metrics against Circular were not measured (see §0.3).
- Third-party scripts (HubSpot, GTM, LinkedIn, Google Ads) are ignored.
