'use client';

import Link from 'next/link';
import { trackEvent } from '@/lib/analytics/client';
import { OFFERS } from '@/lib/offers';

export function QuickReportUpsell({ prefillNumber }: { prefillNumber?: number }) {
  const quickHref = prefillNumber ? `/quick-report?number=${prefillNumber}` : '/quick-report';
  return (
    <div className="mt-4 rounded-2xl border border-default bg-page/60 p-5 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        {OFFERS.quick_report.badge && (
          <span className="text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border border-amber-500/30 text-amber-600 bg-amber-500/10">
            {OFFERS.quick_report.badge}
          </span>
        )}
      </div>
      <h4 className="text-lg font-semibold text-primary mb-1">{OFFERS.quick_report.title}</h4>
      <p className="text-sm text-secondary mb-3">{OFFERS.quick_report.body}</p>
      <Link
        href={quickHref}
        onClick={() =>
          trackEvent('cta_click', {
            product: 'quick_report',
            metadata: { label: 'Quick Report CTA', number: prefillNumber },
          })
        }
        className="inline-flex items-center justify-center rounded-xl bg-amber-500 text-black px-4 py-2.5 text-sm font-semibold hover:bg-amber-400 transition"
      >
        {OFFERS.quick_report.cta}
      </Link>
    </div>
  );
}
