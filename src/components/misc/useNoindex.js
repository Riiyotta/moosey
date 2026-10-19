import { useEffect } from 'react'

/** Partner / beta pages are `noindex,nofollow` on the original (specs/misc.md §0); set the meta while mounted. */
export function useNoindex(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    return () => meta.remove()
  }, [enabled])
}

/** Document title while mounted */
export function useDocTitle(title) {
  useEffect(() => {
    if (!title) return
    const prev = document.title
    document.title = title
    return () => {
      document.title = prev
    }
  }, [title])
}
