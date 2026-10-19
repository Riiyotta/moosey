/** REDRAW: simple 24px outline icons for the for-hr FeatureCardGrid (stroke = currentColor). Original drawings. */
const PATHS = {
  map: 'M9 4 3.5 6v14L9 18l6 2 5.5-2V4L15 6 9 4Zm0 0v14m6-12v14',
  people: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5 8c0-2.8 2.2-5 5-5s5 2.2 5 5M16 11a2.5 2.5 0 1 0 0-5M17.5 14.2c2 .6 3.5 2.5 3.5 4.8',
  calendar: 'M4 6.5h16V20H4zM4 10h16M8 4v4m8-4v4M8 14h3',
  shield: 'M12 3.5 5 6v5.5c0 4.2 3 7.6 7 9 4-1.4 7-4.8 7-9V6l-7-2.5Zm-3 8.8 2.2 2.2 4-4.3',
  document: 'M7 3.5h7l4 4V20.5H7zM14 3.5v4h4M9.5 12h6m-6 3.5h6',
  bell: 'M6 16.5V11a6 6 0 1 1 12 0v5.5l1.5 1.5h-15L6 16.5Zm4 3.5a2 2 0 0 0 4 0',
}

export function CardIcon({ name, className, style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className} style={style}>
      <path d={PATHS[name]} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * 16px icon after the ResourceList link (REDRAW). Spec §1.14 calls it a right chevron, but the live original
 * renders a right arrow, so the arrow is drawn here.
 */
export function LinkArrowRight({ className }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 8h11M9.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
