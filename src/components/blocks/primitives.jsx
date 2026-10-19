import '../../styles/blocks.css'

/** §1.4 check icon, 17x17: circle #203435 @ 20% + #285D60 round-cap check (REDRAW) */
export function CheckIcon({ className = 'h-17u w-17u' }) {
  return (
    <svg viewBox="0 0 17 17" fill="none" aria-hidden="true" className={`block shrink-0 ${className}`}>
      <circle cx="8.5" cy="8.5" r="8.5" className="fill-main-green" opacity="0.2" />
      <path d="M5.4 8.7l2.2 2.2 4-4.3" className="stroke-green" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * Corner line art (REDRAW, stroke/fill #516B66): curves sweeping in from the outer edge and ending in a dot.
 * `size`: 'hero' = viewBox 272x170 (PageHero platform), 'wide' = 422x170 (HeroStatic), 'engine' = 210x198.
 * Mirror the right-hand copy with `-scale-x-100` on the className.
 */
const LINE_ART = {
  hero: {
    vb: '0 0 272 170',
    d: ['M0 70C70 70 92 157 160 157H265', 'M0 112C48 112 64 168 120 168H272', 'M0 30C96 30 104 120 200 128'],
    dot: [265, 157],
  },
  wide: {
    vb: '0 0 422 170',
    d: ['M0 62C110 62 150 157 260 157H415', 'M0 104C80 104 110 168 200 168H422', 'M0 22C150 22 170 118 320 124'],
    dot: [415, 157],
  },
  engine: {
    vb: '0 0 210 198',
    d: ['M0 40C80 40 110 99 203 99', 'M0 160C80 160 110 99 203 99', 'M0 99H203', 'M0 8C60 8 76 54 130 72'],
    dot: [203, 99],
  },
}
export function LineArt({ size = 'hero', className = '' }) {
  const a = LINE_ART[size]
  return (
    <svg viewBox={a.vb} fill="none" aria-hidden="true" preserveAspectRatio="none" className={className}>
      {a.d.map((d) => (
        <path key={d} d={d} className="stroke-line-art" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <circle cx={a.dot[0]} cy={a.dot[1]} r="4" className="fill-line-art" />
    </svg>
  )
}

/**
 * Rich title runs. `value` is a string, or an array of segments:
 *   'plain text' | { g: 'green text' } (span.text-green, #285D60) | '\n' (<br>)
 */
export function Rich({ value }) {
  if (!Array.isArray(value)) return value
  return value.map((part, i) => {
    if (part === '\n') return <br key={i} />
    if (part && typeof part === 'object')
      return (
        <span key={i} className="text-green">
          {part.g}
        </span>
      )
    return part
  })
}
