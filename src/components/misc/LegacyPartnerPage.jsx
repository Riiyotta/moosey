import {
  AboutBand,
  AlwaysCurrentBand,
  CollaborateBand,
  EverythingBand,
  InsetRow,
  IntroStrip,
  LegacyHero,
  PricingBand,
  ShotRow,
  WorkflowRow,
} from './legacy/LegacyKit'
import { alwaysCurrent, collaborate, everything, featureRows, plans } from '../../data/misc/legacyContent'

/** Template A — legacy partner page (specs/misc.md §2.1 band order) */
export default function LegacyPartnerPage({ partner }) {
  return (
    <div className="legacy" data-template="A" data-variant={partner.variant}>
      <LegacyHero hero={partner.hero} />
      <IntroStrip title={partner.intro.title} subtitle={partner.intro.subtitle} />
      <div className="relative overflow-hidden">
        <div className="lgbg-teal-100 relative lg:pb-16">
          <ShotRow row={featureRows.setup} pad="first" />
          <WorkflowRow row={featureRows.workflow} cardBg={partner.workflowCard.cardBg} firstBg={partner.workflowCard.firstBg} />
          <ShotRow row={featureRows.mail} pad="mid" />
          <InsetRow row={featureRows.payroll} />
          <ShotRow row={featureRows.notices} pad="midPadded" />
        </div>
        <AlwaysCurrentBand band={alwaysCurrent} />
        <CollaborateBand band={collaborate} />
        <EverythingBand band={everything} />
        <PricingBand pricing={{ ...partner.pricing, plans: plans(partner.signupHref) }} />
        <AboutBand about={partner.about} />
      </div>
    </div>
  )
}
