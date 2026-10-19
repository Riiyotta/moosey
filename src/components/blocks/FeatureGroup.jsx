import { useCallback, useEffect, useRef, useState } from 'react'
import { swapFeatureImage, useFeatureGroupMotion } from '../../motion/blocks'
import './primitives'

/**
 * §1.3 FeatureGroup / MailService — pinned accordion story.
 *
 * Props
 *   id     'mail-service' (/platform) | 'feature-group' (products, default)
 *   cards  [{ title, desc, items: [{ title, body, image: { src, alt? } }] }]   (3 items per card)
 *
 * Desktop: each card pins near the viewport centre for its 2000u `.spacing`; scroll progress picks the open item.
 * All sizes: opening an item swaps the image (out 20f Eas66, then in 20f Eas17). Clicking the open item closes it.
 * Images render `w-full h-auto`, top-aligned in the box (short images leave the card tint visible below).
 */
export default function FeatureGroup({ id = 'feature-group', cards }) {
  const ref = useRef(null)
  const imgWraps = useRef([])
  const [open, setOpen] = useState(() => cards.map(() => 0))
  const prevOpen = useRef(open)

  const openItem = useCallback((ci, i) => setOpen((o) => (o[ci] === i ? o : o.map((v, k) => (k === ci ? i : v)))), [])
  useFeatureGroupMotion(ref, openItem)

  useEffect(() => {
    open.forEach((i, ci) => {
      if (i !== prevOpen.current[ci] && i >= 0) swapFeatureImage(imgWraps.current[ci], i)
    })
    prevOpen.current = open
  }, [open])

  return (
    <section ref={ref} id={id} data-block="feature-group" className={`${id} bg-main-white`}>
      <div className="base-container pb-100u pt-60u md:pb-115u md:pt-120u lg:pb-160u lg:pt-60u">
        <ul className="list flex flex-col gap-60u lg:gap-44u">
          {cards.map((card, ci) => (
            <li key={card.title} data-fg-card={ci} className="list-item">
              <div
                data-fg-wrap
                className={`list-item-wrap lg:rounded-12u lg:px-66u lg:py-73u ${ci === 0 ? 'lg:bg-green5/50' : 'lg:bg-green5/20'}`}
              >
                <div
                  data-fg-title-mobile
                  className="title-wrap-mobile flex flex-col gap-16u md:flex-row-reverse md:justify-between md:gap-0 lg:hidden"
                >
                  <h5 className="type-h5 text-main-green md:w-235u">{card.title}</h5>
                  <p className="type-p2 text-main-green/70 md:w-332u">{card.desc}</p>
                </div>
                <div data-fg-content className="content-wrap mt-24u md:mt-40u md:flex md:flex-row md:justify-between lg:mt-0 lg:w-1100u">
                  <div
                    ref={(el) => (imgWraps.current[ci] = el)}
                    className="img-wrap relative h-229u w-272u shrink-0 overflow-hidden rounded-8u md:h-280u md:w-332u lg:h-447u lg:w-530u"
                  >
                    {card.items.map((item, i) => (
                      <div
                        key={item.title}
                        data-fg-img={i}
                        className={`img-item absolute left-0 top-0 h-full w-full ${i === 0 ? '' : 'invisible opacity-0'}`}
                      >
                        <img src={item.image.src} alt={item.image.alt ?? ''} className="block h-auto w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="desc-list mt-24u md:mt-0 md:w-248u lg:flex lg:w-464u lg:flex-col lg:justify-between">
                    <div className="title-block hidden flex-col gap-16u lg:flex">
                      <h5 className="type-h5 text-main-green">{card.title}</h5>
                      <p className="type-p2 text-main-green/70">{card.desc}</p>
                    </div>
                    <div className="accordion platform w-full lg:w-384u">
                      {card.items.map((item, i) => {
                        const isOpen = open[ci] === i
                        return (
                          <div key={item.title} data-fg-item={i} className="accordion-item">
                            <button
                              type="button"
                              aria-expanded={isOpen}
                              onClick={() => setOpen((o) => o.map((v, k) => (k === ci ? (v === i ? -1 : i) : v)))}
                              className={`fg-accordion-button block w-full text-left mt-22u md:mt-12u md:pb-12u lg:mt-20u ${
                                isOpen ? 'active pb-8u text-green lg:pb-12u' : 'pb-18u text-main-green/40 lg:pb-20u'
                              }`}
                            >
                              <span className="accordion-title type-h6 block w-237u md:w-full lg:w-384u">{item.title}</span>
                            </button>
                            <div className="fg-accordion-content">
                              <div className="inner pb-16u lg:pb-20u">
                                <p className="type-p2 text-main-green/70">{item.body}</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="divider mt-40u h-[2px] w-full bg-green/20 lg:hidden" aria-hidden="true" />
              <div data-fg-spacing className="spacing hidden pb-2000u lg:block" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
