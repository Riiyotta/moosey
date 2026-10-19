import { useState } from 'react'
import { useComplianceMotion } from '../motion/compliance'
import InlineSvg, { art, artUrl } from './InlineSvg'
import { TabBar } from './shared'

const TABS = [
  {
    label: 'Founder',
    image: 'startup',
    icons: ['founding', 'automate', 'monitor'],
    items: [
      ['Launch in new states', 'Register your company, open payroll accounts and collect every ID you need before your first hire in a new location starts work.'],
      ['Skip the manual forms', 'Northwind completes and submits state forms for you, then tracks every confirmation so you know where each request stands.'],
      ['See every deadline coming', 'One calendar shows annual reports, renewals and tax filings for every entity you run, with reminders sent well ahead of each due date so nothing is ever late.'],
    ],
  },
  {
    label: 'People Leader',
    image: 'head-of-people',
    icons: ['identify', 'modern', 'letter'],
    items: [
      ['Hire anywhere with confidence', 'Bring on remote teammates in any state without guesswork. Northwind flags the registrations, notices and postings each new location requires before day one.'],
      ['Keep policies up to date', 'Handbook sections are flagged the moment a rule shifts where your team works, and suggested edits arrive ready for review with sources linked inline.'],
      ['Answer state notices quickly', 'Official letters land in one shared inbox, get summarized in plain language and are routed to the right owner along with clear next steps and a deadline.'],
    ],
  },
  {
    label: 'Finance',
    image: 'finance',
    icons: ['consolidate', 'automate', 'avoid'],
    items: [
      ['Close books with clarity', 'Every account number, rate change and filing receipt sits together in one place, ready for each month-end close.'],
      ['Track every tax account', 'See withholding and unemployment accounts for each state, plus current rates and owners.'],
      ['Ship every filing on time', 'Automated reminders and status tracking mean filings go out on time, every time, even as you add new entities, states and payroll providers across the business.'],
    ],
  },
  {
    label: 'Legal',
    image: 'legal',
    icons: ['compliance', 'eliminate', 'offload'],
    items: [
      ['Keep each entity healthy', 'Annual reports, registered agent details and foreign qualifications are monitored continuously, so every entity stays in good standing without the spreadsheets.'],
      ['Centralize entity records', 'Formation documents, officer lists and filing history live in one secure record that your whole team and outside counsel can reference whenever needed.'],
      ['Review filings in one place', 'Approve upcoming submissions, compare them against prior years and keep an audit trail of every change, comment and signature across all of your entities.'],
    ],
  },
]

/** §7 Compliance by role — tabs, list cards, CTA card, side lines and gradient backdrop */
export default function RoleTabs() {
  const [active, setActive] = useState(0)
  // content item that carries `.active` — like the original, the outgoing item loses it on click and the
  // incoming item only gains it once the outgoing tween has finished (set from src/motion/compliance.js)
  const [shownItem, setShownItem] = useState(0)
  // tab out/in sequence, bg-list height tween and section reveal (src/motion/compliance.js)
  const select = useComplianceMotion(active, setActive, setShownItem)

  return (
    <section
      id="homepage-compliance"
      data-section="compliance"
      className="compliance-section relative bg-main-white pb-39u md:pb-81u lg:pb-120u"
    >
      <div className="section-container relative z-10 flex flex-col items-center md:pb-50u">
        <div className="title-wrap w-202u md:w-232u lg:w-328u" data-anim="compliance-title">
          <h3 className="type-p1 text-center text-main-green">
            Whichever seat you happen to sit in today, <span className="text-green">Northwind keeps</span> you compliant.
          </h3>
        </div>

        <div className="tabs-wrap mt-45u flex flex-col items-center" data-anim="compliance-tabs">
          <TabBar
            name="compliance"
            labels={TABS.map((t) => t.label)}
            active={active}
            onSelect={select}
            ulClass="w-272u px-21u md:w-440u md:px-35u lg:w-448u lg:px-37u"
            liClass="pb-16u"
            indicatorClass="w-90u md:w-115u"
          />

          <ul
            className="tab-items relative mt-24u flex w-full justify-center pb-614u md:mt-40u md:w-510u md:pb-800u lg:mt-60u lg:w-1020u lg:pb-570u"
            data-tab-items="compliance"
          >
            {TABS.map((tab, i) => (
              <li
                key={tab.label}
                data-tab-item={i}
                aria-hidden={i !== active}
                className={`tab-item absolute top-0 md:w-full ${i === active && i === shownItem ? 'active z-[1] opacity-100' : 'pointer-events-none opacity-0'}`}
              >
                <div className="item-container flex w-full flex-col lg:flex-row-reverse lg:justify-between">
                  <div className="h-189u overflow-hidden rounded-5u md:h-354u md:rounded-9u lg:h-447u lg:w-645u lg:rounded-12u">
                    {/* tab image 1290x894 (1.443:1), cover */}
                    <div className="image image-block relative h-full w-full" data-compliance-image>
                      <InlineSvg svg={art(`compliance/tab-${tab.image}.svg`)} uid={`compliance-${tab.image}`} fit="slice" className="block h-full w-full bg-white" />
                    </div>
                  </div>
                  <div className="future-block mt-16u rounded-12u md:mt-24u lg:mt-0">
                    <ul
                      className="list-element flex w-272u flex-col gap-18u overflow-hidden p-16u md:w-full lg:w-359u lg:gap-24u lg:p-24u"
                    >
                      {tab.items.map(([title, desc], j) => (
                        <ListEntry key={title} title={title} desc={desc} icon={tab.icons[j]} divider={j > 0} />
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
            <li
              aria-hidden="true"
              className="bg-image-tab absolute top-0 z-[-1] h-189u w-full rounded-5u bg-beige md:h-354u md:w-510u md:rounded-9u lg:right-0 lg:h-447u lg:w-645u lg:rounded-12u"
            />
            <li
              aria-hidden="true"
              data-compliance-bg-list
              className="bg-list absolute left-0 top-205u z-[-1] h-189u w-272u rounded-12u bg-main-white md:top-375u md:w-full lg:top-0 lg:w-359u"
            />
          </ul>
        </div>

        <ComplianceCta />
      </div>

      {/* REDRAW: side line art (>=481) */}
      <div className="bg-lines absolute bottom-0 left-0 right-0 z-[1] hidden w-full justify-between md:flex" aria-hidden="true">
        <SideLine className="md:h-617u md:w-64u lg:h-1000u lg:w-104u" />
        <SideLine className="-scale-x-100 md:h-617u md:w-64u lg:h-1000u lg:w-104u" />
      </div>

      {/* backdrop: flipped gradient, transparent at top, solid `white` token at the bottom */}
      <div className="section-bg absolute bottom-0 left-0 z-0 h-1653u w-full rotate-180 bg-orange-gradient md:h-2179u lg:h-1722u" />
    </section>
  )
}

function ListEntry({ title, desc, icon, divider }) {
  return (
    <>
      {divider && <li role="presentation" className="divider h-1u w-full bg-beige" data-compliance-divider />}
      <li className="text-block flex flex-col gap-8u" data-compliance-text>
        <div className="title flex gap-8u">
          {/* 26x26 list icon (static) */}
          <div className="icon h-22u w-22u lg:h-26u lg:w-26u">
            <img src={artUrl(`icons/${icon}.svg`)} alt="" className="block h-full w-auto" />
          </div>
          <h6 className="type-h6 whitespace-nowrap text-main-green">{title}</h6>
        </div>
        <div className="desc">
          <p className="type-p4 text-main-green/70">{desc}</p>
        </div>
      </li>
    </>
  )
}

function ComplianceCta() {
  return (
    <div className="w-272u md:w-510u lg:w-1020u">
      <div
        data-anim="compliance-cta"
        className="cta-wrap compliance-cta relative z-[1] overflow-hidden rounded-12u bg-green px-20u pb-45u pt-30u md:px-67u md:pt-50u lg:flex lg:justify-between lg:pb-40u lg:pl-79u lg:pt-73u"
      >
        <div className="text-block relative z-[1] flex flex-col items-center gap-32u md:gap-30u lg:items-start lg:gap-16u">
          <div className="titel md:w-288u lg:w-370u">
            <h4 className="type-h4 text-center text-white lg:text-left">Compliance support that grows right along with you</h4>
          </div>
          {/* looping CTA art 908x516 */}
          <div className="visual-mobile h-131u w-full md:h-177u md:w-376u lg:hidden" data-lottie-placeholder="compliance-cta-mobile">
            <InlineSvg svg={art('cta/compliance-cta-visual.svg')} uid="compliance-cta-m" />
          </div>
          <div className="desc md:w-288u">
            <p className="type-p2 text-center text-white/70 lg:text-left">
              Add new entities, states and teammates whenever you need to. Your plan adapts as your business does.
            </p>
          </div>
        </div>
        <div className="visual-desktop relative z-[1] hidden h-258u w-454u lg:block" data-lottie-placeholder="compliance-cta">
          <InlineSvg svg={art('cta/compliance-cta-visual.svg')} uid="compliance-cta" />
        </div>
        {/* soft bg (bg-desktop 644x371 >=481, bg-tablet 510x402 mobile), cover */}
        <div className="bg absolute bottom-45u left-0 z-0 h-324u w-full lg:bottom-0 lg:left-auto lg:right-0 lg:mt-16u lg:w-644u">
          <div className="hidden h-full w-full md:block">
            <InlineSvg svg={art('cta/bg-desktop.svg')} uid="compliance-cta-bg" fit="slice" />
          </div>
          <div className="block h-full w-full md:hidden">
            <InlineSvg svg={art('cta/bg-tablet.svg')} uid="compliance-cta-bg-m" fit="slice" />
          </div>
        </div>
      </div>
    </div>
  )
}

function SideLine({ className }) {
  return (
    <svg viewBox="0 0 105 1005" fill="none" className={className}>
      <path d="M52 0V560C52 610 20 620 20 670V1005" className="stroke-green2" strokeWidth="1" />
      <circle cx="52" cy="560" r="4" className="fill-green2" />
    </svg>
  )
}
