import { useParams } from 'react-router-dom'
import '../styles/blocks.css'
import '../styles/misc.css'
import { getPartner } from '../data/misc/partners'
import LegacyPartnerPage from '../components/misc/LegacyPartnerPage'
import StaticPartnerPage from '../components/misc/StaticPartnerPage'
import PlatformPartnerPage from '../components/misc/PlatformPartnerPage'
import { useDocTitle, useNoindex } from '../components/misc/useNoindex'
import NotFound from './NotFound'

/** /partners/:partner — picks Template A / B / C from the partner record (specs/misc.md §0) */
export default function PartnerLanding() {
  const { partner: slug } = useParams()
  const partner = getPartner(slug)
  useNoindex(Boolean(partner))
  useDocTitle(partner ? `Northwind + ${partner.name}` : null)
  if (!partner) return <NotFound />
  if (partner.template === 'A') return <LegacyPartnerPage key={slug} partner={partner} />
  if (partner.template === 'B') return <StaticPartnerPage key={slug} partner={partner} />
  if (partner.template === 'C') return <PlatformPartnerPage key={slug} partner={partner} />
  return <NotFound />
}
