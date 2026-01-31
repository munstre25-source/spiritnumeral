'use client';

import { useState } from 'react';
import { trackEvent, getSessionId } from '@/lib/analytics/client';

export default function BundleClient() {
  const [email, setEmail] = useState('');
  const [primary, setPrimary] = useState('');
  const [secondary, setSecondary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !primary) {
      setError('Please enter your email and primary number.');
      return;
    }

    const numbers = [parseInt(primary, 10), parseInt(secondary, 10)].filter((n) => !Number.isNaN(n));

    try {
      setLoading(true);
      trackEvent('cta_click', {
        product: 'bundle',
        path: window.location.pathname,
        metadata: { label: 'Get Bundle' },
      });

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
        body: JSON.stringify({
          product: 'bundle',
          metadata: {
            email,
            numbers,
          },
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.url) throw new Error(json.error || 'Checkout failed');
      window.location.href = json.url;
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-page text-primary">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Numerology Bundle</h1>
          <p className="text-secondary mt-3">
            Get all three reports in one purchase: Personal Blueprint, Relationship, and Wealth & Abundance.
          </p>
        </div>

        <form onSubmit={handleCheckout} className="bg-card border border-default rounded-3xl p-6 space-y-4">
          <div>
            <label className="text-sm text-secondary">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="mt-2 w-full bg-page border border-default rounded-xl px-4 py-3 outline-none focus:border-amber-500"
              placeholder="you@email.com"
            />
          </div>
          <div>
            <label className="text-sm text-secondary">Your primary number</label>
            <input
              value={primary}
              onChange={(e) => setPrimary(e.target.value)}
              type="number"
              required
              className="mt-2 w-full bg-page border border-default rounded-xl px-4 py-3 outline-none focus:border-amber-500"
              placeholder="e.g. 11"
            />
          </div>
          <div>
            <label className="text-sm text-secondary">Partner number (optional)</label>
            <input
              value={secondary}
              onChange={(e) => setSecondary(e.target.value)}
              type="number"
              className="mt-2 w-full bg-page border border-default rounded-xl px-4 py-3 outline-none focus:border-amber-500"
              placeholder="e.g. 22"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-500 text-zinc-950 font-semibold hover:bg-amber-400 transition disabled:opacity-60"
          >
            {loading ? 'Redirecting…' : 'Get the Bundle'}
          </button>
          <p className="text-xs text-muted text-center">One‑time payment. Delivered to your email.</p>
        </form>
      </div>
    </main>
  );
}
