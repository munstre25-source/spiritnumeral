'use client';

import { useEffect, useState } from 'react';

type Stats = {
  totals: {
    pageViews: number;
    uniqueSessions: number;
    newSessions: number;
    returningSessions: number;
    ctaImpressions: number;
    ctaClicks: number;
    checkoutStarts: number;
    orders: number;
    pdfSent: number;
    pdfFailed: number;
    revenueCents: number;
  };
  productBreakdown: Record<string, { count: number; revenueCents: number }>;
  funnels: Record<string, { impressions: number; clicks: number; checkouts: number; orders: number; pdfSent: number; pdfFailed: number }>;
  offerCtr: { product: string; impressions: number; clicks: number; ctr: number }[];
  topCtas: { path: string; product: string; count: number }[];
  recentReports: { product: string; price_cents: number; status: string; created_at: string; email: string; order_id: string }[];
  dailySeries: { date: string; pageViews: number; ctaClicks: number; orders: number }[];
  topPages: { path: string; count: number }[];
  topEntryPages: { path: string; count: number }[];
  topReferrers: { domain: string; count: number }[];
  deviceBreakdown: { device: string; count: number }[];
  browserBreakdown: { browser: string; count: number }[];
  countryBreakdown: { country: string; count: number }[];
  seoSnapshot: { totalUrls: number; avgPagesPerSession: number; sectionCounts: Record<string, number>; seenPages: number; coveragePct: number };
  deliveryStats: { avgGenerationMs: number; samples: number };
  bucket: string;
};

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rangeUnit, setRangeUnit] = useState<'hours' | 'days' | 'weeks' | 'months'>('days');
  const [rangeValue, setRangeValue] = useState(30);

  const rangeOptions: Record<'hours' | 'days' | 'weeks' | 'months', number[]> = {
    hours: [1, 6, 12, 24, 48, 72],
    days: [7, 14, 30, 60, 90],
    weeks: [1, 4, 8, 12],
    months: [1, 3, 6, 12],
  };

  const fetchStats = async (key: string, unit = rangeUnit, value = rangeValue) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (unit === 'hours') {
        params.set('hours', String(value));
        params.set('bucket', 'hour');
      } else if (unit === 'weeks') {
        params.set('days', String(value * 7));
        params.set('bucket', 'week');
      } else if (unit === 'months') {
        params.set('days', String(value * 30));
        params.set('bucket', 'month');
      } else {
        params.set('days', String(value));
        params.set('bucket', 'day');
      }

      const res = await fetch(`/api/admin/stats?${params.toString()}`, {
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

  useEffect(() => {
    if (!rangeOptions[rangeUnit].includes(rangeValue)) return;
    if (adminKey) {
      fetchStats(adminKey, rangeUnit, rangeValue);
    }
  }, [rangeUnit, rangeValue, adminKey]);

  useEffect(() => {
    const next = rangeOptions[rangeUnit][0];
    if (rangeValue !== next) setRangeValue(next);
  }, [rangeUnit, rangeValue]);

  const totals = stats?.totals;
  const OFFER_KEYS = ['blueprint', 'relationship', 'wealth', 'bundle'] as const;
  const labelForProduct = (product: string) => {
    if (product === 'blueprint') return 'Blueprint';
    if (product === 'relationship') return 'Relationship';
    if (product === 'wealth') return 'Wealth';
    if (product === 'bundle') return 'Bundle';
    return 'Unknown';
  };

  const funnelsWithDefaults = OFFER_KEYS.reduce<Record<string, { impressions: number; clicks: number; checkouts: number; orders: number; pdfSent: number; pdfFailed: number }>>(
    (acc, key) => {
      acc[key] = stats?.funnels?.[key] || { impressions: 0, clicks: 0, checkouts: 0, orders: 0, pdfSent: 0, pdfFailed: 0 };
      return acc;
    },
    {}
  );

  const breakdownWithDefaults = OFFER_KEYS.reduce<Record<string, { count: number; revenueCents: number }>>(
    (acc, key) => {
      acc[key] = stats?.productBreakdown?.[key] || { count: 0, revenueCents: 0 };
      return acc;
    },
    {}
  );

  const offerCtrWithDefaults = OFFER_KEYS.map((key) => {
    const row = stats?.offerCtr?.find((r) => r.product === key);
    return row || { product: key, impressions: 0, clicks: 0, ctr: 0 };
  });

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
        </header>

        {stats && (
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-4">
              <div className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">Time Range</div>
              <select
                value={rangeUnit}
                onChange={(e) => setRangeUnit(e.target.value as any)}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300"
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
              <select
                value={rangeValue}
                onChange={(e) => setRangeValue(parseInt(e.target.value, 10))}
                className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-300"
              >
                {rangeOptions[rangeUnit].map((v) => (
                  <option key={v} value={v}>
                    Last {v} {rangeUnit}
                  </option>
                ))}
              </select>
              <button
                onClick={() => fetchStats(adminKey, rangeUnit, rangeValue)}
                className="ml-auto bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-4 py-2 rounded-lg"
                type="button"
              >
                Refresh
              </button>
            </div>

            <div className="sticky top-2 z-20 bg-zinc-950/80 backdrop-blur border border-zinc-800 rounded-2xl px-3 py-2 overflow-x-auto">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500">
                <a href="#overview" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">Overview</a>
                <a href="#offers" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">Offers</a>
                <a href="#ctr" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">CTR</a>
                <a href="#funnel" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">Funnel</a>
                <a href="#cta" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">CTA</a>
                <a href="#pages" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">Pages</a>
                <a href="#traffic" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">Traffic</a>
                <a href="#seo" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">SEO</a>
                <a href="#reports" className="px-3 py-2 rounded-lg hover:text-amber-300 hover:bg-zinc-900/60 transition-colors">Reports</a>
              </div>
            </div>
          </div>
        )}

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
            <div id="overview" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 scroll-mt-24">
              {[
                { label: 'Page Views', value: totals?.pageViews || 0, color: 'text-blue-400' },
                { label: 'Unique Sessions', value: totals?.uniqueSessions || 0, color: 'text-indigo-400' },
                { label: 'New Sessions', value: totals?.newSessions || 0, color: 'text-cyan-400' },
                { label: 'Returning Sessions', value: totals?.returningSessions || 0, color: 'text-sky-400' },
                { label: 'CTA Impressions', value: totals?.ctaImpressions || 0, color: 'text-amber-300' },
                { label: 'CTA Clicks', value: totals?.ctaClicks || 0, color: 'text-amber-400' },
                { label: 'Checkout Starts', value: totals?.checkoutStarts || 0, color: 'text-purple-400' },
                { label: 'Orders', value: totals?.orders || 0, color: 'text-green-400' },
                { label: 'PDFs Sent', value: totals?.pdfSent || 0, color: 'text-emerald-400' },
                { label: 'PDF Failures', value: totals?.pdfFailed || 0, color: 'text-red-400' },
                { label: 'Avg PDF Gen (ms)', value: stats?.deliveryStats?.avgGenerationMs || 0, color: 'text-orange-400' },
                { label: 'Revenue', value: `$${((totals?.revenueCents || 0) / 100).toFixed(2)}`, color: 'text-yellow-400' },
              ].map((card) => (
                <div key={card.label} className="bg-zinc-900/50 border border-zinc-800 p-5 rounded-2xl">
                  <p className="text-zinc-500 text-xs mb-1">{card.label}</p>
                  <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Product Breakdown */}
            <div id="offers" className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-4">Offer Performance (Selected Range)</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {Object.entries(breakdownWithDefaults).map(([product, data]) => (
                  <div key={product} className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                    <p className="text-zinc-400 text-sm">{labelForProduct(product)}</p>
                    <p className="text-white font-bold text-lg">{data.count} reports</p>
                    <p className="text-amber-400 text-sm">${(data.revenueCents / 100).toFixed(2)} revenue</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="ctr" className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden scroll-mt-24">
              <div className="p-6 border-b border-zinc-800">
                <h3 className="font-semibold">Offer CTR (Impressions → Clicks)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Offer</th>
                      <th className="px-6 py-4 font-medium">Impressions</th>
                      <th className="px-6 py-4 font-medium">Clicks</th>
                      <th className="px-6 py-4 font-medium">CTR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {offerCtrWithDefaults.map((row) => (
                      <tr key={row.product} className="hover:bg-zinc-800/30 transition-colors">
                        <td className="px-6 py-4 text-zinc-300">{labelForProduct(row.product)}</td>
                        <td className="px-6 py-4">{row.impressions}</td>
                        <td className="px-6 py-4">{row.clicks}</td>
                        <td className="px-6 py-4 text-amber-400">{row.ctr}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Funnel */}
            <div id="funnel" className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden scroll-mt-24">
              <div className="p-6 border-b border-zinc-800">
                <h3 className="font-semibold">Offer Funnel (Click → Checkout → Order → PDF)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Offer</th>
                      <th className="px-6 py-4 font-medium">Impressions</th>
                      <th className="px-6 py-4 font-medium">Clicks</th>
                      <th className="px-6 py-4 font-medium">Checkouts</th>
                      <th className="px-6 py-4 font-medium">Orders</th>
                      <th className="px-6 py-4 font-medium">PDFs Sent</th>
                      <th className="px-6 py-4 font-medium">PDFs Failed</th>
                      <th className="px-6 py-4 font-medium">Click → Order</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {Object.entries(funnelsWithDefaults).map(([product, f]) => {
                      const conversion = f.clicks ? ((f.orders / f.clicks) * 100).toFixed(1) : '0.0';
                      return (
                        <tr key={product} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 text-zinc-300">{labelForProduct(product)}</td>
                          <td className="px-6 py-4">{f.impressions}</td>
                          <td className="px-6 py-4">{f.clicks}</td>
                          <td className="px-6 py-4">{f.checkouts}</td>
                          <td className="px-6 py-4">{f.orders}</td>
                          <td className="px-6 py-4">{f.pdfSent}</td>
                          <td className="px-6 py-4">{f.pdfFailed}</td>
                          <td className="px-6 py-4 text-amber-400">{conversion}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top CTA Pages */}
            <div id="cta" className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden scroll-mt-24">
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
                        <td className="px-6 py-4 text-zinc-400">{labelForProduct(row.product)}</td>
                        <td className="px-6 py-4">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="pages" className="grid lg:grid-cols-2 gap-6 scroll-mt-24">
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="font-semibold">Top Pages by Views</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                      <tr>
                        <th className="px-6 py-4 font-medium">Path</th>
                        <th className="px-6 py-4 font-medium">Views</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {stats.topPages.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 text-zinc-300 font-mono text-sm">{row.path}</td>
                          <td className="px-6 py-4">{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="font-semibold">Top Entry Pages</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                      <tr>
                        <th className="px-6 py-4 font-medium">Path</th>
                        <th className="px-6 py-4 font-medium">Sessions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {stats.topEntryPages.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 text-zinc-300 font-mono text-sm">{row.path}</td>
                          <td className="px-6 py-4">{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div id="traffic" className="grid lg:grid-cols-4 gap-6 scroll-mt-24">
              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="font-semibold">Top Referrers</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                      <tr>
                        <th className="px-6 py-4 font-medium">Domain</th>
                        <th className="px-6 py-4 font-medium">Visits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {stats.topReferrers.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 text-zinc-300">{row.domain}</td>
                          <td className="px-6 py-4">{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="font-semibold">Devices</h3>
                </div>
                <div className="p-6 space-y-3">
                  {stats.deviceBreakdown.map((row) => (
                    <div key={row.device} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{row.device}</span>
                      <span className="text-zinc-200 font-semibold">{row.count}</span>
                    </div>
                  ))}
                  {!stats.deviceBreakdown.length && <p className="text-zinc-500 text-sm">No data yet.</p>}
                </div>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="font-semibold">Top Countries</h3>
                </div>
                <div className="p-6 space-y-3">
                  {stats.countryBreakdown.slice(0, 8).map((row) => (
                    <div key={row.country} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{row.country}</span>
                      <span className="text-zinc-200 font-semibold">{row.count}</span>
                    </div>
                  ))}
                  {!stats.countryBreakdown.length && <p className="text-zinc-500 text-sm">No data yet.</p>}
                </div>
              </div>

              <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800">
                  <h3 className="font-semibold">Browsers</h3>
                </div>
                <div className="p-6 space-y-3">
                  {stats.browserBreakdown.slice(0, 6).map((row) => (
                    <div key={row.browser} className="flex items-center justify-between text-sm">
                      <span className="text-zinc-400">{row.browser}</span>
                      <span className="text-zinc-200 font-semibold">{row.count}</span>
                    </div>
                  ))}
                  {!stats.browserBreakdown.length && <p className="text-zinc-500 text-sm">No data yet.</p>}
                </div>
              </div>
            </div>

            <div id="seo" className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-4">SEO Snapshot (Mini Ahrefs)</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Total URLs</p>
                  <p className="text-lg font-bold text-white">{stats.seoSnapshot.totalUrls}</p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Seen Pages</p>
                  <p className="text-lg font-bold text-white">{stats.seoSnapshot.seenPages}</p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Coverage</p>
                  <p className="text-lg font-bold text-amber-400">{stats.seoSnapshot.coveragePct}%</p>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-zinc-500 text-xs mb-1">Pages / Session</p>
                  <p className="text-lg font-bold text-white">{stats.seoSnapshot.avgPagesPerSession}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-zinc-500 text-xs mb-3 uppercase tracking-wider">URLs by Section</p>
                  <div className="space-y-2 text-sm">
                    {Object.entries(stats.seoSnapshot.sectionCounts)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 8)
                      .map(([section, count]) => (
                        <div key={section} className="flex items-center justify-between">
                          <span className="text-zinc-400">{section}</span>
                          <span className="text-zinc-200 font-semibold">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="bg-zinc-950/60 border border-zinc-800 rounded-2xl p-4">
                  <p className="text-zinc-500 text-xs mb-3 uppercase tracking-wider">Indexing Focus</p>
                  <p className="text-zinc-400 text-sm">
                    Prioritize sections with high impressions but low clicks. Use internal links and fresh CTAs to lift CTR.
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div id="reports" className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden scroll-mt-24">
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
                        <td className="px-6 py-4 text-zinc-400">{labelForProduct(row.product)}</td>
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
