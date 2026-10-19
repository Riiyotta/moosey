Source: https://mosey.com/

# Mosey: partner landing pages, one-offs and legal pages (build spec)

I measured these pages live on 2026-10-19 with headless Chromium (Playwright, my own instance) at 1440×900, 768×900 and 390×900. Values come from `getComputedStyle`/`getBoundingClientRect`, after scrolling the whole page once so every reveal had fired, then scrolling back to the top. I also read the shipped CSS (`/assets/mobileMenu-CEbHqbvC.css`), the per-page Vite entry modules (`/assets/<page>/index.html-*.js`), the section modules (`hero-static-*.js`, `features-*.js`, `featureGroup-*.js`, `getStarted-*.js`, `genericCta-*.js`, `benefits-*.js`, `innerPostSection-*.js`) and the inline scripts.

**Read `/Users/riyaghosh/V3/mosey/CLONE_SPEC.md` first.** This file relies on it for the `u` unit (§0.1), fonts (§0.3), type tokens (§0.4: h3, h5, h6, p2, p3, p4, cp1, cp2, ch1, nav), colour tokens (§0.5), shared components (§0.7) and eases/motion (§16). Header, footer, mobile menu and announcement banner are the global ones and are not re-documented here.

- Geometry is in **u**, except in Template A (§2), which is fixed **px**.
- "§H n" means section n of CLONE_SPEC.md.

**Content policy.** Copy is given only as role plus approximate length. I have not transcribed any legal text.
- Partner logos and co-brand lockups are written `PLACEHOLDER WxH`. The clone uses fictional partner names.
- Photos, screenshots and illustrations are PLACEHOLDER.
- Simple shapes are REDRAW.

---

## 0. Route map: which page uses which template

| Route | HTTP / behaviour | Template | Notes |
|---|---|---|---|
| `/gusto/` | 200, `noindex,nofollow` | **A: Legacy partner page** | Variant A1 |
| `/deel/` | 200, noindex | **A** | Variant A2 |
| `/peopletech/` | 200, noindex | **A** | Variant A3 |
| `/sales-tax-beta/` | 200, noindex | **A′** (cut-down A + modal form) | §2.10 |
| `/remote/` | 200, noindex | **B: Static partner page** | identical DOM to the next five |
| `/pillsbury/` | 200, noindex | **B** | |
| `/ethena/` | 200, noindex | **B** | |
| `/fractional-people/` | 200, noindex | **B** | |
| `/computer-share/` | 200, noindex | **B** | |
| `/stable/` | 200, noindex | **B** | |
| `/stripe-atlas/` | 200, noindex | **C: Stripe partner page** | Variant C1 |
| `/stripe-startups/` | 200, noindex | **C** | Variant C2 (adds trusted strip and HubSpot form) |
| `/sequoia-one/` | 200, then inline `location.href="/"` | **SKIP (client redirect to `/`)** | Redirects on mosey.com; shows the homepage. |
| `/texas-reinstatement/` | 200, indexable | **D: Texas reinstatement** | Built from Template B/C parts. |
| `/agency-mail/` | 200 | **E: Agency-mail checkout form** | Legacy px Tailwind |
| `/status/` | 200 | **F: Inner-post (prose) page** | **Not an external redirect.** A short prose page (3 paragraphs, 2 mailto links). |
| `/gdpr-subprocessors/` | 200 | **F** | One paragraph plus a two-column table. |
| `/privacy-policy/`, `/terms-of-service/`, `/data-processing-agreement/` | 200 HTML stub, then inline `window.location.href="/legal/<name>.pdf"` | **G: PDF redirect stubs** | No HTML layout to clone (§8). |
| `/home/` | 200 | **SKIP: broken empty stub** | Byte-identical to `/404/` apart from og:url. **Not a duplicate of `/`.** |
| `/404/` | 200 | **SKIP: broken empty stub** | §9 |
| `/posts/` | **404**, Netlify default "Page not found" card | **SKIP: not a site page** | Any unknown path gives the same Netlify card (checked `/zzz-nonexistent/`). |

**No route redirects off mosey.com.** The only redirects are `/sequoia-one/` → `/` (JS) and the three legal routes → same-origin PDFs (JS).

**Static partner page variants (B).** I diffed the DOM after removing coordinates and text lengths. All six pages are identical at 1440 and 390, including every image `src` and every `href`. The only differences are:
- hero h1 length: remote/ethena/stable ~38 ch, pillsbury ~41, computer-share ~45, fractional-people ~56 (wraps to 3 lines);
- hero description length: ~89–115 ch;
- the CTA section id number.

B carries **no partner logo or lockup at all**. The partner is named only in the 9-ch eyebrow and the h1.

---

## 1. Shared building blocks reused from the homepage (name → CLONE_SPEC section)

| Component | Homepage ref | Used on |
|---|---|---|
| Testimonials slider (`section#homepage-testimonials`) | §H 11 | B (identical, same 6 slides and assets) |
| Pricing (`section#homepage-pricing`, pinned cards) | §H 12 | B, C |
| FAQ accordion (`section#homepage-faq`) | §H 13 | C (5 items; answers can be long, up to ~735 ch / 10 lines) |
| Bottom CTA (`section.cta-section`, Lottie `/lottie/footer/cta.json`) | §H 14 | B, C |
| Compliance CTA card (`.cta-wrap.compliance-cta`), here called **Generic CTA** | §H 7 "Compliance CTA card" | C, D (standalone wrapper, §4.4) |
| Benefits stat cards | §H 8 | D (variant, §5.2) |
| Peace-of-mind sticky steps (`section#homepage-peace`) | §H 10 | D (identical, 4 lotties) |
| Trusted-by marquee (`section#homepage-trusted`) | §H 4 | C2 (variant, §4.5) |
| Section title + desc row, accordion, Splide dots/arrows | §H 0.7 | everywhere in B/C/D |

New components defined in this file:
- **HeroStatic** (§3.1)
- **FeatureList** (§3.2)
- **GetStarted** (a Peace-steps clone with images, §3.3)
- **FeatureGroup** (pinned accordion story, §4.2)
- **IntroRow** (§4.1)
- **HubSpot form block** (§4.6)
- the whole **Legacy partner kit** (§2)
- **Agency-mail form** (§6)
- **Prose/Inner-post** (§7)

---

## 2. Template A: Legacy partner page (`/gusto/`, `/deel/`, `/peopletech/`; cut-down A′ `/sales-tax-beta/`)

This is an older page built with Tailwind UI. It is **not on the u system**: almost everything is fixed px (`rem` = 16px; html font-size is not scaled).

**Breakpoints.** Only the site's two screens exist: `md` ≥481 and `lg` ≥1025.
- Every `sm:` and `xl:` class in the markup has no CSS rule and does nothing. The clone must not "fix" this. For example, hero lockup sizes and section h2 sizes stay at their base values at every width.
- The only u-based items are the `.btn` CTA in the hero (§2.2) and the global header/footer.

**JS.**
- Only `mobileMenu-*.js` (header) runs.
- **Swiper 8** is loaded from `unpkg.com/swiper@8` (JS and CSS), with an inline `window.onload` init (§2.11).
- No GSAP, no ScrollTrigger and no reveal animations on this template.

**Legacy palette.** These are the site's overridden Tailwind colours; use the hex values exactly.

| Class | Hex | Use |
|---|---|---|
| teal-800 | `#006265` | hero bg |
| teal-100 | `#F7FBFB` | intro strip, feature block bg, team block bg |
| teal-300 | `#EFF7F7` | pricing section bg |
| teal-500 | `#B0D3D4` | hero sub-paragraph |
| teal-600 | `#20BCC2` | pricing card 1 border and header |
| teal-700 | `#008489` | pricing card 2; mock-UI accents |
| teal-400 | `#CAEAEA` | highlighted note in pricing card 2; nav hover (in /404 stub) |
| teal-200 | `#F4FBF9` | pricing pill (at opacity .6) |
| rose-700 | `#DC5868` | icon tiles, pricing card 3, pricing buttons |
| rose-800 | `#DA4052` | pricing eyebrow text; button hover bg/border |
| rose-500 | `#DC918F` | skewed accent panel (at op .2) |
| lime-500 | `#55B559` | check icons |
| "white" | `#F3F1EC` | site override: every `text-white`/`bg-white` |
| zinc-800 / zinc-600 | `#292A2D` / `#787986` | band titles / band subtitles |
| gray-900/600/500/400/300/200/100/50 | `#111827` `#4B5563` `#6B7280` `#9CA3AF` `#D1D5DB` `#E5E7EB` `#F3F4F6` `#F9FAFB` | standard Tailwind |
| `.btn-red` | bg `#C74E5C`, text `#F3F1EC` | hero CTA |

- `.btn-red:hover` is **broken CSS** (an invalid declaration), so the hero button has no hover change.
- `bg-stone-100`, `text-rose-600` and `text-rose-400` have **no CSS rule**. The about section has a transparent bg; the uppercase eyebrow and the pill icon inherit colour, which renders the eyebrow `#000`.

**Font weights.** Weights 300/600/700/800 are used, but only Circular Book (450) and Medium (500) ship. Chrome therefore renders 300→Book and 600–800→Medium with **synthetic bold**. With Figtree (variable) the clone will render true weights; that is acceptable. If an exact match is wanted, cap at 500 plus `font-synthesis: weight`.

**Page container.** Every block is a full-bleed band. Inner widths:
- `max-w-7xl` (1280px) with `px-8` at lg (content 1216);
- `max-w-xl` (576) at md/mobile with `px-4` (16) or `px-6` (24).

### 2.1 Page skeleton (Gusto, 1440)

| # | Band | bg | Height @1440 / 768 / 390 (px) |
|---|---|---|---|
| 1 | Hero | `#006265` | 724 / 623 / 682 |
| 2 | Intro strip (centered title + subtitle) | `#F7FBFB` | 228 / 324 / 352 |
| 3 | Feature block 1: 4 alternating feature rows + mock-UI row | `#F7FBFB` | 3774 / 4766 / 4738 |
| 4 | Feature block 2: band title + 3 rows (dark screenshots, skewed accent) | `#F3F1EC` | 2005 / 3011 / 3263 |
| 5 | Feature block 3: band title + 2 image cards + 1 feature row | `#F7FBFB` | 1664 / 2448 / 2662 |
| 6 | "Everything included" checklist (3-col grid) | `#F3F1EC` | 920 / 1016 / 1236 |
| 7 | `#pricing`: 3 pricing cards (Swiper) | `#EFF7F7` | 2292 / 2348 / 2384 |
| 8 | `#about`: logo row + testimonial Swiper | transparent | 1055 / – / – |
| – | global footer | | |

Bands 3–8 sit inside `div.relative.overflow-hidden`.
- Doc height: 13184 / 16478 / 17679 px.
- Deel 13078 and Peopletech 13064 at 1440, because of copy and lockup differences.

### 2.2 Hero (band 1)

- `bg #006265`, text-center, flex column.
- Inner `py-24 lg:py-36`: 96px mobile/tablet, 144px desktop. `overflow:hidden`.
- Container: `max-w-3xl` (768) for Gusto, `max-w-4xl` (896) for Deel/Peopletech/sales-tax-beta. `px-4` (16) on mobile/tablet, `px-8` (32) at lg.
- The global fixed header overlays the top of the hero (header pill y=24, h=52 at 1440).
- Stack, centered:
  1. **Co-brand lockup** (`h2`; see variants in §2.12). The row is 36–48px tall and sits 11px below the container top.
  2. **h1**: mt 80px (64px measured at 390 = `mt-20` 80px; the h1 starts 88px below the lockup), mb 48px.
     - Size 36/40 mobile, 48/60 at ≥481 (`md:text-5xl md:leading-tight`); w800; colour `#F3F1EC`.
     - ~27–45 ch, 2 lines at 1440 (704px measure), 3 lines at 390.
  3. **Sub-paragraph**: mt 24px, 18/28, w500 (sales-tax-beta w400), colour `#B0D3D4`, ~108–126 ch, 2 lines at 1440. Contains a `<br>`.
  4. **CTA row**: mt 48px. One `a.btn.btn-red` (signup link with partner code):
     - Size from the u-tokens `text-button-large` = 14/22.4u, ls -.28u, w500 at desktop; 12/19.2u tablet; 10/16u mobile.
     - Padding 6u 16u (md+) / 5u 9u (mobile); radius 8u; 1px transparent border; bg `#C74E5C`; `transition: .4s`.
     - Measured 172×36.4 at 1440 (~21 ch label); 122×27.6 at 390.
     - sales-tax-beta uses a `<button.request-invite-btn>` that opens the modal (§2.10).
- Two decorative blocks (`hidden sm:flex`, US map images `/assets/us-map-*.png` and `/assets/us-people-map-*.png`) **never render** because `sm:` is inert. Omit them.

### 2.3 Intro strip (band 2) and band titles (bands 4, 5)

- Padding: `py-16 pb-9` → 64 top, 36 bottom. Band 4/5 wrappers use `py-16` (64/64). sales-tax-beta's strip has `pt-24` (96).
- Container: `max-w-md` (448) on mobile/tablet, then `lg:max-w-7xl` (1280) with px 32 at lg.
- **Band title**: 36/40, w800, ls -0.9px, `#292A2D`, mt 8, ~17–36 ch, 1 line at 1440, 2 lines at 390.
- **Band subtitle**: mt 24, `max-w-3xl` (768) centered, 20/28, w500, `#787986`, ~113–159 ch, 2 lines at 1440, 4–5 lines at 390.

### 2.4 Feature row (bands 3–5): the core legacy component

**Desktop (≥1025)**
- `lg:grid lg:grid-cols-2 lg:gap-24 lg:max-w-7xl lg:px-8 lg:grid-flow-col-dense` → 2 cols of 560px, gap 96px, inside 1280.
- Rows alternate text-left/image-right and image-left/text-right (`order-*` / `lg:col-start-2`).
- Row padding: first row `py-16` (64/64); later rows `lg:pt-20` (80 top, 0 or 32 bottom).
- **Text column**: `lg:py-32` (128px top and bottom), so the text block is vertically padded inside a ~616–728px row.
  - **Row title** (`h2`/`h3`): 30/36, w700, ls -0.7px (≈ -0.025em), `#111827`, ~15–32 ch, 1 line.
  - **Row lead**: mt 12, 18/28, w400, `#6B7280`, ~86–130 ch, 2 lines at 560px.
  - **Feature list** (`dl`, mt 40, `space-y-8` (32) or `space-y-10` (40)): each item is `relative`.
    - **Icon tile**: absolute at 0,0, 48×48, radius 6px, bg `#DC5868`, white 24×24 outline icon (heroicons-style, stroke 1.5–2). REDRAW simple line icons.
    - **Item title**: ml 64, 18/24, w500, `#111827`, ~10–45 ch.
    - **Item desc** (`dd`): mt 8, ml 64, 16/24, w400, `#6B7280`, ~73–139 ch, 2–3 lines.
- **Image column, screenshot rows**: `img.rounded-xl` with `shadow-xl` and `ring-1 ring-black/5` (box-shadow `0 0 0 1px rgba(0,0,0,.05), 0 20px 25px -5px rgba(0,0,0,.1), 0 8px 10px -6px rgba(0,0,0,.1)`), radius 12px.
  - At lg it is `absolute left-0 h-full w-auto max-w-none`: it fills the row height and **bleeds off the right edge** (clipped by the band's `overflow:hidden`).
  - Measured: 1240×640, 874×616, 1832×616 (very wide crop). PLACEHOLDER: app screenshots at 2856×1474, 2672×1884, 5532×1860.
- **Integrations row**: plain `img.w-full.rounded` (radius 4px), 560×383, `mt-24` offset 96. PLACEHOLDER 1708×1168.

**Tablet (481–1024) and mobile (≤480)**
- Single column. Text container `max-w-xl` (576) centered with px 24 (tablet: x 96–672; mobile: full width minus 24px).
- Image below with `mt-12` (48):
  - wrapper `pl-6` (24) and `-mr-48` (mobile, -192) / `md:-mr-16` (-64), so the screenshot bleeds off the right;
  - image `w-full`, natural aspect (e.g. 768 wide → 417 tall).
- Type sizes are the same as desktop, because the `sm:` classes are inert.

### 2.5 Mock-UI "workflow" card (band 3, row 2; decorative HTML illustration)

- The left column (order-2 on mobile) holds an HTML mock of a task checklist, scaled `transform: scale(.8)` (392×549 visible at 1440).
- Card: bg `#F3F1EC` (Gusto; Deel/Peopletech `bg-white/0`, i.e. transparent), shadow-xl, no radius.
- 3 stacked sections separated by 1px `#E5E7EB` top borders. The first section has bg `#F3F4F6` (Peopletech `#F3F1EC80`) and an 8px left border `#008489`.
- Each section has padding 32 28 32 16:
  - a header row: 27px circle (1px border, filled `#008489` when active) with a 13px icon, plus an 18/28 w700 `#111827` label;
  - 2–3 timeline steps: a vertical 1px line, a 16px dot, and a pill box (1px border, radius 6, px 16 py 8, 14/20 w600).
    - Active pill: filled `#008489`, white text.
    - Next pill: `#008489` outline and text.
    - Others: `#E5E7EB` border, `#6B7280` text.
- A floating 89×27 rounded-full chip straddles the third section's top border: 12/16 `#9CA3AF` text, 13px rose icon.
- On desktop a dotted-grid SVG (404×404, pattern) is `hidden lg:block`. REDRAW as a dot pattern, or omit.
- **REDRAW all of it** as static markup with fictional labels (each label ~2–46 ch).

### 2.6 Band 4 rows: dark screenshot with skewed accent

- Grid 2 cols, gap 64 (`lg:gap-16`); 576px columns.
- Image side: absolute accent `div` (`-inset-y-px -left-3 w-full`, bg `#DC918F` at op .2, 1px inset ring `#F3F1EC`; the `skew-x-[-30deg]` class has no rule, so it is **not skewed**).
- Image on top: `img.w-[57rem]` (912px), `-mb-12`, `rounded-tl-xl` (12px top-left only), bg `#1F2937`, ring `#F3F1EC1A`.
- Sizes 912×506 and 912×587. PLACEHOLDER 2878×1598 and 2648×1704.
- One row instead uses `object-contain` 576×312 (PLACEHOLDER 1801×974).

### 2.7 Band 5: two image cards

- Two columns, each with a title (30/36 w700) and a lead (18/28).
- Under each, an image box 576×456 with `absolute inset-0 object-cover`. PLACEHOLDER 2001×1725 and 1708×1168.
- Then a normal feature row with a 1217×616 bleeding screenshot (PLACEHOLDER 3150×1594).

### 2.8 Band 6: "Everything included" checklist

- Container `max-w-7xl`, py 96 (lg) / 64, px 32 / 16.
- `lg:grid lg:grid-cols-3 lg:gap-x-8`: the heading takes column 1 (384px), the list takes `col-span-2` (800px).
- Heading block:
  - eyebrow `h2`: 16/24, w600, uppercase, ls .4px; colour falls back to `#000` (class missing);
  - title: mt 8, 30/36, w800, `#111827`, ~21 ch;
  - lead: mt 16, 18/28, `#6B7280`, ~50 ch.
- List: 8 items, `space-y-10` (40). The intended `sm:grid-cols-2 sm:grid-rows-4` is inert, so it is **one column** at all widths.
  - Each item: 24px check icon `#55B559` absolute left; title ml 36, 18/24 w500 `#111827` ~15–25 ch; desc mt 8, ml 36, 16/24 `#6B7280` ~62–84 ch.
- On mobile the list sits mt 48 below the heading.

### 2.9 Band 7: pricing (`#pricing`)

- bg `#EFF7F7`, py 96.
- Header (centered):
  - optional partner logo `img.mx-auto`, mb 80. Gusto 125×48 (PNG data URI); Deel 128×45 (`w-32`); Peopletech none. PLACEHOLDER 125×48.
  - eyebrow: 16/24, w700, uppercase, ls 1.6px (`tracking-widest`), `#DA4052`, ~13 ch;
  - title: my 20, 30/36, w800, ls -0.7, `#000`, ~27 ch;
  - lead: `max-w-prose` (65ch ≈ 805px), 20/28, w500, ls -0.5, `#6B7280`, ~151 ch.
- Slider: `.swiper-pricing`, `max-w-7xl`, mt 128, overflow hidden. 3 slides.
  - **≥1260px viewport**: 3 per view, each slide 426.7 wide with the card centered.
  - **Below 1260**: 1 per view (390 → slide 390 wide). Autoplay every 5s, loop false, pagination bullets.
- **Pricing card** (`w-96` = 384px, border 2px, radius 8, `shadow-2xl` = `0 25px 50px -12px rgba(0,0,0,.25)`). Heights differ: 1268 / 1688 / 1248.
  - Card colours (border and header bg): 1 `#20BCC2`, 2 `#008489`, 3 `#DC5868`.
  - **Header** (px 48, pt 32, pb 40, header colour):
    - pill: `rounded-full` px 16 py 4, bg `#F4FBF9` at op .6, 16/24 w600, ~28–31 ch;
    - plan name `h3`: my 16, 30/36 w700 `#F3F1EC`, ~13–15 ch;
    - blurb: 16/24 w600 `#F3F1EC`, ~68 ch, 2 lines.
  - **Price block** (py 40, bg `#F9FAFB`, bottom border 1px `#E5E7EB`):
    - row (flex centered): currency 24/32 w400 `#000`; amount 72/72 w700 `#000` (~3–5 ch); stacked unit (24/32 w600 ~5 ch over 14/20 w600 `#4B5563` ~10–12 ch, ml 8);
    - `hr` 75% width (285px), my 16, `#E5E7EB`;
    - fee line: 18/28 w700 `#000`, ~23 ch.
  - **Body** (pt 24, px 32, pb 48, bg `#F3F4F6`, bottom radius 12):
    - `dl` with groups. Group title 18/28 w700 `#111827`, mb 4.
    - Items: 24px `#55B559` check absolute; text ml 32, 16/24 `#111827`, ~15–97 ch; `space-y-2`, groups `space-y-4`.
    - Cards 2–3 start with a highlighted note: bg `#CAEAEA`, radius 4, px 16 py 8, 16/24 w500 with a bold span, ~52 ch.
  - **Button**: mt 32, full width, flex centered, py 8 px 16, radius 6, 1px border `#DC5868`, bg `#DC5868`, 16/24 w500 `#F3F1EC`, ~11 ch. Hover: bg and border `#DA4052`, Tailwind default 150ms transition.

### 2.10 A′: `/sales-tax-beta/` differences

Band list, in order:
1. Hero: `max-w-4xl`, **no lockup**, h1 ~27 ch (1 line), sub-paragraph w400 ~108 ch. The CTA is `button.request-invite-btn` (~11 ch label).
2. Intro strip: pt 96.
3. One feature block with 3 rows (screenshot 971×728 PLACEHOLDER 1600×1200; integrations 560×383; inbox 874×616).
4. The "Everything included" band without the eyebrow (title ~37 ch over 2 lines, lead ~76 ch).

There is no pricing, no about band and no Swiper. The page height is 4663 at 1440.

**Request-invite modal** (`#modal-container`): fixed inset 0, z 100, `invisible` until opened.
- Overlay `#modal-bg-overlay`: fixed, `bg-gray-700` `#374151`. Opacity .75 when open; on close it goes to .2 then hides.
- Panel `#modal-el`: bg `#F3F1EC`, radius 8, shadow-xl, `w-full sm:max-w-lg`. The sm classes are inert, so the panel aligns to the bottom of the screen with outer padding 16 16 80. The 230px measured width is the closed state.
  - Content:
    - close icon: 28px X, `#787986`, hover `#292A2D`, m 8, top-right;
    - title `h3`: `#285D60`, 24/32, w700, ls -0.6, centered, ~17 ch, 2 lines;
    - two inputs (email, company name; labels are sr-only): block, full width, p 12, 1px `#D1D5DB`, radius 6, bg `#FFFFFF`, 16/24 `#111827`, placeholder ~21 / ~12 ch;
    - submit: full width, inline-flex centered, py 8 px 16, radius 6, bg `#DC5868`, border `#DC5868`, 16/24 w700 `#F3F1EC`, ~6 ch;
    - hidden error, email-error and success states (`#modal-content-success`).
- **Motion** (classes toggled by the inline script):
  - Open: overlay `transition-opacity ease-out duration-300` to op .75. Panel `opacity-100 translate-y-0` from `opacity-0 translate-y-4` (16px), `ease-out duration-300`.
  - Close: `ease-in duration-300` back, then `invisible`. Fields reset after 300ms.
  - Default transition on the elements is `.15s cubic-bezier(.4,0,.2,1)`.
- Behaviour: consumer domains (gmail/yahoo) are rejected client-side. The form posts to an API. The clone should stub the submit.

### 2.11 Band 8: `#about` (logos + testimonial slider)

- `py-32` (128). Title: 48/48, w800, ls -1.2, `#292A2D`, ~36 ch, centered.
- **Logo row**: `max-w-5xl` (1024), my 64, flex wrap centered, gap-y 48. Two inner flex groups with gap-x 32.
  - Logos are `img` with m 16, at widths 80, 80, 150, 128, 192 px (heights 31–43).
  - Several logos are `hidden sm:inline-flex` / `xl:inline-flex` and never show. One shows only at lg.
  - PLACEHOLDER customer logos: 5 visible at 1440 (native 216×84, 300×104, 150×30, 120×40, 300×45).
- **Testimonial Swiper** (`.swiper`, `max-w-7xl` px 32): `autoplay {delay: 5000}`, `slidesPerView 1`, `loop: true`, `pagination clickable`. Default Swiper speed 300ms, `ease`.
  - Wrapper `py-12` (48) on Gusto only. Deel/Peopletech have no wrapper padding.
  - Slide: 1216 wide, centered.
    - avatar `img` 96×96, `rounded-full` (PLACEHOLDER 316/400 square);
    - quote `p`: 18/28, w400, `#787986`, `max-w` ≈ 896, ~220–291 ch, 3 lines;
    - company logo `img` h 32 (PLACEHOLDER ~80–175×32);
    - attribution row: name 16/24 w500 `#292A2D` (~10–13 ch), a 20px divider glyph (`hidden md:block`, a slash; REDRAW), role 16/24 w500 (~16–37 ch).
  - Pagination: Swiper defaults. Bullets 8×8, m 0 4px; inactive `#000` op .2; **active `#007AFF`** (Swiper default blue, not themed). Positioned bottom 10px.

### 2.12 Variant table (A1/A2/A3)

| | Gusto (A1) | Deel (A2) | Peopletech (A3) |
|---|---|---|---|
| Hero container | `max-w-3xl` 768 | `max-w-4xl` 896 | `max-w-4xl` 896 |
| Lockup structure | inline-flex: Mosey logo `w-24` (96×23.5; white wordmark) + separator glyph (30/36, w300, ~2 ch, mx 16) + partner logo `w-20` (80×31) | 3-col grid (`grid-flow-col`, cols 96 / 52 / 96): Mosey logo + separator (36/40, w800, ~1 ch) + partner logo `w-24`, `-mt-4` | inline block: Mosey logo + separator (72/72, w800) + partner logo `w-24` |
| Lockup placeholder | `PLACEHOLDER 96×24` (Mosey wordmark, own brand) + `PLACEHOLDER 80×31` (partner) | `PLACEHOLDER 96×24` + `PLACEHOLDER 96×34` | `PLACEHOLDER 96×24` + `PLACEHOLDER 96×30` |
| Mock-UI card bg | `#F3F1EC`; first section `#F3F4F6` | transparent; first section `#F3F4F6` | transparent; first section `#F3F1EC80` |
| Pricing header logo | 125×48 | 128×45 | none |
| Testimonial wrapper | py 48 | none | none |
| Signup code in CTA hrefs | partner-specific query param (4 links) | ← | ← |

- Copy lengths are within ±10 ch per element across A1–A3.
- Page heights: 13184 / 13078 / 13064.

---

## 3. Template B: Static partner page (`/remote/` and 5 identical clones)

Built on the u system. The entry module imports these, in order:
- `hero-static`
- `features`
- `getStarted`
- `testimonials`
- `pricing`
- `ctaSection`

| # | Section | id / class | bg | Height (u) 1440 / 768 / 390 |
|---|---|---|---|---|
| 1 | HeroStatic | `section#hero-static` | `#F3F1EC` | 740 / 660 / 459 |
| 2 | FeatureList | `section#features-section` | `#FCFBFA` | 2166 / 1385 / 1556 |
| 3 | GetStarted | `section#solutions-get-started` | `#FCFBFA` | 1760 / 813 / 683 |
| 4 | Testimonials | `#homepage-testimonials` (§H 11) | `#FCFBFA` | 774 |
| 5 | Pricing | `#homepage-pricing` (§H 12) | `#F3F1EC` | 1782 |
| 6 | Bottom CTA | `.cta-section` (§H 14) | `#285D60` | 644 |

Doc height 8389px @1440, 6062 @768, 7344 @390.

### 3.1 HeroStatic

- `.section-container` padding-top: 120u desktop, 111u tablet, 80u mobile. No bottom padding; the image block ends the section.
- `.title-wrap`: centered flex column. Width 636u desktop, 313u tablet, 272u mobile.
  1. **Eyebrow** (`.sub-title span`): p2 token, `#203435` at 40% (`main_green/40`), ~9 ch (partner name). Box 25u tall desktop, 24u tablet, 20u mobile.
  2. **h1**: h3 token (38/45.6 desktop, 28/33.6 tablet, 24/26 mobile), `#203435`, centered.
     - Last word(s) wrapped in `span.text-green` (`#285D60`, ~7 ch), preceded by a `<br>` on tablet/mobile (and on stripe-atlas everywhere).
     - ~38–56 ch, 2 lines desktop (517u wide), 3 lines tablet/mobile.
     - mt 16u (md+) / 8u (mobile).
  3. **Description**: p2, `main_green/40`, centered, ~89–115 ch, 2 lines desktop. Width 424u desktop / 272u tablet and mobile. mt 16u / 12u.
  4. (C1 only) **Button row**: §4.1.
- **Image block**: Lottie `/lottie/Solutions_hero.json` (viewBox 977×424, SVG renderer, loops).
  - Desktop 977×424u (`.bodymovin-wrap`, centered, directly under the title-wrap).
  - Tablet 768×335u full-bleed (`.bodymovin-wrap-mobile`; same JSON).
  - Mobile 465×203u with `mr -145u`, so it is shifted left (x = -73u) and overflows both edges.
  - **PLACEHOLDER 977×424**: illustrated product collage.
- **Edge line art** (desktop only, `hidden lg:flex`): two inline SVGs, 423×170u (viewBox 422×170, 5 paths), absolute at the section's bottom-left and bottom-right (the right one is mirrored `scaleX(-1)`). REDRAW as simple thin curved strokes in `#516B66`, as in the homepage hero line art.
- **Motion**: none beyond the Lottie. JS sets up the lottie with `autoplay:false, loop:true` and plays it on section activate (default trigger `top bottom-=25%`, so it is effectively on load). There is no text reveal.

### 3.2 FeatureList (3 items)

- `.small-container`: 1020u desktop (x 210), 688u tablet (x 40), 272u mobile (x 24).
- `ul.features-list` with `md:divide-y`: 1px `#285D60` at 20% between items on tablet/desktop. No dividers on mobile.
- **Item padding**:
  - desktop 80u top and bottom;
  - tablet 60u top and bottom;
  - mobile 0 top, 60u bottom;
  - the last item has no bottom padding.
- **Text block**:
  - Desktop/tablet: flex row, `space-between`. pb 85u desktop, 42u tablet.
  - Mobile: column, pb 24u.
  - **Title**: h5 token (24/31.2 desktop, 17/22.1 tablet/mobile), `#203435`, 2 lines. The first word(s) are in `span.text-green` (~6–11 ch); total ~9–15 ch. Mobile mb 24u.
  - **Desc**: p2, `main_green/70`. Width 424u desktop, 332u tablet, 100% mobile. ~96–122 ch, 2 lines desktop.
- **List block**:
  - Desktop/tablet: flex row, `space-between`, image right.
  - Mobile: column, list then image.
  - **List**: items `flex items-center pb-24u`. Each has a 17×17u check icon (inline SVG viewBox 17×17, `#285D60`; REDRAW simple tick in a circle) and an h6-token label in `#285D60`, ml 12u, ~4–28 ch. 3–5 items. Row pitch 52.8u desktop, 44.8u tablet/mobile.
  - **Image**: `object-cover`. Sizes 702×455u desktop, 421×273u tablet, 272×178u mobile. Radius 12u desktop; 7px measured at 768 and 390. Lazy, with `.4s` opacity fade-in. **PLACEHOLDER** product screenshot, 1404×910.
- **Motion** (per item; GSAP + ScrollTrigger, `start: "top+=25% bottom"`, `once: true`):
  - Initial state: text-block `autoAlpha 0, y 50·rem`; list `li` `y 10·rem, autoAlpha 0`; image `scale .98, autoAlpha 0`.
  - Timeline:
    1. text-block → `y 0, autoAlpha 1`, 30f (.5s), Eas17;
    2. `li`s → `y 0, autoAlpha 1`, 35f (.583s), **stagger 5f (.083s)**, Eas17, starting at 5f;
    3. image → `scale 1, autoAlpha 1`, 20f (.333s), Eas1739, starting at 8f.
  - `rem` = 1u on desktop/tablet; viewport/375 on mobile (§H 0.1).

### 3.3 GetStarted (a "Peace-of-mind" clone with static images)

- Container padding:
  - desktop 260u top, 340u bottom, 170u sides;
  - tablet 160u top and bottom;
  - mobile 110u top, 155u bottom.
- **Title row**: §H 0.7 pattern.
  - Title: `h3.animation-title`, ~4 ch black plus ~11 ch green span; 1 line desktop.
  - Desc: p2 /70 inside an `.opacity-80` wrapper, ~72 ch.
  - mb 110u desktop, 94u tablet, 40u mobile. Tablet px 40u; mobile px 25u.
- **Desktop**: identical geometry to §H 10. Flex `space-between` across 1100u.
  - Left column 482u wide, gap 340u, **3 steps**. Each step:
    - flex row, gap 123u;
    - number in `#285D60` h5 (~2 ch);
    - content column, gap 20u, width 333u: h5 `#203435` (~7–22 ch) and p2 /70 (~60–100 ch).
  - Right: `.peace-image-container` (424u, pinned), holding `.peace-image-wrapper` 424×264u, radius 12u, overflow hidden.
  - **3 stacked `img.peace-image`** (absolute inset 0; images 2–3 start at op 0, scale .95). **PLACEHOLDER** 3 illustrations 848×528 (assets `getStarted1..3.png`).
- **Desktop motion**: the same scrubbed timeline as §H 10:
  - settings: `trigger .peace-image-wrapper, start "center center", endTrigger last .peace-step, end "bottom center", pin .peace-image-container, pinSpacing false, scrub true`;
  - steps 2–3 start at opacity .5;
  - per step: step → op 1 (15); image i in (`0→1`, `scale .95→1`, 30); hold 40; image out (`→0`, `scale 1.05`, 30, at 70) except the last.
  - Title/desc reveal: `y 100u → 0, autoAlpha`, .567s Eas17; desc at +.06s.
- **Tablet/mobile**: Splide (`arrows:false, autoWidth, perPage 1, pagination true`).
  - Tablet: track padding 172u, gap 67u; slide 424u (image 424×264u, radius 12u, mb 24u). h2 at h5 token 17/22.1; p2 12/19.2; text gap 12u.
  - Mobile: track padding 24.5u, gap 16u; slide 273u (image 273×170u, radius 12u); text gap 16u.
  - Dots (§H 0.7): 6u, gap 7u, 18u below the slides.
  - Reveal: `y 40·rem`, desc at +.066s.
  - Unlike homepage Peace, slides carry **images, not Lotties**.

### 3.4 Sections 4–6

These reuse the homepage components unchanged:
- Testimonials (§H 11);
- Pricing (§H 12; same 3 plan cards, same pinned behaviour);
- Bottom CTA (§H 14).

---

## 4. Template C: Stripe partner page (`/stripe-atlas/` C1, `/stripe-startups/` C2)

**Entry module imports.**
- C1: `hero-static`, `featureGroup`, `getStarted`, `faqSection`, `genericCta`, `pricing`, `ctaSection`.
- C2: the same, plus `trustedBy`, the HubSpot embed, and an inline `hbspt.forms.create`.

| # | Section | C1 h @1440 (u) | C2 |
|---|---|---|---|
| 1 | HeroStatic + button row | 776 | 801 (no `<br>` difference; eyebrow empty in C1) |
| – | IntroRow (§4.1) | 290 | – |
| – | Trusted strip (§4.5) | – | 398 |
| – | HubSpot form section (§4.6) | – | 968 |
| 2 | FeatureGroup (§4.2) | 2813 | 2813 |
| 3 | GetStarted (§3.3) | 1760 | 1760 |
| 4 | FAQ (§H 13) | 658 | 658 |
| 5 | Generic CTA wrapper (§4.4) | 671 | 671 |
| 6 | Pricing (§H 12) | 1782 | 1782 |
| 7 | Bottom CTA (§H 14) | 644 | 644 |

Doc height: C1 9916 / C2 11017 px at 1440.

### 4.1 HeroStatic differences and IntroRow (C1)

**HeroStatic differences**
- The eyebrow span is **empty** (0×0); the title-wrap then starts with the h1 at 136u.
- The h1 has a forced `<br>` before the green span. ~44 ch.
- The description is ~91 ch.
- **Button row**: `.btn-wrap`, flex centered, gap 6u, mt 24u.
  - One `a.btn.btn-red` (~11 ch, sign-up). Same token as §2.2: 110×36.4u at 1440; bg `#C74E5C`; radius 8u; `transition .4s`.
  - No visible hover, because the `.btn-red:hover` CSS is broken.

**IntroRow** (C1, between the hero and FeatureGroup)
- `section.bg-main_white`, padding-top 111u.
- `.medium-container` (1100 / 684 / 272u).
- `.title-wrap`: md+ flex row `space-between`, gap 24u; lg pb 83u. Mobile: column, gap 24u.
  - h1 at the h3 token: ~32 ch with a ~10 ch green span; 2 lines; width 677u desktop / 406u tablet.
  - p2 /70: ~223 ch, 4 lines. Width 399u desktop (`lg:w-424` minus gap), 254u tablet, full on mobile.
- No motion module drives it (class `visible` is static).

### 4.2 FeatureGroup (pinned accordion story)

**Desktop (1440)**
- `.base-container`: 1232u wide (x 104), padding 60u top, 160u bottom.
- One `li.list-item` (the list supports several; gap 44u).
- **`.list-item-wrap`** (the pinned element): padding 73u 66u, radius 12u, bg `#CFD7D4` at 50% (`bg-green5/50`). 1232×593u.
- `.content-wrap`: flex `space-between`, 1100u.
  - **`.img-wrap`**: 530×447u, radius 8u, overflow hidden. 3 stacked `.img-item` (absolute, full), each an `img.object-cover`; items 2–3 start at op 0. **PLACEHOLDER** 3 product screenshots (1061×895, 1061×894, 1404×910).
  - **`.desc-list`**: 464u wide, flex column `space-between`, full height.
    - Top: `.title-wrap-desktop`, gap 16u: h5 `#203435` (~31 ch, 1 line) and p2 /70 (~98 ch, 2 lines).
    - Bottom: a 384u-wide `.accordion.platform` with 3 items.
- **Accordion button**: mt 20u; title in the h6 token.
  - Inactive: `main_green/40` (`#20343566`), pb 20u.
  - Active: `#285D60`, pb 12u.
  - No chevron in this variant.
  - Content: p2 /70 (~100–113 ch), inner pb 20u. Same open/close CSS as §H 0.7 (`.5s cubic-bezier(.17,.17,.43,1)`, `translateY(-20px)` → 0, opacity).
  - Button `transition: all .5s ease` (the colour change).
  - `numberOfVisibleItems: 1`: one open at a time; the first is open.
- **`.spacing`** (desktop only): an empty div after the wrap with `padding-bottom: 2000u`. It provides the scroll distance.

**Desktop motion**
- `ScrollTrigger({trigger: .list-item-wrap, start: "center-=5% center", endTrigger: .spacing, end: "bottom bottom", pin: true, pinSpacing: false, scrub: true})`.
- `onUpdate`: `index = round(progress × (count−1))`. When the index changes, open accordion item `index` and swap the image:
  1. all `.img-item` → `autoAlpha 0`, 20f (.333s), Eas66;
  2. then `img[index]` → `autoAlpha 1`, 20f, Eas17 (sequential, awaited).
- Clicking an accordion item does the same swap.
- Section reveal (activation, default trigger, once): `.title-wrap-mobile` and `.content-wrap` from `y 50·rem, autoAlpha 0` → `y 0, autoAlpha 1`, 20f, Eas17; content at +5f.

**Tablet (768)**
- Container px 40u, padding 120u top, 115u bottom. No bg card.
- `.title-wrap-mobile`: `flex-row-reverse`, `space-between`, gap 16u. Title (h5 17/22.1) is on the **right**, 235u wide. Desc p2 is on the left, 332u.
- `.content-wrap`: mt 40u, flex row. Image 332×280u, radius 8u. Accordion 248u wide, titles 13/20.8.
- No pin and no spacing. Accordion is click-only.

**Mobile (390)**
- Padding 60u top, 100u bottom.
- Stacked: title, gap 16u, desc; then image 272×229u (radius 8u, mt 24u); then accordion (mt 24u, titles 237u wide).
- A 2px `#285D60`/20 divider (`mt 40u`, `lg:hidden`) closes each item.

### 4.3 GetStarted

Same as §3.3.

### 4.4 Generic CTA wrapper

- `div.bg-main_white.flex.flex-col.items-center.relative.z-10`, padding 150u top and bottom on md+, none on mobile.
- Holds `#generic-cta-N.generic-cta`: width 1020u desktop, 510u tablet, 272u mobile.
- Content is the homepage **Compliance CTA card** exactly (§H 7):
  - bg `#285D60`, radius 12u, padding 73 67 40 79u;
  - h4 white (~46–55 ch, 2 lines);
  - p2 white/70 (~38–102 ch);
  - Lottie `/lottie/cta.json` 454×258u (PLACEHOLDER 908×516);
  - bg image `bg-desktop.png` 644×324u at left 376u, top 31u (PLACEHOLDER).
- **There is no button in the card.**
- Motion (`genericCta` module):
  - own trigger `start "top bottom-=10%", end "bottom top-=10%"`;
  - on first activate: `y 100 → 0` (px value, unscaled), 32f (.533s), Eas17;
  - the Lottie plays while in view.

### 4.5 C2 Trusted strip (`section#homepage-trusted` variant)

- Padding 110u top and bottom (homepage uses 80u top and larger bottoms).
- Title: h3 token, ~10 ch.
- Marquee wrapper: mt 110u, 1110u wide.
- **Both ticker rows render empty**: `.ticker-items` are 10×0 with no logos. The strip shows only the title plus about 22u of empty space and the edge-fade gradients.
- Clone it faithfully as the §H 4 component with zero logos, or (recommended) feed it 6+6 `PLACEHOLDER 234×112` logos. Flag this to the owner, since the original is visibly broken.

### 4.6 C2 HubSpot form section (new component)

- `section.bg-main_white.section-container`.
- Inner `.medium-container.grid.grid-cols-2.gap-12`. **Two columns at every width**: `gap-12` = 48px fixed, so the columns are 526u at 1440, 318u at 768, and 142u at 390. On mobile this is cramped and the original does not stack. Reproduce it, or stack on mobile as an intentional fix (note this in code).
- Padding 160u top and bottom (desktop), 115u (tablet), 60u top / 100u bottom (mobile).
- **Left column**:
  - h3 token `.animation-title`: ~42 ch, 2 lines desktop, 5 lines mobile.
  - Check list `ul.list`: py 32px, mr 52u (desktop) / 25u (tablet). 6 items `flex items-start pb-20u`. Each item is a 17u check (pt 8px) plus an h6-token `#285D60` label, ml 12u, ~36–96 ch, 1–2 lines.
- **Right column** (`lg:max-w-[45vw]`, pt 12px): HubSpot embedded form `#hubspot-form`, rendered by `js.hsforms.net/forms/embed/v2.js` with `css:""` (unstyled; the site CSS styles it).
  - 5 visible fields: first name, last name, email, company, employee count (number). Hidden UTM fields.
  - Field: mb 24px.
  - Label: p1 token (17/23.8u desktop, 12/16.8 tablet/mobile), w500, `#285D60`. The required asterisk is `#C74E5C`.
  - Label mb 8px.
  - Input `.hs-input`: block, full width, padding 16px fixed, radius 8px (`.5rem`), 1px `#D1D5DB`, bg `#F9FAFB`, text `#111827` at the p1 token. 57.8u tall at 1440.
  - Focus: border and ring `#DC5868`.
  - Submit `.hs-button`: same as `.btn-red` (u paddings 6/16, radius 8u, `#C74E5C`/`#F3F1EC`, button-large token), margin-top 2rem (32px). Label ~30 ch, 230×36u.
  - Errors: `.hs-error-msg` 14/20px `#C74E5C`.
  - The clone should render a static look-alike form with a stubbed submit. Do not load HubSpot.
- Motion: none of its own (no section module targets it).

---

## 5. Template D: `/texas-reinstatement/`

Entry imports: `hero-static`, `benefits`, `features`, `genericCta`, `peace`. There is no pricing, testimonials or bottom CTA; the footer follows Peace directly. Doc height 5774 @1440.

| # | Section | h @1440 (u) |
|---|---|---|
| 1 | HeroStatic (eyebrow ~9 ch, h1 ~32 ch on **1 line**, no green span, desc ~77 ch) | 695 |
| 2 | Benefits cards (variant, §5.2) | 812 |
| 3 | FeatureList, **1 item** (variant, §5.3) | 748 |
| 4 | Generic CTA wrapper (§4.4; title ~46 ch, desc ~102 ch / 3 lines) | 671 |
| 5 | Peace of mind (§H 10, identical: 4 steps, 4 Lotties `/lottie/peace/Piece_of_mind_0N/…json`) | 2326 |

### 5.1 HeroStatic

As §3.1.

### 5.2 Benefits variant (`section#homepage-benefits`)

Differences from §H 8:
- Container padding is **110u top and bottom at all widths** (`py-1110`), not 260/160.
- Title (~18 ch, ~14 ch green, 1 line) and desc (~91 ch).
- **Card icons are `<img>` PNGs**, not inline SVG. Box 236×143u desktop; the images render at 236×120–143. **PLACEHOLDER** 3 small UI pictograms.
  - Image `opacity .4`, and **`group-hover:opacity-100`** with Tailwind `transition` 300ms `cubic-bezier(.4,0,.2,1)`. Note: the transition property list excludes opacity, so the change is effectively instant.
  - The card bg hover is as on the homepage (.4 → 1, 375ms).
- Card 332×439.6u desktop (values are 2–3 lines: h2 token, ~15–25 ch). Tablet 215×333u, padding 35 24 24u, icon 163×99u. Mobile is a Splide slider (as homepage), icon 172×104u.
- Text gap 12u on all cards.
- Motion: identical to §H 8.

### 5.3 FeatureList variant (1 item)

- Same shell as §3.2. Title ~21 ch with no green span; desc ~117 ch.
- The list alternates **title rows** (check + h6 green, `li.flex.items-center` pb 20u) and **description rows** (`span.desc-1` p2 /70, ~107–121 ch, 3 lines, `li` pb 24u, no icon).
- 3 pairs; list column 293u wide, mr 25u.
- Image 702×455u (PLACEHOLDER screenshot 1404×910).

### 5.4 Generic CTA and Peace

As referenced in the table.

---

## 6. Template E: `/agency-mail/` (checkout form, legacy px)

- `main > div.flex.flex-col`. Inner `pt-24 pb-44` (96 / 176px), overflow hidden. 884px tall at 1440, 1032 at 390.
- Container: `max-w-xl` (576), px 32 at lg / 16 below (`sm:max-w-3xl` is inert), centered.
- The column is centered:
  1. **Badge**: mt 48, mb 32. A 64×40 pill (`rounded-full`), bg `#DC5868`. Inner 64×40 left-rounded box with text 12/16, w700, `#F3F1EC`, ~4 ch.
  2. **h1**: `span.block`, 48/48, w800, ls -1.2, `#000`, centered, ~40 ch. 2 lines at 1440 (512px measure), 3 lines at 390. (`sm:text-6xl` is inert.)
  3. **Price/info panel** (new component): mt 24. Flex row, p 16, bg `#CFD7D4` at 50%, 1px `#E5E7EB` border, radius 8 (`first:rounded-t-lg last:rounded-b-lg`; it is a single item, so all corners are rounded).
     - Left cell: `w-40` (160), border-right 1px `#E5E7EB`, pr 16, centered. Holds a big figure: 36/40, w700, `#292A2D`, ~2 ch, inside a p 8 box.
     - Right cell: pl 16, 14/20, w400, `#000`, ~179 ch, 4 lines at 1440, 9 lines at 390.
  4. **Form**: mt 24, `space-y-4` (16), full width (512 at 1440, 358 at 390).
     - Hidden error banner: `rounded border px-4 py-2 text-sm bg-red-100`.
     - 2 inputs (company name, email; placeholders ~12/13 ch): full width, p 16, 20/28, `#111827`, bg `#F9FAFB`, 1px `#D1D5DB`, radius 8, 62px tall.
     - Submit `button.btn`: full width, px 20, py 16, radius 6, 1px `#DC5868`, bg `#DC5868` (rose-700), 20/28, w600, `#F3F1EC`, ~18 ch, shadow-sm, `transition .4s`.
- Behaviour: posts JSON to an API, then sets `window.top.location` to a returned checkout URL. The clone should stub this.
- No motion.

---

## 7. Template F: Inner-post (prose) page: `/status/`, `/gdpr-subprocessors/`

- `section#inner-post.inner-post`. The JS module only arms a newsletter-modal trigger: when 75% of the article is scrolled **and** 15s have passed, it calls `window.openNewsletterModal()`. That function does not exist on these pages, so nothing happens. No reveal animation.
- Inner div: bg `#F3F1EC`. Padding-top 174u desktop, 179u tablet, 120u mobile. Padding-bottom 110u.
- **Title wrap**: centered, width 1020u desktop, 464u tablet, 272u mobile. h1 at the h3 token (38/45.6, 28/33.6, 24/26), `#203435`, ~13–18 ch, 1 line.
- **`.article-wrapper`**: `margin: 0 auto`. Width **596u** desktop, **522u** tablet, **272u** mobile. The first child sits 24u below the title (via the p margin).

**Prose and table typography** (all `calc(var(--u)*N)`; these are CSS rules from the shipped stylesheet, which covers elements these two pages don't use, for reuse):

| Element | Mobile | Tablet | Desktop | Other |
|---|---|---|---|---|
| p | 13/20.8, ls -.01em, w450 | 14/22.4 | 17/27.2 | mt 24u; colour `#203435B3` |
| h2 | 17/22.1, ls -.68u, w500 | same | 24/31.2, ls -.96u | mt 40u; `#203435` |
| h3 | 13/20.8, ls -.26u, w500 | same | 18/28.8, ls -.36u | mt 24u; `#203435` |
| ul / ol | like p | 14/22.4 | 17/27.2 | flex column, gap 12u. ol: decimal, pl 40u. ul: no bullets if 1 item; disc, outside, pl 40u if ≥2 items |
| a | inherit size | | | `#285D60`, underline; visited `#285D60CC`; hover `#285D6099`; `transition all .2s cubic-bezier(.4,0,.2,1)` |
| strong | | | | w500, `#203435` |
| em / i | 12/19.2, ls -.12u | 12/19.2, ls -.24u | 15/24 | italic, `#203435B3` |
| blockquote | 18/28.8 | 20/32 | 22/35.2 | italic, ls -.24u, `#203435B3`, width 100% |
| hr | | | | mt 24u, 1px `#285D6033` |
| img / `.img-with-mask` | h 124u, mt 40u | h 320u, mt 70u | h 463u | cover, radius 8u (PLACEHOLDER) |
| **table** | | | | width 100%, mt 24u, centered, 1px `#285D6033` border, radius 8u. Radius does **not** clip, because Tailwind preflight collapses borders. |
| thead | | | | bg `#203435` |
| th | 13/20.8, ls -.26u, w500 | same | same | `#F3F1EC`, centered, padding 10u 15u, 1px `#F3F1EC` borders |
| td | 12/19.2, ls -.12u, w450 | same | same | `#203435B3`, padding 5u, 1px `#285D6033` borders, left aligned |

- `/gdpr-subprocessors/`: 1 intro paragraph (~49 ch), then a 2-column table (header cells ~6–8 ch). There are 10 body rows: col 1 ~5–19 ch, col 2 ~7–33 ch.
  - Column widths are auto-sized: 235/360u at 1440, 109/162u at 390.
  - Rows are 30.2u tall (1 line). At 390 some rows wrap to 2 lines (49u).
  - Page height 1272px @1440.
- `/status/`: 3 paragraphs (~52–58 ch, 1 line at 1440). Paragraphs 2 and 3 each end with a mailto link (~17–18 ch). Page height 1006px.

---

## 8. Template G: legal routes (`/privacy-policy/`, `/terms-of-service/`, `/data-processing-agreement/`)

- Each route serves a near-empty HTML shell: global head, header markup, an empty `main` with no sections, and no footer in the rendered tree. An inline script runs immediately: `window.location.href = "/legal/privacy_policy.pdf"` (and likewise `terms_of_service.pdf` and `data_processing_agreement.pdf`).
- The PDF is served same-origin as `application/pdf` (privacy policy 110,741 bytes). The visitor sees the browser's PDF viewer.
- **There is no HTML prose layout or typography to measure on these three routes.** I did not open or record the PDF contents (legal text is out of scope).
- **Clone recommendation**: route each to a placeholder PDF (or redirect to a static file) the same way. If an HTML version is preferred, reuse Template F (§7) with lorem placeholder prose.

---

## 9. Skipped and broken routes (do not build as pages)

- **`/sequoia-one/`**: an inline `location.href="/"` script; it renders the homepage. Implement as a client redirect to `/` if you implement it at all.
- **`/home/` and `/404/`**: identical HTML. An abandoned legacy blog-post shell, measured at 1440:
  - `div.bg-sage-50` (`#FBFCFC`), `min-h-screen`, pb 96;
  - an old inline nav bar (72px tall: logo 80×19.5 plus 5 text links at 16/24 w500 `#292A2D`, hover `#CAEAEA`, mr 48), hidden underneath the global fixed header;
  - an empty `.blog-wrapper` (768px, 0 height: empty h1 and article);
  - **two footers**: one nested inside main, one global.
  - It is not a duplicate of `/` and not a real 404 design. If the clone needs a 404, design it from Template F's shell (title + one paragraph) rather than copying this.
- **`/posts/`**: real HTTP 404. This is Netlify's built-in page (system-ui; white card 364px max, padding 24, 1px `#E9EBED`, radius 8, soft shadow; link `#02807D`), not site code. Do not clone it.

---

## 10. Assets (all PLACEHOLDER or REDRAW; no partner marks)

| Asset | Where | Native | Render size | Action |
|---|---|---|---|---|
| Mosey white wordmark in lockups (SVG data URI) | A hero | 300×73 | 96×23.5 px (79×19 @390) | PLACEHOLDER 96×24 (clone's own fictional brand mark) |
| Partner logo in lockup | A hero | 125×48 (A1), ~68×24 svg (A2), PNG (A3) | 80×31 / 96×34 / 96×30 px | PLACEHOLDER (see §2.12) |
| Partner logo above pricing | A1/A2 | 125×48 / 68×24 | 125×48 / 128×45 px | PLACEHOLDER 125×48 |
| App screenshots: payroll, inbox, notices, calendar, alerts, upcoming legislation, login, integrations, team, assign, sales-tax form | A, A′ | 1600–5532 wide, PNG/JPEG, 80–730 KB | see §2.4–2.7 | PLACEHOLDER (fictional UI screenshots) |
| Customer logos (about row) | A | 216×84, 300×104, 150×30, 120×40, 300×45 | h 31–43 px | PLACEHOLDER ×5 |
| Testimonial headshots | A | 316², 400², 400² JPEG | 96×96 px circle | PLACEHOLDER ×3 |
| Testimonial company logos | A | ≤300×104 | h 32 px | PLACEHOLDER ×3 |
| 24px outline icons (feature tiles), check icons, X close, chip icons | A | inline SVG 24×24 | 24 / 13 px | REDRAW (simple line icons) |
| `/lottie/Solutions_hero.json` | B, C, D hero | viewBox 977×424, ~45 KB | 977×424u / 768×335u / 465×203u | PLACEHOLDER illustration (static image or simple Lottie) |
| Hero edge line art ×2 | B, C, D (desktop) | inline SVG 422×170 | 423×170u | REDRAW thin curves `#516B66` |
| Feature images `platform/streamline.png`, `reduce.png`, `consolidate.png`, `solutions/reinstatement-screenshot.png` | B, D | 1404×910 | 702×455u | PLACEHOLDER |
| 17u check icon | B, C, D lists | SVG 17×17 | 17u | REDRAW |
| `solutions/getStarted/getStarted1..3.png` | B, C | 848×528 (6–9 KB) | 424×264u | PLACEHOLDER ×3 |
| `platform/mail3.png`, `mail2.png`, `streamline.png` | C FeatureGroup | 1061×895, 1061×894, 1404×910 | 530×447u | PLACEHOLDER ×3 |
| `/lottie/cta.json` + `home/bg-desktop.png` / `bg-tablet.png` | C, D generic CTA | 908×516; 644×371; 510×402 | §4.4 | PLACEHOLDER (as homepage §H 7) |
| Benefit card PNGs (`handbook-setup-process`, `reinstatement-benefits-plan`, `handbook-automated-updates`) | D | ~472×240–286 | 236×120–143u | PLACEHOLDER ×3 |
| Peace lotties ×4 | D | as homepage | as §H 10 | as homepage |
| Testimonials, pricing, footer CTA assets | B, C | as homepage | | as homepage manifest |

**Fonts**
- Only the Circular files from §H 0.3 load (`/assets/circular-*.woff2`, `CircularStd-Book-*.woff2`, `CircularStd-Medium-*.woff2`). Use the same Figtree replacement.
- Template A uses weights 300/600/700/800 that the original only fakes (§2).

**Third-party**
- Swiper 8 CSS/JS from unpkg (A only); the clone can use the `swiper` npm package or a tiny custom slider.
- HubSpot forms embed (C2) and the HubSpot tracking script: do not load either in the clone.

There are no `<video>` or `<canvas>` elements on any of these pages.

---

## 11. Motion summary (new versus homepage)

| Where | Trigger | What | Timing |
|---|---|---|---|
| HeroStatic | section activate (≈ load) | Lottie loop plays; no text reveal | – |
| FeatureList item | `top+=25% bottom`, once | text-block `y 50u→0, autoAlpha` → list `li` `y 10u→0` stagger → image `scale .98→1, autoAlpha` | 30f Eas17; 35f stagger 5f Eas17 @5f; 20f Eas1739 @8f |
| GetStarted (desktop) | pin `center center` → last step `bottom center`, scrub | homepage-Peace timeline with 3 images | §H 10 |
| GetStarted (≤1024) | Splide | swipe, dots | – |
| FeatureGroup (desktop) | pin `.list-item-wrap` from `center-=5% center` across a 2000u spacer, scrub, pinSpacing false | progress → accordion index; image cross-fade (out Eas66 20f, then in Eas17 20f) | §4.2 |
| FeatureGroup reveal | default activation | title / content `y 50u→0, autoAlpha` | 20f Eas17, +5f |
| Accordion (FAQ and FeatureGroup) | click | §H 0.7 accordion CSS | .5s cubic-bezier(.17,.17,.43,1) |
| Generic CTA | `top bottom-=10%`, once | `y 100px→0` | 32f Eas17; Lottie plays in view |
| Benefits / Peace / Testimonials / Pricing / Bottom CTA / Trusted | homepage | unchanged | §H 4, 8, 10–12, 14 |
| Legacy pricing Swiper (A) | load | autoplay 5s; 3-up at ≥1260px, else 1-up; no loop | Swiper default 300ms |
| Legacy testimonial Swiper (A) | load | autoplay 5s, loop, 1-up, clickable bullets (active `#007AFF`) | 300ms |
| Legacy pricing button hover (A) | hover | bg/border `#DC5868` → `#DA4052` | 150ms Tailwind default |
| Lazy images (B/C/D) | load | `.lazy` → `.lazyLoaded` opacity fade | .4s ease |
| Sales-tax modal (A′) | click | overlay opacity → .75; panel `translateY(16px)→0`, op 0→1 | 300ms ease-out in / ease-in out |

No CSS `@keyframes`, IntersectionObserver reveals or smooth-scroll libraries on these templates. GSAP/ScrollTrigger/Splide/lottie-web are used exactly as on the homepage (§H 16).

---

## 12. Caveats and things not measured

- Template A tablet/mobile heights for the `#about` band were not separately recorded. The layout is the same single column; the slide is 358 wide at 390, quote ~10 lines.
- The FeatureGroup pinned state was measured at scroll 0 (with the pin-spacer in place). The image cross-fade and accordion index logic come from the shipped JS, not from frame captures.
- HubSpot form markup is injected by HubSpot at runtime. I measured its computed styles, but its internal DOM can change upstream.
- The legal PDFs were not opened, by policy.
- I took no screenshots. Every value comes from computed styles, the shipped CSS or the shipped JS.
