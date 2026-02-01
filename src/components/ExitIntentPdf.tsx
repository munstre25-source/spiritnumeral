'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics/client';

/** Exit-intent only: offers Quick Report $7 (PDF). */
export function ExitIntentPdf() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem('exitIntentPdfShown', '1');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  useEffect(() => {
    if (sessionStorage.getItem('exitIntentPdfShown')) setHasShown(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[99] flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-card rounded-2xl p-6 md:p-8 border border-default shadow-2xl">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-muted hover:text-primary"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </button>

        <p className="text-amber-600 dark:text-amber-400 text-xs uppercase tracking-widest mb-2">Before you go</p>
        <h3 className="text-xl font-bold text-primary mb-2">Get your Quick Number Report</h3>
        <p className="text-secondary text-sm mb-6">One number, instant PDF — no login.</p>

        <Link
          href="/quick-report"
          onClick={() => {
            trackEvent('cta_click', { product: 'quick_report', metadata: { label: 'Exit Intent Modal' } });
            setIsOpen(false);
          }}
          className="block w-full text-center py-3 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition-colors"
        >
          Quick Report — $7
        </Link>

        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="w-full mt-4 text-muted text-sm hover:text-primary"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
