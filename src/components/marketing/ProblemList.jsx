import '../../styles/marketing.css'

/** §1.12 ProblemList (`section#list-section`, for-hr). No bg (page default white, as measured). Static; px values (pt-4, mb-4, ml-9, 24px icon) are fixed Tailwind px. */
export default function ProblemList({ title, desc, items }) {
  return (
    <section id="list-section">
      <div className="container-list flex flex-col items-center">
        <div className="list-posts flex w-272u flex-col gap-32u pb-32u pt-60u md:w-704u md:gap-54u md:pb-54u md:pt-80u lg:w-1101u">
          <div className="article-wrap flex flex-col">
            <article className="flex flex-col gap-16u pb-32u md:flex-row md:justify-between md:gap-0 md:pb-54u">
              <div className="title-wrap md:w-249u lg:w-318u">
                <h2 className="type-h5 text-main-green">{title}</h2>
                <p className="type-p2 pt-4 text-main-green/70">{desc}</p>
              </div>
              <div className="summary-wrap flex flex-col md:w-339u lg:w-530u">
                <dl>
                  <div className="relative">
                    {items.map((item) => (
                      <div key={item.title} className="relative mb-4">
                        <dt>
                          <CheckIcon />
                          <p className="type-h6 ml-9 text-green">{item.title}</p>
                        </dt>
                        <dd className="type-p2 ml-9 text-main-green/70">{item.desc}</dd>
                      </div>
                    ))}
                  </div>
                </dl>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

/** REDRAW: check stroke `M5 13l4 4L19 7`, width 2, #55B559, 24x24px */
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-check-green absolute h-[24px] w-[24px]">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
