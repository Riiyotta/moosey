/**
 * Content collections + derived selectors. Pages import from here; phase-2 instances are added
 * by appending records to the collection modules. Resource leaves are lazy: see ./useResources.
 */
import { AUTHORS, authorBySlug } from './authors'
import { BLOG_POSTS, postBySlug } from './blogPosts'
import { CATEGORIES, INDEX, categoryBySlug } from './resources'
import { loadResources, useResources } from './useResources'
import { GUIDES, guideBySlug } from './guides'
import { STATES, stateBySlug } from './states'

export { AUTHORS, authorBySlug, BLOG_POSTS, postBySlug, CATEGORIES, INDEX, categoryBySlug, loadResources, useResources, GUIDES, guideBySlug, STATES, stateBySlug }

export const POSTS_PER_PAGE = 10

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
/** ISO "2026-01-22" -> "Jan 22, 2026" (the original's byline format) */
export function formatDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

export const postsByAuthor = (slug) => BLOG_POSTS.filter((p) => p.author === slug)

export const categoryHref = (slug) => `/resources/us/${slug}`

// Leaf selectors (leafBySlug, leafHref, leafLabel, categoryLinks, resolveGroup, sameCategoryLeaves,
// agenciesInState, localitiesInState, localitiesElsewhere) live on the lazy module from useResources().
