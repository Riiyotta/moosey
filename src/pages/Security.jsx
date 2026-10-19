import InnerPost from '../components/marketing/InnerPost'
import { security } from '../data/marketing-b/security'

/** /security/ — InnerPost rich-text template (spec §1.18, §2.7). No CTA; the footer follows directly. */
export default function Security() {
  return <InnerPost title={security.title} blocks={security.blocks} />
}
