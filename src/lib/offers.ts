// Centralized offer definitions and routing for promo placements.

export type Offer = {
  id: 'quick_report' | 'blueprint';
  title: string;
  body: string;
  cta: string;
  href: string;
  product?: string;
  badge?: string;
};

export const OFFERS: Record<Offer['id'], Offer> = {
  quick_report: {
    id: 'quick_report',
    title: 'Get Your Quick Number Report',
    body: 'One number, one page — instant meaning and what to do next. No forms, no quiz.',
    cta: 'Get Quick Report — $7 →',
    href: '/quick-report',
    product: 'quick_report',
    badge: '$7 Quick Report',
  },
  blueprint: {
    id: 'blueprint',
    title: 'Get Your Personal Blueprint',
    body: 'Take the quiz to generate a personalized numerology PDF tailored to your current focus and energy.',
    cta: 'Start the Quiz →',
    href: '/quiz',
    product: 'blueprint',
    badge: '$17 Personalized PDF',
  },
};

// Map route patterns to offer ids. All routes default to quick_report except /quiz.
const routeOfferMap: { pattern: RegExp; offer: Offer['id'] }[] = [
  { pattern: /^\/quiz(\/|$)/, offer: 'blueprint' },
  { pattern: /^\/dreams\//, offer: 'quick_report' },
  { pattern: /^\/manifestation\//, offer: 'quick_report' },
  { pattern: /^\/why-am-i-seeing\//, offer: 'quick_report' },
  { pattern: /^\/warning\//, offer: 'quick_report' },
  { pattern: /^\/meaning\//, offer: 'quick_report' },
  { pattern: /^\/$/, offer: 'quick_report' },
];

export function resolveOfferFromPath(pathname: string): Offer {
  const match = routeOfferMap.find((entry) => entry.pattern.test(pathname));
  if (match) return OFFERS[match.offer];
  return OFFERS.quick_report;
}

export function resolveExitOfferFromPath(pathname: string): Offer {
  return OFFERS.quick_report;
}
