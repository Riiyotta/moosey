import '../styles/content.css'
import { AUTHORS } from '../data/content'
import { useContentPageMotion } from '../motion/content'

/**
 * §3 Authors index (Tailwind px wrapper). The list starts directly under the h1 line box (0 gap, a quirk).
 * No Bottom CTA, no motion.
 */
export default function Authors() {
  useContentPageMotion('authors')
  return (
    <div className="min-h-screen bg-white pb-[96px] pt-80u md:pt-111u lg:pt-120u">
      <h1 className="type-h3 text-center text-main-green">Authors</h1>
      <div className="mx-auto mb-[96px] w-[384px] px-[24px] md:w-2/3 lg:w-[768px]">
        <div className="ct-prose">
          <ul>
            {AUTHORS.map((a) => (
              <li key={a.slug}>
                <a href={`/authors/${a.slug}`}>{a.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
