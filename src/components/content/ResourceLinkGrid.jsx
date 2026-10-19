import { stateBySlug } from '../../data/content'

const CHIP_BG = ['#285D60', '#A5B287', '#C1BA95', '#889C98', '#D1D9D6'] // i mod 5

/**
 * §7 related grid (Tailwind UI markup, px). `first` = first block on the page (py 32 + inner py 56;
 * agencies leaves: py 56 + inner py 96). `abbr` = 64px chip with the 2-letter state code, else a 16px chip.
 */
export default function ResourceLinkGrid({ title, desc, items, seeAllHref, abbr = false, first = false, agencyFirst = false }) {
  if (!items.length) return null
  const outer = first && !agencyFirst ? 'py-[32px]' : 'py-[56px]'
  const inner = first ? (agencyFirst ? 'py-[96px]' : 'py-[56px]') : ''
  return (
    <div className={`border-t border-[#E5E7EB] bg-main-white ${outer}`}>
      <div className={`mx-auto max-w-[1280px] px-[16px] lg:px-[32px] ${inner}`}>
        <h2 className={`type-h3 text-black ${desc ? '' : 'mb-[48px]'}`}>{title}</h2>
        {desc && <p className="type-p1 mb-[48px] mt-[8px] text-main-green/70">{desc}</p>}
        <ul role="list" className="mt-[12px] grid grid-cols-1 gap-[20px] lg:grid-cols-3">
          {items.map((it, i) => (
            <li key={it.href} className="col-span-1 flex rounded-[6px]">
              <div
                className={`flex shrink-0 items-center justify-center rounded-l-[6px] font-normal text-[14px] leading-[20px] text-white ${abbr ? 'w-[64px]' : 'w-[16px]'}`}
                style={{ backgroundColor: CHIP_BG[i % 5] }}
              >
                {abbr ? stateBySlug[it.state]?.abbr : null}
              </div>
              <div className="flex flex-1 items-center justify-between truncate rounded-r-[6px] border-b border-r border-t border-[#E5E7EB] bg-white">
                <div className="type-p1 flex-1 truncate px-[16px] py-[12px]">
                  <a href={it.href} className="text-main-green/70">
                    {it.label}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {seeAllHref && (
          <p className="mt-[16px]">
            <a href={seeAllHref} className="font-normal text-[14px] leading-[20px] text-green">
              See all
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
