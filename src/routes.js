/**
 * Route → template map. Each template is one file in src/pages/ and renders sample
 * placeholder data from src/data/. Paths mirror the original site's URL structure.
 */
export const ROUTES = [
  // product / marketing
  { path: 'platform', page: 'Platform' },
  { path: 'platform/:product', page: 'PlatformProduct' }, // handbooks, entity-compliance, payroll-compliance, tax-compliance
  { path: 'solutions', page: 'Solutions' },
  { path: 'solutions/:solution', page: 'SolutionDetail' }, // for-hr, smb, for-telehealth
  { path: 'pricing', page: 'PricingPage' },
  { path: 'about', page: 'About' },
  { path: 'security', page: 'Security' },
  // content
  { path: 'blog', page: 'BlogIndex' },
  { path: 'blog/page/:page', page: 'BlogIndex' },
  { path: 'blog/:slug', page: 'BlogPost' },
  { path: 'authors', page: 'Authors' },
  { path: 'authors/:author', page: 'AuthorDetail' },
  { path: 'resources', page: 'Resources' },
  { path: 'resources/us/:category', page: 'ResourceCategory' }, // payroll, employee-handbook, secretary-of-state, sales-tax, agencies, local-payroll
  { path: 'resources/us/:category/:leaf', page: 'ResourceGuide' },
  { path: 'p/:guide', page: 'GuideLanding' },
  { path: 'subscribe', page: 'Subscribe' }, // "Thanks" page
  // partners, legal, misc (specs/misc.md)
  { path: 'partners/:partner', page: 'PartnerLanding' }, // templates A (old-style), B (static), C (platform partner); fictional partner slugs
  { path: 'legal/:doc', page: 'Legal' }, // prose template F: privacy-policy, terms-of-service, data-processing-agreement, gdpr-subprocessors
  { path: 'status', page: 'Legal' }, // prose template F
  { path: 'reinstatement', page: 'Reinstatement' }, // template D (original: /texas-reinstatement/)
  { path: 'sales-tax-beta', page: 'SalesTaxBeta' }, // template A′
  { path: 'mail', page: 'MailPage' }, // template E (original: /agency-mail/)
]
