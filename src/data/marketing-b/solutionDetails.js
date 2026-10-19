import { artUrl } from '../../components/InlineSvg'
import { forHr as c } from './for-hr'
import { forTelehealth as t } from './for-telehealth'

/**
 * SolutionDetail compositions (spec §2.4). Each slug → ordered sections; `block` names a component in the
 * registry in src/pages/SolutionDetail.jsx, `props` go straight to it.
 */
const LOGOS = [
  ['halcyon', 'brightpath', 'corvid-labs', 'tessellate', 'orbitra', 'fernway'],
  ['kestrel', 'driftwood', 'juniper-bay', 'arcwell', 'pallaso', 'quillfield'],
]
const chart = (n) => ({ src: artUrl(`marketing/benefit-pictogram-${n}.svg`) })

export const SOLUTION_DETAILS = {
  'for-hr': {
    title: 'Northwind for HR',
    sections: [
      {
        block: 'PageHero',
        props: {
          variant: 'landing',
          eyebrow: c.hero.eyebrow,
          title: [`${c.hero.title} `, { g: c.hero.titleGreen }],
          description: c.hero.desc,
          visual: {
            desktop: { src: artUrl('marketing/hero-visual.svg'), w: 2406, h: 932 },
            mobile: { src: artUrl('marketing/hero-visual-res.svg'), w: 1004, h: 738 },
            alt: '',
          },
        },
      },
      { block: 'LogoMarquee', props: { title: c.trustedTitle, rows: LOGOS, padding: 'landing' } },
      { block: 'ProblemList', props: c.problems },
      { block: 'FeatureCardGrid', props: { ...c.cards, cards: c.cards.items } },
      {
        block: 'BenefitsVariant',
        props: {
          title: [c.benefits.title, '\n', { g: c.benefits.titleGreen }],
          desc: c.benefits.desc,
          cards: c.benefits.cards.map((card, i) => ({ ...card, icon: chart(i + 1) })),
        },
      },
      {
        block: 'FeatureGroup',
        props: {
          cards: [
            {
              title: c.featureGroup.title,
              desc: c.featureGroup.desc,
              // mixed aspects as measured: 530x343.5 / 530x447 / 530x367.3, top-aligned
              items: c.featureGroup.items.map((item, i) => ({
                title: item.title,
                body: item.desc,
                image: {
                  src: artUrl(
                    ['marketing/feature-reduce.svg', 'marketing/platform-secure-1.svg', 'compliance/tab-head-of-people.svg'][i],
                  ),
                },
              })),
            },
          ],
        },
      },
      { block: 'GenericCta', props: c.cta },
      { block: 'ResourceList', props: c.resources },
      {
        block: 'GetStarted',
        props: {
          title: [{ g: c.getStarted.title }],
          desc: c.getStarted.desc,
          steps: c.getStarted.steps.map((s, i) => ({ ...s, image: { src: artUrl(`peace/peace-step-${i + 1}.svg`) } })),
        },
      },
      { block: 'Faq', props: { ...c.faq, bg: 'bg-white' } },
      { block: 'BottomCta', props: {} },
    ],
  },
  'for-telehealth': {
    title: 'Northwind for telehealth',
    // PageHero → LeadForm → Trusted (1 row) → BenefitsVariant → GenericCta → FeatureList B (+ red button) →
    // TestimonialsLite → BottomCta
    sections: [
      {
        block: 'PageHero',
        props: {
          variant: 'landing',
          eyebrow: t.hero.eyebrow,
          title: t.hero.title,
          description: t.hero.desc,
          visual: {
            desktop: { src: artUrl('marketing/hero-visual.svg'), w: 2406, h: 932 },
            mobile: { src: artUrl('marketing/hero-visual-res.svg'), w: 1004, h: 738 },
            alt: '',
          },
        },
      },
      { block: 'LeadForm', props: { title: t.leadForm.title, list: t.leadForm.list, stackOnMobile: true } },
      { block: 'LogoMarquee', props: { title: t.trustedTitle, rows: t.trustedRows, padding: 'landing' } },
      {
        block: 'BenefitsVariant',
        props: { ...t.benefits, cards: t.benefits.cards.map((card, i) => ({ ...card, icon: chart(i + 1) })) },
      },
      { block: 'GenericCta', props: t.cta },
      { block: 'FeatureList', props: { variant: 'B', items: [t.featureList] } },
      { block: 'TestimonialsLite', props: t.testimonials },
      { block: 'BottomCta', props: {} },
    ],
  },
}
