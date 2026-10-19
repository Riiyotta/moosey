import '../styles/content.css'
import { useContentPageMotion } from '../motion/content'

/** §9 /subscribe: plain "Thanks" confirmation in stock Tailwind px. No form, no Bottom CTA. */
export default function Subscribe() {
  useContentPageMotion('subscribe')
  return (
    <div className="mt-[8px] w-full px-[16px] pt-[16px] md:mt-[24px] md:py-[32px]">
      <div className="mx-auto max-w-[1152px] px-[8px] lg:px-[16px]">
        <div className="mx-auto mt-[80px] max-w-[672px]">
          {/* weight 800 (synthetic bold on the original) */}
          <h2 className="text-center text-[36px] font-extrabold leading-[40px] text-[#111827] [font-variation-settings:'wght'_800]">Thanks!</h2>
          <p className="mt-[16px] text-center font-normal text-[18px] leading-[28px] text-[#4B5563]">You are on the list. Welcome aboard.</p>
        </div>
      </div>
    </div>
  )
}
