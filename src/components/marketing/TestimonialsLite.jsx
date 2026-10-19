import { useRef } from 'react'
import { artUrl } from '../InlineSvg'
import { SliderArrow, useCarousel } from '../shared'
import { Rich } from '../blocks'
import { useTestimonialsLiteMotion } from '../../motion/marketing'

/**
 * §1.16 TestimonialsLite (telehealth): homepage Testimonials variant. Mobile is a 1-col grid with py 24px
 * (`py-6` wins), row gap 4px, title column mb 40px; md+ is flex space-between (gap-x 32px), py 100u / 200u.
 * No supporting paragraph. Splide { arrows, autoWidth, perPage 1, no pagination }; counter "0N/0M".
 *
 * Props: title (Rich), slides: [{ logo (slug in /assets/art/logos), quote, name, role, avatar (n) }]
 */
export default function TestimonialsLite({ title, slides }) {
  const ref = useRef(null)
  const carousel = useCarousel(slides.length, true)
  useTestimonialsLiteMotion(ref)
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section ref={ref} className="testimonials-section bg-main-white">
      <div className="section-container grid grid-cols-1 gap-x-8 gap-y-1 px-25u py-6 md:flex md:justify-between md:px-40u md:py-100u lg:px-170u lg:py-200u">
        <div className="col-span-1 mb-10 md:mb-0">
          <h3 className="animation-title type-h3 mb-40u text-main-green" data-tl-title>
            <Rich value={title} />
          </h3>
        </div>
        <div className="col-span-1">
          <div className="splide md:w-331u lg:w-424u" data-tl-slider>
            <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track relative overflow-hidden">
              <div ref={carousel.listRef} style={carousel.listStyle} className="splide__list relative flex">
                {slides.map((s, i) => (
                  <div key={s.name} className={`splide__slide relative w-full shrink-0 ${i === carousel.index ? 'is-active' : ''}`}>
                    <div className="mb-16u flex flex-col gap-24u lg:mb-24u">
                      <div className="testimonial-logo">
                        {/* company logo 468x224, object-contain */}
                        <div className="h-60u w-127u lg:h-112u lg:w-234u">
                          <img src={artUrl(`logos/${s.logo}.svg`)} alt="" className="block h-full w-full object-contain" />
                        </div>
                      </div>
                      <h2 className="type-h5 min-h-120u text-main-green md:min-h-80u lg:min-h-120u">{s.quote}</h2>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-12u lg:gap-16u">
                        {/* portrait placeholder 96x96, cover, radius 12u */}
                        <div className="h-45u w-45u min-w-45u overflow-hidden rounded-12u lg:h-48u lg:w-48u lg:min-w-48u">
                          <img src={artUrl(`avatars/avatar-${s.avatar}.svg`)} alt="" className="block h-full w-full object-cover" />
                        </div>
                        <div className="flex w-138u flex-col gap-2u md:w-180u md:gap-4u lg:w-240u lg:gap-2u">
                          <p className="type-p1 mb-2u text-main-green md:mb-4u lg:mb-2u">{s.name}</p>
                          <p className="type-p3 text-main-green opacity-70">{s.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="my-16u h-px w-full bg-green opacity-40 lg:my-24u" />
            <div className="flex items-end justify-between">
              <span className="splide-counter type-h5 text-main-green">
                {pad(carousel.index + 1)}/{pad(slides.length)}
              </span>
              <div className="splide__arrows flex gap-10u">
                <SliderArrow dir="prev" disabled={carousel.index === 0} onClick={carousel.prev} />
                <SliderArrow dir="next" disabled={carousel.index === slides.length - 1} onClick={carousel.next} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
