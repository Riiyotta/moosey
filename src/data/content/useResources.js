import { useEffect, useState } from 'react'

/**
 * Lazy loader for the resource leaves (./resourceLeaves.js, ~1.7k records). The dynamic import keeps the
 * slug taxonomy and body templates out of the main bundle and the shared content chunk; once loaded the
 * module is cached, so later resource pages render synchronously.
 */
let loaded = null
let pending = null

export function loadResources() {
  pending ??= import('./resourceLeaves')
    .then((m) => (loaded = m))
    .catch((err) => {
      pending = null // allow a retry on the next navigation
      throw err
    })
  return pending
}

/** returns the resourceLeaves module, or null while it is loading */
export function useResources() {
  const [mod, setMod] = useState(loaded)
  useEffect(() => {
    if (mod) return undefined
    let alive = true
    loadResources().then(
      (m) => alive && setMod(m),
      (err) => console.error('Failed to load resource data', err),
    )
    return () => {
      alive = false
    }
  }, [mod])
  return mod
}
