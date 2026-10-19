/**
 * Sample placeholder copy for Template A (legacy partner kit, specs/misc.md §2) — original text written for
 * this clone, sized to the spec's character counts. Shared by every Template A partner record; a record
 * overrides only what its variant changes (hero, lockup, pricing header, about padding).
 */
const s = (name) => `/assets/art/misc/screens/${name}.svg`

export const featureRows = {
  // band 3, row 1 — text left, 1428×737 screenshot bleeding right (renders 1240×640 at 1440)
  setup: {
    title: 'Open new state accounts in minutes',
    lead: 'Skip the agency portals. Register for withholding and unemployment accounts as soon as you hire.',
    items: [
      {
        icon: 'globe',
        title: 'Register payroll accounts in any state',
        desc: 'Hiring someone in a new state? Northwind files the registrations for you and tracks every account number until it arrives.',
      },
      {
        icon: 'scale',
        title: 'Qualify with the Secretary of State in each new location',
        desc: 'Request a good standing certificate, file to qualify as a foreign company in each new state and appoint a registered agent in one place.',
      },
    ],
    image: { src: s('payroll-setup'), alt: 'Sample app screen: state account setup checklist (placeholder)', w: 1428, h: 737 },
  },
  // band 3, row 2 — mock workflow card left, text right
  workflow: {
    title: 'Every requirement, one view',
    lead: 'See what each location needs before it becomes urgent, and follow every task from start to finish.',
    items: [
      {
        icon: 'globe',
        title: 'Spot gaps before they spread',
        desc: 'We map the rules in every state for you. Review requirements for HR, payroll, tax and registration in a single list.',
      },
      {
        icon: 'scale',
        title: 'Organize HR, payroll, insurance and registration tasks',
        desc: 'Every requirement for every location, grouped by category, so the whole team knows what comes next.',
      },
    ],
    card: {
      chip: 'Registration',
      sections: [
        {
          label: 'Payroll',
          glyph: 'receipt',
          active: true,
          steps: [
            { label: 'Ridgeline withholding account setup', state: 'active' },
            { label: 'Ridgeline unemployment insurance account setup', state: 'next' },
          ],
        },
        {
          label: 'HR',
          glyph: 'people',
          steps: [
            { label: 'Ridgeline equal pay notice update', state: 'todo' },
            { label: 'Ridgeline workplace posters and notices', state: 'todo' },
          ],
        },
        {
          label: 'Registration',
          glyph: 'building',
          steps: [
            { label: 'Ridgeline foreign qualification', state: 'todo' },
            { label: 'Ridgeline periodic report', state: 'locked' },
            { label: 'Ridgeline income tax', state: 'locked' },
          ],
        },
      ],
    },
  },
  // band 3, row 3 — text left, 1336×942 screenshot (874×616 at 1440)
  mail: {
    title: 'State mail, online',
    lead: 'Read official letters from your browser and get an alert whenever an important notice arrives from any agency.',
    items: [
      {
        icon: 'inbox',
        title: 'A digital mailroom',
        desc: 'Northwind scans every letter on arrival so nothing sits unopened in a mailbox nobody checks.',
      },
      {
        icon: 'stack',
        title: 'One registered agent for every state',
        desc: 'Northwind serves as your registered agent and receives service of process in each state, so you need no extra provider.',
      },
    ],
    image: { src: s('inbox'), alt: 'Sample app screen: agency mail inbox (placeholder)', w: 1336, h: 942 },
  },
  // band 3, row 4 — 854×584 image left (`mt-24`), text right
  payroll: {
    title: 'Sync your payroll',
    lead: 'Connect payroll data so Northwind can track compliance across your back-office tools as your team changes.',
    items: [
      {
        icon: 'sliders',
        title: 'One control panel for compliance',
        desc: 'See which actions you own, which ones payroll covers, and which ones Northwind automates for you.',
      },
      {
        icon: 'monitor',
        title: 'Monitoring and alerts as you grow',
        desc: 'Payroll changes trigger new requirements automatically, and you hear about them before deadlines arrive.',
      },
    ],
    image: { src: s('integrations'), alt: 'Sample app screen: connect a payroll provider (placeholder)', w: 854, h: 584 },
  },
  // band 3, row 5 — text left, 2766×930 wide crop (1832×616 at 1440)
  notices: {
    title: 'Automate workplace notices and posters',
    lead: 'Even fully remote teams must share required labor notices in every state. Keep them current automatically.',
    items: [
      {
        icon: 'document',
        title: 'A shared notice board',
        desc: 'No more downloading stacks of PDFs. Embed current notices in your intranet or employee handbook.',
      },
      {
        icon: 'refresh',
        title: 'Always the latest version',
        desc: 'When a required poster changes, your notice board updates on its own and every employee sees the new version.',
      },
    ],
    image: { src: s('notices'), alt: 'Sample app screen: workplace notices by state (placeholder)', w: 1383, h: 465 },
  },
}

export const alwaysCurrent = {
  title: 'Always up to date',
  subtitle:
    'Compliance rules differ in every state and they change all the time. Your team needs tools that keep pace, so you can avoid penalties, fees and late filings.',
  rows: [
    {
      title: 'Never miss a deadline',
      lead: 'Generate a compliance calendar automatically instead of tracking every due date by hand.',
      items: [
        { icon: 'flag', title: 'Weekly summaries', desc: 'A short summary of your compliance status lands in your inbox every week, so nothing slips.' },
        { icon: 'calendar', title: 'Plan ahead', desc: 'Due dates are recalculated as things change, so you can look ahead and prepare early.' },
      ],
      image: { src: s('calendar'), alt: 'Sample app screen: compliance calendar (placeholder)', w: 1439, h: 799 },
    },
    {
      title: 'Timely alerts and monitoring',
      lead: 'Stay ahead with notifications for important tasks that need your attention this week.',
      items: [
        { icon: 'chat', title: 'Continuous monitoring', desc: 'Requirements are recalculated whenever your company or employee data changes.' },
        { icon: 'mail', title: 'Email alerts', desc: 'Get an email when a new requirement applies to you, so you can act on it right away.' },
      ],
      image: { src: s('alerts'), alt: 'Sample app screen: alert list (placeholder)', w: 900, h: 487 },
    },
    {
      title: 'Stay ahead of new laws',
      lead: 'Get notified when legislation changes and new requirements take effect in any of the states where you operate.',
      items: [
        { icon: 'scale', title: 'Track new legislation', desc: 'Hand off the work of following new laws and rule changes across every state you operate in.' },
        { icon: 'cog', title: 'Manage the full lifecycle', desc: 'See how a new law affects your business, then get tasks assigned when it takes effect.' },
      ],
      image: { src: s('legislation'), alt: 'Sample app screen: upcoming legislation (placeholder)', w: 1324, h: 852 },
    },
  ],
}

export const collaborate = {
  title: 'Work on compliance together',
  subtitle: 'One workspace for your people, finance, tax and legal teams to stay compliant everywhere you operate.',
  cards: [
    {
      title: 'Invite your team',
      lead: 'Coordinate compliance the right way by bringing everyone into one shared tool instead of scattered spreadsheets.',
      image: { src: s('team'), alt: 'Sample app screen: invite teammates (placeholder)' },
    },
    {
      title: 'Delegate and assign',
      lead: 'Take control of the workload and hand tasks to the right teammates, so you have more time for important work.',
      image: { src: s('assign'), alt: 'Sample app screen: assign a task (placeholder)' },
    },
  ],
  row: {
    title: 'Share tax accounts securely',
    lead: 'Store account numbers and portal logins for state agencies in one place and share them with the right people.',
    items: [
      { icon: 'badge', title: 'Keep access to critical accounts', desc: 'If someone leaves the company, their access to state accounts stays with the team.' },
      { icon: 'login', title: 'Sign in through Northwind', desc: 'Open any of your state tax accounts from one place. No more hunting for the right portal or the right password.' },
    ],
    image: { src: s('accounts'), alt: 'Sample app screen: stored tax accounts (placeholder)', w: 1575, h: 797 },
  },
}

export const everything = {
  eyebrow: 'Everything included',
  title: 'Compliance, all in one',
  lead: 'One platform for staying compliant in every state.',
  items: [
    { title: 'Employer registration', desc: 'Open employer and tax accounts so payroll can start in a new state quickly.' },
    { title: 'Compliance calendar', desc: 'A calendar that updates itself, so you never miss a due date or pay a late fee.' },
    { title: 'Monitoring and alerts', desc: 'Hear about it as soon as an important compliance task needs your attention.' },
    { title: 'Import existing locations', desc: 'Bring in every location you already have and track all of them in one place.' },
    { title: 'Compliance expertise', desc: 'See HR, payroll, insurance, registration and tax requirements for every location.' },
    { title: 'Track requirements', desc: 'Keep requirements and tasks moving until each one is done.' },
    { title: 'Invite your team', desc: 'Invite teammates and outside advisors, then assign and delegate tasks.' },
    { title: 'Store agency accounts', desc: 'Keep registration details, ID numbers and credentials stored securely.' },
  ],
}

/** §2.9 pricing cards — group/item counts match the original card heights (1268 / 1688 / 1248 at 1440) */
export const plans = (href) => [
  {
    pill: 'Built for the founding team',
    name: 'Launch Plan',
    blurb: 'Run payroll in new states and stay compliant after incorporation.',
    amount: '240',
    unit: 'Month',
    unitSub: 'Platform fee',
    fee: '$6 per employee / month',
    cta: 'Get started',
    href,
    groups: [
      { title: 'Automated state registration', items: ['Withholding tax', 'Unemployment insurance', 'Paid family leave'] },
      { title: 'Compliance after incorporation', items: ['Franchise tax reminders', 'Annual report preparation', 'Registered agent service'] },
      {
        title: 'Ready for more than one state',
        items: [
          'Step-by-step guidance for payroll, HR, tax, insurance and registration requirements in each state',
          'Alerts for new compliance tasks',
          'Weekly compliance summary',
        ],
      },
      { title: 'Connect the back office', items: ['Connect your payroll provider', 'Alerts when employee changes add requirements'] },
      { title: 'Invite your team', items: ['Includes 3 seats', 'Share tax account details securely with outside accountants'] },
    ],
  },
  {
    pill: 'Built for HR and finance teams',
    name: 'Growth Plan',
    blurb: 'Hire in many states and keep corporate filings and taxes current.',
    amount: '480',
    unit: 'Month',
    unitSub: 'Platform fee',
    fee: '$8 per employee / month',
    cta: 'Get started',
    href,
    note: ['Everything in the ', 'Launch Plan', ', plus tools to help you scale.'],
    groups: [
      { title: 'Advanced state registration', items: ['Unlimited state registrations', 'Local city tax setup', 'Third-party access requests'] },
      {
        title: 'Multi-state compliance',
        items: [
          'Requirements identified across payroll, HR, tax, insurance, registration and offboarding',
          'Alerts for new laws and compliance requirements',
          'An always up-to-date compliance calendar',
          'Automated labor notices and posters for remote employees',
        ],
      },
      { title: 'Agency notices and mail', items: ['A mailroom for letters from any state agency', 'Read your physical mail in the app', 'Assign and resolve letters and notices'] },
      {
        title: 'Secretary of State compliance',
        items: ['Automated foreign qualification', 'Registered agent service in all 50 states', 'Annual report schedules, estimated taxes and franchise taxes tracked'],
      },
      { title: 'Onboarding support', items: ['A personalized onboarding roadmap', 'Check-in calls after onboarding'] },
      { title: 'Several teams, one account', items: ['Unlimited seats', 'Assign and delegate tasks to your team', 'Manage outside vendors and advisors in one place'] },
    ],
  },
  {
    pill: 'Built for large employers',
    name: 'Scale Plan',
    blurb: 'Support a distributed workforce and keep compliance risk in check.',
    amount: '1,400',
    unit: 'Month',
    unitSub: 'Per entity',
    fee: '$12 per employee / month',
    cta: 'Get started',
    href,
    note: ['Everything in the ', 'Growth Plan', ', plus enterprise-ready features.'],
    groups: [
      { title: 'Multiple legal entities', items: ['Manage compliance for a parent company and its subsidiaries', 'Roll requirements up across entities'] },
      { title: 'Admin controls', items: ['Role-based permissions for every user', 'Single sign-on with your identity provider', 'Audit logging'] },
      { title: 'HR system integration', items: ['Sync employee data from your HR system', 'Implementation support for the integration'] },
      {
        title: 'Priority support',
        items: ['A dedicated implementation specialist', 'A dedicated account manager', 'Priority email support', 'Quarterly success check-ins'],
      },
    ],
  },
]

const logo = (name) => `/assets/art/misc/logos/${name}.svg`

/** §2.11 logo groups: visible widths 80, 80, 150, 128 and 192 (lg only); `hidden sm:/xl:` logos never render */
export const aboutLogoGroups = [
  [
    { src: logo('arcwell'), alt: 'Arcwell (fictional)', className: 'w-20' },
    { src: logo('kestrel'), alt: 'Kestrel (fictional)', className: 'w-20' },
  ],
  [
    { src: logo('fernway'), alt: 'Fernway (fictional)', className: 'w-[150px]' },
    { src: logo('orbitra'), alt: 'Orbitra (fictional)', className: 'w-32' },
    { src: logo('tessellate'), alt: 'Tessellate (fictional)', className: 'hidden w-48 lg:inline-flex' },
  ],
]

export const testimonials = [
  {
    avatar: '/assets/art/avatars/avatar-2.svg',
    quote:
      'Expanding into new states used to mean weeks of research and a pile of agency forms. With Northwind every registration was tracked for us, each deadline was on the calendar, and our small team could stay focused on hiring instead of paperwork and portals.',
    logo: logo('fernway'),
    company: 'Fernway (fictional)',
    name: 'Jordan Reyes',
    role: 'Head of Operations, Fernway',
  },
  {
    avatar: '/assets/art/avatars/avatar-4.svg',
    quote:
      'We run payroll in eleven states and the rules never stop changing. Northwind tells us what changed, what we need to do about it and when it is due. It is the first compliance tool our finance team actually opens every single week, and our audits have become far less stressful as a result.',
    logo: logo('orbitra'),
    company: 'Orbitra (fictional)',
    name: 'Priya Natarajan',
    role: 'Controller, Orbitra',
  },
  {
    avatar: '/assets/art/avatars/avatar-5.svg',
    quote:
      'Our registered agent mail, state notices and annual reports finally live in one place. When a letter arrives we know who owns it and when it needs an answer, and nothing waits in a mailbox for weeks. That alone saved us from two late penalties in our first year.',
    logo: logo('kestrel'),
    company: 'Kestrel (fictional)',
    name: 'Casey Morgan',
    role: 'VP of People, Kestrel',
  },
]
