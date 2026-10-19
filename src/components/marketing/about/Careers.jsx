import '../../../styles/marketing.css'

/** §1.17e Careers — title/desc row, right-aligned job rows (hover bg #FCFBFA, 200ms), btn-red link */
export default function Careers({ title, desc, jobs, button }) {
  return (
    <section id="careers" className="careers">
      <div className="container-wrap mx-auto flex w-272u flex-col gap-32u pb-67u md:w-695u md:justify-between md:gap-0 md:pb-114u lg:w-1100u lg:pb-160u">
        <div className="title-wrap flex flex-col gap-24u md:flex-row md:justify-between md:gap-0">
          <div className="title" data-anim="careers-title">
            <h3 className="type-h3 text-main-green">{title}</h3>
          </div>
          <div className="desc md:w-339u lg:w-423u" data-anim="careers-desc">
            <p className="type-p2 text-main-green/70">{desc}</p>
          </div>
        </div>
        <div className="list-wrap md:mt-32u md:flex md:flex-col md:items-end lg:mt-24u">
          <div>
            <ul className="flex flex-col gap-16u md:gap-20u">
              {jobs.map((job) => (
                <li
                  key={job.title}
                  className="list-item border-b border-solid border-main-green/20 pb-16u last:border-b-0 last:pb-0 md:w-339u md:pb-20u lg:w-423u"
                  data-anim="careers-row"
                >
                  <a href={job.href} target="_blank" rel="noreferrer" className="mk-career-row block rounded-8u p-8u">
                    <div className="title">
                      <h5 className="type-p2 text-main-green">{job.title}</h5>
                    </div>
                    <div className="list-skills w-full">
                      <p className="type-p4 w-full truncate text-main-green/60">
                        {job.tags.map((tag, i) => (
                          <span key={tag}>
                            {i > 0 ? ' • ' : ''}
                            {tag}
                          </span>
                        ))}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
            <div className="btn-wrap mt-24u" data-anim="careers-btn">
              <a href={button.href} target="_blank" rel="noreferrer" className="btn btn-red type-button-large">
                {button.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
