import '../styles/misc.css'
import { useDocTitle } from '../components/misc/useNoindex'

/**
 * 404 — no spec covers a real 404 design (specs/misc.md §9: the original's /404/ is a broken stub and unknown
 * paths fall through to Netlify's default card). Built from Template F's shell (§7): title + one paragraph.
 */
export default function NotFound() {
  useDocTitle('Page not found · Northwind')
  return (
    <section id="inner-post" className="inner-post" data-template="404">
      <div className="bg-white pb-110u pt-120u md:pt-179u lg:pt-174u">
        <div className="title-wrap mx-auto w-272u text-center md:w-464u lg:w-1020u">
          <h1 className="type-h3 text-main-green">Page not found</h1>
        </div>
        <div className="article-wrapper mx-auto w-272u md:w-522u lg:w-596u">
          <article className="misc-prose text-center">
            <p>
              The page you were looking for has moved or no longer exists. Head back to the <a href="/">homepage</a>.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
