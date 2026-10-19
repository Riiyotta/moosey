import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import '../styles/content.css'
import BottomCta from '../components/BottomCta'
import PageTitleBand from '../components/content/PageTitleBand'
import { ArrowLinkButton, ListPosts, ListRow } from '../components/content/ListRows'
import Pagination from '../components/content/Pagination'
import { BLOG_POSTS, POSTS_PER_PAGE } from '../data/content'
import { useContentPageMotion } from '../motion/content'
import NotFound from './NotFound'

/**
 * §1 Blog index. Page N is read from `?page=N` (routes.js has no `blog/page/:page` route); a
 * `:page` route param is honored too, so adding `{ path: 'blog/page/:page', page: 'BlogIndex' }`
 * later gives the original's /blog/page/N URLs with no change here. Page 1 is always /blog.
 */
const blogPageHref = (n) => (n <= 1 ? '/blog' : `/blog?page=${n}`)

export default function BlogIndex() {
  const params = useParams()
  const [search] = useSearchParams()
  const raw = params.page ?? search.get('page') ?? '1'
  const page = Number(raw)
  const total = Math.max(1, Math.ceil(BLOG_POSTS.length / POSTS_PER_PAGE))
  const valid = Number.isInteger(page) && page >= 1 && page <= total

  // page changes are full navigations on the original: always start at the top
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])
  useContentPageMotion(`blog-${page}`)

  if (!valid) return <NotFound />
  const posts = BLOG_POSTS.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)

  return (
    <>
      <section id="posts-list" className="posts-list-section">
        <div className="container-list flex flex-col items-center">
          {/* no h1 on the blog index: eyebrow only */}
          <PageTitleBand eyebrow="Blog" />
          <ListPosts>
            {posts.map((p) => (
              <ListRow key={p.slug} title={p.title}>
                <p className="text-p1-b text-main-green/70">{p.excerpt}</p>
                <ArrowLinkButton href={`/blog/${p.slug}`} />
              </ListRow>
            ))}
          </ListPosts>
          <Pagination current={page} total={total} hrefFor={blogPageHref} />
        </div>
      </section>
      <BottomCta />
    </>
  )
}
