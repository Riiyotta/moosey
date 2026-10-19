import { useRef } from 'react'
import { MQ_MD, Pagination, useCarousel, useMediaQuery } from '../shared'
import { useGuideBenefitsMotion } from '../../motion/content'

/**
 * §8.2 Benefits variant for guides (copy of src/components/Benefits.jsx, data-driven):
 * no title/description row, container py 110u at every size, icons are <img> (opacity .4 -> 1 on hover).
 */
export default function GuideBenefits({ items, motionKey }) {
  const ref = useRef(null)
  const isMd = useMediaQuery(MQ_MD)
  const carousel = useCarousel(items.length, !isMd)
  useGuideBenefitsMotion(ref, motionKey)

  return (
    <section ref={ref} id="guide-benefits" className="benefits-section relative bg-main-white">
      <div className="section-container py-110u">
        <div className="splide relative" data-anim="cards">
          <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track relative overflow-hidden px-24.5u md:px-0">
            <div
              ref={carousel.listRef}
              style={carousel.listStyle}
              className="splide__list cards-block relative flex md:justify-center md:gap-21u lg:gap-40u"
            >
              {items.map((card, i) => (
                <div
                  key={card.title}
                  data-benefit-card={i}
                  className="card group relative mr-16u w-265u min-w-265u shrink-0 px-24u pb-24u pt-50u md:mr-0 md:w-215u md:min-w-215u md:pt-35u lg:w-332u lg:min-w-332u lg:px-32u lg:pb-32u lg:pt-61u"
                >
                  <div className="card__bg absolute left-0 top-0 z-0 h-full w-full rounded-12u bg-white opacity-40 transition-all duration-375 ease-[ease] group-hover:opacity-100" />
                  {/* PLACEHOLDER line pictogram 172x104 */}
                  <div className="card__icon relative mx-auto mb-55u h-104u w-172u md:mb-33u md:h-99u md:w-163u lg:mb-46u lg:h-143u lg:w-236u">
                    <img
                      src={card.icon}
                      alt=""
                      className="block h-full w-full opacity-40 transition duration-300 ease-in-out group-hover:opacity-100"
                    />
                  </div>
                  <div className={`card__text relative flex flex-col gap-8u ${i === 0 ? 'lg:gap-12u' : ''}`}>
                    <h2 className="card__value type-h2 text-main-green">{card.title}</h2>
                    <p className="card__desc type-p3 text-main-green opacity-70">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination count={items.length} active={carousel.index} onSelect={carousel.setIndex} className="-bottom-24u md:hidden" />
        </div>
      </div>
    </section>
  )
}
