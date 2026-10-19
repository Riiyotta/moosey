/**
 * Authors collection (specs/content.md §3, §4).
 * Record: { slug, name, avatar (80x80 1:1), photo (600x600 1:1), bio, socialLink?{label, href} }
 * An author's article list is derived from blogPosts.js (posts whose `author` === slug).
 * All names are fictional placeholders for the "Northwind" brand.
 */
export const AUTHORS = [
  {
    slug: 'juno-thistlewood',
    name: 'Juno Thistlewood',
    avatar: '/assets/art/avatars/avatar-1.svg',
    photo: '/assets/art/avatars/avatar-1.svg',
    bio: 'Juno leads the compliance research desk at Northwind, translating new state rules into plain checklists for operations teams. Before that she spent years untangling multi-state payroll setups for growing companies.',
    socialLink: { label: 'Follow Juno on her professional profile', href: 'https://example.com/juno-thistlewood' },
  },
  {
    slug: 'pell-ambergast',
    name: 'Pell Ambergast',
    avatar: '/assets/art/avatars/avatar-4.svg',
    photo: '/assets/art/avatars/avatar-4.svg',
    bio: 'Pell writes about entity management, annual reports and the quiet deadlines that trip up small finance teams. He has helped hundreds of founders register in new states without losing a week to paperwork.',
  },
  {
    slug: 'odessa-marrowfield',
    name: 'Odessa Marrowfield',
    avatar: '/assets/art/avatars/avatar-2.svg',
    photo: '/assets/art/avatars/avatar-2.svg',
    bio: 'Odessa covers payroll operations for Northwind, with a focus on the first weeks of hiring in a new state. She previously ran payroll for a distributed team spread across a dozen states.',
    socialLink: { label: 'Connect with Odessa on her profile', href: 'https://example.com/odessa-marrowfield' },
  },
  {
    slug: 'tobin-quayle',
    name: 'Tobin Quayle',
    avatar: '/assets/art/avatars/avatar-3.svg',
    photo: '/assets/art/avatars/avatar-3.svg',
    bio: 'Tobin writes about tax accounts, agency portals and sales tax registration. He likes turning dense agency instructions into short, practical checklists that a busy team can follow.',
  },
  {
    slug: 'rhea-castellane',
    name: 'Rhea Castellane',
    avatar: '/assets/art/avatars/avatar-5.svg',
    photo: '/assets/art/avatars/avatar-5.svg',
    bio: 'Rhea focuses on people operations topics such as onboarding, worker classification and leave policies. She helps teams build compliance habits that survive rapid growth.',
  },
  {
    slug: 'northwind-editorial',
    name: 'Northwind Editorial',
    avatar: '/assets/art/avatars/avatar-6.svg',
    photo: '/assets/art/avatars/avatar-6.svg',
    bio: 'The Northwind editorial team reviews every guide on this site for accuracy and clarity, and keeps older articles current as agencies change their forms, fees and filing portals.',
  },
]

export const authorBySlug = (slug) => AUTHORS.find((a) => a.slug === slug)
