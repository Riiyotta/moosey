/**
 * Blog posts collection (specs/content.md §1, §2).
 *
 * Record:
 *   slug     URL segment of /blog/:slug
 *   title    ~38–75 chars (1–2 lines)
 *   excerpt  ~50–750 chars, shown unclamped on the blog index
 *   author   author slug (src/data/content/authors.js)
 *   date     ISO date; rendered "Mon D, YYYY"
 *   image    featured image { src, alt } (640x427, 3:2). Rendered as the first body element
 *            (`<p><img>`) on the post, and as the thumbnail in "More from the blog".
 *   body     array of blocks, rendered in order inside `.article-wrapper`:
 *              { html: '<p>…</p>' }                 prose (p, h2, h3, ul, ol, table, a, strong, em, hr, blockquote)
 *              { cta: { title, desc, buttonLabel?, buttonHref? } }   in-article CTA card
 *              { form: { anchor?, heading, submitLabel, fields? } }   embedded lead form (HubSpot variant)
 *
 * BLOG_POSTS is sorted newest first (= index order). The index shows 10 per page.
 * All copy is original placeholder text for "Northwind".
 */

const img = (n, alt) => ({ src: `/assets/art/content/blog/post-${n}.svg`, alt })

/** short body helper for seed posts that only need a valid detail page */
const brief = (...paras) => [{ html: paras.map((p) => (p.startsWith('<') ? p : `<p>${p}</p>`)).join('') }]

const SEED_POSTS = [
  {
    slug: 'remote-hiring-across-state-lines',
    title: 'Remote Hiring Across State Lines: A 2026 Employer Checklist',
    excerpt:
      'Hiring someone who lives in another state is easier than ever, but the paperwork behind it has not caught up. A single remote hire can trigger a payroll tax account, an unemployment insurance account, a new handbook addendum and sometimes a foreign qualification. This checklist walks through every step in the order agencies expect it, so you can make the offer with confidence.',
    author: 'juno-thistlewood',
    date: '2026-10-08',
    image: img(1, 'Abstract illustration of documents on a desk'),
    body: [
      {
        html: `
<p>Remote work has made it normal for a ten-person company to have employees in six states. Each of those states expects to hear from you, usually before the first paycheck goes out. Missing one registration rarely causes a crisis on its own, but small gaps add up to penalties, notices and hours of cleanup.</p>
<p>The good news is that the work follows a predictable pattern. Once you know which agencies care about a new hire and in what order they want information, the process becomes a short routine instead of a scramble. This guide lays out that routine step by step.</p>
<p>By the end, you will know which accounts to open, which documents to update and where tools like <a href="/platform">Northwind</a> can take the repetitive parts off your plate.</p>
<h3>Key points</h3>
<ul>
<li>Most states require a withholding account before the first payroll run for a resident employee</li>
<li>Unemployment insurance registration is separate from withholding in nearly every state</li>
<li>Some states treat a single remote employee as "doing business" and expect a foreign qualification</li>
<li>Handbooks need state-specific addenda for leave, pay frequency and final paycheck rules</li>
</ul>
<h2>Why a Remote Hire Creates New Obligations</h2>
<p>Payroll obligations follow the employee, not the office. When someone works from their kitchen table in another state, that state's tax and labor rules generally apply to their wages, even if your company has no lease, no customers and no other staff there.</p>
<p>This surprises a lot of founders. The company may be incorporated in one state and headquartered in a second, yet a single hire pulls it into the rules of a third. The obligations are not hard to meet, but they need to be <em>noticed</em> early.</p>
<p>Here is a quick breakdown:</p>
<ul>
<li>Withholding: You collect state income tax from the employee's wages and send it to the state on a set schedule.</li>
<li>Unemployment insurance: You pay a percentage of wages into the state fund, at a rate assigned when you register.</li>
<li>Local taxes: A handful of cities and counties add their own payroll taxes on top of the state.</li>
</ul>
<p>Each of these comes with its own account number, its own portal and its own filing calendar.</p>
<h2>Which Registrations Come First?</h2>
<p>Agencies process registrations in a rough order, and some forms ask for account numbers you only receive from an earlier step. Working out of order is the most common reason a registration stalls for weeks.</p>
<p>In most states, start with the withholding account, then unemployment insurance, then any local accounts. If the state requires a foreign qualification, file it first, because the other agencies may look up your registration status with the secretary of state.</p>`,
      },
      {
        cta: {
          title: 'Register in every state without the busywork',
          desc: 'Northwind detects new remote hires, opens the right accounts and keeps every number in one place.',
          buttonLabel: 'Get started',
          buttonHref: '/pricing',
        },
      },
      {
        html: `
<h2>Typical Timelines by Account Type</h2>
<p>Processing times vary by state and by season. The ranges below reflect what operations teams usually see when filings are complete on the first try.</p>
<table>
<thead><tr><th style="text-align:left">Account</th><th style="text-align:left">Agency type</th><th style="text-align:left">Typical wait</th><th style="text-align:left">Needed before</th></tr></thead>
<tbody>
<tr><td>Withholding</td><td>State revenue department</td><td>1 to 10 business days</td><td>First payroll</td></tr>
<tr><td>Unemployment insurance</td><td>State labor department</td><td>3 to 20 business days</td><td>First quarterly report</td></tr>
<tr><td>Foreign qualification</td><td>Secretary of state</td><td>2 to 15 business days</td><td>Other registrations</td></tr>
</tbody>
</table>
<h2>A Step-by-Step Checklist</h2>
<ol>
<li>Confirm the employee's work address and whether they will work there full time.</li>
<li>Check whether the state expects a foreign qualification for your entity type.</li>
<li>Open the state withholding account and record the account number.</li>
<li>Register for unemployment insurance and note your assigned rate.</li>
<li>Add any city or county payroll accounts that apply to the address.</li>
<li>Update your handbook with the state addendum and share it with the new hire.</li>
</ol>
<p><strong>Tip:</strong> keep every account number, login and rate notice in a single shared record. When a notice arrives months later, the person who opened the account may not be the person who has to answer it.</p>
<h2>Keeping Up After the First Paycheck</h2>
<p>Registration is only the start. Each account comes with recurring filings, and rates change every year. A shared compliance calendar, reviewed monthly, catches most problems before an agency does.</p>
<p>If the employee moves, the cycle starts again in the new state, and the old accounts need to be closed properly so they stop generating notices.</p>`,
      },
      {
        cta: {
          title: 'Stay ahead of every state deadline',
          desc: 'One calendar for every filing, account and renewal across your entities, kept current automatically.',
          buttonLabel: 'See how it works',
          buttonHref: '/platform',
        },
      },
      {
        html: `
<h3>Read more from Northwind</h3>
<ul>
<li><a href="/blog/annual-report-deadlines-explained">Annual report deadlines, explained</a></li>
<li><a href="/blog/what-is-a-registered-agent">What is a registered agent and do you need one?</a></li>
<li><a href="/blog/unemployment-insurance-rates-for-new-employers">Unemployment insurance rates for new employers</a></li>
</ul>`,
      },
    ],
  },
  {
    slug: 'annual-report-deadlines-explained',
    title: 'Annual Report Deadlines, Explained',
    excerpt:
      'Every state asks registered businesses to confirm their details once a year, but no two states agree on when. Here is how annual report calendars work and how to avoid late fees.',
    author: 'pell-ambergast',
    date: '2026-09-29',
    image: img(2, 'Abstract calendar grid'),
    body: brief(
      'Annual reports confirm basic facts about your company, such as its officers and registered address. Most states charge a small fee and a larger late penalty.',
      '<h2>When are they due?</h2>',
      'Some states use the anniversary of your formation date, others use a fixed date for every company. Multi-state companies often end up with filings spread across the whole year.',
    ),
  },
  {
    slug: 'what-is-a-registered-agent',
    title: 'What Is a Registered Agent and Do You Need One?',
    excerpt: 'A registered agent receives legal and tax mail on your behalf in each state where you are registered.',
    author: 'pell-ambergast',
    date: '2026-09-17',
    image: img(6, 'Abstract government building'),
    body: brief(
      'States require every registered business to name an agent with a physical address in the state during business hours.',
      '<h2>Can you be your own agent?</h2>',
      'You can in your home state, but it rarely makes sense once you operate in more than one place.',
    ),
  },
  {
    slug: 'unemployment-insurance-rates-for-new-employers',
    title: 'Unemployment Insurance Rates for New Employers',
    excerpt:
      'New employers receive a standard unemployment insurance rate until they build a claims history. That rate differs widely by state and changes over time. This article covers how the new employer rate is set, when it changes, and what to do when a rate notice arrives.',
    author: 'juno-thistlewood',
    date: '2026-09-02',
    image: img(5, 'Abstract bar chart'),
    body: brief(
      'Each state assigns new employers a starting rate. After a few years, your own history of claims determines the rate instead.',
      '<h2>Where to find your rate</h2>',
      'Rate notices usually arrive by mail at the end of the year. Keep them with your account records so payroll can be updated on time.',
    ),
  },
  {
    slug: 'foreign-qualification-basics',
    title: 'Foreign Qualification Basics for Growing Companies',
    excerpt:
      'Foreign qualification is how a company formed in one state registers to do business in another. Whether you need it depends on what the state considers "doing business," which is rarely defined precisely. Hiring an employee, leasing space or holding inventory in a state can all count. This guide explains the common triggers, what the filing involves, and what happens if you register late, so you can make the call for each state with the facts in front of you.',
    author: 'pell-ambergast',
    date: '2026-08-21',
    image: img(3, 'Abstract map with location pins'),
    body: brief(
      'States want to know which outside companies operate within their borders. Qualification is how you tell them.',
      '<h2>Common triggers</h2>',
      'Employees, offices and warehouses are the usual triggers. Online sales alone are typically handled through sales tax rules instead.',
    ),
  },
  {
    slug: 'employee-handbook-state-addenda',
    title: 'Why Your Employee Handbook Needs State Addenda',
    excerpt:
      'A single company-wide handbook is a good start, but state rules on leave, pay timing and final paychecks vary enough that most multi-state employers add a short addendum for each state.',
    author: 'juno-thistlewood',
    date: '2026-08-06',
    image: img(4, 'Abstract form with approval stamp'),
    body: brief(
      'State addenda keep your core handbook readable while still covering the rules that differ by location.',
      '<h2>What goes in an addendum</h2>',
      'Leave entitlements, pay frequency, meal and rest breaks, and final paycheck timing are the most common sections.',
    ),
  },
  {
    slug: 'sales-tax-nexus-in-plain-terms',
    title: 'Sales Tax Nexus in Plain Terms',
    excerpt:
      'Nexus is the connection that lets a state require you to collect its sales tax. It can come from a physical presence or simply from how much you sell there. Here is how to tell when you have crossed the line.',
    author: 'northwind-editorial',
    date: '2026-07-24',
    image: img(5, 'Abstract bar chart'),
    body: brief(
      'Most states set an economic threshold based on sales revenue, transaction count or both.',
      '<h2>What to do once you have nexus</h2>',
      'Register for a sales tax permit before you start collecting, then file on the schedule the state assigns.',
    ),
  },
  {
    slug: 'closing-a-state-payroll-account',
    title: 'How to Close a State Payroll Account Properly',
    excerpt:
      'When the last employee in a state leaves, the accounts stay open until you close them, and open accounts keep expecting filings. Closing them cleanly takes a final return and a short form.',
    author: 'juno-thistlewood',
    date: '2026-07-09',
    image: img(2, 'Abstract calendar grid'),
    body: brief(
      'An unused account still generates filing obligations. Zero returns are better than missed returns, but closing is better still.',
      '<h2>The usual steps</h2>',
      'File the final withholding and unemployment returns, then submit the closure form each agency provides.',
    ),
  },
  {
    slug: 'local-payroll-taxes-overview',
    title: 'Local Payroll Taxes: Cities and Counties That Collect Their Own',
    excerpt: 'A small number of states let cities, counties or school districts levy their own payroll taxes.',
    author: 'pell-ambergast',
    date: '2026-06-25',
    image: img(3, 'Abstract map with location pins'),
    body: brief(
      'Local payroll taxes are concentrated in a handful of states, but where they exist they can apply to almost every employee.',
      '<h2>Finding the right locality</h2>',
      'The employee’s work address usually decides which local taxes apply. In some places the home address matters too.',
    ),
  },
  {
    slug: 'compliance-calendar-for-small-teams',
    title: 'Building a Compliance Calendar for a Small Team',
    excerpt:
      'A compliance calendar turns scattered due dates into a simple monthly review. This post shows how to set one up in an afternoon and keep it current without a dedicated compliance hire.',
    author: 'northwind-editorial',
    date: '2026-06-11',
    image: img(1, 'Abstract illustration of documents on a desk'),
    body: brief(
      'Start with every recurring filing you already know about, then add the ones each new state or hire brings.',
      '<h2>Review monthly</h2>',
      'A thirty-minute monthly review catches most issues long before an agency notice does.',
    ),
  },
  {
    slug: 'responding-to-agency-notices',
    title: 'Responding to Agency Notices Without Panic',
    excerpt:
      'Most agency notices are routine requests for information, not penalties. Reading them carefully and responding by the stated date resolves the large majority within a single reply.',
    author: 'juno-thistlewood',
    date: '2026-05-28',
    image: img(4, 'Abstract form with approval stamp'),
    body: brief(
      'Look for the notice date, the response deadline and the account number first. Everything else follows from those three details.',
      '<h2>Keep a record</h2>',
      'Save the notice and your reply together so the history is easy to find if the agency follows up.',
    ),
  },
  {
    slug: 'choosing-an-entity-type',
    title: 'Choosing an Entity Type When You Start Hiring',
    excerpt: 'Your entity type shapes which registrations you need as you grow. A quick comparison of the common options.',
    author: 'pell-ambergast',
    date: '2026-05-14',
    image: img(6, 'Abstract government building'),
    body: brief(
      'Corporations and LLCs follow similar registration paths, but filing fees and annual report rules can differ.',
      '<h2>When to revisit the choice</h2>',
      'Fundraising, new owners or a move to another state are all good moments to check that your structure still fits.',
    ),
  },
]

/* ------------------------------------------------------------------ phase-2 posts (fictional samples) */

const FORM_FIELDS = [
  { name: 'firstname', label: 'First name', type: 'text', required: true },
  { name: 'lastname', label: 'Last name', type: 'text', required: true },
  { name: 'email', label: 'Work email', type: 'email', required: true },
  { name: 'company', label: 'Company name', type: 'text', required: true },
]

const MORE_POSTS = [
  {
    slug: 'first-payroll-in-a-new-state',
    title: 'Running Your First Payroll in a New State',
    excerpt:
      'The first paycheck in a new state is where registration plans meet reality. This walkthrough covers the accounts to confirm, the settings to double-check in your payroll system and the questions to ask before you press run.',
    author: 'odessa-marrowfield',
    date: '2026-10-14',
    image: img(7, 'Abstract stacked coins and upward line'),
    body: [
      {
        html: `
<p>Most of the work behind a first out-of-state payroll happens weeks before the pay date. By the time you run it, the goal is simply to confirm that every account number, rate and setting is where it should be.</p>
<p>This sample checklist is written for small finance and people teams. It does not cover any one state in detail; use it as a frame and fill in the specifics from each agency.</p>
<h2>Before the Pay Date</h2>
<ul>
<li><strong>Withholding account:</strong> confirm the account is active and entered in your payroll system.</li>
<li><strong>Unemployment insurance:</strong> make sure the assigned rate from your notice matches the rate in payroll.</li>
<li><strong>Local taxes:</strong> check whether the employee’s work address falls in a locality with its own payroll tax.</li>
<li><strong>Employee forms:</strong> collect any state withholding certificate the employee needs to complete.</li>
</ul>
<h2>On the Day</h2>
<ol>
<li>Preview the payroll register and look for the new state on the employee’s line.</li>
<li>Compare the withheld amounts against your expectations; a zero is usually a setup gap.</li>
<li>Approve the run and save the register with your state records.</li>
</ol>`,
      },
      {
        cta: {
          title: 'Know every account is ready before payday',
          desc: 'Northwind checks registrations against your payroll data and flags anything missing before the first run.',
          buttonLabel: 'Get started',
          buttonHref: '/pricing',
        },
      },
      {
        html: `
<h2>After the First Run</h2>
<p>Add the new state’s returns to your compliance calendar right away. The first filing is the one most often missed, because nobody has filed it before and there is no habit to lean on yet.</p>
<h3>Read more from Northwind</h3>
<ul>
<li><a href="/blog/withholding-vs-unemployment-accounts">Withholding vs. unemployment accounts</a></li>
<li><a href="/blog/remote-hiring-across-state-lines">Remote hiring across state lines</a></li>
</ul>`,
      },
    ],
  },
  {
    slug: 'withholding-vs-unemployment-accounts',
    title: 'Withholding vs. Unemployment Accounts: What Each One Does',
    excerpt:
      'Two accounts, two agencies, two calendars. A side-by-side look at how state withholding and unemployment insurance accounts differ, and why most employers need both.',
    author: 'tobin-quayle',
    date: '2026-10-02',
    image: img(10, 'Abstract connected nodes across a grid'),
    body: [
      {
        html: `
<p>New employers often assume there is one “state payroll account.” In practice there are usually two, run by different agencies with different purposes. Knowing which is which makes notices far easier to route.</p>
<h2>A Side-by-Side Comparison</h2>
<table>
<thead><tr><th style="text-align:left">Question</th><th style="text-align:left">Withholding account</th><th style="text-align:left">Unemployment account</th></tr></thead>
<tbody>
<tr><td>Whose money is it?</td><td>The employee’s, held in trust</td><td>The employer’s own contribution</td></tr>
<tr><td>Who runs it?</td><td>Usually the revenue department</td><td>Usually the labor or workforce agency</td></tr>
<tr><td>What sets the amount?</td><td>Wages and employee elections</td><td>Wages and an assigned employer rate</td></tr>
<tr><td>What arrives by mail?</td><td>Filing reminders and notices</td><td>Rate notices and benefit claim forms</td></tr>
</tbody>
</table>
<h2>Why the Difference Matters</h2>
<ul>
<li>A rate notice belongs with the unemployment account, not the withholding one.</li>
<li>Closing one account does not close the other.</li>
<li>Each account has its own login, so plan who owns each.</li>
</ul>`,
      },
      {
        cta: {
          title: 'One place for every state account',
          desc: 'Northwind keeps account numbers, rates and portal access together for each state you operate in.',
          buttonLabel: 'See how it works',
          buttonHref: '/platform',
        },
      },
    ],
  },
  {
    slug: 'registration-readiness-scorecard',
    title: 'A Registration Readiness Scorecard for Growing Teams',
    excerpt:
      'Answer a handful of questions about where your team works and what you sell, and see which registrations deserve attention first. A short, self-guided exercise you can repeat each quarter.',
    author: 'rhea-castellane',
    date: '2026-09-23',
    image: img(9, 'Abstract checklist on a clipboard'),
    body: [
      {
        html: `
<p>Most compliance gaps are not mysteries; they are questions nobody has asked yet. This scorecard turns those questions into a quick review you can run with your team.</p>
<h2>Score Each Statement</h2>
<p>Give yourself one point for every statement that is true today:</p>
<ul>
<li>We know every state where an employee currently works.</li>
<li>Each of those states has an active withholding and unemployment account.</li>
<li>Our entity is registered in every state where we have staff or property.</li>
<li>Someone owns each agency login, and at least one other person can reach it.</li>
<li>Our handbook includes an addendum for each state with employees.</li>
<li>Every recurring filing is on a shared calendar.</li>
</ul>
<h2>Reading Your Score</h2>
<p>Five or six points means you are in good shape; keep reviewing quarterly. Three or four suggests a few gaps worth a focused afternoon. Anything lower is a sign to start with the registration list, because everything else depends on it.</p>`,
      },
      {
        form: {
          heading: 'Get the printable scorecard',
          submitLabel: 'Send it to me',
          fields: FORM_FIELDS,
        },
      },
      {
        html: `<p>Prefer to talk it through? <a href="/pricing">See how Northwind works with teams like yours</a>.</p>`,
      },
    ],
  },
  {
    slug: 'onboarding-remote-employees-checklist',
    title: 'Onboarding Remote Employees: A Compliance-First Checklist',
    excerpt:
      'Remote onboarding is mostly about tools and welcome calls, but a few compliance steps belong in the first week too. Here is a checklist that slots them in without slowing anyone down.',
    author: 'odessa-marrowfield',
    date: '2026-09-09',
    image: img(8, 'Abstract envelopes moving into an inbox tray'),
    body: [
      {
        html: `
<p>A good remote onboarding plan already covers laptops, accounts and introductions. Adding a handful of compliance steps keeps the new hire’s first paycheck, handbook and notices in order from day one.</p>
<h2>Week One Checklist</h2>
<ol>
<li><strong>Confirm the work address.</strong> It determines which state and local rules apply.</li>
<li><strong>Collect state forms.</strong> Some states have their own withholding certificate.</li>
<li><strong>Share the right handbook addendum.</strong> Include the state section with the core handbook.</li>
<li><strong>Post required notices digitally.</strong> Remote staff still need access to workplace notices.</li>
<li><strong>Record the start date</strong> for any new hire reporting the state expects.</li>
</ol>`,
      },
      {
        cta: {
          title: 'Onboard in any state with confidence',
          desc: 'Northwind tells you which registrations, notices and addenda each new hire’s location requires.',
          buttonLabel: 'Get started',
          buttonHref: '/pricing',
        },
      },
      {
        html: `
<h2>Common Gaps</h2>
<ul>
<li>Using the company’s office address instead of the employee’s home address.</li>
<li>Forgetting that a move after onboarding restarts the checklist.</li>
<li>Sharing a handbook that predates the employee’s state.</li>
</ul>
<p><em>Tip:</em> attach this checklist to your onboarding ticket template so it runs automatically.</p>`,
      },
      {
        cta: {
          title: 'Keep handbooks current in every state',
          desc: 'Get state addenda drafted and refreshed as rules change, without rewriting the whole handbook.',
          buttonLabel: 'Explore handbooks',
          buttonHref: '/platform/handbooks',
        },
      },
    ],
  },
  {
    slug: 'marketplace-sellers-and-sales-tax',
    title: 'Selling Through Marketplaces: Where Sales Tax Responsibility Lands',
    excerpt:
      'When you sell through an online marketplace, the marketplace often collects sales tax for you, but not always and not for every channel. A plain-language look at who is responsible for what.',
    author: 'tobin-quayle',
    date: '2026-08-28',
    image: img(5, 'Abstract bar chart'),
    body: [
      {
        html: `
<p>Marketplace rules changed the sales tax picture for many small sellers. In many states the marketplace now collects and remits tax on sales it facilitates. Your own website and wholesale channels, however, usually remain your responsibility.</p>
<h2>Who Typically Handles What</h2>
<table>
<thead><tr><th style="text-align:left">Channel</th><th style="text-align:left">Who usually collects</th><th style="text-align:left">What you still track</th></tr></thead>
<tbody>
<tr><td>Large online marketplace</td><td>The marketplace</td><td>Sales totals for threshold checks</td></tr>
<tr><td>Your own storefront</td><td>You</td><td>Registration, collection and returns</td></tr>
<tr><td>Wholesale to resellers</td><td>Often exempt with a certificate</td><td>Exemption certificates on file</td></tr>
</tbody>
</table>
<h2>Questions to Ask Your Accountant</h2>
<ul>
<li>Do marketplace sales count toward our registration threshold in each state?</li>
<li>Do we still need to file returns where the marketplace collects?</li>
<li>How should we store exemption certificates?</li>
</ul>`,
      },
      {
        cta: {
          title: 'Register where your sales take you',
          desc: 'Northwind opens sales tax accounts in the states where you need them and keeps permits organized.',
          buttonLabel: 'Learn more',
          buttonHref: '/platform',
        },
      },
    ],
  },
  {
    slug: 'payroll-records-retention-basics',
    title: 'Keeping Payroll Records: A Practical Approach',
    excerpt: 'How long to keep payroll records depends on the agency asking. A simple filing structure makes the answer easy to find.',
    author: 'juno-thistlewood',
    date: '2026-08-14',
    image: img(1, 'Abstract illustration of documents on a desk'),
    body: brief(
      'Federal and state agencies each set their own retention expectations, and they do not always agree. Rather than memorize them, organize records so the longest requirement is easy to meet.',
      '<h2>A folder per state, per year</h2>',
      'Store registers, returns and agency letters together by state and year. When an auditor asks, you open one folder.',
    ),
  },
  {
    slug: 'new-hire-reporting-explained',
    title: 'New Hire Reporting, Explained for First-Time Employers',
    excerpt:
      'Most states ask employers to report new hires shortly after they start. It is a quick form, but it is easy to forget when you hire in a state for the first time.',
    author: 'rhea-castellane',
    date: '2026-07-31',
    image: img(9, 'Abstract checklist on a clipboard'),
    body: brief(
      'New hire reports help states match employees to programs they administer. The form asks for basic employee and employer details.',
      '<h2>Who files it</h2>',
      'Many payroll providers file these reports automatically. Confirm that yours does for every state, not just your home state.',
    ),
  },
  {
    slug: 'moving-an-employee-to-another-state',
    title: 'When an Employee Moves States: What Changes for Payroll',
    excerpt:
      'An employee’s move can open new accounts in one state and close old ones in another. Here is the order of operations that keeps both sides clean.',
    author: 'odessa-marrowfield',
    date: '2026-07-17',
    image: img(3, 'Abstract map with location pins'),
    body: brief(
      'Treat a relocation as a new hire in the new state and a departure from the old one, at least as far as registrations go.',
      '<h2>Timing the switch</h2>',
      'Update the work address in payroll effective on the first day of work in the new location, and keep the old accounts open until final returns are filed.',
    ),
  },
  {
    slug: 'good-standing-certificates',
    title: 'Certificates of Good Standing: When You Need One',
    excerpt:
      'Banks, investors and other states sometimes ask for proof that your company is current with its filings. A certificate of good standing is that proof.',
    author: 'pell-ambergast',
    date: '2026-07-02',
    image: img(4, 'Abstract form with approval stamp'),
    body: brief(
      'A certificate of good standing confirms that the state considers your entity active and current. Most states issue them online.',
      '<h2>Common reasons to order one</h2>',
      'Foreign qualification, financing and some contracts all ask for a recent certificate. Order it close to when you need it.',
    ),
  },
  {
    slug: 'workers-compensation-for-small-teams',
    title: 'Workers’ Compensation Coverage for Small Teams',
    excerpt: 'Workers’ compensation is set at the state level, which means a remote hire can change what coverage you need.',
    author: 'tobin-quayle',
    date: '2026-06-18',
    image: img(6, 'Abstract government building'),
    body: brief(
      'Each state runs its own workers’ compensation rules. A policy written for your home state may not extend automatically to employees elsewhere.',
      '<h2>Check with your carrier</h2>',
      'When you hire in a new state, ask your carrier to confirm coverage for that state before the start date.',
    ),
  },
  {
    slug: 'reinstating-a-dissolved-entity',
    title: 'What Happens When a State Dissolves Your Company',
    excerpt:
      'Missed annual reports can lead a state to administratively dissolve an entity. Reinstatement is usually possible, and the sooner you start, the simpler it tends to be.',
    author: 'pell-ambergast',
    date: '2026-06-04',
    image: img(2, 'Abstract calendar grid'),
    body: brief(
      'Administrative dissolution is a status change, not the end of the company. It does, however, limit what the entity can do until it is fixed.',
      '<h2>Getting back in good standing</h2>',
      'Reinstatement usually means filing the missing reports, paying outstanding fees and submitting a reinstatement form.',
    ),
  },
  {
    slug: 'contractors-vs-employees-across-states',
    title: 'Contractors or Employees? How States Look at the Question',
    excerpt:
      'States apply their own tests when deciding whether someone is a contractor or an employee. A worker classified one way in one state may be viewed differently in another.',
    author: 'rhea-castellane',
    date: '2026-05-21',
    image: img(10, 'Abstract connected nodes across a grid'),
    body: brief(
      'Classification affects withholding, unemployment insurance and workers’ compensation. Getting it wrong can mean back payments later.',
      '<h2>When to ask for advice</h2>',
      'If a contractor works full time, uses company equipment and follows a set schedule, it is worth reviewing the relationship with an advisor.',
    ),
  },
  {
    slug: 'agency-portal-access-for-teams',
    title: 'Sharing Agency Portal Access Without Sharing Passwords',
    excerpt: 'Agency portals were not built for teams. A few habits make shared access safer and less fragile.',
    author: 'northwind-editorial',
    date: '2026-04-30',
    image: img(8, 'Abstract envelopes moving into an inbox tray'),
    body: brief(
      'Many portals allow one login per account. When that login lives in one person’s head, every vacation becomes a risk.',
      '<h2>Better habits</h2>',
      'Use a shared password manager, add secondary users where the portal allows and record who owns each login.',
    ),
  },
  {
    slug: 'quarterly-filing-rhythm',
    title: 'Finding a Quarterly Filing Rhythm That Sticks',
    excerpt:
      'Quarterly returns pile up at the same time every few months. A predictable routine spreads the work out and leaves room to catch mistakes.',
    author: 'odessa-marrowfield',
    date: '2026-04-16',
    image: img(7, 'Abstract stacked coins and upward line'),
    body: brief(
      'Start the quarter-end routine a week early: pull reports, reconcile totals, then file state by state.',
      '<h2>Track what you filed</h2>',
      'Save each confirmation with the quarter and state in the file name so you can answer questions later in seconds.',
    ),
  },
  {
    slug: 'paid-leave-policies-by-state',
    title: 'Paid Leave Policies: Writing One Policy for Many States',
    excerpt:
      'A single paid leave policy can work across states if it is built around the most generous requirement you face, with state addenda for the details.',
    author: 'juno-thistlewood',
    date: '2026-04-02',
    image: img(9, 'Abstract checklist on a clipboard'),
    body: brief(
      'Some employers write one generous policy that meets every state they operate in. Others keep a baseline and add state-specific rules.',
      '<h2>Choosing an approach</h2>',
      'A single policy is easier to explain; addenda are easier to keep precise. Many teams combine the two.',
    ),
  },
  {
    slug: 'registered-agent-changes',
    title: 'How to Change Your Registered Agent Without Missing Mail',
    excerpt: 'Switching registered agents is a short filing, but the handoff period is when important mail tends to go astray.',
    author: 'tobin-quayle',
    date: '2026-03-19',
    image: img(6, 'Abstract government building'),
    body: brief(
      'File the change with the secretary of state, then confirm the update appears on the public record before ending the old service.',
      '<h2>Overlap on purpose</h2>',
      'Keeping both agents active for a short overlap means nothing is lost while the state processes the change.',
    ),
  },
  {
    slug: 'year-end-compliance-review',
    title: 'A Year-End Compliance Review in Five Steps',
    excerpt:
      'The end of the year is a natural time to check registrations, close unused accounts and reset the calendar. Five steps that fit into a single afternoon.',
    author: 'rhea-castellane',
    date: '2026-02-26',
    image: img(2, 'Abstract calendar grid'),
    body: brief(
      'List every state and account, mark which are still needed and close the rest. Then confirm rates and due dates for the year ahead.',
      '<h2>Share the results</h2>',
      'Send a one-page summary to finance and people leaders so everyone starts the year with the same picture.',
    ),
  },
  {
    slug: 'opening-an-office-in-a-new-state',
    title: 'Opening a Physical Office in a New State',
    excerpt:
      'A lease in a new state usually means more than payroll accounts. Expect business registrations, local licenses and sometimes property tax filings as well.',
    author: 'odessa-marrowfield',
    date: '2026-01-29',
    image: img(3, 'Abstract map with location pins'),
    body: brief(
      'An office is one of the clearest signs of doing business in a state, so foreign qualification usually comes first.',
      '<h2>Local licenses</h2>',
      'Cities and counties may require their own business licenses. Check with the local government before you move in.',
    ),
  },
]

export const BLOG_POSTS = [...SEED_POSTS, ...MORE_POSTS].sort((a, b) => b.date.localeCompare(a.date))

export const postBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug)
