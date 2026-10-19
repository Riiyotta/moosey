import { artUrl } from '../../components/InlineSvg'
import { PLATFORM } from '../marketing/platform'

/**
 * /solutions/ (= /solutions/smb/) — spec §2.3. Original Northwind placeholder copy; lengths follow the measured
 * roles at 1440 (hero h1 25c / 7c green on one line; GetStarted title 16c / 11c green).
 */
export const solutions = {
  hero: {
    eyebrow: 'Solutions', // 9c
    title: ['Compliance for ', { g: 'any team' }], // 25c, 1 line @1440
    description: 'Whatever your size or stage, Northwind keeps every state account, filing and notice in order.', // ~92c
  },
  // §1.7 ScrollTabs (section#everything.everything): 4 role tabs, 3 features each; inline Compliance CTA after the spacer
  scrollTabs: {
    id: 'everything',
    sectionClass: 'everything',
    linksInset: true,
    title: ['Built for ', { g: 'every role' }], // 19c, 10c green
    desc: 'Whoever owns compliance at your company, Northwind gives them one place to see every obligation, act on it quickly and prove the work was done when anyone asks about it later.', // ~171c
    tabs: [
      {
        id: 'finance',
        label: 'Finance', // 7c
        features: [
          { title: 'Tax accounts in every state', desc: 'Withholding, unemployment and sales tax accounts are opened, tracked and kept current, with each login and account number stored in one shared record.' },
          { title: 'Rates you can trust', desc: 'Annual rate notices are captured the day they arrive and passed to your payroll provider before they apply, so quarterly filings never need to be corrected later on.' },
          { title: 'Fewer penalties and notices', desc: 'Every due date is tracked with an owner and reminders, so late fees, interest charges and surprise balances stop showing up in the books at the end of each quarter.' },
        ],
      },
      {
        id: 'head-of-people',
        label: 'Head of People', // 14c
        features: [
          { title: 'Hire in any state', desc: 'The registrations, posters and policies a new location needs are listed the moment you hire someone there.' },
          { title: 'Handbooks kept current', desc: 'State and city policy updates are drafted for you whenever the rules change, ready to review and share with employees.' },
          { title: 'Agency mail, handled', desc: 'Letters from state agencies are scanned the day they arrive, summarized in plain words and routed to the right owner on your team with a clear next step to take.' },
        ],
      },
      {
        id: 'startup',
        label: 'Startup', // 7c
        features: [
          { title: 'Set up right from day one', desc: 'Formation, registered agent and first state registrations, handled in the right order.' },
          { title: 'Room to grow into new states', desc: 'Expand to new states without slowing your hiring down.' },
          { title: 'One calendar for everything', desc: 'Annual reports, franchise taxes and renewals sit on a single calendar with reminders well ahead of time, so nothing slips while the whole team is busy building the product.' },
        ],
      },
      {
        id: 'legal',
        label: 'Legal', // 5c
        features: [
          { title: 'Entity records in one place', desc: 'Formation documents, officers, registered agents and good-standing status for every entity live in one organized record that is always kept up to date for you.' },
          { title: 'Audit-ready history', desc: 'Every filing, confirmation and agency letter is stored with a timestamp, so reviews and due diligence move quickly and calmly for everyone.' },
          { title: 'Clear ownership of work', desc: 'Each obligation has a named owner and a current status, so legal, finance and people teams always know exactly who is handling what and when it will be finished.' },
        ],
      },
    ].map((t, i) => ({
      ...t,
      image: { src: artUrl(`marketing/scrolltab-${i + 1}.svg`), mobileSrc: artUrl(`marketing/scrolltab-${i + 1}-m.svg`) },
    })),
    cta: {
      title: 'Know where every entity stands, in every state', // ~49c
      desc: 'See open registrations, upcoming deadlines and agency mail for every location in one shared view.', // ~95c
    },
  },
  // "Same content as platform" (spec §2.3 row 3) — shared read-only with src/data/marketing/platform.js
  ecosystem: PLATFORM.ecosystem,
  getStarted: {
    title: ['Easy ', { g: 'setup steps' }], // 16c, 11c green
    desc: 'Three short steps take you from sign-up to a fully compliant company.', // 72c
    steps: [
      { title: 'Sign up', desc: 'Create an account and tell us a few basics about your company, such as where it was formed and where people work.' }, // 7c / 100c
      { title: 'Connect your payroll', desc: 'Link your provider so we can see where your team works.' }, // 22c / 60c
      { title: 'Let the experts work', desc: 'Specialists open accounts, file on time and keep you updated as they go.' }, // 20c / 83c
    ].map((s, i) => ({ ...s, image: { src: artUrl(`peace/peace-step-${i + 1}.svg`) } })),
  },
}
