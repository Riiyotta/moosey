import { BenefitsVariant, FeatureList, GenericCta, HeroStatic } from '../components/blocks'
import PeaceOfMind from '../components/PeaceOfMind'
import { usePageMotion } from '../motion/page'
import { useDocTitle } from '../components/misc/useNoindex'
import { reinstatement as d } from '../data/misc/reinstatement'

/**
 * /reinstatement — Template D (specs/misc.md §5; original /texas-reinstatement/):
 * HeroStatic, Benefits variant, FeatureList (1 item, title/description pairs), Generic CTA, Peace of mind.
 * No pricing, testimonials or bottom CTA — the footer follows Peace directly.
 */
export default function Reinstatement() {
  // homepage motion module drives the reused PeaceOfMind (pinned scrub) and the footer lines
  usePageMotion()
  useDocTitle('Business reinstatement · Northwind')
  return (
    <div data-template="D">
      <HeroStatic eyebrow={d.hero.eyebrow} title={d.hero.title} description={d.hero.description} />
      <BenefitsVariant id="homepage-benefits-reinstatement" title={d.benefits.title} desc={d.benefits.desc} cards={d.benefits.cards} />
      <FeatureList
        variant="A"
        keepLastPadding
        items={[{ title: d.feature.title, desc: d.feature.desc, pairs: d.feature.pairs, image: d.feature.image }]}
      />
      <GenericCta id="generic-cta-1" title={d.cta.title} desc={d.cta.desc} />
      <PeaceOfMind />
    </div>
  )
}
