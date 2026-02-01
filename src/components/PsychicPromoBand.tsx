'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { resolvePsychicOffer } from '@/lib/offers';
import { trackEvent } from '@/lib/analytics/client';

/** Primary CTA band above footer – PsychicOz contextual offer. */
export function PsychicPromoBand() {
  const pathname = usePathname();
  const offer = resolvePsychicOffer(pathname || '/');

  return (
    <section className="w-full bg-amber-500/10 border-y border-amber-500/20 py-10 md:py-12">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-amber-600 dark:text-amber-400 text-xs uppercase tracking-widest mb-2">
          Recommended by readers
        </p>
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2">
          {offer.title}
        </h2>
        <p className="text-secondary text-sm md:text-base mb-6">
          {offer.body}
        </p>
        <Link
          href={offer.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() =>
            trackEvent('cta_click', {
              product: offer.id,
              path: pathname,
              metadata: { label: 'Psychic Promo Band' },
            })
          }
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-amber-500 text-black text-base font-bold hover:bg-amber-400 transition-colors shadow-lg"
        >
          {offer.cta}
        </Link>
      </div>
    </section>
  );
}
