import { useState } from 'react'
import { CheckCircle, Chevron, MQ_LG, Pagination, useCarousel, useMediaQuery } from './shared'

const PLANS = [
  {
    employees: '1–49 employees',
    title: 'Essential',
    desc: 'Everything a young company needs to register in new states, open tax accounts and keep annual filings on track.',
    price: '$199',
    perMonth: 'per entity / month',
    fee: '$500',
    feeLabel: 'one-time setup fee',
    border: 'border-plan1',
    text: 'text-plan1',
  },
  {
    employees: '50–249 FTE',
    title: 'Standard',
    desc: 'For growing teams in several states who want a specialist reviewing each filing before it goes out.',
    price: '$399',
    perMonth: 'per entity / month',
    fee: '$500',
    feeLabel: 'one-time setup fee',
    border: 'border-plan2',
    text: 'text-plan2',
  },
  {
    employees: '250+ employees',
    title: 'Advanced',
    desc: 'Built for multi-entity organizations that need custom workflows, approvals and a dedicated compliance partner on call.',
    price: '$1,299',
    perMonth: 'per entity, monthly',
    fee: '$1,500',
    feeLabel: 'one-time setup fee',
    border: 'border-plan3',
    text: 'text-plan3',
  },
]

// value: string | string[] (explicit line breaks) | true (check icon)
const ROWS = [
  ['Entities', ['Up to 3 entities'], ['Up to 10 entities'], ['Unlimited']],
  [
    'State registrations included',
    ['Payroll and unemployment accts', 'in up to five operating states'],
    ['Payroll and unemployment accts', 'in up to twenty states, any mix'],
    ['All states'],
  ],
  [
    'Annual report prep',
    ['Preparation and filing of each report', 'for every entity you operate', 'in each state you join', 'with reminders before the due date'],
    ['Preparation and filing of each report', 'for every entity you operate', 'in each state you join', 'with reminders before the due date'],
    ['Preparation, review and filing', 'by a specialist for each entity', 'in every state and county', 'with a sign-off step before any submission'],
  ],
  [
    'Tax accounts',
    ['Withholding setup', 'Unemployment insurance', 'Local tax accounts', 'Rate change notifications sent'],
    ['Withholding setup', 'Unemployment insurance', 'Local tax accounts', 'Rate change notifications sent', 'Quarterly rate review'],
    ['Withholding setup', 'Unemployment insurance', 'Local tax accounts', 'Rate change notifications sent', 'Quarterly rate review'],
  ],
  ['Mail & notice inbox', true, true, ['Same-day scanning and routing']],
  [
    'Dedicated specialist',
    ['Shared specialist team, with replies in two business days'],
    ['Shared specialist team, with replies in one business day'],
    ['Named compliance partner'],
  ],
  ['Policy templates', true, ['Included'], ['Custom']],
  ['Audit trail log', true, ['90 days'], true],
  ['Unlimited seats', true, true, ['With SSO']],
  ['Priority support', true, true, true],
]

/** §12 Pricing — header, plan cards (grid on lg, carousel below), comparison accordion, footnotes */
export default function Pricing() {
  const isLg = useMediaQuery(MQ_LG)
  const carousel = useCarousel(PLANS.length, !isLg)
  const [open, setOpen] = useState(true)
  const plan = carousel.index

  return (
    <section id="homepage-pricing" data-section="pricing" className="pricing-section bg-white">
      <div className="section-container pt-24u md:pt-40u lg:pt-170u">
        <div className="px-24u md:flex md:justify-between md:px-40u lg:px-170u">
          <h3 className="animation-title type-h3 mb-24u text-main-green md:mb-0 md:w-272u lg:w-358u" data-anim="title">
            Simple pricing that grows <span className="text-green">with your team</span>
          </h3>
          <div className="opacity-80">
            <p className="animation-desc type-p2 text-main-green/70 md:w-332u lg:w-424u" data-anim="desc">
              Every plan includes the full Northwind platform, expert support and transparent pricing per entity, so you only
              pay for the locations you actually operate in today.
            </p>
          </div>
        </div>
      </div>

      <div className="pricing-height-div" data-pricing-scroll>
        <div
          data-pricing-pin
          className="splide pointer-events-none relative z-10 mb-60u mt-46u md:mb-86u md:mt-74u lg:mb-80u lg:mt-108u lg:pl-368u lg:pr-170u"
        >
          <div className="bg absolute -top-80u left-0 right-0 h-350u w-full bg-price-gradient" />
          <div ref={carousel.trackRef} {...carousel.trackHandlers} className="splide__track relative overflow-visible px-24.5u md:px-206u lg:px-0">
            <div
              ref={carousel.listRef}
              style={carousel.listStyle}
              data-carousel-list="pricing"
              className="splide__list relative flex lg:grid lg:auto-cols-fr lg:grid-flow-col lg:gap-10u"
            >
              {PLANS.map((p, i) => (
                <div
                  key={p.title}
                  data-pricing-card={i}
                  className={`pricing-card pointer-events-auto relative mr-16u flex w-full shrink-0 flex-col overflow-hidden rounded-8u border-[2px] border-t-8 border-solid bg-main-white px-24u pb-27u pt-34u transition-all duration-375 ease-[ease] md:mr-32u lg:mr-0 lg:overflow-visible ${p.border} ${
                    !isLg && Math.abs(i - plan) === 1 ? 'opacity-50' : ''
                  }`}
                >
                  <div className="mb-24u flex flex-col">
                    <span className={`pricing-card__employees type-cp2 mb-5u ${p.text}`}>{p.employees}</span>
                    <span className="plan-title type-cp1 mb-30u text-main-green lg:mb-0">{p.title}</span>
                    <span className="plan-desc type-p4 text-main-green/70 lg:h-100u" data-pricing-plan-desc>
                      {p.desc}
                    </span>
                    <h2 className="type-ch1 text-main-green">
                      {p.price}
                      <span className="lg:text-[0.75em]">/mo</span>
                    </h2>
                    <span className={`pricing-card__per-month platform-fee type-cp2 mb-5u ${p.text}`} data-pricing-fee>
                      {p.perMonth}
                    </span>
                    <span className="platform-fee type-ch1 mt-15u text-main-green lg:text-h4-d" data-pricing-fee>
                      {p.fee}
                    </span>
                    <span className={`pricing-card__per-month platform-fee type-cp2 mb-5u ${p.text}`} data-pricing-fee>
                      {p.feeLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination count={PLANS.length} active={plan} onSelect={carousel.setIndex} className="pointer-events-auto -bottom-40u lg:hidden" />
        </div>

        <div className="px-24u md:px-40u lg:px-170u">
          <div className={`accordion flex flex-col gap-18u md:gap-22u active-${plan + 1}`}>
            <div className="accordion-item relative">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((o) => !o)}
                data-pricing-accordion
                className="accordion-button relative flex w-full pb-22u text-left lg:pb-24u"
              >
                <div className="accordion__line absolute bottom-0 left-0 h-px w-full bg-green opacity-20" />
                <span className="accordion-title type-cp1 w-231u text-main-green md:w-647u lg:w-1040u">Plan details</span>
                <span className="icon absolute right-0 top-0 inline-block h-16u w-16u">
                  <Chevron />
                </span>
              </button>
              <div className="accordion-content">
                <div className="inner">
                  {/* tablet / mobile: only the active plan's value is shown */}
                  <div className="lg:hidden">
                    {ROWS.map(([label, ...values]) => (
                      <div
                        key={label}
                        className="pricing-point relative flex flex-wrap items-center justify-between py-16u transition-all duration-375 ease-[ease] hover:bg-pricing-hover"
                      >
                        <span className="type-cp3 w-226u text-main-green md:w-642u">{label}</span>
                        <Value value={values[plan]} />
                        <div className="absolute bottom-0 left-0 h-px w-full bg-green opacity-20" />
                      </div>
                    ))}
                  </div>
                  {/* desktop: all three plans */}
                  <div className="hidden lg:block">
                    {ROWS.map(([label, ...values]) => (
                      <div
                        key={label}
                        className="pricing-point relative flex items-center justify-between gap-10u py-24u pl-22u transition-all duration-375 ease-[ease] hover:bg-pricing-hover"
                      >
                        <span className="text-cp3-d w-215u text-main-green">{label}</span>
                        {values.map((v, i) => (
                          <div key={i} className="flex w-282u">
                            <Value value={v} />
                          </div>
                        ))}
                        <div className="absolute bottom-0 left-0 h-px w-full bg-green opacity-20" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ul className="type-cp3 w-280u px-24u py-16u text-main-green opacity-40 md:w-full md:px-40u md:py-22u lg:px-170u lg:py-24u">
        <li>* Prices shown are billed annually.</li>
        <li>** State filing fees are passed through at actual cost.</li>
      </ul>
    </section>
  )
}

function Value({ value }) {
  if (value === true) {
    return (
      <div className="benefit-point h-22u w-22u">
        <div className="relative h-20u w-20u">
          <CheckCircle />
        </div>
      </div>
    )
  }
  // measured value text color is rgb(0,0,0) on the original (no color class -> inherits body)
  return (
    <p className="benefit-point type-cp3 w-full shrink-0 basis-full text-black lg:shrink lg:basis-auto lg:px-10u">
      {value.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </p>
  )
}
