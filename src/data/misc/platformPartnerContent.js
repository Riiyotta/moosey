/**
 * Template C (platform partner page, specs/misc.md §4) shared sample copy, original to this clone.
 * Partner records (partners.js) carry the hero, IntroRow (C1) or trusted strip + lead form (C2) and CTA copy.
 */
const A = '/assets/art'

export const platformFeatureGroup = [
  {
    title: 'Every state requirement in one place',
    desc: 'Northwind tracks what each state expects from a new company and turns it into clear tasks.',
    items: [
      {
        title: 'Registrations',
        body: 'Register for payroll and unemployment accounts in each new state, with a specialist checking every form first.',
        image: { src: `${A}/marketing/platform-mail-3.svg`, alt: '' },
      },
      {
        title: 'Agency mail',
        body: 'Letters from state agencies are scanned, summarized and routed to the right owner the day they arrive.',
        image: { src: `${A}/marketing/platform-mail-2.svg`, alt: '' },
      },
      {
        title: 'Annual filings',
        body: 'Annual reports and franchise taxes are prepared ahead of each deadline, so you only need to review and approve.',
        image: { src: `${A}/marketing/feature-streamline.svg`, alt: '' },
      },
    ],
  },
]

export const platformGenericCta = {
  title: 'Less time on compliance, more time on growth',
  desc: 'Northwind handles the paperwork in every state so your team can stay focused on building.',
}

/** C2 trusted strip: the original renders both ticker rows EMPTY (§4.5); the clone feeds 6 + 6 logos */
export const platformTrustedRows = [
  ['arcwell', 'brightpath', 'corvid-labs', 'driftwood', 'fernway', 'halcyon'],
  ['juniper-bay', 'kestrel', 'marlowe', 'orbitra', 'pallaso', 'quillfield'],
]

/** C2 lead form (§4.6): 6 check items, 5 visible fields (first, last, email, company, employee count) */
export const platformLeadForm = {
  title: ['Talk to a specialist about ', { g: 'your startup' }],
  list: [
    'A walkthrough of the states where your company needs to register',
    'A review of the filings and deadlines coming up in your first year',
    'Pricing for your team size',
    'Help connecting your payroll provider and importing existing locations',
    'Answers about registered agent service and agency mail',
    'A plan for staying compliant as you hire in new states',
  ],
  fields: [
    { name: 'firstname', label: 'First name', type: 'text', autoComplete: 'given-name' },
    { name: 'lastname', label: 'Last name', type: 'text', autoComplete: 'family-name' },
    { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
    { name: 'company', label: 'Company name', type: 'text', autoComplete: 'organization' },
    { name: 'employees', label: 'Number of employees', type: 'number', autoComplete: 'off' },
  ],
  submitLabel: 'Talk to a compliance specialist',
}

/** C FAQ (§H 13 geometry via the shared FaqVariant): 5 items, answers up to ~10 lines. Sample copy. */
export const platformFaq = {
  title: ['Common questions from ', { g: 'new founders' }],
  items: [
    {
      q: 'Where does my company need to register?',
      a: 'Usually the state where you incorporated plus every state where you have employees, an office or significant sales. Northwind looks at where your team works and builds the list for you.',
    },
    {
      q: 'Do I need a registered agent in each state?',
      a: 'You need one in every state where your company is registered. Northwind can act as your registered agent in each of them, so all official mail arrives in one inbox.',
    },
    {
      q: 'How long does a payroll registration take?',
      a: 'Most applications are submitted within a few business days of receiving your details. Agency processing times vary by state, and Northwind tracks each one until your account numbers arrive.',
    },
    {
      q: 'What happens when I hire my first employee in a new state?',
      a: 'Connect your payroll provider and Northwind notices the new work location automatically. You get a checklist of the registrations, notices and policies that state requires, and a specialist can complete the filings for you. Each requirement stays on your compliance calendar, so renewals and recurring reports are not missed as your team keeps growing across more locations.',
    },
    {
      q: 'Can my accountant or lawyer get access?',
      a: 'Yes. Invite outside advisors as teammates, assign them tasks and share stored account details securely.',
    },
  ],
}
