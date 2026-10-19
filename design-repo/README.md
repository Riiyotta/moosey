# Northwind (mosey clone) — Design Repo

Machine-validated design system for the React + Vite + Tailwind v3 clone in this project, structured per the design-repo BUILD-GUIDE.
Status: **design-review-pending** (`productionApproved: false`).

**Provenance.** The design system (unit, tokens, type scale, geometry, motion) was **measured from a third-party live marketing site**
(Playwright, 2026-10-16/19; the source is named on `CLONE_SPEC.md` line 1). The brand ("Northwind"), every word of copy, all art and every
customer/partner logo in this clone are **placeholders**: original SVGs and fictional wordmarks. Nothing here is approved for production, and
nothing from the measured site (its logos, photos, Lottie art, UI or copy) may be reproduced. See `assets/asset-roles.json`.

## Counts

- Sections: 61
- Templates: 28
- Routes: 1824
- Route patterns: 25
- Primitives: 16
- Components: 22
- Assets: 154
- Foundation tokens: 216
- Semantic tokens: 55
- Component tokens: 68
- Layout tokens: 13
- Rules: 11

Routes = concrete URL instances (blog posts 30, resource guide leaves 1,736, …; `*` excluded); route patterns = the `routePatterns` across templates (`src/routes.js` + `/` + `*`).

## Layout

- `tokens/00-foundation → 10-semantic → 20-component → 30-layout → themes`, and `tokens/llm/` (catalog, policy, allowlist)
- `primitives/`, `components/`, `sections/` (one contract per section type), `templates/templates.json` (structured, ordered nodes)
- `compatibility/graph.json` (rules with severity, adjacency, `granularityPolicy`, `sectionKinds`, retired ids), `assets/asset-roles.json`, `motion/motion-contract.json`
- `schema/` (draft-07 PageSpec schema, example, semantic validator, stdlib draft-07 fallback, adversarial suite), `extraction/` (citations, admission, drift proof)

The unit is **u**: `1u = 100vw/1440` (≥1025px), `100vw/768` (481–1024px), `100vw/320` (≤480px). Values are u unless written px
(the Tailwind-UI blocks, HubSpot look-alike forms and the legacy partner kit are fixed px).

## Sections are small, single-purpose retrieval units

Code-level composites are split into separate contracts (`retiredSectionIds` in the graph rejects the composite ids by name):
RoleTabs/BenefitGroup → `showcase.role-tabs` + `conversion.compliance-cta-card`; Pricing → `pricing.plan-cards` + `pricing.comparison-table`;
Engine → `feature.numbered-intro` + `feature.numbered-row`; resource lists → `hero.title-band` + `listing.resource-group`; legacy bands 4/5/8 →
band title + rows / image cards / logos + testimonial slider. FeatureGroup cards are one node per card (repeatable).

| Page family (template) | Sections, in order (`(x)` optional, `×≤n` repeatable) |
|---|---|
| Home (`template.home`, 1 route) | banner.announcement · shell.header · hero.home-tabs · proof.logo-marquee · intro.statement · showcase.everything-network · showcase.role-tabs · conversion.compliance-cta-card · feature.benefit-cards · showcase.roadmap · steps.peace-of-mind · proof.testimonials · pricing.plan-cards · pricing.comparison-table · faq.accordion · conversion.bottom-cta · shell.footer |
| Platform overview (`template.platform-overview`, 1 route) | shell.header · hero.page · feature.accordion-story ×≤3 · feature.checklist-row ×≤3 · feature.benefit-cards · proof.ecosystem · feature.numbered-intro · feature.numbered-row ×≤3 · conversion.bottom-cta · shell.footer |
| Platform product (`template.platform-product`, 2 routes) | shell.header · hero.page · proof.logo-marquee · feature.benefit-cards · (steps.get-started) · conversion.compliance-cta-card · feature.accordion-story · feature.checklist-row · (faq.accordion) · conversion.bottom-cta · shell.footer |
| Platform product: handbooks (`template.platform-product-handbooks`, 1 route) | shell.header · hero.page · feature.checklist-row · feature.benefit-cards · showcase.role-tabs · conversion.compliance-cta-card · steps.get-started · faq.accordion · conversion.bottom-cta · shell.footer |
| Platform product: entity compliance (`template.platform-product-entity`, 1 route) | shell.header · hero.static · proof.logo-marquee · showcase.scroll-tabs · conversion.compliance-cta-card · steps.get-started · feature.checklist-row · conversion.bottom-cta · shell.footer |
| Solutions overview (`template.solutions-overview`, 2 routes) | shell.header · hero.static · showcase.scroll-tabs · conversion.compliance-cta-card · proof.ecosystem · showcase.roadmap · feature.benefit-cards · proof.testimonials · steps.get-started · pricing.plan-cards · pricing.comparison-table · faq.accordion · conversion.bottom-cta · shell.footer |
| Solution detail (`template.solution-detail`, 1 route) | shell.header · hero.page · proof.logo-marquee · proof.problem-list · feature.card-grid · feature.benefit-cards · feature.accordion-story · conversion.compliance-cta-card · related.guide-list · steps.get-started · faq.accordion · conversion.bottom-cta · shell.footer |
| Solution detail: telehealth (`template.solution-detail-telehealth`, 1 route) | shell.header · hero.page · conversion.lead-form · proof.logo-marquee · feature.benefit-cards · conversion.compliance-cta-card · feature.checklist-row · proof.testimonials-lite · conversion.bottom-cta · shell.footer |
| Pricing (`template.pricing`, 1 route) | shell.header · pricing.plan-cards · pricing.comparison-table · faq.accordion · conversion.bottom-cta · shell.footer |
| About (`template.about`, 1 route) | shell.header · hero.about · intro.title-row · editorial.story-card · proof.logo-marquee · careers.job-list · conversion.bottom-cta · shell.footer |
| Security (`template.security`, 1 route) | shell.header · editorial.prose-article · shell.footer |
| Blog index (`template.blog-index`, 3 routes) | shell.header · hero.title-band · listing.post-rows · listing.pagination · conversion.bottom-cta · shell.footer |
| Blog post (`template.blog-post`, 30 routes) | shell.header · editorial.post-header · editorial.post-body · conversion.bottom-cta · shell.footer |
| Authors index (`template.authors-index`, 1 route) | shell.header · listing.author-list · shell.footer |
| Author detail (`template.author-detail`, 6 routes) | shell.header · hero.title-band · profile.author-bio · shell.footer |
| Resources index (`template.resources-index`, 1 route) | shell.header · hero.title-band · listing.resource-group ×≤9 · conversion.bottom-cta · shell.footer |
| Resource category hub (`template.resource-category`, 6 routes) | shell.header · hero.title-band · listing.resource-group ×≤2 · conversion.bottom-cta · shell.footer |
| Resource guide leaf (`template.resource-guide`, 1736 routes) | shell.header · editorial.post-header · editorial.post-body · (related.resource-link-grid ×≤2) · related.blog-teasers · conversion.bottom-cta · shell.footer |
| Gated guide landing (`template.guide-landing`, 8 routes) | shell.header · (hero.guide) · (feature.benefit-cards) · conversion.guide-form · (proof.logo-marquee) · (feature.accordion-story) · (faq.accordion) · (conversion.bottom-cta) · shell.footer |
| Subscribe thanks (`template.subscribe`, 1 route) | shell.header · confirmation.thanks · shell.footer |
| Partner landing A (legacy) (`template.partner-legacy`, 3 routes) | shell.header · legacy.hero · legacy.band-title · legacy.feature-row · legacy.workflow-row · legacy.feature-row · legacy.inset-row · legacy.feature-row · legacy.band-title · legacy.inset-row ×≤3 · legacy.band-title · legacy.image-card-pair · legacy.feature-row · legacy.everything-checklist · legacy.pricing-cards · legacy.customer-logos · legacy.testimonial-swiper · shell.footer |
| Sales tax beta (A′) (`template.sales-tax-beta`, 1 route) | shell.header · legacy.hero · legacy.band-title · legacy.feature-row · legacy.inset-row · legacy.feature-row · legacy.everything-checklist · conversion.request-invite-modal · shell.footer |
| Partner landing B (static) (`template.partner-static`, 6 routes) | shell.header · hero.static · feature.checklist-row ×≤3 · steps.get-started · proof.testimonials · pricing.plan-cards · pricing.comparison-table · conversion.bottom-cta · shell.footer |
| Partner landing C (platform partner) (`template.partner-platform`, 2 routes) | shell.header · hero.static · (intro.title-row) · (proof.logo-marquee) · (conversion.lead-form) · feature.accordion-story · steps.get-started · faq.accordion · conversion.compliance-cta-card · pricing.plan-cards · pricing.comparison-table · conversion.bottom-cta · shell.footer |
| Reinstatement (D) (`template.reinstatement`, 1 route) | shell.header · hero.static · feature.benefit-cards · feature.checklist-row · conversion.compliance-cta-card · steps.peace-of-mind · shell.footer |
| Agency mail checkout (E) (`template.mail`, 1 route) | shell.header · conversion.checkout-form · shell.footer |
| Legal / status prose (F) (`template.legal-prose`, 5 routes) | shell.header · editorial.prose-article · shell.footer |
| Not found (404) (`template.not-found`, 1 route) | shell.header · editorial.prose-article · shell.footer |

Every contract carries a `retrieval` block (label, kind, summary, keywords, page families), a `granularity` block (single responsibility,
recomputed copy/image/item capacity, named exception for long-form and link-directory sections) and `evidence` citations (spec + code).

**Not on the measured site, so not invented:** video, canvas, blog carousel/related posts, table of contents (`sectionKinds[*].observedSections = 0`).

## Asset protection

Generic decorative roles (`icon`, `illustration`, `background`, `animation`, `content-image`, `editorial-illustration`) may be regenerated.
Protected roles (`logo`, `customer-logo`, `partner-logo`, `avatar`, `author-photo`, `team-photo`, `product-screenshot`) are pinned to a policy,
may only appear in a section whose contract names them, and must carry `source: placeholder|supplied` in a PageSpec — even though every such
file in this clone is a fictional placeholder. An `asset` path in a PageSpec must exist in the registry with a compatible role.

## Motion

`motion/motion-contract.json`: 12 eases (CustomEase cubic-beziers from `src/motion/core.js`), frame durations `f(n)=n/60`, section activation
(`top bottom-=25%` + overrides), six pins (roadmap, peace, pricing, FeatureGroup, ScrollTabs, GetStarted), hero auto-advance (16.40 / 13.97 / 2.83 s),
marquee (width/10 px·s⁻¹), carousels, and a pinned reduced-motion fallback per pattern. Known gaps: accordion/hover CSS transitions and the
sales-tax modal have no reduced-motion handling (`none-implemented`).

## What is measured vs inferred

Values (colours, sizes, u geometry, durations, eases, copy budgets) are measured or derived from the specs and code, with `path:lines` + anchor
citations. Semantic role **names**, section **categories/kinds**, asset **roles** and the 404 template are inferred (`basis` / `inferredName` / `evidence.level`).
Word budgets follow `ceil(chars × 1.25 / 4.5)` from the spec's measured character lengths; fields without a measured length say `inferred`.
Deliberate clone deviations (renamed routes, mobile-stacked forms, btn-red hover) and unresolved items are listed in `extraction/measured-values.json`.

## Admit this repo

```
python3 extraction/verify_all.py      # files, entry points, counts, token/code parity, citations, pinned policies, schema, adversarial suite
python3 extraction/prove_drift.py     # injects each defect into a scratch copy and proves the matching check fails
```

Python stdlib only; `jsonschema` is used when installed, otherwise `schema/_draft7.py` (both engines are exercised by `verify_all.py`).
