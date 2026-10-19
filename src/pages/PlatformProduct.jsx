import { useParams } from 'react-router-dom'
import BottomCta from '../components/BottomCta'
import Faq from '../components/Faq'
import {
  BenefitGroup,
  BenefitsVariant,
  FaqVariant,
  FeatureGroup,
  FeatureList,
  GenericCta,
  GetStarted,
  HeroStatic,
  LogoMarquee,
  PageHero,
  ScrollTabs,
} from '../components/blocks'
import { PRODUCTS } from '../data/marketing/products'
import { usePageMotion } from '../motion/page'
import NotFound from './NotFound'

/**
 * Block type → component. A product record (src/data/marketing/products.js) is an ordered list of { type, props }.
 * Records: payroll-compliance, tax-compliance, handbooks, entity-compliance.
 */
const BLOCKS = {
  hero: PageHero,
  heroStatic: HeroStatic,
  trusted: LogoMarquee,
  benefits: BenefitsVariant,
  getStarted: GetStarted,
  cta: GenericCta,
  featureGroup: FeatureGroup,
  featureList: FeatureList,
  faq: Faq,
  faqVariant: FaqVariant,
  benefitGroup: BenefitGroup,
  scrollTabs: ScrollTabs,
  bottomCta: BottomCta,
}

/** /platform/:product — specs/marketing.md §2.2 */
export default function PlatformProduct() {
  const { product } = useParams()
  const record = PRODUCTS[product]
  if (!record) return <NotFound />
  return <ProductPage key={product} blocks={record.blocks} />
}

function ProductPage({ blocks }) {
  // =Home Faq / BottomCta + footer lines; blocks carry their own motion
  usePageMotion()
  return blocks.map(({ type, props }, i) => {
    const Block = BLOCKS[type]
    return <Block key={`${type}-${i}`} {...props} />
  })
}
