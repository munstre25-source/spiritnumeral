'use client';

import { useState } from 'react';
import { trackEvent, getSessionId } from '@/lib/analytics/client';

type Focus = 'love' | 'career' | 'spiritual' | 'money' | 'healing' | '';
type Feeling = 'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken' | '';
type Horizon = '7d' | '30d' | '90d' | '';
type LifecycleType = 'pinnacle' | 'challenge' | 'maturity' | 'birthday' | 'karmic_debt';

const TYPE_LABEL: Record<LifecycleType, string> = {
  pinnacle: 'Pinnacle',
  challenge: 'Challenge',
  maturity: 'Maturity',
  birthday: 'Birthday',
  karmic_debt: 'Karmic Debt',
};

const TYPE_NUMBERS: Record<LifecycleType, number[]> = {
  pinnacle: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  challenge: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  maturity: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  birthday: Array.from({ length: 31 }, (_, i) => i + 1),
  karmic_debt: [13, 14, 16, 19],
};

interface LifecyclePaidCTAProps {
  type: LifecycleType;
  number?: number;
}

export function LifecyclePaidCTA({ type, number }: LifecyclePaidCTAProps) {
  const [selected, setSelected] = useState<number | ''>(number ?? '');
  const [focus, setFocus] = useState<Focus>('');
  const [feeling, setFeeling] = useState<Feeling>('');
  const [timeHorizon, setTimeHorizon] = useState<Horizon>('');
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCheckout = Boolean(selected !== '' && focus && feeling && timeHorizon);

  const startCheckout = async () => {
    if (!canCheckout) {
      setError('Choose a number plus focus, feeling, and time horizon.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      trackEvent('cta_click', {
        product: 'blueprint',
        path: window.location.pathname,
        metadata: { label: 'Lifecycle CTA', type, number: selected },
      });
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product: 'blueprint',
          metadata: {
            numbers: typeof selected === 'number' ? [selected] : undefined,
            lifecycle: {
              type,
              number: typeof selected === 'number' ? selected : undefined,
            },
            focus,
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
    <div className="space-y-4">
      <div className="grid sm:grid-cols-3 gap-2 text-xs text-zinc-400">
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          {TYPE_LABEL[type]} insights
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Focus-specific guidance
        </div>
        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          7/30/90 day plan
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value ? parseInt(e.target.value, 10) : '')}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        >
          <option value="">{TYPE_LABEL[type]} number (required)</option>
          {TYPE_NUMBERS[type].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
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
        title={!canCheckout ? 'Choose a number and required fields to unlock' : 'Proceed to checkout'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="bg-zinc-950 text-amber-500 py-4 rounded-xl font-bold text-lg text-center transition-all group-hover:bg-transparent group-hover:text-black">
          {loading ? 'Preparing your PDF…' : 'Get Your Lifecycle Blueprint ($17)'}
        </div>
      </button>
      <p className="text-center text-zinc-500 text-sm">
        Required: {TYPE_LABEL[type]} number, focus, feeling, and time horizon.
      </p>
      <div className="text-center text-[11px] text-zinc-500">One-time $17 · Instant PDF · No login</div>
      {error && <p className="text-center text-red-400 text-sm">{error}</p>}
    </div>
  );
}
