import { useRef } from 'react'
import { usePageHeroMotion } from '../../motion/blocks'
import { LineArt, Rich } from './primitives'

/**
 * §1.1 PageHero — `section.hero-section`. Fixed 782u on desktop, auto below.
 *
 * variant 'platform' (id platform-hero): h1 #000, margins on elements, absolute 1204x466u visual + corner line art.
 * variant 'landing'  (id landingpage-hero): h1 #203435, wrapper gaps, in-flow 1080u visual, full-bleed below lg.
 *
 * visual: { desktop: { src, w, h }, mobile: { src, w, h }, alt }
 *   desktop image is object-cover; mobile/tablet (`-res`) image is object-fill. Landing heights follow the aspect.
 */
export default function PageHero({ variant = 'landing', id, eyebrow, title, description, visual }) {
  const ref = useRef(null)
  usePageHeroMotion(ref)
  const isPlatform = variant === 'platform'
  const sectionId = id ?? (isPlatform ? 'platform-hero' : 'landingpage-hero')

  return (
    <section ref={ref} id={sectionId} data-block="page-hero" className="hero-section">
      <div className="section-container relative w-full bg-white lg:h-782u">
        {isPlatform ? (
          <div className="text-block flex flex-col items-center pb-48u pt-79u text-center md:pb-76u md:pt-110u lg:pb-0 lg:pt-119u">
            <span data-hero-eyebrow className="type-p2 mb-9u text-main-green/40 md:mb-16u lg:mb-18u">
              {eyebrow}
            </span>
            <h1 data-hero-title className="type-h3 mb-11u text-black md:mb-16u lg:mb-15u">
              <Rich value={title} />
            </h1>
            <p data-hero-desc className="type-p2 w-272u text-main-green/40 lg:w-424u">
              {description}
            </p>
          </div>
        ) : (
          <div className="text-block flex flex-col items-center pb-48u pt-79u text-center md:pb-76u md:pt-110u lg:pb-0 lg:pt-119u">
            <div className="sub-title" data-hero-eyebrow>
              <span className="type-p2 text-main-green/40">{eyebrow}</span>
            </div>
            <div className="title mt-8u md:mt-16u" data-hero-title>
              <h1 className="type-h3 text-main-green">
                <Rich value={title} />
              </h1>
            </div>
            <div className="description mt-12u md:mt-16u md:w-272u lg:w-424u" data-hero-desc>
              <p className="type-p2 text-main-green/40">{description}</p>
            </div>
          </div>
        )}

        {isPlatform && (
          <div className="lines-block absolute bottom-0 left-0 right-0 hidden lg:block" aria-hidden="true">
            <LineArt size="hero" className="line-left absolute bottom-0 left-0 h-170u w-272u" />
            <LineArt size="hero" className="line-right absolute bottom-0 right-0 h-170u w-272u -scale-x-100" />
          </div>
        )}

        {isPlatform ? (
          <div
            data-hero-visual
            className="visual-block relative mx-auto h-206u w-275u md:ml-148u md:mr-0 md:h-353u md:w-471u lg:absolute lg:bottom-0 lg:left-103u lg:m-0 lg:h-466u lg:w-1204u"
          >
            <img src={visual.desktop.src} alt={visual.alt ?? ''} className="main-visual hidden h-full w-full object-cover lg:block" />
            <img src={visual.mobile.src} alt={visual.alt ?? ''} className="main-visual block h-full w-full object-fill lg:hidden" />
          </div>
        ) : (
          <div data-hero-visual className="visual-block relative w-full lg:mx-auto lg:mt-24u lg:w-1080u">
            <img
              src={visual.desktop.src}
              alt={visual.alt ?? ''}
              style={{ aspectRatio: `${visual.desktop.w} / ${visual.desktop.h}` }}
              className="main-visual hidden w-full object-cover lg:block"
            />
            <img
              src={visual.mobile.src}
              alt={visual.alt ?? ''}
              style={{ aspectRatio: `${visual.mobile.w} / ${visual.mobile.h}` }}
              className="main-visual block w-full object-fill lg:hidden"
            />
          </div>
        )}
      </div>
    </section>
  )
}
