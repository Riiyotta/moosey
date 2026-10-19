import { useId, useRef } from 'react'
import { useGenericCtaMotion } from '../../motion/blocks'
import InlineSvg, { art } from '../InlineSvg'
import './primitives'

/**
 * §1.8 GenericCta — standalone Compliance CTA card (same card as the homepage RoleTabs bottom card).
 * Wrapper: bg #FCFBFA, py 150u on md+ (0 on mobile); card 272u / 510u / 1020u.
 * Motion: card rises y 100px→0 (32f Eas17) once on `top bottom-=10%`; its art loops while in view.
 *
 * Props: title (~49c, 2–3 lines), desc (~95–101c), id (optional, for the wrapper).
 * Use `<ComplianceCtaCard>` alone to place the card inline inside another section (handbooks BenefitGroup,
 * /solutions ScrollTabs) — it carries its own motion.
 */
export default function GenericCta({ id, title, desc }) {
  return (
    <div id={id} data-block="generic-cta" className="relative z-10 flex flex-col items-center bg-main-white md:py-150u">
      <ComplianceCtaCard title={title} desc={desc} />
    </div>
  )
}

export function ComplianceCtaCard({ title, desc, className = 'w-272u md:w-510u lg:w-1020u' }) {
  const ref = useRef(null)
  const uid = `gcta${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  useGenericCtaMotion(ref, uid)

  return (
    <div ref={ref} className={`generic-cta ${className}`}>
      <div
        data-gcta-card
        className="cta-wrap compliance-cta relative z-[1] overflow-hidden rounded-12u bg-green px-20u pb-45u pt-30u md:px-67u md:pt-50u lg:flex lg:justify-between lg:pb-40u lg:pl-79u lg:pt-73u"
      >
        <div className="text-block relative z-[1] flex flex-col items-center gap-32u md:gap-30u lg:items-start lg:gap-16u">
          <div className="titel md:w-288u lg:w-370u">
            <h4 className="type-h4 text-center text-white lg:text-left">{title}</h4>
          </div>
          <div className="visual-mobile h-131u w-full md:h-177u md:w-376u lg:hidden" data-lottie-placeholder="compliance-cta-mobile">
            <InlineSvg svg={art('cta/compliance-cta-visual.svg')} uid={`${uid}-m`} />
          </div>
          <div className="desc md:w-288u">
            <p className="type-p2 text-center text-white/70 lg:text-left">{desc}</p>
          </div>
        </div>
        <div className="visual-desktop relative z-[1] hidden h-258u w-454u lg:block" data-lottie-placeholder="compliance-cta">
          <InlineSvg svg={art('cta/compliance-cta-visual.svg')} uid={uid} />
        </div>
        <div className="bg absolute bottom-45u left-0 z-0 h-324u w-full lg:bottom-0 lg:left-auto lg:right-0 lg:mt-16u lg:w-644u">
          <div className="hidden h-full w-full md:block">
            <InlineSvg svg={art('cta/bg-desktop.svg')} uid={`${uid}-bg`} fit="slice" />
          </div>
          <div className="block h-full w-full md:hidden">
            <InlineSvg svg={art('cta/bg-tablet.svg')} uid={`${uid}-bg-m`} fit="slice" />
          </div>
        </div>
      </div>
    </div>
  )
}
