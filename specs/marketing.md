Source: https://mosey.com/

# Mosey marketing pages: clone build spec

Pages covered: `/platform/`, `/platform/payroll-compliance/`, `/platform/handbooks/`, `/platform/entity-compliance/`, `/platform/tax-compliance/`, `/solutions/`, `/solutions/for-hr/`, `/solutions/smb/`, `/solutions/for-telehealth/`, `/pricing/`, `/about/`, `/security/`.

**Method.** I measured every page live on 2026-10-19 at 1440, 768 and 390 wide using `getComputedStyle` and `getBoundingClientRect`. Each page was loaded in a same-origin iframe at that exact width, scrolled top to bottom so every reveal fired, then returned to the top. I also read the static Hugo HTML for responsive class lists and the shipped Vite modules (`/assets/*.js`) for motion.

**Redirects.** None of the 12 URLs redirects; all return 200 on mosey.com.

**1280.** I confirmed 1280 on `/platform/` and `/solutions/for-hr/`. Every u-based value equals the 1440 value × 0.8889; for example the platform hero is 695.1px, mail-service 7188px and the CTA 572.4px. The exceptions are the px-based Tailwind blocks in §1.13–1.15, which do **not** scale.

**Global system.** Everything in `/CLONE_SPEC.md` §0 applies unchanged: the `u` unit, type tokens, color tokens, radii, eases (Eas17, Eas1739, Eas49, Eas66…), `f(n)=n/60 s`, accordion/tab/slider base styles, header and footer. Units below are **u** unless written as px.

**Content policy.** Copy is recorded as role + approximate length (`~Nc`, N lines) only. Logos, photos, product screenshots, illustrations and Lotties are listed as PLACEHOLDER. Simple UI glyphs are marked REDRAW. The full asset list is in `specs/marketing-assets.md`.

---

## 0. Cross-page facts (read first)

1. **No announcement banner on any inner page.** The banner exists only on the homepage, so `--banner-height` is 0. Header `top` is 24u (≥481) or 5u (mobile); measured 24px at 1440. Header and footer are otherwise identical to the homepage. No nav item gets an active state on any page.
2. **Pages are compositions of reusable blocks.** Hugo builds them from shared partials, and the same section ids repeat across pages (`homepage-trusted`, `homepage-benefits`, `homepage-faq`, …). Build each block once as a component and compose the pages from them (§2).
3. **`<main>` starts at y=0.** Every first section clears the fixed header with its own top padding.
4. **`/solutions/` and `/solutions/smb/` are the same page.** Their `<main>` markup is byte-identical except the CTA id. Only `<title>`/meta differ: SMB adds "Mosey for SMB" and a meta description. Render one component for both routes.
5. **`sm:` Tailwind variants are inert.** No `sm` screen is configured; the screens are `md` 481 and `lg` 1025. Classes like `sm:grid-cols-2` and `sm:py-32` never apply at any width, and I verified this at 768 and 1440. Do not implement them.
6. **Some blocks use plain Tailwind px/rem utilities** (16px rem) instead of `u`: for-hr blocks §1.13–1.15, the HubSpot form, and fixed px radii `rounded-[7px]`/`rounded-[12px]` on feature images. Those values are written in **px** and do not scale with viewport.
7. **Section activation.** The base `Section` class uses ScrollTrigger `start: top bottom-=25%`. Blocks that set `startTriggerOffset=30` use `top bottom-=30%`. Reveals run once. Pins use `pinSpacing:false`, with a spacer element supplying the scroll length.

### 0.1 New tokens

| Token | Value | Where |
|---|---|---|
| `btn-red` bg | `#C74E5C`, text `#F3F1EC` | `.btn.btn-red` (about careers, telehealth feature CTA), HubSpot submit, `.hs-form-required` asterisk |
| lime check | `#55B559` (`text-lime-500` is overridden in config) | for-hr ProblemList check icons |
| icon tile tint | `#285D6010` (`#285D60` @ 6.3%) inline bg | for-hr FeatureCardGrid icon tiles |
| icon accent set | `#285D60`, `#A5B287`, `#C1BA95`, `#889C98`, `#D1D9D6` (inline `style=color`) | for-hr FeatureCardGrid icons, cycling in that order |
| Tailwind grays | border `#F3F4F6` (gray-100), ring `#E5E7EB` (gray-200), input bg `#F9FAFB`, input border `#D1D5DB` | for-hr cards, HubSpot inputs |
| card glass | `rgba(255,255,255,.5)` inline | for-hr FeatureCardGrid cards |
| `bg-mask-gradient-orange` | `linear-gradient(90deg,#F3F1EC,#F3F1EC00)` | Ticker edge fades on `/about/` (page bg is `#F3F1EC`) |
| line-art stroke | `#516B66` (= `green2`) | Platform hero, hero-static and engine line art |

**New type roles** (size/line-height/letter-spacing/weight in u; columns are mobile / tablet / desktop):

| Role | Mobile | Tablet | Desktop | Notes |
|---|---|---|---|---|
| `button-large` | 10/16/-0.02/500 | 12/19.2/-0.02/500 | 14/22.4/-0.28/500 | `.btn` text |
| article p / li | 13/20.8/-0.01em/450 | 14/22.4/-0.01em/450 | 17/27.2/-0.01em/450 | `.article-wrapper`, color `#203435B3` |
| article h2 | 17/22.1/-0.68/500 | 17/22.1/-0.68/500 | 24/31.2/-0.96/500 | `#203435`, mt 40u |
| Tailwind `text-lg font-semibold` | 18px/28px/normal/600 | same | same | for-hr card titles and resource titles (fixed px) |
| Tailwind `text-sm font-medium` | 14px/20px/normal/500 | same | same | for-hr resource link |

**Button `.btn`.**
- `inline-block; white-space: nowrap; border 1px transparent; radius 8u; text-align center; transition .4s`.
- Padding: 5u 9u (mobile/tablet), 6u 16u (desktop).
- `btn-red` has **no hover rule**. The site's `.hs-button:hover` rule is malformed CSS and does nothing.
- Rendered sizes:
  - ~20-char label: 159.6×36.4u (1440), 132×31.2u (768), 113×27.6u (390).
  - ~14-char label: 130.5×36.4u (1440).

---

## 1. Block library (new or varied components)

For each block: where it is used, its geometry per breakpoint, its type, and its motion. Reused homepage components are named by their `src/components/*.jsx` file.

### 1.1 PageHero (`section.hero-section`, ids `platform-hero` / `landingpage-hero`)

The same skeleton is shared by `/platform/` and every "landing" page (payroll, handbooks, tax, for-hr, telehealth). It is new; it does not exist on the homepage.

**Container**
- `.section-container`: bg `#F3F1EC`, relative, full width.
- Height **fixed 782u on desktop** (`lg:h-1782`), auto otherwise.

**Text block** (flex column, centered, `text-align: center`)
- Padding-top: 79u (mobile), 110u (tablet), 119u (desktop). Padding-bottom: 48u, 76u, 0.
- Eyebrow: p2, `main_green/40` (`#20343566`), ~8–18c, 1 line.
- Title: `h1` at the h3 token, 2 lines (desktop), with one ~14–26c phrase in `span.text-green`.
  - **Platform variant:** h1 has no color class, so it computes **`#000000`**.
  - **Landing variant:** h1 is `#203435`.
  - Some pages force a line break with a `<br>` inside the h1 (handbooks, telehealth).
- Description: p2 `main_green/40`, ~102–108c. Width 424u (desktop), 272u (tablet), 100% (mobile); 2–3 lines.
- Vertical gaps:
  - Platform variant (margins on elements): eyebrow mb 18u/16u/9u (desktop/tablet/mobile); h1 mb 15u/16u/11u.
  - Landing variant (wrappers): `.title` mt 8u (mobile) / 16u; `.description` mt 12u (mobile) / 16u.

**Visual, platform variant**
- Desktop: `.visual-block` absolute at bottom 0, 1204×466u, left 103u. The `img` is `object-cover`.
  - PLACEHOLDER 2406×932 (2.58:1), product UI collage on transparent bg.
- Tablet: in flow, 471×353u, ml 148u. Mobile: 275×206u, centered.
  - Separate image, PLACEHOLDER 1004×738, `object-fill`.
- Line art (desktop only): two SVGs, 272×170u, at the section's bottom-left and bottom-right corners; the right one is mirrored (`-scale-x-100`).
  - Stroke and fill `#516B66`; a curved line ending in a dot. **REDRAW.**

**Visual, landing variant**
- Desktop: in flow, `mt 24u`, **width 75% (1080u)**, centered. Image `object-cover`, height from its aspect:
  - 418.4u for a 2406×932 source (payroll, tax, for-hr, telehealth).
  - 403u for handbooks (4760×1776).
- Tablet/mobile: full-bleed width (768u / 320u), height from the aspect of the `-res` image (`object-fill`). For example 564.5u at 768 for 1004×738.
- The landing variant has no line art.

**Section heights**
| | 1440 | 768 | 390 |
|---|---|---|---|
| platform | 782 | 681 | 482 |
| payroll | 782 | 931 | 493 |
| handbooks | 782 | 653 | 377 |
| tax | 782 | 896 | 466 |

**Motion** (`hero-*.js`; trigger `top bottom-=30%`, once; all y offsets in u)
1. Eyebrow: `y 30→0, autoAlpha 0→1`, 20f (.333s), Eas17, at t=0.
2. h1: same, 32f (.533s), at +5f.
3. Description: same, 32f, at +10f.
4. `.visual-block`: `autoAlpha 0→1, scale .95→1`, 32f, **Eas1739**, at +15f.
5. Images fade in on lazy-load (`opacity .4s`).

### 1.2 HeroStatic (`section#hero-static.hero-static`)

Used on `/platform/entity-compliance/` and `/solutions/` (= `/solutions/smb/`).

**Layout**
- bg `#F3F1EC`. Padding-top: 80u (mobile), 111u (tablet), 120u (desktop). No padding-bottom; the lottie sits on the section bottom.
- `.title-wrap`: flex column, centered, `text-align: center`, `mx auto`. Width 272u (mobile), 313u (tablet), 636u (desktop).
  - Eyebrow: p2 `/40`, ~9c.
  - `.title` (mt 8u mobile / 16u): h1 h3-token `#203435`, ~47c. It has a `<br>`, so it renders 2 lines on desktop and 4 on tablet/mobile; ~17c are green.
  - `.description` (mt 12u / 16u): p2 `/40`, ~127c; width 424u (desktop) / 272u.
- `.image-block` (relative):
  - Desktop: 977×424u, centered. Tablet: 768×335u.
  - Mobile: 465×203u, **left -73u**, so it overflows both sides. The `section` has no overflow clip; `main{overflow:hidden}` (CLONE_SPEC §0.2) clips it.
  - Contents: Lottie `/lottie/Solutions_hero.json` (977×424, 30fps, 151 frames ≈ 5.03s). Desktop uses `.bodymovin-wrap`; tablet/mobile use `.bodymovin-wrap-mobile` (same file). PLACEHOLDER: abstract product illustration, 2.30:1.
- Line art (desktop only): two SVGs (viewBox 422×170) rendered 423×170u, absolute at the section's bottom-left and bottom-right (mirrored). Stroke and fill `#516B66`. **REDRAW.**

**Heights:** 739u / 694u / 485u (entity); 694u / 574u / 387u (solutions).

**Motion:** **no text reveal.** The JS only builds the lottie (`autoplay: false, loop: true`), activates it on setup and calls `play()` on section activate. It loops while in view and pauses on deactivate.

### 1.3 FeatureGroup / MailService (`#mail-service` on `/platform/`, `#feature-group` on payroll, tax, for-hr)

New. A pinned card with an accordion on the right driving an image cross-fade on the left. The two ids share identical markup and code; `/platform/` has 3 cards, the other pages have 1.

**Wrapper**
- `.base-container` (272u / 688u / 1232u).
- Padding-top: 60u (mobile/desktop), 120u (tablet). Padding-bottom: 100u (mobile), 115u (tablet), 160u (desktop).
- `ul.list`: flex column, gap 60u (mobile/tablet), 44u (desktop).

**Desktop card (`.list-item-wrap`)**
- 1232×593u, padding 73u 66u, radius 12u. bg `#CFD7D4` at **50% on the first card, 20% on the others** (static classes `lg:bg-green5/50`, `lg:bg-green5/20`).
- `.content-wrap`: flex row, space-between, 1100u wide.
  - Left `.img-wrap`: 530×447u, radius 8u, overflow hidden, relative. It holds 3 absolutely stacked `.img-item` (100%×100%); items 2 and 3 start at `opacity 0`.
    - Each `img` is `object-cover` but has **no height set**, so it renders 100% wide with height from its aspect.
    - Platform images (1061×895) fill 530×447u.
    - Payroll's first image (848×528) renders 530×330u and top-aligned, with the card tint showing below; for-hr images run 343–447u tall. Reproduce this as `w-full h-auto`, top-aligned.
  - Right `.desc-list`: 464u wide, flex column, space-between.
    1. Title block (column, gap 16u): h5 `#203435`, ~26–42c, 1 line; p2 `/70`, ~82–173c, 2–3 lines.
    2. Accordion (`.accordion.platform`, width 384u): 3 items.

**Accordion items**
- Button: `mt 20u`; padding-bottom 20u when inactive, **12u when active**. Title is h6, 384u wide, ~13–39c.
  - Color `main_green/40` when inactive, **`#285D60` when active**. `.active` adds `transition: .5s` (all).
  - The platform variant has **no chevron icon**.
- Content: `height: 0` → **100u when open on desktop** (80u on tablet/mobile); `max-height: none`.
  - Opacity 0→1 and `translateY(-20px)`→none, `.5s cubic-bezier(.17,.17,.43,1)`, per CLONE_SPEC §0.7.
  - Inner padding-bottom 20u (desktop) / 16u; p2 `/70`, 2–3 lines.
- Open on load: item 1 (`numberOfVisibleItems: 1`). Clicking another item closes its neighbours; clicking the open item closes it.
- Each `li` ends with `.spacing` of padding-bottom **2000u** (desktop only); this supplies the pin's scroll length.

**Tablet (481–1024)**
- No card bg or padding.
- `.title-wrap-mobile`: flex `row-reverse`, space-between. h5 235u wide on the right (17/22.1, 1–2 lines); p2 332u wide on the left.
- `.content-wrap`: mt 40u; row, space-between. Image box 332×280u (radius 8u); accordion column 248u wide (`md:w-1248`).
  - Button mt 12u, pb 12u; title 13/20.8.
- After each item: a 2px (fixed px) divider, `#285D60` @ 20%, mt 40u.

**Mobile**
- Title wrap: column, gap 16u, full 272u.
- Image box 272×229u, mt 24u. Accordion below it (mt 24u), 272u wide.
  - Button mt 22u; pb 18u when inactive, 8u when active. Title width 237u.
- Divider: 2px, mt 40u.

**Heights:** platform (3 cards) 8087u / 1562u / 2219u; single card 2813u / 655u / 824u.

**Motion**
- **Desktop pin** (per `li`): `ScrollTrigger({trigger: .list-item-wrap, start: "center-=5% center", endTrigger: .spacing, end: "bottom bottom", pin: true, pinSpacing: false, scrub: true})`.
  - `onUpdate`: `index = round(progress × (items−1))`. When the index changes, call `openItemByIndex(index)` and run the image swap.
  - Net effect: the card sticks near the viewport centre while you scroll ~2000u and the 3 accordion steps advance. It then scrolls away as the next card arrives (no overlap).
- **Image swap** (all sizes; the accordion click also triggers it):
  1. All `.img-item`: `autoAlpha → 0`, 20f (.333s), Eas66.
  2. **Then** the target item: `autoAlpha → 1`, 20f, Eas17. The two steps are sequential, not a cross-fade.
- **Reveal** (section trigger, default 25%):
  - `.title-wrap-mobile`: `y 50u, autoAlpha 0 → y 0, 1`, 20f, Eas17.
  - `.content-wrap`: same, at +5f.
  - The code uses `querySelector`, so **only the first card's** elements animate. The `.title-wrap-mobile` is `display: none` on desktop, so on desktop only the first `.content-wrap` slides in.

### 1.4 FeatureList (`section#features-section.features-section`)

Three variants share the class.

**A. Multi-item, `.small-container`** (1020u / 688u / 272u). Used on `/platform/` (3 items) and `/platform/handbooks/` (1 item).
- `ul.features-list`: on ≥481, each item after the first has a 1px top border `#285D60` @ 20% (`divide-y`). No dividers on mobile.
- `li.feature-item` padding: mobile pb 60u; tablet 60u y; desktop 80u y. The last item has no padding-bottom.
- `.text-block`:
  - ≥481: row, space-between. Mobile: column.
  - Padding-bottom 24u (mobile), 42u (tablet), 85u (desktop).
  - h5 `#203435`: one leading phrase (~6–11c) in `#285D60` plus ~9–15c more, 2 lines on desktop; mb 24u (mobile/tablet).
  - p2 `/70`: width 424u (desktop) / 332u, ~96–179c, 2–3 lines.
- `.list-block`:
  - ≥481: row, space-between. Mobile: column.
  - Left `ul.list`: rows are `flex; align-items: center; pb 24u`. Each row has a 17u check icon then an h6 `#285D60` label (`ml 12u`, ~4–28c, 1 line). 3–5 rows.
    - Check icon: SVG 17×17, a circle `#203435` at 20% opacity with a `#285D60` round-cap check stroke. **REDRAW.**
  - Right `img`: `object-cover`, PLACEHOLDER 1404×910 (1.54:1) product screenshot.
    - Size 702×455u (desktop), 421×273u (tablet), 100%×178u (mobile).
    - **Radius fixed px:** 12px (desktop), 7px (tablet/mobile).
  - **Handbooks variant of the list:** rows alternate between a title row (check icon + h6 green, pb 8u/12u/20u for mobile/tablet/desktop) and a description row (p2 `/70`, ~109c, 3 lines, pb 24u, no icon). 3 pairs. The `ul` has `mr 25u` on ≥481; it is 293u wide on desktop.
- **Motion** (per `.feature-item`): `ScrollTrigger({trigger: item, start: "top+=25% bottom", once: true})`.
  - On enter:
    1. `.text-block`: `autoAlpha 0→1, y 50u→0`, 30f (.5s), Eas17.
    2. List `li`s: `y 10u→0, autoAlpha 0→1`, stagger 5f, 35f each, Eas17, starting at +5f.
    3. `img`: `scale .98→1, autoAlpha 0→1`, 20f, **Eas1739**, at +8f.

**B. Single block, `.medium-container`, `py 42u`** (all breakpoints). Used on payroll, entity, tax and telehealth.
- No `.feature-item` wrapper; the text-block and list-block are direct children. The layout is otherwise identical to A, but the content width is 1100u, so the image right-aligns at x 568–1270.
- Text-block desc width 424u. h5: ~10c plus a ~19c green phrase, 2 lines.
- **Telehealth only:** a `.btn-wrap` (`flex; mt 24u`) holding one `a.btn.btn-red` (~20c label, `mr 6u`, `href="/"`) sits under the list.
- **Motion: none.** The JS queries `.feature-item`, which this variant does not have, so it renders static.
- Height: 696u / 457u / 588–640u.

### 1.5 Ecosystem (`section#ecosystem-section`)

New. Used on `/platform/` and `/solutions/`.

**Layout**
- bg `#CFD7D4` (`green5`). `.medium-container`, padding 60u y (mobile/tablet), 117u y (desktop).
- `.text-block`:
  - ≥481: row, space-between. Margin-bottom 32u (mobile), 25u (tablet), 109u (desktop).
  - h3, 2 lines, ~12c plus a ~21c green phrase. Desktop width 399u. mb 23u below 1025, 0 on desktop.
  - p2 `/70`, ~89c, 2 lines. Width 400u (desktop), 332u (tablet), 100% (mobile).
- `ul.list`: row on ≥481, column on mobile. 3 items.
  - Width 318u (desktop) / 208u (tablet) / 100%. Items 1–2 have mr 52u (desktop) / 32u (tablet); mobile items have mb 24u.
  - `.icon-block`: flex, centered. Height 113u (desktop), 74u (tablet), 96u (mobile). bg `#FCFBFA` @ 70%. Radius 12u (desktop) / 10u. mb 19u (desktop) / 16u.
    - Holds a partner wordmark SVG (viewBox 200×53 or 200×55), rendered 200×57u (desktop), 130×45u (tablet), 171×45u (mobile). PLACEHOLDER: 3 partner logos, one colored (`#F45D48` fill), one raster-pattern, one vector.
  - p2 `/70`, ~59–76c, 2–3 lines.
- Heights: 614u / 383u / 765u.

**Motion** (trigger `top bottom-=30%`, once)
- `.text-block`: `autoAlpha 0→1, y 100→0`, stagger 5f, 35f, Eas17. The y is **100 raw px** (not multiplied by rem); keep px.
- `.item`: `y 10u→0, autoAlpha 0→1`, stagger 5f, 35f, Eas17, at +5f.

### 1.6 Engine (`section#engine-section`, `/platform/` only)

New. A numbered feature list.

**Line art**
- Two SVG blocks (viewBox 210×198) at 210×198u, stroke and fill `#516B66`. **REDRAW.**
- Desktop: absolute at left 0 and right 0 (right mirrored), top 180u. Tablet: left/right -83u, top 36u. Hidden on mobile.

**Container and header**
- `.medium-container`: flex column, centered.
  - Padding-top: 70u (mobile), 121u (tablet), 263u (desktop). Padding-bottom: 77u, 113u, 139u.
- Header `.text-block` (centered column, `text-align: center`):
  - Width 226u (mobile), 375u (tablet), auto (desktop). mb 74u, 160u, 165u.
  - h1 at h3 token: ~6c, then a ~10c green word, then ~6c. 1 line on desktop/tablet, 2 on mobile. mb 11u (mobile) / 16u.
  - p2 `/70`: width 405u (desktop), 100% otherwise; ~106c, 2–3 lines.

**Items** (`ul.features-list`, `divide-y` 1px `#285D60` @ 20%; 3 items)
- `li` padding:
  - Desktop: 80u y; the last has no padding-bottom.
  - Tablet: pb 40u; items 2–3 add pt 39u.
  - Mobile: pb 16u, plus pt 39u on items 2–3.
- `.text-block`: flex, space-between, wrap. mb 24u (mobile), 39u (tablet), 60u (desktop).
  - Number `span` (h6 green, "01"–"03"); on mobile it moves to the top-right corner (`order-1`).
  - h5 `#203435`, ~14–28c. Width 400u (desktop), 200u (tablet), auto (mobile).
  - p2 `/70`, ~67–119c. Width 424u (desktop), 303u with mr 28u (tablet), 100% (mobile, `order-2`).
- `.list-block`: row (≥481), space-between; `column-reverse` on mobile, so the image comes first.
  - `ul.list`: 424u wide with ml 139u (desktop), 287u (tablet). Rows: `flex; pb 24u`; 17u check icon (mt 6u desktop / 2u) plus h6 green label (ml 12u), ~35–69c, 1–2 lines. 3 rows.
  - `img`: PLACEHOLDER 848×460, `object-cover`, no radius. Size 424×230u (desktop), 331×180u (tablet), 272×147.5u (mobile, mb 24u).

**Height:** 2093u / 1433u / 1733u.

**Motion:** same per-item timeline as FeatureList A (§1.4), with the trigger at `top bottom-=25%`.

### 1.7 ScrollTabs (`section.multiColumnList` on entity; `section#everything.everything` on `/solutions/`)

New. A desktop pinned, scroll-driven vertical tab list. On tablet/mobile it becomes a stacked card list.

**Shared header**
- bg `#FCFBFA`, padding-top 111u (all breakpoints). `.medium-container`, z 10.
- `.title-wrap`: row on ≥481 (space-between), column on mobile (gap 24u). Desktop mb 83u.
  - h1 at h3 token: ~7–8c plus a ~10–13c green phrase, 1 line.
  - p2 `/70`, ~91–171c, 2–3 lines. Width 424u (desktop) / 332u.

**Desktop (≥1025)**
- `.tabs-wrap`: relative, full width, padding-x 40u. Pinned (see Motion).
- Left `ul.tab-links`: flex column, gap 24u.
  - On `/solutions/` it also has `pl 40u`, so the labels start at x 250 instead of 210.
  - 4 labels: h6-desktop `#285D60`, ~5–21c. `opacity .4`; `.active` is opacity 1. The opacity switch is instant (no transition).
- Right `ul.tab-items`: 4 `li.tab-item`, all absolute at `right 40u; top 0`, 782u wide.
  - Each item has `pt 60u` and `mt -60u`, an anchor offset for `#id` deep links. Ids are anchors such as `#fq`, `#registered-agent`, `#tax-nexus`, `#annual-reporting`, `#finance`, `#head-of-people`, `#startup`, `#legal`.
  - Contents:
    - Image box: 782×323u, `object-cover`, no radius. PLACEHOLDER 1562×649 (2.41:1) product screenshot.
    - `.features-wrap` (mt 30u): `ul` row, gap 16u, holding 3 columns of 250u (`lg:w-1250`). Each column is a flex column with gap 14u:
      - `h4` at the p1 token (17/23.8/-0.12/500) `#203435`, ~13–30c, 1 line.
      - p3 `/70`, ~85–172c, 3–5 lines.
- `.spacer`: padding-bottom **3000u** (desktop only).
- Side line art (desktop only): two SVGs (viewBox 105×1005) at 104×1000u, at the section's bottom-left and bottom-right. These are the homepage compliance side lines (CLONE_SPEC §7); reuse them.

**Tablet / mobile**
- `.tabs-wrap` padding: 80u top / 110u bottom (tablet); 110u y (mobile).
- All 4 items are stacked and visible: `ul` flex column, gap 80u (tablet) / 40u (mobile).
- Each item, top to bottom:
  1. `.cart-title-wrap` (flex, space-between): h5 at the h6 token **`#000000`** (no color class), ~5–25c; number span "01"–"04" (h6 token, `#000`) on the right.
  2. Image: mt 24u (tablet) / 10u (mobile); full width, height 284u (tablet) / 179u (mobile), `object-cover`. Mobile uses a separate 544×358 crop.
  3. Features list (mt 24u):
     - Tablet: row, gap 42u, 3 auto-width columns. Title 12/16.8; desc 12/19.2 at -0.2u.
     - Mobile: column, gap 16u. Each item has border-bottom 1px `#203435` @ 20% and pb 16u; the last has neither.

**`/solutions/` only**
- After the spacer, the section also contains the **Compliance CTA card** (homepage `RoleTabs` CTA, CLONE_SPEC §7).
  - Wrapper: 1020u wide and centered on desktop; 100% of medium-container on tablet/mobile (684u / 272u). Padding-bottom 110u (mobile) / 160u.
  - The card itself is described in §1.8.

**Heights:** entity 3429u / 2416u / 2534u; solutions 3984u / 3129u / 3370u.

**Motion (desktop only; no reveals)**
- Pin: `ScrollTrigger({trigger: .tabs-wrap, start: "top top+=20%", endTrigger: .spacer, end: "bottom bottom", pin: .tabs-wrap, pinSpacing: false, scrub: true})`.
  - `onUpdate`: `activateIndex(round(progress × 3))`.
  - `onEnter` / `onLeaveBack` → tab 0. `onLeave` / `onEnterBack` → tab 3.
- Tab switch (`syncActivate`, so it is sequential):
  1. Outgoing item: `scale 1→.86, autoAlpha 1→0`, .267s, **Eas49**.
  2. Then incoming item: `scale .86→1, autoAlpha 0→1`, .3s, **Eas1739**.
  3. Link `.active` toggles at the same time.
  - Initial state: inactive items at `scale .86`, opacity 0.
- Links are also clickable and trigger the same switch.
- A URL hash equal to an item id activates that tab after 500ms.

### 1.8 GenericCta wrapper (`div > .generic-cta#generic-cta-NNNN`)

A standalone **Compliance CTA card**, the same card as the homepage `RoleTabs` bottom card (CLONE_SPEC §7 "Compliance CTA card"). Used on payroll, entity, tax, for-hr and telehealth. The same card appears inline on handbooks (§1.10) and solutions (§1.7).

**Wrapper**
- `div.bg-main_white`: flex column, centered, relative, z 10. Padding 150u y on ≥481 (`md:py-1150`); 0 on mobile.
- `.generic-cta` width: 272u (mobile), 510u (tablet), 1020u (desktop).
- Heights: 671u / 718–757u / 376–400u.

**Card values** (identical to the homepage card)
- bg `#285D60`, radius 12u. Padding 73u 67u 40u 79u (desktop), 50u 67u 45u (tablet), 30u 20u 45u (mobile).
- Title: h4, ~49–50c, 2–3 lines. 28/33.6/-0.64 (desktop); 20/24 white centered on tablet/mobile.
- Desc: p2 white/70, ~95–101c.
- Lottie `/lottie/cta.json`: 454×258u (desktop), 376×177u (tablet), 100%×131u (mobile).
- Background image: `bg-desktop.png` 644×324u (desktop) / `bg-tablet.png`.

**Motion** (own trigger `top bottom-=10%` / `bottom top-=10%`)
- Whole card: `y 100→0`, 32f, Eas17, once. The value is raw px 100.
- Lottie loops while in view.

### 1.9 BenefitsLanding (`#homepage-benefits` variant on payroll, handbooks, tax, for-hr, telehealth)

This is the homepage `Benefits.jsx` with three differences:
1. Container padding is **110u top and bottom at every breakpoint** (`py-1110`).
2. The card icon is an **`<img>`** instead of an inline SVG, at `opacity .4`.
   - On card hover (`group-hover`) it goes to **opacity 1** with Tailwind `transition` 300ms, `cubic-bezier(.4,0,.2,1)`. The homepage `.card:hover .card__bg {opacity 1}` (375ms) still applies.
   - Payroll, tax, for-hr and telehealth use a data-URI SVG chart pictogram (172×104).
   - Handbooks uses 3 PNG pictograms: 538×274, 609×376, 598×316. Rendered width 236u (desktop), 163u (tablet), 172u (mobile), height from aspect. PLACEHOLDER.
3. All 3 cards use `gap 12u` in `.card__text`; the homepage typo is not present.

Content: title ~16–22c, sometimes with a `<br>`; values ~17–24c (2 lines possible); descriptions ~67–127c.

JS is identical to the homepage (mobile Splide, desktop/tablet reveal order 2-1-3).

Heights: 812–975u (desktop).

### 1.10 BenefitGroup (`section.benefit-group-section`, `/platform/handbooks/` only)

This is the homepage `RoleTabs.jsx` (compliance tabs + CTA card) with these differences:
- **No `.section-bg` orange gradient.** The section is flat `#FCFBFA`.
- Section padding-bottom: 39u (mobile), 81u (tablet), 120u (desktop). The inner container has **padding-top 0** and pb 50u on ≥481.
- **3 tabs** (~9–12c labels). The tab-links `ul` is 448u wide on desktop (440u tablet, 272u mobile); the indicator is 115u (90u mobile). Tab item images are PLACEHOLDER 2580×1868 screenshots.
- Each list entry: icon 26u (desktop) / 22u, plus h6, plus a p4 desc of ~87–139c. 3 entries per tab.
- The Compliance CTA card follows directly, inside the same section.
- Side lines (`.bg-lines`, 104×1000u) are present as on the homepage.
- Motion is identical to the homepage: title `y 100→0` 32f, tabs +10f, indicator `power2.out` .5s, tab in/out timelines from `HomeComplianceTabItem`.

Height: 1308u / 1510u / 1194u.

### 1.11 GetStarted (`section#solutions-get-started.get-started-section`)

This is the homepage `PeaceOfMind.jsx` (same code module `stepByStep`, same classes and pin) with **static PNG images instead of Lotties**:
- Desktop `.peace-image-wrapper` 424×264u holds `img.peace-image` absolutely stacked (`h-full w-full`). PLACEHOLDER 848×528 each.
- Tablet/mobile slide images: 424×264u / 273×170u.
- **3 steps** on payroll, entity, solutions and for-hr; **4 steps** on handbooks.
- Content: title ~12–20c, partly green; step titles ~25–31c; step descriptions ~83–122c.
- Desktop section height: 1760u (3 steps), 1863u (3 steps with longer copy), 2271u (4 steps).
- Motion is identical to the homepage (scrubbed pin). The images cross-fade with `scale .95→1` in and `scale 1.05` out, and there are no lottie plays.

### 1.12 ProblemList (`section#list-section`, `/solutions/for-hr/` only)

New.

**Layout**
- `.container-list` is a flex column, centered.
- `.list-posts`: width 272u (mobile), 704u (tablet), 1101u (desktop).
  - Padding-top 60u (mobile) / 80u. Padding-bottom 32u (mobile) / 54u.
  - Flex column, gap 32u / 54u.
- One `article`: column on mobile (gap 16u), row with space-between on ≥481. Padding-bottom 32u / 54u.
- Left `.title-wrap`: width 249u (tablet) / 318u (desktop).
  - h2 at h5 token `#203435`, ~31c, 1–2 lines.
  - p2 `/70` with Tailwind **`pt-4` (16px fixed)**, ~100c, 4 lines.
- Right `.summary-wrap`: width 339u (tablet) / 530u (desktop). It holds a `dl` of 4 entries; `space-y-10` is active only below `sm`, which never exists, so the vertical rhythm comes from `mb-4`.
  - Each entry: relative wrapper with `mb-4` (16px fixed).
  - `dt`: an absolute 24×24px check icon (Heroicons-style `M5 13l4 4L19 7`, stroke 2, **`#55B559`**; REDRAW) plus `p` h6 `#285D60` with `ml-9` (36px fixed), ~20–38c.
  - `dd`: p2 `/70`, `ml-9`, ~86–147c, 2–4 lines.
- Height: 559u / 546u / 637u.
- **Motion: none.** The JS class is a no-op.

### 1.13 FeatureCardGrid (`div.section-container.py-1110.bg-white`, `/solutions/for-hr/` only; mixed u and px)

New.

**Container and header**
- bg `#F3F1EC`. Padding 110u y. (`.section-container`'s own padding-top is overridden by `py-1110`.)
- `.text-block`: width 80% (`md:w-4/5`) on ≥481, 100% on mobile; `mx auto`; centered text. `mb-12` (48px) has no visible effect.
  - h2 at h3 token: ~16c with a `<br>` and a ~24c green line; 2 lines. `mb-6` = 24px.
  - p2 `main_green/80`, ~171c, 2–4 lines. `max-w-2xl` (672px), centered, `mb-8` (32px).

**Grid** (`dl`)
- `grid; gap 32px` (fixed); `max-w-5xl` (1024px fixed), `mx auto`.
- Columns: **3 at ≥1025** (320px each at 1440), 1 below. `sm:grid-cols-2` is inert.
- 6 cards. Each card:
  - Flex column, `items-start`. Padding 24px. Radius 8px. Border 1px `#F3F4F6`. bg `rgba(255,255,255,.5)`.
  - Icon tile: 40×40px, padding 8px, radius 6px, ring 1px `#E5E7EB` (box-shadow), bg `#285D6010`. It holds a 24px outline icon (**REDRAW** simple line icons) in the cycling accent color from §0.1.
  - `dt`: `mt-4` (16px), Tailwind `text-lg font-semibold` (18px/28px/600) `#203435`, ~24–28c.
  - `dd`: `mt-2` (8px), p2 `/70` (u-based), ~88–121c.
- At 1280 the grid stays 1024px wide; it does not scale.

**Height:** 971u / 1653u / 1591u.

**Motion:** none.

### 1.14 ResourceList (`div.bg-white.py-24`, `/solutions/for-hr/` only; Tailwind px)

New.

**Container and header**
- bg `#F3F1EC`. Padding 96px y (`py-24`; `sm:py-32` is inert).
- Inner `max-w-7xl` (1280px), `px-6` (24px) on mobile/tablet / `lg:px-8` (32px), `mx auto`. Then `max-w-2xl` (672px), widened to `lg:max-w-4xl` (896px).
- h2 at h3 token, **`#000000`** (no color class), ~29c, 1–2 lines.
- p `mt-2` (8px), p1 token `/70`, ~122c.

**List**
- `mt-6` (24px) / `lg:mt-12` (48px); `space-y-8` (32px).
- 3 `article`s: flex column (gap 32px) below 1025, row on desktop.
  - Cover image: desktop `lg:w-64` (256px), height from aspect (263px for 1376×1414); full width below 1025 (it overflows its aspect wrapper). Radius 8u on the wrapper. PLACEHOLDER 1376×1414 guide cover.
  - Text column (flex column, `justify-center`):
    - h3 `text-lg font-semibold` `#000`, ~29–41c.
    - p `mt-3` (12px), p2 `/70`, ~153–160c.
    - `a` `mt-4` (16px): inline-flex, `text-sm font-medium` `#285D60`, ~19–26c, followed by a 16px right-chevron icon (`ml-1`). The link targets `/p/...`.
- No hover styles. Height: 1194u / 2866u / 1681u.

**Motion:** none.

### 1.15 LeadForm (`section.bg-main_white.section-container`, `/solutions/for-telehealth/` only)

New. Third-party form.

**Container**
- `.medium-container.base-container`: `grid grid-cols-2 gap-12` (48px fixed gap). This applies **at every width**, so mobile is a cramped 2-column grid of 116u columns. Reproduce as measured.
- Padding-top: 60u (mobile), 115u (tablet), 160u (desktop). Padding-bottom: 100u, 115u, 160u.

**Left column**
- h3 h3-token, ~71c, 3 lines (desktop).
- `ul.list` `py-8` (32px), mr 25u (tablet) / 52u (desktop). 3 rows: `flex; items-start`.
  - Icon wrapper: 17u with `pt-2` (8px); the icon is the §1.4 check.
  - Label: h6 green, `ml 12u`, ~39–59c.
  - Row padding-bottom: 8u (mobile), 12u (tablet), 20u (desktop).
- The HTML ships with leftover GSAP inline styles (`transform: translate(0,0); opacity: 1`). Ignore them; it renders static.

**Right column**
- `lg:max-w-[45vw]`, `pt-3` (12px). Contains a **HubSpot embedded form** (`div.hbspt-form#hubspot-form`, loaded from HubSpot's script).
- Rendered (1440):
  - 4 fields, each with a label: p1-token `#285D60`, plus a required `*` in `#C74E5C`.
  - Inputs: 526u wide × 57.8px tall. Padding 16px. bg `#F9FAFB`. Border 1px `#D1D5DB`. Radius 8px. Focus border `rgb(220,88,104)`. Field spacing `mb 1.5rem`; label `mb .5rem`.
  - Submit: `.hs-button` (btn-red), 126.7×36.4u, `mt 2rem`, button-large type.
- **Clone this as a static lookalike form; do not load HubSpot.**

**Height:** 855u / 704u / 715u. **Motion:** none.

### 1.16 TestimonialsLite (`section.testimonials-section`, no id, `/solutions/for-telehealth/` only)

A variant of homepage `Testimonials.jsx`, with its own code in the telehealth page JS.

**Layout**
- `.section-container`:
  - Desktop: padding 200u y, 170u x; flex, space-between.
  - Tablet: padding 100u 40u; flex.
  - Mobile: **`grid` 1 column** with padding **24px y (`py-6` wins over `py-1050` on mobile)**, 25u x, row gap 4px, column gap 32px.
- Title: h3, ~56c, 2–3 lines, one ~6c word green. Desktop width 644u (`col-span-1`); mb 40u.
- Slider: width 424u (desktop), 331u (tablet), 100% (mobile). 3 slides.
  - Slide: column, gap 24u; logo 234×112u (desktop) / 127×60u, `object-contain`.
  - Quote: h2 at h5 token, ~132–213c, 4–7 lines. Min-height 120u / 80u (tablet).
  - **No supporting paragraph** (the homepage has one).
  - Author row: 48u avatar (radius 12u); name p1; role p3 `.7`; gap 16u (desktop) / 12u.
- Divider (1px `#285D60` @ 40%, my 24u/16u), counter "0N/0M" (h5 token), arrows (46u / 32u). All per the homepage.

**Height:** 892u / 521u / 558u.

**Motion**
- Splide `{arrows: true, autoWidth: true, pagination: false, perPage: 1}`. The counter updates on `active`.
- Reveal:
  - Desktop/tablet: title, then slider (+.06s), `y 100u, autoAlpha` → .567s, Eas17.
  - Mobile: title, divider (+.066s), slider (+.066s), from `y 40·rem`.

### 1.17 About blocks (`/about/`)

All sections sit inside one `div.bg-white` (`#F3F1EC`). The containers are `.container-wrap`: 272u (mobile), 704u (tablet), 1100u (desktop), `mx auto`. Careers is 695u on tablet.

**a. AboutHero (`#about-hero`)**
- Padding-top: 79u (mobile), 111u (tablet), 120u (desktop). Padding-bottom: 60u, 115u, 110u.
- Title wrap: centered column, gap 8u (mobile) / 16u.
  - Eyebrow: p2 `/40`, ~11c.
  - h1 at h3 token `#203435`: ~24c with an ~11c green tail. 1 line (2 on mobile).
- `.hero-image-wrap`:
  - Margin-top: 32u (mobile), 50u (tablet), 65u (desktop).
  - Height: 133u (mobile), 296u (tablet), 463u (desktop). Full container width. Radius 8u, overflow hidden.
  - `img` cover: PLACEHOLDER 2200×926 team or office photo.
- Motion (default trigger):
  - Eyebrow: `y 30u, autoAlpha` → 20f, Eas17.
  - Title: 32f, at +5f.
  - Image: `autoAlpha 0→1, scale .95→1`, 32f, Eas1739, at +15f.

**b. TitleWithDesc (`#title-with-desc`)**
- Layout: row, space-between on ≥481; column with gap 24u on mobile. Padding-bottom 110u (mobile) / 160u.
- h3: ~3c plus a ~7c green word.
- p2 `/70`, ~304c. Width 424u (desktop) / 340u (tablet).
- Motion (trigger 30%): `.text-anim` ×2, `y 50u, autoAlpha` → stagger 5f, 35f, Eas17.

**c. OurStory (`#our-story`)**
- Padding-bottom: 60u (mobile), 115u (tablet), 110u (desktop).
- `.content-wrap`: relative, z 10. Padding 24u (mobile) / 40u. Row, space-between on ≥481; column with gap 13u on mobile.
  - Absolute `.bg`: `#E4E4DC`, radius 12u, z -1.
  - h5 `#285D60`, ~9c.
  - p2 `/70`: three paragraphs separated by double `<br>`, ~812c total, 19–24 lines. Width 376u (desktop) / 300u (tablet).
- Motion:
  - `.text-anim` ×2: `y 100u→0, autoAlpha`, stagger 5f, 35f, Eas17.
  - `.bg`: `autoAlpha 0→1`, 35f, at +5f.

**d. Trusted marquee.** Homepage `LogoMarquee.jsx` with two changes:
- Edge fades use `bg-mask-gradient-orange`, because the page bg is `#F3F1EC`.
- Section padding: pt 80u; pb 110u (mobile), 160u (tablet), 260u (desktop).
- Title: ~9c + ~11c green + ~22c; 1 line on desktop, 2 on mobile. 12 logos.

**e. Careers (`#careers`)**
- Padding-bottom: 67u (mobile), 114u (tablet), 160u (desktop).
- Title wrap: row, space-between on ≥481; column with gap 24u on mobile.
  - h3 ~7c.
  - p2 `/70`, ~105c. Width 423u (desktop) / 339u (tablet).
- `.list-wrap`: mt 24u (desktop) / 32u; contents right-aligned on ≥481 (`items-end`).
  - `ul`: column, gap 16u (mobile) / 20u. Width 423u (desktop) / 339u (tablet). 2 rows.
  - Each `li`: border-bottom 1px `#203435` @ 20%, pb 16u (mobile) / 20u; the last has neither.
  - Each row is an `a` block: padding 8u, radius 8u. **Hover bg `#FCFBFA`**, `transition: all 200ms cubic-bezier(.4,0,.2,1)`.
    - Job title: p2 `#203435`, ~35c.
    - Tags line: p4 `/60`, truncated; 3 spans of ~11–25c.
  - `.btn-wrap` mt 24u: `a.btn.btn-red`, ~14c label (external link).
- Motion:
  1. Title: `y 50u`, 32f, Eas17.
  2. Desc: 32f, at +5f.
  3. Rows: `y 10u, autoAlpha`, stagger 5f, 35f, at +15f.
  4. Button: `y 30u, autoAlpha`, 32f, Eas1739, at +20f.

**f. BottomCta.** Same as the homepage.

**Heights:** the `div` is 3607u / 2753u / 2497u, including the CTA.

### 1.18 InnerPost (`section#inner-post`, `/security/`)

New: a long-form rich-text template.

**Layout**
- Inner `div` bg `#F3F1EC`. Padding-top: 120u (mobile), 179u (tablet), 174u (desktop). Padding-bottom 110u.
- Title wrap: width 272u (mobile), 464u (tablet), 1020u (desktop); centered. h1 at h3 token `#203435`, ~17c.
- `.article-wrapper`: width 272u (mobile), 522u (tablet), 596u (desktop); `mx auto`. Type per §0.1 "article".
  - `h2`: mt 40u.
  - `p`: mt 24u, color `#203435B3`.
  - `ul` with ≥2 items: disc, outside, padding-left 40u, flex column, gap 12u.
  - `a`: `#285D60`, underline. Hover `#285D6099`; visited `#285D60CC`. `transition 200ms cubic-bezier(.4,0,.2,1)`.
  - Defined but unused here: `hr` (1px `#285D6033`, mt 24u) and tables (`thead` bg `#203435`, `th` 13/20.8 `#F3F1EC`, 1px `#F3F1EC` borders, padding 10u 15u).
- Content: 2 h2 (~8c, ~22c), a 3-item bullet list (~100–143c), 4 paragraphs (~46–247c, one with an inline mailto link), and a 3-item list (~8–31c).
- **No CTA section** on this page; the footer follows directly.

**Height:** 1133u / 949u / 1086u.

**Motion and behavior**
- No reveals.
- JS: once the reader has scrolled to ≥75% of the article **and** 15s have passed, it calls `window.openNewsletterModal()` if that function exists. It is undefined on `/security/`, so nothing happens. Implement as a no-op hook.

---

## 2. Pages

Heights are per section, in u, at 1440 / 768 / 390. "=Home X" means reuse the homepage component unchanged.

### 2.1 `/platform/` (Platform overview). Total 15991 / 7382 / 8702.

| # | Block | Heights | Notes |
|---|---|---|---|
| 1 | PageHero, platform variant (§1.1) | 782 / 681 / 482 | h1 black; line art; 1204u visual |
| 2 | MailService (§1.3), 3 cards | 8087 / 1562 / 2219 | Desktop pinned accordion story; 9 images 1061×895 |
| 3 | FeatureList A (§1.4), 3 items | 2166 / 1385 / 1556 | Images 1404×910 |
| 4 | =Home `Benefits` (`#homepage-benefits`) | 1083 / 772 / 787 | Markup identical to the homepage |
| 5 | Ecosystem (§1.5) | 614 / 383 / 765 | |
| 6 | Engine (§1.6) | 2093 / 1433 / 1733 | |
| 7 | =Home `BottomCta` | 644 / 402 / 392 | |

### 2.2 PlatformProduct template: `/platform/payroll-compliance/` (base). Total 10002 / 6522 / 6012.

| # | Block | Heights |
|---|---|---|
| 1 | PageHero, landing variant (§1.1) | 782 / 931 / 493 |
| 2 | =Home `LogoMarquee` with section padding **110u y at all breakpoints** (`py-1110`); 12 logos (6+6) | 622 / 466 / 428 |
| 3 | BenefitsLanding (§1.9) | 835 / 768 / 795 |
| 4 | GetStarted (§1.11), 3 steps | 1760 / 813 / 683 |
| 5 | GenericCta (§1.8) | 671 / 718 / 400 |
| 6 | FeatureGroup (§1.3), 1 card | 2813 / 655 / 824 |
| 7 | FeatureList B (§1.4), 4 checks | 696 / 457 / 588 |
| 8 | =Home `Faq`, 5 items | 658 / 550 / 640 |
| 9 | =Home `BottomCta` | 644 / 402 / 392 |

**Per-page diffs against payroll:**

- **`/platform/tax-compliance/`**: the same template minus GetStarted and FAQ. Order: Hero → Trusted → BenefitsLanding → GenericCta → FeatureGroup → FeatureList B → BottomCta.
  - The hero h1 has **no green span** (single-color title).
  - Hero visual `hero-tax-compliance.png` 2406×932; mobile/tablet `-res` 1201×880 (renders 768×563u / 320×235u).
  - Total 7562 / 5047 / 4599.
- **`/platform/handbooks/`**: a **variant**. Order: Hero → FeatureList A (1 item, handbooks title/desc row variant, §1.4) → BenefitsLanding (PNG icons) → **BenefitGroup** (§1.10, with the Compliance CTA inside) → GetStarted (**4 steps**, handbook PNGs 846×528) → FAQ → BottomCta.
  - No Trusted, no FeatureGroup, no standalone GenericCta.
  - Hero h1 has a `<br>` before the green span; hero image 4760×1776 (desktop) / 2380×888 (`-res`, renders 768×287u / 320×119u).
  - FAQ: h3 has **no green span** and there are **8 items** (893 / 726 / 852).
  - Total 8005 / 6231 / 5767.
- **`/platform/entity-compliance/`**: a **variant**. Order: **HeroStatic** (§1.2) → Trusted (`py-1110`) → **ScrollTabs** (§1.7, 4 tabs) → GenericCta → GetStarted (3 steps) → FeatureList B → BottomCta.
  - No BenefitsLanding, FeatureGroup or FAQ.
  - Total 9186 / 6748 / 6274.

### 2.3 `/solutions/` (= `/solutions/smb/`). Total 16310 / 10962 / 11349.

| # | Block | Heights | Notes |
|---|---|---|---|
| 1 | HeroStatic (§1.2) | 694 / 574 / 387 | Title ~47c with `<br>` |
| 2 | ScrollTabs (§1.7) + inline Compliance CTA | 3984 / 3129 / 3370 | 4 tabs; `pl 40u` on links |
| 3 | Ecosystem (§1.5) | 614 / 383 / 765 | Same content as platform |
| 4 | =Home `Roadmap` | 3795 / 1539 / 1388 | Identical markup and lotties |
| 5 | =Home `Benefits` | 1083 / 772 / 787 | Identical |
| 6 | =Home `Testimonials` | 774 / 552 / 647 | Identical (`testimonials-NG06…`) |
| 7 | GetStarted (§1.11), 3 steps | 1760 / 813 / 683 | |
| 8 | =Home `Pricing` | 1782 / 1485 / 1521 | Identical markup |
| 9 | =Home `Faq`, 5 items | 658 / 550 / 640 | |
| 10 | =Home `BottomCta` | 644 / 402 / 392 | |

### 2.4 SolutionDetail template: `/solutions/for-hr/`. Total 12177 / 11163 / 9422.

| # | Block | Heights |
|---|---|---|
| 1 | PageHero, landing variant (no `<br>`) | 782 / 898 / 493 |
| 2 | =Home `LogoMarquee`, `py-1110`, 12 logos | 622 / 466 / 454 |
| 3 | ProblemList (§1.12) | 559 / 546 / 637 |
| 4 | FeatureCardGrid (§1.13) | 971 / 1653 / 1591 |
| 5 | BenefitsLanding (title has `<br>`) | 975 / 821 / 879 |
| 6 | FeatureGroup, 1 card (mixed-aspect images) | 2813 / 655 / 846 |
| 7 | GenericCta | 671 / 757 / 395 |
| 8 | ResourceList (§1.14) | 1194 / 2866 / 1681 |
| 9 | GetStarted, 3 steps | 1863 / 832 / 702 |
| 10 | =Home `Faq` with **bg `#F3F1EC`**, h3 without green span, **4 items** | 560 / 505 / 584 |
| 11 | =Home `BottomCta` | 644 / 402 / 392 |

**Diffs:**
- **`/solutions/smb/`**: not a SolutionDetail page. It is the `/solutions/` overview (§2.3), rendered identically.
- **`/solutions/for-telehealth/`**: a **variant**. Order: PageHero (landing; h1 has `<br>`; hero-visual 2406×932) → **LeadForm** (§1.15) → Trusted (`py-1110`, **only 1 ticker row** of 6 logos; the second `ul` is empty, height 0) → BenefitsLanding → GenericCta → FeatureList B **with red button** → **TestimonialsLite** (§1.16) → BottomCta.
  - No ProblemList, FeatureCardGrid, FeatureGroup, ResourceList, GetStarted or FAQ.
  - Heights: 782 / 855 / 510 / 837 / 671 / 696 / 892 / 644 at 1440. Total 6409 / 5722 / 5176.

### 2.5 `/pricing/`. Total 3606 / 3291 / 3379.

| # | Block | Heights |
|---|---|---|
| 1 | =Home `Pricing` (`#homepage-pricing`; **markup identical to the homepage**, including the pin and collapse) | 1782 / 1576 / 1578 |
| 2 | =Home `Faq`, 5 items | 658 / 550 / 640 |
| 3 | =Home `BottomCta` | 644 / 402 / 392 |

**Structure** (per CLONE_SPEC §12):
- 3 plan cards, each with: employees label, plan name, description, price, per-month label, platform-fee value and fee label.
- Comparison accordion: 1 item with 10 rows × 3 plan columns. Values are a check icon or short text.
- 2 footnotes.
- **No billing toggle.**

**Number formats**
- Price: `$` + integer with no decimals, followed by an inner span `/xx` (a slash and a 2-letter period unit, rendered at 0.75em on desktop). Some cards show a bare `$NNN` with no unit span.
- Platform fee: `$N,NNN` with a thousands comma, wrapped in short words before and after (pattern "xx $N,NNN xxxxxxxx"); one card shows a ~14c text label instead.
- On this page the section is the first block, so its desktop padding-top of 170u clears the header.
- The 768 height (1576u) differs from `/solutions/` (1485u) because the comparison accordion's open-row count differs at measurement time. Markup is the same.

### 2.6 `/about/`

AboutHero → TitleWithDesc → OurStory → Trusted (orange fades) → Careers → BottomCta (§1.17). Total 4129 / 3516 / 3267.

### 2.7 `/security/`

InnerPost (§1.18) → footer. No CTA. Total 1655 / 1712 / 1854.

---

## 3. Reuse map (homepage component → marketing usage)

| Homepage component | Used unchanged | Used with variant props |
|---|---|---|
| `Navbar`, `Footer` | all pages (no `Banner`) | none |
| `BottomCta` | all pages except `/security/` | none |
| `Faq` | payroll, solutions, pricing | handbooks (8 items, plain title), for-hr (bg `#F3F1EC`, 4 items, plain title) |
| `Benefits` | platform, solutions | BenefitsLanding (§1.9): `py 110u`, img icon with hover opacity, gap fix |
| `LogoMarquee` | none | `py 110u` on payroll, tax, entity, for-hr; single row on telehealth; orange fades plus homepage padding on about |
| `Roadmap`, `Testimonials`, `Pricing` | solutions (and pricing for `Pricing`) | TestimonialsLite (§1.16) on telehealth |
| `PeaceOfMind` | none | GetStarted (§1.11): images instead of lotties, 3–4 steps |
| `RoleTabs` (tabs + CTA card) | none | BenefitGroup (§1.10, 3 tabs, no gradient); CTA card alone = GenericCta (§1.8) and inline on solutions |
| `Hero`, `Statement`, `Everything` (homepage versions) | not used | none |

**New components to build:**

| Component | Spec |
|---|---|
| PageHero (2 variants) | §1.1 |
| HeroStatic | §1.2 |
| FeatureGroup/MailService | §1.3 |
| FeatureList A/B | §1.4 |
| Ecosystem | §1.5 |
| Engine | §1.6 |
| ScrollTabs | §1.7 |
| ProblemList | §1.12 |
| FeatureCardGrid | §1.13 |
| ResourceList | §1.14 |
| LeadForm | §1.15 |
| About blocks | §1.17 |
| InnerPost | §1.18 |
| `.btn`/`.btn-red` | §0.1 |

## 4. Motion summary (new blocks)

| Block | Trigger | What |
|---|---|---|
| PageHero | `top bottom-=30%`, once | Eyebrow/title/desc `y 30u` → 0 (20f/32f/32f at 0/+5f/+10f, Eas17). Visual `scale .95`, autoAlpha (32f, Eas1739, +15f) |
| HeroStatic | section active | Lottie `Solutions_hero` loops (5.03s). No text animation |
| FeatureGroup | Desktop pin `center-=5% center` → `.spacing` bottom (2000u), scrub | Progress → accordion index. Image swap: out .333s Eas66, then in .333s Eas17. Accordion content .5s `cubic-bezier(.17,.17,.43,1)`. Title color .5s |
| FeatureList A / Engine | Per item `top+=25% bottom` (A) / `top bottom-=25%` (Engine), once | Text `y 50u` .5s Eas17. List `li` `y 10u`, stagger 5f, .583s. Image `scale .98` .333s Eas1739 (+8f) |
| FeatureList B | none | Static |
| Ecosystem | `top bottom-=30%`, once | Text `y 100px`, stagger 5f, .583s Eas17. Items `y 10u`, stagger 5f (+5f) |
| ScrollTabs | Desktop pin `top top+=20%` → spacer (3000u), scrub | `round(progress×3)` → tab. Out `scale .86` .267s Eas49, then in .3s Eas1739. Hash deep-link |
| GenericCta | `top bottom-=10%` | Card `y 100px→0` .533s Eas17. Lottie loops in view |
| GetStarted / BenefitGroup / TestimonialsLite / BenefitsLanding | as homepage | as homepage |
| About blocks | default / 30% | see §1.17 |
| Hovers | none | BenefitsLanding icon opacity .4→1 (300ms). Careers row bg → `#FCFBFA` (200ms). Article link color (200ms). `btn-red`: none |

No new libraries: GSAP, ScrollTrigger, CustomEase, lottie-web and Splide only, as on the homepage.

## 5. Not measurable / caveats

- **HubSpot form** (`/solutions/for-telehealth/`) is injected by HubSpot's script. Its field set and labels are what rendered on 2026-10-19 (4 text fields + submit). Validation states and post-submit UI were not triggered, and its markup can change at HubSpot's side.
- **Lottie and screenshot artwork** is proprietary. Only dimensions, frame rate and duration were recorded.
- **Pinned-section mid-states.** ScrollTabs and FeatureGroup were captured with some items mid-transition (e.g. `scale .86`, opacity 0). Resting geometry in §1.3 and §1.7 is derived from the class values and the fully-settled items.
- **`/solutions/` vs `/pricing/` pricing heights at 768** differ (1485u vs 1576u) because the comparison accordion's open-row count changes with scroll/ScrollTrigger refresh. Markup is the same.
- **Newsletter modal** (`window.openNewsletterModal`) is referenced on `/security/` but not defined there, so it could not be observed.
- **Hover screenshots** were not taken. Hover values come from the shipped CSS rules quoted above.
- **Mobile LeadForm** renders a 2-column grid at 390. This looks unintended but is what ships; it is recorded as measured.
