import { useRef } from 'react'
import { useFeatureListMotion } from '../../motion/blocks'
import { CheckIcon, LineArt, Rich } from './primitives'

/**
 * §1.6 Engine — `section#engine-section` (/platform only): centered header + numbered feature list.
 * Props: title (Rich, 1 line desktop/tablet), desc (~106c), items: [{ title, desc, list: [3 labels], image: { src } }]
 * Motion: per item, same timeline as FeatureList A with trigger `top bottom-=25%`, once.
 */
export default function Engine({ id = 'engine-section', title, desc, items }) {
  const ref = useRef(null)
  useFeatureListMotion(ref, { start: 'top bottom-=25%' })

  return (
    <section ref={ref} id={id} data-block="engine" className="engine-section relative bg-main-white">
      <div className="hidden md:block" aria-hidden="true">
        <LineArt size="engine" className="absolute -left-83u top-36u h-198u w-210u lg:left-0 lg:top-180u" />
        <LineArt size="engine" className="absolute -right-83u top-36u h-198u w-210u -scale-x-100 lg:right-0 lg:top-180u" />
      </div>
      <div className="medium-container flex flex-col items-center pb-77u pt-70u md:pb-113u md:pt-121u lg:pb-139u lg:pt-263u">
        <div className="text-block mb-74u flex w-226u flex-col items-center text-center md:mb-160u md:w-375u lg:mb-165u lg:w-auto">
          <h1 className="type-h3 mb-11u text-main-green md:mb-16u">
            <Rich value={title} />
          </h1>
          <p className="type-p2 w-full text-main-green/70 lg:w-405u">{desc}</p>
        </div>
        <ul className="features-list w-full divide-y divide-green/20">
          {items.map((item, i) => (
            <li
              key={item.title}
              data-fl-item
              className={`feature-item pb-16u md:pb-40u lg:py-80u lg:last:pb-0 ${i > 0 ? 'pt-39u' : ''}`}
            >
              <div data-fl-text className="text-block mb-24u flex flex-wrap justify-between md:mb-39u lg:mb-60u">
                <span className="type-h6 order-1 text-green md:order-none">{String(i + 1).padStart(2, '0')}</span>
                <h5 className="type-h5 mb-16u text-main-green md:w-200u lg:w-400u">{item.title}</h5>
                <p className="type-p2 order-2 w-full text-main-green/70 md:order-none md:mr-28u md:w-303u lg:mr-0 lg:w-424u">
                  {item.desc}
                </p>
              </div>
              <div className="list-block flex flex-col-reverse md:flex-row md:justify-between">
                <ul className="list md:w-287u lg:ml-139u lg:w-424u">
                  {item.list.map((label) => (
                    <li key={label} data-fl-row className="flex pb-24u">
                      <div className="mt-2u lg:mt-6u">
                        <CheckIcon />
                      </div>
                      <h6 className="type-h6 ml-12u text-green">{label}</h6>
                    </li>
                  ))}
                </ul>
                <img
                  data-fl-img
                  src={item.image.src}
                  alt={item.image.alt ?? ''}
                  loading="lazy"
                  className="mb-24u h-[calc(var(--u)*147.5)] w-272u shrink-0 object-cover md:mb-0 md:h-180u md:w-331u lg:h-230u lg:w-424u"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
