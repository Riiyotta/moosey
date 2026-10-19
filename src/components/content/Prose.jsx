import InlineCtaCard from './InlineCtaCard'
import HubspotForm from './HubspotForm'

/** DELIBERATE FIX (§2 tables): wrap every table in an overflow-x:auto scroller (original clips on mobile) */
const wrapTables = (html) => html.replace(/<table/g, '<div class="ct-table-scroll"><table').replace(/<\/table>/g, '</table></div>')

/**
 * §2 prose body. Blocks:
 *   { html }  raw prose HTML    { cta }  InlineCtaCard (cta === true -> `fallbackCta`)    { form }  embedded form
 * `image` renders as the first body element (`<p><img>`), like the original's featured image.
 */
export default function Prose({ blocks, image, fallbackCta, className = '', children }) {
  return (
    <div className={`ct-prose article-body ${className}`}>
      {image && (
        <p>
          {/* PLACEHOLDER featured image 640x427, 3:2, cover, radius 8u */}
          <img src={image.src} alt={image.alt} width="640" height="427" />
        </p>
      )}
      {blocks.map((b, i) => {
        if (b.html) return <div key={i} dangerouslySetInnerHTML={{ __html: wrapTables(b.html) }} />
        if (b.cta) return <InlineCtaCard key={i} {...(b.cta === true ? fallbackCta : b.cta)} />
        if (b.form)
          return (
            <div key={i} className="relative">
              <a name={b.form.anchor ?? 'hubspot-form-a'} className="absolute h-0 w-0" aria-hidden="true" />
              <section className="section-container bg-white">
                <h3>{b.form.heading}</h3>
                <div className="pt-[12px]">
                  <HubspotForm fields={b.form.fields} submitLabel={b.form.submitLabel} id={`hubspot-form-${i}`} />
                </div>
              </section>
            </div>
          )
        return null
      })}
      {children}
    </div>
  )
}
