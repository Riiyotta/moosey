import { useRef } from 'react'
import { useGetStartedMotion } from '../../motion/blocks'
import { MQ_LG, Pagination, useCarousel, useMediaQuery } from '../shared'
import { Rich } from './primitives'

/**
 * §1.11 GetStarted — `section#solutions-get-started.get-started-section`: the homepage PeaceOfMind module
 * with static images (848x528) instead of lotties. 3 steps (payroll, entity, solutions, for-hr) or 4 (handbooks).
 *
 * Props: title (Rich), desc, steps: [{ title, desc, image: { src, alt? } }],
 *        titleClassName? (extra classes on the h3, e.g. 'lg:w-215u' — handbooks' title wraps to 2 lines on desktop only)
 * Desktop: sticky step list + pinned image stack, scrubbed (images in scale .95→1, out →1.05).
 * Tablet/mobile: carousel (inactive neighbours at opacity .5), pagination dots.
 */
export default function GetStarted({ id = 'solutions-get-started', title, desc, steps, titleClassName = '' }) {
  const ref = useRef(null)
  const isLg = useMediaQuery(MQ_LG)
  const carousel = useCarousel(steps.length, !isLg)
  useGetStartedMotion(ref)

  return (
    <section ref={ref} id={id} data-block="get-started" className="get-started-section bg-main-white">
      <div className="section-container pb-155u pt-110u md:py-160u lg:px-170u lg:pb-340u lg:pt-260u">
        <div className="text-block mb-40u px-25u md:mb-94u md:flex md:justify-between md:px-40u lg:mb-110u lg:px-0">
          <h3 className={`animation-title type-h3 mb-24u text-main-green md:mb-0 ${titleClassName}`} data-gs-title>
            <Rich value={title} />
          </h3>
          <div className="opacity-80">
            <p className="animation-desc type-p2 text-main-green/70 md:w-333u lg:w-424u" data-gs-desc>
              {desc}
            </p>
          </div>
        </div>

        {/* tablet / mobile carousel */}
        <div className="lg:hidden">
          <div className="splide relative">
            <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track overflow-hidden px-24.5u md:px-172u">
              <div ref={carousel.listRef} style={carousel.listStyle} data-carousel-list="get-started" className="splide__list relative flex">
                {steps.map((s, i) => (
                  <div
                    key={s.title}
                    className={`card relative mr-16u w-273u shrink-0 transition-all duration-375 ease-[ease] md:mr-67u md:w-424u ${
                      Math.abs(i - carousel.index) === 1 ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="card__icon relative mb-24u h-170u w-full overflow-hidden rounded-12u md:h-264u">
                      <img src={s.image.src} alt={s.image.alt ?? ''} loading="lazy" className="block h-full w-full object-fill" />
                    </div>
                    <div className="card__text relative flex flex-col gap-16u md:gap-12u">
                      <h2 className="card__value type-h5 text-main-green">{s.title}</h2>
                      <p className="card__desc type-p2 text-main-green opacity-70">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Pagination count={steps.length} active={carousel.index} onSelect={carousel.setIndex} className="-bottom-39u md:-bottom-70u" />
          </div>
        </div>

        {/* desktop */}
        <div className="hidden lg:block">
          <div className="peace-steps flex justify-between">
            <div className="flex flex-col gap-340u">
              {steps.map((s, i) => (
                <div key={s.title} data-gs-step={i} className={`peace-step flex gap-123u ${i === 0 ? '' : 'opacity-50'}`}>
                  {/* same numeral tracking compensation as the homepage PeaceOfMind */}
                  <h5 className="text-h5-d tracking-[calc(var(--u)*-1.7)] text-green">{String(i + 1).padStart(2, '0')}</h5>
                  <div className="flex w-333u flex-col gap-20u">
                    <h5 className="text-h5-d text-main-green">{s.title}</h5>
                    <p className="text-p2-d text-main-green opacity-70">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="peace-image-container" data-gs-pin>
              <div data-gs-wrapper className="peace-image-wrapper relative h-264u w-424u overflow-hidden rounded-12u">
                {steps.map((s, i) => (
                  <img
                    key={s.title}
                    data-gs-image={i}
                    src={s.image.src}
                    alt={s.image.alt ?? ''}
                    className={`peace-image absolute left-0 top-0 h-full w-full object-fill ${i === 0 ? '' : 'scale-95 opacity-0'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
