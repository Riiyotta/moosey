import { useState } from 'react'
import { Chevron } from './shared'

const FAQS = [
  {
    q: 'What exactly does Northwind handle?',
    a: 'Registrations, tax accounts, annual reports and official notices.',
  },
  {
    q: 'How long does it take to get set up and running?',
    a: 'Most teams are fully set up within a single afternoon. You start by connecting your payroll provider and adding basic details about each entity, such as where it was formed and where you currently have employees. Northwind uses that information to build a complete list of the registrations, accounts and recurring filings that apply to you, then highlights anything that looks overdue or missing. A specialist reviews the plan with you on a short call, answers questions and confirms priorities. From there, open items are worked through in order of urgency, and you can follow progress on each one from your dashboard. Most new customers see their first completed registrations within a few business days, depending on the state.',
  },
  {
    q: 'Can Northwind take over filings that our team or another provider started?',
    a: 'Yes. When you join, we import the status of every registration, account and filing you already have in progress, whether it was started by your own team, an accountant or another service provider. Our specialists confirm the details with each agency, pick up anything that is mid-flight and note any gaps or upcoming deadlines that need attention. You keep a full history of what was done before you joined, alongside everything completed afterwards, so audits, reviews and handoffs to new teammates stay simple and fast. There is no need to restart work that is already underway, re-enter information you have already provided or pay for the same filing twice.',
  },
  {
    q: 'Which states and agencies are covered?',
    a: 'All fifty states, plus the city and county agencies that apply to your teams.',
  },
  {
    q: 'Is my company information kept secure at all times?',
    a: 'Your data is encrypted in transit and at rest, access is limited to the specialists working on your account, and every action is recorded in an audit trail you can review at any time from the dashboard.',
  },
]

/** §13 FAQ — single-open accordion, all closed initially */
export default function Faq() {
  const [open, setOpen] = useState(-1)

  return (
    <section id="homepage-faq" data-section="faq" className="faq-section bg-main-white pt-120u md:pt-180u lg:pt-160u">
      <div className="medium-container pb-100u md:flex md:justify-between md:pb-125u">
        <div className="text-block md:w-272u lg:w-328u">
          <h3 className="type-h3 text-main-green">
            Common <span className="text-green">questions,</span> answered.
          </h3>
        </div>
        <div className="accordion-block mt-40u w-full md:mt-0 md:w-332u lg:w-530u">
          <div className="accordion">
            {FAQS.map((item, i) => (
              <div key={item.q} className="accordion-item relative">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="accordion-button relative mt-18u flex w-full items-center pb-18u text-left md:mt-12u md:pb-12u lg:mt-20u lg:pb-20u"
                >
                  <span className="accordion-title type-h6 w-237u text-main-green md:w-297u lg:w-435u">{item.q}</span>
                  <span className="icon absolute right-0 top-0 inline-block h-16u w-16u lg:h-24u lg:w-24u">
                    <Chevron />
                  </span>
                </button>
                <div className="accordion-content">
                  <div className="inner pb-16u lg:pb-20u">
                    <p className="desc-1 type-p2 text-main-green/70">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
