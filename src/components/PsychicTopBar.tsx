'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { resolvePsychicOffer } from '@/lib/offers';
import { trackEvent } from '@/lib/analytics/client';

/** Slim PsychicOz CTA bar below navbar – visible on every page above the fold. */
export function PsychicTopBar() {
  const pathname = usePathname();
  const offer = resolvePsychicOffer(pathname || '/');

  return (
    <div className="w-full bg-amber-500/15 border-b border-amber-500/20">
      <div className="max-w-6xl mx-auto px-4 py-2 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
        <span className="text-amber-600 dark:text-amber-400 text-xs font-medium">
          {offer.title}
        </span>
        <Link
          href={offer.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() =>
            trackEvent('cta_click', {
              product: offer.id,
              path: pathname,
              metadata: { label: 'Psychic Top Bar' },
            })
          }
          className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors shrink-0"
        >
          {offer.cta}
        </Link>
      </div>
    </div>
  );
}
