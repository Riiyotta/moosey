import { useRef } from 'react'
import { useEcosystemMotion } from '../../motion/blocks'
import { Rich } from './primitives'

/**
 * §1.5 Ecosystem — `section#ecosystem-section` (/platform, /solutions). bg #CFD7D4.
 * Props: title (Rich, 2 lines), desc (~89c), partners: [{ logo: { src, alt }, desc }] (3)
 * Motion (`top bottom-=30%`, once): text y 100px (raw px) stagger 5f 35f; items y 10u stagger 5f at +5f.
 */
export default function Ecosystem({ id = 'ecosystem-section', title, desc, partners }) {
  const ref = useRef(null)
  useEcosystemMotion(ref)

  return (
    <section ref={ref} id={id} data-block="ecosystem" className="ecosystem-section bg-green5">
      <div className="medium-container py-60u lg:py-117u">
        <div className="text-block mb-32u md:mb-25u md:flex md:justify-between lg:mb-109u">
          <h3 data-eco-text className="type-h3 mb-23u text-main-green lg:mb-0 lg:w-399u">
            <Rich value={title} />
          </h3>
          <p data-eco-text className="type-p2 text-main-green/70 md:w-332u lg:w-400u">
            {desc}
          </p>
        </div>
        <ul className="list flex flex-col md:flex-row">
          {partners.map((p, i) => (
            <li
              key={p.desc}
              data-eco-item
              className={`item w-full md:w-208u lg:w-318u ${i < partners.length - 1 ? 'mb-24u md:mb-0 md:mr-32u lg:mr-52u' : ''}`}
            >
              <div className="icon-block mb-16u flex h-96u items-center justify-center rounded-[calc(var(--u)*10)] bg-main-white/70 md:h-74u lg:mb-19u lg:h-113u lg:rounded-12u">
                <img src={p.logo.src} alt={p.logo.alt ?? ''} className="block h-45u w-171u object-contain md:w-130u lg:h-57u lg:w-200u" />
              </div>
              <p className="type-p2 text-main-green/70">{p.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
