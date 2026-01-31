'use client';

import { useState } from 'react';

type StatusResponse = {
  email: string;
  product: string;
  status: string;
  created_at: string;
  order_id: string;
};

export default function OrderStatusClient() {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [error, setError] = useState('');
  const [resent, setResent] = useState('');

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResent('');
    setStatus(null);

    try {
      const res = await fetch('/api/order/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderId: orderId || undefined }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Lookup failed');
      setStatus(json);
    } catch (err: any) {
      setError(err.message || 'Lookup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setError('');
    setResent('');
    try {
      const res = await fetch('/api/order/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, orderId: orderId || status?.order_id }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Resend failed');
      setResent('Your report was re-sent. Please check your inbox.');
    } catch (err: any) {
      setError(err.message || 'Resend failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-page text-primary">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Order Status & PDF Resend</h1>
          <p className="text-secondary mt-3">
            Enter the email you used at checkout. If you have an order ID, include it for faster lookup.
          </p>
        </div>

        <form onSubmit={handleLookup} className="bg-card border border-default rounded-3xl p-6 space-y-4">
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
            <label className="text-sm text-secondary">Order ID (optional)</label>
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              type="text"
              className="mt-2 w-full bg-page border border-default rounded-xl px-4 py-3 outline-none focus:border-amber-500"
              placeholder="Order ID from your receipt"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-500 text-zinc-950 font-semibold hover:bg-amber-400 transition disabled:opacity-60"
          >
            {loading ? 'Checking…' : 'Check Status'}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-300">
            {error}
          </div>
        )}

        {status && (
          <div className="mt-6 p-6 rounded-3xl bg-card border border-default space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-secondary">Product</p>
              <p className="font-semibold text-primary capitalize">{status.product}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-secondary">Status</p>
              <p className="font-semibold text-primary capitalize">{status.status}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-secondary">Order ID</p>
              <p className="font-semibold text-primary">{status.order_id}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-secondary">Created</p>
              <p className="font-semibold text-primary">{new Date(status.created_at).toLocaleString()}</p>
            </div>
            <button
              onClick={handleResend}
              disabled={loading}
              className="mt-4 w-full py-3 rounded-xl border border-amber-500/40 text-amber-600 font-semibold hover:bg-amber-500/10 transition disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Resend My PDF'}
            </button>
            {resent && <p className="text-green-400 text-sm mt-2">{resent}</p>}
          </div>
        )}
      </div>
    </main>
  );
}
