# Changelog

## 0.1.1 — 2026-10-19 (independent-verifier fixes)
- Asset protection is enforced, not just bookkept: protected roles are pinned by folder (`PATH_PINS` in verify_all.py) and cross-checked against
  `public/assets/art/ART_MANIFEST.md`; `referencedBy` evidence is recomputed (index.html included; the favicon is now correctly referenced).
- A section's top-level `assetRoles` must equal its image fields' roles; an image field must declare roles, and semantic_validate.py rejects
  every role when a field declares none.
- Code parity compares VALUES for fontFamily, spacing rule, borderRadius, boxShadow, backgroundImage, transitionDuration and
  transitionTimingFunction (new token `ease.menu-css`), with orphan detection for each; Splide ease and f() divisor parsed from code.
- Every foundation token without a code mapping carries a `valueCheck` (spec-only tokens checked against the spec text, frame durations
  against f(n)); button padding and container widths checked against CSS; hero tablet/mobile intervals and the 1,736 resource leaves
  re-derived from code with stdlib.
- Isolated copies report the total number of unresolved citations; spec citation anchors no longer quote the measured site's name.
- prove_drift.py: 60 -> 86 cases (one or more per fix), plus a standalone-copy reporting check.

## 0.1.0 — 2026-10-19
- Initial extraction for the Northwind clone (project folder `mosey`): 61 section contracts, 28 templates, 1824 concrete routes over 25 route patterns,
  216 foundation / 55 semantic tokens, 11 graph rules, 154 registered assets.
- Sources: CLONE_SPEC.md, specs/marketing.md, specs/content.md, specs/misc.md, ASSET_MANIFEST.md, public/assets/art/ART_MANIFEST.md, tailwind.config.cjs, src/**.
- Code composites split into single-purpose sections; composite ids recorded in `retiredSectionIds`.
- Admission (`extraction/verify_all.py`) and drift proof (`extraction/prove_drift.py`) added; stdlib draft-07 fallback validator added.
