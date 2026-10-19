Source: https://mosey.com/?ref=saaspo.com

# Asset manifest: Mosey homepage

The asset list comes from the Playwright network log at 1440 after a full scroll, cross-checked against the DOM `img`, `[data-lottie-path]` and inline `svg` elements. Rendered sizes are at 1440, where 1u = 1px. Divide by 1440 and multiply by the viewport width for other desktop widths. See `CLONE_SPEC.md` for tablet and mobile sizes.

**How to read the treatment column**

- **PLACEHOLDER**: proprietary brand or customer logo, photo, screenshot or illustration. Do not download. Use a neutral placeholder with the given size, aspect and fit.
- **REDRAW**: generic UI icon or simple decorative line art. Recreate as your own SVG.
- **DO NOT SHIP**: commercial font. Substitute it.

## Fonts

| File | Weight | Treatment |
|---|---|---|
| https://mosey.com/assets/circular-oN0pFJYq.woff2 | 400 (internally "Circular Std Medium") | DO NOT SHIP. This is Lineto Circular Std, a commercial font. Substitute Figtree 500. |
| https://mosey.com/assets/CircularStd-Book-DCwdhgOH.woff2 | 450 | DO NOT SHIP. Substitute Figtree 450 (Google Fonts, OFL). |
| https://mosey.com/assets/CircularStd-Medium-Z42jg6iz.woff2 | 500 | DO NOT SHIP. Substitute Figtree 500. |

## Inline SVG (in the HTML)

| Section | What | viewBox | Rendered (1440) | Colors | Treatment |
|---|---|---|---|---|---|
| Header | Brand wordmark | 48×12 | 74×18.5 | `#285D60` (`#EFEFEF` when the menu is open) | PLACEHOLDER (wordmark, 4:1) |
| Header flyout | 4 product icons | 24×20 / 26×26 | 24×20 | `#285D60`, `#CFD7D4` | PLACEHOLDER (small pictograms) |
| Hero | Bottom corner curves ×2 (desktop) | 422×170 | 423×170 | stroke `#516B66` | REDRAW (S-curves plus a dot) |
| Hero | Bottom corner curves ×2 (tablet) | 123×154 | 133×144 (@768) | stroke `#516B66` | REDRAW |
| Hero popup | Coil lines left/right (desktop/tablet) | 251×241 | 250×241 | stroke `#285D60`, dot `#285D60`/`#F3F1EC` | REDRAW |
| Hero popup | Coil lines (mobile) | 44×163 | 44×163u | same | REDRAW |
| Hero tabs | Timer ring ×3 | 15×15 | 12×12 | `#285D6033` track, `#285D60` progress | REDRAW (2 circles, r=6) |
| Everything | Headline backing "tab" shape | 1223×54 | 1232×54.4 | fill `#F3F1EC` | REDRAW (wide rounded trapezoid) |
| Compliance | Side vertical lines ×2 | 105×1005 | 104×1000 | stroke/fill `#516B66` | REDRAW |
| Benefits | Card chart pictograms ×3 | 172×104 | 236×143 | fill `#285D60` at op .2 (1 on hover) | PLACEHOLDER (simple chart pictogram) |
| Roadmap | Corner lines (desktop ×2) | 382×241 | 382×239 | `#AEBFBD` | REDRAW |
| Roadmap | Corner lines (tablet ×2) | 175×171 | 175×169 (@768) | `#AEBFBD` | REDRAW |
| Roadmap | Corner lines (mobile ×2) | 90×102 / 89×102 | 90×102u | `#AEBFBD` | REDRAW |
| Testimonials | Slider arrow (prev mirrored) | 16×12 | 20×14 | stroke `#285D60` | REDRAW (right arrow) |
| Pricing / FAQ | Chevron-down (`M5.5 7l3 3 3-3`) | 17×16 | 16 (pricing), 24 (FAQ) | stroke `#285D60`, width 2 | REDRAW |
| Pricing table | Check in filled circle | 23×22 / 22×22 | 20×20 | circle `#203435`, check `#F3F1EC` | REDRAW |

## Raster and external SVG images

| Section | URL | Native | Rendered (1440) | Fit | Treatment |
|---|---|---|---|---|---|
| Hero popup | https://mosey.com/img-theme-assets/home/cta-visual.png | 790×450 | 484.8×276.1 | fill | PLACEHOLDER: product screenshot, 1.756:1 |
| Trusted (row 1) | .../logos/stellarhealth.png, chime.png, mark43.png, recharge.png, teero.png, rallybio.png | 468×224 each | 234×112 | cover | PLACEHOLDER ×6: customer logo tile, 2.09:1, dark mono on transparent |
| Trusted (row 2) | .../logos/crio.png, everlaw.png, commonRoom.png, medely.png, sparrow.png, watershed.png | 468×224 each | 234×112 | cover | PLACEHOLDER ×6: same |
| Compliance tabs | .../home/compliance/tab-images/finance.png, headofpeople.png, startup.png, legal.png | 1290×894 (1291×894 for 2 of them) | 645×447 | cover | PLACEHOLDER ×4: product screenshot, 1.443:1, radius 12u |
| Compliance list icons | .../home/compliance/icon/consolidate.svg, eliminate.svg, avoid.svg, automate.svg, identify.svg, letter.svg, offload.svg, compliance.svg, founding.svg, modern.svg, monitor.svg | 26×26 (compliance.svg 27×26) | 26×26 | fill | PLACEHOLDER ×11: small pictograms (automate.svg is reused twice) |
| Compliance CTA | https://mosey.com/img-theme-assets/home/bg-desktop.png | 644×371 | 644×324 | cover | PLACEHOLDER: soft abstract bg (≥481 only) |
| Compliance CTA (mobile) and bottom CTA | https://mosey.com/img-theme-assets/home/bg-tablet.png | 510×402 | 529×500 (bottom CTA) | cover | PLACEHOLDER: soft abstract bg |
| Testimonials | .../logos/medely.png, calm.png, coda.png (468×224); sublimity.png, lendedu.png, darkdot.png (234×112) | as noted | 234×112 | contain | PLACEHOLDER ×6: company logo |
| Testimonials | .../home/testimonials/jonas.png, danny.png, kenny.png, photo-placeholder.png (×3 uses) | 96×96 | 48×48 | cover | PLACEHOLDER ×6: square portrait, radius 12u |
| Footer | https://mosey.com/img-theme-assets/footer-line-left.svg | 84×1003 | 84×1003 | – | REDRAW (vertical line art) |
| Footer | https://mosey.com/img-theme-assets/footer-line-right.svg | 86×1003 | 84×979.7 | – | REDRAW |
| Footer | https://mosey.com/img-theme-assets/logo-white.svg | 52×13 | 82×20.5 | – | PLACEHOLDER: white wordmark, 4:1 |
| Footer and mobile menu | https://mosey.com/img-theme-assets/arrow.svg | 17×17 | 16×16 (tablet/mobile only) | – | REDRAW (arrow) |
| Footer | https://mosey.com/img-theme-assets/twitter.svg, linkedin.svg | 25×25 | 24×24 | – | REDRAW or PLACEHOLDER (social glyphs) |
| Head | https://mosey.com/assets/favicon-32x32-eMotgx7D.png | 32×32 | – | – | PLACEHOLDER |

## Lottie animations (lottie-web, SVG renderer)

All are PLACEHOLDER: proprietary illustration animation. Replace each with a static or animated placeholder at the same aspect. If the clone keeps lottie-web, wire in placeholder JSON with matching durations so tab and auto-advance timing stays identical.

| Section | Path (https://mosey.com…) | fps | Frames | Duration | viewBox | Rendered (1440) | Loop / trigger |
|---|---|---|---|---|---|---|---|
| Hero tab 1 (desktop) | /lottie/part_1/part_1.json | 30 | 0–492 | 16.40s | 1440×566 | 1440×570 | Once; drives the auto-advance interval |
| Hero tab 2 (desktop) | /lottie/part_2/part_2.json | 30 | →911 | 13.97s | 1440×566 | 1440×570 | Once |
| Hero tab 3 (desktop) | /lottie/part_3/part_3.json | 30 | →996 | 2.83s | 1440×566 | 1440×570 | Once, then the popup CTA opens |
| Hero tabs (mobile/tablet) | /lottie/part_1_mobile/part_1.json, /lottie/part_2_mobile/part_2.json, /lottie/part_3_mobile/part_3.json | 30 | same as desktop | 16.40 / 13.97 / 2.80s | 904×804 | 768×400 @768, 390×335 @390 | same |
| Everything (in-view) | /lottie/lines.json (desktop), /lottie/lines-m.json (mobile) | 60 | 127 / 95 | 2.12s / 1.58s | 1936×1760 / 517×632 | 970×882 | Once on enter |
| Everything (loop) | /lottie/dots.json, /lottie/dots-m.json | 60 | 497 / 323 | 6.18s / 3.80s | 1936×1760 / 517×632 | 970×882 | Loops after the lines finish |
| Compliance CTA | /lottie/cta.json | 60 | 120 | 2.00s | 908×516 | 454×258 | Loops while in view |
| Roadmap step 1 | /lottie/roadmap/step_1/step_1.json | 60 | 479 | 7.98s | 434×345 | 412×328 (inside 434×345 box) | Scrub-triggered play |
| Roadmap step 2 | /lottie/roadmap/step_2/step_2.json | 60 | 320 | 5.33s | 886×690 | same box | same |
| Roadmap step 3 | /lottie/roadmap/step_3/step_3.json | 60 | 420 | 6.00s | 868×690 | same box | same |
| Peace steps 1–4 | /lottie/peace/Piece_of_mind_01/Piece_of_mind_01.json, Piece_of_mind_02/…_02.json, Piece_of_mind_03/…_03.json, Piece_of_mind_04/…_04.json | 30 | 146 / 191 / 183 / 214 | 4.87 / 6.37 / 6.10 / 7.13s | 848×528 | 424×264 | Play on step or slide activation |
| Bottom CTA | /lottie/footer/cta.json | 60 | 120 | 2.00s | 1058×600 | 529×300 | Loops while in view |

Notes:

- part_1/2/3 (desktop and mobile) and both CTA files embed base64 PNG images. The hero parts also reference the font "Circular Std" for in-animation text.
- No video, canvas or iframe media is used. The only iframe is a hidden third-party tracking frame.
- Stylesheets: `/assets/mobileMenu-CEbHqbvC.css` (main Tailwind build plus components) and `/assets/splide-BRKXMWAJ.css` (Splide core). Use these for reference only; they are not to be copied wholesale.
