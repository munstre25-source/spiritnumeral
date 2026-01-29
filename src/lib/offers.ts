// Centralized offer definitions and routing for promo placements.

export type Offer = {
  id: 'blueprint' | 'relationship' | 'wealth';
  title: string;
  body: string;
  cta: string;
  href: string;
  product?: string;
  badge?: string;
};

export const OFFERS: Record<Offer['id'], Offer> = {
  blueprint: {
    id: 'blueprint',
    title: 'Get Your Personal Blueprint',
    body: 'Take the quiz to generate a personalized numerology PDF tailored to your current focus and energy.',
    cta: 'Start the Quiz →',
    href: '/quiz',
    product: 'blueprint',
    badge: '$17 Personalized PDF',
  },
  relationship: {
    id: 'relationship',
    title: 'Reveal Your Relationship Message',
    body: 'Compare your numbers and unlock a relationship PDF with timing cycles and next steps.',
    cta: 'Compare Numbers →',
    href: '/compare',
    product: 'relationship',
    badge: '$29 Relationship PDF',
  },
  wealth: {
    id: 'wealth',
    title: 'Unlock Your Wealth & Abundance Plan',
    body: 'Use your money number to build a 7/30/90-day wealth plan and action steps.',
    cta: 'See Money Numbers →',
    href: '/money',
    product: 'wealth',
    badge: '$49 Wealth PDF',
  },
};

// Map route patterns to offer ids. Ordered by specificity.
const routeOfferMap: { pattern: RegExp; offer: Offer['id'] }[] = [
  { pattern: /^\/soulmate\//, offer: 'relationship' },
  { pattern: /^\/angel-number-love\//, offer: 'relationship' },
  { pattern: /^\/twin-flame\//, offer: 'relationship' },
  { pattern: /^\/breakup\//, offer: 'relationship' },
  { pattern: /^\/compatibility/, offer: 'relationship' },
  { pattern: /^\/compare/, offer: 'relationship' },

  { pattern: /^\/money/, offer: 'wealth' },

  { pattern: /^\/dreams\//, offer: 'blueprint' },
  { pattern: /^\/manifestation\//, offer: 'blueprint' },
  { pattern: /^\/why-am-i-seeing\//, offer: 'blueprint' },
  { pattern: /^\/warning\//, offer: 'blueprint' },
  { pattern: /^\/meaning\//, offer: 'blueprint' },
  { pattern: /^\/$/, offer: 'blueprint' },
];

export function resolveOfferFromPath(pathname: string): Offer {
  const match = routeOfferMap.find((entry) => entry.pattern.test(pathname));
  if (match) return OFFERS[match.offer];
  // default fallback
  return OFFERS.blueprint;
}
