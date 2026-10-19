/**
 * Gated guide landings, /p/:guide (specs/content.md §8).
 *
 * Record:
 *   slug, eyebrow (~8), title (~19), description (~85), ctaLabel (~12)
 *   heroImage { desktop, mobile }                         one 1.897:1 cover (both <img> may share a file)
 *   benefits[3]? { icon (172x104), title (~18), desc (~110) }
 *   form { variant? ('split' | 'newsletter'), heading (~68 | ~44), intro? (newsletter ~118),
 *          bullets[4] (~17–40), submitLabel (~12), fields[] { name, label, type, required } }
 *   featureGroup? { title (~22), desc (~158), images[3], items[3] { title (~30–37), desc (~77–109) } }
 *   faq? { title: [before, green, after], items[5] { q (~34–76), a (~63–735) } }
 *   sections[]  render order; each { type, ...overrides }. Types:
 *               'hero' | 'benefits' | 'form' | 'trusted' | 'featureGroup' | 'faq' | 'cta'
 *               (form accepts { bg: 'main-white' } for the report variant)
 *
 * Copy is original placeholder text for "Northwind".
 */

/** HubSpot-equivalent field set for guides (§8.3) — utm_* hidden fields are added by the form component */
const GUIDE_FIELDS = [
  { name: 'firstname', label: 'First name', type: 'text', required: true },
  { name: 'lastname', label: 'Last name', type: 'text', required: true },
  { name: 'email', label: 'Work email', type: 'email', required: true },
  { name: 'company', label: 'Company name', type: 'text', required: true },
  { name: '0-2/numberofemployees', label: 'Number of employees', type: 'number', required: false },
]

const cover = (n) => {
  const src = `/assets/art/content/guide/hero-cover${n === 1 ? '' : `-${n}`}.svg`
  return { desktop: src, mobile: src }
}
const benefit = (n, title, desc) => ({ icon: `/assets/art/content/guide/benefit-${n}.svg`, title, desc })
const FULL_STACK = ['hero', 'benefits', 'form', 'trusted', 'featureGroup', 'faq', 'cta'].map((type) => ({ type }))

/** shared §8.5 feature group (the platform pitch is the same on every full-stack guide) */
const FEATURE_GROUP = {
  title: 'Stay compliant as you grow',
  desc: 'Once your accounts are open, Northwind keeps them healthy with automated monitoring for new registrations, digital agency mail and secure access to every portal.',
  images: [
    '/assets/art/compliance/tab-finance.svg',
    '/assets/art/compliance/tab-head-of-people.svg',
    '/assets/art/compliance/tab-legal.svg',
  ],
  items: [
    {
      title: 'Connect payroll, detect registrations',
      desc: 'Northwind notices when an employee moves or a new hire appears in a state that needs registration.',
    },
    {
      title: 'Read agency mail from one inbox',
      desc: 'Notices from every state agency are scanned, sorted and routed to the right person within a day of arrival.',
    },
    {
      title: 'Open state portals securely',
      desc: 'Logins for each agency portal are stored safely and shared with the teammates who need them.',
    },
  ],
}

export const GUIDES = [
  {
    slug: 'multi-state-hiring-guide',
    eyebrow: 'Ops guide',
    title: 'Multi-State Hiring',
    description: 'Learn how to hire in a new state, open the right accounts and keep every filing on time.',
    ctaLabel: 'Get the guide',
    heroImage: {
      desktop: '/assets/art/content/guide/hero-cover.svg',
      mobile: '/assets/art/content/guide/hero-cover.svg',
    },
    benefits: [
      {
        icon: '/assets/art/content/guide/benefit-1.svg',
        title: 'Faster Onboarding',
        desc: 'Know exactly which accounts a new hire needs, so their first paycheck goes out on time and fully compliant.',
      },
      {
        icon: '/assets/art/content/guide/benefit-2.svg',
        title: 'Fewer Agency Notices',
        desc: 'Understand the filings each state expects, and stop surprise penalty letters before they reach your inbox.',
      },
      {
        icon: '/assets/art/content/guide/benefit-3.svg',
        title: 'Confident Expansion',
        desc: 'Build a repeatable playbook your team can follow every time the company grows into another state.',
      },
    ],
    form: {
      heading: 'Ready to hire in a new state? Our step-by-step guide shows you how to:',
      bullets: [
        'Spot registration triggers early',
        'Open payroll accounts in the right order',
        'Draft state handbook addenda',
        'Build a compliance calendar',
      ],
      submitLabel: 'Get the guide',
      fields: GUIDE_FIELDS,
    },
    featureGroup: FEATURE_GROUP,
    faq: {
      title: ['Your ', 'guide questions,', ' answered.'],
      items: [
        {
          q: 'Who is this guide written for?',
          a: 'Operations, finance and people teams at companies with employees in more than one state.',
        },
        {
          q: 'Does the guide cover every state, or only the largest ones?',
          a: 'The guide explains the process that applies everywhere, then calls out the state-specific steps that most often catch teams by surprise. Our resource library has a dedicated page for each state if you need the full detail for a particular location, including agency names, typical processing times and the documents to have ready before you apply.',
        },
        {
          q: 'How often is the guide updated?',
          a: 'We review it every quarter and whenever a state makes a significant change to its registration process.',
        },
        {
          q: 'Is the guide really free to download?',
          a: 'Yes. Fill in the short form and the guide is yours, with no trial or credit card required.',
        },
        {
          q: 'Can Northwind handle the registrations described in the guide for us?',
          a: 'Yes. Northwind opens payroll, unemployment and local tax accounts, files annual reports and keeps your handbook addenda current, all from a single dashboard your whole team can see.',
        },
      ],
    },
    sections: [
      { type: 'hero' },
      { type: 'benefits' },
      { type: 'form' },
      { type: 'trusted' },
      { type: 'featureGroup' },
      { type: 'faq' },
      { type: 'cta' },
    ],
  },
  {
    // form-only variant (§8.3 end): centered single column, no hero, no Bottom CTA
    slug: 'compliance-newsletter',
    title: 'Compliance newsletter',
    form: {
      variant: 'newsletter',
      heading: 'Get compliance updates in your inbox weekly',
      intro:
        'One short email each week with the state rule changes, filing deadlines and agency updates that matter to growing teams.',
      submitLabel: 'Subscribe',
      fields: [
        { name: 'firstname', label: 'First name', type: 'text', required: true },
        { name: 'email', label: 'Work email', type: 'email', required: true },
      ],
    },
    sections: [{ type: 'form' }],
  },
  /* ---------------------------------------------------------------- phase-2 guides (original titles) */

  // §8 order A: Hero → Benefits → Form → Trusted → FeatureGroup → FAQ → Bottom CTA
  {
    slug: 'payroll-setup-playbook',
    eyebrow: 'Payroll',
    title: 'Payroll Setup Playbook',
    description: 'Open withholding, unemployment and local accounts in the right order, in any state.',
    ctaLabel: 'Get playbook',
    heroImage: cover(2),
    benefits: [
      benefit(1, 'Clean First Runs', 'Line up every account number and rate before the first pay date so payroll runs without manual fixes.'),
      benefit(2, 'Clear Ownership', 'Assign each agency login and filing to a named owner, so nothing stalls when someone is out of office.'),
      benefit(3, 'Repeatable Steps', 'Use the same short sequence every time you add a state, instead of rediscovering the process each time.'),
    ],
    form: {
      heading: 'Setting up payroll somewhere new? This playbook walks you through how to:',
      bullets: ['Map accounts to agencies', 'Order registrations correctly', 'Check payroll settings', 'Plan the first filings'],
      submitLabel: 'Get playbook',
      fields: GUIDE_FIELDS,
    },
    featureGroup: FEATURE_GROUP,
    faq: {
      title: ['Your ', 'payroll questions,', ' answered.'],
      items: [
        { q: 'Is this playbook specific to one state?', a: 'No. It describes the general sequence most states follow and points out where to look for state-specific details.' },
        { q: 'Who should own the playbook inside our company?', a: 'Usually whoever runs payroll, with finance and people teams reviewing the parts that touch their work.' },
        { q: 'What if we use a professional employer organization today?', a: 'The playbook includes a short section on the accounts you may need to open if you move payroll in-house later.' },
        { q: 'Does it include sample timelines?', a: 'It includes a planning template you can fill in with the processing times you see from each agency.' },
        {
          q: 'Can Northwind open these accounts for us?',
          a: 'Yes. Northwind can register payroll accounts on your behalf and keep the numbers, rates and portal access organized in one place for your whole team.',
        },
      ],
    },
    sections: FULL_STACK,
  },
  {
    slug: 'remote-team-handbook-guide',
    eyebrow: 'People ops',
    title: 'Remote Team Handbooks',
    description: 'Build one handbook that works for employees in many states, with addenda that stay current.',
    ctaLabel: 'Get the guide',
    heroImage: cover(3),
    benefits: [
      benefit(1, 'One Core Handbook', 'Keep company-wide policies in one readable document and move state rules into short, focused addenda.'),
      benefit(2, 'Fewer Rewrites', 'Update a single addendum when a state changes its rules, instead of reissuing the whole handbook.'),
      benefit(3, 'Clear Expectations', 'Give every remote employee a handbook that reflects where they actually work, from their first day.'),
    ],
    form: {
      heading: 'Writing a handbook for a distributed team? This guide shows you how to:',
      bullets: ['Separate core policy from state rules', 'Structure state addenda', 'Track rule changes', 'Roll out updates'],
      submitLabel: 'Get the guide',
      fields: GUIDE_FIELDS,
    },
    featureGroup: FEATURE_GROUP,
    faq: {
      title: ['Your ', 'handbook questions,', ' answered.'],
      items: [
        { q: 'Do we need a separate handbook for every state?', a: 'Most teams use one core handbook plus a short addendum for each state where they have employees.' },
        { q: 'How often should addenda be reviewed?', a: 'At least once a year, and whenever a state you operate in announces a change to employment rules.' },
        { q: 'Should employees acknowledge each addendum?', a: 'Many employers collect an acknowledgment for the core handbook and for each relevant addendum.' },
        { q: 'Is the guide a legal template?', a: 'No. It is a planning guide. Have your advisor review final policy language before you publish it.' },
        { q: 'Can Northwind draft addenda for us?', a: 'Yes. Northwind drafts state addenda for the locations where you have employees and flags when they need an update.' },
      ],
    },
    sections: FULL_STACK,
  },
  {
    slug: 'entity-upkeep-guide',
    eyebrow: 'Entities',
    title: 'Entity Upkeep Guide',
    description: 'Keep every entity in good standing with a simple routine for reports, agents and renewals.',
    ctaLabel: 'Get the guide',
    heroImage: cover(1),
    benefits: [
      benefit(1, 'Good Standing', 'Know which reports each entity owes and file them before a missed deadline turns into a penalty.'),
      benefit(2, 'Agent Clarity', 'Keep registered agent details current in every state so legal mail reaches the right person.'),
      benefit(3, 'Audit Ready', 'Store filed reports and certificates together, ready for a bank, investor or acquirer to review.'),
    ],
    form: {
      heading: 'Managing entities in several states? This guide explains how to:',
      bullets: ['Inventory every entity', 'Track periodic reports', 'Manage registered agents', 'Prepare for due diligence'],
      submitLabel: 'Get the guide',
      fields: GUIDE_FIELDS,
    },
    featureGroup: FEATURE_GROUP,
    faq: {
      title: ['Your ', 'entity questions,', ' answered.'],
      items: [
        { q: 'What counts as an entity for this guide?', a: 'Any corporation, LLC or partnership registered with a state, including foreign registrations of the same company.' },
        { q: 'Do all states require annual reports?', a: 'Most states ask for a periodic report of some kind, though the name, timing and contents vary.' },
        { q: 'What happens if a report is missed?', a: 'States typically send notices first. Continued gaps can lead to penalties or a loss of good standing.' },
        { q: 'Does the guide cover dissolving entities?', a: 'Yes, there is a short section on closing registrations you no longer need.' },
        { q: 'Can Northwind file reports for us?', a: 'Yes. Northwind tracks report timing for each entity and files on your behalf.' },
      ],
    },
    sections: FULL_STACK,
  },

  // §8 order B: Hero → Form (bg main-white) → Trusted → FAQ → Bottom CTA
  {
    slug: 'state-compliance-outlook',
    eyebrow: 'Report',
    title: 'Compliance Outlook',
    description: 'A sample report on the registration and filing questions growing teams raise most often.',
    ctaLabel: 'Read report',
    heroImage: cover(2),
    form: {
      heading: 'Get the full outlook report and learn how teams like yours:',
      bullets: ['Prioritize new registrations', 'Handle agency notices', 'Staff compliance work', 'Plan for the year ahead'],
      submitLabel: 'Read report',
      fields: GUIDE_FIELDS,
    },
    faq: {
      title: ['Your ', 'report questions,', ' answered.'],
      items: [
        { q: 'What is in the outlook report?', a: 'Themes and checklists drawn from common questions teams ask about registrations, filings and notices.' },
        { q: 'Is the report based on real customer data?', a: 'This is a sample report for the Northwind demo site. Its contents are illustrative only.' },
        { q: 'Who is the report for?', a: 'Finance, operations and people leaders at companies with employees or entities in several states.' },
        { q: 'How long is it?', a: 'It is designed to be read in about fifteen minutes, with a one-page summary at the front.' },
        { q: 'Will there be future editions?', a: 'We plan to refresh it periodically. Subscribers to the newsletter hear about new editions first.' },
      ],
    },
    sections: [{ type: 'hero' }, { type: 'form', bg: 'main-white' }, { type: 'trusted' }, { type: 'faq' }, { type: 'cta' }],
  },

  // §8 order C: Hero → Form → (features-section: not measured, skipped) → Trusted
  {
    slug: 'registration-health-check',
    eyebrow: 'Checklist',
    title: 'Registration Check',
    description: 'Review every state registration your company holds and find the gaps before an agency does.',
    ctaLabel: 'Get checklist',
    heroImage: cover(3),
    form: {
      heading: 'Run a registration health check with a checklist that helps you:',
      bullets: ['List every active account', 'Spot missing registrations', 'Close unused accounts', 'Assign clear owners'],
      submitLabel: 'Get checklist',
      fields: GUIDE_FIELDS,
    },
    sections: [{ type: 'hero' }, { type: 'form' }, { type: 'trusted' }],
  },

  // §8 order D: Hero → (bg-white section: not measured, skipped) → Form
  {
    slug: 'switching-payroll-providers-guide',
    eyebrow: 'Transition',
    title: 'Switch Payroll Calmly',
    description: 'Move to a new payroll provider without losing account numbers, rates or filing history.',
    ctaLabel: 'Get the guide',
    heroImage: cover(1),
    form: {
      heading: 'Changing payroll providers this year? This guide shows you how to:',
      bullets: ['Collect every account number', 'Time the cutover', 'Hand off quarterly filings', 'Confirm the first run'],
      submitLabel: 'Get the guide',
      fields: GUIDE_FIELDS,
    },
    sections: [{ type: 'hero' }, { type: 'form' }],
  },
]

export const guideBySlug = (slug) => GUIDES.find((g) => g.slug === slug)
