/** §1.17b TitleWithDesc — h3 (~3c + green word) beside a long p2 */
export default function TitleWithDesc({ title, titleGreen, desc }) {
  return (
    <section id="title-with-desc" className="title-with-desc">
      <div className="container-wrap mx-auto flex w-272u flex-col gap-24u pb-110u md:w-704u md:flex-row md:justify-between md:gap-0 md:pb-160u lg:w-1100u">
        <div className="title text-anim">
          <h3 className="type-h3 text-main-green">
            {title} <span className="text-green">{titleGreen}</span>
          </h3>
        </div>
        <div className="desc text-anim md:w-340u lg:w-424u">
          <p className="type-p2 text-main-green/70">{desc}</p>
        </div>
      </div>
    </section>
  )
}
