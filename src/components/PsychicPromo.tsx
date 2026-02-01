'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { resolvePsychicOffer, isEmotionalPath } from '@/lib/offers';
import { trackEvent, getCtaVariant } from '@/lib/analytics/client';
import { useAbConfig, getAssignedVariant } from '@/lib/ab-config';

const DEFAULT_CONTEXTUAL_LINE = 'Readers who want one clear answer often try a short reading next.';

export interface PsychicPromoProps {
  /** Optional contextual sentence shown above the offer (guidance-style). */
  contextualLine?: string;
  /** Label for analytics (e.g. "Psychic After Results", "Psychic After Content"). */
  label?: string;
}

export function PsychicPromo({ contextualLine, label = 'Psychic Promo' }: PsychicPromoProps = {}) {
  const pathname = usePathname();
  const offer = resolvePsychicOffer(pathname || '/');
  const line = contextualLine ?? DEFAULT_CONTEXTUAL_LINE;
  const isEmotional = isEmotionalPath(pathname || '/');
  const abConfig = useAbConfig();
  const fallback = isEmotional ? getCtaVariant() : null;
  const { variantId, copy: ctaText } = isEmotional
    ? getAssignedVariant(abConfig, fallback || 'control', offer.cta)
    : { variantId: null as string | null, copy: offer.cta };
  const variant = variantId;

  return (
    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-4 text-center">
      <p className="text-muted text-xs mb-2">{line}</p>
      <p className="text-primary text-sm font-medium mb-1">{offer.title}</p>
      <p className="text-muted text-xs mb-3">{offer.body}</p>
      <Link
        href={offer.href}
        target="_blank"
        rel="noopener noreferrer sponsored"
        onClick={() =>
          trackEvent('cta_click', {
            product: offer.id,
            path: pathname,
            metadata: { label, ...(variant && { ctaVariant: variant }) },
          })
        }
        className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
      >
        {ctaText}
      </Link>
      <p className="text-muted text-[10px] mt-2 tracking-wide">No credit card required · Instant insight</p>
    </div>
  );
}
