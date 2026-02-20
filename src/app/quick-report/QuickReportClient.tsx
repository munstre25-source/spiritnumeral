'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { trackEvent, getSessionId } from '@/lib/analytics/client';

const DEFAULT_NUMBERS = [111, 222, 333, 444, 555, 666, 777, 888, 999];

function QuickReportForm() {
  const searchParams = useSearchParams();
  const prefill = searchParams.get('number');
  const [number, setNumber] = useState<number | ''>(
    prefill ? (parseInt(prefill, 10) || '') : ''
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (prefill) {
      const n = parseInt(prefill, 10);
      if (!isNaN(n)) setNumber(n);
    }
  }, [prefill]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const num = number === '' ? undefined : number;
    if (num === undefined || num < 0) {
      setError('Please choose a number.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      trackEvent('cta_click', {
        product: 'quick_report',
        path: '/quick-report',
        metadata: { label: 'Quick Report Checkout', number: num },
      });
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product: 'quick_report',
          metadata: { numbers: [num], product: 'quick_report' },
          successUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/thank-you`,
          cancelUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/quick-report`,
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
    <main className="min-h-screen bg-page text-primary">
      <div className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Quick Number Report</h1>
        <p className="text-secondary mb-8">
          One number, one page. Instant meaning and what to do next. No quiz, no long form.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm font-medium text-primary mb-1">Your number</label>
          <select
            value={number === '' ? '' : number}
            onChange={(e) => setNumber(e.target.value ? parseInt(e.target.value, 10) : '')}
            required
            className="w-full bg-card border border-default text-primary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500"
          >
            <option value="">Choose a number</option>
            {DEFAULT_NUMBERS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition disabled:opacity-50"
          >
            {loading ? 'Preparing checkout…' : 'Get My Quick Report — $7'}
          </button>
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </form>
        <p className="text-muted text-sm mt-6 text-center">
          PDF delivered to your email within minutes. Want the full personalized Blueprint?{' '}
          <Link href="/quiz" className="text-amber-500 hover:underline">
            Take the quiz — $17
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function QuickReportClientPage() {
  return <QuickReportForm />;
}
