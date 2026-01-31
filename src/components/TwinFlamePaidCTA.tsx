'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, getSessionId } from '@/lib/analytics/client';
import { useCtaImpression } from '@/lib/analytics/useCtaImpression';

type Feeling = 'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken' | '';
type Horizon = '7d' | '30d' | '90d' | '';
type RelationshipStatus = 'single' | 'dating' | 'committed' | 'situationship' | 'separated' | '';

export function TwinFlamePaidCTA() {
  const pathname = usePathname();
  const impressionRef = useCtaImpression({ product: 'relationship', path: pathname || undefined, label: 'Twin Flame PDF CTA' });
  const [feeling, setFeeling] = useState<Feeling>('');
  const [timeHorizon, setTimeHorizon] = useState<Horizon>('');
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus>('');
  const [challenge, setChallenge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canCheckout = Boolean(feeling && timeHorizon && relationshipStatus);

  const startCheckout = async () => {
    if (!canCheckout) {
      setError('Pick feeling, time horizon, and relationship status to personalize your PDF.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      trackEvent('cta_click', {
        product: 'relationship',
        path: window.location.pathname,
        metadata: { label: 'Twin Flame PDF CTA' },
      });
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product: 'relationship',
          metadata: {
            focus: 'love',
            feeling,
            timeHorizon,
            relationshipStatus,
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
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Emotional dynamics
        </div>
        <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Timing cycles (7/30/90d)
        </div>
        <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Challenge-based steps
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <select
          value={feeling}
          onChange={(e) => setFeeling(e.target.value as Feeling)}
          className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        >
          <option value="">How do you feel? (required)</option>
          <option value="calm">Calm</option>
          <option value="stuck">Stuck</option>
          <option value="anxious">Anxious</option>
          <option value="excited">Excited</option>
          <option value="heartbroken">Heartbroken</option>
        </select>
        <select
          value={relationshipStatus}
          onChange={(e) => setRelationshipStatus(e.target.value as RelationshipStatus)}
          className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
        >
          <option value="">Relationship status (required)</option>
          <option value="single">Single</option>
          <option value="dating">Dating</option>
          <option value="committed">Committed</option>
          <option value="situationship">Situationship</option>
          <option value="separated">Separated</option>
        </select>
        <select
          value={timeHorizon}
          onChange={(e) => setTimeHorizon(e.target.value as Horizon)}
          className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
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
          className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60 sm:col-span-3"
        />
      </div>

      <button
        onClick={startCheckout}
        disabled={loading || !canCheckout}
        className="w-full group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
        title={!canCheckout ? 'Select feeling, relationship status, and time horizon' : 'Proceed to checkout'}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
        <div className="bg-page text-primary py-4 rounded-xl font-bold text-lg text-center transition-all group-hover:bg-transparent group-hover:text-black">
          {loading ? 'Preparing your PDF…' : 'Get Your Twin Flame PDF ($29)'}
        </div>
      </button>
      <p className="text-center text-muted text-sm">
        Required: feeling, relationship status, and time horizon. We build your PDF on your inputs plus twin-flame guidance.
      </p>
      <div className="text-center text-[11px] text-muted">One-time $29 · Instant PDF · No login</div>
      {error && <p className="text-center text-red-400 text-sm">{error}</p>}
    </div>
  );
}
