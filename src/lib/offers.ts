// Centralized offer definitions and routing for promo placements.

export type Offer = {
  id:
    | 'blueprint'
    | 'relationship'
    | 'wealth'
    | 'affiliate_numerologist'
    | 'affiliate_genius_song'
    | 'affiliate_moon_reading'
    | 'affiliate_soulmate_story'
    | 'affiliate_ex_back';
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
  affiliate_numerologist: {
    id: 'affiliate_numerologist',
    title: 'Numerologist VSL: Prosperity Planner',
    body: 'A fully personalized prosperity video reading. Best for money focus and future planning.',
    cta: 'Watch the Prosperity VSL →',
    href: 'https://9b923iv5vhwgzr6kv7hbqh0e70.hop.clickbank.net',
    product: 'affiliate_numerologist',
    badge: 'Affiliate Recommendation',
  },
  affiliate_genius_song: {
    id: 'affiliate_genius_song',
    title: 'The Genius Song (Brainwave Activation)',
    body: 'A neuroscience-backed audio experience to deepen intuition and manifestation focus.',
    cta: 'Unlock the Genius Song →',
    href: 'https://39ee9hvh-fsrvs02m8wpxwtz5s.hop.clickbank.net',
    product: 'affiliate_genius_song',
    badge: 'Affiliate Recommendation',
  },
  affiliate_moon_reading: {
    id: 'affiliate_moon_reading',
    title: 'Moon Reading (Personalized Astrology)',
    body: 'A personalized lunar reading for intuition, timing, and emotional clarity.',
    cta: 'Get Your Moon Reading →',
    href: 'https://9c8fen08udyiqr4mri61qovhf3.hop.clickbank.net',
    product: 'affiliate_moon_reading',
    badge: 'Affiliate Recommendation',
  },
  affiliate_soulmate_story: {
    id: 'affiliate_soulmate_story',
    title: 'Soulmate Story (Personalized Sketch)',
    body: 'A personalized soulmate sketch and story to bring clarity to your love path.',
    cta: 'Reveal Your Soulmate →',
    href: 'https://3bf9fl1fthtgpp3quspdvf2d5v.hop.clickbank.net',
    product: 'affiliate_soulmate_story',
    badge: 'Affiliate Recommendation',
  },
  affiliate_ex_back: {
    id: 'affiliate_ex_back',
    title: 'Relationship Rewrite (Ex‑Back Method)',
    body: 'A reconciliation-focused guide for rebuilding connection after a breakup.',
    cta: 'See the Ex‑Back Method →',
    href: 'https://c3febf2b5hsgwt7ijrvb13sdus.hop.clickbank.net',
    product: 'affiliate_ex_back',
    badge: 'Affiliate Recommendation',
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

// Exit-intent affiliate placements (only when contextually aligned).
const exitAffiliateMap: { pattern: RegExp; offer: Offer['id'] }[] = [
  // Prosperity / planning
  { pattern: /^\/money(\/|$)/, offer: 'affiliate_numerologist' },
  { pattern: /^\/manifestation\//, offer: 'affiliate_numerologist' },
  { pattern: /^\/personal-year\//, offer: 'affiliate_numerologist' },
  { pattern: /^\/personal-month\//, offer: 'affiliate_numerologist' },
  { pattern: /^\/personal-day\//, offer: 'affiliate_numerologist' },
  { pattern: /^\/pinnacle\//, offer: 'affiliate_numerologist' },
  { pattern: /^\/maturity-number\//, offer: 'affiliate_numerologist' },
  // General spiritual / brainwave
  { pattern: /^\/dreams(\/|$)/, offer: 'affiliate_moon_reading' },
  { pattern: /^\/why-am-i-seeing\//, offer: 'affiliate_moon_reading' },
  { pattern: /^\/warning\//, offer: 'affiliate_genius_song' },
  // Love / soulmate
  { pattern: /^\/soulmate(\/|$)/, offer: 'affiliate_soulmate_story' },
  { pattern: /^\/twin-flame(\/|$)/, offer: 'affiliate_soulmate_story' },
  { pattern: /^\/angel-number-love\//, offer: 'affiliate_soulmate_story' },
  { pattern: /^\/breakup(\/|$)/, offer: 'affiliate_ex_back' },
  { pattern: /^\/compatibility(\/|$)/, offer: 'affiliate_soulmate_story' },
  { pattern: /^\/compare(\/|$)/, offer: 'affiliate_soulmate_story' },
];

export function resolveExitAffiliateFromPath(pathname: string): Offer | null {
  const match = exitAffiliateMap.find((entry) => entry.pattern.test(pathname));
  return match ? OFFERS[match.offer] : null;
}
