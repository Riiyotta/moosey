import { useLayoutEffect, useRef } from 'react'

/** §1 Announcement banner — fixed px, static (scrolls away). Writes --banner-height. */
export default function Banner() {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const write = () => {
      if (ref.current) {
        document.documentElement.style.setProperty('--banner-height', `${ref.current.offsetHeight}px`)
      }
    }
    write()
    document.fonts?.ready.then(write)
    window.addEventListener('resize', write)
    return () => {
      window.removeEventListener('resize', write)
      // inner pages have no banner: header returns to its bannerless offset
      document.documentElement.style.setProperty('--banner-height', '0px')
    }
  }, [])

  return (
    <div ref={ref} id="announcement-banner" className="w-full bg-main-green px-4 py-2 text-center">
      {/* Original computes weight 400 but its 400 @font-face is the Medium file: keep 400, render Medium */}
      <p className="text-sm font-normal text-white md:text-base">
        <a href="#" className="underline">
          Northwind 2.0 is live
        </a>{' '}
        — See the new filing calendar and smarter deadline reminders!
      </p>
    </div>
  )
}
