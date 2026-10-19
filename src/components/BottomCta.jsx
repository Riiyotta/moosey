import InlineSvg, { art } from './InlineSvg'

/** §14 Bottom CTA — title + looping visual over a soft background image */
export default function BottomCta() {
  return (
    <section id="cta-section" data-section="cta" className="cta-section bg-green">
      <div className="cta-wrap medium-container overflow-hidden pb-120u pt-80u md:flex md:items-start md:justify-between md:pt-93u lg:items-center lg:pb-170u lg:pt-174u">
        <div className="text-block relative z-[1] flex flex-col items-center gap-32u md:items-start md:gap-24u">
          <div className="title md:w-288u lg:w-360u">
            <h4 className="type-h3 text-center text-white md:text-left">Start with Northwind.</h4>
          </div>
          {/* looping CTA art 1058x600 */}
          <div className="visual-mobile h-134u w-full md:hidden" data-lottie-placeholder="bottom-cta-mobile">
            <InlineSvg svg={art('cta/bottom-cta-visual.svg')} uid="bottom-cta-m" />
          </div>
        </div>
        <div className="visual-desktop relative z-[1] hidden h-189u w-332u md:block lg:h-300u lg:w-529u" data-lottie-placeholder="bottom-cta">
          <InlineSvg svg={art('cta/bottom-cta-visual.svg')} uid="bottom-cta" />
        </div>
        {/* soft bg (bg-tablet 510x402), cover */}
        <div className="bg absolute left-0 top-80u z-0 h-279u w-full md:bottom-60u md:left-auto md:right-0 md:top-auto md:w-336u lg:bottom-auto lg:h-500u lg:w-529u">
          <InlineSvg svg={art('cta/bg-tablet.svg')} uid="bottom-cta-bg" fit="slice" />
        </div>
      </div>
    </section>
  )
}
