import InlineSvg, { art } from './InlineSvg'
import { MQ_LG, Pagination, useCarousel, useMediaQuery } from './shared'

const STEPS = [
  {
    title: 'A dedicated expert on your side',
    desc: 'Every account is paired with a specialist who knows your footprint, answers questions quickly and reviews anything unusual before it grows.',
  },
  {
    title: 'Filings handled ahead of time',
    desc: 'Returns, reports and renewals are prepared well before each due date, so your team only needs to review and approve them instead of chasing paperwork at the last minute.',
  },
  {
    title: 'Every notice read and routed',
    desc: 'Government mail is scanned the day it arrives, summarized in plain language and sent to the right owner with a clear next step attached.',
  },
  {
    title: 'Clear answers whenever a new question comes up',
    desc: 'Our help center and specialists explain what each rule means for your company in plain terms.',
  },
]

/** §10 Peace of mind — desktop sticky steps + pinned image stack; tablet/mobile carousel */
export default function PeaceOfMind() {
  const isLg = useMediaQuery(MQ_LG)
  const carousel = useCarousel(STEPS.length, !isLg)

  return (
    <section id="homepage-peace" data-section="peace" className="peace-section bg-main-white">
      <div className="section-container pb-155u pt-110u md:py-160u lg:px-170u lg:pb-340u lg:pt-260u">
        <div className="text-block mb-40u px-25u md:mb-94u md:flex md:justify-between md:px-40u lg:mb-110u lg:px-0">
          <h3 className="animation-title type-h3 mb-24u text-main-green md:mb-0" data-anim="title">
            Finally, <span className="text-green">calm</span>
          </h3>
          <div className="opacity-80">
            <p className="animation-desc type-p2 text-main-green/70 md:w-333u lg:w-424u" data-anim="desc">
              Northwind pairs software with real specialists, so the routine work gets done on time and the unusual work
              gets handled by someone who knows it well.
            </p>
          </div>
        </div>

        {/* tablet / mobile carousel */}
        <div className="lg:hidden">
          <div className="splide relative">
            <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track overflow-hidden px-24.5u md:px-172u">
              <div ref={carousel.listRef} style={carousel.listStyle} data-carousel-list="peace" className="splide__list cards-block relative flex">
                {STEPS.map((s, i) => (
                  <div
                    key={s.title}
                    className={`card relative mr-16u w-273u shrink-0 transition-all duration-375 ease-[ease] md:mr-67u md:w-424u ${
                      Math.abs(i - carousel.index) === 1 ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="card__icon relative mb-24u h-170u w-full overflow-hidden rounded-12u md:h-264u">
                      {/* step illustration 848x528 */}
                      <div className="peace-image-responsive h-full w-full" data-lottie-placeholder={`peace-${i + 1}`}>
                        <InlineSvg svg={art(`peace/peace-step-${i + 1}.svg`)} uid={`peace-step-${i + 1}-m`} fit="slice" className="block h-full w-full bg-white" />
                      </div>
                    </div>
                    <div className="card__text relative flex flex-col gap-16u md:gap-12u">
                      <h2 className="card__value type-h5 text-main-green">{s.title}</h2>
                      <p className="card__desc type-p2 text-main-green opacity-70">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Pagination count={STEPS.length} active={carousel.index} onSelect={carousel.setIndex} className="-bottom-39u md:-bottom-70u" />
          </div>
        </div>

        {/* desktop */}
        <div className="hidden lg:block">
          <div className="peace-steps flex justify-between" data-peace-steps>
            <div className="flex flex-col gap-340u">
              {STEPS.map((s, i) => (
                <div key={s.title} data-peace-step={i} className={`peace-step flex gap-123u ${i === 0 ? '' : 'opacity-50'}`}>
                  {/* Figtree numerals run ~1.5u wider than Circular's at h5; tighten so the 123u gap lands the text column on the original x */}
                  <h5 className="text-h5-d tracking-[calc(var(--u)*-1.7)] text-green">{String(i + 1).padStart(2, '0')}</h5>
                  <div className="flex w-333u flex-col gap-20u">
                    <h5 className="text-h5-d text-main-green">{s.title}</h5>
                    <p className="text-p2-d text-main-green opacity-70">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="peace-image-container" data-peace-pin>
              <div className="peace-image-wrapper relative h-264u w-424u overflow-hidden rounded-12u">
                {STEPS.map((s, i) => (
                  <div
                    key={s.title}
                    data-peace-image={i}
                    data-lottie-placeholder={`peace-${i + 1}`}
                    className={`peace-image absolute left-0 top-0 h-full w-full ${i === 0 ? '' : 'scale-95 opacity-0'}`}
                  >
                    <InlineSvg svg={art(`peace/peace-step-${i + 1}.svg`)} uid={`peace-step-${i + 1}`} fit="slice" className="block h-full w-full bg-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
