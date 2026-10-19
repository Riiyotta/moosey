import BottomCta from '../components/BottomCta'
import Faq from '../components/Faq'
import Pricing from '../components/Pricing'
import { usePageMotion } from '../motion/page'

/**
 * /pricing — specs/marketing.md §2.5: =Home Pricing (markup identical, incl. desktop pin + collapse),
 * =Home Faq (5 items), =Home BottomCta. Pricing is the first block, so its 170u desktop padding-top clears the header.
 */
export default function PricingPage() {
  usePageMotion()
  return (
    <>
      <Pricing />
      <Faq />
      <BottomCta />
    </>
  )
}
