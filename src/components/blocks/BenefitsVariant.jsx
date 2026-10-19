import { useRef } from 'react'
import { useBenefitsVariantMotion } from '../../motion/blocks'
import { MQ_MD, Pagination, useCarousel, useMediaQuery } from '../shared'
import { Rich } from './primitives'

/**
 * §1.9 BenefitsLanding — homepage Benefits with: py 110u at every breakpoint, an <img> icon at opacity .4
 * (→ 1 on card hover, 300ms cubic-bezier(.4,0,.2,1)), and gap 12u on every card's text.
 *
 * Props
 *   title  Rich segments (may include '\n')
 *   desc   ~150–175c
 *   cards  [{ value, desc, icon: { src, alt? } }]  (3)
 *          icon box is 236x143u / 163x99u / 172x104u (desktop / tablet / mobile); the img is full width with height
 *          from its aspect and may overflow the box (as the original's PNG pictograms do).
 * Motion: identical to homepage benefits (title, desc +.06s; cards 2-1-3; mobile slider).
 */
export default function BenefitsVariant({ id = 'landing-benefits', title, desc, cards }) {
  const ref = useRef(null)
  const isMd = useMediaQuery(MQ_MD)
  const carousel = useCarousel(cards.length, !isMd)
  useBenefitsVariantMotion(ref)

  return (
    <section ref={ref} id={id} data-block="benefits-variant" className="benefits-section bg-main-white">
      <div className="section-container py-110u">
        <div className="text-block mb-73u px-25u md:mb-80u md:flex md:justify-between md:px-41u lg:mb-83u lg:px-170u">
          <h3 className="animation-title type-h3 mb-24u text-main-green" data-bv-title>
            <Rich value={title} />
          </h3>
          <div className="opacity-80">
            <p className="animation-desc type-p2 text-main-green/70 md:w-333u lg:w-424u" data-bv-desc>
              {desc}
            </p>
          </div>
        </div>

        <div className="splide relative" data-bv-slider>
          <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track relative overflow-hidden px-24.5u md:px-0">
            <div
              ref={carousel.listRef}
              style={carousel.listStyle}
              data-carousel-list="benefits-variant"
              className="splide__list cards-block relative flex md:justify-center md:gap-21u lg:gap-40u"
            >
              {cards.map((card, i) => (
                <div
                  key={card.value}
                  data-bv-card={i}
                  className="card bv-card group relative mr-16u w-265u min-w-265u shrink-0 px-24u pb-24u pt-50u md:mr-0 md:w-215u md:min-w-215u md:pt-35u lg:w-332u lg:min-w-332u lg:px-32u lg:pb-32u lg:pt-61u"
                >
                  <div className="card__bg absolute left-0 top-0 z-0 h-full w-full rounded-12u bg-white opacity-40 transition-all duration-375 ease-[ease] group-hover:opacity-100" />
                  <div className="card__icon bv-card__icon relative mx-auto mb-55u h-104u w-172u md:mb-33u md:h-99u md:w-163u lg:mb-46u lg:h-143u lg:w-236u">
                    <img src={card.icon.src} alt={card.icon.alt ?? ''} className="block h-auto w-full" />
                  </div>
                  <div className="card__text relative flex flex-col gap-8u lg:gap-12u">
                    <h2 className="card__value type-h2 text-main-green">{card.value}</h2>
                    <p className="card__desc type-p3 text-main-green opacity-70">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination count={cards.length} active={carousel.index} onSelect={carousel.setIndex} className="-bottom-24u md:hidden" />
        </div>
      </div>
    </section>
  )
}
