# Northwind art manifest

Original SVG artwork for the Northwind clone. Everything here is a new composition; none of it is traced from the reference site. Colors come only from the CLONE_SPEC tokens. Every file is a standalone SVG with no rasters and no external refs. Text uses `font-family: Figtree, Helvetica Neue, Arial, sans-serif`. When a file is loaded through `<img>`, webfonts do not reach it, so text falls back to the system sans.

Paths are relative to `/public/assets/art/` (served at `/assets/art/...`).

**Animating:** ids and classes only take effect when the SVG is inlined (fetched and injected, or imported as a React component, e.g. with `vite-plugin-svgr`). An `<img>` cannot be animated from the outside. Paths marked `pathLength=1` can be drawn on with `stroke-dasharray:1; stroke-dashoffset:1→0`. These are static stand-ins for the original Lottie files. Keep the original durations from ASSET_MANIFEST (e.g. hero tabs 16.40 / 13.97 / 2.83 s) so tab auto-advance timing does not change.

## Brand

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Head favicon 32x32 | `brand/favicon.svg` | `0 0 32 32` | – |
| Header wordmark when mobile menu open (#EFEFEF) | `brand/northwind-logo-menu.svg` | `0 0 48 12` | #mark, #wordmark (fade/slide on load) |
| Footer white wordmark (52x13 slot, 4:1) / dark backgrounds | `brand/northwind-logo-white.svg` | `0 0 48 12` | #mark, #wordmark (fade/slide on load) |
| Header brand wordmark (48x12, #285D60) | `brand/northwind-logo.svg` | `0 0 48 12` | #mark, #wordmark (fade/slide on load) |

## Header flyout

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Header flyout product icon: entities | `header/flyout-entities.svg` | `0 0 24 20` | – |
| Header flyout product icon: mail | `header/flyout-mail.svg` | `0 0 24 20` | – |
| Header flyout product icon: payroll | `header/flyout-payroll.svg` | `0 0 24 20` | – |
| Header flyout product icon: tax | `header/flyout-tax.svg` | `0 0 24 20` | – |

## Hero

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Hero popup CTA image (790x450) | `hero/hero-popup-visual.svg` | `0 0 790 450` | .row/#row-1..3, .stat, .pill |
| Hero tab 1 lottie (mobile/tablet 904x804) | `hero/hero-tab-1-mobile.svg` | `0 0 904 804` | same ids as hero-tab-1 |
| Hero tab 1 lottie (desktop 1440x566) | `hero/hero-tab-1.svg` | `0 0 1440 566` | #window, #stat-1..3, #progress-fill (scaleX from left), .row/#row-1..3 (stagger in), .pill, #float-left/#float-right (.float-card, float/slide), #float-check, #donut-arc (stroke-dasharray) |
| Hero tab 2 lottie (mobile/tablet 904x804) | `hero/hero-tab-2-mobile.svg` | `0 0 904 804` | same ids as hero-tab-2 |
| Hero tab 2 lottie (desktop 1440x566) | `hero/hero-tab-2.svg` | `0 0 1440 566` | .row/#row-1..6 (stagger), .row checkbox (check on), .pill, .chip, #cal-highlight (pulse), #bell (swing), .float-card |
| Hero tab 3 lottie (mobile/tablet 904x804) | `hero/hero-tab-3-mobile.svg` | `0 0 904 804` | same ids as hero-tab-3 |
| Hero tab 3 lottie (desktop 1440x566) | `hero/hero-tab-3.svg` | `0 0 1440 566` | #stepper-line (draw via pathLength=1), .step/#step-1..4 (pop in sequence), #stamp (scale/rotate in), #status-pill, .row/#detail-1..5, .float-card |

## Logo marquee + testimonial logos

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| logo tile | `logos/arcwell.svg` | `0 0 468 224` | – |
| logo tile | `logos/brightpath.svg` | `0 0 468 224` | – |
| logo tile | `logos/corvid-labs.svg` | `0 0 468 224` | – |
| logo tile | `logos/driftwood.svg` | `0 0 468 224` | – |
| logo tile | `logos/fernway.svg` | `0 0 468 224` | – |
| logo tile | `logos/halcyon.svg` | `0 0 468 224` | – |
| logo tile | `logos/juniper-bay.svg` | `0 0 468 224` | – |
| logo tile | `logos/kestrel.svg` | `0 0 468 224` | – |
| logo tile | `logos/marlowe.svg` | `0 0 468 224` | – |
| logo tile | `logos/orbitra.svg` | `0 0 468 224` | – |
| logo tile | `logos/pallaso.svg` | `0 0 468 224` | – |
| logo tile | `logos/quillfield.svg` | `0 0 468 224` | – |
| logo tile | `logos/solenne.svg` | `0 0 468 224` | – |
| logo tile | `logos/tessellate.svg` | `0 0 468 224` | – |

## Everything network

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Everything lines + dots lottie (desktop 1936x1760) | `everything/network-desktop.svg` | `0 0 1936 1760` | #lines .line (draw: stroke-dashoffset 1→0 via pathLength=1, the 'lines' lottie), #dots .dot (loop: each has data-line=<path id> and data-offset; move along that path with CSS offset-path or SMIL mpath, the 'dots' lottie), #nodes .node (pop in), #hub, #hub-halo (pulse), #rings |
| Everything lines + dots lottie (mobile 517x632) | `everything/network-mobile.svg` | `0 0 517 632` | #lines .line (draw: stroke-dashoffset 1→0 via pathLength=1, the 'lines' lottie), #dots .dot (loop: each has data-line=<path id> and data-offset; move along that path with CSS offset-path or SMIL mpath, the 'dots' lottie), #nodes .node (pop in), #hub, #hub-halo (pulse), #rings |

## Compliance by role

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Compliance tab image: finance (1290x894) | `compliance/tab-finance.svg` | `0 0 1290 894` | #main-card, .row/#row-1..4, .pill, #chart-card .bar/#bar-1..4 (scaleY) |
| Compliance tab image: head-of-people (1290x894) | `compliance/tab-head-of-people.svg` | `0 0 1290 894` | #main-card, .loc-on/#loc-N (pulse), #side-card .row |
| Compliance tab image: legal (1290x894) | `compliance/tab-legal.svg` | `0 0 1290 894` | #main-card .row, .pill, #mail-card #envelope, #signature (draw via pathLength=1) |
| Compliance tab image: startup (1290x894) | `compliance/tab-startup.svg` | `0 0 1290 894` | #main-card .row (check in sequence), #progress-ring (stroke-dasharray) |

## Compliance list icons

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Compliance list icon: automate | `icons/automate.svg` | `0 0 26 26` | – |
| Compliance list icon: avoid | `icons/avoid.svg` | `0 0 26 26` | – |
| Compliance list icon: compliance | `icons/compliance.svg` | `0 0 26 26` | – |
| Compliance list icon: consolidate | `icons/consolidate.svg` | `0 0 26 26` | – |
| Compliance list icon: eliminate | `icons/eliminate.svg` | `0 0 26 26` | – |
| Compliance list icon: founding | `icons/founding.svg` | `0 0 26 26` | – |
| Compliance list icon: identify | `icons/identify.svg` | `0 0 26 26` | – |
| Compliance list icon: letter | `icons/letter.svg` | `0 0 26 26` | – |
| Compliance list icon: modern | `icons/modern.svg` | `0 0 26 26` | – |
| Compliance list icon: monitor | `icons/monitor.svg` | `0 0 26 26` | – |
| Compliance list icon: offload | `icons/offload.svg` | `0 0 26 26` | – |

## CTA visuals + backgrounds

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Compliance CTA decorative bg (desktop, 644x371) | `cta/bg-desktop.svg` | `0 0 644 371` | #rings .ring (scale pulse), #glow-fill (opacity) |
| Compliance CTA mobile bg + Bottom CTA bg (510x402) | `cta/bg-tablet.svg` | `0 0 510 402` | #rings .ring (scale pulse), #glow-fill (opacity) |
| Bottom CTA lottie (1058x600) | `cta/bottom-cta-visual.svg` | `0 0 1058 600` | #ripples .ripple (scale/opacity loop), #card, #big-check, .row (stagger), #chip-left/#chip-right (.float-card bob) |
| Compliance CTA lottie (908x516) | `cta/compliance-cta-visual.svg` | `0 0 908 516` | #front-card, #back-card-1/#back-card-2 (stack offset), .row (stagger), .toggle-knob (slide x -18→0), #status-pill, #scan-bar (unused by default, op 0) |

## Benefits

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Benefits card pictogram 1 | `benefits/benefit-1.svg` | `0 0 172 104` | #trend (stroke-dashoffset via pathLength=1), #points |
| Benefits card pictogram 2 | `benefits/benefit-2.svg` | `0 0 172 104` | .bar (scaleY from bottom), #badge |
| Benefits card pictogram 3 | `benefits/benefit-3.svg` | `0 0 172 104` | #needle (rotate around 86,58), #gauge-arc |

## Roadmap

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Roadmap step 1 lottie (434x345) | `roadmap/roadmap-step-1.svg` | `0 0 434 345` | .cell-on/#cell-N (fill in stagger), #magnifier (move across grid), #tag-1..3 (.pill pop) |
| Roadmap step 2 lottie (886x690) | `roadmap/roadmap-step-2.svg` | `0 0 886 690` | .field/#field-1..3 (stagger; check fades in), #submit (press), #toast (.float-card slide up) |
| Roadmap step 3 lottie (868x690) | `roadmap/roadmap-step-3.svg` | `0 0 868 690` | .event/#event-N (pop), #toast (.float-card slide up), #renew-icon (rotate) |

## Peace of mind

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Peace-of-mind step 1 lottie (848x528) | `peace/peace-step-1.svg` | `0 0 848 528` | .alert/#alert-1..3 (stack in sequence) |
| Peace-of-mind step 2 lottie (848x528) | `peace/peace-step-2.svg` | `0 0 848 528` | #envelope, #arrow, #document, #scan-line (translateY sweep), #highlight, #status-pill |
| Peace-of-mind step 3 lottie (848x528) | `peace/peace-step-3.svg` | `0 0 848 528` | #shield (scale in), #orbit (rotate), #chip-1..3 (.pill pop) |
| Peace-of-mind step 4 lottie (848x528) | `peace/peace-step-4.svg` | `0 0 848 528` | #timeline (draw via pathLength=1), .milestone/#milestone-1..4 (sequence), #badge |

## Testimonial avatars

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Testimonial avatar (avatar-1) | `avatars/avatar-1.svg` | `0 0 96 96` | – |
| Testimonial avatar (avatar-2) | `avatars/avatar-2.svg` | `0 0 96 96` | – |
| Testimonial avatar (avatar-3) | `avatars/avatar-3.svg` | `0 0 96 96` | – |
| Testimonial avatar (avatar-4) | `avatars/avatar-4.svg` | `0 0 96 96` | – |
| Testimonial avatar (avatar-5) | `avatars/avatar-5.svg` | `0 0 96 96` | – |
| Testimonial avatar (avatar-6) | `avatars/avatar-6.svg` | `0 0 96 96` | – |

## Footer

| Slot | File | viewBox | Animatable elements |
|---|---|---|---|
| Footer line art left (84x1003) | `footer/footer-line-left.svg` | `0 0 84 1003` | #line (draw via pathLength=1), #dot |
| Footer line art right (86x1003) | `footer/footer-line-right.svg` | `0 0 86 1003` | #line (draw via pathLength=1), #dot |

## Notes for Build and Animation

- **Logo marquee:** use any 12 of the 14 tiles. Row 1: halcyon, brightpath, corvid-labs, tessellate, orbitra, fernway. Row 2: kestrel, driftwood, juniper-bay, arcwell, pallaso, quillfield. The tiles are monochrome `#203435` on a transparent background, 468×224 (2.09:1), with the mark centered so they work with `object-fit: cover`.
- **Testimonial logos (6):** reuse quillfield, solenne, marlowe, orbitra, halcyon and fernway. These tiles are also 468×224, so `object-fit: contain` works.
- **Testimonial avatars:** `avatar-1..6` fill all six slides: the three named authors plus the three `photo-placeholder` uses. They are full-bleed squares. Apply radius 12u in CSS.
- **Footer logo:** the slot's native size is 52×13 and `northwind-logo-white.svg` is 48×12. Both are 4:1, so render it at 82×20.5u. `northwind-logo-menu.svg` (`#EFEFEF`) is for the header when the mobile menu is open. The mark's N is cut out with a mask, so the logo works on any background.
- **Soft CTA backgrounds:** `cta/bg-desktop.svg` and `cta/bg-tablet.svg` are transparent radial glows with rings, made to sit on `#285D60`. Use `bg-tablet.svg` for the bottom CTA and the mobile compliance CTA.
- **Everything network:** play `#lines` once (2.12 s desktop / 1.58 s mobile), then fade in `#dots` and loop them (6.18 s / 3.80 s). Each `.dot` names its path in `data-line`, plus a start fraction in `data-offset`. Move each dot with CSS `offset-path: url(#line-N)` (or copy that path's `d`), or with SMIL `<animateMotion><mpath href="#line-N"/>`.
- **Hero mobile files (904×804):** these reuse the desktop element ids.
- **Benefits:** the pictograms are drawn in solid `#285D60`. The section's own `<g opacity=.2>` → 1 on hover dims them, so no opacity is baked into the files.

## Not produced here (REDRAW items for Build, inline SVG)

Not drawn here: hero corner S-curves, hero popup coil lines, tab timer rings, the "Everything" headline tab shape, compliance side lines, roadmap corner lines, slider arrow, chevron, pricing check circle, footer arrow, X/LinkedIn social glyphs. They are simple strokes that ASSET_MANIFEST.md marks REDRAW, and they belong inline in the components. The only exception is the footer edge line art, which was requested and is under `footer/`.
