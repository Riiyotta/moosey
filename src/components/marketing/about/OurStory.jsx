import { Fragment } from 'react'

/** §1.17c OurStory — beige rounded card (absolute .bg), h5 green + three paragraphs joined by double <br> */
export default function OurStory({ title, paragraphs }) {
  return (
    <section id="our-story" className="our-story">
      <div className="container-wrap mx-auto w-272u pb-60u md:w-704u md:pb-115u lg:w-1100u lg:pb-110u">
        <div className="content-wrap relative z-10 flex flex-col gap-13u p-24u md:flex-row md:justify-between md:gap-0 md:p-40u">
          <div className="bg absolute left-0 top-0 -z-[1] h-full w-full rounded-12u bg-beige" />
          <div className="title text-anim">
            <h5 className="type-h5 text-green">{title}</h5>
          </div>
          <div className="description text-anim md:w-300u lg:w-376u">
            <p className="type-p2 text-main-green/70">
              {paragraphs.map((para, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}
                  {para}
                </Fragment>
              ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
