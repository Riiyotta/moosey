import { useParams } from 'react-router-dom'
import '../styles/content.css'
import BottomCta from '../components/BottomCta'
import ResourceList from '../components/content/ResourceList'
import { categoryBySlug, useResources } from '../data/content'
import { useContentPageMotion } from '../motion/content'
import NotFound from './NotFound'

/** §6 Resource category hub: the §5 template with one row (two for secretary-of-state). */
export default function ResourceCategory() {
  const { category: slug } = useParams()
  const category = categoryBySlug(slug)
  const res = useResources() // leaf data is lazy-loaded; link lists derive from it
  useContentPageMotion(res ? `category-${slug}` : `category-${slug}-loading`)
  if (!category) return <NotFound />
  if (!res) return null
  const groups = category.rows.map((r) => ({ ...r, links: res.categoryLinks(category.slug, r.topic) }))
  return (
    <>
      <ResourceList eyebrow={category.eyebrow} title={category.title} groups={groups} />
      <BottomCta />
    </>
  )
}
