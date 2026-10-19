import { useParams } from 'react-router-dom'
import '../styles/content.css'
import BottomCta from '../components/BottomCta'
import PostHeader from '../components/content/PostHeader'
import Prose from '../components/content/Prose'
import InlineCtaCard from '../components/content/InlineCtaCard'
import ResourceLinkGrid from '../components/content/ResourceLinkGrid'
import BlogTeaserList from '../components/content/BlogTeaserList'
import { authorBySlug, categoryBySlug, categoryHref, formatDate, postBySlug, stateBySlug, useResources } from '../data/content'
import { useContentPageMotion } from '../motion/content'
import NotFound from './NotFound'

/**
 * §7 Resource guide article: post template (narrow title, date-only byline) + related blocks per category:
 *   payroll / sales-tax / employee-handbook: same-category grid (abbr chip) -> agencies in state -> blog
 *   local-payroll: localities in state -> other localities -> blog
 *   secretary-of-state / agencies: agencies in state -> blog
 */
export default function ResourceGuide() {
  const { category: catSlug, leaf: slug } = useParams()
  const res = useResources() // leaf data is lazy-loaded (src/data/content/resourceLeaves.js)
  useContentPageMotion(res ? `leaf-${catSlug}-${slug}` : `leaf-${catSlug}-${slug}-loading`)
  if (!res) return null
  const { agenciesInState, leafBySlug, leafHref, leafLabel, localitiesElsewhere, localitiesInState, sameCategoryLeaves } = res
  const toItems = (leaves, label = (l) => l.title) => leaves.map((l) => ({ href: leafHref(l), label: label(l), state: l.state }))
  const leaf = leafBySlug(catSlug, slug)
  if (!leaf) return <NotFound />
  const category = categoryBySlug(leaf.category)
  const state = stateBySlug[leaf.state] // null for agencies whose state the slug does not reveal

  const agencies = {
    id: 'agencies',
    title: state ? `Agencies in ${state.name}` : categoryBySlug('agencies').relatedTitle,
    items: toItems(agenciesInState(leaf.state, leaf.slug)),
    seeAllHref: categoryHref('agencies'),
  }
  let blocks
  if (['payroll', 'sales-tax', 'employee-handbook'].includes(leaf.category)) {
    blocks = [
      {
        id: 'same',
        title: category.relatedTitle,
        desc: category.relatedDesc,
        items: toItems(sameCategoryLeaves(leaf)),
        abbr: true,
        seeAllHref: categoryHref(leaf.category),
      },
      agencies,
    ]
  } else if (leaf.category === 'local-payroll') {
    blocks = [
      {
        id: 'localities',
        title: `More localities in ${state.name}`,
        items: toItems(localitiesInState(leaf), leafLabel),
        seeAllHref: categoryHref('local-payroll'),
      },
      { id: 'elsewhere', title: category.relatedTitle, items: toItems(localitiesElsewhere(leaf), leafLabel), seeAllHref: categoryHref('local-payroll') },
    ]
  } else {
    blocks = [agencies]
  }
  blocks = blocks.filter((b) => b.items.length)

  const posts = leaf.blogPosts
    .map(postBySlug)
    .filter(Boolean)
    .map((p) => ({ ...p, author: authorBySlug(p.author), date: formatDate(p.date) }))

  const afterArticle = leaf.ctaPlacement === 'after-article'

  return (
    <>
      <section id="inner-post">
        <div className="bg-white pb-110u pt-120u md:pt-179u lg:pt-174u">
          <PostHeader title={leaf.title} date={formatDate(leaf.date)} narrow />
          <Prose blocks={leaf.body} fallbackCta={leaf.inlineCta}>
            {afterArticle && <InlineCtaCard {...leaf.inlineCta} />}
            {leaf.sourceLinks?.length > 0 && (
              <>
                <h3>{leaf.sourcesTitle}</h3>
                <ul style={{ marginTop: 16 }}>
                  {leaf.sourceLinks.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noreferrer">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Prose>
        </div>
      </section>
      {blocks.map((b, i) => (
        <ResourceLinkGrid key={b.id} {...b} first={i === 0} agencyFirst={leaf.category === 'agencies'} />
      ))}
      <BlogTeaserList
        title="More from the blog"
        intro="Practical guides from the Northwind team on payroll, registrations, filings and staying compliant in every state."
        posts={posts}
      />
      <BottomCta />
    </>
  )
}
