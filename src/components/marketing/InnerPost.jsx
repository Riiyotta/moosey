import { Fragment, useEffect, useRef } from 'react'
import '../../styles/marketing.css'

/**
 * §1.18 InnerPost — long-form rich-text template (`section#inner-post`, /security/).
 * `blocks`: [{ type: 'h2', id, text } | { type: 'p', content } | { type: 'ul', items: [content] } | { type: 'hr' }]
 * where `content` is a string or an array of strings and { text, href } links.
 */
export default function InnerPost({ title, blocks }) {
  const articleRef = useRef(null)
  useNewsletterPrompt(articleRef)

  return (
    <section id="inner-post" className="inner-post">
      <div className="bg-white pb-110u pt-120u md:pt-179u lg:pt-174u">
        <div className="title-wrap mx-auto w-272u text-center md:w-464u lg:w-1020u">
          <h1 className="type-h3 text-main-green">{title}</h1>
        </div>
        <div className="article-wrapper">
          <article ref={articleRef}>
            {blocks.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>
        </div>
      </div>
    </section>
  )
}

function Block({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 id={block.id}>{block.text}</h2>
    case 'p':
      return (
        <p>
          <Inline content={block.content} />
        </p>
      )
    case 'ul':
      return (
        <ul>
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline content={item} />
            </li>
          ))}
        </ul>
      )
    case 'hr':
      return <hr />
    default:
      return null
  }
}

function Inline({ content }) {
  const parts = Array.isArray(content) ? content : [content]
  return parts.map((part, i) =>
    typeof part === 'string' ? <Fragment key={i}>{part}</Fragment> : <a key={i} href={part.href}>{part.text}</a>,
  )
}

/**
 * Original behaviour: once the reader has scrolled to >=75% of the article AND 15s have passed, call
 * window.openNewsletterModal() if it exists. It is undefined on /security/, so this is effectively a no-op.
 */
function useNewsletterPrompt(articleRef) {
  useEffect(() => {
    let timeUp = false
    let scrolled = false
    let fired = false
    const tryOpen = () => {
      if (fired || !timeUp || !scrolled) return
      fired = true
      if (typeof window.openNewsletterModal === 'function') window.openNewsletterModal()
    }
    const onScroll = () => {
      const el = articleRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const read = (window.innerHeight - r.top) / r.height
      if (read >= 0.75) {
        scrolled = true
        tryOpen()
      }
    }
    const timer = setTimeout(() => {
      timeUp = true
      tryOpen()
    }, 15000)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [articleRef])
}
