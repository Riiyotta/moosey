/**
 * Template B (static partner page, specs/misc.md §3) shared sample copy, original to this clone.
 * All six original B pages share every section except the hero eyebrow/h1/description, so partner records
 * only carry `hero`. Images: the platform feature screenshots (§10) and the get-started step art.
 */
const A = '/assets/art'

export const staticFeatures = [
  {
    title: [{ g: 'Simplify' }, ' your state compliance'],
    desc: 'Every registration, filing and renewal your company owes, tracked in one place for each state you hire in.',
    list: ['Payroll registrations', 'HR requirements', 'Secretary of State filings', 'Sales tax permits'],
    image: { src: `${A}/marketing/feature-streamline.svg`, alt: '' },
  },
  {
    title: [{ g: 'Cut' }, ' the manual work'],
    desc: 'Northwind takes on the repetitive steps and keeps your compliance records organized, current and secure.',
    list: ['Monitoring and alerts', 'Automatic registrations', 'Annual report filing', 'Posters and notices', 'Team task assignment'],
    image: { src: `${A}/marketing/feature-reduce.svg`, alt: '' },
  },
  {
    title: [{ g: 'Consolidate' }, ' your providers'],
    desc: 'Swap scattered agents, mail services and spreadsheets for one workflow that costs less and is simpler to run.',
    list: ['Registered agent', 'State agency mail', 'Stored account logins'],
    image: { src: `${A}/marketing/feature-consolidate.svg`, alt: '' },
  },
]

export const staticGetStarted = {
  title: ['Easy ', { g: 'onboarding' }],
  desc: 'Getting set up takes a few minutes. Connect your systems and we do the rest.',
  steps: [
    {
      title: 'Tell us about you',
      desc: 'Answer a short set of questions about your company, entities and the states where you have employees.',
      image: { src: `${A}/peace/peace-step-1.svg`, alt: '' },
    },
    {
      title: 'Connect your payroll',
      desc: 'Link your payroll provider so Northwind can spot new requirements as your team grows.',
      image: { src: `${A}/peace/peace-step-2.svg`, alt: '' },
    },
    {
      title: 'Review your plan',
      desc: 'See every open requirement in one checklist, then let a specialist handle the filings for you.',
      image: { src: `${A}/peace/peace-step-3.svg`, alt: '' },
    },
  ],
}
