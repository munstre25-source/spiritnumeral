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

// PsychicOz affiliate: contextual links for love, career, and general (tarot).
export type PsychicOfferId = 'psychic_love' | 'psychic_career' | 'psychic_tarot';

export interface PsychicOffer {
  id: PsychicOfferId;
  title: string;
  body: string;
  cta: string;
  href: string;
}

export const PSYCHIC_OFFERS: Record<PsychicOfferId, PsychicOffer> = {
  psychic_love: {
    id: 'psychic_love',
    title: 'Clarity on your love path',
    body: 'Get a personal reading from trusted psychics. First 3 minutes free.',
    cta: 'Try 3 free minutes →',
    href: 'https://psychicoz.com/psychics/love-relationship-psychic-readers?a_aid=697f030692a07&a_bid=5dd1df23',
  },
  psychic_career: {
    id: 'psychic_career',
    title: 'Clarity on your career & money path',
    body: 'Get a personal reading from trusted psychics. First 3 minutes free.',
    cta: 'Try 3 free minutes →',
    href: 'https://psychicoz.com/psychics/career-forecasts-psychic-readers?a_aid=697f030692a07&a_bid=1e499872',
  },
  psychic_tarot: {
    id: 'psychic_tarot',
    title: 'Deeper insight with a psychic reading',
    body: 'Tarot, numerology & more. First 3 minutes free.',
    cta: 'Try 3 free minutes →',
    href: 'https://psychicoz.com/psychics/tarot-card-psychic-readers?a_aid=697f030692a07&a_bid=c163dfbf',
  },
};

// Map pathname to the best PsychicOz offer for CTR/conversion.
const psychicRouteMap: { pattern: RegExp; offer: PsychicOfferId }[] = [
  // Love: relationship-focused pages
  { pattern: /^\/twin-flame(\/|$)/, offer: 'psychic_love' },
  { pattern: /^\/soulmate(\/|$)/, offer: 'psychic_love' },
  { pattern: /^\/angel-number-love\//, offer: 'psychic_love' },
  { pattern: /^\/compatibility(\/|$)/, offer: 'psychic_love' },
  { pattern: /^\/compare(\/|$)/, offer: 'psychic_love' },
  { pattern: /^\/breakup(\/|$)/, offer: 'psychic_love' },
  { pattern: /^\/psychic-readings\/love(\/|$)/, offer: 'psychic_love' },
  // Career / money: career and abundance pages
  { pattern: /^\/psychic-readings\/career(\/|$)/, offer: 'psychic_career' },
  // Guides: general tarot/psychic (specific paths before hub)
  { pattern: /^\/psychic-readings\/when-to-get(\/|$)/, offer: 'psychic_tarot' },
  { pattern: /^\/psychic-readings\/angel-numbers-readings(\/|$)/, offer: 'psychic_tarot' },
  { pattern: /^\/psychic-readings\/questions-to-ask(\/|$)/, offer: 'psychic_tarot' },
  { pattern: /^\/psychic-readings\/reading-vs-calculator(\/|$)/, offer: 'psychic_tarot' },
  { pattern: /^\/psychic-readings(\/|$)/, offer: 'psychic_tarot' },
  { pattern: /^\/money(\/|$)/, offer: 'psychic_career' },
  { pattern: /^\/manifestation\//, offer: 'psychic_career' },
  { pattern: /^\/angel-number-career\//, offer: 'psychic_career' },
  { pattern: /^\/personal-year(\/|$)/, offer: 'psychic_career' },
  { pattern: /^\/personal-month(\/|$)/, offer: 'psychic_career' },
  { pattern: /^\/personal-day(\/|$)/, offer: 'psychic_career' },
  { pattern: /^\/pinnacle(\/|$)/, offer: 'psychic_career' },
  { pattern: /^\/maturity-number(\/|$)/, offer: 'psychic_career' },
  { pattern: /^\/name-numerology(\/|$)/, offer: 'psychic_career' },
  { pattern: /^\/celebrity-numerology(\/|$)/, offer: 'psychic_career' },
];

export function resolvePsychicOffer(pathname: string): PsychicOffer {
  const match = psychicRouteMap.find((entry) => entry.pattern.test(pathname));
  const id = match ? match.offer : 'psychic_tarot';
  return PSYCHIC_OFFERS[id];
}

// Emotional pages (love, twin flame, angel numbers): use curiosity/identity CTA for A/B.
// Definition pages (e.g. /meaning/angel-number index) lead with education; CTA stays later.
const EMOTIONAL_PATH_PATTERNS: RegExp[] = [
  /^\/twin-flame(\/|$)/,
  /^\/soulmate(\/|$)/,
  /^\/angel-number-love\//,
  /^\/compatibility(\/|$)/,
  /^\/compare(\/|$)/,
  /^\/breakup(\/|$)/,
  /^\/meaning\/angel-number\/\d+/,  // single angel number page
  /^\/$/,  // home: angel-number focused
  /^\/psychic-readings\/love(\/|$)/,  // love landing: emotional CTA
];

export function isEmotionalPath(pathname: string): boolean {
  return EMOTIONAL_PATH_PATTERNS.some((p) => p.test(pathname));
}

/** Curiosity-driven CTA (best for SEO / emotional pages). No psychic/money language. */
export const EMOTIONAL_CTA_OPTIONS = [
  'Reveal my number →',
  'Unlock my number →',
  'See what it means →',
] as const;

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
