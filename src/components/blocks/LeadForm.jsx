import { useState } from 'react'
import { CheckIcon, Rich } from './primitives'

const DEFAULT_FIELDS = [
  { name: 'firstname', label: 'First name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastname', label: 'Last name', type: 'text', autoComplete: 'family-name' },
  { name: 'email', label: 'Work email', type: 'email', autoComplete: 'email' },
  { name: 'company', label: 'Company name', type: 'text', autoComplete: 'organization' },
]

/**
 * §1.15 LeadForm — static look-alike of the original's embedded HubSpot form. No external script, no network:
 * submit runs native required/email validation, then swaps to a local success message.
 *
 * Layout reproduces the original as measured: `grid grid-cols-2 gap-12` (48px) at EVERY width, so mobile is a
 * cramped 2-column grid (spec §1.15 / §5).
 *
 * stackOnMobile: intentional fix — one column below 481px (the original keeps 2 cramped columns).
 *
 * Props: title (Rich), list (3 labels), fields ([{ name, label, type, autoComplete }], all required),
 *        submitLabel, success ({ title, text })
 */
export default function LeadForm({
  id,
  title,
  list,
  fields = DEFAULT_FIELDS,
  submitLabel = 'Request a demo',
  stackOnMobile = false,
  success = { title: 'Thanks, we got it.', text: 'A Northwind specialist will reach out within one business day.' },
}) {
  const [sent, setSent] = useState(false)

  return (
    <section id={id} data-block="lead-form" className="section-container bg-main-white">
      <div className={`medium-container grid gap-12 ${stackOnMobile ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'} pb-100u pt-60u md:pb-115u md:pt-115u lg:pb-160u lg:pt-160u`}>
        <div className="text-col">
          <h3 className="type-h3 text-main-green">
            <Rich value={title} />
          </h3>
          <ul className="list py-8 md:mr-25u lg:mr-52u">
            {list.map((label) => (
              <li key={label} className="flex items-start pb-8u md:pb-12u lg:pb-20u">
                <div className="w-17u shrink-0 pt-2">
                  <CheckIcon />
                </div>
                <h6 className="type-h6 ml-12u text-green">{label}</h6>
              </li>
            ))}
          </ul>
        </div>
        <div className="pt-3 lg:max-w-[45vw]">
          {sent ? (
            <div className="lead-success" role="status">
              <h4 className="type-h5 text-main-green">{success.title}</h4>
              <p className="type-p2 mt-12u text-main-green/70">{success.text}</p>
            </div>
          ) : (
            <form
              className="lead-form"
              onSubmit={(e) => {
                e.preventDefault()
                if (e.currentTarget.checkValidity()) setSent(true)
              }}
            >
              {fields.map((f) => (
                <div key={f.name} className="lead-field">
                  <label htmlFor={`lead-${f.name}`} className="type-p1 text-green">
                    {f.label}
                    <span className="lead-required">*</span>
                  </label>
                  <input id={`lead-${f.name}`} name={f.name} type={f.type} autoComplete={f.autoComplete} required />
                </div>
              ))}
              <button type="submit" className="lead-submit btn btn-red type-button-large">
                {submitLabel}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
