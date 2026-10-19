import { useParams } from 'react-router-dom'
import '../styles/content.css'
import BottomCta from '../components/BottomCta'
import PostHeader from '../components/content/PostHeader'
import Prose from '../components/content/Prose'
import { authorBySlug, formatDate, postBySlug } from '../data/content'
import { useContentPageMotion } from '../motion/content'
import NotFound from './NotFound'

/**
 * §2 Blog post. One #F3F1EC wrapper (pt 120/179/174u, pb 110u) holds the title, byline and prose.
 * No reveals (§12). The original's newsletter-modal trigger calls an undefined function, so it is omitted.
 */
export default function BlogPost() {
  const { slug } = useParams()
  const post = postBySlug(slug)
  useContentPageMotion(`post-${slug}`)
  if (!post) return <NotFound />
  const author = authorBySlug(post.author)

  return (
    <>
      <section id="inner-post">
        <div className="bg-white pb-110u pt-120u md:pt-179u lg:pt-174u">
          <PostHeader title={post.title} author={author} date={formatDate(post.date)} />
          <article>
            <Prose blocks={post.body} image={post.image} />
          </article>
        </div>
      </section>
      <BottomCta />
    </>
  )
}
