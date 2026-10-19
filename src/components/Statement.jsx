/** §5 Statement — title + muted description */
export default function Statement() {
  return (
    <section id="homepage-second" data-section="second" className="second-section bg-main-white">
      <div className="section-container flex flex-col px-24u pb-177u pt-100u md:flex-row md:items-center md:justify-between md:px-40u md:pb-192u md:pt-110u lg:px-170u lg:pb-250u lg:pt-112u">
        <div className="text-anim title md:w-249u lg:w-358u" data-anim="text-anim">
          <h3 className="type-h3 text-main-green">
            <span className="text-green">Stay current</span>, without any chaos.
          </h3>
        </div>
        <div className="text-anim desc mt-24u md:mt-0 md:w-332u lg:w-422u" data-anim="text-anim">
          <p className="type-p2 text-main-green opacity-40">
            Paperwork shouldn't set the pace of your business. Northwind reads each new obligation as it appears,
            gives it an owner and a date, and shows what is done and what comes next in plain, friendly language.
          </p>
        </div>
      </div>
    </section>
  )
}
