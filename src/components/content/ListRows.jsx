import { ArrowHookIcon } from './Icons'

/** §1 `.list-posts`: 272/704/1101u; pt 60/80/80, pb 32/54/54, row gap 32/54/54 */
export function ListPosts({ children }) {
  return (
    <div className="list-posts flex w-272u flex-col gap-32u pb-32u pt-60u md:w-704u md:gap-54u md:pb-54u md:pt-80u lg:w-1101u">
      {children}
    </div>
  )
}

/**
 * §1/§5 row: `.article-wrap` > article (title column + summary column) + 1u divider.
 * `divider={false}` reproduces the two resources rows that render none.
 */
export function ListRow({ title, descriptions, children, summaryClassName = 'gap-16u md:gap-32u', divider = true }) {
  return (
    <div className="article-wrap flex flex-col">
      <article className="flex flex-col gap-16u pb-32u md:flex-row md:justify-between md:gap-0 md:pb-54u">
        <div className="title-wrap md:w-249u lg:w-318u">
          <h2 className="type-h5 text-main-green">{title}</h2>
          {descriptions?.map((d) => (
            // pt-4 = 16px (13.1u at 390)
            <p key={d} className="type-p2 pt-[16px] text-main-green/70">
              {d}
            </p>
          ))}
        </div>
        <div className={`summary-wrap flex flex-col md:w-339u lg:w-530u ${summaryClassName}`}>{children}</div>
      </article>
      {divider && <div className="divider h-1u w-full bg-beige" />}
    </div>
  )
}

/** §1 "Read more" `.btn.btn-arrow` */
export function ArrowLinkButton({ href, label = 'Read more' }) {
  return (
    <a className="ct-btn ct-btn-arrow" href={href}>
      <span className="text-button-large text-main-green">{label}</span>
      <ArrowHookIcon />
    </a>
  )
}

/** §5 link list: N × ul > li.list-none > a > h3.text-lg (18/28px, weight 400, #000, " »"); space-y-3 */
export function LinkList({ links }) {
  return links.map((l) => (
    <ul key={l.href}>
      <li className="list-none p-0">
        <a href={l.href}>
          <h3 className="font-normal text-[18px] leading-[28px] text-black">{l.label} »</h3>
        </a>
      </li>
    </ul>
  ))
}
