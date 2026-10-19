import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CloseX } from './legacy/icons'

/**
 * §2.10 Request-invite modal (`#modal-container`, Template A′). Local stub: no network request.
 * Open:  overlay opacity 0 → .75, panel opacity 0 / translateY(16px) → 1 / 0, 300ms ease-out.
 * Close: overlay → .2, panel → 0 / 16px, 300ms ease-in, then `invisible`; fields reset after 300ms.
 * Open-state geometry (measured live): panel `my-auto w-full lg:max-w-lg` inside a flex column with
 * padding 16 16 80 → 512 wide at 1440, viewport − 32 below lg; overlay bg-gray-800 (#1F2937).
 */
const CONSUMER = /@(gmail|googlemail|yahoo|ymail|hotmail|outlook|live|aol|icloud|me|proton|protonmail)\./i
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)'
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)'

export default function RequestInviteModal({ open, onClose, copy }) {
  const [phase, setPhase] = useState('closed') // closed | enter | open | leave
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [error, setError] = useState(null) // 'email' | 'form' | null
  const [done, setDone] = useState(false)
  const emailRef = useRef(null)
  const returnFocus = useRef(null)

  useEffect(() => {
    let raf1, raf2, t
    if (open) {
      returnFocus.current = document.activeElement
      setPhase('enter')
      raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setPhase('open')
          emailRef.current?.focus({ preventScroll: true })
        })
      })
    } else {
      setPhase((p) => (p === 'closed' ? p : 'leave'))
      t = setTimeout(() => {
        setPhase('closed')
        setEmail('')
        setCompany('')
        setError(null)
        setDone(false)
        returnFocus.current?.focus?.({ preventScroll: true })
      }, 300)
    }
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      clearTimeout(t)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !company.trim()) return setError('form')
    if (CONSUMER.test(email)) return setError('email')
    setError(null)
    setDone(true) // stubbed submit (the original posts to an API)
  }

  if (typeof document === 'undefined') return null
  const shown = phase === 'open'
  const ease = phase === 'leave' ? EASE_IN : EASE_OUT

  return createPortal(
    <div
      id="modal-container"
      className={`legacy fixed inset-0 z-100 overflow-y-auto ${phase === 'closed' ? 'invisible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-hidden={phase === 'closed'}
    >
      <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center">
        <div
          id="modal-bg-overlay"
          className="lgbg-gray-800 fixed inset-0"
          style={{ opacity: shown ? 0.75 : phase === 'leave' ? 0.2 : 0, transition: `opacity 300ms ${ease}` }}
        />
        <div
          id="modal-el"
          className="lgbg-white relative my-auto inline-block w-full overflow-hidden rounded-lg text-left align-bottom shadow-xl lg:max-w-lg"
          style={{
            opacity: shown ? 1 : 0,
            transform: shown ? 'translateY(0)' : 'translateY(16px)',
            transition: `all 300ms ${ease}`,
          }}
        >
          <span>
            <button type="button" onClick={onClose} aria-label="Close" className="modal-close-button lg-modal-close float-right m-2 h-7 w-7">
              <CloseX className="h-7 w-7" />
            </button>
          </span>
          {!done ? (
            <div id="modal-content-form">
              <form id="request-invite-form" onSubmit={onSubmit} noValidate>
                <div className="lgbg-white px-4 pb-4 pt-5">
                  <div>
                    <div className="mt-2 w-full">
                      <h3 id="modal-title" className="text-center text-2xl font-bold tracking-tight text-green">
                        {copy.title}
                      </h3>
                      <div className="mb-4 mt-8">
                        {error === 'email' && (
                          <div className="mt-3 flex items-center text-xs" style={{ color: 'var(--lg-rose-700)' }} role="alert">
                            <ErrorGlyph />
                            <div>{copy.emailError}</div>
                          </div>
                        )}
                        <div className="mt-4">
                          <label htmlFor="modal-form-email" className="sr-only">
                            {copy.emailLabel}
                          </label>
                          <input
                            ref={emailRef}
                            id="modal-form-email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={copy.emailPlaceholder}
                            className="lg-input lgbg-pure-white rounded-md p-3 text-base shadow-sm"
                          />
                        </div>
                        <div className="mt-4">
                          <label htmlFor="modal-form-company_name" className="sr-only">
                            {copy.companyLabel}
                          </label>
                          <input
                            id="modal-form-company_name"
                            type="text"
                            autoComplete="organization"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder={copy.companyPlaceholder}
                            className="lg-input lgbg-pure-white rounded-md p-3 text-base shadow-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {error === 'form' && (
                    <div className="mt-3 flex items-center text-xs" style={{ color: 'var(--lg-rose-700)' }} role="alert">
                      <ErrorGlyph />
                      <div>{copy.formError}</div>
                    </div>
                  )}
                </div>
                <div className="lgbg-gray-50 px-4 py-3">
                  <div>
                    <button
                      type="submit"
                      id="modal-submit-button"
                      className="lg-modal-submit lgbg-rose-700 lgb-rose-700 lgc-white inline-flex w-full justify-center rounded-md border px-4 py-2 text-base font-bold shadow-sm"
                    >
                      {copy.submit}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div id="modal-content-success" className="h-72">
              <div className="lgbg-white px-4 pb-4 pt-5">
                <div>
                  {/* not in spec: success icon colours; built from the legacy lime-500 */}
                  <div className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(85,181,89,.15)', color: 'var(--lg-lime-500)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-2 text-center">
                    <h3 id="modal-title-success" className="lgc-gray-900 text-xl font-medium leading-6">
                      {copy.successTitle}
                    </h3>
                    <div className="mt-2">
                      <p className="lgc-gray-500 text-sm">{copy.successBody}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lgbg-gray-50 px-4 py-3">
                <button type="button" onClick={onClose} className="lgc-gray-900 text-base font-medium underline">
                  {copy.successClose}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function ErrorGlyph() {
  return (
    <span>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-1 h-4 w-4" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 16.5v.01" strokeLinecap="round" />
      </svg>
    </span>
  )
}
