import { Ecosystem, GetStarted, HeroStatic, ScrollTabs } from '../components/blocks'
import Roadmap from '../components/Roadmap'
import Benefits from '../components/Benefits'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Faq from '../components/Faq'
import BottomCta from '../components/BottomCta'
import { usePageMotion } from '../motion/page'
import { solutions } from '../data/marketing-b/solutions'

/**
 * /solutions/ and /solutions/smb/ (byte-identical on the original) — spec §2.3:
 * HeroStatic → ScrollTabs + inline Compliance CTA → Ecosystem → =Home Roadmap → =Home Benefits →
 * =Home Testimonials → GetStarted → =Home Pricing → =Home Faq → =Home BottomCta.
 */
export default function Solutions() {
  // the reused homepage sections (roadmap pin, benefits, testimonials, pricing pin, CTA loop) get motion here
  usePageMotion()
  return (
    <>
      <HeroStatic {...solutions.hero} />
      <ScrollTabs {...solutions.scrollTabs} />
      <Ecosystem {...solutions.ecosystem} />
      <Roadmap />
      <Benefits />
      <Testimonials />
      <GetStarted {...solutions.getStarted} />
      <Pricing />
      <Faq />
      <BottomCta />
    </>
  )
}
