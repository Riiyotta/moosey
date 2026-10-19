/**
 * Resource leaves (specs/content.md §0.1, §6, §7) — LAZY module. Load it with `loadResources()` /
 * `useResources()` from ./useResources so ~1.7k leaf records stay out of the shared content chunk.
 *
 * LEAVES[] — one record per guide page /resources/us/{category}/{slug}, expanded at runtime from the
 * generated slug taxonomy in ./resourceSlugs.js:
 *   category, slug, state (state slug | null for agencies whose state the slug does not reveal),
 *   topic? (secretary-of-state: 'annual-report' | 'foreign-qualification'), locality? (local-payroll),
 *   title (h1), linkLabel? (label in hub/index lists; defaults to the state name), date (ISO),
 *   body[] (lazy getter; same block types as blog posts; `{ cta: true }` renders this leaf's inlineCta),
 *   ctaPlacement? 'after-article' (agencies), inlineCta { title, desc, buttonLabel?, buttonHref? },
 *   sourcesTitle?, sourceLinks[] (0–1), blogPosts[3] (blog slugs for "More from the blog")
 *
 * Display names are derived from slugs (factual taxonomy). Every paragraph is original, generic
 * SAMPLE copy: no rates, fees, thresholds or deadlines are stated.
 */
import { STATES, stateBySlug } from './states'
import { AGENCIES_INFERRED, AGENCIES_PREFIXED, AGENCIES_UNPLACED, LOCAL, SALES_TAX_EXCLUDED } from './resourceSlugs'

/* ------------------------------------------------------------------ helpers */

/** FNV-1a: stable per-slug seed so the same page always gets the same copy variant / date */
function hash(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 0x01000193)
  }
  return h >>> 0
}
const pick = (seed, arr, salt = 0) => arr[(seed + salt * 7919) % arr.length]
const split = (s) => (s ? s.split('|') : [])
const sName = (s) => stateBySlug[s]?.name
const abbrOf = (s) => stateBySlug[s]?.abbr
const slugForAbbr = Object.fromEntries(STATES.map((s) => [s.abbr.toLowerCase(), s.slug]))

const SMALL = new Set(['of', 'and', 'the', 'for', 'on', 'at', 'to', 'by'])
const CODES = new Set(['oh', 'ky', 'pa', 'mi', 'wv', 'mo', 'co', 'nj', 'ny', 'or', 'dc', 'de', 'al'])
const ACRONYMS = new Set(
  'bwc cca dcced dcwp des dew dlcp does dores dua eit hab hhs ides idor iwd lara lmrc mdes ncdor nhes nysif otr rita sdat swrtb uia vatax vdacs'.split(' '),
)
const cap = (t) => (t.startsWith('mc') && t.length > 3 ? `Mc${t[2].toUpperCase()}${t.slice(3)}` : t[0].toUpperCase() + t.slice(1))

/** slug -> display name: "alabama-attorney-generals-office" -> "Alabama Attorney General's Office" */
export function nameFromSlug(slug) {
  const toks = slug.split('-')
  return toks
    .map((t, i) => {
      const next = toks[i + 1]
      if (i === toks.length - 1 && ACRONYMS.has(t)) return `(${t.toUpperCase()})`
      if (i > 0 && CODES.has(t) && (t !== 'or' || i === toks.length - 1) && (t !== 'de' || toks[i - 1] !== 'des')) return t.toUpperCase()
      if (i > 0 && SMALL.has(t)) return t
      if (t === 'st') return 'St.'
      if (t === 'workers' && next === 'compensation') return "Workers'"
      if (t.length > 3 && t.endsWith('s') && next === 'office' && !t.endsWith('ss')) return `${cap(t.slice(0, -1))}'s`
      return cap(t)
    })
    .join(' ')
}

const isoDate = (seed) => `2026-${String(1 + (seed % 9)).padStart(2, '0')}-${String(1 + ((seed >>> 5) % 28)).padStart(2, '0')}`

const step = (title, desc) => `<li><span style="font-weight:500">${title}</span><br><p style="margin-top:.5rem">${desc}</p></li>`
const SAMPLE_NOTE = '<p><em>This page is sample content for the Northwind demo site. It is a general outline, not tax or legal advice; confirm current requirements with the agency before you file.</em></p>'

/* ------------------------------------------------------------------ body templates (original placeholder copy) */

const payrollBody = (st, seed) => [
  {
    html: pick(seed, [
      `<p>If you have hired your first employee in ${st}, the state expects you to register for payroll taxes before you run payroll. Registering gives you the account numbers you need to withhold income tax and pay unemployment insurance for that employee.</p>`,
      `<p>Paying wages in ${st} for the first time usually means opening state payroll accounts before the first pay date. Those accounts let you send withheld tax and unemployment contributions to the right agencies on the right schedule.</p>`,
      `<p>Whether your first ${st} hire is local or fully remote, the state will want to know about them. This sample guide walks through the accounts most employers open and the order they tend to open them in.</p>`,
    ]),
  },
  { cta: true },
  {
    html: `<h2>How ${st} Payroll Registration Works</h2>
<p>${pick(seed, [
      `There are usually two accounts to open in ${st}: one for income tax withholding and one for unemployment insurance. You can register directly with each agency using the steps below, or let Northwind handle the filings for you.`,
      `Most employers in ${st} deal with two agencies during setup, one for withholding and one for unemployment insurance. Each issues its own account number and runs its own online portal.`,
      `Payroll setup in ${st} generally follows the same pattern as other states: a withholding account, an unemployment insurance account, and occasionally a local account depending on where employees work.`,
    ], 1)}</p>
<h3>${pick(seed, ['Employer account setup for LLCs and corporations', `What to have ready before you register in ${st}`, 'Information agencies typically ask for'], 2)}</h3>
<p>Plan to register as soon as you know you will pay wages in ${st}. You will need your federal employer identification number, your legal entity name, the date of the first payroll and a contact for tax correspondence.</p>
<ol>
${step('Create an employer login on the state tax portal', pick(seed, ['Set up a username for the online employer services portal so you can submit the registration and file returns later.', `Choose a shared login owner for the ${st} portal so filings do not depend on one person’s inbox.`], 3))}
${step('Register for a withholding account number', 'Complete the online application with your entity details. Note the account number as soon as the agency issues it.')}
${step('Register for unemployment insurance', 'Submit the unemployment insurance application and keep the rate notice the state sends you with your payroll records.')}
${step('Share both account numbers with your payroll provider', 'Add the withholding and unemployment account numbers and your assigned rate to your payroll system before the first pay date.')}
</ol>${SAMPLE_NOTE}`,
  },
]

const salesTaxBody = (st, seed) => [
  {
    html: pick(seed, [
      `<p>Businesses that sell taxable goods or services in ${st} generally need a sales tax license before they start collecting tax from customers. The license tells the state you will collect and remit sales tax on its behalf.</p>`,
      `<p>Before you charge sales tax to customers in ${st}, the state expects you to hold a permit. Registering first means every dollar you collect has an account to land in.</p>`,
      `<p>Selling into ${st}, whether from a storefront or online, can create a duty to collect sales tax. This sample guide outlines how registration usually works once you reach that point.</p>`,
    ]),
  },
  { cta: true },
  {
    html: `<h2>How to Get a ${st} Sales Tax License</h2>
<p>${pick(seed, [
      'Registration is completed online in most cases. Have your business details and an estimate of monthly sales ready before you begin.',
      `The ${st} application is usually short. Most of the work is confirming that you actually need to register and choosing a filing frequency.`,
      'Expect the application to ask about what you sell, where you sell it and when your first taxable sale happened.',
    ], 1)}</p>
<h3>What you need before applying</h3>
<p>The application asks for your entity type, federal employer identification number, business address, the date you expect to start selling and the kinds of products you sell.</p>
<ol>
${step('Confirm that you have nexus in the state', `Check whether your sales or physical presence in ${st} meets the state’s registration threshold.`)}
${step('Submit the online sales tax application', 'Complete the registration on the state revenue portal and choose the filing frequency you expect to need.')}
${step('Record your permit number and filing schedule', 'Keep the permit number with your tax records and add each return to your compliance calendar.')}
</ol>${SAMPLE_NOTE}`,
  },
]

const sosBody = (st, topic, seed) =>
  topic === 'annual-report'
    ? [
        {
          html: pick(seed, [
            `<p>Companies registered in ${st} file a periodic report with the secretary of state to confirm their officers, address and registered agent. Filing on time keeps the entity in good standing.</p>`,
            `<p>${st} asks registered entities to check in on a regular cycle. The report confirms who runs the company and where official mail should go.</p>`,
            `<p>An annual or periodic report in ${st} is mostly a confirmation exercise: you review what the state has on file and correct anything that changed.</p>`,
          ]),
        },
        { cta: true },
        {
          html: `<h2>How to File an Annual Report in ${st}</h2>
<p>The report is short and usually filed online. Most of the effort goes into confirming that your officer and agent details are current.</p>
<h3>Before you file</h3>
<p>Gather your entity number, the names and addresses of current officers or managers, and your registered agent details.</p>
<ol>
${step('Look up your entity on the state business search', 'Confirm your entity number, current status and when the state expects your next report.')}
${step('Complete the online report form', 'Review each pre-filled field, update anything that has changed and pay the filing fee.')}
${step('Save the filed copy', pick(seed, ['Download the confirmation and store it with your entity records for future reference.', `Keep the ${st} confirmation alongside your other good-standing records.`], 1))}
</ol>${SAMPLE_NOTE}`,
        },
      ]
    : [
        {
          html: pick(seed, [
            `<p>A company formed outside ${st} that does business in the state usually needs to register there as a foreign entity. Registration lets the company operate legally and keeps it able to use the state courts.</p>`,
            `<p>“Foreign” here simply means formed in another state. If your company was organized elsewhere and starts operating in ${st}, qualification is how you make that presence official.</p>`,
            `<p>Hiring, leasing space or holding inventory in ${st} can all count as doing business there. When they do, the state expects an out-of-state company to qualify.</p>`,
          ]),
        },
        { cta: true },
        {
          html: `<h2>How to Register a Foreign Entity in ${st}</h2>
<p>Foreign registration is filed with the secretary of state and typically needs a certificate of good standing from your home state.</p>
<h3>What the filing requires</h3>
<p>Expect to provide your legal name, home state, formation date, principal address, registered agent in ${st} and the names of officers or managers.</p>
<ol>
${step('Order a certificate of good standing from your home state', 'Check how recent the certificate must be before you order it.')}
${step('Appoint a registered agent in the state', `The agent needs a physical address in ${st} and must be available during business hours.`)}
${step('File the application for authority', 'Submit the form online or by mail with the filing fee and your certificate of good standing.')}
</ol>${SAMPLE_NOTE}`,
        },
      ]

const HANDBOOK_SECTIONS = [
  ['Leave Policies', ['Paid sick leave', 'Family and medical leave', 'Jury and witness duty', 'Voting time']],
  ['Pay and Hours', ['Pay frequency', 'Overtime', 'Meal and rest breaks', 'Final paychecks']],
  ['Workplace Conduct', ['Anti-harassment training', 'Reasonable accommodation', 'Lactation accommodation']],
  ['Hiring and Records', ['Background checks', 'Personnel file access', 'Required workplace notices']],
  ['Separation', ['Notice requirements', 'Benefits continuation', 'Unemployment notices']],
]
const handbookBody = (st, seed) => [
  {
    html: pick(seed, [
      `<p>Employers with staff in ${st} should make sure their handbook covers the state rules that go beyond federal law. The sections below outline the policies most handbooks include for ${st} employees.</p>`,
      `<p>A ${st} addendum keeps your core handbook readable while still covering local rules. Use the outline below as a starting checklist for the policies to review.</p>`,
      `<p>When your first employee in ${st} starts, their handbook should reflect state rules as well as company policy. This sample outline lists the topics most addenda address.</p>`,
    ]),
  },
  { cta: true },
  {
    html:
      HANDBOOK_SECTIONS.map(
        ([h2, h3s], i) =>
          `<h2>${st} ${h2}</h2>${h3s
            .map(
              (h3, j) =>
                `<h3>${h3}</h3><p>${pick(seed + i + j, [
                  `Describe how your ${h3.toLowerCase()} policy works for employees in ${st}, including who is eligible, how to make a request and how the company responds.`,
                  `Explain the ${h3.toLowerCase()} rules that apply in ${st} in plain language, and name the person employees should contact with questions.`,
                  `Summarize your ${h3.toLowerCase()} practice for ${st} staff and note where it differs from the company-wide policy.`,
                ])} Review this section whenever the state updates its rules.</p>`,
            )
            .join('')}`,
      ).join('') + SAMPLE_NOTE,
  },
]

const localKind = (name) =>
  /county/i.test(name) ? 'county' : /district/i.test(name) ? 'district' : /township/i.test(name) ? 'township' : /village/i.test(name) ? 'village' : 'city'
const localBody = (city, st, seed) => {
  const kind = localKind(city)
  const office = kind === 'city' ? 'city tax office' : `${kind} tax office`
  return [
    {
      html: pick(seed, [
        `<p>Employers with staff working in ${city}, ${st} may need to register for a local payroll tax account in addition to their state accounts. The local tax is withheld from wages and paid to the ${office} on a regular schedule.</p>`,
        `<p>${city}, ${st} is one of the localities that may collect its own payroll tax. If employees work there, plan for a local account alongside your state withholding.</p>`,
        `<p>Local payroll taxes are easy to miss because they sit below the state level. This sample guide covers how employers with staff in ${city}, ${st} typically get set up.</p>`,
      ]),
    },
    { cta: true },
    {
      html: `<h2>How ${city} Payroll Tax Registration Works</h2>
<p>${pick(seed, [
        `Registration is handled by the ${office} or an administrator acting for it. Many employers can register online and receive an account number shortly after.`,
        `Some localities administer the tax themselves and others use a collection agency. Check which applies to ${city} before you start.`,
      ], 1)}</p>
<h3>Registering as a new employer</h3>
<p>Have your federal employer identification number, state withholding account number and the first date you paid wages in ${city} ready.</p>
<ol>
${step(`Confirm which employees work in ${city}`, 'Local payroll tax usually depends on where the work is performed, so check each employee’s work address.')}
${step(`Register with the ${office}`, 'Complete the employer registration and note the filing frequency assigned to your account.')}
${step('Add the local tax to payroll', 'Set up the local withholding in your payroll system before the next pay date.')}
</ol>${SAMPLE_NOTE}`,
    },
  ]
}

const AGENCY_ROLES = [
  [/attorney|justice/, 'enforces state laws and may contact employers about wage, consumer or business conduct matters'],
  [/workers.?comp|insurance-fund|nysif/, 'oversees workers’ compensation coverage, which most employers need to carry for their staff'],
  [/labor|workforce|employment|unemployment|job|uia|ides|iwd|dua|mdes|nhes/, 'runs employer accounts for unemployment insurance and handles labor-related filings and notices'],
  [/secretary-of-state|corporation|business-filings|department-of-state|sdat|lara|dlcp/, 'maintains business entity records, including formations, foreign registrations and periodic reports'],
  [/occupational|license-fee|fiscal-court|judge|clerk/, 'administers local occupational license or payroll taxes for people who work within its boundaries'],
  [/income-tax|taxation|tax-office|tax-department|tax-division|finance|treasurer|tax-administrator|collection|eit|rita|cca/, 'collects local or state taxes and processes the related employer registrations and returns'],
  [/revenue|tax|otr|idor|dores|ncdor|vatax/, 'administers state taxes such as income tax withholding and, where it applies, sales tax'],
]
const agencyBody = (name, slug, st, seed) => {
  const role = AGENCY_ROLES.find(([re]) => re.test(slug))?.[1] ?? 'handles filings and correspondence that employers may encounter as they register and operate'
  const intro = st ? `one of the agencies in ${st} that employers may work with` : 'one of the offices employers may work with on state or local filings'
  return [
    {
      html: `<article><p>${name} is ${intro}. In general terms, it ${role}.</p><p>${pick(seed, [
        'Most interactions happen through the agency’s online portal. Keep your account numbers and login details in one shared place so the right person can respond when correspondence arrives.',
        'When a notice from this agency arrives, check the account number and response date first, then route it to whoever owns that registration on your team.',
        'Agencies like this one update forms and portals from time to time, so confirm you are using the current version before you submit anything.',
      ])}</p>${SAMPLE_NOTE}</article>`,
    },
  ]
}

/* ------------------------------------------------------------------ record builders */

const PAYROLL_CTA = {
  title: 'Zero payroll penalties, zero distractions.',
  desc: 'Northwind registers new payroll accounts automatically and tracks every filing from start to finish.',
}
const SOS_CTA = {
  title: 'Every entity in good standing, every year.',
  desc: 'Northwind tracks annual report due dates in each state and files them for you before they are late.',
}
const SALES_CTA = {
  title: 'Sales tax registration, handled for you.',
  desc: 'Northwind opens sales tax accounts in each state where you need them and keeps the permits organized.',
}
const HANDBOOK_CTA = {
  title: 'Keep every state addendum up to date.',
  desc: 'Northwind drafts handbook addenda for each state where you have employees and flags rule changes.',
  buttonLabel: 'Get started',
  buttonHref: '/platform/handbooks',
}
const AGENCY_CTA = {
  title: 'All of your agency mail in one inbox.',
  desc: 'Northwind receives, scans and routes agency notices so nothing sits unopened on a desk.',
}

const ex = (path) => `https://example.com/${path}`
/** lazy body: only built when a page actually renders the leaf */
const withBody = (rec, build) => Object.defineProperty(rec, 'body', { get: build, enumerable: true })

const payrollLeaf = (state) => {
  const slug = `${state}-payroll-tax-registration`
  const seed = hash(slug)
  return withBody(
    {
      category: 'payroll',
      slug,
      state,
      title: `${sName(state)} Payroll Tax Registration`,
      date: isoDate(seed),
      inlineCta: PAYROLL_CTA,
      sourcesTitle: `${sName(state)} payroll registration agencies`,
      sourceLinks: [{ label: `${sName(state)} state employer services portal`, href: ex(`${state}/employer-services`) }],
      blogPosts: pick(seed, [
        ['remote-hiring-across-state-lines', 'unemployment-insurance-rates-for-new-employers', 'annual-report-deadlines-explained'],
        ['first-payroll-in-a-new-state', 'withholding-vs-unemployment-accounts', 'remote-hiring-across-state-lines'],
      ]),
    },
    () => payrollBody(sName(state), seed),
  )
}

const salesLeaf = (state) => {
  const slug = `${state}-sales-tax-license`
  const seed = hash(slug)
  return withBody(
    {
      category: 'sales-tax',
      slug,
      state,
      title: `${sName(state)} Sales Tax License`,
      date: isoDate(seed),
      inlineCta: SALES_CTA,
      sourcesTitle: `${sName(state)} sales tax agencies`,
      sourceLinks: [{ label: `${sName(state)} revenue department registration`, href: ex(`${state}/sales-tax`) }],
      blogPosts: ['sales-tax-nexus-in-plain-terms', 'marketplace-sellers-and-sales-tax', 'compliance-calendar-for-small-teams'],
    },
    () => salesTaxBody(sName(state), seed),
  )
}

const sosLeaf = (state, topic) => {
  const slug = `${state}-${topic}`
  const seed = hash(slug)
  return withBody(
    {
      category: 'secretary-of-state',
      slug,
      state,
      topic,
      title: topic === 'annual-report' ? `${sName(state)} Annual Report Filing` : `${sName(state)} Foreign Qualification`,
      date: isoDate(seed),
      inlineCta: SOS_CTA,
      sourcesTitle: `${sName(state)} secretary of state resources`,
      sourceLinks: [{ label: `${sName(state)} business filings portal`, href: ex(`${state}/business-filings`) }],
      blogPosts: ['foreign-qualification-basics', 'annual-report-deadlines-explained', 'what-is-a-registered-agent'],
    },
    () => sosBody(sName(state), topic, seed),
  )
}

const handbookLeaf = (state) => {
  const slug = `${state}-employee-handbook`
  const seed = hash(slug)
  return withBody(
    {
      category: 'employee-handbook',
      slug,
      state,
      title: `${sName(state)} Employee Handbook Guide`,
      date: isoDate(seed),
      inlineCta: HANDBOOK_CTA,
      sourceLinks: [],
      blogPosts: ['employee-handbook-state-addenda', 'onboarding-remote-employees-checklist', 'responding-to-agency-notices'],
    },
    () => handbookBody(sName(state), seed),
  )
}

const agencyLeaf = (slug, state) => {
  const seed = hash(slug)
  const name = nameFromSlug(slug)
  return withBody(
    {
      category: 'agencies',
      slug,
      state,
      title: name,
      linkLabel: name,
      date: isoDate(seed),
      ctaPlacement: 'after-article',
      inlineCta: AGENCY_CTA,
      sourceLinks: [],
      blogPosts: ['responding-to-agency-notices', 'closing-a-state-payroll-account', 'what-is-a-registered-agent'],
    },
    () => agencyBody(name, slug, state ? sName(state) : null, seed),
  )
}

const localLeaf = (loc, st) => {
  const slug = `${loc}-${st}-payroll-tax-registration`
  const seed = hash(slug)
  const city = nameFromSlug(loc)
  const ST = st.toUpperCase()
  return withBody(
    {
      category: 'local-payroll',
      slug,
      state: slugForAbbr[st],
      locality: city,
      title: `${city}, ${ST} Payroll Tax Registration`,
      linkLabel: `${city}, ${ST}`,
      date: isoDate(seed),
      inlineCta: PAYROLL_CTA,
      sourcesTitle: `${city} payroll tax resources`,
      sourceLinks: [{ label: `${city} local tax office`, href: ex(`${slugForAbbr[st]}/${loc}/payroll-tax`) }],
      blogPosts: ['local-payroll-taxes-overview', 'remote-hiring-across-state-lines', 'closing-a-state-payroll-account'],
    },
    () => localBody(city, ST, seed),
  )
}

/* ------------------------------------------------------------------ leaves */

const salesExcluded = new Set(split(SALES_TAX_EXCLUDED))

export const LEAVES = [
  ...STATES.map((s) => payrollLeaf(s.slug)),
  ...STATES.map((s) => handbookLeaf(s.slug)),
  ...STATES.map((s) => sosLeaf(s.slug, 'annual-report')),
  ...STATES.map((s) => sosLeaf(s.slug, 'foreign-qualification')),
  ...STATES.filter((s) => !salesExcluded.has(s.slug)).map((s) => salesLeaf(s.slug)),
  ...Object.entries(AGENCIES_PREFIXED).flatMap(([state, tails]) => split(tails).map((t) => agencyLeaf(`${state}-${t}`, state))),
  ...Object.entries(AGENCIES_INFERRED).flatMap(([state, slugs]) => split(slugs).map((s) => agencyLeaf(s, state))),
  ...split(AGENCIES_UNPLACED).map((s) => agencyLeaf(s, null)),
  ...Object.entries(LOCAL).flatMap(([st, locs]) => split(locs).map((l) => localLeaf(l, st))),
]

const byKey = new Map(LEAVES.map((l) => [`${l.category}/${l.slug}`, l]))
export const leafBySlug = (category, slug) => byKey.get(`${category}/${slug}`)

/* ------------------------------------------------------------------ derived selectors (hubs, index, related grids) */

export const leafHref = (l) => `/resources/us/${l.category}/${l.slug}`

/** label used in hub/index link lists: explicit linkLabel, else the state name */
export const leafLabel = (l) => l.linkLabel ?? stateBySlug[l.state]?.name ?? l.title

/** sorted link list for a category (optionally one secretary-of-state topic) */
export function categoryLinks(category, topic) {
  return LEAVES.filter((l) => l.category === category && (!topic || l.topic === topic))
    .map((l) => ({ label: leafLabel(l), href: leafHref(l) }))
    .sort((a, b) => a.label.localeCompare(b.label))
}

/** /resources and hub rows -> { title, descriptions, links } */
export function resolveGroup(g) {
  return { ...g, links: g.links ?? categoryLinks(g.fromCategory, g.topic) }
}

/** stable pseudo-random order seeded by the current leaf (§7: "arbitrary order; not alphabetical") */
const shuffled = (arr, seed) =>
  arr
    .map((x) => [hash(x.slug + seed), x])
    .sort((a, b) => a[0] - b[0])
    .map((p) => p[1])

/** §7 same-category grid: 6 other leaves of the same category (+ topic) */
export function sameCategoryLeaves(leaf, n = 6) {
  const pool = LEAVES.filter((l) => l.category === leaf.category && l.topic === leaf.topic && l.slug !== leaf.slug)
  return shuffled(pool, leaf.slug).slice(0, n)
}

const RELATED_MAX = 207 // §7: the long local-payroll grid holds ~207 items

/** §7 "Agencies in {State}" grid. Agencies with no known state get alphabetical neighbours instead. */
export function agenciesInState(state, exceptSlug) {
  const all = LEAVES.filter((l) => l.category === 'agencies' && l.state === state)
  if (state) return all.filter((l) => l.slug !== exceptSlug).slice(0, RELATED_MAX)
  const i = all.findIndex((l) => l.slug === exceptSlug)
  return all.slice(Math.max(0, i - 5), i + 7).filter((l) => l.slug !== exceptSlug)
}

/** §7 local-payroll: ~12 localities in the same state, then ~207 localities elsewhere */
export function localitiesInState(leaf, n = 12) {
  const pool = LEAVES.filter((l) => l.category === 'local-payroll' && l.state === leaf.state && l.slug !== leaf.slug)
  return shuffled(pool, leaf.slug).slice(0, n)
}
export function localitiesElsewhere(leaf, n = RELATED_MAX) {
  const pool = LEAVES.filter((l) => l.category === 'local-payroll' && l.state !== leaf.state)
  return shuffled(pool, leaf.slug).slice(0, n)
}
