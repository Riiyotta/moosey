import InlineSvg, { art } from './InlineSvg'

/** §6 "Everything" giant headline over a tab shape, plus the lines/dots Lottie stage */
export default function Everything() {
  return (
    <section id="homepage-everything" data-section="everything" className="everything-section bg-main-white">
      <div className="section-container flex flex-col items-center justify-center pb-40u md:px-40u md:pb-45u lg:px-104u lg:pb-93u">
        {/* overflow-hidden mask for the slide-up reveal */}
        <div className="relative z-[1] w-288u overflow-hidden text-center md:w-688u lg:w-1232u">
          {/* REDRAW: wide rounded trapezoid "tab" */}
          <svg viewBox="0 0 1223 54" className="absolute bottom-0 left-0 right-0 z-[-1] w-full" aria-hidden="true">
            <path d="M0 54C40 54 52 0 104 0H1119C1171 0 1183 54 1223 54Z" className="fill-white" />
          </svg>
          <h2 className="type-h0 title text-main-green" data-anim="everything-title">
            All of it, handled.
          </h2>
        </div>

        {/* mobile stage: 250u wide, spacer pb 314u (Lottie 517x632) */}
        <div className="bodymovin-wrap-mobile relative mt-18u w-250u pb-314u md:hidden">
          {/* one network SVG holds #lines, #dots, #nodes, #hub; the dots wrapper below is kept (empty) as a hook */}
          <div className="absolute left-0 right-0 flex justify-center" data-lottie-placeholder="everything-lines-mobile">
            <InlineSvg svg={art('everything/network-mobile.svg')} uid="network-m" className="block h-auto w-full" />
          </div>
          <div className="absolute left-0 right-0 flex justify-center opacity-0" data-lottie-placeholder="everything-dots-mobile" />
        </div>

        {/* tablet/desktop stage: 633u / 970u wide (Lottie 1936x1760) */}
        <div className="bodymovin-wrap-desktop relative hidden md:mt-20u md:block md:w-633u md:pb-580u lg:mt-45u lg:w-970u lg:pb-885u">
          <div className="absolute left-0 right-0 z-[1] flex justify-center" data-lottie-placeholder="everything-lines">
            <InlineSvg svg={art('everything/network-desktop.svg')} uid="network" className="block h-auto w-full" />
          </div>
          <div className="absolute left-0 right-0 z-[1] flex justify-center opacity-0" data-lottie-placeholder="everything-dots" />
        </div>
      </div>
    </section>
  )
}
