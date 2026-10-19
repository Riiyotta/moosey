# Northwind clone — information architecture

React 18 + Vite + Tailwind v3 site whose design system was measured from mosey.com and rebuilt with a placeholder brand ("Northwind"), original copy and original art. Run it with `npm install && npm run dev` (port 5200).

## IA files

| File | Edit? | What it is |
|---|---|---|
| `ia.json` | **hand-edit this one only** | Categories, every section (defined once, with `implementedBy`), and every template with its routes and ordered section ids |
| `IA.md` | generated, don't edit | Readable doc: route share per template, chrome partition, sections by reuse, per-template tables, section reference |
| `matrix.csv` | generated, don't edit | Section × template matrix for a spreadsheet |
| `validate.mjs`, `build.mjs` | copied from the ia-builder skill, unchanged | Validator and generator, driven entirely by `ia.json` |

After changing routes or sections, edit `ia.json` and re-run:

```bash
node validate.mjs && node build.mjs
```

The compositions in `ia.json` were read from `src/routes.js`, `src/pages/*.jsx` and the data records that drive data-composed pages (`src/data/marketing/products.js`, `src/data/marketing-b/solutionDetails.js`, `src/data/content/guides.js`, `src/data/misc/partners.js`).

## What the data shows

- **1,825 routes, 34 templates, 70 sections.** 97% of routes (1,772) come from 3 templates: resource guide leaves (1,736), blog posts (30) and author pages (6). The real build effort was in the other 53 routes, which span 31 templates.
- **34 sections are shared and 36 are page-local.** Outside the header and footer, the most reused sections are the bottom CTA (21 templates, 1,801 routes), the configurable logo ticker (10 templates), GetStarted (8 templates, 14 routes) and the standalone CTA card (8 templates).
- **Four sections are implemented twice.** The guide pages use their own copies of the logo ticker, benefit cards, FeatureGroup and FAQ (`src/components/content/Guide*.jsx`, `content/FeatureGroup.jsx`) instead of the shared versions in `src/components/blocks/`. `ia.json` records both files in `implementedBy`. These copies are the first candidates for merging.
- **The homepage and the shared block library overlap.** There are two FAQs (the homepage's fixed question set, also used on pricing, solutions and payroll, versus the prop-driven `FaqVariant`), two logo tickers and two benefit-card styles. These are separate sections on purpose, because their geometry and behaviour differ, not because of duplication.

## Things to know before "fixing" a number

- The only classification axis is `chrome`. `home` (1 route) has the announcement banner; `inner` (1,824 routes) is header and footer only, as on the original.
- `/solutions/smb` renders the solutions overview (identical page on the original), so it is counted under that template.
- The 404 template is counted as one route (`/*`, the catch-all).
- Pages the original serves that the clone deliberately doesn't are not in the IA:
  - `/p/` (a 404 on the original)
  - `/home/` and `/404/` (broken empty shells)
  - `/sequoia-one/` (redirects home)
  - `/posts/` (test page)

  The blog has 30 sample posts rather than the original's 424.
