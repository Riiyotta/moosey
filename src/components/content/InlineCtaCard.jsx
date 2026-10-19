import { useId } from 'react'

/**
 * §2 in-article CTA card — Tailwind UI markup in px (does not scale):
 * outer my-10 (40px); card green2, radius 8u, centered text, p-4 / md:p-10, shadow-2xl, space-y-4.
 * h2 uses the prose h2 sizes (margin 0, #FFFFFF); p hidden below 481px; optional btn-red row (no hover).
 * Glow: 1024px circle with radial gradient #006265 -> #CAEAEA @ .7, top edge at the card's midpoint.
 */
export default function InlineCtaCard({ title, desc, buttonLabel, buttonHref }) {
  const gid = `ct-glow-${useId().replace(/:/g, '')}`
  return (
    <div className="mx-0">
      <div className="mx-auto my-[40px]">
        <div className="ct-cta-card relative isolate space-y-[16px] overflow-hidden rounded-8u bg-green2 p-[16px] text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] md:p-[40px]">
          <h2 style={{ color: '#FFFFFF' }}>{title}</h2>
          {desc && <p className="hidden md:block">{desc}</p>}
          {buttonLabel && (
            <div className="flex items-center justify-center gap-x-[24px]">
              <a href={buttonHref} className="ct-btn ct-btn-red text-button-large" style={{ color: '#FFFFFF' }}>
                {buttonLabel}
              </a>
            </div>
          )}
          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="ct-cta-glow absolute left-1/2 top-1/2 -z-10 h-[1024px] w-[1024px] -translate-x-1/2"
          >
            <circle cx="512" cy="512" r="512" fill={`url(#${gid})`} fillOpacity="0.7" />
            <defs>
              <radialGradient id={gid}>
                <stop stopColor="#006265" />
                <stop offset="1" stopColor="#CAEAEA" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
