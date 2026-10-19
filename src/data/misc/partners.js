/**
 * Partner landing records for /partners/:partner (specs/misc.md §0, §2, §3, §4). FICTIONAL partners only.
 *
 * Every record: { slug, template: 'A' | 'B' | 'C', name, noindex: true, ... }
 * - template 'A' (legacy kit, §2):  variant 'A1' | 'A2' | 'A3' (§2.12), signupHref, hero, intro, pricing, about
 *     (feature bands, checklist and plan bodies come from legacyContent.js and are shared by every A record)
 * - template 'B' (static partner, §3): hero { eyebrow, title, titleAccent, description } — the partner is named only
 *     in the eyebrow and h1; features / getStarted copy (shared by all B records) in staticPartnerContent.js
 * - template 'C' (platform partner, §4): variant 'C1' | 'C2', hero (+ button), intro row (C1) or trusted strip +
 *     lead form (C2), featureGroup, faq, genericCta — see platformPartnerContent.js
 */
import { aboutLogoGroups, testimonials } from './legacyContent'

const logo = (name) => `/assets/art/misc/logos/${name}.svg`
const signup = (code) => `/pricing?partner=${code}` // partner-specific signup code (4 links on the original)

export const PARTNERS = {
  // ---------------------------------------------------------------- Template A1 (§2.12 Gusto column)
  'brightpath-payroll': {
    slug: 'brightpath-payroll',
    template: 'A',
    variant: 'A1',
    name: 'Brightpath Payroll',
    noindex: true,
    signupHref: signup('brightpath10'),
    hero: {
      containerMax: '3xl', // A1 768; A2/A3 896
      lockup: {
        style: 'inline', // A1 inline-flex · A2 'grid' · A3 'block'
        separator: '×',
        partnerLogo: logo('brightpath-light'),
        partnerAlt: 'Brightpath Payroll (fictional)',
      },
      title: 'The simple way to stay compliant in every state',
      sub: [
        'Northwind and Brightpath Payroll teamed up to make multi-state employment simple.',
        'We track the rules in every state so your team never has to.',
      ],
      subWeight: 500,
      cta: { label: 'Get started — 10% off', href: signup('brightpath10') },
    },
    intro: {
      title: 'Automation with experts behind it',
      subtitle:
        'Northwind works alongside seasoned attorneys and accountants so your team does not have to. Save hours every month on research, filings and fees.',
    },
    workflowCard: { cardBg: '#F3F1EC', firstBg: '#F3F4F6' }, // A2 transparent/#F3F4F6 · A3 transparent/#F3F1EC80
    pricing: {
      logo: { src: logo('brightpath-rose'), alt: 'Brightpath Payroll (fictional)', w: 125, h: 48 }, // A2 128×45 · A3 none
      eyebrow: 'Partner offer',
      title: 'Brightpath customers save 10%',
      lead: 'Pick the plan that fits your multi-state needs. From hiring your first employee to running a complex enterprise, Northwind has you covered.',
    },
    about: {
      title: 'Trusted by teams growing everywhere',
      logoGroups: aboutLogoGroups,
      testimonials,
      wrapperPad: true, // A1 only: testimonial wrapper py-12
    },
  },

  // ---------------------------------------------------------------- Template A2 (§2.12 Deel column)
  'tidewater-hr': {
    slug: 'tidewater-hr',
    template: 'A',
    variant: 'A2',
    name: 'Tidewater HR',
    noindex: true,
    signupHref: signup('tidewater10'),
    hero: {
      containerMax: '4xl',
      lockup: { style: 'grid', separator: '+', partnerLogo: logo('tidewater-light'), partnerAlt: 'Tidewater HR (fictional)' },
      title: 'Hire in any state, minus the compliance work',
      sub: [
        'Tidewater HR and Northwind team up so global companies can hire in the US.',
        'We handle the state rules so your team does not have to.',
      ],
      subWeight: 500,
      cta: { label: 'Get started — 10% off', href: signup('tidewater10') },
    },
    intro: {
      title: 'Specialists and software, together',
      subtitle:
        'Northwind pairs experienced compliance specialists with automation, so every filing is checked by a person and tracked by the platform from start to finish.',
    },
    workflowCard: { cardBg: 'transparent', firstBg: '#F3F4F6' },
    pricing: {
      logo: { src: logo('tidewater-rose'), alt: 'Tidewater HR (fictional)', w: 128, h: 45 },
      eyebrow: 'Partner pricing',
      title: 'Tidewater customers save 10%',
      lead: 'Choose the plan that fits how many states you operate in. From your first US hire to a large distributed team, Northwind scales with your company.',
    },
    about: { title: 'Trusted by teams growing everywhere', logoGroups: aboutLogoGroups, testimonials, wrapperPad: false },
  },
  // ---------------------------------------------------------------- Template A3 (§2.12 Peopletech column)
  'kitebird-people': {
    slug: 'kitebird-people',
    template: 'A',
    variant: 'A3',
    name: 'Kitebird People',
    noindex: true,
    signupHref: signup('kitebird10'),
    hero: {
      containerMax: '4xl',
      lockup: { style: 'block', separator: '+', partnerLogo: logo('kitebird-light'), partnerAlt: 'Kitebird People (fictional)' },
      title: 'Stay compliant everywhere with Kitebird People',
      sub: [
        'Kitebird People and Northwind keep you compliant wherever your team works.',
        'We handle the research and filings so you can focus on people.',
      ],
      subWeight: 500,
      cta: { label: 'Get started — 10% off', href: signup('kitebird10') },
    },
    intro: {
      title: 'Automation with experts behind it',
      subtitle:
        'Northwind combines a compliance platform with real specialists, so registrations, filings and notices are handled correctly in every state you hire in.',
    },
    workflowCard: { cardBg: 'transparent', firstBg: '#F3F1EC80' },
    pricing: {
      logo: null, // A3: no pricing logo (the empty mb-20 slot stays)
      eyebrow: 'Partner offer',
      title: 'Kitebird clients save 10%',
      lead: 'Pick the plan that matches your multi-state footprint. From a first remote hire to a complex enterprise, Northwind keeps every location compliant.',
    },
    about: { title: 'Trusted by teams growing everywhere', logoGroups: aboutLogoGroups, testimonials, wrapperPad: false },
  },

  // ---------------------------------------------------------------- Template B (§3, /remote/ and 5 clones)
  // (B records share all sections except the hero; h1 lengths vary ~38–56 ch like the six originals)
  'halcyon-hr': {
    slug: 'halcyon-hr',
    template: 'B',
    name: 'Halcyon HR',
    noindex: true,
    hero: {
      eyebrow: 'Halcyon HR',
      title: { lead: 'Compliance made easy for Halcyon ', accent: 'members' },
      description: 'Northwind keeps registrations, filings and agency mail on track in every state, so your team can focus on people.',
    },
  },
  'larkspur-legal': {
    slug: 'larkspur-legal',
    template: 'B',
    name: 'Larkspur Legal',
    noindex: true,
    hero: {
      eyebrow: 'Larkspur',
      title: { lead: 'Larkspur clients stay compliant with ', accent: 'ease.' },
      description: 'Northwind handles state registrations and annual filings for growing companies advised by Larkspur Legal.',
    },
  },
  'ashgrove-equity': {
    slug: 'ashgrove-equity',
    template: 'B',
    name: 'Ashgrove Equity',
    noindex: true,
    hero: {
      eyebrow: 'Ashgrove',
      title: { lead: 'Ashgrove portfolio teams get compliance ', accent: 'sorted.' },
      description: 'Registrations, annual filings and agency notices for every Ashgrove company, tracked in one shared workspace.',
    },
  },
  'meadowbrook-fractional': {
    slug: 'meadowbrook-fractional',
    template: 'B',
    name: 'Meadowbrook Fractional',
    noindex: true,
    hero: {
      eyebrow: 'Meadowbrook',
      title: { lead: 'Meadowbrook’s fractional HR clients can now hand off state ', accent: 'filings' },
      description: 'A Northwind specialist handles the registrations, renewals and agency mail for each client.',
    },
  },
  'thistle-learning': {
    slug: 'thistle-learning',
    template: 'B',
    name: 'Thistle Learning',
    noindex: true,
    hero: {
      eyebrow: 'Thistle',
      title: { lead: 'Thistle customers, meet easy ', accent: 'compliance' },
      description: 'Train your team with Thistle and let Northwind keep your state registrations, filings and agency mail current.',
    },
  },
  'copperleaf-benefits': {
    slug: 'copperleaf-benefits',
    template: 'B',
    name: 'Copperleaf Benefits',
    noindex: true,
    hero: {
      eyebrow: 'Copperleaf',
      title: { lead: 'Copperleaf teams stay compliant, ', accent: 'always' },
      description: 'Benefits through Copperleaf, state compliance through Northwind. Registrations and filings handled in every state.',
    },
  },

  // ---------------------------------------------------------------- Template C1 (§4, stripe-atlas column)
  'juniper-launch': {
    slug: 'juniper-launch',
    template: 'C',
    variant: 'C1',
    name: 'Juniper Launch',
    noindex: true,
    hero: {
      eyebrow: '', // C1: empty eyebrow span (0×0)
      title: { lead: 'Stay compliant from day one with ', accent: 'Juniper Launch' }, // forced <br> at every width
      description: 'Northwind helps new companies register, file and stay in good standing in every state.',
      button: { label: 'Get started', href: signup('juniperlaunch') },
    },
    intro: {
      title: ['Compliance that ', { g: 'grows with you' }],
      desc: 'Incorporating is only the first step. As soon as you hire, open an office or sell in a new state, new registrations and filings follow. Northwind tracks each one, prepares the paperwork and reminds you before anything is due.',
    },
  },
  // ---------------------------------------------------------------- Template C2 (§4, stripe-startups column)
  'juniper-startups': {
    slug: 'juniper-startups',
    template: 'C',
    variant: 'C2',
    name: 'Juniper Startups',
    noindex: true,
    hero: {
      eyebrow: 'Juniper',
      title: { lead: 'Compliance for startups backed by ', accent: 'Juniper' },
      description: 'Juniper portfolio companies get Northwind for registrations, filings and mail in every state.',
      button: { label: 'Get started', href: signup('junipervc') },
    },
    trustedTitle: 'Trusted by',
  },
}

export const getPartner = (slug) => PARTNERS[slug]
