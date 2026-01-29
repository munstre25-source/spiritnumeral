'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export const metadata = {
  robots: 'noindex',
};

type Stats = {
  totals: {
    pageViews: number;
    ctaClicks: number;
    checkoutStarts: number;
    orders: number;
    pdfSent: number;
    revenueCents: number;
  };
  productBreakdown: Record<string, { count: number; revenueCents: number }>;
  funnels: Record<string, { clicks: number; checkouts: number; orders: number; pdfSent: number }>;
  topCtas: { path: string; product: string; count: number }[];
  recentReports: { product: string; price_cents: number; status: string; created_at: string; email: string; order_id: string }[];
  dailySeries: { date: string; pageViews: number; ctaClicks: number; orders: number }[];
};

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStats = async (key: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/stats?days=30', {
        headers: { 'x-admin-key': key },
      });
      if (!res.ok) throw new Error('Invalid admin key');
      const json = await res.json();
      setStats(json);
      sessionStorage.setItem('admin_key', key);
    } catch (err: any) {
      setError(err.message || 'Failed to load stats');
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key');
    if (saved) {
      setAdminKey(saved);
      fetchStats(saved);
    }
  }, []);

  const totals = stats?.totals;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-zinc-500">Offers, PDFs, clicks, and revenue</p>
          </div>
          <Link href="/" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
            ← Back to Site
          </Link>
        </header>

        {!stats ? (
          <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-6">Admin Access</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchStats(adminKey);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Admin Key</label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none transition-all"
                  placeholder="Enter your admin key"
                  required
                />
                <p className="mt-2 text-[10px] text-zinc-500">Set ADMIN_DASHBOARD_KEY in your environment.</p>
              </div>
              {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                {loading ? 'Loading...' : 'View Dashboard'}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              {[
                { label: 'Page Views', value: totals?.pageViews || 0, color: 'text-blue-400' },
                { label: 'CTA Clicks', value: totals?.ctaClicks || 0, color: 'text-amber-400' },
                { label: 'Checkout Starts', value: totals?.checkoutStarts || 0, color: 'text-purple-400' },
                { label: 'Orders', value: totals?.orders || 0, color: 'text-green-400' },
                { label: 'PDFs Sent', value: totals?.pdfSent || 0, color: 'text-emerald-400' },
                { label: 'Revenue', value: `$${((totals?.revenueCents || 0) / 100).toFixed(2)}`, color: 'text-yellow-400' },
              ].map((card) => (
                <div key={card.label} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl">
                  <p className="text-zinc-500 text-xs mb-1">{card.label}</p>
                  <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Product Breakdown */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6">
              <h3 className="font-semibold mb-4">Offer Performance (Last 30 Days)</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {Object.entries(stats.productBreakdown).map(([product, data]) => (
                  <div key={product} className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                    <p className="text-zinc-400 text-sm capitalize">{product}</p>
                    <p className="text-white font-bold text-lg">{data.count} reports</p>
                    <p className="text-amber-400 text-sm">${(data.revenueCents / 100).toFixed(2)} revenue</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Funnel */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h3 className="font-semibold">Offer Funnel (Click → Checkout → Order → PDF)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Offer</th>
                      <th className="px-6 py-4 font-medium">Clicks</th>
                      <th className="px-6 py-4 font-medium">Checkouts</th>
                      <th className="px-6 py-4 font-medium">Orders</th>
                      <th className="px-6 py-4 font-medium">PDFs Sent</th>
                      <th className="px-6 py-4 font-medium">Click → Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {Object.entries(stats.funnels || {}).map(([product, f]) => {
                      const conversion = f.clicks ? ((f.orders / f.clicks) * 100).toFixed(1) : '0.0';
                      return (
                        <tr key={product} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 text-zinc-300 capitalize">{product}</td>
                          <td className="px-6 py-4">{f.clicks}</td>
                          <td className="px-6 py-4">{f.checkouts}</td>
                          <td className="px-6 py-4">{f.orders}</td>
                          <td className="px-6 py-4">{f.pdfSent}</td>
                          <td className="px-6 py-4 text-amber-400">{conversion}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top CTA Pages */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h3 className="font-semibold">Top CTA Clicks</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Path</th>
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Clicks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {stats.topCtas.map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4 text-zinc-300 font-mono text-sm">{row.path}</td>
                        <td className="px-6 py-4 text-zinc-400">{row.product}</td>
                        <td className="px-6 py-4">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800">
                <h3 className="font-semibold">Recent Reports</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {stats.recentReports.map((row, i) => (
                      <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4 text-zinc-300 font-mono text-sm">{new Date(row.created_at).toLocaleString()}</td>
                        <td className="px-6 py-4 text-zinc-400">{row.product}</td>
                        <td className="px-6 py-4">{row.status}</td>
                        <td className="px-6 py-4 text-amber-400">${(row.price_cents / 100).toFixed(2)}</td>
                        <td className="px-6 py-4 text-zinc-500">{row.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  sessionStorage.removeItem('admin_key');
                  setStats(null);
                  setAdminKey('');
                }}
                className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
