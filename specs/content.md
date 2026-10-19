Source: https://mosey.com/

# Mosey content templates: clone build spec

Measured live on 2026-10-19 with headless Chromium (Playwright 1.63) at 1440x900, 768x900 and 390x900. Values come from `getComputedStyle`/`getBoundingClientRect` after a full scroll-through (lazy images loaded, reveals fired), from the shipped CSS `/assets/mobileMenu-CEbHqbvC.css`, and from the per-page Vite entry modules.

**Read `/Users/riyaghosh/V3/mosey/CLONE_SPEC.md` §0 first.** It defines the fluid unit **u**, the type-scale tokens (h0–h6, p1–p4, cp*, segment, nav), the color tokens, `.medium-container`/`.base-container`, the eases (Eas17 etc.) and `f(n)=n/60 s`, the header, footer, announcement banner and Bottom CTA. This file does not repeat them. Unless marked **px**, all numbers below are u. Values are listed as mobile / tablet / desktop. At 390 wide, 1u = 1.21875px. At 768 and 1440, 1u = 1px.

**Two unit systems on these pages.** Most templates use u classes (`*-1NNN`). Several blocks were pasted from Tailwind UI and use **stock Tailwind rem/px that do NOT scale**: the in-article CTA card, the HubSpot form, the resource "related" grids, "More from the blog", the author-page wrapper and `/subscribe/`. These are marked **px**. Build them in px, not u.

**Breakpoint quirk that matters.** The site's Tailwind `screens` only define `md` (481) and `lg` (1025). **`sm:` and `xl:` classes are dead and never apply.** Verified: at 768, `sm:grid-cols-2` is still 1 column, `sm:aspect-[2/1]` is still 16/9, and `sm:py-32` is still 96px. Ignore every `sm:`/`xl:` class you see in the markup.

**Token reminder used below.** `bg-white` = `#F3F1EC` and `text-white` = `#F3F1EC` (overridden). `main_white` = `#FCFBFA`. `green2` = `#516B66`. `btn-red` bg = `#C74E5C`.

**Content policy.** Copy is given only as role plus approximate length. Every photo, thumbnail or illustration is a PLACEHOLDER with size, aspect and fit. Simple shapes are marked REDRAW. Data models list field names and counts, never values.

---

## 0. Route map, redirects, slug patterns

| Route | Status | Template |
|---|---|---|
| `/blog/` | 200 | Blog index (§1) |
| `/blog/page/N/` (N = 2…43) | 200 | Blog index, page N. `/blog/page/1/` is a meta-refresh to `/blog/` (noindex). |
| `/blog/<slug>/` | 200 | Blog post (§2). 423 posts in the sitemap. |
| `/authors/` | 200 | Authors index (§3) |
| `/authors/<slug>/` | 200 | Author detail (§4). 5 authors, including `editorial-staff`. |
| `/resources/` | 200 | Resources index (§5). Same list template as the blog index. |
| `/resources/us/<category>/` | 200 | Resource category hub (§6). There are 6 hubs. |
| `/resources/us/<category>/<leaf-slug>/` | 200 | Resource guide article (§7) |
| `/resources/us/california/` | **404** | **There is no state hub.** The URL model is category-first, not state-first (see §0.1). |
| `/p/` | **404** | Netlify's default "Page not found" card (system-ui font, not site chrome). It is listed in the sitemap but dead. Do not build a guides index unless asked. If one is wanted, reuse the §5 list template. |
| `/p/<guide>/` | 200 | Gated guide landing (§8). 8 guides. |
| `/subscribe/` | 200 | A plain "Thanks" confirmation page (§9). It has no form. |

No URL redirects to another domain. External links are not routes: the in-article CTAs and one resources link go to `pages.mosey.com/...`, and one resources item goes to `app.mosey.com/compliance-check/about`.

### 0.1 Resources data model (slugs only)

Hierarchy: `/resources/us/{category}/{leaf}/`. Each leaf belongs to a state, which is encoded in the slug. The 51 state slugs (50 states + DC) come from the payroll set: `alabama, alaska, arizona, arkansas, california, colorado, connecticut, delaware, district-of-columbia, florida, georgia, hawaii, idaho, illinois, indiana, iowa, kansas, kentucky, louisiana, maine, maryland, massachusetts, michigan, minnesota, mississippi, missouri, montana, nebraska, nevada, new-hampshire, new-jersey, new-mexico, new-york, north-carolina, north-dakota, ohio, oklahoma, oregon, pennsylvania, rhode-island, south-carolina, south-dakota, tennessee, texas, utah, vermont, virginia, washington, west-virginia, wisconsin, wyoming`.

| Category slug | Leaf slug pattern | Count | Coverage |
|---|---|---|---|
| `payroll` | `{state}-payroll-tax-registration` | 51 | all states |
| `employee-handbook` | `{state}-employee-handbook` | 51 | all states |
| `secretary-of-state` | `{state}-annual-report` and `{state}-foreign-qualification` | 51 + 51 | all states, 2 topics each |
| `sales-tax` | `{state}-sales-tax-license` | 46 | not alaska, delaware, montana, new-hampshire, oregon |
| `agencies` | `{agency-slug}` (free-form; 185 start with `{state}-`, 486 do not) | 671 | e.g. california has 6 state-prefixed, and its leaf pages list 11 "Agencies in California" |
| `local-payroll` | `{locality}-{st}-payroll-tax-registration` (2-letter state code) | 815 | oh 443, ky 225, pa 73, al 28, mi 23, wv 10, co 4, or 3, nj 2, mo 2, ny 1, de 1 |

**Per-state topic set** (the data model for one state, e.g. california): `payroll/{s}-payroll-tax-registration`, `employee-handbook/{s}-employee-handbook`, `secretary-of-state/{s}-annual-report`, `secretary-of-state/{s}-foreign-qualification`, `sales-tax/{s}-sales-tax-license` (46 states), `agencies/*` (0–N per state), `local-payroll/*-{st}-*` (12 states only).

Leaf record fields: `category, slug, state, title, date (updated), body (rich), inlineCta{title, desc, buttonLabel?, buttonHref?}, sourceLinks[] (0–1 list), related{sameCategory[6], agenciesInState[], localities[]?, blogPosts[3]}`.

---

## 1. Blog index `/blog/` and `/blog/page/N/`

JS: `listSection` (no animation; `_activate` is empty) plus `ctaSection`. **There is no reveal motion on this page.** There are no filters, categories, tags, search or read-time, and **no h1** (only an eyebrow span).

### Data model
`posts[10 per page]{title, excerpt, slug}` and `pagination{current, total=43, prevHref?, nextHref?}`. Title runs about 25–75 chars (1–2 lines). Excerpt runs about 50–750 chars. It is **not clamped** and is shown in full. Page 1 ranges from 2 to 9 lines.

### Layout (`section#posts-list` > `.container-list` flex column, items-center)

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| Title band `.title-wrap` (full width, bg `#F3F1EC`, centered column) | pt 122, pb 40, gap 8 | pt 95, pb 50, gap 16 | pt 120, pb 60, gap 16 |
| Eyebrow span (~4 chars) | p2 token, `main_green/40` (`#20343566`) | same | same |
| List `.list-posts` width | 272 | 704 | 1101 (x 169.5 at 1440) |
| List padding / row gap | pt 60, pb 32, gap 32 | pt 80, pb 54, gap 54 | pt 80, pb 54, gap 54 |
| Row `article` | column, gap 16, pb 32 | row, space-between, pb 54 | row, space-between, pb 54 |
| Title column `.title-wrap` width | 100% | 249 | 318 |
| Title h2 | h5 token (17/22.1), `#203435` | h5 (17/22.1) | h5 (24/31.2, -0.96) |
| Summary column width | 100% | 339 | 530 |
| Summary column gap | 16 | 32 | 32 |
| Excerpt p (`text-p1-b`, **new token**) | 13/20.8, ls -0.01em, 450 | 14/22.4 | 17/27.2 |
| Excerpt color | `main_green/70` | same | same |
| Divider (after each row) | 1u tall, bg `#E4E4DC`, full list width | same | same |

The list area below the title band has no background, so the browser default white (#FFF) shows. Only the title band is `#F3F1EC`.

**"Read more" arrow button `.btn.btn-arrow`** (new component, also used by later templates)
- `display:flex; align-items:center; gap 8u; padding 6u 8u; radius 6u; width max-content; border 1px transparent; transition: all .4s ease`.
- Label: `text-button-large` (**new token**): 10/16 ls -0.02u (mobile), 12/19.2 ls -0.02u (tablet), 14/22.4 ls -0.28u (desktop). Weight 500, `#203435`. About 9 chars.
- Icon: inline SVG, viewBox 0 0 16 14, rendered **16x14px fixed**, stroke `#C74E5C`, path `M13 6l2 2m0 0-2 2m2-2H1V9.5`, fill none. REDRAW (small right-hook arrow).
- Hover: background `#E4E4DC` (0.4s).
- Size: 87.7x29.6u (mobile), 100.8x33.2u (tablet), 108.2x36.4u (desktop).

**Pagination** (`.pagination-wrap`: width = list width; flex, space-between, items-end; outer wrapper pb 110 (mobile) / 40 (tablet and desktop))
- Left: counter `NN/TT`, zero-padded current page / total (e.g. "01/43"). h5 token, `#203435`.
- Right: `.pagination` flex, gap 10u, holding two `.btn.btn-circle`:
  - Size 32u (mobile and tablet) / 46u (desktop). `border-radius:50%`, bg `#CFD7D466`. They also inherit `.btn` padding (5u 9u / 6u 16u), 1px transparent border and `transition .4s`.
  - Prev icon: viewBox 16x12, stroke `#285D60`, left arrow `M15.2174 5.99994H1.30436m0 0L5.94205 1.13037M1.30436 5.99994 5.94205 10.8695`. Next is the mirror: `M1.04346 5.99994H14.9565m0 0-4.6377-4.86957m4.6377 4.86957-4.6377 4.86956`. Rendered 12x12 (desktop and tablet), 12.4x9.8u (mobile). REDRAW.
  - Enabled: wrapped in `<a href>`. Hover bg `#CFD7D4`.
  - Disabled: a bare `div`, `opacity:.2; cursor:default`. Prev is disabled on page 1 and next on page 43. Page 2's prev links to `/blog/`.
- Page change is a full navigation, with no transition.

After the list comes the **Bottom CTA, reused** (`BottomCta.jsx`, CLONE_SPEC §14, identical), then the footer.

Measured page heights (page 1): 6060u (mobile), 5845u (tablet), 5813u (desktop).

---

## 2. Blog post `/blog/<slug>/`

Measured on `right-to-work-states` (recent; lists, 2 inline CTAs) and `california-economic-nexus-test` (table, ordered list, inline CTA). A sample of 50 posts was checked for variants: 50/50 have a featured image, 19/50 have inline CTA cards, 2/50 have tables, 3/50 have `<ol>`, 26/50 have `<strong>`, 5/50 have `<em>`, and 1/50 has an embedded HubSpot form (`multi-state-compliance-quiz`). 0/50 have blockquote, code/pre, hr, h4–h6 inside the article, iframes or video.

**Absent (do not build):** TOC, sticky sidebar, reading progress bar, author bio box, related-posts block, share buttons, categories/tags, read time, comments and breadcrumbs. Some posts end with an in-body `h3` "Read more…" + `ul` of links. That is ordinary content, rendered by the prose styles.

JS: `innerPostSection` plus `ctaSection`. **There are no reveals.** The only behavior is a newsletter-modal trigger: scroll past 75% of the `<article>` **and** wait 15s, then call `window.openNewsletterModal()`. **That function is not defined anywhere in the shipped JS, so it never fires.** Skip it, or stub it as a no-op.

### Data model
`title (~38–75 chars, 1–2 lines), author{slug, name, avatar}, date ("Mon D, YYYY"), body (HTML/markdown)`. The featured image is the first body element (`<p><img alt>`), not a separate field. `article:section` meta is always "blog", so there are no categories.

### Layout (`section#inner-post` > one wrapper div, bg `#F3F1EC`, covering the whole post)

| Element | Mobile | Tablet | Desktop |
|---|---|---|---|
| Wrapper padding | pt 120, pb 110 | pt 179, pb 110 | pt 174, pb 110 |
| `.title-wrap` width (centered, text-center) | 272 | 464 | 1020 |
| h1 | h3 token (24/26) | h3 (28/33.6) | h3 (38/45.6), `#203435` |
| Byline `figure` | flex centered, gap 8, mt 16 | same | same |
| Avatar `.icon-wrap` | 23x23, radius 6, overflow hidden | 26x26 | 26x26 |
| `figcaption` | flex, gap 16, p2 token (12/19.2) | p2 (12/19.2) | p2 (15/24) |
| `.article-wrapper` width (centered) | 272 | 522 | 596 |
| Gap from byline to article | 24 (first p margin-top) | 24 | 24 |

Avatar: PLACEHOLDER 80x80, 1:1, `object-fit: cover`. It ships as an inline base64 JPEG.

`figcaption` children, in order:
1. Author link (~12 chars), `#203435`, `hover:underline`.
2. A "|" separator, `#285D60` at 70%.
3. Date (~12 chars), `main_green/70`.

### Prose typography (`.article-wrapper`). New type roles from the shipped CSS, all measured.

There is no margin-bottom anywhere. Spacing comes only from margin-top on p/h2/h3/table/hr. **Lists have no margin-top**, so a `ul`/`ol` sits flush against the element above it. This is a real quirk: a list after a paragraph has a 0 gap. Reproduce it.

| Role | Mobile | Tablet | Desktop | Other |
|---|---|---|---|---|
| `p` | 13/20.8, ls -0.01em, 450 | 14/22.4 | 17/27.2 | color `#203435B3`; mt 24 |
| `h2` | 17/22.1, ls -0.68, 500 | 17/22.1 | 24/31.2, ls -0.96 | `#203435`; mt 40 |
| `h3` | 13/20.8, ls -0.26, 500 | 13/20.8 | 18/28.8, ls -0.36 | `#203435`; mt 24 |
| `h4`/`h5`/`h6` | not styled (not present in content) | | | fall back to the p rules, or omit |
| `ul`, `ol` | font = p | font = p | font = p | `display:flex; flex-direction:column; gap 12u`; color `#203435B3`; margin 0 |
| `ul` (1 item) | | | | `list-style:none; padding-left:0` |
| `ul:has(li:nth-child(n+2))` | | | | `disc outside; padding-left 40u` |
| `ol` | | | | `decimal outside; padding-left 40u` |
| `li` | | | | no margins; nested `<p>` inside li keeps mt 24 unless inline-styled |
| `a` | | | | `#285D60`, underline (color = text color); `:visited #285D60CC`; `:hover #285D6099`; `transition: all .2s cubic-bezier(.4,0,.2,1)` |
| `strong` | | | | weight 500, `#203435` |
| `em`, `i` | 12/19.2, ls -0.12 | 12/19.2, ls -0.24 | 15/24, ls -0.24 | italic, 450, `#203435B3` (smaller than body text: a quirk) |
| `blockquote` | 18/28.8, ls -0.24 | 20/32 | 22/35.2 | italic, 450, `#203435B3`, width 100%; no border or margin |
| `hr` | | | | mt 24, `border:1px solid #285D6033` |
| `img` | | | | width 100%, height auto (CSS says `height:100%`, which resolves to auto), radius 8u, cover, opacity 1 |
| `code`/`pre` | no rules, none in content | | | |

The featured image is the first element (in a `p`, so mt 24). Rendered: 272x181.5 (mobile), 522x348.3 (tablet), 596x397.6 (desktop). Source is 640x427 JPEG (3:2). PLACEHOLDER 640x427, 3:2, cover, radius 8u.

**Tables.** All values are u, identical at every breakpoint. There is no responsive wrapper.
- `table`: width 100%, mt 24, `border:1px solid #285D6033`, radius 8u (not visibly rounded because of collapsed borders), mx auto.
- `thead`: bg `#203435`.
- `th`: 13/20.8, ls -0.26, 500, color `#F3F1EC`, padding 10u 15u, `border:1px solid #F3F1EC`, text-align left (inline style). Measured row height 41.8 (desktop) / 62.6 (tablet), due to wrapping.
- `td`: 12/19.2, ls -0.12, 450, `#203435B3`, padding 5u, `border:1px solid #285D6033`.
- Sample: 4 columns, 1 header row, 3 body rows.
- **Mobile quirk:** a 4-column table renders 381u wide inside a 272u column. It overflows to the right and is clipped by `main{overflow:hidden}`, so there is no horizontal scroll. Recommended for Build: wrap tables in `overflow-x:auto` on mobile (note it as a deliberate deviation), or reproduce the clipping.

**Unused prose classes** (defined, never seen): `.img-with-mask` (mt 40/70, h 124/320/463, radius 8) with `.mask` (abs, radius 8); `.article-promo` (h2 margin 0, color `#F3F1EC`; links `#F3F1EC`).

### Inline CTA card (new component, appears 0–2 times per post, also on resource leaves). It is in **px**, not u.

Markup: `div.mx-0 > div.mx-auto.my-10 > div.card`.

- **Outer:** margin 40px top and bottom (`my-10`).
- **Card:**
  - `position:relative; isolation:isolate; overflow:hidden`.
  - bg `#516B66` (green2), radius 8u, text-align center.
  - Padding 16px (<481) / 40px (≥481).
  - `box-shadow: 0 25px 50px -12px rgba(0,0,0,.25)`.
  - Children are spaced by `space-y-4` (16px top margin on each after the first).
- **Heading h2** (~36–42 chars): the article h2 sizes apply (17/22.1 on mobile/tablet, 24/31.2 on desktop). Color `#FFFFFF` (inline), margin 0. The `text-h4-*` classes on it lose to `.article-wrapper h2`.
- **Paragraph** (~70–130 chars): `hidden` below 481px; shown at tablet and desktop. Article p sizes, color `rgba(243,241,236,.7)`.
- **Button row** (optional; present on blog CTAs and handbook leaves, absent on most resource leaves): flex, centered, column-gap 24px. Holds `a.btn.btn-red`:
  - bg `#C74E5C`, text `#FFFFFF` (inline), `text-button-large` token, weight 500, no underline.
  - Padding 5u 9u (<1025) / 6u 16u (desktop). Radius 8u. Border 1px transparent.
  - Label ~11–18 chars. Size 109x27.6u (mobile), 128x31.2 (tablet), 155x36.4 (desktop).
  - **Hover:** no visible change. The shipped `.btn-red:hover` rule is malformed CSS, and the inline `color:#fff` beats `.article-wrapper a:hover`.
- **Decoration:** an SVG behind the content (`-z-10`), REDRAW.
  - Size `64rem` = **1024x1024px** fixed. Position absolute, `left:50%; top:50%; translateX(-50%)`, with no Y translate. The circle is horizontally centered and its top edge sits at the card's vertical midpoint.
  - Content: `<circle r=512>`, fill `radialGradient(#006265 → #CAEAEA)`, `fill-opacity .7`.
  - Masked with `mask-image: radial-gradient(closest-side, white, transparent)`.
  - Result: a soft teal glow rising from the lower half of the card.
- Measured card heights: 111u (mobile, no p), 210 (tablet), 234 (desktop, with button) / 181.6 (desktop, no button).

### Embedded HubSpot form variant (in-article; 1 in 50 posts)
`a[name=hubspot-form-a]` (abs, 0x0), followed by `section.bg-white.section-container` (bg `#F3F1EC`, full article width) containing:
- An h3 (~22 chars, article h3 sizes, mt 24). Its `text-h3-*` classes lose to `.article-wrapper h3`.
- `div.pt-3` (12px) holding the HubSpot form (§10). Fields: firstname*, lastname*, email*, company*, plus hidden utm_campaign/utm_content/utm_medium/utm_source/utm_term. Submit label ~14 chars.

Then the **Bottom CTA, reused**, then the footer. Post page heights: 14734 (mobile), 12074 (tablet), 13967u (desktop) for a ~2,200-word post.

---

## 3. Authors index `/authors/`

Different, simpler markup (old Tailwind px wrapper).

- **Outer:** `div.bg-white.pb-24.min-h-screen`, bg `#F3F1EC`. pt 80u (mobile) / 111u (tablet) / 120u (desktop). pb 96px. min-height 100vh.
- **Title:** h1, h3 token, centered, `#203435`, ~7 chars. **There is no eyebrow, and there is 0 gap below the h1:** the list starts immediately under the h1's line box (a quirk).
- **Wrapper:** `div` with width 384px (`w-96`, mobile) / 66.667% (tablet) / 768px (desktop), mx auto, px 24px, mb 96px. Contains `.article-wrapper` (272/522/596u), which **overflows** the 2/3 wrapper on tablet: it starts at x 152 and is 522 wide inside a 464 content box. Reproduce or center it.
- **List:** `.article-wrapper ul` (prose rules): disc, pl 40u, gap 12u, p sizes. 5 `li > a` (prose link style), each ~12–18 chars.
- **Data model:** `authors[5]{slug, name}`.
- **Motion:** none. There is no Bottom CTA on this page. Footer follows.

## 4. Author detail `/authors/<slug>/` (incl. `/authors/editorial-staff/`)

- **Outer:** bg `#FBFCFC` (`bg-sage-50`), pb 96px, min-h-screen.
- **Title band:** same as the blog-index band (§1): `#F3F1EC`; pt 122/95/120; pb 40/50/60; gap 8/16/16; centered. Contains:
  - Eyebrow (~6 chars, p2, `main_green/40`).
  - h1 name (h3 token, ~12–15 chars).
- **Wrapper:** the same px wrapper as §3, with pt 40u (mobile) / 50u (tablet) / 60u (desktop). `.article-wrapper` inside, in order:
  1. **Photo row:** flex, justify-center. `img` `!w-1/2` = 136u (mobile), 261u (tablet), 298u (desktop) square, radius 8u, cover. PLACEHOLDER 600x600, 1:1, cover.
  2. **h2** "Bio" label (prose h2, mt 40).
  3. **p** bio (~170–235 chars). An optional second p holds one external link (~33 chars).
  4. **h2** "Articles" label.
  5. **ul** of post links (prose list). Paul Boynton has 114 items. **Editorial staff has 0** (an empty `ul`, height 0, `list-style:none` because it has fewer than 2 items).
- **Data model:** `author{slug, name, photo, bio, socialLink?}`, `articles[]{title, slug}` (0–114).
- **Motion:** none. There is no Bottom CTA. Footer follows.

---

## 5. Resources index `/resources/`

Same template and classes as the blog index (§1: `section#posts-list`, title band, `.list-posts`, rows, dividers). The title band adds an **h1** (h3 token, ~46 chars, wraps to 2 lines on mobile) below the eyebrow (~9 chars). Differences in each row:

- **Title column:** h2 (h5 token, ~14–48 chars), then 1–2 `p.pt-4` descriptions. Each has padding-top 16px (13.1u on mobile) and uses the p2 token, `main_green/70`, ~50–140 chars.
- **Summary column:** `space-y-3` (12px between items), with no gap utility. It holds N repeated `ul > li.list-none > a > h3.text-lg`.
  - **Link styling is unstyled Tailwind:** `h3` 18px/28px **fixed px**, weight 400, color **#000** (inherits; no `text-main_green`). Each label ends with " »".
  - No hover style, no transition.
- **Groups (9 rows, 1745 links in total)**, by link count: newsletter 1 → `/p/compliance-newsletter/`; guides 8 (5 `/p/*`, 1 pages.mosey.com, 1 app.mosey.com, `/agency-mail`); payroll 51; secretary-of-state annual-report 51; secretary-of-state foreign-qualification 51; sales-tax 46; agencies 671; employee-handbook 51; local-payroll 815.
- **Dividers:** only 7 rows render a divider.
- Page height: about 72,900u at desktop. It is a single page with no pagination, filters or search.
- **Data model:** `groups[9]{title, descriptions[1–2], links[]{label, href}}`. Bottom CTA, reused.
- **Motion:** none.

## 6. Resource category hub `/resources/us/<category>/`

Identical template to §5, with:
- 1 row (2 rows for `secretary-of-state`).
- h1 ~26 chars.
- Row title ~61 chars, 1–2 description paragraphs, then a link list.

Link counts: payroll 51, employee-handbook 51, sales-tax 46, secretary-of-state 51+51, agencies 671, local-payroll 815.

Desktop list height = 28 + (n-1)·40 px (28px line + 12px space).

Bottom CTA, reused.

---

## 7. Resource guide article `/resources/us/<category>/<leaf>/`

Measured on `payroll/california-payroll-tax-registration`, `employee-handbook/california-employee-handbook` and `agencies/california-franchise-tax-board`. The structure was confirmed on sales-tax, secretary-of-state and local-payroll leaves. **Same JS as a blog post** (innerPostSection, which does nothing visible) plus ctaSection.

### Top: the post template (§2) with these differences
- **`.title-wrap` width is 272 / 464 / 464u.** There is no `lg:w-2020`, so desktop titles wrap to 2 lines (h1 ~28–35 chars, 91.2u tall at desktop).
- **Byline:** `figure` with a date only (~12 chars, `main_green/70`). No avatar, no author.
- **Article body** uses §2 prose. Typical structures:
  - **payroll / sales-tax / sos:** p intro → inline CTA card (no button) → h2 → p → h3 → p → `ol.list-decimal` of steps. Each step is `li > span[font-weight:500] + br + p[margin-top:.5rem]`: bold step title ~50–70 chars, then an 8px-gap description ~60–280 chars. Then h3 "sources" → `ul.mt-4` (mt 16px), 1 external link.
  - **employee-handbook:** long (~10 h2, ~45 h3). Intro, then inline CTA card **with button** ("Get Started"-type, ~11 chars), then h2 sections each holding many h3 + p pairs.
  - **agencies:** 2 short paragraphs inside `<article>`. The inline CTA card sits **outside** `<article>` but inside `.article-wrapper`.
  - h3 elements may carry `text-h4-*` classes. These lose to `.article-wrapper h3`, so render article h3.
- Main wrapper pb 110, as on posts.

### Related blocks (new component "ResourceLinkGrid"). Tailwind UI markup, in **px**.

Present per leaf:

| Leaf category | Blocks, in order |
|---|---|
| payroll, sales-tax, employee-handbook | Same-category grid (6 items, abbreviation chip) → "Agencies in {State}" grid (state's agencies, slim chip) → "More from the blog" |
| local-payroll | Localities grid (~12, slim chip) → second slim grid (~207 items) → "More from the blog" |
| secretary-of-state, agencies | "Agencies in {State}" grid → "More from the blog" |

**Block wrapper:**
- `div.bg-main_white.border-t`: bg `#FCFBFA`, top border 1px `#E5E7EB`, full width.
- Vertical padding: the first block is py 32px with inner py 56px. Later grid blocks are py 56px with inner py 0. On agencies leaves, the first block is py 56px with inner py 96px.

**Inner container:** `max-w-7xl` (1280px) centered. Padding-x 16px (<1025) / 32px (desktop). At 1440, x 80 → content 112–1328.

**Heading** `h2.mb-12`:
- h3 token: 24/26 (mobile), 28/33.6 (tablet), 38/45.6 (desktop).
- **Color #000** (no color class). Length ~22–44 chars.
- mb 48px.
- Handbook variant: the h2 is followed by `p.mt-2.mb-12` (17/23.8 at desktop, p1 token, `main_green/70`, ~65 chars), and the h2 drops mb.

**Grid** `ul`:
- mt 12px, `display:grid`, gap 20px.
- Columns: 1 (<1025) / 3 (desktop, each 392px at 1440). `sm:` is dead.

**Grid item** `li`: flex, radius 6px, height 49.8 (desktop) / 42.8 (tablet) / 38.1u (mobile).
- **Left chip:**
  - Width 64px (`w-16`, same-category grid; holds the 2-letter state abbreviation, 14px/20px, color `#F3F1EC`, centered) or 16px (`w-4`, other grids; empty).
  - Radius 6px on the left only. Background cycles by index (i mod 5): `#285D60`, `#A5B287`, `#C1BA95`, `#889C98`, `#D1D9D6`.
- **Right box:**
  - flex-1, bg `#F3F1EC`. Borders 1px `#E5E7EB` on top, right and bottom (none on the left). Radius 6px on the right only.
  - Inner padding 12px 16px. Text truncates with an ellipsis (`nowrap`).
  - Link: p1 token (12/16.8 on mobile and tablet, 17/23.8 on desktop), weight 500, `main_green/70`, no underline, ~30–50 chars.
  - Hover class `hover:text-gray` **does not exist in the CSS, so there is no hover**.

**"See all":** `p.mt-4` (16px) holding `a.text-green.text-sm` (14px/20px, `#285D60`, ~7 chars), linking to the category hub. Quirk: sales-tax leaves link to `/resources/us/payroll/`.

The same-category grid picks 6 other states in an arbitrary order; it is not alphabetical.

### "More from the blog" (new component "BlogTeaserList"). Tailwind UI markup, in **px**.

- **Outer:** bg `#F3F1EC`, py 96px.
- **Inner:** `max-w-7xl` with px 24px (<1025) / 32px. Then a column of `max-w-2xl` (672px) (<1025) / `max-w-4xl` (896px) on desktop, centered.
- **h2:** h3 token, color #000, ~18 chars.
- **Intro p:** mt 8px, p1 token, `main_green/70`, ~107 chars.
- **List:** mt 24px (<1025) / 80px (desktop). `space-y-12` (48px). Holds 3 cards.

**Card** (`article.relative.isolate.flex`):
- Column with gap 32px (<1025); row on desktop.
- **Thumbnail:** `relative`, radius 8u.
  - <1025: full width, `aspect-ratio:16/9` (672x378 at 768; 280.6x157.8u at 390).
  - Desktop: 128x128px square, shrink-0.
  - `img` absolute inset-0, cover, bg `#F9FAFB`. PLACEHOLDER 640x427 (blog featured image), cover.
- **Text** (`div.group.relative`):
  - h3 `text-lg` (18px/28px, weight 400, color #000, ~25–60 chars). On `group-hover`, color is `#4B5563`.
  - Inside the h3, an `a` with `span.absolute.inset-0` makes the whole text block clickable.
  - p: my 20px, p2 token, `main_green/70`, `line-clamp:2`, ~420–600 chars of source.
- **Footer row:** `div.flex.border-t` (1px `rgba(17,24,39,.05)`) holding the post byline `figure`. Same as §2: mt 16u, 26u avatar (radius 6u), figcaption author (plain span, not a link), "|", date.

**Data model:** `blogPosts[3]{slug, title, excerpt, thumbnail, author{name, avatar}, date}`.

Bottom CTA, reused. Leaf heights: payroll 5749 / 6296 / 4948u, handbook 16285 / 14529 / 14820u, agency 4048 / 5009 / 3648u (mobile / tablet / desktop).

---

## 8. Gated guide landing `/p/<guide>/`

Measured on `/p/hr-compliance-guide/`. JS imports: hero, benefits, trustedBy, featureGroup, faqSection, ctaSection, animation, splide, AccordionsList, scrollTrigger, lottie. The section stack is composable per guide:

| Guide slug | Sections in order |
|---|---|
| `hr-compliance-guide`, `ai-compliance-guide-for-hr`, `state-by-state-hr-hiring-guide`, `peo-transition-guide` | Hero → Benefits → Form → Trusted → FeatureGroup → FAQ → Bottom CTA |
| `2025-compliance-report` | Hero → Form (`bg-main_white`) → Trusted → FAQ → Bottom CTA |
| `hr-compliance-audit` | Hero → Form → `features-section` (not measured) → Trusted |
| `leave-your-peo-with-confidence` | Hero → one bg-white section → Form |
| `compliance-newsletter` | Form only, in a centered single-column variant (see the end of §8.3) |

### Data model
`guide{slug, eyebrow (~8 chars), title (~19 chars), description (~85 chars), ctaLabel (~12 chars), heroImage{desktop, mobile}, benefits[3]{icon, title (~18), desc (~110)}?, form{hubspotFormId, submitLabel, heading (~68), bullets[4] (~17–40 chars)}, featureGroup{title (~22), desc (~158), images[3], items[3]{title (~30–37), desc (~77–109)}}?, faq[5]{q (~34–76), a (~63–735)}?}`.

### 8.1 Hero `section#landingpage-hero` (new component; in u)

**Box:** `.section-container`, bg `#F3F1EC`, position relative. Height auto (mobile/tablet: 452 / 774) and **782 on desktop** (`lg:h-1782`).

**Text block:** column, items-center, centered. pt 79 / 110 / 119; pb 48 / 76 / 0. Contents in order:
1. **Eyebrow:** p2 token, `main_green/40`.
2. **Title:** mt 8 / 16 / 16. h1 at h3 token, `#203435`.
3. **Description:** mt 12 / 16 / 16. Width 100% / 272 / 424. p2, `main_green/40`.
4. **Button row:** mt 24, flex, gap 6, centered. Holds `a.btn.btn-red` (button-large token, text `#F3F1EC`, 6u 16u padding at desktop, 126.7x36.4u, `transition .4s`). It links to `#hubspot-form-a`; `html{scroll-behavior:smooth}` handles the scroll.

**Visual:**
- **Desktop:** `img` object-cover, width 75% (1080u), mx auto, mt 24. It overflows the 782u box: 569u tall, starting at y 354. **The next section (Benefits, `position:relative`) paints over its lower part**, so only about 128u of the image shows above the fold line. Confirmed visually: the guide-cover illustration is cut off by the Benefits background.
- **Mobile/tablet:** a second `img`, `object-fill`, full width (320x168.7u / 768x404.9u), under the text.
- Both use one source: PLACEHOLDER 7192x3792 PNG (aspect 1.897:1).

**Motion** (trigger `top bottom-=30%`, once):
- `gsap.set`: eyebrow, title and desc start at `y:30u, autoAlpha:0`; image starts at `autoAlpha:0, scale:.95`.
- Timeline:
  - eyebrow → y 0, autoAlpha 1, f(20) (0.333s), Eas17, at 0.
  - title: f(32) (0.533s), Eas17, at f(5) (0.083s).
  - desc: f(32), Eas17, at f(10) (0.167s).
  - image → autoAlpha 1, scale 1, f(32), Eas1739, at f(15) (0.25s).
- On mobile, the offset uses JS `rem = vw/375` (30·rem ≈ 26u).
- The button is not animated.

### 8.2 Benefits: reuse `Benefits.jsx` (CLONE_SPEC §8) with these overrides
- **No title/description row.** The guide markup has no `.animation-title`/`.animation-desc`. The JS tweens null targets harmlessly; only the cards animate.
- **Container:** `.section-container` padding 110u top and bottom at every breakpoint (not the homepage's 110/140, 160, 260). bg `#FCFBFA`.
- **Cards:** same geometry as home: 332u wide, padding 61/32/32 at desktop, gap 40; 215 wide, gap 21 at tablet; Splide on mobile. Desktop height grows to 462u because titles wrap to 2 lines.
- **Card value h2:** h2 token. Title ~18 chars; note it is a word, not a number.
- **Card desc:** p3, op .7, ~110 chars.
- **Icon:** an `<img>` (not inline SVG). Data-URI SVG 172x104, rendered 236x143 (desktop) / 163x99 (tablet) / 172x104u (mobile). PLACEHOLDER 172x104 line-art pictogram (the screenshot shows outline circle/half-circle shapes in grey-green; REDRAW-able as simple strokes).
- **Hover:** the img has `opacity:.4` and `group-hover:opacity:1` (Tailwind `transition` 300ms `ease-in-out`), plus the homepage `.card__bg` hover (op .4 → 1, 375ms).
- **Motion:** same as homepage benefits (cards y 100u → 0, middle card first, 0.55s, Eas17; mobile slider y 40·rem).

### 8.3 Form section (new component "GuideFormSection")

**Anchor:** `a[name=hubspot-form-a]`, absolute, 0x0, placed just before the section.

**Section:** bg `#F3F1EC`. Inner grid:
- `.medium-container` (272 / 684 / 1100u), `display:grid; grid-template-columns:1fr 1fr; gap:48px` (**px**). Align start.
- pt 60 / 115 / 160u; pb 100 / 115 / 160u.
- **The two columns apply at every width, including mobile:** 2 × 116u columns at 390, so the heading, bullets and form are squeezed. Reproduce this quirk, or stack below 481 as a noted deviation.

**Left column:**
- **h3:** h3 token, `#203435`, ~68 chars (3 lines at desktop). It carries static inline GSAP leftovers; no animation runs.
- **Bullets** `ul.list`:
  - Padding 32px top and bottom (**px**). mr 25u (tablet) / 52u (desktop). 4 items.
  - `li`: flex, items-start, pb 8 / 12 / 20u.
  - **Icon** span 17x17u, padding-top 8px: SVG 17x17 with `circle r 8.5 fill #203435 opacity .2` plus a check path `M6 8.66667 8.21053 11 12 7`, stroke `#285D60`, round caps. REDRAW.
  - **Text** span: ml 12u, h6 token, `#285D60`.

**Right column:** `div.pt-3` (12px) with `lg:max-w-[45vw]`, holding the HubSpot form (§10). This guide's fields:

| name | type | required |
|---|---|---|
| firstname | text | yes |
| lastname | text | yes |
| email | email | yes |
| company | text | yes |
| 0-2/numberofemployees | number | no |
| utm_campaign, utm_content, utm_medium, utm_source, utm_term | hidden | no |

Submit label ~12 chars. Every visible field is 89.6u tall at desktop (label 23.8 + 8 + input 57.8) with a 24px gap.

**`/p/compliance-newsletter/` variant:** the section is a single flex column, centered, gap 40px, px 40px, same pt/pb. It holds h3 (~44 chars), p2 `main_green/70` (~118 chars, `lg:max-w-[45vw]`), then the form (full width, `lg:max-w-[45vw]`). There is no hero and no Bottom CTA.

### 8.4 Trusted: reuse `LogoMarquee.jsx` (CLONE_SPEC §4)
Identical: `#homepage-trusted`, py 110, h3 title (~10 chars), two tickers, edge masks `#FCFBFA`.

### 8.5 FeatureGroup `section#feature-group` (new component; comes from the platform pages, not on home)

**Section and list:**
- bg `#F3F1EC`. `.base-container` (272 / 688 / 1232u). pt 60 / 120 / 60u; pb 100 / 115 / 160u.
- `ul.list`: column, gap 60u (<1025) / 44u. One `li.list-item` per group (this guide has 1).

**Card** `.list-item-wrap`:
- Desktop: padding 73u 66u, radius 12u, bg `rgba(207,215,212,.5)` (green5 at 50%).
- Mobile/tablet: no bg, no padding.
- **Mobile/tablet title row** `.title-wrap-mobile`: column, gap 16. On tablet it becomes row-reverse, space-between, with title width 235 and desc width 332. Contents: h5 title (~22 chars) and p2 desc (`main_green/70`, ~158 chars). Hidden on desktop.
- **`.content-wrap`:** mt 24 / 40 / 0; flex row, space-between from tablet up. Contents:
  - **Image well** `.img-wrap`: 272x229 / 332x280 / 530x447u, radius 8u, overflow hidden. It holds 3 absolutely stacked `.img-item`; the first is visible and the others are `opacity:0`. PLACEHOLDER 1061x895 x3 (product UI screenshots), cover. The first source is 848x528 and renders 530x330 at the top of the well (it does not fill the well; a quirk).
  - **`.desc-list`:** mt 24 (mobile); width 248 (tablet) / 464 (desktop). On desktop it is a column with space-between. The top holds `.title-wrap-desktop` (column, gap 16: h5 + p2). The bottom holds an accordion (width 384u on desktop, 3 items).

**Accordion item:**
- `button.accordion-button`: mt 22 / 12 / 20u; pb 18u (mobile inactive), 8u (mobile active), 12u (tablet), 20u (desktop, both states). `transition: all .5s ease`.
- Title: h6 token, color `main_green/40` → **active `#285D60`**.
- No chevron icon in this variant.
- Content: the global `.accordion-content` behavior (CLONE_SPEC §0.7). Inner pb 16 / 20u; p2, `main_green/70`.

**Mobile/tablet only:** after the card, a divider `div` with mt 40u, height **2px**, bg `#285D60` at 20%.

**Desktop only:** `div.spacing` with padding-bottom **2000u**, used as the pin's scroll runway.

**Motion:**
- **Reveal** (trigger `top bottom-=25%`, once): the mobile title row and `.content-wrap` start at `y:50u, autoAlpha:0`. Title → 0 over f(20) with Eas17 at 0; content follows at f(5).
- **Image crossfade** when the open item changes:
  1. All images → autoAlpha 0, f(20), Eas66.
  2. Then the selected image → autoAlpha 1, f(20), Eas17.
  This runs sequentially (awaited). The accordion keeps exactly 1 item open (`numberOfVisibleItems: 1`). Clicking an item opens it and crossfades.
- **Desktop pin:** `ScrollTrigger.create({trigger: .list-item-wrap, start: "center-=5% center", endTrigger: .spacing, end: "bottom bottom", pin: true, pinSpacing: false, scrub: true})`. On update, `index = round(progress × (count-1))` opens that item and runs the crossfade. Result: the card stays pinned in the viewport center for about 2000u of scroll while items 1→2→3 activate.

### 8.6 FAQ: reuse `Faq.jsx` (CLONE_SPEC §13)
Identical: `#homepage-faq`, bg `#FCFBFA`, pt 120 / 180 / 160, title h3 with a green span, 5 accordion items with chevrons.

### 8.7 Bottom CTA: reuse `BottomCta.jsx`.

---

## 9. `/subscribe/` (thank-you page)

It has no form. Stock Tailwind **px**, inside the site header and footer:
- **Outer:** `div.w-full`, mt 8px (mobile) / 24px (≥481), pt 16px, px 16px. py 32px at ≥481 (`xl:` dead, so 32px at 1440 too).
- **Middle:** `max-w-6xl` (1152px), centered, px 8px / 16px (desktop).
- **Inner:** `max-w-2xl` (672px), mt 80px, centered.
- **h2:** `text-4xl` 36px/40px, **weight 800** (synthetic bold on Circular; use Figtree 800), `#111827`, centered, ~7 chars.
- **p:** mt 16px, `text-lg` 18px/28px, `#4B5563`, centered, ~27 chars.
- No Bottom CTA. The footer follows immediately (main is 377px tall at 1440).

---

## 10. HubSpot form styling (shared by §2 variant and §8.3)

The real form is injected by `//js.hsforms.net/forms/embed/v2.js` with `hbspt.forms.create({portalId, formId, target:"#hubspot-form", submitText, css:""})`. The site's own CSS styles it. The clone should render a static form with the same DOM roles.

**`.hbspt-form` base text:** 12/16.8, ls -0.12u, 500 (mobile/tablet); 17/23.8, ls -0.12u, 500 (desktop). Color `#285D60`.

**Field `.hs-form-field`:** margin-bottom 24px.
- **Label:** block, mb 8px, same font. Required marker `.hs-form-required` "*" in `#C74E5C`.

**Input `.hs-input`:**
- Width 100%, block, radius 8px, border 1px `#D1D5DB`, bg `#F9FAFB`, color `#111827`.
- Padding 16px. An `!important` 15px rule exists for `.hs-custom-style`, but the measured value is 16px.
- Height 57.8u at desktop (font 17/23.8 + 32 + 2).
- **Focus:** border `#DC5868`, ring color `#DC5868`.

**Error `.hs-error-msg`:** 14px/20px, `#C74E5C`.

**Submit `input.hs-button`:**
- Same as `.btn.btn-red`: bg `#C74E5C`, color `#F3F1EC`, radius 8u, padding 5u 9u / 6u 16u (desktop), 1px transparent border, `transition .4s`.
- Margin-top 32px. Font 10/16 / 12/19.2 / 14/22.4 (ls -0.28 on desktop), 500. `cursor:pointer`.
- No working hover (broken CSS rule).

**Legal consent** (if present): 16px/24px, 400, `#203435B3`, links underlined.

**Submitted message:** centered, 14px/20px (mobile), 20px/28px (≥481), 24px/32px (desktop), `#516B66`.

---

## 11. Reused vs new components

| Reused (existing in clone) | Where |
|---|---|
| Header, banner, footer (CLONE_SPEC §1, §2, §15) | every template except the `/p/` 404 |
| `BottomCta.jsx` (§14) | blog index, posts, resources index/hub/leaf, guide landings (not authors, not subscribe, not newsletter) |
| `Benefits.jsx` (§8, no title row, img icons) | guide landing |
| `LogoMarquee.jsx` (§4) | guide landing |
| `Faq.jsx` + accordion (§13, §0.7) | guide landing |
| `.btn` / `btn-red` button styles | in-article CTA, guide hero, HubSpot submit |

| New | Spec |
|---|---|
| `PageTitleBand` (eyebrow + optional h1, `#F3F1EC`) | §1, §4, §5 |
| `ListRow` (two-column title/summary row + 1u divider) and `ArrowLinkButton` (`.btn-arrow`) | §1, §5, §6 |
| `Pagination` (NN/TT counter + two `btn-circle`) | §1 |
| `PostHeader` (h1 + byline figure with avatar/author/date) | §2, §7 (date-only) |
| `Prose` (`.article-wrapper` rules incl. tables) | §2 |
| `InlineCtaCard` (green2 card + radial glow) | §2, §7 |
| `ResourceLinkGrid` (chip + bordered truncating link, "See all") | §7 |
| `BlogTeaserList` ("More from the blog", 3 cards) | §7 |
| `GuideHero` | §8.1 |
| `GuideFormSection` + `HubspotForm` | §8.3, §10, §2 |
| `FeatureGroup` (pinned accordion with image crossfade) | §8.5 |
| `AuthorList` / `AuthorProfile` | §3, §4 |
| `ThanksPage` | §9 |

New type tokens: `text-p1-b` (13/20.8, 14/22.4, 17/27.2; ls -0.01em; 450), `text-button-large` (10/16, 12/19.2, 14/22.4; ls -0.02, -0.02, -0.28u; 500), and the prose roles in §2.

## 12. Motion summary for these templates

- **Blog index, posts, resources, authors, subscribe:** no load or scroll reveals, no sticky elements, no progress bar. Only the Bottom CTA Lottie plays and pauses with its section, as on home. Lazy images fade in (`.lazy` opacity 0 → `.lazyLoaded` 1, 0.4s ease); this applies only to the CTA background image here.
- **Hovers:**
  - `.btn-arrow`: bg `#E4E4DC`, 0.4s.
  - `.btn-circle.enabled`: bg `#CFD7D4`, 0.4s.
  - Prose links: color `#285D6099`, 0.2s `cubic-bezier(.4,0,.2,1)`.
  - Byline author: underline.
  - Blog teaser h3: `#4B5563` on group hover, no transition.
  - Benefits icon img: opacity .4 → 1, 300ms.
  - Benefits card bg: .4 → 1, 375ms.
  - `btn-red`: none, because the shipped CSS rule is broken.
  - Resource grid links: none.
- **Guide landing:** hero timeline (§8.1), benefits reveal (home), FeatureGroup reveal, pin and crossfade (§8.5), FAQ accordion (home). The marquee runs as on home.
- **Pagination:** full page loads, no transitions.

## 13. Not measured / caveats

- **The real HubSpot form** is third-party JS. Field names and types were read from the rendered DOM. Labels were not transcribed (lengths only). Validation messages, the consent block (none rendered for these forms) and the post-submit state were not exercised. I did not submit.
- **`/p/hr-compliance-audit/`** has a `features-section`, and `leave-your-peo-with-confidence` has an extra bg-white section. Neither was measured; only their section order was read from the HTML.
- **Newsletter modal** (`window.openNewsletterModal`) is undefined on the live site. CSS for `.newsletter-modal` and `.promo-newsletter` exists, but no markup was found.
- **Hover states** come from CSS rules. They were not screenshotted.
- **Header/nav active state on these routes** (e.g. "Blog" highlighted) was not checked. The header is assumed identical to home.
- **1280 wide:** not re-measured. u-based parts scale by 0.889 per CLONE_SPEC §0.1. The px-based blocks (§7 related grids, inline CTA, forms, author wrapper, subscribe) do **not** scale.
- **The `/resources/` page** is about 73,000u tall. I recorded only the first instance of each repeated element.
