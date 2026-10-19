import { useMemo } from 'react'

/**
 * Original art from /public/assets/art, loaded as raw strings so it can be inlined.
 * Only the animatable files are inlined; static art (logos, avatars, icons) uses <img src>.
 */
const RAW = import.meta.glob(
  [
    '../../public/assets/art/{hero,everything,compliance,cta,benefits,roadmap,peace,footer}/*.svg',
    '../../public/assets/art/brand/northwind-logo*.svg',
  ],
  { query: '?raw', import: 'default', eager: true },
)
export const art = (path) => {
  const raw = RAW[`../../public/assets/art/${path}`]
  if (!raw) throw new Error(`Missing art: ${path}`)
  return raw
}
/** Public URL for static <img> art */
export const artUrl = (path) => `/assets/art/${path}`

/**
 * Inlines an SVG string so inner ids/classes are reachable by the Animation pass.
 *
 * Id scoping: every inner `id="x"` becomes `id="<uid>-x"` and also gets `data-id="x"`;
 * `url(#x)`, `href="#x"` and `data-line="x"` are rewritten to the prefixed id, so masks,
 * gradients and offset-path references keep working when the same file renders twice.
 * The root <svg> carries `data-svg="<uid>"`, so motion can target either
 * `#<uid>-row-1` or `[data-svg="<uid>"] [data-id="row-1"]`. Classes are untouched.
 *
 * The root's width/height are dropped; size comes from `className` (same box as before).
 */
export default function InlineSvg({ svg, uid, className = 'block h-full w-full', fit = 'meet', groupClassName, label }) {
  const { viewBox, fontFamily, inner } = useMemo(() => {
    const m = svg.match(/<svg([^>]*)>([\s\S]*)<\/svg>\s*$/)
    const attrs = Object.fromEntries([...m[1].matchAll(/([\w:-]+)="([^"]*)"/g)].map((a) => [a[1], a[2]]))
    let body = m[2]
      .replace(/<title>[\s\S]*?<\/title>/g, '')
      .replace(/(\s)id="([^"]+)"/g, `$1id="${uid}-$2" data-id="$2"`)
      .replace(/url\(#([^)]+)\)/g, `url(#${uid}-$1)`)
      .replace(/((?:xlink:)?href)="#([^"]+)"/g, `$1="#${uid}-$2"`)
      .replace(/data-line="([^"]+)"/g, `data-line="${uid}-$1"`)
    if (groupClassName) body = `<g class="${groupClassName}">${body}</g>`
    return { viewBox: attrs.viewBox, fontFamily: attrs['font-family'], inner: body }
  }, [svg, uid, groupClassName])

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fontFamily={fontFamily}
      preserveAspectRatio={`xMidYMid ${fit}`}
      className={className}
      data-svg={uid}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': 'true' })}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  )
}
