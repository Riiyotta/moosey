import Benefits from '../components/Benefits'
import BottomCta from '../components/BottomCta'
import { Ecosystem, Engine, FeatureGroup, FeatureList, PageHero } from '../components/blocks'
import { PLATFORM } from '../data/marketing/platform'
import { usePageMotion } from '../motion/page'

/** /platform — specs/marketing.md §2.1 */
export default function Platform() {
  // =Home Benefits + BottomCta + footer lines; the blocks carry their own motion (src/motion/blocks.js)
  usePageMotion()
  return (
    <>
      <PageHero {...PLATFORM.hero} />
      <FeatureGroup {...PLATFORM.mailService} />
      <FeatureList {...PLATFORM.features} />
      <Benefits />
      <Ecosystem {...PLATFORM.ecosystem} />
      <Engine {...PLATFORM.engine} />
      <BottomCta />
    </>
  )
}
