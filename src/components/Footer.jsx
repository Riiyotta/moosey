import InlineSvg, { art } from './InlineSvg'
import { LinkArrow } from './shared'
import { linkFor } from '../links'

const COLUMNS = [
  {
    heading: 'Solutions',
    links: ['Entity Management', 'Payroll', 'Mail', 'Annual Report Filing', 'Registered Agent', 'Foreign Qualification'],
  },
  { heading: 'Company', links: ['About Us', 'Blog', 'Help'] },
]

/** §15 Footer — desktop 3-column nav; tablet/mobile stacked with arrows */
export default function Footer() {
  return (
    <footer className="footer relative bg-green">
      {/* edge line art, desktop only; rises above the footer into the CTA (right file is pre-mirrored) */}
      <div className="liner-wrap absolute bottom-0 left-0 hidden h-full w-full lg:block" aria-hidden="true">
        <InlineSvg svg={art('footer/footer-line-left.svg')} uid="footer-line-left" className="line-left absolute bottom-0 left-0 w-84u" />
        <InlineSvg svg={art('footer/footer-line-right.svg')} uid="footer-line-right" className="line-right absolute bottom-0 right-0 w-84u" />
      </div>

      <div className="medium-container">
        <div className="footer-desktop-wrap pt-12 lg:flex lg:flex-row lg:border-b lg:border-solid lg:border-main-white/20 lg:pb-17u">
          <div className="footer-header__block flex flex-col border-b border-solid border-main-white/20 py-24u lg:w-179u lg:border-none lg:pt-33u">
            {/* white wordmark 4:1 */}
            <a href="/" aria-label="Northwind home" className="header-logo__wrap mb-8u flex h-fit w-51u items-center text-white md:h-24u md:w-53u lg:h-fit lg:w-82u">
              <InlineSvg svg={art('brand/northwind-logo-white.svg')} uid="footer-logo" className="block aspect-[4/1] h-full w-full" />
            </a>
            <span className="text-p2-m text-white/70 lg:text-white/40">Compliance software for busy teams.</span>
          </div>

          <nav className="footer-nav__wrap lg:flex-grow">
            <ul className="footer-nav__list flex flex-col lg:flex-row lg:justify-end">
              {COLUMNS.map((col, ci) => (
                <li
                  key={col.heading}
                  className={`footer-nav__part relative flex border-b border-solid border-main-white/20 py-24u lg:flex-col lg:border-none ${
                    ci > 0 ? 'lg:ml-107u' : ''
                  }`}
                >
                  <span className="mb-24u hidden text-nav-large-d text-white lg:block">{col.heading}</span>
                  <ul className="footer-nav__part-list flex w-full flex-col">
                    {col.links.map((label, li) => (
                      <li
                        key={label}
                        className={`footer-nav__part-item relative flex w-full items-center ${
                          ci === 1 && li === col.links.length - 1 ? '' : 'pb-24u'
                        }`}
                      >
                        <a href={linkFor(label)} className="footer-nav__link type-nav block w-full text-white lg:text-white/40 lg:transition lg:hover:text-white">
                          {label}
                        </a>
                        <div className="arrow pointer-events-none absolute right-0 top-0 h-16u w-16u lg:hidden">
                          <LinkArrow />
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="footer-nav__part relative hidden flex-col py-24u lg:ml-107u lg:flex">
                <span className="mb-24u hidden text-nav-large-d text-white lg:block">Stay connected</span>
                <Social />
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-foot py-24u md:pb-40u lg:flex lg:justify-between lg:py-40u">
          <div className="copy-wrap mb-24u flex justify-between">
            <span className="type-nav text-white/40">© 2026 Northwind Inc</span>
            <Social className="lg:hidden" />
          </div>
          <div className="privacy-wrap md:flex">
            {['Privacy Policy', 'Terms and Conditions'].map((label) => (
              <a
                key={label}
                href={linkFor(label)}
                className="type-nav mb-22u block text-white/40 md:mb-0 md:mr-22u lg:transition lg:hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/** REDRAW / PLACEHOLDER: two generic social glyphs (24u) */
function Social({ className = '' }) {
  return (
    <div className={`social-wrap flex ${className}`}>
      {['Social profile one', 'Social profile two'].map((label, i) => (
        <a key={label} href="#" aria-label={label} className="social-icon mr-12u block h-24u w-24u">
          <svg viewBox="0 0 25 25" fill="none" className="block h-full w-full">
            <circle cx="12.5" cy="12.5" r="11.5" className="stroke-white" strokeWidth="1" />
            {i === 0 ? (
              <path d="M8.5 8.5l8 8M16.5 8.5l-8 8" className="stroke-white" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <rect x="8.5" y="8.5" width="8" height="8" rx="2" className="stroke-white" strokeWidth="1.5" />
            )}
          </svg>
        </a>
      ))}
    </div>
  )
}
