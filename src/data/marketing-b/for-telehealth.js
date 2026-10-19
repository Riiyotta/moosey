import { artUrl } from '../../components/InlineSvg'

/**
 * /solutions/for-telehealth/ content (spec §2.4 diffs). Original Northwind placeholder copy; lengths follow the
 * measured roles at 1440 (noted per field).
 */
export const forTelehealth = {
  hero: {
    eyebrow: 'For telehealth', // 14c
    title: ['Care across state lines,', '\n', { g: 'compliance without limits' }], // 54c, <br>, 26c green
    desc: 'Clinicians and patients live everywhere. Northwind keeps your entity, payroll and tax accounts current in each one.', // ~104c
  },
  leadForm: {
    title: 'See how virtual care teams stay compliant in every state they serve', // ~71c, 3 lines
    list: [
      'State registrations for every clinician', // 39c
      'Payroll tax accounts opened before your next provider starts', // 59c
      'Agency notices read, summarized and routed to the right owner', // 58c
    ],
  },
  trustedTitle: 'Trusted by care teams today', // 27c
  trustedRows: [['halcyon', 'brightpath', 'corvid-labs', 'tessellate', 'orbitra', 'fernway']], // one ticker row
  benefits: {
    title: ['Grow into ', { g: 'every state' }, ' with ease'], // 33c, 12c green, 1 line
    desc: 'Telehealth companies hire clinicians in many states at once. Northwind keeps every registration and account in order, so growth never waits on paperwork or a missed agency letter.', // ~174c
    cards: [
      { value: 'Days, not weeks to hire', desc: 'Payroll accounts for a new clinician state are opened quickly, so providers are paid right from their first shift.' },
      { value: 'Every notice on time', desc: 'Agency letters are captured on arrival, summarized and assigned, so the team always knows what to act on first and next.' },
      { value: 'One view of every location', desc: 'Entity, payroll and tax accounts for every location sit in one shared record your finance team can trust.' },
    ],
  },
  cta: {
    title: 'Know where your care team stands in each state', // ~45c
    desc: 'See open registrations, upcoming deadlines and agency mail for every clinician location in a single shared view.', // ~106c
  },
  featureList: {
    title: ['Stay ahead ', { g: 'of every state rule' }], // ~30c, 19c green
    desc: 'Northwind tracks the registrations, filings and rate changes that come with each new clinician location, then handles the work for you so care is never interrupted.', // ~158c
    list: ['Entity registrations', 'Payroll accounts', 'Annual reporting', 'Agency mail scan'], // 18 / 13 / 16 / 14c
    image: { src: artUrl('marketing/feature-streamline.svg') },
    button: { label: 'Talk to a specialist', href: '/' }, // 20c
  },
  testimonials: {
    title: ['Virtual care teams that grow with ', { g: 'calmer' }, ' compliance every day'], // ~62c, 6c green
    slides: [
      {
        logo: 'juniper-bay',
        quote: 'We added clinicians in eleven new states in a single quarter. Northwind opened every account before payroll ran, flagged the notices that mattered and kept our whole finance team out of state portals for good.', // ~213c
        name: 'Jordan Ellison', // ~15c
        role: 'VP of Operations', // ~18c
        avatar: 1,
      },
      {
        logo: 'arcwell',
        quote: 'Agency mail used to sit in a shared inbox for weeks. Now every letter is summarized and routed the day it arrives, and nothing slips.', // ~153c
        name: 'Sam Patel', // ~10c
        role: 'Head of People, Arcwell', // ~22c
        avatar: 2,
      },
      {
        logo: 'pallaso',
        quote: 'Northwind gave us one clear view of every state we operate in, and the team finally stopped worrying about deadlines.', // ~132c
        name: 'Riley Moran', // ~11c
        role: 'Controller, Pallaso Care', // ~23c
        avatar: 3,
      },
    ],
  },
}
