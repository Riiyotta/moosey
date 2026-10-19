import { Fragment } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import '../styles/misc.css'
import { getLegalDoc } from '../data/misc/legal'
import { useDocTitle } from '../components/misc/useNoindex'
import NotFound from './NotFound'

/**
 * /legal/:doc and /status — Template F inner-post prose page (specs/misc.md §7). No reveal animation.
 * (The original's three legal routes redirect to PDFs, §8; per the spec's recommendation they reuse F here.)
 */
function Parts({ parts }) {
  const list = Array.isArray(parts) ? parts : [parts]
  return list.map((part, i) =>
    typeof part === 'string' ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <a key={i} href={part.href}>
        {part.a}
      </a>
    ),
  )
}

function Block({ b }) {
  if (b.p) return <p>{<Parts parts={b.p} />}</p>
  if (b.note)
    return (
      <p>
        <em>{b.note}</em>
      </p>
    )
  if (b.h2) return <h2>{b.h2}</h2>
  if (b.h3) return <h3>{b.h3}</h3>
  if (b.hr) return <hr />
  if (b.ul)
    return (
      // §7: no bullets for a single item; disc outside + pl 40u for 2+
      <ul className={b.ul.length > 1 ? 'is-list' : ''}>
        {b.ul.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ul>
    )
  if (b.ol)
    return (
      <ol>
        {b.ol.map((li) => (
          <li key={li}>{li}</li>
        ))}
      </ol>
    )
  if (b.table)
    return (
      <table>
        <thead>
          <tr>
            {b.table.head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {b.table.rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  return null
}

export default function Legal() {
  const { doc } = useParams()
  const { pathname } = useLocation()
  const slug = doc ?? (pathname.replace(/\/+$/, '') === '/status' ? 'status' : null)
  const page = slug ? getLegalDoc(slug) : null
  useDocTitle(page ? `${page.title} · Northwind` : null)
  if (!page) return <NotFound />

  return (
    <section id="inner-post" className="inner-post" data-template="F" data-doc={slug}>
      <div className="bg-white pb-110u pt-120u md:pt-179u lg:pt-174u">
        <div className="title-wrap mx-auto w-272u text-center md:w-464u lg:w-1020u">
          <h1 className="type-h3 text-main-green">{page.title}</h1>
        </div>
        <div className="article-wrapper mx-auto w-272u md:w-522u lg:w-596u">
          <article className="misc-prose">
            {page.blocks.map((b, i) => (
              <Block key={i} b={b} />
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}
