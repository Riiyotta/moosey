/**
 * /platform (specs/marketing.md §2.1) — original Northwind placeholder copy, lengths matched to each role.
 * Title segments: 'plain' | { g: 'green' } | '\n'.
 */
const A = '/assets/art'

export const PLATFORM = {
  hero: {
    variant: 'platform',
    eyebrow: 'Platform',
    title: ['Every ', { g: 'state and city' }, ' rule, one place'],
    description: 'Northwind brings registrations, filings and notices for every location into one platform that grows with you.',
    visual: {
      desktop: { src: `${A}/marketing/hero-visual.svg`, w: 2406, h: 932 },
      mobile: { src: `${A}/marketing/hero-visual-res.svg`, w: 1004, h: 738 },
      alt: 'Northwind dashboard overview',
    },
  },

  mailService: {
    id: 'mail-service',
    cards: [
      {
        title: 'Agency mail and a registered agent, sorted',
        desc: 'Open state letters right in your browser. Better still, get a heads-up the moment an urgent notice arrives from any agency.',
        items: [
          {
            title: 'Open a digital mailroom',
            body: 'Point agency mail to Northwind so key letters never sit in an inbox nobody checks.',
            image: { src: `${A}/marketing/platform-mail-1.svg` },
          },
          {
            title: 'Keep one registered agent',
            body: 'Use one registered agent in every state and see each filing in one shared feed.',
            image: { src: `${A}/marketing/platform-mail-2.svg` },
          },
          {
            title: 'Filter out the noise',
            body: 'Junk mail and duplicates are set aside, so your team only reads what matters.',
            image: { src: `${A}/marketing/platform-mail-3.svg` },
          },
        ],
      },
      {
        title: 'Accounts and logins kept safe',
        desc: 'Store every agency account, number and password in one vault with access set by role.',
        items: [
          {
            title: 'Store agency credentials',
            body: 'Logins for every state portal live in one encrypted vault, shared by role.',
            image: { src: `${A}/marketing/platform-secure-1.svg` },
          },
          {
            title: 'Track every account number',
            body: 'Withholding and unemployment numbers stay current, with rate changes logged.',
            image: { src: `${A}/marketing/platform-secure-2.svg` },
          },
          {
            title: 'Share access by role',
            body: 'Give each team the view it needs without passing passwords around in chat.',
            image: { src: `${A}/marketing/platform-secure-3.svg` },
          },
        ],
      },
      {
        title: 'Bring the filings you already have',
        desc: 'Import the filings your team or a past provider started and pick up where they left off.',
        items: [
          {
            title: 'Import every record your team already keeps',
            body: 'Upload what you have and Northwind matches each record to the right entity.',
            image: { src: `${A}/marketing/platform-import-1.svg` },
          },
          {
            title: 'Fill the gaps automatically',
            body: 'Missing registrations and late filings are flagged and ranked by urgency.',
            image: { src: `${A}/marketing/platform-import-2.svg` },
          },
          {
            title: 'Keep a complete history',
            body: 'Every document and change stays on file, so audits never start from scratch.',
            image: { src: `${A}/marketing/platform-import-3.svg` },
          },
        ],
      },
    ],
  },

  features: {
    variant: 'A',
    items: [
      {
        title: [{ g: 'Simplify' }, ' every obligation'],
        desc: 'Cover the registrations, filings and renewals your company owes in each state where it operates.',
        list: ['Payroll registrations', 'HR policy updates', 'Entity filings', 'Sales and use tax'],
        image: { src: `${A}/marketing/feature-streamline.svg` },
      },
      {
        title: [{ g: 'Automate' }, ' the busywork'],
        desc: 'Let Northwind handle the slow, repetitive steps and keep every compliance record together in one secure place.',
        list: ['Alerts and monitoring', 'Automated registrations', 'Annual report filing', 'Posters and notices', 'Shared team tasks'],
        image: { src: `${A}/marketing/feature-reduce.svg` },
      },
      {
        title: [{ g: 'Combine' }, ' your vendors'],
        desc: 'Replace a patchwork of agents, mail services and spreadsheets with one workflow that costs less to run and is easier to manage.',
        list: ['Registered agent', 'Agency mail', 'Account details'],
        image: { src: `${A}/marketing/feature-consolidate.svg` },
      },
    ],
  },

  ecosystem: {
    title: ['Part of a ', { g: 'bigger compliance team.' }],
    desc: 'Meet the platforms that work alongside Northwind to bring compliance to more companies.',
    partners: [
      {
        logo: { src: `${A}/marketing/partner-ledgerly.svg`, alt: 'Ledgerly' },
        desc: 'Ledgerly runs payroll, benefits and HR for growing teams across the country.',
      },
      {
        logo: { src: `${A}/marketing/partner-paycrest.svg`, alt: 'Paycrest' },
        desc: 'Paycrest helps founders incorporate and get paid from anywhere.',
      },
      {
        logo: { src: `${A}/marketing/partner-summit.svg`, alt: 'Summit & Co' },
        desc: 'Summit & Co advises companies on benefits and total rewards.',
      },
    ],
  },

  engine: {
    title: ['A true ', { g: 'compliance' }, ' engine'],
    desc: 'Northwind runs the most complete system available for tracking, flagging and monitoring local compliance.',
    items: [
      {
        title: 'We know the rules',
        desc: 'Hand off the research into what it takes to stay compliant, and save your team hours (and fines).',
        list: ['Thousands of rules across every state and city', 'Always current with the latest changes', 'New requirements spotted instantly'],
        image: { src: `${A}/marketing/engine-1.svg` },
      },
      {
        title: 'One source of truth',
        desc: 'See your company setup and compliance status for every location at a glance.',
        list: ['A compliance calendar built for you, so no important deadline slips', 'Tasks shared across every team', 'All your records in one place'],
        image: { src: `${A}/marketing/engine-2.svg` },
      },
      {
        title: 'Connected to your payroll',
        desc: 'Link your payroll provider to unlock deeper monitoring for HR and tax.',
        list: ['Over 100 payroll providers supported', 'New registrations found automatically', 'New hire requirements detected'],
        image: { src: `${A}/marketing/engine-3.svg` },
      },
    ],
  },
}
