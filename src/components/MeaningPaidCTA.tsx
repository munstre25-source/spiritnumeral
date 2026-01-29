'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, getSessionId } from '@/lib/analytics/client';
import { useCtaImpression } from '@/lib/analytics/useCtaImpression';

type Focus = 'love' | 'career' | 'spiritual' | 'money' | 'healing' | '';
type Feeling = 'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken' | '';
type Horizon = '7d' | '30d' | '90d' | '';

interface MeaningPaidCTAProps {
  number?: number;
}

const DEFAULT_NUMBERS = [111, 222, 333, 444, 555, 666, 777, 888, 999];

export function MeaningPaidCTA({ number }: MeaningPaidCTAProps) {
  const paymentsReady = true; // assume payments are ready; remove coming-soon UX
  const pathname = usePathname();
  const impressionRef = useCtaImpression({ product: 'blueprint', path: pathname || undefined, label: 'Meaning PDF CTA' });
  const [name, setName] = useState('');
  const [focus, setFocus] = useState<Focus>('');
  const [feeling, setFeeling] = useState<Feeling>('');
  const [timeHorizon, setTimeHorizon] = useState<Horizon>('');
  const [challenge, setChallenge] = useState('');
  const [selectedNumber, setSelectedNumber] = useState<number | ''>(number ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCheckout = Boolean((number || selectedNumber) && focus && feeling && timeHorizon);

  const startCheckout = async () => {
    if (!canCheckout) {
      setError('Add focus, feeling, and time horizon to personalize your PDF.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const chosenNumber = number || (typeof selectedNumber === 'number' ? selectedNumber : undefined);
      trackEvent('cta_click', {
        product: 'blueprint',
        path: window.location.pathname,
        metadata: { label: 'Meaning PDF CTA', number: chosenNumber },
      });
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product: 'blueprint',
          metadata: {
            numbers: chosenNumber ? [chosenNumber] : undefined,
            name: name || undefined,
            focus: focus || undefined,
            feeling: feeling || undefined,
            timeHorizon: timeHorizon || undefined,
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
      {/* Value props for trust & clarity */}
      <div className="grid sm:grid-cols-3 gap-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          7-day action plan
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Focus-specific guidance
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Challenge-based affirmation
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {!number && (
          <select
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value ? parseInt(e.target.value, 10) : '')}
            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60 sm:col-span-2"
          >
            <option value="">Choose your number (required)</option>
            {DEFAULT_NUMBERS.map((num) => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
        )}
        <input
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 40))}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        />
        <input
          placeholder="Biggest challenge (optional, 80 chars)"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value.slice(0, 80))}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        />
        <select
          value={focus}
          onChange={(e) => setFocus(e.target.value as Focus)}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        >
          <option value="">Focus area (required)</option>
          <option value="love">Love</option>
          <option value="career">Career</option>
          <option value="spiritual">Spiritual Growth</option>
          <option value="money">Money</option>
          <option value="healing">Healing</option>
        </select>
        <select
          value={feeling}
          onChange={(e) => setFeeling(e.target.value as Feeling)}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
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
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60 sm:col-span-2"
        >
          <option value="">Time horizon (required)</option>
          <option value="7d">Next 7 days</option>
          <option value="30d">Next 30 days</option>
          <option value="90d">Next 90 days</option>
        </select>
      </div>

      <button
        onClick={startCheckout}
        disabled={loading || !canCheckout}
        className="w-full group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
        title={!canCheckout ? 'Pick focus, feeling, and time horizon to unlock' : 'Proceed to checkout'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="bg-zinc-950 text-amber-500 py-4 rounded-xl font-bold text-lg text-center transition-all group-hover:bg-transparent group-hover:text-black">
          {loading ? 'Preparing your PDF…' : 'Get Your Personalized PDF ($17)'}
        </div>
      </button>
      <p className="text-center text-zinc-500 text-sm">
        Required: choose a number, focus, feeling, and time horizon. We build your PDF on your inputs.
      </p>
      <div className="text-center text-[11px] text-zinc-500">One-time $17 · Instant PDF · No login</div>
      {error && <p className="text-center text-red-400 text-sm">{error}</p>}
    </div>
  );
}
