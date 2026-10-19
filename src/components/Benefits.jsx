import InlineSvg, { art } from './InlineSvg'
import { MQ_MD, Pagination, useCarousel, useMediaQuery } from './shared'

const CARDS = [
  { value: '8 hrs back', desc: 'Ops leads reclaim most of a working day each month that used to go to portals.' },
  {
    value: '1 timeline',
    desc: 'Every due date, owner and document for every entity lives on a single shared calendar your whole team can see.',
  },
  { value: 'Zero gaps', desc: 'Nothing waits on memory: each obligation is tracked from first notice to receipt.' },
]

/** §8 Benefits stats — 3 cards (row on >=481, carousel on mobile) */
export default function Benefits() {
  const isMd = useMediaQuery(MQ_MD)
  const carousel = useCarousel(CARDS.length, !isMd)

  return (
    <section id="homepage-benefits" data-section="benefits" className="benefits-section bg-main-white">
      <div className="section-container pb-140u pt-110u md:py-160u lg:py-260u">
        <div className="text-block mb-73u px-25u md:mb-80u md:flex md:justify-between md:px-41u lg:mb-83u lg:px-170u">
          <h3 className="animation-title type-h3 mb-24u text-main-green" data-anim="title">
            Get <span className="text-green">time back</span> daily.
          </h3>
          <div className="opacity-80">
            <p className="animation-desc type-p2 text-main-green/70 md:w-333u lg:w-424u" data-anim="desc">
              Compliance work tends to pile up quietly until a notice arrives. Northwind turns it into a short, predictable
              routine, freeing your team to focus on the work that grows the company.
            </p>
          </div>
        </div>

        <div className="splide relative" data-anim="cards">
          <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track relative overflow-hidden px-24.5u md:px-0">
            <div
              ref={carousel.listRef}
              style={carousel.listStyle}
              data-carousel-list="benefits"
              className="splide__list cards-block relative flex md:justify-center md:gap-21u lg:gap-40u"
            >
              {CARDS.map((card, i) => (
                <div
                  key={card.value}
                  data-benefit-card={i}
                  className="card group relative mr-16u w-265u min-w-265u shrink-0 px-24u pb-24u pt-50u md:mr-0 md:w-215u md:min-w-215u md:pt-35u lg:w-332u lg:min-w-332u lg:px-32u lg:pb-32u lg:pt-61u"
                >
                  <div className="card__bg absolute left-0 top-0 z-0 h-full w-full rounded-12u bg-white opacity-40 transition-all duration-375 ease-[ease] group-hover:opacity-100" />
                  {/* pictogram 172:104, fill green inside <g opacity .2> (1 on hover) */}
                  <div className="card__icon relative mx-auto mb-55u h-104u w-172u md:mb-33u md:h-99u md:w-163u lg:mb-46u lg:h-143u lg:w-236u">
                    <InlineSvg
                      svg={art(`benefits/benefit-${i + 1}.svg`)}
                      uid={`benefit-${i + 1}`}
                      groupClassName="opacity-20 transition-all duration-375 ease-[ease] group-hover:opacity-100"
                    />
                  </div>
                  {/* gap: 12u on lg for the first card only (original class typo on cards 2–3) */}
                  <div className={`card__text relative flex flex-col gap-8u ${i === 0 ? 'lg:gap-12u' : ''}`}>
                    <h2 className="card__value type-h2 text-main-green">{card.value}</h2>
                    <p className="card__desc type-p3 text-main-green opacity-70">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination
            count={CARDS.length}
            active={carousel.index}
            onSelect={carousel.setIndex}
            className="-bottom-24u md:hidden"
          />
        </div>
      </div>
    </section>
  )
}
