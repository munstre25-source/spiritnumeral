'use client';

import { usePathname } from 'next/navigation';
import { trackEvent, getSessionId } from '@/lib/analytics/client';
import { useCtaImpression } from '@/lib/analytics/useCtaImpression';

type Product = 'blueprint' | 'relationship';

interface PaidCTAProps {
  product: Product;
  numbers?: number[];
  birthdays?: string[];
  compatibility?: { score: number; description?: string };
  label?: string;
  sublabel?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'inline';
}

export function PaidCTA({
  product,
  numbers,
  birthdays,
  compatibility,
  label,
  sublabel,
  className = '',
  variant = 'primary',
}: PaidCTAProps) {
  const pathname = usePathname();
  const impressionRef = useCtaImpression({ product, path: pathname || undefined, label: label || undefined });
  const defaultLabel =
    product === 'relationship' ? 'Get Relationship Report ($29)' : 'Get Personal Blueprint ($17)';
  const defaultSub =
    product === 'relationship'
      ? 'Emotional dynamics, timing cycles, and next steps for your connection.'
      : 'Personalized numerology blueprint based on your key numbers.';

  const handleClick = async () => {
    try {
      trackEvent('cta_click', {
        product,
        path: window.location.pathname,
        metadata: { label: label || defaultLabel },
      });
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product,
          metadata: {
            numbers,
            birthdays,
            compatibility,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || 'Checkout failed');
      window.location.href = json.url;
    } catch (err) {
      alert('Could not start checkout. Please try again.');
    }
  };

  if (variant === 'inline') {
    return (
      <span ref={impressionRef} className={className}>
        <button
          onClick={handleClick}
          className="text-amber-600 hover:text-amber-600 underline font-medium"
        >
          {label || defaultLabel}
        </button>
      </span>
    );
  }

  if (variant === 'secondary') {
    return (
      <div ref={impressionRef} className={className}>
        <button
          onClick={handleClick}
          className="w-full block p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/30 hover:border-amber-500/60 transition-all text-left"
        >
          <p className="text-amber-600 font-bold text-lg mb-2">{label || defaultLabel}</p>
          <p className="text-secondary text-sm">{sublabel || defaultSub}</p>
        </button>
      </div>
    );
  }

  // primary
  return (
    <div ref={impressionRef} className={className}>
      <button
        onClick={handleClick}
        className="group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block w-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="bg-page text-amber-500 py-6 rounded-xl font-bold text-xl md:text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-black">
          {label || defaultLabel}
        </div>
      </button>
      <p className="text-center text-muted text-sm mt-4">{sublabel || defaultSub}</p>
    </div>
  );
}
