/**
 * REDRAW (§2.4, §10): simple 24×24 outline icons, stroke 1.5, for the rose icon tiles; plus the
 * lime check, the mock-UI 13px glyphs and the modal close X. All original drawings.
 */
const PATHS = {
  globe: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3.5 9h17M3.5 15h17M12 3c2.5 2.5 3.5 5.5 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-5.5-3.5-9s1-6.5 3.5-9z',
  scale: 'M12 4v16M7 20h10M5 7h14M5 7l-2.5 6a2.5 2.5 0 0 0 5 0L5 7zM19 7l-2.5 6a2.5 2.5 0 0 0 5 0L19 7z',
  inbox: 'M3.5 13.5V6a1.5 1.5 0 0 1 1.5-1.5h14A1.5 1.5 0 0 1 20.5 6v7.5M3.5 13.5V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5v-4.5M3.5 13.5h5l1 2h5l1-2h5',
  stack: 'M12 3.5l8.5 4.5-8.5 4.5L3.5 8 12 3.5zM3.5 12l8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5',
  sliders: 'M4 7h10M18 7h2M4 17h4M12 17h8M16 5v4M10 15v4',
  monitor: 'M3.5 5.5h17v11h-17zM9 20h6M12 16.5V20',
  document: 'M7 3.5h7l4.5 4.5v12.5h-11.5zM14 3.5V8h4.5M9.5 13h5M9.5 16.5h5',
  refresh: 'M19.5 8A8 8 0 0 0 5 7.5M4.5 4v4h4M4.5 16A8 8 0 0 0 19 16.5M19.5 20v-4h-4',
  flag: 'M5 21V4M5 4.5h11l-2 4 2 4H5',
  calendar: 'M4 6.5h16v13.5H4zM4 10.5h16M8.5 4v4M15.5 4v4',
  chat: 'M4 5.5h16v10H10l-4 3.5v-3.5H4zM8 9.5h8M8 12.5h5',
  mail: 'M3.5 6h17v12h-17zM3.5 6.5l8.5 6.5 8.5-6.5',
  cog: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M5.6 18.4l1.8-1.8M16.6 7.4l1.8-1.8',
  badge: 'M12 3.5l2.2 1.6 2.7-.2.9 2.6 2.2 1.6-.9 2.6.9 2.6-2.2 1.6-.9 2.6-2.7-.2L12 20.5l-2.2-1.6-2.7.2-.9-2.6-2.2-1.6.9-2.6-.9-2.6 2.2-1.6.9-2.6 2.7.2zM9 12l2 2 4-4',
  login: 'M10 4.5H5v15h5M14 8l4 4-4 4M18 12H9',
  users: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 5.5a3 3 0 0 1 0 5.5M17.5 14.5c2 .6 3 2.3 3 5',
  receipt: 'M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5zM9 8h6M9 11.5h6M9 15h4',
}

export function OutlineIcon({ name, className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={PATHS[name] || PATHS.document} />
    </svg>
  )
}

/** 24px check (lime-500) — heroicons-style tick, REDRAW */
export function LimeCheck({ className = 'absolute h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${className} text-[color:var(--lg-lime-500)]`} aria-hidden="true">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

export function CloseX({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={className} aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

/** 13px glyphs inside the mock workflow card */
export function MiniGlyph({ name, className = 'h-full w-full' }) {
  const d = {
    receipt: 'M3 1.5h7v10l-1.2-.8-1.2.8-1.1-.8-1.2.8-1.1-.8L3 11.5zM4.8 4.5h3.4M4.8 6.8h3.4',
    people: 'M5 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM1.5 11c0-2 1.5-3.2 3.5-3.2S8.5 9 8.5 11M9 2.6a2 2 0 0 1 0 3.3M10 7.9c1 .4 1.6 1.4 1.6 3',
    building: 'M2 11.5V3l4.5-1.5v10M6.5 4.5H11v7M1 11.5h11M3.8 5h1M3.8 7.5h1M8.2 7h1M8.2 9.2h1',
    spark: 'M6.5 1v3M6.5 9v3M1 6.5h3M9 6.5h3M2.8 2.8l2 2M8.2 8.2l2 2M2.8 10.2l2-2M8.2 4.8l2-2',
    check: 'M3 6.8l2.2 2.2L10 4.2',
  }[name]
  return (
    <svg viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

/** 20px attribution divider (a slash), REDRAW */
export function SlashDivider({ className = '' }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.3 3h2.2L8.7 17H6.5z" />
    </svg>
  )
}
