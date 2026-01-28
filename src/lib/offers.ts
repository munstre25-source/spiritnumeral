// Centralized offer definitions and routing for promo placements.

export type Offer = {
  id: 'genius-song' | 'brain-song' | 'soulmate-story' | 'moon-reading' | 'numerologist';
  title: string;
  body: string;
  cta: string;
  href: string;
  badge?: string;
};

export const OFFERS: Record<Offer['id'], Offer> = {
  'genius-song': {
    id: 'genius-song',
    title: 'A Simple Sound Ritual for Clarity',
    body: 'Pair your numerology practice with a short daily audio session designed to calm the mind and open insight.',
    cta: 'Try The Genius Song →',
    href: 'https://d7c60c-fxd1fzud3mmuit35x4g.hop.clickbank.net',
    badge: 'Neuroscientist-endorsed',
  },
  'brain-song': {
    id: 'brain-song',
    title: 'Reset Your Theta Focus in 7 Minutes',
    body: 'A gentle audio designed to re-activate deep-focus Theta waves—ideal before journaling or career moves.',
    cta: 'Listen to The Brain Song →',
    href: 'https://f4cbal-ev2thsr5yv0pm3cp4zt.hop.clickbank.net',
    badge: 'Neuroscientist-endorsed',
  },
  'soulmate-story': {
    id: 'soulmate-story',
    title: 'See Your Soulmate Story Unfold',
    body: 'A personalized drawing and story based on your astrology chart—made for love and twin-flame seekers.',
    cta: 'Get Your Soulmate Story →',
    href: 'https://bf994p4c-esotq6etlob2k0f1l.hop.clickbank.net',
    badge: 'Astrology-based',
  },
  'moon-reading': {
    id: 'moon-reading',
    title: 'Your Personalized Moon Reading',
    body: 'A guided video reading that reveals how today’s moon energy aligns with your path.',
    cta: 'Start My Moon Reading →',
    href: 'https://0c74fhxesdyoro6sln-7koqg3m.hop.clickbank.net',
    badge: 'Astrology video',
  },
  'numerologist': {
    id: 'numerologist',
    title: 'Your Personalized Numerology Reading',
    body: 'Instantly decode your life path, expression, and destiny numbers with a custom report tailored to your birth data.',
    cta: 'Get My Numerology Reading →',
    href: 'https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff',
    badge: 'Reader-favorite',
  },
};

// Map route patterns to offer ids. Ordered by specificity.
const routeOfferMap: { pattern: RegExp; offer: Offer['id'] }[] = [
  { pattern: /^\/soulmate\//, offer: 'soulmate-story' },
  { pattern: /^\/angel-number-love\//, offer: 'soulmate-story' },
  { pattern: /^\/twin-flame\//, offer: 'soulmate-story' },
  { pattern: /^\/breakup\//, offer: 'soulmate-story' },

  { pattern: /^\/money\//, offer: 'brain-song' },
  { pattern: /^\/angel-number-career\//, offer: 'brain-song' },

  { pattern: /^\/manifestation\//, offer: 'genius-song' },
  { pattern: /^\/dreams\//, offer: 'genius-song' },
  { pattern: /^\/why-am-i-seeing\//, offer: 'numerologist' },
  { pattern: /^\/warning\//, offer: 'numerologist' },
  { pattern: /^\/meaning\/angel-number\//, offer: 'numerologist' },

  { pattern: /^\/biblical-meaning\//, offer: 'moon-reading' },
  { pattern: /^\/pregnancy\//, offer: 'moon-reading' },

  // Fallbacks
  { pattern: /^\/meaning\//, offer: 'numerologist' },
  { pattern: /^\/$/, offer: 'numerologist' },
];

export function resolveOfferFromPath(pathname: string): Offer {
  const match = routeOfferMap.find((entry) => entry.pattern.test(pathname));
  if (match) return OFFERS[match.offer];
  // default fallback
  return OFFERS['genius-song'];
}
