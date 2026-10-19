import { useRef, useState } from 'react'
import { useFeatureCrossfade, useFeatureGroupMotion } from '../../motion/content'

/**
 * §8.5 FeatureGroup: card (desktop: green5/50, 73u 66u padding) with a 3-image well and a single-open
 * accordion. Desktop: pinned while `.spacing` (pb 2000u) scrolls by; the open item follows scroll progress.
 */
export default function FeatureGroup({ group, motionKey }) {
  const ref = useRef(null)
  const [active, setActive] = useState(0)
  useFeatureGroupMotion(ref, group.items.length, setActive, motionKey)
  useFeatureCrossfade(ref, active)

  return (
    <section ref={ref} id="feature-group" className="relative bg-white pb-100u pt-60u md:pb-115u md:pt-120u lg:pb-160u lg:pt-60u">
      <div className="base-container mx-auto w-272u md:w-688u lg:w-1232u">
        <ul className="list flex flex-col gap-60u lg:gap-44u">
          <li className="list-item">
            <div data-fg-card className="list-item-wrap lg:rounded-12u lg:bg-green5/50 lg:px-66u lg:py-73u">
              <div data-fg-title className="title-wrap-mobile flex flex-col gap-16u md:flex-row-reverse md:justify-between lg:hidden">
                <h5 className="type-h5 text-main-green md:w-235u">{group.title}</h5>
                <p className="type-p2 text-main-green/70 md:w-332u">{group.desc}</p>
              </div>
              <div data-fg-content className="content-wrap mt-24u md:mt-40u md:flex md:justify-between lg:mt-0">
                <div className="img-wrap relative h-229u w-272u overflow-hidden rounded-8u md:h-280u md:w-332u lg:h-447u lg:w-530u">
                  {group.images.map((src, i) => (
                    // PLACEHOLDER product UI 1061x895, cover
                    <div key={src} data-fg-img className="img-item absolute inset-0" style={i === 0 ? undefined : { opacity: 0, visibility: 'hidden' }}>
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="desc-list mt-24u md:mt-0 md:w-248u lg:flex lg:w-464u lg:flex-col lg:justify-between">
                  <div className="title-wrap-desktop hidden flex-col gap-16u lg:flex">
                    <h5 className="type-h5 text-main-green">{group.title}</h5>
                    <p className="type-p2 text-main-green/70">{group.desc}</p>
                  </div>
                  <div className="accordion lg:w-384u">
                    {group.items.map((item, i) => {
                      const open = i === active
                      return (
                        <div key={item.title} className="accordion-item relative">
                          <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setActive(i)}
                            // pb: inactive 18/12/20u, active 8/12/12u (the original's [&.active]:pb rules beat lg:pb-20)
                            className={`accordion-button ct-fg-button mt-22u flex w-full items-center text-left md:mt-12u md:pb-12u lg:mt-20u ${
                              open ? 'active pb-8u text-green lg:pb-12u' : 'pb-18u text-main-green/40 lg:pb-20u'
                            }`}
                          >
                            <span className="accordion-title type-h6 w-237u md:w-297u lg:w-435u">{item.title}</span>
                          </button>
                          <div className="accordion-content">
                            <div className="inner pb-16u lg:pb-20u">
                              <p className="type-p2 text-main-green/70">{item.desc}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-40u h-[2px] bg-green/20 lg:hidden" />
            <div data-fg-spacing className="spacing hidden pb-2000u lg:block" />
          </li>
        </ul>
      </div>
    </section>
  )
}
