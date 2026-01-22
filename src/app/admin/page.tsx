'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchStatsAction } from './actions';

export default function AdminPage() {
  const [apiKey, setApiKey] = useState('');
  const [devKey, setDevKey] = useState('');
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchStats = async (clerk: string, dev: string) => {
    setLoading(true);
    setError('');
    try {
      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const result = await fetchStatsAction(startDate, endDate, clerk, dev);
      
      if (result.success && result.data) {
        setStats(result.data);
        setIsAuthorized(true);
        sessionStorage.setItem('cb_clerk_key', clerk);
        sessionStorage.setItem('cb_dev_key', dev);
      } else {
        throw new Error(result.error || 'Failed to fetch data');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stats. Please verify your keys.');
      setIsAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedClerk = sessionStorage.getItem('cb_clerk_key');
    const savedDev = sessionStorage.getItem('cb_dev_key');
    if (savedClerk) {
      setApiKey(savedClerk);
      setDevKey(savedDev || '');
      fetchStats(savedClerk, savedDev || '');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(apiKey, devKey);
  };

  const totals = stats.reduce(
    (acc, row) => ({
      hops: acc.hops + row.hopCount,
      sales: acc.sales + row.saleCount,
      amount: acc.amount + row.saleAmount,
      net: acc.net + row.netSaleAmount,
    }),
    { hops: 0, sales: 0, amount: 0, net: 0 }
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
              Affiliate Dashboard
            </h1>
            <p className="text-zinc-500">ClickBank Performance Monitoring</p>
          </div>
          <Link href="/" className="text-sm text-zinc-400 hover:text-amber-500 transition-colors">
            ← Back to Site
          </Link>
        </header>

        {!isAuthorized ? (
          <div className="max-w-md mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-6">Authorize Access</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Clerk API Key (API-...)</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none transition-all"
                  placeholder="e.g. API-BD36V..."
                  required
                />
                <p className="mt-2 text-[10px] text-zinc-500">
                  Settings → API Management → API Keys
                </p>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Developer Key (DEV-...)</label>
                <input
                  type="password"
                  value={devKey}
                  onChange={(e) => setDevKey(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 focus:border-amber-500 outline-none transition-all"
                  placeholder="e.g. DEV-XXXXXX..."
                  required
                />
                <p className="mt-2 text-[10px] text-zinc-500">
                  Settings → Vendor Settings → My Site (bottom) OR API Management
                </p>
              </div>
              {error && <p className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20"
              >
                {loading ? 'Verifying Credentials...' : 'View Analytics'}
              </button>
            </form>

            <p className="mt-6 text-xs text-zinc-600 text-center">
              Your key is only used to fetch data and is never stored on our servers permanently.
            </p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Hops', value: totals.hops.toLocaleString(), color: 'text-blue-400' },
                { label: 'Total Sales', value: totals.sales, color: 'text-green-400' },
                { label: 'Gross Revenue', value: `$${totals.amount.toFixed(2)}`, color: 'text-amber-400' },
                { label: 'Net Earnings', value: `$${totals.net.toFixed(2)}`, color: 'text-emerald-400' },
              ].map((card, i) => (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl">
                  <p className="text-zinc-500 text-sm mb-1">{card.label}</p>
                  <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Stats Table */}
            <div className="bg-zinc-900/30 border border-zinc-800 rounded-3xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
                <h3 className="font-semibold">Recent Performance (Last 30 Days)</h3>
                <button 
                  onClick={() => fetchStats(apiKey, devKey)}
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1 rounded-full transition-colors"
                >
                  Refresh Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-zinc-500 bg-zinc-900/50">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Hops</th>
                      <th className="px-6 py-4 font-medium">Sales</th>
                      <th className="px-6 py-4 font-medium">Amount</th>
                      <th className="px-6 py-4 font-medium">Net</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {stats.length > 0 ? (
                      stats.map((row, i) => (
                        <tr key={i} className="hover:bg-zinc-800/30 transition-colors">
                          <td className="px-6 py-4 text-zinc-300 font-mono text-sm">{row.dimensionValue}</td>
                          <td className="px-6 py-4">{row.hopCount}</td>
                          <td className="px-6 py-4">{row.saleCount}</td>
                          <td className="px-6 py-4 text-amber-500/80">${row.saleAmount.toFixed(2)}</td>
                          <td className="px-6 py-4 text-emerald-500/80">${row.netSaleAmount.toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-zinc-600">
                          No data found for this period.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => {
                  sessionStorage.removeItem('cb_clerk_key');
                  sessionStorage.removeItem('cb_dev_key');
                  setIsAuthorized(false);
                  setApiKey('');
                  setDevKey('');
                }}
                className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors"
              >
                Logout from Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
