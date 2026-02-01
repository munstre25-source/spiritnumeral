'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { resolvePsychicOffer } from '@/lib/offers';
import { trackEvent } from '@/lib/analytics/client';

/** Sticky bar that appears after scroll – primary PsychicOz CTA. */
export function StickyPsychicBar() {
  const pathname = usePathname();
  const offer = resolvePsychicOffer(pathname || '/');
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || dismissed) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const threshold = Math.min(400, window.innerHeight * 0.4);
      if (scrollY > threshold) setVisible(true);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  const dismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('stickyPsychicDismissed', '1');
  };

  useEffect(() => {
    if (sessionStorage.getItem('stickyPsychicDismissed')) setDismissed(true);
  }, []);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:bottom-4 md:left-auto md:right-4 md:max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-card border border-amber-500/30 rounded-t-2xl md:rounded-2xl shadow-xl p-4 flex items-center gap-3 md:gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-primary font-semibold text-sm truncate">{offer.title}</p>
          <p className="text-muted text-xs">First 3 min free</p>
        </div>
        <Link
          href={offer.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          onClick={() =>
            trackEvent('cta_click', {
              product: offer.id,
              path: pathname,
              metadata: { label: 'Sticky Psychic Bar' },
            })
          }
          className="shrink-0 px-4 py-2 rounded-lg bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-colors"
        >
          Get reading →
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="shrink-0 text-muted hover:text-primary p-1"
          aria-label="Dismiss"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>
      </div>
    </div>
  );
}
