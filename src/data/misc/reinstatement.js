/** /reinstatement — Template D (specs/misc.md §5). Sample placeholder copy, original to this clone. */
const A = '/assets/art'

export const reinstatement = {
  hero: {
    eyebrow: 'Reinstate', // ~9 ch
    title: 'Restore your good standing, fast', // ~32 ch, one line, no green span
    description: 'Forfeited or inactive? Northwind prepares and files the reinstatement for you.',
  },
  benefits: {
    title: ['Get ', { g: 'reinstated fast' }],
    desc: 'A specialist reviews your status, clears the blockers and files with the state on your behalf.',
    cards: [
      {
        value: 'Status review in one day',
        desc: 'We check your standing and list every missing report, fee and tax filing.',
        icon: { src: `${A}/marketing/benefit-pictogram-1.svg`, alt: '' },
      },
      {
        value: 'Overdue filings handled',
        desc: 'Late annual reports and franchise taxes are prepared for your approval.',
        icon: { src: `${A}/marketing/benefit-pictogram-2.svg`, alt: '' },
      },
      {
        value: 'Current from then on',
        desc: 'Once reinstated, Northwind tracks every future deadline for you.',
        icon: { src: `${A}/marketing/benefit-pictogram-3.svg`, alt: '' },
      },
    ],
  },
  feature: {
    title: 'How reinstatement works',
    desc: 'Most reinstatements need the same three steps. Northwind handles each one and keeps you updated until the state confirms.',
    pairs: [
      {
        title: 'Find what is missing',
        desc: 'We pull your record from the state and list every report, payment and form needed to reinstate your company.',
      },
      {
        title: 'Clear the outstanding items',
        desc: 'Overdue reports are prepared, back fees are calculated and tax clearance is requested on your behalf, in the right order.',
      },
      {
        title: 'File and confirm',
        desc: 'We submit the reinstatement and send your certificate of good standing as soon as the state approves the application.',
      },
    ],
    image: { src: `${A}/marketing/feature-payroll-feature.svg`, alt: '' },
  },
  cta: {
    title: 'Keep your company in good standing all year',
    desc: 'Northwind tracks annual reports, franchise taxes and registered agent mail, so a lapse like this does not happen again.',
  },
}
