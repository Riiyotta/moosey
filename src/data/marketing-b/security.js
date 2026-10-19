/** /security/ — InnerPost (§1.18). Original generic placeholder prose; lengths follow the measured roles. */
export const security = {
  title: 'Northwind security',
  blocks: [
    { type: 'h2', id: 'overview', text: 'Overview' },
    {
      type: 'ul',
      items: [
        'Customer data is encrypted in transit with current TLS and at rest using industry-standard AES-256.',
        'Production systems run in isolated cloud environments, and staff access is granted by role, reviewed every quarter and revoked as soon as it is unneeded.',
        'Every change to the platform is peer reviewed, tested automatically and shipped through a tracked pipeline, with change logs retained for later audits.',
      ],
    },
    { type: 'h2', id: 'vulnerability-reporting', text: 'Vulnerability reporting' },
    {
      type: 'p',
      content: [
        'If you believe you have found a security issue in any Northwind product or service, please write to our team at ',
        { text: 'trust@example.com', href: 'mailto:trust@example.com' },
        ' with the details.',
      ],
    },
    {
      type: 'p',
      content:
        'We ask that you give us reasonable time to investigate and fix an issue before sharing it publicly, that you avoid accessing or changing data that is not yours, and that you act in good faith so other customers can keep using the service normally.',
    },
    { type: 'p', content: 'Please include the following in your report:' },
    { type: 'ul', items: ['A description of the issue found', 'Severity', 'Steps to reproduce the problem'] },
    { type: 'p', content: 'We confirm every report within two business days and share progress.' },
  ],
}
