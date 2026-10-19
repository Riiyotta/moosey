# /Users/riyaghosh/V3/mosey (src/routes.js + page compositions); original structure from mosey.com sitemap (2,220 URLs)

Source: /Users/riyaghosh/V3/mosey (src/routes.js + page compositions); original structure from mosey.com sitemap (2,220 URLs)
Status: **measured-from-codebase** · production approved: **false**
1825 routes · 34 templates · 70 unique sections

> Generated from `ia.json` by `build.mjs`. Edit the JSON, not this file.

## Shape of the site

The largest 3 templates (Resource guide leaf, Blog post, Author detail) account for 1772 of 1825 routes (97%). The remaining 53 routes span 31 templates.

| template | routes | share |
|---|---:|---:|
| Resource guide leaf | 1736 | 95% |
| Blog post | 30 | 2% |
| Author detail | 6 | 0% |
| Resource category hub | 6 | 0% |
| Partner landing B — static | 6 | 0% |
| Legal / status prose | 5 | 0% |
| Guide landing — full stack | 4 | 0% |
| Blog index | 3 | 0% |
| Partner landing A — legacy kit | 3 | 0% |
| Solutions overview | 2 | 0% |
| Home | 1 | 0% |
| Platform overview | 1 | 0% |
| Product page — payroll | 1 | 0% |
| Product page — tax | 1 | 0% |
| Product page — handbooks | 1 | 0% |
| Product page — entity | 1 | 0% |
| Solution detail — HR | 1 | 0% |
| Solution detail — telehealth | 1 | 0% |
| Pricing | 1 | 0% |
| About | 1 | 0% |
| Security | 1 | 0% |
| Authors index | 1 | 0% |
| Resources index | 1 | 0% |
| Guide landing — report | 1 | 0% |
| Guide landing — hero, form, logos | 1 | 0% |
| Guide landing — hero and form | 1 | 0% |
| Guide landing — newsletter form only | 1 | 0% |
| Subscribe confirmation | 1 | 0% |
| Partner landing C1 — platform partner with intro row | 1 | 0% |
| Partner landing C2 — platform partner with lead form | 1 | 0% |
| Sales-tax beta (cut-down legacy) | 1 | 0% |
| Mail handling sign-up | 1 | 0% |
| Reinstatement landing | 1 | 0% |
| 404 | 1 | 0% |

## Page chrome

**1 routes carry chrome = `home`** — Home.

**1824 routes carry chrome = `inner`** — Platform overview, Product page — payroll, Product page — tax, Product page — handbooks, Product page — entity, Solutions overview, Solution detail — HR, Solution detail — telehealth, Pricing, About, Security, Blog index, Blog post, Authors index, Author detail, Resources index, Resource category hub, Resource guide leaf, Guide landing — full stack, Guide landing — report, Guide landing — hero, form, logos, Guide landing — hero and form, Guide landing — newsletter form only, Subscribe confirmation, Partner landing A — legacy kit, Partner landing B — static, Partner landing C1 — platform partner with intro row, Partner landing C2 — platform partner with lead form, Sales-tax beta (cut-down legacy), Mail handling sign-up, Reinstatement landing, Legal / status prose, 404.

## Sections by reuse

How widely a section is shared determines whether it belongs in a shared
component library or stays local to its page.

| section | category | templates | routes | implementation | scope |
|---|---|---:|---:|---|---|
| `shell.header` | SHELL | 34 | 1825 | `src/components/Navbar.jsx` | Every route (all 1825). |
| `shell.footer` | SHELL | 34 | 1825 | `src/components/Footer.jsx` | Every route (all 1825). |
| `conversion.bottom-cta` | CONVERSION | 21 | 1801 | `src/components/BottomCta.jsx` | Most routes; absent only on security, legal/status, subscribe, authors, mail, sales-tax beta, legacy partner pages and the two short guides. |
| `hero.post-header` | HERO | 2 | 1766 | `src/components/content/PostHeader.jsx` | Blog posts and resource guide leaves (1766 routes). |
| `content.prose` | CONTENT | 2 | 1766 | `src/components/content/Prose.jsx` | Blog posts and resource guide leaves (1766 routes). |
| `conversion.inline-cta` | CONVERSION | 1 | 1736 | `src/components/content/InlineCtaCard.jsx` | Resource guide leaves (1736 routes). |
| `directory.related-links` | DIRECTORY | 1 | 1736 | `src/components/content/ResourceLinkGrid.jsx` | Resource guide leaves (1736 routes). |
| `directory.blog-teasers` | DIRECTORY | 1 | 1736 | `src/components/content/BlogTeaserList.jsx` | Resource guide leaves (1736 routes). |
| `narrative.get-started` | NARRATIVE | 8 | 14 | `src/components/blocks/GetStarted.jsx` | Payroll, handbooks and entity products, solutions overview (+smb), for-hr and all static and platform partner pages (14 routes). |
| `proof.logo-ticker` | PROOF | 10 | 13 | `src/components/blocks/LogoMarquee.jsx; guides use a copy in content/GuideTrusted.jsx` | Payroll, tax and entity products, for-hr, telehealth, about, the lead-form platform partner page, and every guide that includes a trusted strip (13 routes). |
| `hero.static` | HERO | 6 | 12 | `src/components/blocks/HeroStatic.jsx` | Entity product, solutions overview (+smb), reinstatement, and every static and platform partner page (12 routes). |
| `commerce.pricing` | COMMERCE | 6 | 12 | `src/components/Pricing.jsx` | Homepage, pricing, solutions overview (+smb), and every static and platform partner page (12 routes). |
| `proof.benefit-cards` | PROOF | 7 | 10 | `src/components/blocks/BenefitsVariant.jsx; guides use a copy in content/GuideBenefits.jsx` | Payroll, tax and handbooks products, for-hr, telehealth, reinstatement and the full-stack guides (10 routes). |
| `narrative.feature-group` | NARRATIVE | 7 | 10 | `src/components/blocks/FeatureGroup.jsx; guides use a copy in content/FeatureGroup.jsx` | Platform overview, payroll and tax products, for-hr, both platform partner pages and the full-stack guides (10 routes). |
| `features.feature-list-animated` | FEATURES | 4 | 9 | `src/components/blocks/FeatureList.jsx (variant A)` | Platform overview, handbooks product, reinstatement and the static partner pages (9 routes). |
| `proof.testimonials` | PROOF | 3 | 9 | `src/components/Testimonials.jsx` | Homepage, solutions overview (+smb) and the static partner pages (9 routes). |
| `hero.title-band` | HERO | 2 | 9 | `src/components/content/PageTitleBand.jsx` | Blog index pages and author detail pages (9 routes). |
| `conversion.cta-card` | CONVERSION | 8 | 8 | `src/components/blocks/GenericCta.jsx` | Payroll, tax and entity products, for-hr, telehealth, reinstatement and both platform partner pages (8 routes). |
| `conversion.guide-form` | CONVERSION | 5 | 8 | `src/components/content/GuideFormSection.jsx` | All 8 guide landings. |
| `hero.guide` | HERO | 4 | 7 | `src/components/content/GuideHero.jsx` | Every guide landing except the form-only newsletter guide (7 routes). |
| `directory.resource-links` | DIRECTORY | 2 | 7 | `src/components/content/ResourceList.jsx` | Resources index and every category hub (7 routes). |
| `content.author-profile` | CONTENT | 1 | 6 | `src/pages/AuthorDetail.jsx` | Author detail pages (6 routes). |
| `hero.page-landing` | HERO | 5 | 5 | `src/components/blocks/PageHero.jsx (variant landing)` | Payroll, tax and handbooks product pages plus the for-hr and for-telehealth solution pages (5 routes). |
| `conversion.faq-home` | CONVERSION | 4 | 5 | `src/components/Faq.jsx` | Homepage, pricing, solutions overview (+smb) and payroll product (5 routes). |
| `conversion.faq-guide` | CONVERSION | 2 | 5 | `src/components/content/GuideFaq.jsx` | Full-stack guides and the report guide (5 routes). |
| `content.legal-prose` | CONTENT | 1 | 5 | `src/pages/Legal.jsx` | Four legal documents and status (5 routes). |
| `features.feature-list-static` | FEATURES | 4 | 4 | `src/components/blocks/FeatureList.jsx (variant B)` | Payroll, tax and entity products and telehealth (4 routes). |
| `conversion.faq` | CONVERSION | 4 | 4 | `src/components/blocks/FaqVariant.jsx; guides use a copy in content/GuideFaq.jsx` | Handbooks product, for-hr and both platform partner pages (4 routes). |
| `proof.benefit-stats` | PROOF | 3 | 4 | `src/components/Benefits.jsx` | Homepage, platform overview and solutions overview (+smb) (4 routes). |
| `hero.legacy-cobrand` | LEGACY | 2 | 4 | `src/components/misc/legacy/LegacyKit.jsx > LegacyHero` | Legacy partner pages and the sales-tax beta page (4 routes). |
| `legacy.intro-strip` | LEGACY | 2 | 4 | `src/components/misc/legacy/LegacyKit.jsx > IntroStrip` | Legacy partner pages and sales-tax beta (4 routes). |
| `legacy.shot-row` | LEGACY | 2 | 4 | `src/components/misc/legacy/LegacyKit.jsx > ShotRow` | Legacy partner pages and sales-tax beta (4 routes). |
| `legacy.inset-row` | LEGACY | 2 | 4 | `src/components/misc/legacy/LegacyKit.jsx > InsetRow` | Legacy partner pages and sales-tax beta (4 routes). |
| `legacy.everything-band` | LEGACY | 2 | 4 | `src/components/misc/legacy/LegacyKit.jsx > EverythingBand` | Legacy partner pages and sales-tax beta (4 routes). |
| `features.ecosystem` | FEATURES | 2 | 3 | `src/components/blocks/Ecosystem.jsx` | Platform overview and solutions overview (+smb) (3 routes). |
| `narrative.roadmap` | NARRATIVE | 2 | 3 | `src/components/Roadmap.jsx` | Homepage and solutions overview (+smb) (3 routes). |
| `narrative.scroll-tabs` | NARRATIVE | 2 | 3 | `src/components/blocks/ScrollTabs.jsx` | Entity product and solutions overview (+smb) (3 routes). |
| `commerce.legacy-pricing` | LEGACY | 1 | 3 | `src/components/misc/legacy/LegacyKit.jsx > PricingBand` | Legacy partner pages only (3 routes). |
| `directory.post-list` | DIRECTORY | 1 | 3 | `src/components/content/ListRows.jsx > ListPosts` | Blog index pages (3 routes). |
| `directory.pagination` | DIRECTORY | 1 | 3 | `src/components/content/Pagination.jsx` | Blog index pages (3 routes). |
| `legacy.workflow` | LEGACY | 1 | 3 | `src/components/misc/legacy/LegacyKit.jsx > WorkflowRow` | Legacy partner pages only (3 routes). |
| `legacy.always-current` | LEGACY | 1 | 3 | `src/components/misc/legacy/LegacyKit.jsx > AlwaysCurrentBand` | Legacy partner pages only (3 routes). |
| `legacy.collaborate` | LEGACY | 1 | 3 | `src/components/misc/legacy/LegacyKit.jsx > CollaborateBand` | Legacy partner pages only (3 routes). |
| `legacy.about` | LEGACY | 1 | 3 | `src/components/misc/legacy/LegacyKit.jsx > AboutBand` | Legacy partner pages only (3 routes). |
| `narrative.peace-steps` | NARRATIVE | 2 | 2 | `src/components/PeaceOfMind.jsx` | Homepage and reinstatement (2 routes). |
| `conversion.lead-form` | CONVERSION | 2 | 2 | `src/components/blocks/LeadForm.jsx` | Telehealth and platform partner C2 (2 routes). |
| `shell.announcement-banner` | SHELL | 1 | 1 | `src/components/Banner.jsx` | Homepage only (1 route). |
| `hero.home-tabs` | HERO | 1 | 1 | `src/components/Hero.jsx` | Homepage only. |
| `hero.page-platform` | HERO | 1 | 1 | `src/components/blocks/PageHero.jsx (variant platform)` | Platform overview only. |
| `hero.about` | HERO | 1 | 1 | `src/components/marketing/about/AboutHero.jsx` | About page only. |
| `proof.logo-ticker-home` | PROOF | 1 | 1 | `src/components/LogoMarquee.jsx` | Homepage only. |
| `proof.testimonials-lite` | PROOF | 1 | 1 | `src/components/marketing/TestimonialsLite.jsx` | Telehealth solution page only. |
| `features.statement` | FEATURES | 1 | 1 | `src/components/Statement.jsx` | Homepage only. |
| `features.everything` | FEATURES | 1 | 1 | `src/components/Everything.jsx` | Homepage only. |
| `features.role-tabs` | FEATURES | 1 | 1 | `src/components/RoleTabs.jsx` | Homepage only. |
| `features.benefit-group` | FEATURES | 1 | 1 | `src/components/blocks/BenefitGroup.jsx` | Handbooks product only. |
| `features.engine` | FEATURES | 1 | 1 | `src/components/blocks/Engine.jsx` | Platform overview only. |
| `features.problem-list` | FEATURES | 1 | 1 | `src/components/marketing/ProblemList.jsx` | For-hr solution page only. |
| `features.card-grid` | FEATURES | 1 | 1 | `src/components/marketing/FeatureCardGrid.jsx` | For-hr solution page only. |
| `features.guide-covers` | FEATURES | 1 | 1 | `src/components/marketing/ResourceList.jsx` | For-hr solution page only. |
| `features.intro-row` | FEATURES | 1 | 1 | `src/components/misc/PlatformPartnerPage.jsx > IntroRow` | Platform partner C1 only. |
| `conversion.invite-modal` | LEGACY | 1 | 1 | `src/components/misc/RequestInviteModal.jsx` | Sales-tax beta page only. |
| `conversion.mail-signup` | CONVERSION | 1 | 1 | `src/pages/MailPage.jsx` | Mail page only. |
| `content.inner-post` | CONTENT | 1 | 1 | `src/components/marketing/InnerPost.jsx` | Security page only. |
| `content.not-found` | CONTENT | 1 | 1 | `src/pages/NotFound.jsx` | Catch-all route for unknown URLs (1 route). |
| `content.about-intro` | CONTENT | 1 | 1 | `src/components/marketing/about/TitleWithDesc.jsx` | About page only. |
| `content.our-story` | CONTENT | 1 | 1 | `src/components/marketing/about/OurStory.jsx` | About page only. |
| `content.careers` | CONTENT | 1 | 1 | `src/components/marketing/about/Careers.jsx` | About page only. |
| `content.thanks` | CONTENT | 1 | 1 | `src/pages/Subscribe.jsx` | Subscribe page only. |
| `directory.author-list` | DIRECTORY | 1 | 1 | `src/pages/Authors.jsx` | Authors index only. |

**34 shared sections** appear in more than one template and belong in a component library.

**36 single-use sections** appear in exactly one template. Building these
as "reusable" components up front would be speculative — keep them page-local
until a second caller actually appears.

## Templates

### Home — `template.home`

1 route · `/` · chrome: **home**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | SHELL | `shell.announcement-banner` | page-local |
| 3 | HERO | `hero.home-tabs` | page-local |
| 4 | PROOF | `proof.logo-ticker-home` | page-local |
| 5 | FEATURES | `features.statement` | page-local |
| 6 | FEATURES | `features.everything` | page-local |
| 7 | FEATURES | `features.role-tabs` | page-local |
| 8 | PROOF | `proof.benefit-stats` | shared ×3 |
| 9 | NARRATIVE | `narrative.roadmap` | shared ×2 |
| 10 | NARRATIVE | `narrative.peace-steps` | shared ×2 |
| 11 | PROOF | `proof.testimonials` | shared ×3 |
| 12 | COMMERCE | `commerce.pricing` | shared ×6 |
| 13 | CONVERSION | `conversion.faq-home` | shared ×4 |
| 14 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 15 | SHELL | `shell.footer` | shared ×34 |

### Platform overview — `template.platform`

1 route · `/platform` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.page-platform` | page-local |
| 3 | NARRATIVE | `narrative.feature-group` | shared ×7 |
| 4 | FEATURES | `features.feature-list-animated` | shared ×4 |
| 5 | PROOF | `proof.benefit-stats` | shared ×3 |
| 6 | FEATURES | `features.ecosystem` | shared ×2 |
| 7 | FEATURES | `features.engine` | page-local |
| 8 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 9 | SHELL | `shell.footer` | shared ×34 |

### Product page — payroll — `template.product-payroll`

1 route · `/platform/payroll-compliance` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.page-landing` | shared ×5 |
| 3 | PROOF | `proof.logo-ticker` | shared ×10 |
| 4 | PROOF | `proof.benefit-cards` | shared ×7 |
| 5 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 6 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 7 | NARRATIVE | `narrative.feature-group` | shared ×7 |
| 8 | FEATURES | `features.feature-list-static` | shared ×4 |
| 9 | CONVERSION | `conversion.faq-home` | shared ×4 |
| 10 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 11 | SHELL | `shell.footer` | shared ×34 |

### Product page — tax — `template.product-tax`

1 route · `/platform/tax-compliance` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.page-landing` | shared ×5 |
| 3 | PROOF | `proof.logo-ticker` | shared ×10 |
| 4 | PROOF | `proof.benefit-cards` | shared ×7 |
| 5 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 6 | NARRATIVE | `narrative.feature-group` | shared ×7 |
| 7 | FEATURES | `features.feature-list-static` | shared ×4 |
| 8 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 9 | SHELL | `shell.footer` | shared ×34 |

### Product page — handbooks — `template.product-handbooks`

1 route · `/platform/handbooks` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.page-landing` | shared ×5 |
| 3 | FEATURES | `features.feature-list-animated` | shared ×4 |
| 4 | PROOF | `proof.benefit-cards` | shared ×7 |
| 5 | FEATURES | `features.benefit-group` | page-local |
| 6 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 7 | CONVERSION | `conversion.faq` | shared ×4 |
| 8 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 9 | SHELL | `shell.footer` | shared ×34 |

### Product page — entity — `template.product-entity`

1 route · `/platform/entity-compliance` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.static` | shared ×6 |
| 3 | PROOF | `proof.logo-ticker` | shared ×10 |
| 4 | NARRATIVE | `narrative.scroll-tabs` | shared ×2 |
| 5 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 6 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 7 | FEATURES | `features.feature-list-static` | shared ×4 |
| 8 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 9 | SHELL | `shell.footer` | shared ×34 |

### Solutions overview — `template.solutions`

2 routes · `/solutions`, `/solutions/smb` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.static` | shared ×6 |
| 3 | NARRATIVE | `narrative.scroll-tabs` | shared ×2 |
| 4 | FEATURES | `features.ecosystem` | shared ×2 |
| 5 | NARRATIVE | `narrative.roadmap` | shared ×2 |
| 6 | PROOF | `proof.benefit-stats` | shared ×3 |
| 7 | PROOF | `proof.testimonials` | shared ×3 |
| 8 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 9 | COMMERCE | `commerce.pricing` | shared ×6 |
| 10 | CONVERSION | `conversion.faq-home` | shared ×4 |
| 11 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 12 | SHELL | `shell.footer` | shared ×34 |

### Solution detail — HR — `template.solution-for-hr`

1 route · `/solutions/for-hr` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.page-landing` | shared ×5 |
| 3 | PROOF | `proof.logo-ticker` | shared ×10 |
| 4 | FEATURES | `features.problem-list` | page-local |
| 5 | FEATURES | `features.card-grid` | page-local |
| 6 | PROOF | `proof.benefit-cards` | shared ×7 |
| 7 | NARRATIVE | `narrative.feature-group` | shared ×7 |
| 8 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 9 | FEATURES | `features.guide-covers` | page-local |
| 10 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 11 | CONVERSION | `conversion.faq` | shared ×4 |
| 12 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 13 | SHELL | `shell.footer` | shared ×34 |

### Solution detail — telehealth — `template.solution-telehealth`

1 route · `/solutions/for-telehealth` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.page-landing` | shared ×5 |
| 3 | CONVERSION | `conversion.lead-form` | shared ×2 |
| 4 | PROOF | `proof.logo-ticker` | shared ×10 |
| 5 | PROOF | `proof.benefit-cards` | shared ×7 |
| 6 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 7 | FEATURES | `features.feature-list-static` | shared ×4 |
| 8 | PROOF | `proof.testimonials-lite` | page-local |
| 9 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 10 | SHELL | `shell.footer` | shared ×34 |

### Pricing — `template.pricing`

1 route · `/pricing` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | COMMERCE | `commerce.pricing` | shared ×6 |
| 3 | CONVERSION | `conversion.faq-home` | shared ×4 |
| 4 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 5 | SHELL | `shell.footer` | shared ×34 |

### About — `template.about`

1 route · `/about` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.about` | page-local |
| 3 | CONTENT | `content.about-intro` | page-local |
| 4 | CONTENT | `content.our-story` | page-local |
| 5 | PROOF | `proof.logo-ticker` | shared ×10 |
| 6 | CONTENT | `content.careers` | page-local |
| 7 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 8 | SHELL | `shell.footer` | shared ×34 |

### Security — `template.security`

1 route · `/security` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | CONTENT | `content.inner-post` | page-local |
| 3 | SHELL | `shell.footer` | shared ×34 |

### Blog index — `template.blog-index`

3 routes · `/blog`, `/blog/page/2`, `/blog/page/3` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.title-band` | shared ×2 |
| 3 | DIRECTORY | `directory.post-list` | page-local |
| 4 | DIRECTORY | `directory.pagination` | page-local |
| 5 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 6 | SHELL | `shell.footer` | shared ×34 |

### Blog post — `template.blog-post`

30 routes · `/blog/{slug}` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.post-header` | shared ×2 |
| 3 | CONTENT | `content.prose` | shared ×2 |
| 4 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 5 | SHELL | `shell.footer` | shared ×34 |

### Authors index — `template.authors`

1 route · `/authors` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | DIRECTORY | `directory.author-list` | page-local |
| 3 | SHELL | `shell.footer` | shared ×34 |

### Author detail — `template.author-detail`

6 routes · `/authors/{author}` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.title-band` | shared ×2 |
| 3 | CONTENT | `content.author-profile` | page-local |
| 4 | SHELL | `shell.footer` | shared ×34 |

### Resources index — `template.resources`

1 route · `/resources` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | DIRECTORY | `directory.resource-links` | shared ×2 |
| 3 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 4 | SHELL | `shell.footer` | shared ×34 |

### Resource category hub — `template.resource-category`

6 routes · `/resources/us/payroll`, `/resources/us/employee-handbook`, `/resources/us/secretary-of-state`, `/resources/us/sales-tax`, `/resources/us/agencies`, `/resources/us/local-payroll` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | DIRECTORY | `directory.resource-links` | shared ×2 |
| 3 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 4 | SHELL | `shell.footer` | shared ×34 |

### Resource guide leaf — `template.resource-guide`

1736 routes · `/resources/us/{category}/{leaf}` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.post-header` | shared ×2 |
| 3 | CONTENT | `content.prose` | shared ×2 |
| 4 | CONVERSION | `conversion.inline-cta` | page-local |
| 5 | DIRECTORY | `directory.related-links` | page-local |
| 6 | DIRECTORY | `directory.blog-teasers` | page-local |
| 7 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 8 | SHELL | `shell.footer` | shared ×34 |

### Guide landing — full stack — `template.guide-full`

4 routes · `/p/multi-state-hiring-guide`, `/p/payroll-setup-playbook`, `/p/remote-team-handbook-guide`, `/p/entity-upkeep-guide` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.guide` | shared ×4 |
| 3 | PROOF | `proof.benefit-cards` | shared ×7 |
| 4 | CONVERSION | `conversion.guide-form` | shared ×5 |
| 5 | PROOF | `proof.logo-ticker` | shared ×10 |
| 6 | NARRATIVE | `narrative.feature-group` | shared ×7 |
| 7 | CONVERSION | `conversion.faq-guide` | shared ×2 |
| 8 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 9 | SHELL | `shell.footer` | shared ×34 |

### Guide landing — report — `template.guide-report`

1 route · `/p/state-compliance-outlook` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.guide` | shared ×4 |
| 3 | CONVERSION | `conversion.guide-form` | shared ×5 |
| 4 | PROOF | `proof.logo-ticker` | shared ×10 |
| 5 | CONVERSION | `conversion.faq-guide` | shared ×2 |
| 6 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 7 | SHELL | `shell.footer` | shared ×34 |

### Guide landing — hero, form, logos — `template.guide-trusted`

1 route · `/p/registration-health-check` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.guide` | shared ×4 |
| 3 | CONVERSION | `conversion.guide-form` | shared ×5 |
| 4 | PROOF | `proof.logo-ticker` | shared ×10 |
| 5 | SHELL | `shell.footer` | shared ×34 |

### Guide landing — hero and form — `template.guide-short`

1 route · `/p/switching-payroll-providers-guide` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.guide` | shared ×4 |
| 3 | CONVERSION | `conversion.guide-form` | shared ×5 |
| 4 | SHELL | `shell.footer` | shared ×34 |

### Guide landing — newsletter form only — `template.guide-newsletter`

1 route · `/p/compliance-newsletter` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | CONVERSION | `conversion.guide-form` | shared ×5 |
| 3 | SHELL | `shell.footer` | shared ×34 |

### Subscribe confirmation — `template.subscribe`

1 route · `/subscribe` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | CONTENT | `content.thanks` | page-local |
| 3 | SHELL | `shell.footer` | shared ×34 |

### Partner landing A — legacy kit — `template.partner-legacy`

3 routes · `/partners/brightpath-payroll`, `/partners/tidewater-hr`, `/partners/kitebird-people` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | LEGACY | `hero.legacy-cobrand` | shared ×2 |
| 3 | LEGACY | `legacy.intro-strip` | shared ×2 |
| 4 | LEGACY | `legacy.shot-row` | shared ×2 |
| 5 | LEGACY | `legacy.workflow` | page-local |
| 6 | LEGACY | `legacy.inset-row` | shared ×2 |
| 7 | LEGACY | `legacy.always-current` | page-local |
| 8 | LEGACY | `legacy.collaborate` | page-local |
| 9 | LEGACY | `legacy.everything-band` | shared ×2 |
| 10 | LEGACY | `commerce.legacy-pricing` | page-local |
| 11 | LEGACY | `legacy.about` | page-local |
| 12 | SHELL | `shell.footer` | shared ×34 |

### Partner landing B — static — `template.partner-static`

6 routes · `/partners/halcyon-hr`, `/partners/larkspur-legal`, `/partners/ashgrove-equity`, `/partners/meadowbrook-fractional`, `/partners/thistle-learning`, `/partners/copperleaf-benefits` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.static` | shared ×6 |
| 3 | FEATURES | `features.feature-list-animated` | shared ×4 |
| 4 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 5 | PROOF | `proof.testimonials` | shared ×3 |
| 6 | COMMERCE | `commerce.pricing` | shared ×6 |
| 7 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 8 | SHELL | `shell.footer` | shared ×34 |

### Partner landing C1 — platform partner with intro row — `template.partner-platform-intro`

1 route · `/partners/juniper-launch` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.static` | shared ×6 |
| 3 | FEATURES | `features.intro-row` | page-local |
| 4 | NARRATIVE | `narrative.feature-group` | shared ×7 |
| 5 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 6 | CONVERSION | `conversion.faq` | shared ×4 |
| 7 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 8 | COMMERCE | `commerce.pricing` | shared ×6 |
| 9 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 10 | SHELL | `shell.footer` | shared ×34 |

### Partner landing C2 — platform partner with lead form — `template.partner-platform-form`

1 route · `/partners/juniper-startups` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.static` | shared ×6 |
| 3 | PROOF | `proof.logo-ticker` | shared ×10 |
| 4 | CONVERSION | `conversion.lead-form` | shared ×2 |
| 5 | NARRATIVE | `narrative.feature-group` | shared ×7 |
| 6 | NARRATIVE | `narrative.get-started` | shared ×8 |
| 7 | CONVERSION | `conversion.faq` | shared ×4 |
| 8 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 9 | COMMERCE | `commerce.pricing` | shared ×6 |
| 10 | CONVERSION | `conversion.bottom-cta` | shared ×21 |
| 11 | SHELL | `shell.footer` | shared ×34 |

### Sales-tax beta (cut-down legacy) — `template.sales-tax-beta`

1 route · `/sales-tax-beta` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | LEGACY | `hero.legacy-cobrand` | shared ×2 |
| 3 | LEGACY | `legacy.intro-strip` | shared ×2 |
| 4 | LEGACY | `legacy.shot-row` | shared ×2 |
| 5 | LEGACY | `legacy.inset-row` | shared ×2 |
| 6 | LEGACY | `legacy.everything-band` | shared ×2 |
| 7 | LEGACY | `conversion.invite-modal` | page-local |
| 8 | SHELL | `shell.footer` | shared ×34 |

### Mail handling sign-up — `template.mail`

1 route · `/mail` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | CONVERSION | `conversion.mail-signup` | page-local |
| 3 | SHELL | `shell.footer` | shared ×34 |

### Reinstatement landing — `template.reinstatement`

1 route · `/reinstatement` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | HERO | `hero.static` | shared ×6 |
| 3 | PROOF | `proof.benefit-cards` | shared ×7 |
| 4 | FEATURES | `features.feature-list-animated` | shared ×4 |
| 5 | CONVERSION | `conversion.cta-card` | shared ×8 |
| 6 | NARRATIVE | `narrative.peace-steps` | shared ×2 |
| 7 | SHELL | `shell.footer` | shared ×34 |

### Legal / status prose — `template.legal`

5 routes · `/legal/privacy-policy`, `/legal/terms-of-service`, `/legal/data-processing-agreement`, `/legal/gdpr-subprocessors`, `/status` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | CONTENT | `content.legal-prose` | page-local |
| 3 | SHELL | `shell.footer` | shared ×34 |

### 404 — `template.not-found`

1 route · `/*` · chrome: **inner**

| # | category | section | |
|---:|---|---|---|
| 1 | SHELL | `shell.header` | shared ×34 |
| 2 | CONTENT | `content.not-found` | page-local |
| 3 | SHELL | `shell.footer` | shared ×34 |

## Section reference

### SHELL

_Site chrome rendered by the shared Layout around every route: announcement banner, fixed header, footer._

**`shell.announcement-banner`** — Full-width dark-green strip above the header with one linked announcement sentence; scrolls away; sets --banner-height.

· Homepage only (1 route). · appears on 1 routes · implemented by `src/components/Banner.jsx`

**`shell.header`** — Fixed pill header: wordmark, primary nav, click-open Platform flyout, burger-driven mobile/tablet menu.

· Every route (all 1825). · appears on 1825 routes · implemented by `src/components/Navbar.jsx`

**`shell.footer`** — Dark-green footer: wordmark, two link columns, legal links, social icons, desktop edge line art.

· Every route (all 1825). · appears on 1825 routes · implemented by `src/components/Footer.jsx`

### HERO

_The page-opening block that states what the route is about._

**`hero.home-tabs`** — Homepage hero: headline + side description over three auto-advancing illustrated tabs with timer rings and a popup CTA after the last tab.

· Homepage only. · appears on 1 routes · implemented by `src/components/Hero.jsx`

**`hero.page-platform`** — PageHero platform variant: eyebrow, black h1, description, large absolutely positioned product visual with corner line art; staggered reveal.

· Platform overview only. · appears on 1 routes · implemented by `src/components/blocks/PageHero.jsx (variant platform)`

**`hero.page-landing`** — PageHero landing variant: eyebrow, h1 with green span, description, in-flow 1080u visual that scales in.

· Payroll, tax and handbooks product pages plus the for-hr and for-telehealth solution pages (5 routes). · appears on 5 routes · implemented by `src/components/blocks/PageHero.jsx (variant landing)`

**`hero.static`** — HeroStatic: centered eyebrow/h1/description over a looping line-art illustration with edge line art; optional red button row; no text reveal.

· Entity product, solutions overview (+smb), reinstatement, and every static and platform partner page (12 routes). · appears on 12 routes · implemented by `src/components/blocks/HeroStatic.jsx`

**`hero.about`** — About hero: eyebrow and title rising in, wide team illustration scaling from .95.

· About page only. · appears on 1 routes · implemented by `src/components/marketing/about/AboutHero.jsx`

**`hero.guide`** — Gated-guide hero: eyebrow, title, description, CTA button and a book-cover image partly overlapped by the next section; staggered reveal.

· Every guide landing except the form-only newsletter guide (7 routes). · appears on 7 routes · implemented by `src/components/content/GuideHero.jsx`

**`hero.title-band`** — Plain title band: small eyebrow over an h1/h2 on a light background, no image, no motion.

· Blog index pages and author detail pages (9 routes). · appears on 9 routes · implemented by `src/components/content/PageTitleBand.jsx`

**`hero.post-header`** — Article header: h1, avatar + author + date byline (date-only on resource guides), featured image.

· Blog posts and resource guide leaves (1766 routes). · appears on 1766 routes · implemented by `src/components/content/PostHeader.jsx`

### PROOF

_Social proof: customer logo tickers, testimonials, stat cards._

**`proof.logo-ticker-home`** — Homepage 'Trusted by' block: title and two opposite-direction logo rows that run from page load and never stop; 80/260 padding.

· Homepage only. · appears on 1 routes · implemented by `src/components/LogoMarquee.jsx`

**`proof.logo-ticker`** — Configurable logo ticker (110u padding; one or two rows; white or orange edge fades) with an optional title.

· Payroll, tax and entity products, for-hr, telehealth, about, the lead-form platform partner page, and every guide that includes a trusted strip (13 routes). · appears on 13 routes · implemented by `src/components/blocks/LogoMarquee.jsx; guides use a copy in content/GuideTrusted.jsx`

**`proof.benefit-stats`** — Three stat cards (large figure + one-sentence description) with a middle-first reveal.

· Homepage, platform overview and solutions overview (+smb) (4 routes). · appears on 4 routes · implemented by `src/components/Benefits.jsx`

**`proof.benefit-cards`** — BenefitsVariant: title row and three cards with image icons that go from 40% to full opacity on hover; 110u padding.

· Payroll, tax and handbooks products, for-hr, telehealth, reinstatement and the full-stack guides (10 routes). · appears on 10 routes · implemented by `src/components/blocks/BenefitsVariant.jsx; guides use a copy in content/GuideBenefits.jsx`

**`proof.testimonials`** — Testimonial carousel with counter and prev/next arrows (Splide-style 400ms easing).

· Homepage, solutions overview (+smb) and the static partner pages (9 routes). · appears on 9 routes · implemented by `src/components/Testimonials.jsx`

**`proof.testimonials-lite`** — Lighter single-row testimonial block with its own reveal.

· Telehealth solution page only. · appears on 1 routes · implemented by `src/components/marketing/TestimonialsLite.jsx`

### FEATURES

_Product explanation modules that are NOT scroll-pinned._

**`features.statement`** — Short two-column statement: large heading with green span and a muted paragraph; text slides up with stagger.

· Homepage only. · appears on 1 routes · implemented by `src/components/Statement.jsx`

**`features.everything`** — Giant masked 'Everything' headline over a network illustration whose lines draw on once and whose dots then loop.

· Homepage only. · appears on 1 routes · implemented by `src/components/Everything.jsx`

**`features.role-tabs`** — Four role tabs (sliding indicator, out/in text + image swap) beside a list of benefits, plus an inline green CTA card.

· Homepage only. · appears on 1 routes · implemented by `src/components/RoleTabs.jsx`

**`features.benefit-group`** — Three-tab variant of the role tabs without the gradient, with the compliance CTA card inline.

· Handbooks product only. · appears on 1 routes · implemented by `src/components/blocks/BenefitGroup.jsx`

**`features.feature-list-animated`** — FeatureList variant A: alternating text/list + image rows; text slides up, list rows stagger 5f, image scales from .98.

· Platform overview, handbooks product, reinstatement and the static partner pages (9 routes). · appears on 9 routes · implemented by `src/components/blocks/FeatureList.jsx (variant A)`

**`features.feature-list-static`** — FeatureList variant B: the same alternating rows rendered static (no reveal); optional red button.

· Payroll, tax and entity products and telehealth (4 routes). · appears on 4 routes · implemented by `src/components/blocks/FeatureList.jsx (variant B)`

**`features.ecosystem`** — Ecosystem diagram block showing how the product connects to payroll and HR tools.

· Platform overview and solutions overview (+smb) (3 routes). · appears on 3 routes · implemented by `src/components/blocks/Ecosystem.jsx`

**`features.engine`** — Engine block: headline and grid of capability items describing the rules engine.

· Platform overview only. · appears on 1 routes · implemented by `src/components/blocks/Engine.jsx`

**`features.problem-list`** — Problem list: title and numbered list of pain points; static.

· For-hr solution page only. · appears on 1 routes · implemented by `src/components/marketing/ProblemList.jsx`

**`features.card-grid`** — Six-card feature grid with tinted icon tiles; static.

· For-hr solution page only. · appears on 1 routes · implemented by `src/components/marketing/FeatureCardGrid.jsx`

**`features.guide-covers`** — Row of downloadable-guide cards (book-cover art, title, arrow link).

· For-hr solution page only. · appears on 1 routes · implemented by `src/components/marketing/ResourceList.jsx`

**`features.intro-row`** — Title + description intro row, side by side on md+, stacked on mobile; static.

· Platform partner C1 only. · appears on 1 routes · implemented by `src/components/misc/PlatformPartnerPage.jsx > IntroRow`

### NARRATIVE

_Scroll-pinned or scroll-scrubbed storytelling sections (GSAP ScrollTrigger pins)._

**`narrative.roadmap`** — Three-step roadmap pinned and scrubbed by scroll: progress bar, 01–03 counter, step text and image swap.

· Homepage and solutions overview (+smb) (3 routes). · appears on 3 routes · implemented by `src/components/Roadmap.jsx`

**`narrative.peace-steps`** — Homepage 'peace of mind' four-step section: sticky animated image on desktop, carousel below lg.

· Homepage and reinstatement (2 routes). · appears on 2 routes · implemented by `src/components/PeaceOfMind.jsx`

**`narrative.get-started`** — GetStarted: 3–4 step variant of the peace-of-mind section with static images; desktop scrubbed pin, carousel below lg.

· Payroll, handbooks and entity products, solutions overview (+smb), for-hr and all static and platform partner pages (14 routes). · appears on 14 routes · implemented by `src/components/blocks/GetStarted.jsx`

**`narrative.feature-group`** — FeatureGroup: card(s) pinned near viewport centre over a 2000u runway; scroll progress opens accordion items and swaps the image.

· Platform overview, payroll and tax products, for-hr, both platform partner pages and the full-stack guides (10 routes). · appears on 10 routes · implemented by `src/components/blocks/FeatureGroup.jsx; guides use a copy in content/FeatureGroup.jsx`

**`narrative.scroll-tabs`** — ScrollTabs: four tabs pinned 20% from the top over a 3000u runway; scroll progress picks the tab; hash opens a tab; stacked cards below lg.

· Entity product and solutions overview (+smb) (3 routes). · appears on 3 routes · implemented by `src/components/blocks/ScrollTabs.jsx`

### COMMERCE

_Plans, prices and plan comparison._

**`commerce.pricing`** — Three plan cards that pin and collapse over a plan-comparison accordion table.

· Homepage, pricing, solutions overview (+smb), and every static and platform partner page (12 routes). · appears on 12 routes · implemented by `src/components/Pricing.jsx`

### CONVERSION

_Calls to action, FAQs and forms that move a visitor to sign up or contact._

**`conversion.faq-home`** — Homepage FAQ accordion with the site's fixed question set (one open at a time).

· Homepage, pricing, solutions overview (+smb) and payroll product (5 routes). · appears on 5 routes · implemented by `src/components/Faq.jsx`

**`conversion.faq`** — Prop-driven FAQ accordion (title + items, selectable background); same geometry as the homepage FAQ.

· Handbooks product, for-hr and both platform partner pages (4 routes). · appears on 4 routes · implemented by `src/components/blocks/FaqVariant.jsx; guides use a copy in content/GuideFaq.jsx`

**`conversion.faq-guide`** — Guide FAQ: data-driven FAQ with a three-part title (before / green / after).

· Full-stack guides and the report guide (5 routes). · appears on 5 routes · implemented by `src/components/content/GuideFaq.jsx`

**`conversion.bottom-cta`** — Closing green CTA band with looping illustration and sign-up button.

· Most routes; absent only on security, legal/status, subscribe, authors, mail, sales-tax beta, legacy partner pages and the two short guides. · appears on 1801 routes · implemented by `src/components/BottomCta.jsx`

**`conversion.cta-card`** — Standalone compliance CTA card that rises 100px on enter and loops its art.

· Payroll, tax and entity products, for-hr, telehealth, reinstatement and both platform partner pages (8 routes). · appears on 8 routes · implemented by `src/components/blocks/GenericCta.jsx`

**`conversion.lead-form`** — Two-column lead capture (pitch list + local static form; stacks on mobile when stackOnMobile).

· Telehealth and platform partner C2 (2 routes). · appears on 2 routes · implemented by `src/components/blocks/LeadForm.jsx`

**`conversion.guide-form`** — Guide download form section (split or centered newsletter variant), local-only validation and success state.

· All 8 guide landings. · appears on 8 routes · implemented by `src/components/content/GuideFormSection.jsx`

**`conversion.inline-cta`** — Inline CTA card with glow placed inside or after an article body.

· Resource guide leaves (1736 routes). · appears on 1736 routes · implemented by `src/components/content/InlineCtaCard.jsx`

**`conversion.mail-signup`** — Checkout-style mail-handling sign-up: form beside an info panel; local validation.

· Mail page only. · appears on 1 routes · implemented by `src/pages/MailPage.jsx`

### CONTENT

_Long-form body content: prose, legal text, company story, confirmations._

**`content.prose`** — Article body with full prose typography (h2–h4, lists, tables in a scroll wrapper, blockquotes) and optional inline CTA/form blocks.

· Blog posts and resource guide leaves (1766 routes). · appears on 1766 routes · implemented by `src/components/content/Prose.jsx`

**`content.inner-post`** — Rich-text page body (h2, p, ul, hr, inline links) in a narrow column; no CTA.

· Security page only. · appears on 1 routes · implemented by `src/components/marketing/InnerPost.jsx`

**`content.legal-prose`** — Prose + table template for legal and status documents (sample text).

· Four legal documents and status (5 routes). · appears on 5 routes · implemented by `src/pages/Legal.jsx`

**`content.not-found`** — 404 message in the prose shell with a link home.

· Catch-all route for unknown URLs (1 route). · appears on 1 routes · implemented by `src/pages/NotFound.jsx`

**`content.about-intro`** — Two-column title + description with text slide-up.

· About page only. · appears on 1 routes · implemented by `src/components/marketing/about/TitleWithDesc.jsx`

**`content.our-story`** — Company story block with background fade and staggered text.

· About page only. · appears on 1 routes · implemented by `src/components/marketing/about/OurStory.jsx`

**`content.careers`** — Careers block: title, description, list of open roles with tags, CTA button.

· About page only. · appears on 1 routes · implemented by `src/components/marketing/about/Careers.jsx`

**`content.thanks`** — Short centered 'thanks' confirmation (heading + sentence); footer pinned to viewport bottom.

· Subscribe page only. · appears on 1 routes · implemented by `src/pages/Subscribe.jsx`

**`content.author-profile`** — Author photo, bio and list of that author's articles.

· Author detail pages (6 routes). · appears on 6 routes · implemented by `src/pages/AuthorDetail.jsx`

### DIRECTORY

_Index and navigation lists over a collection: post lists, resource link lists, related links, pagination._

**`directory.post-list`** — List of post rows (title, excerpt, arrow button) ten per page.

· Blog index pages (3 routes). · appears on 3 routes · implemented by `src/components/content/ListRows.jsx > ListPosts`

**`directory.pagination`** — NN/TT counter with previous/next circle buttons.

· Blog index pages (3 routes). · appears on 3 routes · implemented by `src/components/content/Pagination.jsx`

**`directory.author-list`** — Author index: title and one row per author linking to their page.

· Authors index only. · appears on 1 routes · implemented by `src/pages/Authors.jsx`

**`directory.resource-links`** — Grouped resource link rows with arrow buttons (category groups on the index; per-state leaves on a hub).

· Resources index and every category hub (7 routes). · appears on 7 routes · implemented by `src/components/content/ResourceList.jsx`

**`directory.related-links`** — Related-resource link grids below an article (same category, same state agencies, localities).

· Resource guide leaves (1736 routes). · appears on 1736 routes · implemented by `src/components/content/ResourceLinkGrid.jsx`

**`directory.blog-teasers`** — Three 'More from the blog' teaser cards.

· Resource guide leaves (1736 routes). · appears on 1736 routes · implemented by `src/components/content/BlogTeaserList.jsx`

### LEGACY

_Blocks from the older px-based partner page kit (its own palette and slider), used only by partner template A and its cut-down variant._

**`hero.legacy-cobrand`** — Old-style partner hero: optional co-brand lockup (partner wordmark × Northwind), title, two subtitles, signup CTA.

· Legacy partner pages and the sales-tax beta page (4 routes). · appears on 4 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > LegacyHero`

**`commerce.legacy-pricing`** — Old-style pricing band: partner logo, three plan cards in an autoplay slider (3-up ≥1260px).

· Legacy partner pages only (3 routes). · appears on 3 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > PricingBand`

**`conversion.invite-modal`** — Request-invite modal form (Esc to close, consumer-domain check, local success state).

· Sales-tax beta page only. · appears on 1 routes · implemented by `src/components/misc/RequestInviteModal.jsx`

**`legacy.intro-strip`** — Centered band title + subtitle introducing the feature rows.

· Legacy partner pages and sales-tax beta (4 routes). · appears on 4 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > IntroStrip`

**`legacy.shot-row`** — Text + product screenshot row with the screenshot bleeding off the right edge.

· Legacy partner pages and sales-tax beta (4 routes). · appears on 4 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > ShotRow`

**`legacy.workflow`** — HTML mock-UI workflow card beside explanatory text.

· Legacy partner pages only (3 routes). · appears on 3 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > WorkflowRow`

**`legacy.inset-row`** — Text row with an inset screenshot card.

· Legacy partner pages and sales-tax beta (4 routes). · appears on 4 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > InsetRow`

**`legacy.always-current`** — Accent-panel band explaining always-current rules.

· Legacy partner pages only (3 routes). · appears on 3 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > AlwaysCurrentBand`

**`legacy.collaborate`** — Image-card band about team collaboration.

· Legacy partner pages only (3 routes). · appears on 3 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > CollaborateBand`

**`legacy.everything-band`** — Checklist band of everything included.

· Legacy partner pages and sales-tax beta (4 routes). · appears on 4 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > EverythingBand`

**`legacy.about`** — About band: logo groups plus an autoplay testimonial slider (5s).

· Legacy partner pages only (3 routes). · appears on 3 routes · implemented by `src/components/misc/legacy/LegacyKit.jsx > AboutBand`
