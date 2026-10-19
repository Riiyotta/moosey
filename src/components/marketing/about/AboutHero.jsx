/** §1.17a AboutHero — eyebrow, h1 with green tail, 8u-radius cover image */
export default function AboutHero({ eyebrow, title, titleGreen, image }) {
  return (
    <section id="about-hero" className="about-hero">
      <div className="container-wrap mx-auto w-272u pb-60u pt-79u md:w-704u md:pb-115u md:pt-111u lg:w-1100u lg:pb-110u lg:pt-120u">
        <div className="title-wrap flex flex-col items-center gap-8u text-center md:gap-16u">
          <div className="sub-title" data-anim="about-eyebrow">
            <p className="type-p2 text-main-green/40">{eyebrow}</p>
          </div>
          <div className="title" data-anim="about-title">
            <h1 className="type-h3 text-main-green">
              {title} <span className="text-green">{titleGreen}</span>
            </h1>
          </div>
        </div>
        <div
          className="hero-image-wrap mt-32u h-133u w-full overflow-hidden rounded-8u md:mt-50u md:h-296u lg:mt-65u lg:h-463u"
          data-anim="about-image"
        >
          {/* PLACEHOLDER 2200x926 team/office visual, cover */}
          <img src={image} alt="" width="2200" height="926" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}
