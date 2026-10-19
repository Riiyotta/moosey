import { FeatureList, GetStarted, HeroStatic } from '../blocks'
import Testimonials from '../Testimonials'
import Pricing from '../Pricing'
import BottomCta from '../BottomCta'
import { usePageMotion } from '../../motion/page'
import { staticFeatures, staticGetStarted } from '../../data/misc/staticPartnerContent'

/**
 * Hero h1 (§3.1): the last word(s) sit in span.text-green, preceded by a <br> on tablet/mobile only
 * (`brAlways` forces it at every width, as on the C1 page). `lead` ends with a space.
 */
export function partnerTitle({ lead, accent, brAlways = false }) {
  return (
    <>
      {lead}
      <br className={brAlways ? '' : 'lg:hidden'} />
      <span className="text-green">{accent}</span>
    </>
  )
}

/** Template B — static partner page (specs/misc.md §3): HeroStatic, FeatureList, GetStarted, Testimonials, Pricing, Bottom CTA */
export default function StaticPartnerPage({ partner }) {
  // homepage motion module drives the reused Testimonials / Pricing / BottomCta and the footer lines
  usePageMotion()
  const { hero } = partner
  return (
    <div data-template="B">
      <HeroStatic eyebrow={hero.eyebrow} title={partnerTitle(hero.title)} description={hero.description} />
      <FeatureList variant="A" items={staticFeatures} />
      <GetStarted title={staticGetStarted.title} desc={staticGetStarted.desc} steps={staticGetStarted.steps} />
      <Testimonials />
      <Pricing />
      <BottomCta />
    </div>
  )
}
