import { useParams } from 'react-router-dom'
import {
  BenefitsVariant,
  FaqVariant,
  FeatureGroup,
  FeatureList,
  GenericCta,
  GetStarted,
  LeadForm,
  LogoMarquee,
  PageHero,
} from '../components/blocks'
import ProblemList from '../components/marketing/ProblemList'
import FeatureCardGrid from '../components/marketing/FeatureCardGrid'
import ResourceList from '../components/marketing/ResourceList'
import TestimonialsLite from '../components/marketing/TestimonialsLite'
import BottomCta from '../components/BottomCta'
import { usePageMotion } from '../motion/page'
import { SOLUTION_DETAILS } from '../data/marketing-b/solutionDetails'
import Solutions from './Solutions'
import NotFound from './NotFound'

/** block name (data) → component */
const BLOCKS = {
  PageHero,
  LogoMarquee,
  ProblemList,
  FeatureCardGrid,
  BenefitsVariant,
  FeatureGroup,
  GenericCta,
  ResourceList,
  GetStarted,
  Faq: FaqVariant,
  LeadForm,
  FeatureList,
  TestimonialsLite,
  BottomCta,
}

/**
 * /solutions/:solution — spec §2.4. `smb` is the /solutions/ overview (byte-identical page on the original);
 * other slugs render their composition from src/data/marketing-b/solutionDetails.js; unknown slugs → NotFound.
 */
export default function SolutionDetail() {
  const { solution } = useParams()
  if (solution === 'smb') return <Solutions />
  const page = SOLUTION_DETAILS[solution]
  if (!page) return <NotFound />
  return <Composition key={solution} sections={page.sections} />
}

function Composition({ sections }) {
  // homepage motion still drives the reused BottomCta loop and footer lines
  usePageMotion()
  return sections.map(({ block, props }, i) => {
    const Block = BLOCKS[block]
    return <Block key={`${block}-${i}`} {...props} />
  })
}
