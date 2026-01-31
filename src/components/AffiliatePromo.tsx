'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics/client';
import type { Offer } from '@/lib/offers';

export function AffiliatePromo({ offer, context }: { offer: Offer; context?: string }) {
  return (
    <div className="mt-4 rounded-2xl border border-default bg-page/60 p-5">
      <div className="flex items-center gap-3 mb-2">
        {offer.badge && (
          <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-amber-500/30 text-amber-600 bg-amber-500/10">
            {offer.badge}
          </span>
        )}
        {context && (
          <span className="text-[10px] uppercase tracking-widest text-muted">
            {context}
          </span>
        )}
      </div>
      <h4 className="text-lg font-semibold text-primary mb-1">{offer.title}</h4>
      <p className="text-sm text-secondary mb-4">{offer.body}</p>
      <Link
        href={offer.href}
        onClick={() => trackEvent('cta_click', { product: offer.product || 'affiliate', metadata: { label: offer.title } })}
        className="inline-flex items-center justify-center rounded-xl bg-amber-500/15 border border-amber-500/40 px-4 py-2 text-sm font-semibold text-amber-600 hover:bg-amber-500/25 transition"
      >
        {offer.cta}
      </Link>
    </div>
  );
}
