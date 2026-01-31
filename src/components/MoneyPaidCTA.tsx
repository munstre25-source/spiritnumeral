'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, getSessionId } from '@/lib/analytics/client';
import { useCtaImpression } from '@/lib/analytics/useCtaImpression';

type Horizon = '7d' | '30d' | '90d' | '';
type Feeling = 'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken' | '';

interface MoneyPaidCTAProps {
  number?: number;
}

export function MoneyPaidCTA({ number }: MoneyPaidCTAProps) {
  const pathname = usePathname();
  const impressionRef = useCtaImpression({ product: 'wealth', path: pathname || undefined, label: 'Wealth PDF CTA' });
  const [timeHorizon, setTimeHorizon] = useState<Horizon>('');
  const [feeling, setFeeling] = useState<Feeling>('');
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCheckout = Boolean(timeHorizon && feeling);

  const startCheckout = async () => {
    if (!canCheckout) {
      setError('Choose feeling and time horizon to personalize your wealth plan.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      trackEvent('cta_click', {
        product: 'wealth',
        path: window.location.pathname,
        metadata: { label: 'Wealth PDF CTA', number },
      });
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product: 'wealth',
          metadata: {
            numbers: number ? [number] : undefined,
            focus: 'money',
            feeling,
            timeHorizon,
            challenge: challenge ? challenge.slice(0, 80) : undefined,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || 'Checkout failed');
      window.location.href = json.url;
    } catch (err: any) {
      setError(err.message || 'Could not start checkout');
      setLoading(false);
    }
  };

  return (
    <div ref={impressionRef} className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-2 text-xs text-secondary">
        <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Cashflow + expense trim
        </div>
        <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          7/30/90-day money plan
        </div>
        <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Challenge-based affirmation
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <select
          value={feeling}
          onChange={(e) => setFeeling(e.target.value as Feeling)}
          className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-green-400/60"
        >
          <option value="">How do you feel? (required)</option>
          <option value="calm">Calm</option>
          <option value="stuck">Stuck</option>
          <option value="anxious">Anxious</option>
          <option value="excited">Excited</option>
          <option value="heartbroken">Heartbroken</option>
        </select>
        <select
          value={timeHorizon}
          onChange={(e) => setTimeHorizon(e.target.value as Horizon)}
          className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-green-400/60"
        >
          <option value="">Time horizon (required)</option>
          <option value="7d">Next 7 days</option>
          <option value="30d">Next 30 days</option>
          <option value="90d">Next 90 days</option>
        </select>
        <input
          placeholder="Biggest money challenge (optional, 80 chars)"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value.slice(0, 80))}
          className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-green-400/60"
        />
      </div>

      <button
        onClick={startCheckout}
        disabled={loading || !canCheckout}
        className="w-full group relative overflow-hidden bg-green-500 p-1 rounded-2xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
        title={!canCheckout ? 'Pick feeling and time horizon to personalize' : 'Proceed to checkout'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="bg-page text-green-400 py-4 rounded-xl font-bold text-lg text-center transition-all group-hover:bg-transparent group-hover:text-black">
          {loading ? 'Preparing your wealth PDF…' : 'Unlock Wealth PDF ($49)'}
        </div>
      </button>
      <p className="text-center text-muted text-sm">
        We build your wealth plan on {number ? `Angel Number ${number}` : 'your money focus'}, plus your inputs above.
      </p>
      <div className="text-center text-[11px] text-muted">One-time $49 · Instant PDF · No login</div>
      {error && <p className="text-center text-red-400 text-sm">{error}</p>}
    </div>
  );
}
