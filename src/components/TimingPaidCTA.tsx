'use client';

import { useMemo, useState } from 'react';
import { trackEvent, getSessionId } from '@/lib/analytics/client';

type Focus = 'love' | 'career' | 'spiritual' | 'money' | 'healing' | '';
type Feeling = 'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken' | '';
type Horizon = '7d' | '30d' | '90d' | '';

function reduceNumber(value: number) {
  let sum = value;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
  }
  return sum;
}

function sumDigits(value: number) {
  return value
    .toString()
    .split('')
    .reduce((acc, digit) => acc + Number(digit), 0);
}

export function TimingPaidCTA() {
  const today = new Date();
  const [birthdate, setBirthdate] = useState('');
  const [targetDate, setTargetDate] = useState(today.toISOString().slice(0, 10));
  const [focus, setFocus] = useState<Focus>('');
  const [feeling, setFeeling] = useState<Feeling>('');
  const [timeHorizon, setTimeHorizon] = useState<Horizon>('');
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timing = useMemo(() => {
    if (!birthdate || !targetDate) return null;
    const birth = new Date(birthdate);
    const target = new Date(targetDate);

    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    const year = target.getFullYear();

    const personalYear = reduceNumber(sumDigits(month) + sumDigits(day) + sumDigits(year));
    const personalMonth = reduceNumber(personalYear + sumDigits(target.getMonth() + 1));
    const personalDay = reduceNumber(personalMonth + sumDigits(target.getDate()));

    return { personalYear, personalMonth, personalDay };
  }, [birthdate, targetDate]);

  const canCheckout = Boolean(birthdate && targetDate && timing && focus && feeling && timeHorizon);

  const startCheckout = async () => {
    if (!canCheckout || !timing) {
      setError('Enter birthdate, target date, plus focus, feeling, and time horizon.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      trackEvent('cta_click', {
        product: 'blueprint',
        path: window.location.pathname,
        metadata: { label: 'Timing CTA' },
      });
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product: 'blueprint',
          metadata: {
            numbers: [timing.personalYear],
            personalTiming: {
              birthdate,
              targetDate,
              personalYear: timing.personalYear,
              personalMonth: timing.personalMonth,
              personalDay: timing.personalDay,
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
          Personal Year/Month/Day
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
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        />
        <input
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
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
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        >
          <option value="">Time horizon (required)</option>
          <option value="7d">Next 7 days</option>
          <option value="30d">Next 30 days</option>
          <option value="90d">Next 90 days</option>
        </select>
        <input
          placeholder="Biggest challenge (optional, 80 chars)"
          value={challenge}
          onChange={(e) => setChallenge(e.target.value.slice(0, 80))}
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60 sm:col-span-2"
        />
      </div>

      {timing && (
        <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
          <span className="px-3 py-1 rounded-full bg-zinc-800">Year: {timing.personalYear}</span>
          <span className="px-3 py-1 rounded-full bg-zinc-800">Month: {timing.personalMonth}</span>
          <span className="px-3 py-1 rounded-full bg-zinc-800">Day: {timing.personalDay}</span>
        </div>
      )}

      <button
        onClick={startCheckout}
        disabled={loading || !canCheckout}
        className="w-full group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
        title={!canCheckout ? 'Add your dates and required fields to unlock' : 'Proceed to checkout'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="bg-zinc-950 text-amber-500 py-4 rounded-xl font-bold text-lg text-center transition-all group-hover:bg-transparent group-hover:text-black">
          {loading ? 'Preparing your PDF…' : 'Get Your Timing Blueprint ($17)'}
        </div>
      </button>
      <p className="text-center text-zinc-500 text-sm">
        Required: birthdate, target date, focus, feeling, and time horizon. We build your PDF from your timing numbers.
      </p>
      <div className="text-center text-[11px] text-zinc-500">One-time $17 · Instant PDF · No login</div>
      {error && <p className="text-center text-red-400 text-sm">{error}</p>}
    </div>
  );
}
