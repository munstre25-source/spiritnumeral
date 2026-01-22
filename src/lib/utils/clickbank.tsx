/**
 * ClickBank Affiliate Integration
 * Based on top-performing offers from ClickBank's spirituality category
 */

interface ClickBankOffer {
  name: string;
  nickname: string;
  url: string;
  apv: number;
  epc: number;
  conversionRate: number;
  description: string;
  category: 'numerology' | 'twin-flame' | 'manifestation' | 'general';
}

/**
 * Top ClickBank offers for spirituality niche
 * Replace YOUR_AFFILIATE_ID with your actual ClickBank affiliate ID
 */
const CLICKBANK_OFFERS: ClickBankOffer[] = [
  {
    name: 'Numerologist',
    nickname: 'numerology',
    url: 'https://video.numerologist.com/mesl_v1.5/aff-dt.php?utm_source=YOUR_AFFILIATE_ID&utm_medium=affiliate&cbhopvendor=numerology&hop=YOUR_AFFILIATE_ID',
    apv: 10.34,
    epc: 0.12,
    conversionRate: 1.19,
    description: 'Get your personalized numerology reading with dynamically-generated VSL',
    category: 'numerology'
  },
  {
    name: 'Soulmate Reading',
    nickname: 'smreading',
    url: 'https://soulmate-reading.com/free/smvid-003/?errCode=nowhitelist&cbhopvendor=smreading&hop=YOUR_AFFILIATE_ID',
    apv: 16.95,
    epc: 0.25,
    conversionRate: 1.46,
    description: 'Discover your soulmate through Master Yin\'s psychic reading',
    category: 'twin-flame'
  },
  {
    name: 'Moon Reading',
    nickname: 'thoughtop',
    url: 'https://www.moonreading.com/start/1/?source=YOUR_AFFILIATE_ID',
    apv: 19.27,
    epc: 0.18,
    conversionRate: 0.93,
    description: 'Personalized astrological moon sign reading with 7-day funnel',
    category: 'general'
  },
  {
    name: 'Wealth DNA Code',
    nickname: 'wealthdna',
    url: 'https://wealthdnacode.com/vsl/index_test.php?token=YOUR_AFFILIATE_ID',
    apv: 48.30,
    epc: 0.39,
    conversionRate: 0.82,
    description: 'Activate your inner wealth DNA to attract money and abundance',
    category: 'manifestation'
  },
  {
    name: 'The BioEnergy Code',
    nickname: 'bienergyco',
    url: 'https://bioenergycode.org/?hop=YOUR_AFFILIATE_ID',
    apv: 49.99,
    epc: 0.28,
    conversionRate: 0.56,
    description: 'Self-guided manifestation course through chakra rejuvenation',
    category: 'manifestation'
  }
];

/**
 * Get the best ClickBank offer for a given page category
 */
export function getClickBankOffer(category: 'numerology' | 'twin-flame' | 'manifestation' | 'general' | 'life-path'): ClickBankOffer {
  // Map page categories to offer categories
  const categoryMap: Record<string, ClickBankOffer['category']> = {
    'numerology': 'numerology',
    'life-path': 'numerology',
    'twin-flame': 'twin-flame',
    'manifestation': 'manifestation',
    'general': 'general'
  };

  const offerCategory = categoryMap[category] || 'general';
  
  // Find the best offer for this category (highest APV)
  const categoryOffers = CLICKBANK_OFFERS.filter(offer => offer.category === offerCategory);
  
  if (categoryOffers.length > 0) {
    return categoryOffers.reduce((best, current) => 
      current.apv > best.apv ? current : best
    );
  }

  // Fallback to highest APV offer
  return CLICKBANK_OFFERS.reduce((best, current) => 
    current.apv > best.apv ? current : best
  );
}

/**
 * Get ClickBank offer URL with affiliate ID
 * Replace YOUR_AFFILIATE_ID with your actual ClickBank affiliate ID from environment variable
 */
export function getClickBankUrl(offer: ClickBankOffer, affiliateId?: string): string {
  const id = affiliateId || process.env.NEXT_PUBLIC_CLICKBANK_AFFILIATE_ID || 'YOUR_AFFILIATE_ID';
  return offer.url.replace(/YOUR_AFFILIATE_ID/g, id);
}

/**
 * Generate CTA button text based on offer
 */
export function getCTAText(offer: ClickBankOffer): string {
  const texts: Record<string, string> = {
    'Numerologist': 'Get Your Personalized 2026 Numerology Reading →',
    'Soulmate Reading': 'Discover Your Soulmate Connection →',
    'Moon Reading': 'Unlock Your Moon Sign Reading →',
    'Wealth DNA Code': 'Activate Your Wealth DNA Code →',
    'The BioEnergy Code': 'Transform Your Life with BioEnergy Code →'
  };

  return texts[offer.name] || 'Get Your Personalized Spiritual Reading →';
}

/**
 * Generate ClickBank CTA component props
 */
export function getClickBankCTA(category: 'numerology' | 'twin-flame' | 'manifestation' | 'general' | 'life-path', affiliateId?: string) {
  const offer = getClickBankOffer(category);
  const url = getClickBankUrl(offer, affiliateId);
  const text = getCTAText(offer);

  return {
    url,
    text,
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
 */
export function ClickBankCTA({ 
  category, 
  className = '',
  affiliateId 
}: { 
  category: 'numerology' | 'twin-flame' | 'manifestation' | 'general' | 'life-path';
  className?: string;
  affiliateId?: string;
}) {
  const cta = getClickBankCTA(category, affiliateId);

  return (
    <a
      href={cta.url}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.02] ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
      <div className="bg-zinc-950 text-amber-500 py-6 px-8 rounded-xl font-bold text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-black">
        {cta.text}
      </div>
      <p className="text-center text-zinc-500 text-sm mt-4">
        Trusted by 50,000+ seekers on their spiritual journey.
      </p>
    </a>
  );
}
