import { useState } from 'react'
import InlineSvg, { art } from './InlineSvg'
import { TabBar } from './shared'
import { useHeroMotion } from '../motion/hero'

const TABS = ['Company Setup', 'Monthly', 'Quarterly']

/** §3 Hero — title row, 3 stacked tab visuals, popup CTA (tab 3), tab links with timer rings */
export default function Hero() {
  const [active, setActive] = useState(0)
  // auto-advance, timer rings, visual swap and popup timeline (src/motion/hero.js)
  const select = useHeroMotion(active, setActive)

  return (
    <section id="homepage-hero" data-section="hero" className="hero-section relative bg-white">
      <div className="section-container pb-12u pt-55u md:pb-37u md:pt-112u lg:pb-40u lg:pt-121u">
        <div className="title-wrap relative z-10 flex w-full justify-between pl-24u md:px-40u lg:px-104u" data-anim="hero-title">
          <h1 className="type-h3 w-187u text-main-green md:w-241u lg:w-345u">Entity compliance made simple.</h1>
          <div className="desc flex">
            <p className="type-p3 hidden h-57u w-221u border-l border-solid border-green4 pl-16u text-main-green md:inline-block lg:w-343u">
              Track filings and deadlines for <span className="text-green">every entity you own</span> from a single,
              calm dashboard.
            </p>
          </div>
        </div>

        <div className="tabs-wrap flex flex-col items-center" data-anim="hero-tabs">
          <ul className="tab-items relative mt-39u flex w-full justify-center pb-280u md:pb-665u lg:pb-440u" data-tab-items="hero">
            {TABS.map((label, i) => (
              <li
                key={label}
                data-tab-item={i}
                className={`tab-item absolute left-0 right-0 -top-20u w-full md:top-103u lg:-top-147u ${i === active ? 'active' : ''}`}
              >
                {/* inactive: scale(.86) opacity 0 (§3) */}
                <div data-hero-visual={i} className={`image-block ${i === active ? 'opacity-100' : 'scale-[.86] opacity-0'}`}>
                  {/* hero tab art, desktop 1440x566 viewBox in a 1440x570u box */}
                  <div className="bodymovin-wrap hidden lg:block lg:h-570u lg:w-full" data-lottie-placeholder={`hero-desktop-${i + 1}`}>
                    <InlineSvg svg={art(`hero/hero-tab-${i + 1}.svg`)} uid={`hero-tab-${i + 1}`} />
                  </div>
                  {/* hero mobile art, 904x804 viewBox, 100% x 275u / 400u (same inner ids as desktop) */}
                  <div className="bodymovin-wrap-mobile h-275u w-full md:h-400u lg:hidden" data-lottie-placeholder={`hero-mobile-${i + 1}`}>
                    <InlineSvg svg={art(`hero/hero-tab-${i + 1}-mobile.svg`)} uid={`hero-tab-${i + 1}-m`} />
                  </div>
                </div>
                {i === TABS.length - 1 && <PopupCta />}
              </li>
            ))}
          </ul>

          <TabBar
            name="hero"
            labels={TABS}
            active={active}
            onSelect={select}
            ulClass="w-280u px-17u md:w-465u md:px-35u"
            liClass="pb-19u"
            indicatorClass="w-113u md:w-153u"
            renderAfterLabel={(i) => (
              <svg
                viewBox="0 0 15 15"
                data-timer-ring={i}
                className={`timer-svg ml-5u h-12u w-12u -rotate-90 ${i === active ? 'opacity-100' : 'opacity-0'}`}
              >
                <circle cx="7.5" cy="7.5" r="6" className="stroke-green/20" />
                <circle cx="7.5" cy="7.5" r="6" className="stroke-green" />
              </svg>
            )}
          />
        </div>
      </div>

      {/* Tablet bottom curves (REDRAW) */}
      <div className="absolute bottom-0 left-0 right-0 hidden w-full md:flex lg:hidden" aria-hidden="true">
        <CurvesSmall className="absolute bottom-0 right-0 flex h-134u w-123u -scale-x-100 md:h-144u md:w-133u" />
        <CurvesSmall className="absolute bottom-0 flex h-134u w-123u md:h-144u md:w-133u" />
      </div>
      {/* Desktop bottom curves (REDRAW) */}
      <div className="absolute bottom-0 left-0 right-0 hidden w-full lg:flex" aria-hidden="true">
        <CurvesLarge className="absolute bottom-0 right-0 flex h-170u w-423u -scale-x-100" />
        <CurvesLarge className="absolute bottom-0 flex h-170u w-423u" />
      </div>
    </section>
  )
}

/** §3 Popup CTA on tab 3 — hidden (opacity 0) until the Animation timeline opens it */
function PopupCta() {
  return (
    <div data-hero-popup className="cta absolute left-0 right-0 top-35u flex flex-col items-center opacity-0 md:top-75u lg:top-165u">
      <div
        data-hero-popup-card
        className="cta-container flex w-250u flex-col items-center rounded-12u bg-green5 px-16u py-24u lg:w-717u lg:flex-row lg:gap-24u lg:p-32u"
      >
        <div className="left-block flex flex-col items-center lg:w-235u lg:items-start">
          <div className="title mt-8u">
            <h5 className="type-h5 text-center text-green lg:text-left">Put Every Filing on Autopilot Today</h5>
          </div>
        </div>
        {/* popup visual 790x450 native, fill */}
        {/* Original: no width on the visual — the img's natural 790px is the flex basis and it shrinks
            against the 235u left block (485x276 @1440, 440x251 @1280). Reproduce with a px basis. */}
        <div className="right-block hidden lg:block lg:w-[790px]">
          <div className="visual aspect-[790/450] w-full overflow-hidden" data-placeholder="hero-cta-visual">
            <InlineSvg svg={art('hero/hero-popup-visual.svg')} uid="hero-popup" fit="slice" className="block h-full w-full bg-main-white" />
          </div>
        </div>
      </div>

      <div className="line-wrap absolute left-0 top-0 w-full" aria-hidden="true">
        <div data-hero-popup-line="left" className="left-line absolute left-0 top-21u lg:top-27u">
          <CoilSmall className="h-163u w-44u md:hidden" />
          <CoilLarge className="hidden h-241u w-146u md:block md:w-235u lg:w-250u" />
        </div>
        <div data-hero-popup-line="right" className="right-line absolute right-0 top-21u lg:top-27u">
          <CoilSmall className="h-163u w-44u scale-[-1] md:hidden" />
          <CoilLarge className="hidden h-241u w-146u scale-[-1] md:block md:w-235u lg:w-250u" />
        </div>
      </div>
    </div>
  )
}

/* ---- REDRAW line art ---------------------------------------------------- */

function Coil({ y, x0, x1, loops, ry, rx }) {
  // a straight run into a small spring, then a line to the end dot
  const step = (x1 - x0) / loops
  let d = `M0 ${y} H${x0}`
  for (let i = 0; i < loops; i++) {
    const a = x0 + i * step
    d += ` C${a + rx} ${y - ry} ${a + step + rx} ${y - ry} ${a + step} ${y}`
    d += ` C${a + step - rx * 0.6} ${y + ry * 0.6} ${a + step - rx * 0.2} ${y + ry * 0.6} ${a + step} ${y}`
  }
  return <path d={d} className="stroke-green" strokeWidth="1" fill="none" />
}

function CoilLarge({ className }) {
  return (
    <svg viewBox="0 0 251 241" fill="none" className={className}>
      <Coil y={160} x0={175} x1={217} loops={6} ry={12} rx={3} />
      <path d="M217 160H242" className="stroke-green" strokeWidth="1" />
      <circle cx="245.5" cy="160" r="3.5" className="fill-green stroke-white" strokeWidth="1" />
    </svg>
  )
}

function CoilSmall({ className }) {
  return (
    <svg viewBox="0 0 44 163" fill="none" className={className}>
      <Coil y={100} x0={12} x1={30} loops={4} ry={8} rx={2} />
      <path d="M30 100H37" className="stroke-green" strokeWidth="1" />
      <circle cx="40" cy="100" r="3" className="fill-green stroke-white" strokeWidth="1" />
    </svg>
  )
}

function CurvesLarge({ className }) {
  return (
    <svg viewBox="0 0 422 170" fill="none" className={className}>
      <g className="stroke-green2" strokeWidth="1">
        <path d="M0 5H85C150 5 190 126 270 126" />
        <path d="M0 67H150C190 67 205 126 240 126" />
        <path d="M0 126H412" />
        <path d="M45 170C70 140 90 126 130 126" />
        <path d="M255 170C275 140 295 126 330 126" />
      </g>
      <circle cx="416" cy="126" r="5" className="fill-green2" />
    </svg>
  )
}

function CurvesSmall({ className }) {
  return (
    <svg viewBox="0 0 123 154" fill="none" className={className}>
      <g className="stroke-green2" strokeWidth="1">
        <path d="M0 20H25C55 20 70 110 100 110" />
        <path d="M0 110H114" />
        <path d="M20 154C30 130 40 110 60 110" />
      </g>
      <circle cx="117" cy="110" r="4" className="fill-green2" />
    </svg>
  )
}
