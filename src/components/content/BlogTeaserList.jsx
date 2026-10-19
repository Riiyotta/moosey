import { Byline } from './PostHeader'

/**
 * §7 "More from the blog" (Tailwind UI markup, px): bg #F3F1EC, py 96px; max-w-7xl > max-w-2xl / lg:max-w-4xl.
 * Cards: column (gap 32px) below 1025, row on desktop with a 128px square thumbnail.
 */
export default function BlogTeaserList({ title, intro, posts }) {
  return (
    <div className="bg-white py-[96px]">
      <div className="mx-auto max-w-[1280px] px-[24px] lg:px-[32px]">
        <div className="mx-auto max-w-[672px] lg:max-w-[896px]">
          <h2 className="type-h3 text-black">{title}</h2>
          <p className="type-p1 mt-[8px] text-main-green/70">{intro}</p>
          <div className="mt-[24px] space-y-[48px] lg:mt-[80px]">
            {posts.map((p) => (
              <article key={p.slug} className="relative isolate flex flex-col gap-[32px] lg:flex-row">
                <div className="relative aspect-video rounded-8u lg:aspect-square lg:h-[128px] lg:w-[128px] lg:shrink-0">
                  {/* PLACEHOLDER blog featured image 640x427, cover */}
                  <img src={p.image.src} alt="" className="absolute inset-0 h-full w-full rounded-8u bg-[#F9FAFB] object-cover" />
                </div>
                <div>
                  <div className="group relative">
                    <h3 className="font-normal text-[18px] leading-[28px] text-black group-hover:text-[#4B5563]">
                      <a href={`/blog/${p.slug}`}>
                        <span className="absolute inset-0" />
                        {p.title}
                      </a>
                    </h3>
                    <p className="type-p2 my-[20px] line-clamp-2 text-main-green/70">{p.excerpt}</p>
                  </div>
                  <div className="flex border-t border-[rgba(17,24,39,0.05)]">
                    <div className="relative flex items-center gap-x-[16px]">
                      <Byline author={p.author} date={p.date} linkAuthor={false} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
