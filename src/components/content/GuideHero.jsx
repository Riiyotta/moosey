import { useRef } from 'react'
import { useGuideHeroMotion } from '../../motion/content'

/**
 * §8.1 guide hero (u units). Desktop box is 782u tall and the 1080u cover image overflows it; the next
 * section (position:relative) paints over the overflow. Below 1025 a second, full-width image is shown.
 */
export default function GuideHero({ guide }) {
  const ref = useRef(null)
  useGuideHeroMotion(ref, guide.slug)
  return (
    <section ref={ref} id="landingpage-hero" className="section-container relative bg-white lg:h-782u">
      <div className="text-block flex flex-col items-center pb-48u pt-79u text-center md:pb-76u md:pt-110u lg:pb-0 lg:pt-119u">
        <div className="sub-title">
          <span className="type-p2 text-main-green/40" data-anim="eyebrow">
            {guide.eyebrow}
          </span>
        </div>
        <div className="title mt-8u md:mt-16u">
          <h1 className="type-h3 text-main-green" data-anim="title">
            {guide.title}
          </h1>
        </div>
        <div className="description mt-12u w-full md:mt-16u md:w-272u lg:w-424u">
          <p className="type-p2 text-main-green/40" data-anim="desc">
            {guide.description}
          </p>
        </div>
        <div className="mt-24u flex justify-center gap-6u">
          <a href="#hubspot-form-a" className="ct-btn ct-btn-red text-button-large">
            {guide.ctaLabel}
          </a>
        </div>
        {/* PLACEHOLDER cover 7192x3792 (1.897:1): desktop 1080u wide, object-cover */}
        <img
          src={guide.heroImage.desktop}
          alt=""
          data-anim="image"
          className="mx-auto mt-24u hidden w-1080u object-cover lg:block"
          width="1798"
          height="948"
        />
      </div>
      {/* mobile/tablet: full width, object-fill */}
      <img src={guide.heroImage.mobile} alt="" data-anim="image" className="block w-full object-fill lg:hidden" width="1798" height="948" />
    </section>
  )
}
