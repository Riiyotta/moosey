import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { linkFor } from '../links'
import InlineSvg, { art, artUrl } from './InlineSvg'
import { LinkArrow } from './shared'
import { useMobileMenu } from '../motion/menu'

const NAV = ['Platform', 'Pricing', 'Resources', 'About', 'Blog']
const NEW_LABEL = 'Templates'

const FLYOUT_ITEMS = [
  { title: 'Entity Management', desc: 'Keep every registration and filing date in sync.', icon: [24, 20], art: 'entities' },
  { title: 'Policy Templates', desc: 'Draft, review and publish policies for each state.', icon: [24, 20], art: 'tax', isNew: true },
  { title: 'Payroll Accounts', desc: 'Open and maintain tax accounts without the busywork.', icon: [24, 20], art: 'payroll' },
  { title: 'Mail Handling', desc: 'Receive, scan and route official notices to the right owner on your team.', icon: [26, 26], art: 'mail' },
]

/** §2 Header (fixed pill, desktop nav + click-open Platform flyout) and §2 mobile/tablet menu */
export default function Navbar() {
  const [flyoutOpen, setFlyoutOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const platformItemRef = useRef(null)
  const menuRef = useRef(null)
  // open/close tween (src/motion/menu.js)
  useMobileMenu(menuRef, headerRef, menuOpen)

  // Flyout: click toggles, click outside closes (§2)
  useEffect(() => {
    if (!flyoutOpen) return
    const onDown = (e) => {
      if (!platformItemRef.current?.contains(e.target)) setFlyoutOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [flyoutOpen])

  // navigating (menu link, logo, browser back) closes the menu and flyout
  const { pathname } = useLocation()
  useEffect(() => {
    setMenuOpen(false)
    setFlyoutOpen(false)
  }, [pathname])

  // body overflow lock while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const toggleMenu = () => setMenuOpen((o) => !o)

  return (
    <>
      <header
        id="header"
        ref={headerRef}
        className={`header fixed left-0 z-100 flex w-full top-[calc(var(--u)*5_+_var(--banner-height))] md:top-[calc(var(--u)*24_+_var(--banner-height))] ${
          menuOpen ? 'mobile-menu__open' : ''
        }`}
      >
        <div
          className={`header-container relative mx-auto flex w-304u items-center justify-between rounded-12u py-8u pl-15u pr-8u transition-all duration-400 md:w-704u md:p-8u md:pl-12u lg:w-1302u lg:pl-19u ${
            menuOpen ? 'bg-menu-dark' : 'bg-white'
          }`}
        >
          <div className="header-wrap__left flex items-center">
            <a
              href="/"
              aria-label="Northwind home"
              className={`header-logo__wrap flex h-fit w-48u items-center transition-all duration-400 md:w-53u lg:mr-25u lg:w-74u ${
                menuOpen ? 'text-menu-logo' : 'text-green'
              }`}
            >
              {/* one SVG; fill/stroke crossfade to #EFEFEF over .4s when the menu opens (src/motion/motion.css) */}
              <InlineSvg
                svg={art('brand/northwind-logo.svg')}
                uid="header-logo"
                className="block aspect-[4/1] h-full w-full"
              />
            </a>

            <nav className="header-nav__wrap hidden lg:flex">
              <ul className="header-nav__list flex items-center">
                {NAV.map((label, i) => (
                  <li key={label} ref={i === 0 ? platformItemRef : undefined} className="header-nav__item relative mr-7u flex">
                    {i === 0 && <Flyout open={flyoutOpen} />}
                    <a
                      href={linkFor(label)}
                      id={i === 0 ? 'header-nav-platform' : undefined}
                      aria-expanded={i === 0 ? flyoutOpen : undefined}
                      onClick={
                        i === 0
                          ? (e) => {
                              e.preventDefault()
                              setFlyoutOpen((o) => !o)
                            }
                          : undefined
                      }
                      className="header-nav__link type-nav block rounded-6u p-6u text-nav-grey transition-all duration-400 hover:bg-beige hover:text-main-green"
                    >
                      {label}
                    </a>
                    <div className="divider absolute -right-4u top-6u h-16u w-px bg-nav-grey" />
                  </li>
                ))}
                <li className="header-nav__item relative mr-7u flex">
                  <a
                    href={linkFor(NEW_LABEL)}
                    className="header-nav__link type-nav flex items-center gap-x-2 rounded-6u p-6u text-nav-grey transition-all duration-400 hover:bg-beige hover:text-main-green"
                  >
                    <span className="rounded-full bg-green px-2 py-1 text-xs font-medium text-white">New</span>
                    <span>{NEW_LABEL}</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="header-wrap__right">
            <div className="header-btn__wrap flex items-center">
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={toggleMenu}
                className={`header-burger relative ml-8u block h-28u w-28u rounded-8u transition-all duration-400 md:h-31u md:w-31u lg:hidden ${
                  menuOpen ? 'active bg-black' : 'bg-beige'
                }`}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/tablet menu (≤1024). Closed state in index.css; open/close tween in src/motion/menu.js. */}
      <div
        id="mobile-menu"
        ref={menuRef}
        data-mobile-menu
        className={`mobile-menu fixed left-0 top-0 z-99 flex h-[86%] w-full md:h-auto lg:hidden ${menuOpen ? 'is-open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="menu-wrap relative mx-auto flex w-304u flex-col justify-between rounded-14u bg-menu-dark p-24u md:w-704u md:flex-row-reverse">
          <nav className="menu-nav flex md:w-256u">
            <ul className="menu-nav__list flex w-full flex-col items-center">
              {NAV.map((label) => (
                <li key={label} className="menu-nav__item relative mb-18u flex w-full items-center">
                  <a href={linkFor(label)} className="menu-nav__link type-nav block w-full text-white/60">
                    {label}
                  </a>
                  <div className="arrow pointer-events-none absolute right-0 h-16u w-16u">
                    <LinkArrow className="stroke-white opacity-60" />
                  </div>
                </li>
              ))}
              <li className="menu-nav__item relative mb-18u flex w-full items-center">
                <a href={linkFor(NEW_LABEL)} className="menu-nav__link type-nav flex w-full gap-x-2 text-white/60">
                  <span className="self-center rounded-full bg-white/60 px-2 py-1 text-xs font-medium tracking-normal text-black">
                    New
                  </span>
                  {NEW_LABEL}
                </a>
                <div className="arrow pointer-events-none absolute right-0 h-16u w-16u">
                  <LinkArrow className="stroke-white opacity-60" />
                </div>
              </li>
            </ul>
          </nav>
          <div className="menu-foot__wrap flex flex-col md:w-256u">
            <p className="type-p4 text-white/70">
              Northwind keeps your entity filings, tax accounts and deadlines in one place, ready when you are.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

/** §2 Platform flyout — fixed px panel (768px, radius 24px) */
function Flyout({ open }) {
  return (
    <div id="header-nav-platform-flyout" className={`relative ${open ? '' : 'hidden'}`}>
      <div className="absolute z-10 mt-40u flex w-screen max-w-max px-4">
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-main-white text-sm leading-6 shadow-flyout lg:max-w-3xl">
          <div className="p-8">
            <div className="flex items-center gap-x-3">
              <h3 className="type-h6 text-main-green">One workspace for all compliance obligations</h3>
            </div>
            <p className="type-p2 mt-2 text-main-green/70">
              Northwind keeps registrations, filings, payroll accounts and deadlines organized for every location, so
              your team always knows what is due, what is done and what needs attention.
            </p>
            <a href={linkFor('Learn more')} className="type-p2 mt-2 text-green underline hover:text-main-green/70">
              Learn more
            </a>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-1 bg-white/50 p-4 py-6 lg:grid-cols-2">
            {FLYOUT_ITEMS.map((item) => (
              <div key={item.title} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-white">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-main-white group-hover:bg-white">
                  <div style={{ width: item.icon[0], height: item.icon[1] }}>
                    <img src={artUrl(`header/flyout-${item.art}.svg`)} alt="" className="block h-full w-full object-contain" />
                  </div>
                </div>
                <div>
                  <a href={linkFor(item.title)} className={`type-p1 text-main-green ${item.isNew ? 'flex items-center gap-x-2' : ''}`}>
                    {item.isNew && <span className="rounded-full bg-green px-2 py-1 text-xs text-white">New</span>}
                    {item.isNew ? <span>{item.title}</span> : item.title}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="type-p2 mt-1 text-main-green/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
