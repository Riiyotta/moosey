import { useRef, useState } from 'react'
import { useScrollTabsMotion } from '../../motion/blocks'
import { ComplianceCtaCard } from './GenericCta'
import { Rich } from './primitives'

/**
 * §1.7 ScrollTabs — `section.multiColumnList` (entity) / `section#everything` (/solutions).
 *
 * Props
 *   id, title (Rich), desc
 *   tabs: [{ id, label, title?, image: { src, mobileSrc?, alt? }, features: [{ title, desc }] × 3 }]  (4)
 *         `id` is the deep-link anchor (#fq …); `title` is the tablet/mobile card title (defaults to label);
 *         `image.src` 1562x649 (desktop, cover), `image.mobileSrc` 544x358 crop below lg.
 *   linksInset  true → `pl 40u` on the link list (/solutions)
 *   cta         { title, desc } → inline Compliance CTA card after the spacer (/solutions)
 *   sectionClass  override the section class (default `multiColumnList`)
 *
 * Desktop: tabs-wrap pins at `top top+=20%` for a 3000u spacer; progress picks the tab; links are clickable;
 * a URL hash equal to a tab id opens it after 500ms. Tablet/mobile: all 4 items stacked, no motion.
 */
export default function ScrollTabs({ id, title, desc, tabs, linksInset = false, cta, sectionClass = 'multiColumnList' }) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const select = useScrollTabsMotion(ref, setActive)

  return (
    <section ref={ref} id={id} data-block="scroll-tabs" className={`${sectionClass} relative bg-main-white pt-111u`}>
      <div className="medium-container z-10">
        <div className="title-wrap flex flex-col gap-24u md:flex-row md:justify-between md:gap-0 lg:mb-83u">
          <div className="title">
            <h1 className="type-h3 text-main-green">
              <Rich value={title} />
            </h1>
          </div>
          <div className="desc md:w-332u lg:w-424u">
            <p className="type-p2 text-main-green/70">{desc}</p>
          </div>
        </div>

        <div data-st-wrap className="tabs-wrap relative py-110u md:pb-110u md:pt-80u lg:px-40u lg:py-0">
          <ul className="tab-items flex flex-col gap-40u md:gap-80u lg:block">
            {tabs.map((tab, i) => (
              <li
                key={tab.id}
                id={tab.id}
                data-st-item={i}
                className={`tab-item -mt-60u pt-60u lg:absolute lg:right-40u lg:top-0 lg:w-782u ${i === active ? 'active' : ''}`}
              >
                <div className="cart-container">
                  <div className="cart-title-wrap flex justify-between lg:hidden">
                    <div className="title">
                      <h5 className="type-h6 text-black">{tab.title ?? tab.label}</h5>
                    </div>
                    <div className="number">
                      <span className="type-h6 text-black">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>
                  <div className="img-wrap mt-10u md:mt-24u lg:mt-0">
                    <div className="img h-179u w-full md:h-284u lg:h-323u">
                      <img
                        src={tab.image.mobileSrc ?? tab.image.src}
                        alt={tab.image.alt ?? ''}
                        loading="lazy"
                        className="block h-full w-full object-cover lg:hidden"
                      />
                      <img src={tab.image.src} alt={tab.image.alt ?? ''} className="hidden h-full w-full object-cover lg:block" />
                    </div>
                  </div>
                  <div className="features-wrap mt-24u lg:mt-30u">
                    <ul className="flex flex-col gap-16u md:flex-row md:gap-42u lg:gap-16u">
                      {tab.features.map((ft, k) => (
                        <li key={ft.title} className="features-item flex flex-col gap-16u md:flex-1 lg:w-250u lg:flex-none">
                          <div className="feature-container flex flex-col gap-8u lg:gap-14u">
                            <div className="feature-title">
                              <h4 className="type-p1 text-main-green">{ft.title}</h4>
                            </div>
                            <div className="feature-description">
                              <p className="type-p3 text-main-green/70">{ft.desc}</p>
                            </div>
                          </div>
                          {k < tab.features.length - 1 && <div className="h-px w-full bg-main-green/20 md:h-0" aria-hidden="true" />}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <ul className={`tab-links relative hidden flex-col gap-24u lg:flex ${linksInset ? 'pl-40u' : ''}`}>
            {tabs.map((tab, i) => (
              <li key={tab.id} className={`tab-link flex items-center ${i === active ? 'active opacity-100' : 'opacity-40'}`}>
                <button type="button" onClick={() => select(i)} className="text-left">
                  <span className="text-h6-d text-green">{tab.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div data-st-spacer className="spacer hidden pb-3000u lg:block" aria-hidden="true" />
        {cta && (
          <div className="mx-auto w-full pb-110u md:pb-160u lg:w-1020u">
            <ComplianceCtaCard title={cta.title} desc={cta.desc} className="w-full" />
          </div>
        )}
      </div>

      {/* REDRAW: homepage compliance side lines (desktop only) */}
      <div className="bg-lines absolute bottom-0 left-0 right-0 z-[1] hidden w-full justify-between lg:flex" aria-hidden="true">
        <SideLine className="h-1000u w-104u" />
        <SideLine className="h-1000u w-104u -scale-x-100" />
      </div>
    </section>
  )
}

export function SideLine({ className }) {
  return (
    <svg viewBox="0 0 105 1005" fill="none" className={className}>
      <path d="M52 0V560C52 610 20 620 20 670V1005" className="stroke-green2" strokeWidth="1" />
      <circle cx="52" cy="560" r="4" className="fill-green2" />
    </svg>
  )
}
