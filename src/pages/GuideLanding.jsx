import { useParams } from 'react-router-dom'
import '../styles/content.css'
import BottomCta from '../components/BottomCta'
import GuideTrusted from '../components/content/GuideTrusted'
import GuideHero from '../components/content/GuideHero'
import GuideBenefits from '../components/content/GuideBenefits'
import GuideFormSection from '../components/content/GuideFormSection'
import FeatureGroup from '../components/content/FeatureGroup'
import GuideFaq from '../components/content/GuideFaq'
import { guideBySlug } from '../data/content'
import { useContentPageMotion } from '../motion/content'
import NotFound from './NotFound'

/** section type -> renderer; order comes from guide.sections (§8 composable stack) */
const SECTIONS = {
  hero: (g) => <GuideHero guide={g} />,
  benefits: (g) => g.benefits && <GuideBenefits items={g.benefits} motionKey={g.slug} />,
  form: (g, s) => <GuideFormSection form={g.form} bg={s.bg} />,
  trusted: () => <GuideTrusted />,
  featureGroup: (g) => g.featureGroup && <FeatureGroup group={g.featureGroup} motionKey={g.slug} />,
  faq: (g) => g.faq && <GuideFaq title={g.faq.title} items={g.faq.items} />,
  cta: () => <BottomCta />,
}

/** §8 Gated guide landing /p/:guide */
export default function GuideLanding() {
  const { guide: slug } = useParams()
  const guide = guideBySlug(slug)
  useContentPageMotion(`guide-${slug}`)
  if (!guide) return <NotFound />
  return (
    <>
      {guide.sections.map((s, i) => {
        const render = SECTIONS[s.type]
        return render ? <GuideSectionSlot key={`${s.type}-${i}`}>{render(guide, s)}</GuideSectionSlot> : null
      })}
    </>
  )
}

const GuideSectionSlot = ({ children }) => children ?? null
