# Marketing block library (`src/components/blocks/`)

Shared blocks for the marketing pages, built against `specs/marketing.md` §1. Import from the barrel:

```js
import { PageHero, FeatureGroup, GenericCta } from '../components/blocks'
```

- **Styles:** `src/styles/blocks.css`, imported by the barrel and by `primitives.jsx`. It holds the new §0.1 tokens as CSS variables and classes, `.btn`/`.btn-red`, `.small-container`/`.base-container`, and the accordion, lead form and benefits-hover rules. `tailwind.config.cjs` is not changed.
- **Motion:** `src/motion/blocks.js`. Each block calls its own hook, so you only need to render the block. The hooks use `gsap.matchMedia` per breakpoint, revert on unmount, are StrictMode-safe, and run a debounced `ScrollTrigger.refresh()` after mount and again on `document.fonts.ready`.
- **Reused homepage components** (`Benefits`, `Faq`, `BottomCta`, `Pricing`, `Roadmap`, `Testimonials`) get their motion only from `usePageMotion()` (`src/motion/page.js`). Any page that renders them must call `usePageMotion()` once; see `src/pages/Platform.jsx`.
- **Rich text:** a `title` prop accepts a string, or an array of segments: `'plain'`, `{ g: 'green run' }` (renders `span.text-green`), or `'\n'` (renders `<br>`).
- **Images:** pass `{ src, alt? }`. The placeholder art lives in `/public/assets/art/marketing/` (original SVGs).

---

## PageHero (§1.1)

`<PageHero variant eyebrow title description visual id? />`

| prop | notes |
|---|---|
| `variant` | `'platform'`: id `platform-hero`, h1 `#000`, margins on the elements, an absolute 1204×466u visual, and corner line art (desktop). `'landing'` (default): id `landingpage-hero`, h1 `#203435`, gaps from wrappers, an in-flow 1080u visual, full-bleed below 1025. |
| `title` | Rich. Use `'\n'` to force the `<br>` (handbooks, telehealth). |
| `visual` | `{ desktop: { src, w, h }, mobile: { src, w, h }, alt }`. The desktop image is `object-cover`. The mobile/tablet `-res` image is `object-fill`. Landing heights follow `w/h`. |

Height is fixed at 782u on desktop. Motion: eyebrow, h1 and description rise 30u, then the visual scales up from .95 (`top bottom-=30%`, once).

## HeroStatic (§1.2)

`<HeroStatic eyebrow? title description buttons? art? id? />`.

- `eyebrow`: omit it or pass `''` to drop the eyebrow; the h1 then starts the title-wrap (misc template C).
- `buttons`: `[{ label, href, variant: 'red' }]` renders a `.btn-wrap` row under the description: flex centered, gap 6u, mt 24u, each an `a.btn.btn-red` (misc §4.1).
- `art` is a raw SVG string; the default is `/assets/art/marketing/hero-static.svg`, which exposes `.line`, `.node` and `#pulse`. The art loops (5.03s) while the section is active. There is no text reveal. Desktop shows 423×170u corner line art. Mobile art is 465u wide and overflows by 73u on each side (clipped by `main`).

## FeatureGroup / MailService (§1.3)

`<FeatureGroup id cards />`

- `id`: `'mail-service'` (/platform) or `'feature-group'` (default).
- `cards`: `[{ title, desc, items: [{ title, body, image: { src, alt? } }] }]`, with 3 items per card.
- The first card gets `bg-green5/50` and the rest `/20` (desktop only).
- Desktop: each card pins (`center-=5% center` through a 2000u spacer, `pinSpacing:false`, scrub). Scroll progress opens item `round(p × (n−1))`.
- Opening an item swaps the image: all fade out (20f Eas66), then the target fades in (20f Eas17).
- Clicking the open item closes it.
- Only the first card reveals, as on the original.
- Images are `w-full h-auto` and top-aligned.

## FeatureList (§1.4)

`<FeatureList variant items id? />`

- `variant 'A'`: `.small-container`, multiple items with md+ dividers. Each item reveals once at `top+=25% bottom`: text rises 50u, rows rise 10u with a 5f stagger, the image scales from .98.
- `variant 'B'`: `.medium-container`, `py 42u`, uses `items[0]` only. **Static** (the original's JS never matches it).
- `items[]`:
  - `title`: Rich, e.g. `[{ g: 'Streamline' }, ' being compliant']`.
  - `desc`.
  - `list` or `pairs`. `list: ['label']` renders check rows. `pairs: [{ title, desc }]` is the handbooks title+description row variant.
  - `image`: `{ src }`, 1404×910, radius 12px/7px.
  - `button?`: `{ label, href }`. Variant B only (telehealth): renders `a.btn.btn-red` under the list.
- `keepLastPadding` (variant A, default `false`): keeps the last item's padding-bottom (60u / 60u / 80u). Use it for single-item lists: handbooks and misc template D. `trimLast={false}` is an equivalent alias.

## GetStarted (§1.11)

`<GetStarted title desc steps id? />`. `steps: [{ title, desc, image: { src } }]`, with 3 or 4 steps; the images are 848×528.

- Desktop: the homepage PeaceOfMind scrubbed pin with static images (in .95→1, out →1.05).
- Tablet/mobile: carousel with pagination.
- The default id is `solutions-get-started`.

## GenericCta (§1.8) and ComplianceCtaCard

`<GenericCta title desc id? />` renders the standalone card wrapper: `py 150u` on md+, card 272/510/1020u.

`<ComplianceCtaCard title desc className? />` renders the card alone, for inline use (handbooks BenefitGroup, /solutions ScrollTabs).

Both rise from `y 100px` once (`top bottom-=10%`) and loop their CTA art while in view. Each instance gets unique SVG uids, so several per page are fine.

## BenefitsVariant / BenefitsLanding (§1.9)

`<BenefitsVariant title desc cards id? />`. `cards: [{ value, desc, icon: { src } }]` (3 cards).

- Padding is `py 110u` at every breakpoint.
- The icon `<img>` is 236/163/172u wide with height from its aspect. It sits at opacity .4 and goes to 1 on card hover (300ms `cubic-bezier(.4,0,.2,1)`).
- Card text gap is 12u on all cards.
- Motion matches the homepage benefits.
- The chart pictograms are `/assets/art/marketing/benefit-pictogram-{1,2,3}.svg` (172×104).

## LogoMarquee (variants)

`<LogoMarquee title? rows padding fade bg id? />`

- `rows`: `[[6 slugs], [6 slugs]]`, from `/assets/art/logos/*.svg`. Pass a single row for telehealth; the empty second ticker keeps its top margin, as on the original.
- `padding`: `'landing'` (py 110u, default) or `'home'` (pt 80u; pb 110/160/260u, used on /about).
- `fade`: `'white'` (`bg-mask-gradient`) or `'orange'` (`bg-mask-gradient-orange`, for #F3F1EC pages). Use it with `bg="bg-white"`.
- Motion: row 1 moves right and row 2 moves left, linear. Duration is the ticker width divided by 10 (5 on mobile). It never stops.

## LeadForm (§1.15)

`<LeadForm title list fields? submitLabel? success? stackOnMobile? id? />`

- `stackOnMobile` (default `false`): one column below 481px. This is an intentional fix; the original keeps two cramped columns.

- A static look-alike of the HubSpot form: no scripts, no network. Native required/email validation, then a local success state.
- `grid-cols-2 gap-12` (48px) at **every** width, as measured.
- Inputs: 57.8px tall, 16px padding, bg `#F9FAFB`, border `#D1D5DB`, radius 8px, focus border `rgb(220,88,104)`.

## Ecosystem (§1.5) and Engine (§1.6)

- `<Ecosystem title desc partners />`. `partners: [{ logo: { src, alt }, desc }]` (3). Motion: text rises 100px with a 5f stagger, items rise 10u (`top bottom-=30%`).
- `<Engine title desc items />`. `items: [{ title, desc, list: [3], image: { src } }]`. Numbered rows, 210×198u line art (md+). Per-item motion is the same as FeatureList A, at `top bottom-=25%`.

## Buttons and tokens (`blocks.css`)

- `.btn`: inline-block, nowrap, radius 8u, padding 5u 9u (6u 16u on lg), `transition .4s`. Pair it with `.type-button-large`.
- `.btn-red`: `#C74E5C` / `#F3F1EC`.
  - Hover `#B5444F` is a **clone addition**: the original's hover CSS is broken.
  - Focus-visible: 2px `#285D60` outline.
- Token variables: `--nw-btn-red`, `--nw-check-green` (#55B559), `--nw-icon-tile` (#285D6010), `--nw-accent-1..5`, `--nw-gray-100/200`, `--nw-input-bg`, `--nw-input-border`, `--nw-input-focus`, `--nw-card-glass`, `--nw-line-art`.
- Matching classes: `.text-btn-red`, `.bg-btn-red`, `.text-check-green`, `.bg-icon-tile`, `.text-accent-N`, `.border-gray-100`, `.ring-gray-200`, `.bg-input`, `.border-input`, `.bg-card-glass`, `.stroke-line-art`, `.fill-line-art`, `.bg-mask-gradient-orange`.

## Primitives

- `<CheckIcon className? />`: the 17×17 check from §1.4.
- `<LineArt size="hero|wide|engine" className />`: corner line art. Mirror it with `-scale-x-100`.
- `<Rich value />`.

## ScrollTabs (§1.7)

`<ScrollTabs title desc tabs linksInset? cta? id? sectionClass? />`

- `tabs`: `[{ id, label, title?, image: { src, mobileSrc?, alt? }, features: [{ title, desc }] × 3 }]` (4 tabs).
  - `id` is the deep-link anchor (`#fq`, `#registered-agent`, …).
  - `title` is the tablet/mobile card title; it defaults to `label`.
  - `image.src` is 1562×649; `mobileSrc` is the 544×358 crop used below lg.
- `linksInset`: adds `pl 40u` to the link list (/solutions).
- `cta`: `{ title, desc }` renders the inline Compliance CTA card after the spacer (/solutions).
- `sectionClass`: defaults to `multiColumnList`.
- Desktop: `.tabs-wrap` pins at `top top+=20%` over a 3000u spacer (scrub). `round(progress × 3)` picks the tab. Enter/leave-back resets to tab 0; leave/enter-back sets tab 3.
- Tab switch: out `scale .86` + fade (.267s Eas49), then in (.3s Eas1739).
- Links are clickable. A URL hash equal to a tab id opens that tab after 500ms.
- Tablet/mobile: all tabs are stacked as cards. No motion.
- Side lines (104×1000u) show on desktop only.

## BenefitGroup (§1.10)

`<BenefitGroup title tabs cta id? />`. This is the homepage RoleTabs with no orange gradient, container padding-top 0 and the Compliance CTA card inline.

- `tabs`: `[{ label, image: { src }, items: [{ icon, title, desc }] × 3 }]` (3 tabs).
  - `icon` is a slug from `/assets/art/icons/*.svg`.
  - Images render `object-cover` at 645×447u.
- `cta`: `{ title, desc }`.
- Motion matches the homepage compliance tabs (`src/motion/compliance.js`), scoped to this block and without the lottie art.

## FaqVariant

`<FaqVariant title items bg? id? />`. A prop-driven copy of the homepage FAQ: same geometry, single open item, all closed initially, no reveal.

- `title`: Rich. Handbooks and for-hr use a plain title with no green span.
- `items`: `[{ q, a }]`.
- `bg`: `'bg-main-white'` (default) or `'bg-white'` (`#F3F1EC`, for-hr).

## Not built here (owned elsewhere)

- ProblemList (§1.12), FeatureCardGrid (§1.13), ResourceList (§1.14), TestimonialsLite (§1.16), About blocks (§1.17) and InnerPost (§1.18).
