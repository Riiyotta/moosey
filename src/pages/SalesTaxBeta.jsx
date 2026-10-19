import { useCallback, useState } from 'react'
import '../styles/blocks.css'
import '../styles/misc.css'
import { EverythingBand, InsetRow, IntroStrip, LegacyHero, ShotRow } from '../components/misc/legacy/LegacyKit'
import RequestInviteModal from '../components/misc/RequestInviteModal'
import { useDocTitle, useNoindex } from '../components/misc/useNoindex'
import { salesTaxBeta as d } from '../data/misc/salesTaxBeta'
import { everything } from '../data/misc/legacyContent'

/** /sales-tax-beta — Template A′: cut-down legacy page + request-invite modal (specs/misc.md §2.10) */
export default function SalesTaxBeta() {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  useNoindex()
  useDocTitle('Sales tax beta · Northwind')
  return (
    <div className="legacy" data-template="A-prime">
      <LegacyHero hero={d.hero} onCta={() => setOpen(true)} />
      <IntroStrip title={d.intro.title} subtitle={d.intro.subtitle} topPad="pt-24" />
      <div className="relative overflow-hidden">
        <div className="lgbg-teal-100 relative lg:pb-16">
          <ShotRow row={d.rows.form} pad="first" />
          <InsetRow row={d.rows.providers} />
          <ShotRow row={d.rows.mail} pad="mid" />
        </div>
      </div>
      <EverythingBand band={{ ...everything, ...d.everything }} />
      <RequestInviteModal open={open} onClose={close} copy={d.modal} />
    </div>
  )
}
