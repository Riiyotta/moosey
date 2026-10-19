/**
 * §2 post header: `.title-wrap` (centered) with h1 (h3 token) and the byline figure.
 * §7 leaves: pass `narrow` (464u on desktop -> titles wrap to 2 lines) and no author (date only).
 */
export function Byline({ author, date, linkAuthor = true, className = 'mt-16u' }) {
  return (
    <figure className={`flex items-center justify-center gap-8u ${className}`}>
      {author && (
        <div className="icon-wrap h-23u w-23u shrink-0 overflow-hidden rounded-6u md:h-26u md:w-26u">
          {/* PLACEHOLDER avatar 80x80, 1:1, cover */}
          <img src={author.avatar} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <figcaption className="type-p2 flex gap-16u text-main-green">
        {author &&
          (linkAuthor ? (
            <a href={`/authors/${author.slug}`} className="text-main-green hover:underline">
              {author.name}
            </a>
          ) : (
            <span className="text-main-green">{author.name}</span>
          ))}
        {author && <span className="text-green/70">|</span>}
        <span className="text-main-green/70">{date}</span>
      </figcaption>
    </figure>
  )
}

export default function PostHeader({ title, author, date, narrow = false }) {
  return (
    <div className={`title-wrap mx-auto w-272u text-center md:w-464u ${narrow ? '' : 'lg:w-1020u'}`}>
      <h1 className="type-h3 text-main-green">{title}</h1>
      <Byline author={author} date={date} />
    </div>
  )
}
