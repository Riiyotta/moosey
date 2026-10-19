import { useParams } from 'react-router-dom'
import '../styles/content.css'
import PageTitleBand from '../components/content/PageTitleBand'
import { authorBySlug, postsByAuthor } from '../data/content'
import { useContentPageMotion } from '../motion/content'
import NotFound from './NotFound'

/** §4 Author detail: bg #FBFCFC, title band, px wrapper with photo, Bio, Articles. No Bottom CTA, no motion. */
export default function AuthorDetail() {
  const { author: slug } = useParams()
  const author = authorBySlug(slug)
  useContentPageMotion(`author-${slug}`)
  if (!author) return <NotFound />
  const articles = postsByAuthor(author.slug)

  return (
    <div className="min-h-screen bg-[#FBFCFC] pb-[96px]">
      <PageTitleBand eyebrow="Author" title={author.name} />
      <div className="mx-auto mb-[96px] w-[384px] px-[24px] pt-40u md:w-2/3 md:pt-50u lg:w-[768px] lg:pt-60u">
        <div className="ct-prose">
          <div className="flex justify-center">
            {/* PLACEHOLDER author photo 600x600, 1:1, cover, radius 8u */}
            <img src={author.photo} alt={author.name} className="aspect-square !w-1/2 object-cover" />
          </div>
          <h2>Bio</h2>
          <p>{author.bio}</p>
          {author.socialLink && (
            <p>
              <a href={author.socialLink.href} target="_blank" rel="noreferrer">
                {author.socialLink.label}
              </a>
            </p>
          )}
          <h2>Articles</h2>
          <ul>
            {articles.map((p) => (
              <li key={p.slug}>
                <a href={`/blog/${p.slug}`}>{p.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
