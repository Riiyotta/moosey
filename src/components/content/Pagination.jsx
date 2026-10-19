import { PageArrowIcon } from './Icons'

const pad = (n) => String(n).padStart(2, '0')

/** §1 pagination: "NN/TT" counter + prev/next `.btn-circle` (disabled = bare div at opacity .2) */
export default function Pagination({ current, total, hrefFor }) {
  const btn = (dir, target) => {
    const enabled = target >= 1 && target <= total
    const cls = `ct-btn ct-btn-circle ${enabled ? 'enabled' : 'disabled is-disabled'}`
    const icon = <PageArrowIcon dir={dir} />
    return enabled ? (
      <a href={hrefFor(target)} aria-label={dir === 'prev' ? 'Previous page' : 'Next page'}>
        <div className={cls}>{icon}</div>
      </a>
    ) : (
      <div className={cls} aria-hidden="true">
        {icon}
      </div>
    )
  }
  return (
    // outer wrapper: list width, pb 110 (mobile) / 40
    <div className="w-272u pb-110u md:w-704u md:pb-40u lg:w-1101u">
      <div className="pagination-wrap flex items-end justify-between">
        <div className="pagination-position">
          <span className="type-h5 text-main-green">
            {pad(current)}/{pad(total)}
          </span>
        </div>
        <div className="pagination flex gap-10u">
          {btn('prev', current - 1)}
          {btn('next', current + 1)}
        </div>
      </div>
    </div>
  )
}
