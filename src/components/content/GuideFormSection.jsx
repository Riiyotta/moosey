import { CheckBullet } from './Icons'
import HubspotForm from './HubspotForm'

/**
 * §8.3 form section. Split variant: medium-container, 2-column grid with a 48px gap at EVERY width
 * (mobile is a cramped 2 × 116u grid, reproduced as measured). Newsletter variant: centered column.
 */
export default function GuideFormSection({ form, bg = 'white' }) {
  const bgClass = bg === 'main-white' ? 'bg-main-white' : 'bg-white'
  return (
    <>
      <div className="relative">
        <a name="hubspot-form-a" id="hubspot-form-a" className="absolute h-0 w-0" aria-hidden="true" />
      </div>
      <section className={`guide-form-section ${bgClass}`}>
        {form.variant === 'newsletter' ? (
          <div className="flex flex-col items-center gap-[40px] px-[40px] pb-100u pt-60u md:py-115u lg:py-160u">
            <h3 className="type-h3 text-main-green">{form.heading}</h3>
            {form.intro && <p className="type-p2 text-main-green/70 lg:max-w-[45vw]">{form.intro}</p>}
            <div className="w-full lg:max-w-[45vw]">
              <HubspotForm fields={form.fields} submitLabel={form.submitLabel} />
            </div>
          </div>
        ) : (
          <div className="medium-container grid grid-cols-2 items-start gap-[48px] pb-100u pt-60u md:py-115u lg:py-160u">
            <div>
              <h3 className="type-h3 text-main-green">{form.heading}</h3>
              <ul className="list py-[32px] md:mr-25u lg:mr-52u">
                {form.bullets.map((b) => (
                  <li key={b} className="flex items-start pb-8u md:pb-12u lg:pb-20u">
                    <span className="h-17u w-17u shrink-0 pt-[8px]">
                      <CheckBullet />
                    </span>
                    <span className="type-h6 ml-12u text-green">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-[12px] lg:max-w-[45vw]">
              <HubspotForm fields={form.fields} submitLabel={form.submitLabel} />
            </div>
          </div>
        )}
      </section>
    </>
  )
}
