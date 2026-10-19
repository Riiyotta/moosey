import { artUrl } from './InlineSvg'
import { SliderArrow, useCarousel } from './shared'

const LOGOS = ['quillfield', 'solenne', 'marlowe', 'orbitra', 'halcyon', 'fernway']

const SLIDES = [
  {
    quote: 'Before Northwind we tracked filings in three spreadsheets. Now every deadline lives in one place and nothing slips past our team.',
    body: 'We stopped worrying about the calendar.',
    name: 'Jordan Reyes',
    role: 'Head of Operations, Example Co.',
  },
  {
    quote: 'Opening payroll accounts in new states used to take weeks. Now it takes days.',
    body: 'Our team grew into four new states in a single quarter. Northwind handled every registration and tax account along the way, kept us informed at each step and flagged a local requirement we had completely missed. That one catch alone was worth the subscription for the year.',
    name: 'Priya Natarajan',
    role: 'Chief of Staff',
  },
  {
    quote: 'The notices inbox is my favorite feature. Letters get summarized and routed to the right person immediately.',
    body: 'We no longer lose track of state mail, and responses go out well before any deadline.',
    name: 'Casey Morgan',
    role: 'Controller, Sample Labs',
  },
  {
    quote: 'Annual reports for our six entities used to eat a full week each spring. Now they are prepared for us and we simply approve them.',
    body: 'The specialists know our structure, catch the edge cases and explain every change in plain language. It feels like having an extra person on the finance team without the extra headcount.',
    name: 'Taylor Brooks',
    role: 'VP of Finance',
  },
  {
    quote: 'Setup took one afternoon and the first report was ready the next day.',
    body: 'Connecting our payroll provider was simple, and the checklist it produced was clear and complete.',
    name: 'Morgan Ellis',
    role: 'People Lead, Demo',
  },
  {
    quote: 'Knowing an expert is reviewing everything gives our leadership real confidence.',
    body: 'We expanded into new markets this year without adding compliance headcount. Northwind kept registrations, renewals and filings moving while our small team focused on hiring and growth.',
    name: 'Avery Collins',
    role: 'Director of People, Placeholder Group',
  },
]

/** §11 Testimonials — title + slider (arrows, counter, no pagination) */
export default function Testimonials() {
  const carousel = useCarousel(SLIDES.length, true)
  const pad = (n) => String(n).padStart(2, '0')

  return (
    <section id="homepage-testimonials" data-section="testimonials" className="testimonials-section bg-main-white">
      <div className="section-container px-25u pb-50u md:flex md:justify-between md:px-40u md:pb-100u lg:px-170u lg:pb-200u">
        <h3 className="animation-title type-h3 mb-40u text-main-green md:w-272u lg:w-400u" data-anim="title">
          Teams that switched to <span className="text-green">calmer</span> compliance
        </h3>
        {/* mobile-only divider under the title */}
        <div className="divider mb-16u h-px w-full bg-green md:hidden" data-anim="divider" />

        <div className="splide md:w-331u lg:w-424u" data-anim="slider">
          <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track relative overflow-hidden">
            <div ref={carousel.listRef} style={carousel.listStyle} data-carousel-list="testimonials" className="splide__list relative flex">
              {SLIDES.map((s, i) => (
                <div key={s.name} className={`splide__slide relative w-full shrink-0 ${i === carousel.index ? 'is-active' : ''}`}>
                  <div className="mb-16u flex flex-col gap-24u lg:mb-24u">
                    <div className="testimonial-logo">
                      {/* company logo 468x224, object-fit contain */}
                      <div className="h-60u w-127u lg:h-112u lg:w-234u">
                        <img src={artUrl(`logos/${LOGOS[i]}.svg`)} alt="" className="block h-full w-full object-contain" />
                      </div>
                    </div>
                    <h2 className="type-h5 min-h-120u text-main-green md:min-h-80u lg:min-h-120u">{s.quote}</h2>
                    <p className="type-p2 min-h-120u text-main-green opacity-70">{s.body}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-12u lg:gap-16u">
                      {/* square portrait 96x96, cover, radius 12u */}
                      <div className="h-45u w-45u min-w-45u overflow-hidden rounded-12u lg:h-48u lg:w-48u lg:min-w-48u">
                        <img src={artUrl(`avatars/avatar-${i + 1}.svg`)} alt="" className="block h-full w-full rounded-12u object-cover" />
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
            <span className="splide-counter type-h5 text-main-green" data-testimonial-counter>
              {pad(carousel.index + 1)}/{pad(SLIDES.length)}
            </span>
            <div className="splide__arrows flex gap-10u lg:gap-14u">
              <SliderArrow dir="prev" disabled={carousel.index === 0} onClick={carousel.prev} />
              <SliderArrow dir="next" disabled={carousel.index === SLIDES.length - 1} onClick={carousel.next} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
