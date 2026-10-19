import { artUrl } from '../../components/InlineSvg'

/**
 * /solutions/for-hr/ content (spec §2.4). Original Northwind placeholder copy, lengths matched to the measured
 * roles (chars noted per field). Shared-block props are mapped in src/pages/solutionDetailConfig.js.
 */
export const forHr = {
  hero: {
    eyebrow: 'For HR', // 6c
    title: 'Hire in any state with', // 36c total, 13–14c green, 1 line @1440
    titleGreen: 'less paperwork',
    desc: 'Register, withhold and report correctly wherever your people live, without a spreadsheet of state portals.', // ~100c
  },
  trustedTitle: 'Trusted by people teams across the US', // 36c
  problems: {
    title: 'Remote hiring adds hidden work', // 31c
    desc: 'Each new state brings its own accounts, notices and deadlines, and nearly all of them land on the people team.', // 100c
    items: [
      {
        title: 'Registrations before payday', // 20–38c
        desc: 'Withholding and unemployment accounts must exist before the first paycheck, and every state follows its own timeline.', // 116c
      },
      {
        title: 'Notices sent to old addresses',
        desc: 'Agency letters arrive at outdated office mailboxes and sit unread until a penalty notice shows up.', // 86c
      },
      {
        title: 'Posters, handbooks and policies',
        desc: 'Required workplace notices and handbook sections change every year by state and city, and remote employees still need to receive their copies.', // 147c
      },
      {
        title: 'Rate changes nobody tracks',
        desc: 'Unemployment and local tax rates are updated every year, and a single unnoticed change can quietly turn into balances owed months later.', // 136c
      },
    ],
  },
  cards: {
    title: 'Everything HR needs', // 16c
    titleGreen: 'for multi-state teams', // 24c
    desc: 'Northwind keeps every registration, rate and agency letter for your workforce in a single place, so people teams can hire in a new state with confidence instead of a checklist of portals.', // 171c
    items: [
      {
        icon: 'map',
        title: 'Coverage across all 50 states', // 28c
        desc: 'See exactly which accounts each state requires for your team, then open every missing one in a few clicks without leaving the dashboard.', // 118c
      },
      {
        icon: 'people',
        title: 'Hiring alerts by location',
        desc: 'Whenever someone is hired in a new state, Northwind flags the registrations, notices and policies that follow from that single hire.', // 120c
      },
      {
        icon: 'calendar',
        title: 'One calendar of due dates',
        desc: 'Annual reports, renewals and rate notices all appear on one shared calendar, each with an owner and reminders well ahead of time.', // 121c
      },
      {
        icon: 'shield',
        title: 'Specialists who file for you',
        desc: 'Our team prepares and submits each filing on your behalf, then saves every confirmation and account number to the shared record.', // 120c
      },
      {
        icon: 'document',
        title: 'Handbooks kept current',
        desc: 'State and city policy updates are drafted for you and shared with employees as the rules change.', // 88c
      },
      {
        icon: 'bell',
        title: 'Agency mail read the same day',
        desc: 'Government letters are scanned on arrival, summarized in plain words and routed to the right owner on your team.', // 111c
      },
    ],
  },
  benefits: {
    title: 'Give your people team', // 36c with <br>, 14c green
    titleGreen: 'its hours back',
    desc: 'Most of the state work behind each new hire is repetitive and easy to miss. Northwind takes it off your list so the team can focus on its people.', // 133c
    cards: [
      { value: '3x faster setup in new states', desc: 'Withholding and unemployment accounts for a new state are opened in days instead of weeks, so new employees are paid correctly from the first run.' }, // 31c / 155c
      { value: 'All agency mail read same day', desc: 'Every agency letter is captured, summarized and assigned on the day it arrives, so the people team always knows what came in, what it means and who will take care of it next.' },
      { value: 'One shared record for every team', desc: 'Accounts, rates, logins and filings for every state live in one organized place that HR, finance and payroll leaders can all review together whenever they need to.' },
    ],
  },
  featureGroup: {
    title: 'Every state account and notice in one view', // 1 line desktop, 2 mobile
    desc: 'Northwind gathers registrations, tax rates, logins and agency mail for each state where you employ people, so the team always knows what is open, what is due and who owns it.', // 173c
    items: [
      { title: 'Open new state accounts', desc: 'Tell us where someone was hired and we register the required withholding and unemployment accounts.' }, // 26c / 113c
      { title: 'Keep tax rates up to date', desc: 'Annual rate notices are captured automatically and shared with your payroll provider before they apply.' },
      { title: 'Route every agency letter', desc: 'Mail is scanned on arrival, summarized and assigned to the right owner with a next step.' },
    ],
  },
  cta: {
    title: 'See where your team stands in every state', // 39c, 2 lines
    desc: 'Connect your payroll provider to see every registration, account and filing that applies to your company, sorted by state, owner and the next due date.', // 163c
  },
  resources: {
    title: 'Guides for growing HR teams', // 29c
    desc: 'Practical, plain-language guides that help people teams plan their hiring, payroll and compliance work across many states at once.', // 122c
    items: [
      {
        title: 'The multi-state hiring guide for HR leads', // 39c
        desc: 'A step-by-step plan for hiring in a new state, covering registrations, withholding, required notices and the right timing of each task before the first payroll runs.', // 153c
        cta: 'Read the hiring guide', // 19c
        href: '/p/hiring-guide',
        cover: artUrl('marketing-b/guide-cover-1.svg'),
      },
      {
        title: 'Choosing an employment model',
        desc: 'Compare running your own payroll, working with an employer of record and using a professional employer organization, with the trade-offs of each one.', // 160c
        cta: 'Read the model guide',
        href: '/p/employment-model-guide',
        cover: artUrl('marketing-b/guide-cover-2.svg'),
      },
      {
        title: 'The fifty-state payroll compliance guide', // 41c
        desc: 'State-by-state notes on withholding accounts, unemployment insurance, local taxes and filing frequencies, kept current by our compliance team.', // 153c
        cta: 'Read the payroll handbook', // 26c
        href: '/p/payroll-handbook',
        cover: artUrl('marketing-b/guide-cover-3.svg'),
      },
    ],
  },
  getStarted: {
    title: 'Getting started', // 15c, all green
    desc: 'Setup takes an afternoon. Connect payroll, confirm where your people work and let our specialists take care of the state work from there on.', // 141c
    steps: [
      { title: 'Connect your payroll system', desc: 'Link your payroll provider in a few clicks so Northwind can see where every employee lives and works today.' }, // 26c / 130c
      { title: 'Review your full state-by-state plan', desc: 'We list every registration, rate and filing that applies to your team and highlight anything overdue.' },
      { title: 'Hand off the work', desc: 'Specialists open accounts, file on time and route agency mail, while you follow progress on the dashboard.' },
    ],
  },
  faq: {
    title: 'Questions HR teams often ask', // 26c, no green
    items: [
      {
        q: 'Do you work with our current payroll tool?', // 41c
        a: 'Yes. Northwind connects to the most common payroll providers and reads employee locations, pay dates and tax setup. If your provider is not supported yet, you can upload a simple file and our team will keep it in sync with you.', // 216c
      },
      {
        q: 'Who files the state registrations?',
        a: 'Our specialists prepare and submit each registration for you and store the confirmation and account numbers once the state issues them.', // 143c
      },
      {
        q: 'What happens when we hire someone in a new state?', // 50c
        a: 'Northwind flags the new location, lists the accounts and notices required, and starts the registrations before the first paycheck.', // 134c
      },
      {
        q: 'Can finance and payroll see the same data?',
        a: 'Yes. Invite teammates from finance, payroll or legal with the access they need. Everyone works from one record of accounts, rates and filings, so there is no need to pass spreadsheets around.', // 200c
      },
    ],
  },
}
