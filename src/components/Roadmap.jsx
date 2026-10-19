import InlineSvg, { art } from './InlineSvg'

const STEPS = [
  {
    title: 'Connect your current accounts',
    titleLong: 'Connect all your current accounts',
    desc: 'Link payroll and entity details once, and we map every requirement.',
    art: [434, 345],
  },
  {
    title: 'Review your plan',
    titleLong: 'Review your new plan',
    desc: 'We build a tailored checklist of registrations, filings and renewals for each state.',
    art: [886, 690],
  },
  {
    title: 'Stay ahead, always',
    titleLong: 'Stay ahead, all year',
    desc: 'Ongoing monitoring catches changes early and keeps every filing on track.',
    art: [868, 690],
  },
]

/** §9 Roadmap — green pinned story (desktop: stacked steps + progress bar; tablet/mobile: column) */
export default function Roadmap() {
  return (
    <section id="homepage-roadmap" data-section="roadmap" className="roadmap-section">
      <div className="roadmap-pin-container relative bg-green" data-roadmap-pin>
        <div className="roadmap-section__bg-lines" aria-hidden="true">
          <div className="left-bg-lines">
            <div className="mobile-lines absolute left-0 top-53u h-100u w-89u md:hidden">
              <CornerLines w={90} h={102} />
            </div>
            <div className="tablet-lines absolute left-0 top-130u hidden h-169u w-175u md:block lg:hidden">
              <CornerLines w={175} h={171} />
            </div>
            <div className="desktop-lines absolute left-0 top-285u hidden h-239u w-382u lg:block">
              <CornerLines w={382} h={241} />
            </div>
          </div>
          <div className="right-bg-lines">
            <div className="mobile-lines absolute right-0 top-53u h-100u w-89u -scale-x-100 md:hidden">
              <CornerLines w={89} h={102} />
            </div>
            <div className="tablet-lines absolute right-0 top-130u hidden h-169u w-175u -scale-x-100 md:block lg:hidden">
              <CornerLines w={175} h={171} />
            </div>
            <div className="desktop-lines absolute right-0 top-285u hidden h-239u w-382u -scale-x-100 lg:block">
              <CornerLines w={382} h={241} />
            </div>
          </div>
        </div>

        <div className="section-container px-24u pb-44u pt-50u md:px-40u md:pb-130u md:pt-169u lg:px-210u lg:pb-128u lg:pt-335u">
          <div className="title-block mb-86u md:mb-119u lg:mb-200u">
            <h1 className="animation-title type-h1 mx-auto w-138u text-center text-white md:w-355u lg:w-522u" data-anim="title">
              From first filing to full calm.
            </h1>
          </div>

          {/* tablet / mobile */}
          <div className="lg:hidden">
            <div className="flex flex-col gap-80u md:gap-140u">
              {STEPS.map((s, i) => (
                <div key={s.title} className="roadmap-responsive-step md:flex md:items-center md:justify-between" data-roadmap-step-responsive={i}>
                  <div className="mb-32u h-216u w-272u md:order-2 md:mb-0 md:h-250u md:w-315u">
                    {/* step illustration */}
                    <div className="roadmap-step-image-responsive h-full w-full" data-lottie-placeholder={`roadmap-step-${i + 1}`}>
                      <InlineSvg svg={art(`roadmap/roadmap-step-${i + 1}.svg`)} uid={`roadmap-step-${i + 1}-m`} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-12u md:order-1 md:w-275u">
                    <h5 className="type-h5 text-white">{s.titleLong}</h5>
                    <p className="type-p2 text-white opacity-70">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* desktop: 3000u scroll track; pin/scrub is the Animation pass */}
          <div className="hidden lg:block">
            <div className="desktop-roadmap-steps lg:h-3000u" data-roadmap-steps>
              <div className="mb-34u flex justify-between">
                <ul className="relative mt-115u flex h-339u w-389u flex-col gap-100u">
                  {STEPS.map((s, i) => (
                    <li
                      key={s.title}
                      data-roadmap-step={i}
                      className={`roadmap-step absolute left-0 top-0 flex flex-col gap-12u ${i === 0 ? '' : 'opacity-0'}`}
                    >
                      <h5 className="text-h5-d text-white">{s.title}</h5>
                      <p className="text-p2-d w-319u text-white opacity-70">{s.desc}</p>
                    </li>
                  ))}
                </ul>
                <div className="desktop-roadmap-steps__images relative h-345u w-434u" data-roadmap-images>
                  {STEPS.map((s, i) => (
                    <div
                      key={s.title}
                      data-roadmap-image={i}
                      data-lottie-placeholder={`roadmap-step-${i + 1}`}
                      className={`roadmap-step-image absolute left-0 top-0 h-full w-full ${i === 0 ? '' : 'opacity-0'}`}
                    >
                      <InlineSvg svg={art(`roadmap/roadmap-step-${i + 1}.svg`)} uid={`roadmap-step-${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="progress-bar relative h-33u">
                <div className="progress-bar__bg-bar absolute -bottom-px left-0 w-[0%]" data-roadmap-progress>
                  <div className="progress-bar__counter text-p3-d absolute bottom-11u right-0 text-white" data-roadmap-counter>
                    01
                  </div>
                  {/* fill is in normal flow (3px) — matches the measured original */}
                  <div className="left-0 top-0 h-[3px] w-full rounded-[3px] bg-white" />
                </div>
                <div className="progress-bar__bg-line absolute bottom-0 left-0 h-px w-full bg-white opacity-40" />
                <div className="progress-bar__divider absolute bottom-0 left-[33.3%] h-10u w-px bg-white" />
                <div className="progress-bar__divider absolute bottom-0 left-[66.6%] h-10u w-px bg-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** REDRAW: simple corner line art, stroke green4 */
function CornerLines({ w, h }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} fill="none" className="block h-full w-full">
      <g className="stroke-green4" strokeWidth="1">
        <path d={`M0 ${h * 0.12}H${w * 0.45}C${w * 0.7} ${h * 0.12} ${w * 0.75} ${h * 0.55} ${w * 0.98} ${h * 0.55}`} />
        <path d={`M0 ${h * 0.55}H${w * 0.98}`} />
        <path d={`M0 ${h * 0.95}H${w * 0.3}C${w * 0.5} ${h * 0.95} ${w * 0.55} ${h * 0.55} ${w * 0.75} ${h * 0.55}`} />
      </g>
      <circle cx={w * 0.98 - 2} cy={h * 0.55} r="2.5" className="fill-green4" />
    </svg>
  )
}
