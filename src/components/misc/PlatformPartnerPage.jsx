import { FaqVariant, FeatureGroup, GenericCta, GetStarted, HeroStatic, LeadForm, LogoMarquee, Rich } from '../blocks'
import Pricing from '../Pricing'
import BottomCta from '../BottomCta'
import { usePageMotion } from '../../motion/page'
import { partnerTitle } from './StaticPartnerPage'
import { staticGetStarted } from '../../data/misc/staticPartnerContent'
import { platformFaq, platformFeatureGroup, platformGenericCta, platformLeadForm, platformTrustedRows } from '../../data/misc/platformPartnerContent'

/** §4.1 IntroRow (C1 only): h3-token title + p2 /70, row on md+, stacked on mobile. No motion. */
function IntroRow({ title, desc }) {
  return (
    <section className="intro-row bg-main-white pt-111u" data-misc="intro-row">
      <div className="medium-container">
        <div className="title-wrap visible flex flex-col gap-24u md:flex-row md:justify-between lg:pb-83u">
          <h1 className="type-h3 text-main-green md:flex-1">
            <Rich value={title} />
          </h1>
          <p className="type-p2 shrink-0 text-main-green/70 md:w-254u lg:w-399u">{desc}</p>
        </div>
      </div>
    </section>
  )
}

/**
 * Template C — platform partner page (specs/misc.md §4).
 * C1: HeroStatic + button, IntroRow, FeatureGroup, GetStarted, FAQ, Generic CTA, Pricing, Bottom CTA.
 * C2: HeroStatic + button, Trusted strip, lead form, then the same sections from FeatureGroup on.
 */
export default function PlatformPartnerPage({ partner }) {
  // homepage motion module drives the reused Pricing / BottomCta and the footer lines
  usePageMotion()
  const { hero } = partner
  const c2 = partner.variant === 'C2'
  return (
    <div data-template="C" data-variant={partner.variant}>
      <HeroStatic
        // C1's eyebrow span is EMPTY but present on the original (h1 keeps its 16u top margin → 136u); HeroStatic
        // omits the wrapper for a falsy eyebrow, so pass an empty element to keep the empty span
        eyebrow={hero.eyebrow || <></>}
        title={partnerTitle({ ...hero.title, brAlways: true })}
        description={hero.description}
        buttons={[{ ...hero.button, variant: 'red' }]}
      />
      {!c2 && <IntroRow title={partner.intro.title} desc={partner.intro.desc} />}
      {c2 && <LogoMarquee id="homepage-trusted-partner" title={partner.trustedTitle} rows={platformTrustedRows} padding="landing" />}
      {c2 && (
        // the original grid stays 2 columns on mobile (142u columns); intentional fix: stacked below 481px
        <LeadForm
          id="partner-lead-form"
          title={platformLeadForm.title}
          list={platformLeadForm.list}
          fields={platformLeadForm.fields}
          submitLabel={platformLeadForm.submitLabel}
          stackOnMobile
        />
      )}
      <FeatureGroup cards={platformFeatureGroup} />
      <GetStarted title={staticGetStarted.title} desc={staticGetStarted.desc} steps={staticGetStarted.steps} />
      <FaqVariant id="partner-faq" title={platformFaq.title} items={platformFaq.items} />
      <GenericCta id="generic-cta-1" title={platformGenericCta.title} desc={platformGenericCta.desc} />
      <Pricing />
      <BottomCta />
    </div>
  )
}
