import { useRef } from 'react'
import { useMarqueeMotion } from '../../motion/blocks'
import { artUrl } from '../InlineSvg'
import { Rich } from './primitives'

const DEFAULT_ROWS = [
  ['halcyon', 'brightpath', 'corvid-labs', 'tessellate', 'orbitra', 'fernway'],
  ['kestrel', 'driftwood', 'juniper-bay', 'arcwell', 'pallaso', 'quillfield'],
]

/**
 * Trusted-by logo marquee variants (homepage §4 + marketing §2 / §1.17d).
 *
 * Props
 *   title     Rich segments (default "Trusted by")
 *   rows      [[logoSlug × 6], [logoSlug × 6]] — slugs from /assets/art/logos/*.svg.
 *             Pass ONE row for the single-row variant (telehealth); the empty second ticker keeps its top margin,
 *             as on the original (empty `ul`, height 0).
 *   padding   'landing' = py 110u at all breakpoints (`py-1110`; payroll, tax, entity, for-hr, telehealth)
 *             'home'    = pt 80u, pb 110u / 160u / 260u (homepage, /about)
 *   fade      'white'  = bg-mask-gradient (#FCFBFA)  |  'orange' = bg-mask-gradient-orange (#F3F1EC, /about)
 *   bg        section background class (default bg-main-white; use bg-white on #F3F1EC pages)
 * Motion: row 1 moves right, row 2 left, linear, duration = ticker width / (10 | 5 mobile); never stops.
 */
export default function LogoMarquee({
  id = 'trusted',
  title = 'Trusted by',
  rows = DEFAULT_ROWS,
  padding = 'landing',
  fade = 'white',
  bg = 'bg-main-white',
}) {
  const ref = useRef(null)
  useMarqueeMotion(ref)
  const pad = padding === 'landing' ? 'py-110u' : 'pb-110u pt-80u md:pb-160u lg:pb-260u'
  const fadeBg = fade === 'orange' ? 'bg-mask-gradient-orange' : 'bg-mask-gradient'

  return (
    <section ref={ref} id={id} data-block="logo-marquee" className={`trusted-section ${bg} ${pad}`}>
      <div className="title-wrap medium-container">
        <h3 className="type-h3 text-main-green">
          <Rich value={title} />
        </h3>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="relative mt-50u w-[100vw] overflow-hidden md:mt-80u md:w-687u lg:mt-110u lg:w-1110u">
          <Row slugs={rows[0]} reverse={false} first />
          <Row slugs={rows[1] ?? []} reverse className="mt-12u lg:mt-22u" />
          <div className={`left pointer-events-none absolute -left-2u bottom-0 h-full w-30u lg:w-166u ${fadeBg}`} />
          <div className={`right pointer-events-none absolute -right-2u bottom-0 h-full w-30u scale-[-1] lg:w-166u ${fadeBg}`} />
        </div>
      </div>
    </section>
  )
}

function Row({ slugs, reverse, first, className = '' }) {
  return (
    <div className={`ticker flex w-full ${className}`} {...(first ? { 'data-bm-row': '' } : {})}>
      {slugs.length > 0 &&
        [0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? 'true' : undefined}
            className={`${reverse ? 'ticker-items-reverse' : 'ticker-items'} flex shrink-0 gap-10u pl-10u`}
          >
            {slugs.map((s) => (
              <li key={s} className="ticker-item h-60u w-127u shrink-0 lg:h-112u lg:w-234u">
                <img src={artUrl(`logos/${s}.svg`)} alt="" className="block h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        ))}
    </div>
  )
}
