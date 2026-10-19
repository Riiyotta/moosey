/**
 * /platform/:product compositions (specs/marketing.md §2.2). Each record = ordered list of blocks; the
 * PlatformProduct template renders them through its BLOCKS map. Phase 1 ships the payroll-compliance base;
 * phase 2 adds tax-compliance, handbooks and entity-compliance records (see README "Phase 2" notes).
 *
 * Block entry: { type, props } — `type` is a key of BLOCKS in src/pages/PlatformProduct.jsx.
 * Title segments: 'plain' | { g: 'green' } | '\n'.
 */
const A = '/assets/art'

export const TRUSTED_ROWS = [
  ['halcyon', 'brightpath', 'corvid-labs', 'tessellate', 'orbitra', 'fernway'],
  ['kestrel', 'driftwood', 'juniper-bay', 'arcwell', 'pallaso', 'quillfield'],
]

const CHART_ICONS = [1, 2, 3].map((i) => ({ src: `${A}/marketing/benefit-pictogram-${i}.svg` }))
const HANDBOOK_ICONS = [1, 2, 3].map((i) => ({ src: `${A}/marketing/handbook-pictogram-${i}.svg` }))
const HERO_VISUAL = {
  desktop: { src: `${A}/marketing/hero-visual.svg`, w: 2406, h: 932 },
  mobile: { src: `${A}/marketing/hero-visual-res.svg`, w: 1004, h: 738 },
}

export const PRODUCTS = {
  'payroll-compliance': {
    blocks: [
      {
        type: 'hero',
        props: {
          variant: 'landing',
          eyebrow: 'Payroll Compliance',
          title: ['State and city payroll', '\n', 'accounts in ', { g: 'every state.' }],
          description: 'Open tax accounts wherever your people work and catch new locations the moment they show up in payroll.',
          visual: {
            desktop: { src: `${A}/marketing/hero-visual.svg`, w: 2406, h: 932 },
            mobile: { src: `${A}/marketing/hero-visual-res.svg`, w: 1004, h: 738 },
            alt: 'Northwind payroll registration overview',
          },
        },
      },
      { type: 'trusted', props: { rows: TRUSTED_ROWS, padding: 'landing' } },
      {
        type: 'benefits',
        props: {
          title: ['Payroll, ', { g: 'unblocked' }],
          desc: 'The simplest way to register with state and local tax agencies, so your newest hire lands on payroll in a new location on time.',
          cards: [
            {
              value: 'Automatic registration',
              desc: 'Register in every state and locality (even the trickiest counties) without dealing with agencies yourself.',
              icon: CHART_ICONS[0],
            },
            {
              value: 'Quick and correct',
              desc: 'Register quickly and safely: our experts review every application, then send it on as fast as each of the state agencies allows.',
              icon: CHART_ICONS[1],
            },
            {
              value: 'Connected end to end',
              desc: 'Link your payroll provider, get agency mail digitally, manage tax details and reach portals from your browser.',
              icon: CHART_ICONS[2],
            },
          ],
        },
      },
      {
        type: 'getStarted',
        props: {
          title: ['How it ', { g: 'works' }],
          desc: 'Registering has never been simpler. Go live in a new location with just a few clicks.',
          steps: [
            {
              title: 'Share a few company details',
              desc: 'Answer the handful of questions agencies ask. Northwind saves your answers, so later forms are about half as long.',
              image: { src: `${A}/peace/peace-step-1.svg` },
            },
            {
              title: 'We send your application in',
              desc: 'Once a specialist has checked your details, the application goes straight to each agency.',
              image: { src: `${A}/peace/peace-step-2.svg` },
            },
            {
              title: 'Wrap up your payroll setup',
              desc: 'Spot remaining compliance gaps, take action and close them out automatically.',
              image: { src: `${A}/peace/peace-step-3.svg` },
            },
          ],
        },
      },
      {
        type: 'cta',
        props: {
          title: 'Want to see how registration works in Northwind?',
          desc: 'Talk with a compliance specialist about state and local tax registration across all fifty states.',
        },
      },
      {
        type: 'featureGroup',
        props: {
          id: 'feature-group',
          cards: [
            {
              title: 'Keep payroll compliant',
              desc: 'After you register, stay compliant with automated checks that spot new registrations, collect agency mail and give you quick access to every agency account.',
              items: [
                {
                  title: 'Link payroll, catch registrations',
                  body: 'Northwind spots when someone moves or a new hire lands in a place that needs registering.',
                  image: { src: `${A}/peace/peace-step-2.svg` },
                },
                {
                  title: 'Get agency mail digitally',
                  body: 'Tax agency letters are scanned, summarized and routed the day they arrive.',
                  image: { src: `${A}/marketing/platform-mail-1.svg` },
                },
                {
                  title: 'Reach agency portals safely',
                  body: 'Sign in to state portals from one secure vault, shared only with the right people.',
                  image: { src: `${A}/compliance/tab-startup.svg` },
                },
              ],
            },
          ],
        },
      },
      {
        type: 'featureList',
        props: {
          variant: 'B',
          items: [
            {
              title: ['Registering is ', { g: 'just the first step' }],
              desc: 'Hiring in a new place brings ongoing requirements. Northwind watches thousands of them for you automatically, so your company stays compliant as it grows.',
              list: ['Local payroll rules', 'HR requirements', 'Entity upkeep', 'Tax filings'],
              image: { src: `${A}/marketing/feature-payroll-feature.svg` },
            },
          ],
        },
      },
      { type: 'faq' },
      { type: 'bottomCta' },
    ],
  },
  /* §2.2 tax-compliance: payroll template minus GetStarted and FAQ; hero h1 has no green span */
  'tax-compliance': {
    blocks: [
      {
        type: 'hero',
        props: {
          variant: 'landing',
          eyebrow: 'Tax Compliance',
          title: 'Every state tax, handled well',
          description: 'Register for sales, payroll and income taxes in every state you reach, and keep every account current.',
          visual: {
            desktop: HERO_VISUAL.desktop,
            mobile: { src: `${A}/marketing/hero-tax-res.svg`, w: 1201, h: 880 },
            alt: 'Northwind tax compliance overview',
          },
        },
      },
      { type: 'trusted', props: { rows: TRUSTED_ROWS, padding: 'landing' } },
      {
        type: 'benefits',
        props: {
          title: ['Taxes, ', { g: 'simplified' }],
          desc: 'Spend less time on agency portals and more time growing your business, wherever your company operates.',
          cards: [
            { value: 'Every tax account', desc: 'Open withholding, sales and franchise accounts in any state.', icon: CHART_ICONS[0] },
            { value: 'Filed on time', desc: 'Returns are prepared well ahead of each due date and checked by a specialist first.', icon: CHART_ICONS[1] },
            { value: 'Notices handled', desc: 'Agency letters are read, summarized and answered with clear next steps.', icon: CHART_ICONS[2] },
          ],
        },
      },
      {
        type: 'cta',
        props: {
          title: 'Want a walkthrough of tax setup in Northwind?',
          desc: 'Talk with a specialist about tax registration, filings and renewals in every state you operate in.',
        },
      },
      {
        type: 'featureGroup',
        props: {
          id: 'feature-group',
          cards: [
            {
              title: 'Stay tax compliant',
              desc: 'Once your accounts are open, Northwind watches rates, deadlines and nexus thresholds for you, then flags anything new so your team can act long before it turns into a penalty.',
              items: [
                {
                  title: 'Track nexus as you grow',
                  body: 'See when sales or headcount in a state cross a threshold that creates a new obligation.',
                  image: { src: `${A}/marketing/platform-secure-2.svg` },
                },
                {
                  title: 'Keep tax rates current every quarter',
                  body: 'Rate notices are logged against the right account, so payroll uses the latest rate.',
                  image: { src: `${A}/marketing/platform-secure-1.svg` },
                },
                {
                  title: 'File franchise and annual taxes',
                  body: 'Franchise and annual taxes are prepared early and filed once you approve them.',
                  image: { src: `${A}/compliance/tab-finance.svg` },
                },
              ],
            },
          ],
        },
      },
      {
        type: 'featureList',
        props: {
          variant: 'B',
          items: [
            {
              title: ['Tax setup is ', { g: 'only the first step' }],
              desc: 'Selling or hiring in a new state brings ongoing filings and renewals. Northwind tracks every one of them automatically, so your company stays compliant.',
              list: ['Sales tax filings', 'Payroll taxes', 'Franchise tax', 'Annual reports due'],
              image: { src: `${A}/marketing/feature-streamline.svg` },
            },
          ],
        },
      },
      { type: 'bottomCta' },
    ],
  },

  /* §2.2 handbooks: Hero → FeatureList A (pairs) → BenefitsLanding (pictograms) → BenefitGroup (+CTA) → GetStarted ×4 → FAQ ×8 → CTA */
  handbooks: {
    blocks: [
      {
        type: 'hero',
        props: {
          variant: 'landing',
          eyebrow: 'Handbooks',
          title: ['Employee handbooks that', '\n', { g: 'keep themselves current.' }],
          description: 'Publish a handbook that stays compliant in every state, with policies reviewed by employment lawyers.',
          visual: {
            desktop: { src: `${A}/marketing/hero-handbook.svg`, w: 4760, h: 1776 },
            mobile: { src: `${A}/marketing/hero-handbook-res.svg`, w: 2380, h: 888 },
            alt: 'Northwind handbook editor',
          },
        },
      },
      {
        type: 'featureList',
        props: {
          variant: 'A',
          keepLastPadding: true,
          items: [
            {
              title: ['Is your handbook ', { g: 'current?' }],
              desc: 'Most handbooks fall out of date the moment a rule changes. Northwind gives you everything needed for a compliant handbook process that lowers the risk of fines.',
              pairs: [
                {
                  title: 'Free up a small HR team',
                  desc: 'Lean HR teams rarely have time to keep policies current. Automate the handbook process from end to end.',
                },
                {
                  title: 'Expertise included',
                  desc: 'State and local policies get complicated fast. Northwind finds what applies and keeps it current as rules change.',
                },
                {
                  title: 'Lower risk and legal fees',
                  desc: 'Reviewing every policy with outside counsel adds up. Northwind ships lawyer-approved policies right away.',
                },
              ],
              image: { src: `${A}/marketing/feature-handbook.svg` },
            },
          ],
        },
      },
      {
        type: 'benefits',
        props: {
          title: ['Employee handbooks ', { g: 'made simple' }],
          desc: 'Keep handbook upkeep simple and save your team countless hours and dollars.',
          cards: [
            { value: 'Quick setup in minutes', desc: 'A few clicks in Northwind to create or update your handbook.', icon: HANDBOOK_ICONS[0] },
            { value: 'Thorough, current policy', desc: 'Your handbook generates lawyer-approved policies automatically.', icon: HANDBOOK_ICONS[1] },
            { value: 'Ready for every state', desc: 'Every state-specific policy is covered, so you stay compliant.', icon: HANDBOOK_ICONS[2] },
          ],
        },
      },
      {
        type: 'benefitGroup',
        props: {
          title: ['A multi-state handbook platform built ', { g: 'for growing teams' }],
          tabs: [
            {
              label: 'Automatic',
              image: { src: `${A}/compliance/tab-head-of-people.svg` },
              items: [
                { icon: 'automate', title: 'Policies written for you', desc: 'Policies are generated from the states you operate in, saving your team hours of research.' },
                { icon: 'compliance', title: 'Lawyer reviewed', desc: 'Employment lawyers check every policy across all states, so your handbook is accurate, compliant and protected.' },
                { icon: 'monitor', title: 'One-click updates', desc: 'When a rule changes, Northwind tells you and proposes the edit. One click reviews and applies it to your handbook.' },
              ],
            },
            {
              label: 'Connected',
              image: { src: `${A}/compliance/tab-finance.svg` },
              items: [
                { icon: 'consolidate', title: 'Syncs with payroll', desc: 'Employee locations flow in from payroll, so the right state policies are added the moment someone moves or joins.' },
                { icon: 'identify', title: 'Signatures tracked', desc: 'See who has read and signed each version, and send reminders to anyone who still needs to acknowledge it.' },
                { icon: 'letter', title: 'Shared with every hire', desc: 'New teammates get the current handbook on day one, with the policies for their state already included.' },
              ],
            },
            {
              label: 'People-centered',
              image: { src: `${A}/compliance/tab-legal.svg` },
              items: [
                { icon: 'modern', title: 'Plain-language policies', desc: 'Policies read clearly for every employee while still covering what each state requires of your company.' },
                { icon: 'offload', title: 'Your culture included', desc: 'Add your own sections on values and benefits, and keep them alongside the required legal policies.' },
                { icon: 'eliminate', title: 'Easy to find', desc: 'A searchable online handbook means employees find answers fast without asking HR.' },
              ],
            },
          ],
          cta: {
            title: 'Ready to bring your state compliance program up to date?',
            desc: 'See how to handle state and local compliance the easy way with the Northwind platform.',
          },
        },
      },
      {
        type: 'getStarted',
        props: {
          title: [{ g: 'Simple setup' }],
          desc: 'Building a handbook that stays compliant everywhere you hire has never been easier. We guide your team through every single step.',
          steps: [
            {
              title: 'Tell us about your company',
              desc: 'Answer a short set of questions about your locations, team size and benefits. Northwind uses them to pick the policies that apply to you.',
              image: { src: `${A}/peace/peace-step-1.svg` },
            },
            {
              title: 'Review your policy package',
              desc: 'Your draft handbook arrives with lawyer-approved policies for every state. Edit wording, add your own sections and preview the result.',
              image: { src: `${A}/peace/peace-step-2.svg` },
            },
            {
              title: 'Publish and collect signoff',
              desc: 'Share the handbook with every employee in one step, then track who has read and signed it from a single, always current dashboard.',
              image: { src: `${A}/peace/peace-step-3.svg` },
            },
            {
              title: 'Stay current all year',
              desc: 'When rules change, suggested edits arrive ready for review and apply in a click.',
              image: { src: `${A}/peace/peace-step-4.svg` },
            },
          ],
        },
      },
      {
        type: 'faqVariant',
        props: {
          title: 'Handbook questions, answered here',
          items: [
            { q: 'Which policies are included?', a: 'Federal, state and local policies for every location where you have employees, plus optional company sections.' },
            { q: 'Who writes and reviews each of the policies?', a: 'Employment lawyers draft and review every policy, and they update them whenever a rule changes.' },
            { q: 'Can we keep sections from our current handbook, like culture and benefits, and add them in?', a: 'Yes. Import or paste your existing sections and Northwind keeps them alongside the required policies.' },
            { q: 'How do updates work?', a: 'You get a notification with the proposed edit and the reason for it. Review it, then apply it with one click.' },
            { q: 'Do employees need an account to sign it?', a: 'No. Employees open a secure link, read the handbook and sign in a couple of minutes.' },
            { q: 'Does it work with our payroll provider?', a: 'Northwind connects to most payroll providers to keep employee locations in sync.' },
            { q: 'How long does setup usually take?', a: 'Most teams publish their first handbook within a day of answering the setup questions.' },
            { q: 'What happens when we hire in a new state for the first time and need policies for that location?', a: 'Northwind adds that state’s required policies to your draft and asks you to review them before publishing.' },
          ],
        },
      },
      { type: 'bottomCta' },
    ],
  },

  /* §2.2 entity-compliance: HeroStatic → Trusted → ScrollTabs ×4 → GenericCta → GetStarted ×3 → FeatureList B → CTA */
  'entity-compliance': {
    blocks: [
      {
        type: 'heroStatic',
        props: {
          eyebrow: 'Solutions',
          title: ['Registered agent and smarter', '\n', { g: 'entity management' }, ' in every state.'],
          description: 'Handle foreign qualification, annual reports and registered agent mail in one place, so every entity stays in good standing.',
        },
      },
      { type: 'trusted', props: { rows: TRUSTED_ROWS, padding: 'landing' } },
      {
        type: 'scrollTabs',
        props: {
          title: ['Stay in ', { g: 'good standing' }],
          desc: 'Keep every entity compliant with the Secretary of State wherever your company does business.',
          tabs: [
            {
              id: 'fq',
              label: 'Foreign qualification',
              image: { src: `${A}/marketing/scrolltab-1.svg`, mobileSrc: `${A}/marketing/scrolltab-1-m.svg` },
              features: [
                { title: 'Automated registration', desc: 'Register to do business in any state without filling out the forms yourself each time.' },
                { title: 'Good standing certificates', desc: 'Request a certificate of good standing whenever a bank, partner or investor asks.' },
                { title: 'Registered agent setup', desc: 'Name Northwind as your registered agent in the same step as each new registration.' },
              ],
            },
            {
              id: 'registered-agent',
              label: 'Registered agent',
              image: { src: `${A}/marketing/scrolltab-2.svg`, mobileSrc: `${A}/marketing/scrolltab-2-m.svg` },
              features: [
                { title: 'Every state', desc: 'One registered agent for every entity and every state, with a single bill and one shared dashboard to manage it all.' },
                { title: 'Same-day scanning', desc: 'Service of process and state mail are scanned on arrival and routed to the right owner.' },
                { title: 'Easy switching', desc: 'Move from your current agent in a few clicks, and Northwind files the change for you.' },
              ],
            },
            {
              id: 'tax-nexus',
              label: 'Tax nexus',
              image: { src: `${A}/marketing/scrolltab-3.svg`, mobileSrc: `${A}/marketing/scrolltab-3-m.svg` },
              features: [
                { title: 'Spot new taxes', desc: 'Registering in a new state can create new tax obligations. Northwind flags each one as soon as it applies to you.' },
                { title: 'Sales tax nexus', desc: 'See where sales cross a threshold and register for sales tax (beta) in every state.' },
                { title: 'Franchise tax filings', desc: 'Corporations can prepare and pay their annual franchise tax right inside Northwind.' },
              ],
            },
            {
              id: 'annual-reporting',
              label: 'Annual reporting',
              image: { src: `${A}/marketing/scrolltab-4.svg`, mobileSrc: `${A}/marketing/scrolltab-4-m.svg` },
              features: [
                { title: 'A calendar of every report', desc: 'Annual and biennial report deadlines for every entity in one view, with reminders well ahead.' },
                { title: 'Prepared and filed for you', desc: 'Reports are prepared from your entity records and filed as soon as you approve them online.' },
                { title: 'Fees paid', desc: 'State filing fees are paid on your behalf and itemized on one invoice for your records.' },
              ],
            },
          ],
        },
      },
      {
        type: 'cta',
        props: {
          title: 'Want to learn more about entity compliance?',
          desc: 'Talk with a compliance specialist about Secretary of State filings and good standing in all 50 states.',
        },
      },
      {
        type: 'getStarted',
        props: {
          title: [{ g: 'Simple from day one' }],
          desc: 'Get every entity organized and in good standing in a few short steps.',
          steps: [
            {
              title: 'Add each entity and the states it is in',
              desc: 'Enter each entity once. Northwind pulls its public state records and builds a full picture of what it owes and where.',
              image: { src: `${A}/peace/peace-step-1.svg` },
            },
            {
              title: 'Close the gaps',
              desc: 'Missing registrations, lapsed reports and outdated agents are flagged in order of urgency. Approve the fixes and Northwind files them with each state, then tracks every confirmation for you.',
              image: { src: `${A}/peace/peace-step-2.svg` },
            },
            {
              title: 'Stay in good standing',
              desc: 'Upcoming reports and renewals are prepared ahead of time, so you only review and approve them.',
              image: { src: `${A}/peace/peace-step-3.svg` },
            },
          ],
        },
      },
      {
        type: 'featureList',
        props: {
          variant: 'B',
          items: [
            {
              title: ['Standing is ', { g: 'just the beginning' }],
              desc: 'Each state brings its own reports, renewals and tax filings. Northwind keeps track of thousands of them automatically, so your company stays compliant.',
              list: ['Entity compliance', 'Payroll setup', 'Sales tax nexus', 'Annual filings'],
              image: { src: `${A}/marketing/feature-consolidate.svg` },
            },
          ],
        },
      },
      { type: 'bottomCta' },
    ],
  },
}
