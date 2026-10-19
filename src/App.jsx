import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Outlet, useLocation, useNavigate } from 'react-router-dom'
import Banner from './components/Banner'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import { ROUTES } from './routes'

// one lazily loaded module per template (src/pages/<Template>.jsx)
const pages = import.meta.glob('./pages/*.jsx')
const lazyPage = (name) => lazy(pages[`./pages/${name}.jsx`])
const PAGES = Object.fromEntries(ROUTES.map((r) => [r.page, lazyPage(r.page)]))
const NotFound = lazyPage('NotFound')

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

/** Route plain internal <a href="/..."> clicks through the router (no full reload) */
function useInternalLinks() {
  const navigate = useNavigate()
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const a = e.target.closest('a[href^="/"]')
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return
      e.preventDefault()
      navigate(a.getAttribute('href'))
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate])
}

function Layout() {
  useInternalLinks()
  // the announcement banner exists only on the homepage (specs/marketing.md)
  const isHome = useLocation().pathname === '/'
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      {isHome && <Banner />}
      <Navbar />
      {/* flex-1: short pages keep the footer at the viewport bottom, as on the original */}
      <main id="content" className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-main-white" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        {ROUTES.map(({ path, page }) => {
          const Page = PAGES[page]
          return <Route key={path} path={path} element={<Page />} />
        })}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
