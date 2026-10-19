import { useState } from 'react'
import { Chevron } from '../shared'
import { Rich } from './primitives'

/**
 * Prop-driven copy of the homepage FAQ (§13) for the variants in marketing §3:
 * handbooks (8 items, plain title), for-hr (4 items, plain title, bg #F3F1EC).
 * Same geometry and accordion behaviour as src/components/Faq.jsx (single open, all closed initially, no reveal).
 *
 * Props: title (Rich), items [{ q, a }], bg ('bg-main-white' default | 'bg-white' = #F3F1EC), id
 */
export default function FaqVariant({ id = 'faq-section', title, items, bg = 'bg-main-white' }) {
  const [open, setOpen] = useState(-1)

  return (
    <section id={id} data-block="faq-variant" className={`faq-section ${bg} pt-120u md:pt-180u lg:pt-160u`}>
      <div className="medium-container pb-100u md:flex md:justify-between md:pb-125u">
        <div className="text-block md:w-272u lg:w-328u">
          <h3 className="type-h3 text-main-green">
            <Rich value={title} />
          </h3>
        </div>
        <div className="accordion-block mt-40u w-full md:mt-0 md:w-332u lg:w-530u">
          <div className="accordion">
            {items.map((item, i) => (
              <div key={item.q} className="accordion-item relative">
                <button
                  type="button"
                  aria-expanded={open === i}
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="accordion-button relative mt-18u flex w-full items-center pb-18u text-left md:mt-12u md:pb-12u lg:mt-20u lg:pb-20u"
                >
                  <span className="accordion-title type-h6 w-237u text-main-green md:w-297u lg:w-435u">{item.q}</span>
                  <span className="icon absolute right-0 top-0 inline-block h-16u w-16u lg:h-24u lg:w-24u">
                    <Chevron />
                  </span>
                </button>
                <div className="accordion-content">
                  <div className="inner pb-16u lg:pb-20u">
                    <p className="desc-1 type-p2 text-main-green/70">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
