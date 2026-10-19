import { useId, useRef } from 'react'
import { useHeroStaticMotion } from '../../motion/blocks'
import InlineSvg from '../InlineSvg'
import { LineArt, Rich } from './primitives'
import heroStaticSvg from '../../../public/assets/art/marketing/hero-static.svg?raw'

/**
 * §1.2 HeroStatic — `section#hero-static.hero-static`. No text reveal; the illustration loops while the
 * section is active (stand-in for the 977x424 / 30fps / 151f lottie = 5.03s).
 *
 * Props: eyebrow (omit/empty → no eyebrow, h1 starts the title-wrap), title (Rich: string | segments with { g } and '\n'),
 * description, buttons? ([{ label, href, variant: 'red' }] → `.btn-wrap` row: flex centered, gap 6u, mt 24u; misc §4.1),
 * art (raw SVG string, defaults to /assets/art/marketing/hero-static.svg — animatable ids: .line, .node, #pulse).
 */
export default function HeroStatic({ id = 'hero-static', eyebrow, title, description, buttons, art = heroStaticSvg }) {
  const ref = useRef(null)
  const uid = `hs${useId().replace(/[^a-zA-Z0-9]/g, '')}`
  useHeroStaticMotion(ref, uid)

  return (
    <section ref={ref} id={id} data-block="hero-static" className="hero-static relative bg-white">
      <div className="section-container pt-80u md:pt-111u lg:pt-120u">
        <div className="title-wrap mx-auto flex w-272u flex-col items-center text-center md:w-313u lg:w-636u">
          {eyebrow && (
            <div className="sub-title">
              <span className="type-p2 text-main-green/40">{eyebrow}</span>
            </div>
          )}
          <div className={`title ${eyebrow ? 'mt-8u md:mt-16u' : ''}`}>
            <h1 className="type-h3 text-main-green">
              <Rich value={title} />
            </h1>
          </div>
          <div className="description mt-12u w-272u md:mt-16u lg:w-424u">
            <p className="type-p2 text-main-green/40">{description}</p>
          </div>
          {buttons?.length > 0 && (
            <div className="btn-wrap mt-24u flex justify-center gap-6u">
              {buttons.map((b) => (
                <a key={b.label} href={b.href ?? '/'} className={`btn ${b.variant === 'red' || !b.variant ? 'btn-red' : `btn-${b.variant}`} type-button-large`}>
                  {b.label}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="image-block relative -left-73u mt-0 h-203u w-465u md:left-0 md:h-335u md:w-768u lg:mx-auto lg:h-424u lg:w-977u">
          <div className="bodymovin-wrap hidden h-full w-full lg:block" data-lottie-placeholder="hero-static">
            <InlineSvg svg={art} uid={uid} />
          </div>
          <div className="bodymovin-wrap-mobile h-full w-full lg:hidden" data-lottie-placeholder="hero-static-mobile">
            <InlineSvg svg={art} uid={`${uid}-m`} />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 hidden lg:block" aria-hidden="true">
        <LineArt size="wide" className="absolute bottom-0 left-0 h-170u w-423u" />
        <LineArt size="wide" className="absolute bottom-0 right-0 h-170u w-423u -scale-x-100" />
      </div>
    </section>
  )
}
