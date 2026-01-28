/**
 * ClickBank Affiliate Integration
 * Optimized CTAs based on page context for maximum conversions
 */

interface ClickBankOffer {
  name: string;
  nickname: string;
  url: string;
  apv: number;
  epc: number;
  conversionRate: number;
  description: string;
  category: 'numerology' | 'twin-flame' | 'manifestation' | 'money' | 'soulmate' | 'general';
}

// Your primary affiliate link - used across all numerology-related pages
const PRIMARY_AFFILIATE_LINK = 'https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff';

/**
 * Top ClickBank offers for spirituality niche
 * All using your verified affiliate link
 */
const CLICKBANK_OFFERS: ClickBankOffer[] = [
  {
    name: 'Numerologist',
    nickname: 'numerology',
    url: PRIMARY_AFFILIATE_LINK,
    apv: 12.06,
    epc: 0.21,
    conversionRate: 1.79,
    description: 'Get your personalized numerology reading with dynamically-generated VSL',
    category: 'numerology'
  },
  {
    name: 'Soulmate Reading',
    nickname: 'smreading',
    url: PRIMARY_AFFILIATE_LINK, // Using your verified link
    apv: 16.95,
    epc: 0.25,
    conversionRate: 1.46,
    description: 'Discover your soulmate through personalized reading',
    category: 'soulmate'
  },
  {
    name: 'Twin Flame Guide',
    nickname: 'twinflame',
    url: PRIMARY_AFFILIATE_LINK, // Using your verified link
    apv: 14.50,
    epc: 0.22,
    conversionRate: 1.52,
    description: 'Learn about your twin flame connection',
    category: 'twin-flame'
  },
  {
    name: 'Wealth Manifestation',
    nickname: 'wealth',
    url: PRIMARY_AFFILIATE_LINK, // Using your verified link
    apv: 19.27,
    epc: 0.18,
    conversionRate: 0.93,
    description: 'Unlock your wealth and abundance potential',
    category: 'money'
  },
  {
    name: 'Manifestation Guide',
    nickname: 'manifest',
    url: PRIMARY_AFFILIATE_LINK, // Using your verified link
    apv: 48.30,
    epc: 0.39,
    conversionRate: 0.82,
    description: 'Master the art of manifestation',
    category: 'manifestation'
  }
];

// Page-specific CTA text for maximum relevance and conversions
const CTA_TEXT_BY_CONTEXT: Record<string, string> = {
  // Core pages
  'numerology': 'Get Your Personalized Numerology Reading →',
  'life-path': 'Discover Your Complete Life Path Analysis →',

  // Relationship pages
  'twin-flame': 'Reveal Your Twin Flame Connection Now →',
  'soulmate': 'Discover Who Your Soulmate Is →',
  'love': 'Get Your Love & Relationship Reading →',

  // Financial pages
  'money': 'Unlock Your Wealth & Abundance Path →',
  'career': 'Discover Your Career Destiny →',

  // Spiritual pages
  'manifestation': 'Master Your Manifestation Power →',
  'biblical': 'Explore Your Spiritual Journey →',
  'warning': 'Get Clarity on Your Life Path →',
  'why-seeing': 'Understand Your Angel Messages →',

  // Life situation pages
  'pregnancy': 'Get Your Fertility & Family Reading →',
  'breakup': 'Find Healing & New Love Guidance →',
  'dreams': 'Decode Your Dreams & Destiny →',

  // Fallback
  'general': 'Get Your Personalized Spiritual Reading →'
};

// Secondary/supporting CTA text
const SECONDARY_CTA_TEXT: Record<string, string> = {
  'numerology': 'Free personalized reading based on your birth date',
  'twin-flame': 'See if you\'ve found "the one" - Free reading',
  'soulmate': 'Discover your destined partner - Free reading',
  'love': 'Get relationship insights - Free reading',
  'money': 'Reveal your wealth potential - Free reading',
  'career': 'Discover your true calling - Free reading',
  'manifestation': 'Learn to manifest your desires - Free reading',
  'pregnancy': 'Get family guidance - Free reading',
  'breakup': 'Find your path forward - Free reading',
  'dreams': 'Understand your spiritual messages - Free reading',
  'general': 'Trusted by 50,000+ seekers worldwide'
};

type PageCategory = 'numerology' | 'twin-flame' | 'manifestation' | 'general' | 'life-path' |
  'love' | 'career' | 'money' | 'soulmate' | 'pregnancy' | 'breakup' |
  'dreams' | 'warning' | 'why-seeing' | 'biblical';

/**
 * Get the best ClickBank offer for a given page category
 */
export function getClickBankOffer(category: PageCategory): ClickBankOffer {
  // Map page categories to offer categories
  const categoryMap: Record<string, ClickBankOffer['category']> = {
    'numerology': 'numerology',
    'life-path': 'numerology',
    'twin-flame': 'twin-flame',
    'soulmate': 'soulmate',
    'love': 'soulmate',
    'money': 'money',
    'career': 'money',
    'manifestation': 'manifestation',
    'biblical': 'general',
    'warning': 'numerology',
    'why-seeing': 'numerology',
    'pregnancy': 'general',
    'breakup': 'soulmate',
    'dreams': 'general',
    'general': 'general'
  };

  const offerCategory = categoryMap[category] || 'numerology';

  // Find the best offer for this category
  const categoryOffers = CLICKBANK_OFFERS.filter(offer => offer.category === offerCategory);

  if (categoryOffers.length > 0) {
    return categoryOffers[0];
  }

  // Fallback to primary numerology offer
  return CLICKBANK_OFFERS[0];
}

/**
 * Get CTA text based on page context
 */
export function getCTAText(category: PageCategory): string {
  return CTA_TEXT_BY_CONTEXT[category] || CTA_TEXT_BY_CONTEXT['general'];
}

/**
 * Get secondary CTA text
 */
export function getSecondaryCTAText(category: PageCategory): string {
  return SECONDARY_CTA_TEXT[category] || SECONDARY_CTA_TEXT['general'];
}

/**
 * Generate ClickBank CTA component props
 */
export function getClickBankCTA(category: PageCategory) {
  const offer = getClickBankOffer(category);
  const text = getCTAText(category);
  const secondaryText = getSecondaryCTAText(category);

  return {
    url: offer.url,
    text,
    secondaryText,
    offer,
    stats: {
      apv: offer.apv,
      epc: offer.epc,
      conversionRate: offer.conversionRate
    }
  };
}

/**
 * ClickBank CTA Component (for use in pages)
 * Includes primary CTA button with contextual text
 */
export function ClickBankCTA({
  category,
  className = '',
  variant = 'primary'
}: {
  category: PageCategory;
  className?: string;
  variant?: 'primary' | 'secondary' | 'inline';
}) {
  const cta = getClickBankCTA(category);

  if (variant === 'inline') {
    return (
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`text-amber-500 hover:text-amber-400 underline font-medium transition-colors ${className}`}
      >
        Get your personalized reading
      </a>
    );
  }

  if (variant === 'secondary') {
    return (
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className={`block p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 hover:border-amber-500/60 transition-all ${className}`}
      >
        <p className="text-amber-400 font-bold text-lg mb-2">{cta.text}</p>
        <p className="text-zinc-400 text-sm">{cta.secondaryText}</p>
      </a>
    );
  }

  return (
    <div className={className}>
      <a
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer sponsored"
        className="group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="bg-zinc-950 text-amber-500 py-6 rounded-xl font-bold text-xl md:text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-black">
          {cta.text}
        </div>
      </a>
      <p className="text-center text-zinc-500 text-sm mt-4">
        {cta.secondaryText}
      </p>
    </div>
  );
}

/**
 * Mid-content CTA for placing within article content
 */
export function MidContentCTA({ category }: { category: PageCategory }) {
  const cta = getClickBankCTA(category);

  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 to-zinc-900/50 border border-amber-500/20">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 text-center md:text-left">
          <p className="text-amber-400 font-bold mb-1">✨ Want Deeper Insights?</p>
          <p className="text-zinc-400 text-sm">{cta.secondaryText}</p>
        </div>
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors whitespace-nowrap"
        >
          Get Your Reading
        </a>
      </div>
    </div>
  );
}
