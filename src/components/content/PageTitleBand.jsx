/** §1/§4/§5 title band: full width, #F3F1EC, centered column. Eyebrow p2 main_green/40, optional h1 (h3 token). */
export default function PageTitleBand({ eyebrow, title }) {
  return (
    <div className="title-wrap flex w-full flex-col gap-8u bg-white pb-40u pt-122u text-center md:gap-16u md:pb-50u md:pt-95u lg:pb-60u lg:pt-120u">
      {eyebrow && <span className="type-p2 text-main-green/40">{eyebrow}</span>}
      {title && <h1 className="type-h3 text-main-green">{title}</h1>}
    </div>
  )
}
