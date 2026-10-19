/** Label → internal path for header, flyout, mobile menu and footer links. */
export const LINKS = {
  Platform: '/platform',
  Pricing: '/pricing',
  Resources: '/resources',
  About: '/about',
  'About Us': '/about',
  Blog: '/blog',
  Templates: '/platform/handbooks',
  'Learn more': '/platform',
  'Entity Management': '/platform/entity-compliance',
  'Policy Templates': '/platform/handbooks',
  'Payroll Accounts': '/platform/payroll-compliance',
  Payroll: '/platform/payroll-compliance',
  'Mail Handling': '/mail',
  Mail: '/mail',
  'Annual Report Filing': '/platform/entity-compliance',
  'Registered Agent': '/platform/entity-compliance',
  'Foreign Qualification': '/platform/tax-compliance',
  Help: '/resources',
  'Privacy Policy': '/legal/privacy-policy',
  'Terms and Conditions': '/legal/terms-of-service',
}
export const linkFor = (label) => LINKS[label] ?? '#'
