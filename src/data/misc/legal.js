/**
 * Template F documents (specs/misc.md §7, §8). ORIGINAL generic SAMPLE text written for this demo clone.
 * Nothing here is a real legal document, and none of it is taken from any company's policies.
 *
 * Block types: { p: string | [..parts] } · { h2 } · { h3 } · { ul: [] } · { ol: [] } · { hr: true }
 *              · { table: { head: [], rows: [[]] } } · { note: string } (italic sample-text notice)
 * A part is a string or { a: label, href }.
 */
const SAMPLE = 'Sample placeholder text for a demo website. This is not a legal document and creates no obligations.'

export const LEGAL_DOCS = {
  status: {
    title: 'System status',
    blocks: [
      { p: 'All Northwind services are running normally right now.' },
      { p: ['Seeing something unexpected? Write to us at ', { a: 'status@example.com', href: 'mailto:status@example.com' }] },
      { p: ['For account or billing questions, please contact ', { a: 'help@example.com', href: 'mailto:help@example.com' }] },
    ],
  },
  'gdpr-subprocessors': {
    title: 'GDPR subprocessors',
    blocks: [
      { p: 'A sample list of the vendors that process data for us.' },
      {
        table: {
          head: ['Vendor', 'Purpose'],
          rows: [
            ['Example Cloud Co.', 'Hosting and infrastructure'],
            ['Sample Mail Inc.', 'Transactional email'],
            ['Demo Files Ltd.', 'Document storage'],
            ['Placeholder Pay', 'Payment processing'],
            ['Example CRM', 'Customer support and sales CRM'],
            ['Sample Chat', 'Internal messaging'],
            ['Demo Docs', 'Internal knowledge base'],
            ['Example Scan Co.', 'Mail scanning'],
            ['Placeholder Sync', 'Payroll data integration'],
            ['Sample Flow', 'Workflow automation'],
          ],
        },
      },
    ],
  },
  'privacy-policy': {
    title: 'Privacy policy',
    blocks: [
      { note: SAMPLE },
      { p: 'This sample policy shows how a privacy page is laid out on this site. It describes, in general terms, the kinds of information a software company might collect and how it might use that information.' },
      { h2: 'Information we collect' },
      { p: 'A service like this one typically collects information you provide directly, such as your name, work email address and company details, along with information created while you use the product.' },
      { ul: ['Account details you enter when you sign up', 'Company and location information you add to your workspace', 'Usage information such as pages viewed and features used'] },
      { h2: 'How information is used' },
      { p: 'Information is used to provide and improve the service, to communicate with you about your account and to meet legal obligations.' },
      { h3: 'Sharing with service providers' },
      { p: ['Vendors that help run the service are listed on the ', { a: 'subprocessors page', href: '/legal/gdpr-subprocessors' }, '.'] },
      { h2: 'Your choices' },
      { p: 'You can update or delete your account information at any time from your settings, or by contacting the support team.' },
    ],
  },
  'terms-of-service': {
    title: 'Terms of service',
    blocks: [
      { note: SAMPLE },
      { p: 'These sample terms illustrate the structure of a terms page on this site. They are written for demonstration only.' },
      { h2: '1. Using the service' },
      { p: 'You may use the service only in line with these terms and any applicable laws. You are responsible for the activity that happens in your account.' },
      { h2: '2. Accounts' },
      { ol: ['Provide accurate information when you create an account.', 'Keep your password secure and do not share it.', 'Tell us promptly if you notice unauthorized use of your account.'] },
      { h2: '3. Fees' },
      { p: 'Paid plans are billed in advance for each billing period. Prices shown elsewhere on this demo site are placeholders.' },
      { hr: true },
      { h2: '4. Changes to these terms' },
      { p: 'Sample terms like these may be updated from time to time. The date of the latest change would normally appear at the top of the page.' },
    ],
  },
  'data-processing-agreement': {
    title: 'Data processing',
    blocks: [
      { note: SAMPLE },
      { p: 'This sample agreement page shows how a data processing addendum might be presented. It is placeholder content only.' },
      { h2: 'Scope' },
      { p: 'An addendum of this kind usually describes how a service provider processes personal data on behalf of its customers.' },
      { h2: 'Roles' },
      { ul: ['The customer decides why and how personal data is processed.', 'The provider processes personal data only on the customer’s instructions.'] },
      { h2: 'Security measures' },
      { p: 'Typical measures include encryption in transit and at rest, access controls and regular reviews of vendor practices.' },
      { h3: 'Subprocessors' },
      { p: ['A sample list of vendors appears on the ', { a: 'subprocessors page', href: '/legal/gdpr-subprocessors' }, '.'] },
    ],
  },
}

export const getLegalDoc = (slug) => LEGAL_DOCS[slug]
