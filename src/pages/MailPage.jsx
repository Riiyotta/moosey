import { useState } from 'react'
import '../styles/misc.css'
import { useDocTitle } from '../components/misc/useNoindex'

/**
 * /mail — Template E: checkout-style form + price/info panel (specs/misc.md §6). Legacy fixed px, no motion.
 * Local static form: the original posts JSON to an API and then sets window.top.location to a returned checkout
 * URL; this clone validates locally and shows a confirmation instead (no network).
 */
const COPY = {
  badge: 'Beta',
  title: 'Questions about a state agency letter?',
  figure: '$5',
  info: 'A Northwind specialist will review any letter or notice from a state agency and explain your next steps. Share your details, upload the letter and hear back in one business day.',
  companyPlaceholder: 'Company name',
  emailPlaceholder: 'Email address',
  submit: 'Get started for $5',
  error: 'Please enter your company name and a valid email address, then try again.',
  done: 'Thanks! This sample form does not open a checkout. Your request was not sent anywhere.',
}

export default function MailPage() {
  useDocTitle('Agency mail review · Northwind')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // 'error' | 'done' | null

  const onSubmit = (e) => {
    e.preventDefault()
    const ok = company.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    setStatus(ok ? 'done' : 'error')
  }

  return (
    <div className="legacy flex flex-col" data-template="E">
      <div>
        <div className="overflow-hidden pb-44 pt-24">
          <div className="mx-auto max-w-xl px-4 lg:px-8">
            <div>
              <div className="flex flex-col items-center">
                <div className="lgbg-rose-700 lgc-white mb-8 mt-12 flex items-center justify-center rounded-full border-transparent">
                  <div className="lgc-white flex h-10 w-16 items-center justify-center rounded-l-full text-xs font-bold">{COPY.badge}</div>
                </div>
                <div className="mx-auto text-center">
                  <h1 className="lgc-black text-5xl font-extrabold tracking-tight">
                    <span className="block">{COPY.title}</span>
                  </h1>
                  <div className="lgb-gray-200 mt-6 flex rounded-lg border bg-green5/50 p-4">
                    <div className="lgb-gray-200 flex w-40 flex-none flex-col items-center border-r pr-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-full w-full items-center justify-center p-2">
                          <div className="lgc-zinc-800 text-4xl font-bold">{COPY.figure}</div>
                        </div>
                      </div>
                    </div>
                    <div className="lgc-black flex items-center justify-center pl-4 text-left text-sm">{COPY.info}</div>
                  </div>
                </div>
                <form className="mx-auto mt-6 w-full max-w-xl space-y-4" onSubmit={onSubmit} noValidate>
                  {status === 'error' && (
                    <div
                      role="alert"
                      className="w-full rounded border px-4 py-2 text-sm"
                      style={{ backgroundColor: 'var(--lg-red-100)', borderColor: 'var(--lg-red-200)', color: 'var(--lg-red-700)' }}
                    >
                      {COPY.error}
                    </div>
                  )}
                  {status === 'done' && (
                    // not in spec: success state (the original redirects to checkout). Built from the same banner shape.
                    <div role="status" className="lgbg-teal-100 lgb-teal-700 lgc-teal-700 w-full rounded border px-4 py-2 text-sm">
                      {COPY.done}
                    </div>
                  )}
                  <label htmlFor="company_name" className="sr-only">
                    {COPY.companyPlaceholder}
                  </label>
                  <input
                    id="company_name"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={COPY.companyPlaceholder}
                    className="lg-input lg-mail-input lgbg-gray-50 block w-full resize-none rounded-lg p-4 text-xl"
                  />
                  <label htmlFor="email" className="sr-only">
                    {COPY.emailPlaceholder}
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={COPY.emailPlaceholder}
                    className="lg-input lg-mail-input lgbg-gray-50 block w-full resize-none rounded-lg p-4 text-xl"
                  />
                  {/* measured on the original: `shadow-xl` (the spec text says shadow-sm) */}
                  <button
                    type="submit"
                    className="lg-mail-submit lgbg-rose-700 lgb-rose-700 lgc-white w-full whitespace-nowrap rounded-md border px-5 py-4 text-xl font-semibold shadow-xl"
                  >
                    {COPY.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
