import { useMemo, useState } from 'react'

const UTM = ['utm_campaign', 'utm_content', 'utm_medium', 'utm_source', 'utm_term']
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * §10 local, static stand-in for the embedded HubSpot form (no external script, no network submit).
 * Same DOM roles/classes as the injected form (.hs-form-field, .hs-input, .hs-error-msg, .hs-button);
 * styles in src/styles/content.css (.ct-hsform). Submitting validates locally and swaps in the
 * submitted message.
 */
export default function HubspotForm({ fields, submitLabel, id = 'hubspot-form' }) {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const utm = useMemo(() => {
    const q = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
    return Object.fromEntries(UTM.map((k) => [k, q.get(k) ?? '']))
  }, [])

  const check = (f, v = values[f.name] ?? '') => {
    if (f.required && !String(v).trim()) return 'Please complete this required field.'
    if (f.type === 'email' && v && !EMAIL_RE.test(v)) return 'Please enter a valid email address.'
    return null
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const next = Object.fromEntries(fields.map((f) => [f.name, check(f)]).filter(([, m]) => m))
    setErrors(next)
    if (!Object.keys(next).length) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div id={id} className="ct-hsform">
        <div className="ct-hsform-submitted submitted-message" role="status">
          Thanks for submitting the form. Check your inbox shortly.
        </div>
      </div>
    )
  }

  return (
    <div id={id} className="ct-hsform">
      <form className="hbspt-form hs-form" noValidate onSubmit={onSubmit}>
        {fields.map((f) => {
          const inputId = `${id}-${f.name.replace(/[^\w-]/g, '_')}`
          const err = errors[f.name]
          return (
            <div key={f.name} className={`hs-form-field hs_${f.name}`}>
              <label htmlFor={inputId}>
                <span>{f.label}</span>
                {f.required && <span className="hs-form-required">*</span>}
              </label>
              <div className="input">
                <input
                  id={inputId}
                  name={f.name}
                  type={f.type}
                  required={f.required}
                  aria-invalid={err ? 'true' : undefined}
                  className={`hs-input ${err ? 'invalid error' : ''}`}
                  value={values[f.name] ?? ''}
                  onChange={(e) => {
                    const v = e.target.value
                    setValues((s) => ({ ...s, [f.name]: v }))
                    // clear a shown error as soon as the value is valid (no layout shift on blur/submit)
                    if (err && !check(f, v)) setErrors((s) => ({ ...s, [f.name]: null }))
                  }}
                  onBlur={(e) => setErrors((s) => ({ ...s, [f.name]: check(f, e.target.value) }))}
                />
              </div>
              {err && (
                <ul className="hs-error-msgs" role="alert">
                  <li>
                    <label className="hs-error-msg" htmlFor={inputId}>
                      {err}
                    </label>
                  </li>
                </ul>
              )}
            </div>
          )
        })}
        {UTM.map((k) => (
          <input key={k} type="hidden" name={k} value={utm[k]} />
        ))}
        <div className="hs_submit hs-submit">
          <div className="actions">
            <input type="submit" value={submitLabel} className="hs-button primary ct-btn ct-btn-red text-button-large" />
          </div>
        </div>
      </form>
    </div>
  )
}
