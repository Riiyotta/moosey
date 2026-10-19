import AboutHero from '../components/marketing/about/AboutHero'
import TitleWithDesc from '../components/marketing/about/TitleWithDesc'
import OurStory from '../components/marketing/about/OurStory'
import Careers from '../components/marketing/about/Careers'
import { LogoMarquee } from '../components/blocks'
import BottomCta from '../components/BottomCta'
import { usePageMotion } from '../motion/page'
import { useAboutMotion } from '../motion/marketing'
import { about } from '../data/marketing-b/about'

/**
 * /about/ — spec §1.17, §2.6. Everything sits in one #F3F1EC wrapper:
 * AboutHero → TitleWithDesc → OurStory → Trusted (orange fades) → Careers → BottomCta.
 */
export default function About() {
  // homepage motion (bottom CTA loop, footer lines) + About block reveals (src/motion/marketing.js)
  usePageMotion()
  useAboutMotion()
  return (
    <div className="bg-white">
      <AboutHero {...about.hero} />
      <TitleWithDesc {...about.titleWithDesc} />
      <OurStory {...about.story} />
      <LogoMarquee
        id="homepage-trusted-about"
        title={about.trusted.title}
        rows={about.trusted.rows}
        padding="home"
        fade="orange"
        bg="bg-white"
      />
      <Careers {...about.careers} />
      <BottomCta />
    </div>
  )
}
