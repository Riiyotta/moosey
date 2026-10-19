import { artUrl } from './InlineSvg'

const ROW_1 = ['halcyon', 'brightpath', 'corvid-labs', 'tessellate', 'orbitra', 'fernway']
const ROW_2 = ['kestrel', 'driftwood', 'juniper-bay', 'arcwell', 'pallaso', 'quillfield']

/** §4 Trusted-by logo marquee — two rows, each rendered as two identical groups for looping */
export default function LogoMarquee() {
  return (
    <section id="homepage-trusted" data-section="trusted" className="trusted-section bg-main-white pb-110u pt-80u md:pb-160u lg:pb-260u">
      <div className="title-wrap medium-container" data-anim="trusted-title">
        <h3 className="type-h3 text-main-green">Trusted by</h3>
      </div>

      <div className="flex w-full flex-col items-center">
        <div className="relative mt-50u w-[100vw] overflow-hidden md:mt-80u md:w-687u lg:mt-110u lg:w-1110u" data-marquee>
          <Row seeds={ROW_1} groupAttr="data-marquee-group" rowAttr="1" className="" />
          <Row seeds={ROW_2} groupAttr="data-marquee-group-reverse" rowAttr="2" className="mt-12u lg:mt-22u" />

          {/* edge fades */}
          <div className="left pointer-events-none absolute -left-2u bottom-0 h-full w-30u bg-mask-gradient lg:w-166u" />
          <div className="right pointer-events-none absolute -right-2u bottom-0 h-full w-30u scale-[-1] bg-mask-gradient lg:w-166u" />
        </div>
      </div>
    </section>
  )
}

function Row({ seeds, groupAttr, rowAttr, className }) {
  return (
    <div className={`ticker flex w-full ${className}`} data-marquee-row={rowAttr}>
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          {...{ [groupAttr]: copy }}
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
