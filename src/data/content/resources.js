/**
 * Resources collection (specs/content.md §0.1, §5, §6, §7).
 *
 * URL model: /resources/us/{category}/{leaf}  (category-first; there is no state hub)
 *
 * CATEGORIES[] — one record per hub page /resources/us/{slug}
 *   slug, eyebrow, title (h1 ~26 chars)
 *   rows[]          { title (~61), descriptions[1–2], topic? }  one list row per entry (secretary-of-state has 2)
 *   relatedTitle    heading of the same-category grid on leaves (~22–44 chars)
 *   relatedDesc?    handbook variant: paragraph under that heading (~65 chars)
 *
 * LEAVES[] (~1.7k guide pages) live in the LAZY module ./resourceLeaves.js (built from ./resourceSlugs.js);
 *   load them with useResources()/loadResources() from ./useResources. Hub links, /resources index links
 *   and related grids are derived from LEAVES there.
 *
 * INDEX — /resources list page: eyebrow, title, groups[] { title, descriptions[], links[] | fromCategory/topic, divider? }
 *
 * State and agency names are factual taxonomy; every paragraph is original placeholder copy.
 */
/* ------------------------------------------------------------------ categories */

export const CATEGORIES = [
  {
    slug: 'payroll',
    eyebrow: 'Resources',
    title: 'Payroll registration guides',
    rows: [
      {
        title: 'How to register for state payroll tax accounts in every state',
        descriptions: [
          'Step-by-step guides to opening withholding and unemployment insurance accounts, written for teams hiring their first employee in a new state.',
        ],
      },
    ],
    relatedTitle: 'Register for payroll tax in more states',
  },
  {
    slug: 'employee-handbook',
    eyebrow: 'Resources',
    title: 'Employee handbook guides',
    rows: [
      {
        title: 'What to include in an employee handbook for each US state',
        descriptions: ['State-by-state notes on the policies your handbook should cover.', 'Updated as new laws take effect.'],
      },
    ],
    relatedTitle: 'Handbook requirements in more states',
    relatedDesc: 'See how leave, pay and break rules differ in other states.',
  },
  {
    slug: 'secretary-of-state',
    eyebrow: 'Resources',
    title: 'Secretary of state guides',
    rows: [
      {
        topic: 'annual-report',
        title: 'How to file your annual report with the secretary of state',
        descriptions: ['Due dates, fees and filing steps for keeping each entity in good standing.'],
      },
      {
        topic: 'foreign-qualification',
        title: 'How to register as a foreign entity in another state',
        descriptions: ['What qualification involves, what it costs and when a state expects it.'],
      },
    ],
    relatedTitle: 'Secretary of state filings in more states',
  },
  {
    slug: 'sales-tax',
    eyebrow: 'Resources',
    title: 'Sales tax license guides',
    rows: [
      {
        title: 'How to apply for a sales tax license in states that collect it',
        descriptions: ['Registration steps for the states that levy a statewide sales tax.'],
      },
    ],
    relatedTitle: 'Get a sales tax license in more states',
  },
  {
    slug: 'agencies',
    eyebrow: 'Resources',
    title: 'State agency directory',
    rows: [
      {
        title: 'Directory of state and local agencies that employers deal with',
        descriptions: ['Short profiles of the agencies behind payroll, tax and business filings.'],
      },
    ],
    relatedTitle: 'More agencies',
  },
  {
    slug: 'local-payroll',
    eyebrow: 'Resources',
    title: 'Local payroll tax guides',
    rows: [
      {
        title: 'How to register for city and county payroll taxes by locality',
        descriptions: [
          'Guides for the localities that collect their own payroll taxes, grouped by state.',
          'Most are in Ohio, Kentucky and Pennsylvania.',
        ],
      },
    ],
    relatedTitle: 'Local payroll tax in other localities',
  },
]

export const categoryBySlug = (slug) => CATEGORIES.find((c) => c.slug === slug)

/* ------------------------------------------------------------------ /resources index */

export const INDEX = {
  eyebrow: 'Resources',
  title: 'Guides for Every State, Agency and Filing',
  groups: [
    {
      title: 'Weekly compliance newsletter',
      descriptions: ['A short email with the rule changes that matter to employers.'],
      links: [{ label: 'Join the newsletter', href: '/p/compliance-newsletter' }],
    },
    {
      title: 'Free compliance guides',
      descriptions: ['Longer guides from the Northwind team on hiring and growing across states.'],
      links: [
        { label: 'Multi-State Hiring Guide', href: '/p/multi-state-hiring-guide' },
        { label: 'Payroll Setup Playbook', href: '/p/payroll-setup-playbook' },
        { label: 'Remote Team Handbooks', href: '/p/remote-team-handbook-guide' },
        { label: 'Entity Upkeep Guide', href: '/p/entity-upkeep-guide' },
        { label: 'Compliance Outlook report', href: '/p/state-compliance-outlook' },
        { label: 'Agency mail handling', href: '/mail' },
        { label: 'Northwind pricing', href: '/pricing' },
      ],
    },
    {
      title: 'Payroll tax registration in every state',
      descriptions: ['Open withholding and unemployment accounts the right way, state by state.'],
      fromCategory: 'payroll',
    },
    {
      title: 'Annual report filing by state',
      descriptions: ['Keep each entity in good standing with on-time reports.'],
      fromCategory: 'secretary-of-state',
      topic: 'annual-report',
    },
    {
      title: 'Foreign qualification by state',
      descriptions: ['Register your company to do business outside its home state.'],
      fromCategory: 'secretary-of-state',
      topic: 'foreign-qualification',
    },
    {
      title: 'Sales tax licenses by state',
      descriptions: ['Apply for a permit before you start collecting sales tax.'],
      fromCategory: 'sales-tax',
    },
    {
      title: 'State agency directory',
      descriptions: ['Profiles of the agencies employers deal with most often.'],
      fromCategory: 'agencies',
    },
    {
      title: 'Employee handbook requirements',
      descriptions: ['The state policies your handbook should cover.'],
      fromCategory: 'employee-handbook',
      divider: false, // original: the last two rows render no divider
    },
    {
      title: 'Local payroll tax registration',
      descriptions: ['City and county payroll taxes, grouped by locality.'],
      fromCategory: 'local-payroll',
      divider: false,
    },
  ],
}
