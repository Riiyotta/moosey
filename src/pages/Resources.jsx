import '../styles/content.css'
import BottomCta from '../components/BottomCta'
import ResourceList from '../components/content/ResourceList'
import { INDEX, useResources } from '../data/content'
import { useContentPageMotion } from '../motion/content'

/** §5 Resources index: blog-index list template with an h1 and link-list rows. No pagination, no motion. */
export default function Resources() {
  const res = useResources() // leaf data is lazy-loaded; link lists derive from it
  useContentPageMotion(res ? 'resources' : 'resources-loading')
  if (!res) return null
  return (
    <>
      <ResourceList eyebrow={INDEX.eyebrow} title={INDEX.title} groups={INDEX.groups.map(res.resolveGroup)} />
      <BottomCta />
    </>
  )
}
