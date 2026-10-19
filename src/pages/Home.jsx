import Hero from '../components/Hero'
import LogoMarquee from '../components/LogoMarquee'
import Statement from '../components/Statement'
import Everything from '../components/Everything'
import RoleTabs from '../components/RoleTabs'
import Benefits from '../components/Benefits'
import Roadmap from '../components/Roadmap'
import PeaceOfMind from '../components/PeaceOfMind'
import Testimonials from '../components/Testimonials'
import Pricing from '../components/Pricing'
import Faq from '../components/Faq'
import BottomCta from '../components/BottomCta'
import { usePageMotion } from '../motion/page'

export default function Home() {
  // section reveals, marquee, pins/scrubs, CTA loops, footer lines (src/motion/page.js)
  usePageMotion()
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Statement />
      <Everything />
      <RoleTabs />
      <Benefits />
      <Roadmap />
      <PeaceOfMind />
      <Testimonials />
      <Pricing />
      <Faq />
      <BottomCta />
    </>
  )
}
