import '../../styles/marketing.css'
import { LinkArrowRight } from './icons'

/**
 * §1.14 ResourceList (for-hr). Tailwind px block: py-24, max-w-7xl px-6 lg:px-8, max-w-2xl lg:max-w-4xl.
 * Cover wrapper keeps the original's aspect classes; the img is full width with height from its aspect, so it
 * grows the wrapper (263px tall at lg:w-64 for a 1376x1414 cover).
 */
export default function ResourceList({ title, desc, items }) {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="type-h3 text-black">{title}</h2>
          <p className="type-p1 mt-2 text-main-green/70">{desc}</p>
          <div className="mt-6 space-y-8 lg:mt-12 lg:space-y-8">
            {items.map((item) => (
              <article key={item.title} className="relative isolate flex flex-col gap-8 lg:flex-row">
                <div className="relative aspect-[16/9] rounded-8u lg:aspect-square lg:w-64 lg:shrink-0">
                  <img src={item.cover} alt="" width="1376" height="1414" loading="lazy" className="block h-auto w-full" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="group relative">
                    <h3 className="mk-semibold text-lg font-semibold text-black">{item.title}</h3>
                    <p className="type-p2 mt-3 text-main-green/70">{item.desc}</p>
                  </div>
                  <a href={item.href} className="mt-4 inline-flex items-center text-sm font-medium text-green">
                    {item.cta}
                    <LinkArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
