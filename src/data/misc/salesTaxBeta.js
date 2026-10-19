/** /sales-tax-beta — Template A′ (specs/misc.md §2.10). Sample placeholder copy, original to this clone. */
import { featureRows } from './legacyContent'

const s = (name) => `/assets/art/misc/screens/${name}.svg`

export const salesTaxBeta = {
  hero: {
    containerMax: '4xl',
    lockup: null, // A′ has no co-brand lockup
    title: 'Sales tax permits, simplified',
    sub: ['Register for a sales tax permit in every state you sell in,', 'without the paperwork or the guesswork.'],
    subWeight: 400,
    cta: { label: 'Join the beta' },
  },
  intro: {
    title: 'Automate sales tax registration',
    subtitle:
      'Apply for a sales tax permit in a few clicks with Northwind. Works alongside the sales tax calculation and filing tools your team already uses.',
  },
  rows: {
    // row 1: 800×600 form screenshot, renders 971×728 at 1440 (3 items → 728px row)
    form: {
      title: 'Register for sales tax in minutes',
      lead: 'Answer one short questionnaire and Northwind prepares the permit application for each state.',
      items: [
        { icon: 'receipt', title: 'One form', desc: 'Enter your business details once. Northwind maps them to each state application and fills in the rest.' },
        { icon: 'globe', title: 'Every state that needs a permit', desc: 'See where your sales create an obligation and register only in the states where you need to.' },
        { icon: 'flag', title: 'Track every application', desc: 'Follow each application from submission to approval and get your permit numbers in one place.' },
      ],
      image: { src: s('sales-tax-form'), alt: 'Sample app screen: sales tax registration form (placeholder)', w: 800, h: 600 },
    },
    // row 2: integrations image left, text right
    providers: {
      title: 'Works with your tools',
      lead: 'Send permit numbers straight to the sales tax calculation and filing provider you already use, without copying anything by hand.',
      items: featureRows.payroll.items,
      image: featureRows.payroll.image,
    },
    // row 3: inbox screenshot (874×616 at 1440)
    mail: featureRows.mail,
  },
  everything: {
    eyebrow: null, // A′ checklist has no eyebrow
    title: 'Everything you need to stay compliant',
    lead: 'One platform for sales tax permits, payroll accounts and annual filings.',
    // same 8-item checklist as Template A
  },
  modal: {
    title: 'Request beta access',
    emailLabel: 'Email address',
    emailPlaceholder: 'Work email address',
    companyLabel: 'Company name',
    companyPlaceholder: 'Company name',
    submit: 'Submit',
    emailError: 'Please use your work email address. Personal email domains such as Gmail or Yahoo cannot be accepted.',
    formError: 'Please fill in both fields and try again.',
    successTitle: 'Request sent',
    successBody: 'Thanks! We will email you when your beta access is ready.',
    successClose: 'Close',
  },
}
