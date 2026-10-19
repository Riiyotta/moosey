import { artUrl } from '../InlineSvg'

const ROW_1 = ['halcyon', 'brightpath', 'corvid-labs', 'tessellate', 'orbitra', 'fernway']
const ROW_2 = ['kestrel', 'driftwood', 'juniper-bay', 'arcwell', 'pallaso', 'quillfield']

/**
 * §8.4 Trusted on guides: copy of src/components/LogoMarquee.jsx with the guide padding
 * (`py-1110` = 110u top and bottom; home uses pt 80 / pb 110·160·260). Same markup/ids, so the marquee
 * motion in src/motion/content.js drives it.
 */
export default function GuideTrusted() {
  return (
    <section id="homepage-trusted" className="trusted-section bg-main-white py-110u">
      <div className="title-wrap medium-container">
        <h3 className="type-h3 text-main-green">Trusted by</h3>
      </div>
      <div className="flex w-full flex-col items-center">
        <div className="relative mt-50u w-[100vw] overflow-hidden md:mt-80u md:w-687u lg:mt-110u lg:w-1110u" data-marquee>
          <Row seeds={ROW_1} rowAttr="1" className="" />
          <Row seeds={ROW_2} rowAttr="2" className="mt-12u lg:mt-22u" />
          <div className="left pointer-events-none absolute -left-2u bottom-0 h-full w-30u bg-mask-gradient lg:w-166u" />
          <div className="right pointer-events-none absolute -right-2u bottom-0 h-full w-30u scale-[-1] bg-mask-gradient lg:w-166u" />
        </div>
      </div>
    </section>
  )
}

function Row({ seeds, rowAttr, className }) {
  return (
    <div className={`ticker flex w-full ${className}`} data-marquee-row={rowAttr}>
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1 ? 'true' : undefined}
          className={`${rowAttr === '1' ? 'ticker-items' : 'ticker-items-reverse'} flex shrink-0 gap-10u pl-10u`}
        >
          {seeds.map((s) => (
            // customer logo tile, 468x224 native (2.09:1), object-fit cover
            <li key={s} className="ticker-item h-60u w-127u shrink-0 lg:h-112u lg:w-234u">
              <img src={artUrl(`logos/${s}.svg`)} alt="" className="block h-full w-full object-cover" />
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
