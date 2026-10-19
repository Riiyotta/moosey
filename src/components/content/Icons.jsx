/** REDRAW icons from specs/content.md (paths verbatim; stroke widths default to the SVG default, as shipped). */

/** §1 btn-arrow icon: viewBox 16x14, rendered 16x14px fixed, stroke #C74E5C */
export function ArrowHookIcon() {
  return (
    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden="true" className="block h-[14px] w-[16px] shrink-0">
      <path d="M13 6l2 2m0 0-2 2m2-2H1V9.5" stroke="#C74E5C" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** §1 pagination arrows: viewBox 16x12, stroke #285D60; 12x12px (tablet/desktop), 12.4x9.8u (mobile) */
export function PageArrowIcon({ dir }) {
  const d =
    dir === 'prev'
      ? 'M15.2174 5.99994H1.30436m0 0L5.94205 1.13037M1.30436 5.99994 5.94205 10.8695'
      : 'M1.04346 5.99994H14.9565m0 0-4.6377-4.86957m4.6377 4.86957-4.6377 4.86956'
  return (
    <svg
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
      className="block h-[calc(var(--u)*9.8)] w-[calc(var(--u)*12.4)] shrink-0 md:h-[12px] md:w-[12px]"
    >
      <path d={d} stroke="#285D60" strokeLinecap="round" />
    </svg>
  )
}

/** §8.3 check bullet: 17x17, circle r 8.5 #203435 @ .2 + check stroke #285D60, round caps */
export function CheckBullet() {
  return (
    <svg viewBox="0 0 17 17" fill="none" aria-hidden="true" className="block h-17u w-17u">
      <circle cx="8.5" cy="8.5" r="8.5" fill="#203435" opacity=".2" />
      <path d="M6 8.66667 8.21053 11 12 7" stroke="#285D60" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
