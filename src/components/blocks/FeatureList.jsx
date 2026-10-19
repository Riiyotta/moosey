import { useRef } from 'react'
import { useFeatureListMotion } from '../../motion/blocks'
import { CheckIcon, Rich } from './primitives'

/**
 * §1.4 FeatureList — `section#features-section.features-section`.
 *
 * variant 'A': .small-container (1020/688/272u), multi-item `ul.features-list` with md+ dividers; per-item reveal
 *              (text y 50u, rows y 10u stagger 5f, image scale .98) on `top+=25% bottom`, once.
 * variant 'B': .medium-container, py 42u, single block, no `.feature-item` wrapper — static (no motion, as original).
 *
 * items: [{
 *   title: Rich segments (e.g. [{ g: 'Streamline' }, ' being compliant']),
 *   desc,
 *   list?:  ['label', ...]                       — check rows (h6 green)
 *   pairs?: [{ title, desc }, ...]               — handbooks variant: title row + description row
 *   image: { src, alt? },                         — 1404x910, object-cover, radius 12px (lg) / 7px
 *   button?: { label, href }                      — B only (telehealth): a.btn.btn-red under the list
 * }]
 * keepLastPadding  (A only, default false) keep the last item's padding-bottom (60u / 60u / 80u) — handbooks' and
 *                  misc template D's single item. `trimLast={false}` is an equivalent alias.
 */
export default function FeatureList({ variant = 'A', id = 'features-section', items, trimLast = true, keepLastPadding = false }) {
  const trim = trimLast && !keepLastPadding
  const ref = useRef(null)
  useFeatureListMotion(ref, { enabled: variant === 'A' })

  if (variant === 'B') {
    const item = items[0]
    return (
      <section ref={ref} id={id} data-block="feature-list-b" className="features-section bg-main-white py-42u">
        <div className="medium-container">
          <FeatureBody item={item} />
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id={id} data-block="feature-list-a" className="features-section bg-main-white">
      <div className="small-container">
        <ul className="features-list md:divide-y md:divide-green/20">
          {items.map((item) => (
            <li
              key={item.desc}
              data-fl-item
              className={`feature-item pb-60u md:py-60u lg:py-80u ${trim ? 'last:pb-0 md:last:pb-0 lg:last:pb-0' : ''}`}
            >
              <FeatureBody item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function FeatureBody({ item }) {
  return (
    <>
      <div data-fl-text className="text-block flex flex-col pb-24u md:flex-row md:justify-between md:pb-42u lg:pb-85u">
        <h5 className="type-h5 mb-24u text-main-green lg:mb-0">
          <Rich value={item.title} />
        </h5>
        <p className="type-p2 text-main-green/70 md:w-332u lg:w-424u">{item.desc}</p>
      </div>
      <div className="list-block flex flex-col md:flex-row md:justify-between">
        <div className="list-col">
          {item.pairs ? (
            <ul className="list md:mr-25u lg:w-293u">
              {item.pairs.flatMap((pair) => [
                <li key={`${pair.title}-t`} data-fl-row className="flex items-center pb-8u md:pb-12u lg:pb-20u">
                  <CheckIcon />
                  <h6 className="type-h6 ml-12u text-green">{pair.title}</h6>
                </li>,
                <li key={`${pair.title}-d`} data-fl-row className="pb-24u">
                  <p className="type-p2 text-main-green/70">{pair.desc}</p>
                </li>,
              ])}
            </ul>
          ) : (
            <ul className="list">
              {item.list.map((label) => (
                <li key={label} data-fl-row className="flex items-center pb-24u">
                  <CheckIcon />
                  <h6 className="type-h6 ml-12u text-green">{label}</h6>
                </li>
              ))}
            </ul>
          )}
          {item.button && (
            <div className="btn-wrap mt-24u flex">
              <a href={item.button.href ?? '/'} className="btn btn-red type-button-large mr-6u">
                {item.button.label}
              </a>
            </div>
          )}
        </div>
        <img
          data-fl-img
          src={item.image.src}
          alt={item.image.alt ?? ''}
          loading="lazy"
          className="h-178u w-full shrink-0 rounded-[7px] object-cover md:h-273u md:w-421u lg:h-455u lg:w-702u lg:rounded-[12px]"
        />
      </div>
    </>
  )
}
