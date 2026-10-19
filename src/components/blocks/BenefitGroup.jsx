import { useRef, useState } from 'react'
import { useBenefitGroupMotion } from '../../motion/blocks'
import { artUrl } from '../InlineSvg'
import { TabBar } from '../shared'
import { ComplianceCtaCard } from './GenericCta'
import { SideLine } from './ScrollTabs'
import { Rich } from './primitives'

/**
 * §1.10 BenefitGroup — `section.benefit-group-section` (handbooks): homepage RoleTabs without the orange gradient,
 * container padding-top 0, 3 tabs, inline Compliance CTA card. Motion = homepage compliance tabs (no lottie art).
 *
 * Props
 *   title  Rich (p1 token, centered, ~69c, 2 lines)
 *   tabs   [{ label, image: { src, alt? }, items: [{ icon, title, desc }] × 3 }]
 *          icon = slug in /assets/art/icons/*.svg (26u / 22u); image 2580x1868, cover in 645x447u
 *   cta    { title, desc }
 */
export default function BenefitGroup({ id, title, tabs, cta }) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  const [shownItem, setShownItem] = useState(0)
  const select = useBenefitGroupMotion(ref, active, setActive, setShownItem)

  return (
    <section ref={ref} id={id} data-block="benefit-group" className="benefit-group-section relative z-[1] bg-main-white pb-39u md:pb-81u lg:pb-120u">
      <div className="section-container relative z-10 flex flex-col items-center md:pb-50u">
        <div className="title-wrap w-202u md:w-232u lg:w-328u" data-bg-title>
          <h3 className="type-p1 text-center text-main-green">
            <Rich value={title} />
          </h3>
        </div>

        <div className="tabs-wrap mt-45u flex flex-col items-center" data-bg-tabs>
          <TabBar
            name={id ?? 'benefit-group'}
            labels={tabs.map((t) => t.label)}
            active={active}
            onSelect={select}
            ulClass="w-272u px-21u md:w-440u md:px-35u lg:w-448u lg:px-37u"
            liClass="pb-16u"
            indicatorClass="w-90u md:w-115u"
          />
          <ul data-bg-items className="tab-items relative mt-24u flex w-full justify-center pb-614u md:mt-40u md:w-510u md:pb-800u lg:mt-60u lg:w-1020u lg:pb-570u">
            {tabs.map((tab, i) => (
              <li
                key={tab.label}
                data-bg-item={i}
                aria-hidden={i !== active}
                className={`tab-item absolute top-0 md:w-full ${i === active && i === shownItem ? 'active z-[1] opacity-100' : 'pointer-events-none opacity-0'}`}
              >
                <div className="item-container flex w-full flex-col lg:flex-row-reverse lg:justify-between">
                  <div className="h-189u overflow-hidden rounded-5u md:h-354u md:rounded-9u lg:h-447u lg:w-645u lg:rounded-12u">
                    <div className="image image-block relative h-full w-full" data-bg-image>
                      <img src={tab.image.src} alt={tab.image.alt ?? ''} className="block h-full w-full object-cover" />
                    </div>
                  </div>
                  <div className="future-block mt-16u rounded-12u md:mt-24u lg:mt-0">
                    <ul className="list-element flex w-272u flex-col gap-18u overflow-hidden p-16u md:w-full lg:w-359u lg:gap-24u lg:p-24u">
                      {tab.items.map((it, j) => (
                        <ListEntry key={it.title} {...it} divider={j > 0} />
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
            <li
              aria-hidden="true"
              className="bg-image-tab absolute top-0 z-[-1] h-189u w-full rounded-5u bg-beige md:h-354u md:w-510u md:rounded-9u lg:right-0 lg:h-447u lg:w-645u lg:rounded-12u"
            />
            <li
              aria-hidden="true"
              data-bg-list
              className="bg-list absolute left-0 top-205u z-[-1] h-189u w-272u rounded-12u bg-main-white md:top-375u md:w-full lg:top-0 lg:w-359u"
            />
          </ul>
        </div>

        {cta && <ComplianceCtaCard title={cta.title} desc={cta.desc} />}
      </div>

      <div className="bg-lines absolute bottom-0 left-0 right-0 z-[1] hidden w-full justify-between md:flex" aria-hidden="true">
        <SideLine className="md:h-617u md:w-64u lg:h-1000u lg:w-104u" />
        <SideLine className="-scale-x-100 md:h-617u md:w-64u lg:h-1000u lg:w-104u" />
      </div>
    </section>
  )
}

function ListEntry({ icon, title, desc, divider }) {
  return (
    <>
      {divider && <li role="presentation" className="divider h-1u w-full bg-beige" data-bg-divider />}
      <li className="text-block flex flex-col gap-8u" data-bg-text>
        <div className="title flex gap-8u">
          <div className="icon h-22u w-22u lg:h-26u lg:w-26u">
            <img src={artUrl(`icons/${icon}.svg`)} alt="" className="block h-full w-auto" />
          </div>
          <h6 className="type-h6 whitespace-nowrap text-main-green">{title}</h6>
        </div>
        <div className="desc">
          <p className="type-p4 text-main-green/70">{desc}</p>
        </div>
      </li>
    </>
  )
}
