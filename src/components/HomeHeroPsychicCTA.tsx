'use client';

import Link from 'next/link';
import { resolvePsychicOffer, isEmotionalPath } from '@/lib/offers';
import { trackEvent, getCtaVariant } from '@/lib/analytics/client';
import { useAbConfig, getAssignedVariant } from '@/lib/ab-config';

export function HomeHeroPsychicCTA() {
  const offer = resolvePsychicOffer('/');
  const pathname = '/';
  const isEmotional = isEmotionalPath(pathname);
  const abConfig = useAbConfig();
  const fallback = isEmotional ? getCtaVariant() : null;
  const { variantId: variant, copy: ctaText } = isEmotional
    ? getAssignedVariant(abConfig, fallback || 'control', offer.cta)
    : { variantId: null as string | null, copy: offer.cta };

  return (
    <div className="flex flex-col items-center gap-3 mb-10">
      <Link
        href={offer.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() =>
          trackEvent('cta_click', {
            product: offer.id,
            path: pathname,
            metadata: { label: 'Hero Psychic', ...(variant && { ctaVariant: variant }) },
          })
        }
        className="inline-block btn-primary px-8 py-4 rounded-lg font-bold text-lg transition-colors"
      >
        {ctaText}
      </Link>
      <p className="text-muted text-xs mt-1">No credit card required · Instant insight</p>
      <Link
        href="/calculator"
        className="text-sm text-muted hover:text-amber-600 transition-colors"
      >
        Or calculate your life path
      </Link>
    </div>
  );
}
