import '../../styles/marketing.css'
import { CardIcon } from './icons'

/** §1.13 icon accent set, cycling in this order */
const ACCENTS = ['#285D60', '#A5B287', '#C1BA95', '#889C98', '#D1D9D6']

/**
 * §1.13 FeatureCardGrid (for-hr). bg #F3F1EC, py 110u; header width 80% on >=481; grid is fixed px
 * (max-w 1024px, gap 32px, 3 cols >=1025, else 1 — `sm:grid-cols-2` is inert on the original).
 */
export default function FeatureCardGrid({ title, titleGreen, desc, cards }) {
  return (
    <div className="section-container bg-white py-110u">
      <div className="text-block mx-auto mb-12 text-center md:w-4/5">
        <h2 className="type-h3 mb-6 text-main-green">
          {title}
          <br />
          <span className="text-green">{titleGreen}</span>
        </h2>
        <p className="type-p2 mx-auto mb-8 max-w-2xl text-main-green/80">{desc}</p>
        <dl className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-3">
          {cards.map((card, i) => {
            const accent = ACCENTS[i % ACCENTS.length]
            return (
              <div key={card.title} className="mk-card">
                <div className="mk-icon-tile" style={{ backgroundColor: `${accent}10` }}>
                  <CardIcon name={card.icon} className="block h-[24px] w-[24px]" style={{ color: accent }} />
                </div>
                <dt className="mk-semibold mt-4 text-left text-lg font-semibold text-main-green">{card.title}</dt>
                <dd className="type-p2 mt-2 text-left text-main-green/70">{card.desc}</dd>
              </div>
            )
          })}
        </dl>
      </div>
    </div>
  )
}
