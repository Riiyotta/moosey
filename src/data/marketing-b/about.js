import { artUrl } from '../../components/InlineSvg'

/** /about/ — §1.17 blocks. Original placeholder copy; lengths follow the measured roles. */
export const about = {
  hero: {
    eyebrow: 'Our company',
    title: 'A calmer way to run your',
    titleGreen: 'operations',
    image: artUrl('marketing-b/about-hero.svg'),
  },
  titleWithDesc: {
    title: 'Our',
    titleGreen: 'purpose',
    desc: 'Growing companies spend far too many hours on registrations, notices and filings that nobody planned for. Northwind exists to turn that scattered work into a short, predictable routine, pairing careful software with specialists so teams can stay focused on their customers, products and the people they hire.',
  },
  story: {
    title: 'Our story',
    paragraphs: [
      'Northwind began as a side project inside a small finance team that kept missing state deadlines while the company grew. Every new hire in a new state meant another account, another login and another set of letters arriving at an old office address. The team built a simple tracker for themselves, and it quickly became the most useful tool in the building.',
      'Other operators started asking for copies. What they wanted was not another spreadsheet but a single place that knew which obligations applied to them, when each was due and who was handling it. So we rebuilt the tracker as a product and hired specialists who could do the filing work itself.',
      'Today Northwind supports companies of every size, from first hires to large teams. We are still guided by the same idea: compliance should be calm, visible and finished on time.',
    ],
  },
  trusted: {
    // ~9c + ~11c green + ~22c, 1 line on desktop
    title: ['Teams that ', { g: 'move faster' }, ' rely on Northwind daily'],
    rows: [
      ['halcyon', 'brightpath', 'corvid-labs', 'tessellate', 'orbitra', 'fernway'],
      ['kestrel', 'driftwood', 'juniper-bay', 'arcwell', 'pallaso', 'quillfield'],
    ],
  },
  careers: {
    title: 'Careers',
    desc: 'We are a small, remote-friendly team that likes clear writing, careful work and helping customers succeed.',
    jobs: [
      {
        title: 'Senior Product Engineer, Platform',
        tags: ['Engineering', 'Remote, United States only', 'Full time'],
        href: 'https://example.com/careers',
      },
      {
        title: 'Compliance Specialist, Payroll Tax',
        tags: ['Operations', 'Remote, United States only', 'Full time'],
        href: 'https://example.com/careers',
      },
    ],
    button: { label: 'View all roles', href: 'https://example.com/careers' },
  },
}
