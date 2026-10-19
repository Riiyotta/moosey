# Changelog

## 0.1.0 — 2026-10-19
- Initial extraction for the Northwind (mosey) clone: 61 section contracts, 28 templates, 1824 concrete routes over 25 route patterns,
  215 foundation / 55 semantic tokens, 11 graph rules, 154 registered assets.
- Sources: CLONE_SPEC.md, specs/marketing.md, specs/content.md, specs/misc.md, ASSET_MANIFEST.md, public/assets/art/ART_MANIFEST.md, tailwind.config.cjs, src/**.
- Code composites split into single-purpose sections; composite ids recorded in `retiredSectionIds`.
- Admission (`extraction/verify_all.py`) and drift proof (`extraction/prove_drift.py`) added; stdlib draft-07 fallback validator added.
