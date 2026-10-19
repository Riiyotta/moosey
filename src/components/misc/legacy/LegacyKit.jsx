/**
 * Template A — legacy partner kit (specs/misc.md §2). Fixed px, standard Tailwind spacing/type,
 * legacy palette from src/styles/misc.css. Breakpoints: only md (>=481) and lg (>=1025) exist, so every
 * `sm:`/`xl:` class of the original is inert and is simply left out here (§2 "Breakpoints").
 * No reveal animations on this template (§2 "JS"); the two sliders are src/motion/misc.js.
 */
import { artUrl } from '../../InlineSvg'
import { useLegacySwiper } from '../../../motion/misc'
import { LimeCheck, MiniGlyph, OutlineIcon, SlashDivider } from './icons'

/* ------------------------------------------------------------------ */
/* §2.2 Hero                                                           */
/* ------------------------------------------------------------------ */

function Lockup({ lockup }) {
  const brand = <img src={artUrl('brand/northwind-logo-white.svg')} alt="Northwind" className="block w-full" />
  const partner = (cls) => <img src={lockup.partnerLogo} alt={lockup.partnerAlt} className={cls} />
  if (lockup.style === 'grid') {
    // A2 (§2.12): `div.grid.grid-flow-col.justify-center.items-center` directly under the hero column (no h2):
    // logo w-24 · separator 36/40 w800 mx-4 · partner logo w-24 -mt-4 → columns 96 / 52 / 96
    return (
      <div className="grid grid-flow-col items-center justify-center">
        <div className="w-24">{brand}</div>
        <div className="lgc-white mx-4 text-4xl font-extrabold tracking-tight">{lockup.separator}</div>
        {partner('-mt-4 w-24')}
      </div>
    )
  }
  if (lockup.style === 'block') {
    // A3: h2 > block row of inline-blocks on the baseline, separator 72/72 w800 mx-4
    return (
      <h2 className="lgc-white text-5xl font-extrabold tracking-tight">
        <div className="items-center">
          <div className="inline-block w-24">{brand}</div>
          <span className="mx-4 text-7xl font-extrabold">{lockup.separator}</span>
          <div className="inline-block w-24">{partner('block w-full')}</div>
        </div>
      </h2>
    )
  }
  // A1: h2 > inline-flex, logo w-24 + separator (30/36 w300, mx 16) + partner w-20
  return (
    <h2 className="lgc-white text-5xl font-extrabold tracking-tight">
      <div className="inline-flex items-center">
        <div className="inline-block w-24">{brand}</div>
        <span className="mx-4 text-3xl font-light">{lockup.separator}</span>
        <div className="inline-block w-20">{partner('block w-full')}</div>
      </div>
    </h2>
  )
}

export function LegacyHero({ hero, onCta }) {
  const max = hero.containerMax === '4xl' ? 'max-w-4xl' : 'max-w-3xl'
  return (
    <div className="lgbg-teal-800 relative flex flex-col text-center" data-legacy="hero">
      <div className="z-30">
        <div className="overflow-hidden py-24 lg:py-36">
          <div className={`mx-auto ${max} px-4 lg:px-8`}>
            <div>
              <div className="flex flex-col items-center">
                <div className="mx-auto">
                  {hero.lockup && <Lockup lockup={hero.lockup} />}
                  <h1 className="lgc-white mb-12 mt-20 text-4xl font-extrabold md:text-5xl md:leading-tight">{hero.title}</h1>
                  <p className={`lgc-teal-500 mt-6 text-lg ${hero.subWeight === 400 ? 'font-normal' : 'font-medium'}`}>
                    {hero.sub[0]}
                    <br />
                    {hero.sub[1]}
                  </p>
                </div>
                <div className="z-50 mx-auto mt-12 items-center">
                  {onCta ? (
                    <button type="button" onClick={onCta} className="request-invite-btn btn btn-red type-button-large" aria-haspopup="dialog">
                      {hero.cta.label}
                    </button>
                  ) : (
                    <a href={hero.cta.href} className="btn btn-red type-button-large">
                      {hero.cta.label}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* §2.3 Intro strip / band titles                                      */
/* ------------------------------------------------------------------ */

function BandTitle({ title, subtitle }) {
  return (
    <div className="mx-auto max-w-md px-4 text-center lg:max-w-7xl lg:px-8">
      <div>
        <p className="lgc-zinc-800 mt-2 text-4xl font-extrabold tracking-tight">{title}</p>
        <p className="lgc-zinc-600 mx-auto mt-6 max-w-3xl text-xl font-medium">{subtitle}</p>
      </div>
    </div>
  )
}

export function IntroStrip({ title, subtitle, topPad = 'py-16' }) {
  // `py-16 pb-9` → 64 / 36; sales-tax-beta adds `pt-24` (96)
  return (
    <div className={`lgbg-teal-100 overflow-hidden ${topPad === 'pt-24' ? 'pb-9 pt-24' : 'pb-9 pt-16'}`} data-legacy="intro">
      <BandTitle title={title} subtitle={subtitle} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* §2.4 Feature rows                                                   */
/* ------------------------------------------------------------------ */

function IconItem({ item, ml = 'ml-16' }) {
  return (
    <div className="relative">
      <dt>
        <div className="lgbg-rose-700 lgc-white absolute flex h-12 w-12 items-center justify-center rounded-md">
          <OutlineIcon name={item.icon} />
        </div>
        <p className={`lgc-gray-900 ${ml} text-lg font-medium leading-6`}>{item.title}</p>
      </dt>
      <dd className={`lgc-gray-500 mt-2 ${ml} text-base`}>{item.desc}</dd>
    </div>
  )
}

function RowText({ row, as: H = 'h2' }) {
  return (
    <div>
      <div className="mt-6">
        <div className="mt-6">
          <H className="lgc-gray-900 text-3xl font-bold tracking-tight">{row.title}</H>
          <p className="lgc-gray-500 mt-3 text-lg">{row.lead}</p>
        </div>
        <div className="mt-10 max-w-xl space-y-8 text-base leading-7 lg:max-w-none">
          {row.items.map((it) => (
            <IconItem key={it.title} item={it} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ROW_PAD = {
  first: 'py-8 lg:py-16', // 32 / 64+64
  mid: 'lg:pt-20', // 80 top, 0 bottom
  midPadded: 'py-8 lg:pt-20', // 80 top, 32 bottom
}

/** Text left, app screenshot right; at lg the screenshot fills the row height and bleeds off the right edge. */
export function ShotRow({ row, pad = 'first', shadow = true }) {
  return (
    <div
      className={`lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 ${ROW_PAD[pad]}`}
      data-legacy="shot-row"
    >
      <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-none">
        <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 lg:py-32">
          <RowText row={row} />
        </div>
      </div>
      <div className="mt-12 lg:mt-0">
        <div className="-mr-48 pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
          <img
            src={row.image.src}
            alt={row.image.alt}
            width={row.image.w}
            height={row.image.h}
           
            className={`w-full rounded-xl lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none ${shadow ? 'lg-shot' : ''}`}
          />
        </div>
      </div>
    </div>
  )
}

/** Image left (plain rounded image, `mt-24` offset), text right — the integrations row. */
export function InsetRow({ row }) {
  return (
    <div
      className="flex flex-col items-center py-8 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8 lg:pt-20"
      data-legacy="inset-row"
    >
      <div className="order-2 mt-12 lg:order-1 lg:mt-24">
        <div className="lg:relative lg:m-0 lg:h-full lg:px-0">
          <img src={row.image.src} alt={row.image.alt} width={row.image.w} height={row.image.h} className="w-full rounded" />
        </div>
      </div>
      <div className="order-1 mx-auto max-w-xl lg:order-2 lg:mx-0 lg:max-w-none">
        <div className="mx-auto max-w-xl px-6 lg:mx-0 lg:max-w-none lg:px-0 lg:py-32">
          <RowText row={row} />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* §2.5 Mock-UI workflow card (REDRAW, static, fictional labels)        */
/* ------------------------------------------------------------------ */

function DotPattern({ id, width, height, rectW, rectH, className }) {
  return (
    <svg className={className} width={width} height={height} fill="none" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <defs>
        <pattern id={id} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="4" height="4" className="lgc-gray-200" fill="currentColor" />
        </pattern>
      </defs>
      <rect width={rectW ?? width} height={rectH ?? height} fill={`url(#${id})`} />
    </svg>
  )
}

const STEP = {
  active: { dot: 'lgb-teal-700 lgbg-teal-700', pill: 'lgb-teal-700 lgbg-teal-700 lgc-white' },
  next: { dot: 'lgb-teal-700 lgbg-gray-50', pill: 'lgb-teal-700 lgc-teal-700' },
  todo: { dot: 'lgb-gray-300 lgbg-pure-white', pill: 'lgb-gray-200 lgc-gray-500' },
  locked: { dot: 'lgb-gray-300 lgbg-pure-white', pill: 'lgb-gray-300 lgc-gray-500', lock: true },
}

function WorkflowSection({ section, first, firstBg }) {
  const inner = (
    <div className="py-8 pl-4 pr-7">
      <div className="flex items-center">
        <div className={`rounded-full border p-2 ${section.active ? 'lgb-teal-700 lgbg-teal-700 lgc-white' : 'lgb-gray-200 lgc-gray-900'}`}>
          <div className="h-4 w-4">
            <MiniGlyph name={section.glyph} />
          </div>
        </div>
        <div className="lgc-gray-900 ml-3 flex-1 text-lg font-bold leading-7">{section.label}</div>
      </div>
      <div>
        {section.steps.map((s, i) => {
          const st = STEP[s.state]
          return (
            <div key={s.label} className="flex">
              <div className="relative w-8">
                <div className={`absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border ${st.dot}`}>
                  {st.lock && (
                    <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.2" className="lgc-gray-300 m-auto h-4 w-4" aria-hidden="true">
                      <path d="M4 6V4.5a2.5 2.5 0 0 1 5 0V6M3.2 6h6.6v4.8H3.2z" />
                    </svg>
                  )}
                </div>
              </div>
              <div className={`${i === 0 ? 'mt-3' : ''} my-2 ml-4 flex-1`}>
                <div className={`rounded-md border px-4 py-2 text-sm font-semibold leading-5 ${st.pill}`}>{s.label}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
  if (first) {
    return (
      <div className="relative w-full">
        <div className="lgb-teal-700 border-l-8 border-t-0" style={{ backgroundColor: firstBg }}>
          {inner}
        </div>
      </div>
    )
  }
  return (
    <div className="lgb-gray-200 relative w-full border-t">
      <div>{inner}</div>
    </div>
  )
}

export function WorkflowRow({ row, cardBg, firstBg }) {
  const [s1, s2, s3] = row.card.sections
  return (
    <div className="relative mx-auto max-w-xl px-4 py-8 lg:max-w-7xl lg:px-8" data-legacy="workflow-row">
      <div className="relative flex flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-24">
        <div className="relative order-2 -mx-4 lg:order-1 lg:mt-10" aria-hidden="true">
          <DotPattern
            id="lg-dots-workflow"
            width={784}
            height={404}
            className="absolute left-1/2 -translate-x-1/2 translate-y-16 lg:hidden"
          />
          {/* original: inline `width:490px; margin:auto; transform:scale(.8,.8)` */}
          <div className="relative" style={{ width: 490, margin: 'auto', transform: 'scale(.8,.8)' }}>
            <div className="shadow-xl" style={{ backgroundColor: cardBg }}>
              <div className="relative">
                <WorkflowSection section={s1} first firstBg={firstBg} />
                <WorkflowSection section={s2} />
              </div>
              <div className="relative">
                <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2">
                  <div className="lgb-gray-200 lgbg-pure-white rounded-full border px-3 py-2">
                    <div className="flex items-center">
                      {/* original `text-rose-400` has no CSS rule (icon inherits); clone uses rose-700 */}
                      <div className="h-4 w-4" style={{ color: 'var(--lg-rose-700)' }}>
                        <MiniGlyph name="building" />
                      </div>
                      <span className="lgc-gray-400 lgbg-pure-white ml-1 text-xs">{row.card.chip}</span>
                    </div>
                  </div>
                </div>
                <WorkflowSection section={s3} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative order-1 mt-10">
          <h3 className="lgc-gray-900 text-3xl font-bold tracking-tight">{row.title}</h3>
          <p className="lgc-gray-500 mt-3 text-lg">{row.lead}</p>
          <dl className="mt-10 space-y-10">
            {row.items.map((it) => (
              <IconItem key={it.title} item={it} />
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* §2.6 Band 4: dark screenshot on an accent panel; §2.7 band 5 cards  */
/* ------------------------------------------------------------------ */

function TextBlock({ row }) {
  return (
    <>
      <h3 className="lgc-gray-900 text-3xl font-bold tracking-tight">{row.title}</h3>
      <p className="lgc-gray-500 mt-3 text-lg">{row.lead}</p>
      {row.items && (
        <dl className="mt-10 space-y-10">
          {row.items.map((it) => (
            <IconItem key={it.title} item={it} />
          ))}
        </dl>
      )}
    </>
  )
}

function AccentPanel({ image, panel }) {
  // `skew-x-[-30deg]` has no CSS rule on the original, so the accent is not skewed (§2.6)
  return (
    <div className={`relative isolate overflow-hidden px-2 pt-4 ${panel === 'teal' ? 'lgbg-teal-700' : 'lgbg-rose-700'}`}>
      <div className="lgbg-rose-500 absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left opacity-20 ring-1 ring-inset ring-white" />
      <div className="mx-auto max-w-2xl">
        <img
          src={image.src}
          alt={image.alt}
          width={image.w}
          height={image.h}
         
          className="lgbg-gray-800 -mb-12 w-[57rem] max-w-none rounded-tl-xl ring-1 ring-white/10"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10" />
    </div>
  )
}

export function AlwaysCurrentBand({ band }) {
  const [a, b, c] = band.rows
  return (
    <div className="lgbg-white overflow-hidden py-16" data-legacy="band-4">
      <BandTitle title={band.title} subtitle={band.subtitle} />
      <div className="relative mx-auto max-w-xl px-4 pt-16 lg:max-w-7xl lg:px-8">
        <div className="relative lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative">
            <TextBlock row={a} />
          </div>
          <div className="mt-12 md:px-6 lg:px-0">
            <AccentPanel image={a.image} panel="rose" />
          </div>
        </div>
        <DotPattern
          id="lg-dots-band4"
          width={404}
          height={404}
          rectH={784}
          className="absolute right-full hidden translate-x-1/2 translate-y-12 lg:block"
        />
        <div className="relative mt-12 lg:mt-20">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="lg:col-start-2">
              <TextBlock row={b} />
            </div>
            <div className="relative mt-10">
              <img src={b.image.src} alt={b.image.alt} width={b.image.w} height={b.image.h} className="h-full w-full object-contain" />
            </div>
          </div>
        </div>
        <div className="relative my-12 lg:mt-20 lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          <div className="relative">
            <TextBlock row={c} />
          </div>
          <div className="mt-12 lg:px-6">
            <AccentPanel image={c.image} panel="teal" />
          </div>
        </div>
      </div>
    </div>
  )
}

function ImageCard({ image }) {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl pb-10 pt-[26rem]">
        <img src={image.src} alt={image.alt} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  )
}

export function CollaborateBand({ band }) {
  const [left, right] = band.cards
  return (
    <div className="lgbg-teal-100 overflow-hidden py-16" data-legacy="band-5">
      <BandTitle title={band.title} subtitle={band.subtitle} />
      <div className="relative mx-auto max-w-xl px-4 pb-0 pt-16 lg:max-w-7xl lg:px-8">
        <div className="relative lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <TextBlock row={left} />
            <dl className="mt-10 space-y-10">
              <div className="relative">
                <dt>
                  <ImageCard image={left.image} />
                </dt>
              </div>
            </dl>
          </div>
          <div className="mt-16 lg:mt-0">
            <div>
              <TextBlock row={right} />
            </div>
            <div className="relative mt-10">
              <ImageCard image={right.image} />
            </div>
          </div>
        </div>
        <ShotRow row={band.row} pad="first" shadow={false} />
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* §2.8 "Everything included" checklist                                */
/* ------------------------------------------------------------------ */

export function EverythingBand({ band }) {
  return (
    <div className="lgbg-white" data-legacy="band-6">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8 lg:py-24">
        <div>
          {band.eyebrow && (
            // original `text-rose-600` has no CSS rule (renders #000); clone uses the defined rose-800
            <h2 className="lgc-rose-800 text-base font-semibold uppercase tracking-wide">{band.eyebrow}</h2>
          )}
          <p className={`lgc-gray-900 text-3xl font-extrabold ${band.eyebrow ? 'mt-2' : ''}`}>{band.title}</p>
          <p className="lgc-gray-500 mt-4 text-lg">{band.lead}</p>
        </div>
        <div className="mt-12 lg:col-span-2 lg:mt-0">
          {/* `sm:grid-cols-2 sm:grid-rows-4` is inert on the original → one column at every width */}
          <dl className="space-y-10">
            {band.items.map((it) => (
              <div key={it.title} className="relative">
                <dt>
                  <LimeCheck />
                  <p className="lgc-gray-900 ml-9 text-lg font-medium leading-6">{it.title}</p>
                </dt>
                <dd className="lgc-gray-500 ml-9 mt-2 text-base">{it.desc}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* §2.9 Pricing (Swiper: 3-up at >=1260px, else 1-up, autoplay 5s)      */
/* ------------------------------------------------------------------ */

const PLAN_COLOR = [
  { border: 'lgb-teal-600', bg: 'lgbg-teal-600' },
  { border: 'lgb-teal-700', bg: 'lgbg-teal-700' },
  { border: 'lgb-rose-700', bg: 'lgbg-rose-700' },
]

function PlanCard({ plan, i }) {
  const c = PLAN_COLOR[i]
  return (
    <div className={`relative w-96 shrink-0 rounded-lg border-2 shadow-2xl ${c.border}`}>
      <div className={`flex flex-col px-12 pb-10 pt-8 ${c.bg}`}>
        <div className="lgbg-teal-200 lgc-zinc-900 w-auto rounded-full px-4 py-1 font-semibold opacity-60">{plan.pill}</div>
        <h3 className="lgc-white my-4 text-3xl font-bold">{plan.name}</h3>
        <p className="lgc-white font-semibold">{plan.blurb}</p>
      </div>
      <div className="lgbg-gray-50 lgb-gray-200 border-b py-10 lgc-black">
        <h3 className="flex items-center justify-center">
          <span className="text-2xl">$</span>
          <span className="text-7xl font-bold">{plan.amount}</span>
          <span className="ml-2 flex flex-col items-start">
            <div className="text-2xl font-semibold">{plan.unit}</div>
            <div className="lgc-gray-600 text-sm font-semibold">{plan.unitSub}</div>
          </span>
        </h3>
        <hr className="lgb-gray-200 mx-auto my-4 w-3/4 border-t" />
        <div className="text-lg font-bold">{plan.fee}</div>
      </div>
      <div className="lgbg-gray-100 rounded-b-xl px-8 pb-12 pt-6">
        <dl className="space-y-4 text-left">
          {plan.note && (
            <dt>
              <p className="lgbg-teal-400 lgc-gray-900 rounded px-4 py-2 font-medium">
                {plan.note[0]}
                <span className="font-bold">{plan.note[1]}</span>
                {plan.note[2]}
              </p>
            </dt>
          )}
          <div className="relative space-y-2 font-normal">
            {plan.groups.map((g) => [
              <dt key={g.title}>
                <p className="lgc-gray-900 mb-1 text-lg font-bold">{g.title}</p>
              </dt>,
              ...g.items.map((item) => (
                <dt key={g.title + item}>
                  <LimeCheck />
                  <p className="lgc-gray-900 ml-8">{item}</p>
                </dt>
              )),
            ])}
          </div>
        </dl>
        <a
          href={plan.href}
          className="lg-plan-btn lgbg-rose-700 lgb-rose-700 lgc-white mt-8 flex w-full items-center justify-center rounded-md border px-4 py-2 text-base font-medium focus:outline-none"
        >
          {plan.cta}
        </a>
      </div>
    </div>
  )
}

function Bullets({ count, active, onSelect, label }) {
  return (
    <div className="lg-pagination">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`${label} ${i + 1}`}
          aria-current={i === active}
          className={`lg-bullet ${i === active ? 'is-active' : ''}`}
          onClick={() => onSelect(i)}
        />
      ))}
    </div>
  )
}

export function PricingBand({ pricing }) {
  const sw = useLegacySwiper({ count: pricing.plans.length, multiQuery: '(min-width: 1260px)', multiPerView: 3 })
  return (
    <div id="pricing" className="lgbg-teal-300 relative py-24" data-legacy="pricing">
      <div>
        <div className="mx-auto max-w-md px-4 text-center lg:max-w-7xl lg:px-8">
          {/* the logo slot keeps its mb-20 even when empty (A3, measured) */}
          <div className="mb-20 w-full">
            {pricing.logo && <img src={pricing.logo.src} alt={pricing.logo.alt} width={pricing.logo.w} height={pricing.logo.h} className="mx-auto" />}
          </div>
          <h2 className="lgc-rose-800 text-base font-bold uppercase tracking-widest">{pricing.eyebrow}</h2>
          <p className="lgc-black my-5 text-3xl font-extrabold tracking-tight">{pricing.title}</p>
          <p className="lgc-gray-500 mx-auto max-w-prose text-xl font-medium tracking-tight">{pricing.lead}</p>
        </div>
        <div ref={sw.viewportRef} className="swiper-pricing relative mx-auto mt-32 max-w-7xl touch-pan-y overflow-hidden" {...sw.dragHandlers}>
          <div ref={sw.wrapperRef} className="flex items-start">
            {pricing.plans.map((plan, i) => (
              <div
                key={plan.name}
                className="flex shrink-0 items-center justify-center text-center"
                style={{ width: `${100 / sw.perView}%` }}
                aria-hidden={!sw.locked && i !== sw.active ? true : undefined}
              >
                <PlanCard plan={plan} i={i} />
              </div>
            ))}
          </div>
          {!sw.locked && <Bullets count={pricing.plans.length} active={sw.active} onSelect={sw.goTo} label="Go to plan" />}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* §2.11 About: logos + testimonial slider (loop, autoplay 5s)          */
/* ------------------------------------------------------------------ */

function TestimonialSlide({ t }) {
  return (
    <div className="relative py-12">
      <div className="md:shrink-0">
        <img src={t.avatar} alt="" className="mx-auto h-24 w-24 rounded-full" />
      </div>
      <blockquote className="mt-10">
        <div className="lgc-zinc-600 mx-auto max-w-4xl text-center text-lg">
          <p>{t.quote}</p>
        </div>
        <div className="my-9 w-full">
          <img src={t.logo} alt={t.company} className="mx-auto h-8" />
        </div>
        <div className="md:flex md:items-center md:justify-center">
          <div className="mt-3 text-center md:ml-4 md:mt-0 md:flex md:items-center">
            <div className="lgc-zinc-800 text-base font-medium">{t.name}</div>
            <SlashDivider className="lgc-zinc-800 mx-1 hidden h-5 w-5 md:block" />
            <div className="lgc-zinc-800 text-base font-medium">{t.role}</div>
          </div>
        </div>
      </blockquote>
    </div>
  )
}

export function AboutBand({ about }) {
  const n = about.testimonials.length
  const sw = useLegacySwiper({ count: n, loop: true })
  // loop: one clone at each end (Swiper loopedSlides)
  const slides = [about.testimonials[n - 1], ...about.testimonials, about.testimonials[0]]
  return (
    // original `bg-stone-100` has no CSS rule (transparent); clone applies Tailwind's stone-100
    <div id="about" className="relative bg-[#F5F5F4] py-32" data-legacy="about">
      <div className="mx-auto max-w-md px-4 text-center lg:max-w-7xl lg:px-8">
        <div>
          <p className="lgc-zinc-800 mt-2 text-5xl font-extrabold tracking-tight">{about.title}</p>
        </div>
      </div>
      <div className="mx-auto my-16 flex max-w-5xl flex-wrap items-center justify-center gap-y-12">
        {about.logoGroups.map((group, gi) => (
          <div key={gi} className="flex gap-x-8">
            {group.map((l) => (
              <img key={l.src} src={l.src} alt={l.alt} className={`m-4 ${l.className}`} />
            ))}
          </div>
        ))}
      </div>
      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <div ref={sw.viewportRef} className="relative touch-pan-y overflow-hidden" {...sw.dragHandlers}>
          <div ref={sw.wrapperRef} className={`flex ${about.wrapperPad ? 'py-12' : ''}`}>
            {slides.map((t, i) => (
              <div key={i} className="w-full shrink-0" aria-hidden={i - 1 !== sw.active ? true : undefined}>
                <TestimonialSlide t={t} />
              </div>
            ))}
          </div>
          <Bullets count={n} active={sw.active} onSelect={sw.goTo} label="Go to testimonial" />
        </div>
      </div>
    </div>
  )
}
