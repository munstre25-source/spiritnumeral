'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, isTrackingDisabled } from '@/lib/analytics/client';

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (isTrackingDisabled()) return;
    if (!pathname) return;
    trackEvent('page_view', { path: pathname, referrer: document.referrer || null });
  }, [pathname]);

  return null;
}
