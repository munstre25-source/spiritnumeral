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
  seoAudit: {
    fixList: { path: string; score: number; reasons: string[]; views: number; ctr: number }[];
    internalLinks: { path: string; suggested: string[] }[];
  };
  pdfs: {
    offers: { product: string; impressions: number; clicks: number; ctr: number }[];
    topPages: { path: string; product: string; count: number }[];
  };
  psychic: {
    offers: { product: string; impressions: number; clicks: number; ctr: number }[];
    topPages: { path: string; product: string; count: number }[];
  };
  abCta?: {
    byVariant: { variant: string; count: number }[];
    byLabel: { label: string; count: number }[];
  };
  bucket: string;
};

type AbExperiment = {
  id: string;
  key: string;
  name: string;
  variants: { id: string; copy: string }[];
  control_id: string;
  enabled: boolean;
  updated_at: string;
};

function AbPsychicCtaForm({
  experiment,
  adminKey,
  onSave,
  saving,
  setSaving,
  error,
  setError,
}: {
  experiment: AbExperiment;
  adminKey: string;
  onSave: () => void;
  saving: boolean;
  setSaving: (v: boolean) => void;
  error: string;
  setError: (v: string) => void;
}) {
  const [variants, setVariants] = useState<{ id: string; copy: string }[]>(experiment.variants || []);
  const [controlId, setControlId] = useState(experiment.control_id);
  const [enabled, setEnabled] = useState(experiment.enabled);

  useEffect(() => {
    setVariants(experiment.variants || []);
    setControlId(experiment.control_id);
    setEnabled(experiment.enabled);
  }, [experiment.variants, experiment.control_id, experiment.enabled]);

  const addVariant = () => {
    const id = `variant_${Date.now()}`;
    setVariants((v) => [...v, { id, copy: 'New CTA →' }]);
  };
  const removeVariant = (id: string) => {
    setVariants((v) => v.filter((x) => x.id !== id));
    if (controlId === id) setControlId(variants[0]?.id || 'control');
  };
  const updateVariant = (id: string, field: 'id' | 'copy', value: string) => {
    setVariants((v) => v.map((x) => (x.id === id ? { ...x, [field]: value } : x)));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/ab', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey },
        body: JSON.stringify({ key: 'psychic_cta', variants, control_id: controlId, enabled }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || res.statusText);
      }
      onSave();
    } catch (e: any) {
      setError(e.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="border border-default rounded-2xl p-4 bg-card">
      <h4 className="text-sm font-semibold text-primary mb-3">Edit: {experiment.name}</h4>
      <p className="text-muted text-xs mb-4">These variants are shown on emotional pages (home, love, twin flame, angel numbers). Control is the default; others are A/B options.</p>
      <div className="space-y-3 mb-4">
        {variants.map((v) => (
          <div key={v.id} className="flex gap-2 items-center flex-wrap">
            <input
              type="text"
              value={v.id}
              onChange={(e) => updateVariant(v.id, 'id', e.target.value)}
              className="w-28 bg-page border border-default rounded-lg px-2 py-1.5 text-sm font-mono"
              placeholder="id"
            />
            <input
              type="text"
              value={v.copy}
              onChange={(e) => updateVariant(v.id, 'copy', e.target.value)}
              className="flex-1 min-w-[180px] bg-page border border-default rounded-lg px-2 py-1.5 text-sm"
              placeholder="Button copy"
            />
            <label className="flex items-center gap-1 text-xs text-muted">
              <input
                type="radio"
                name="control"
                checked={controlId === v.id}
                onChange={() => setControlId(v.id)}
              />
              Control
            </label>
            <button
              type="button"
              onClick={() => removeVariant(v.id)}
              className="text-red-400 hover:text-red-300 text-xs"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addVariant} className="text-sm text-amber-600 hover:text-amber-500">
          + Add variant
        </button>
      </div>
      <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
          Experiment enabled
        </label>
      </div>
      {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
      <button
        type="button"
        onClick={handleSave}
        disabled={saving || variants.length === 0}
        className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black text-sm font-semibold px-4 py-2 rounded-lg"
      >
        {saving ? 'Saving…' : 'Save CTA variants'}
      </button>
    </div>
  );
}

export default function AdminDashboard() {
  const [adminKey, setAdminKey] = useState('');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rangeUnit, setRangeUnit] = useState<'hours' | 'days' | 'weeks' | 'months'>('days');
  const [rangeValue, setRangeValue] = useState(30);
  const [abExperiments, setAbExperiments] = useState<AbExperiment[] | null>(null);
  const [abSaving, setAbSaving] = useState(false);
  const [abError, setAbError] = useState('');

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

  const fetchAbExperiments = async (key: string) => {
    try {
      const res = await fetch('/api/admin/ab', { headers: { 'x-admin-key': key } });
      if (res.ok) {
        const data = await res.json();
        setAbExperiments(data);
      }
    } catch {
      setAbExperiments(null);
    }
  };

  useEffect(() => {
    if (adminKey) fetchAbExperiments(adminKey);
  }, [adminKey]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('admin_mode', 'true');
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
  const PDF_OFFERS = ['quick_report', 'blueprint'] as const;
  const PSYCHIC_OFFERS = ['psychic_love', 'psychic_career', 'psychic_tarot'] as const;
  const ALL_OFFERS = [...PDF_OFFERS, ...PSYCHIC_OFFERS] as const;

  const labelForProduct = (product: string) => {
    if (product === 'quick_report') return 'Quick Report ($7)';
    if (product === 'blueprint') return 'Blueprint ($17)';
    if (product === 'psychic_love') return 'Psychic (Love)';
    if (product === 'psychic_career') return 'Psychic (Career)';
    if (product === 'psychic_tarot') return 'Psychic (Tarot)';
    return product || 'Unknown';
  };

  const funnelsWithDefaults = PDF_OFFERS.reduce<Record<string, { impressions: number; clicks: number; checkouts: number; orders: number; pdfSent: number; pdfFailed: number }>>(
    (acc, key) => {
      acc[key] = stats?.funnels?.[key] || { impressions: 0, clicks: 0, checkouts: 0, orders: 0, pdfSent: 0, pdfFailed: 0 };
      return acc;
    },
    {}
  );

  const breakdownWithDefaults = PDF_OFFERS.reduce<Record<string, { count: number; revenueCents: number }>>(
    (acc, key) => {
      acc[key] = stats?.productBreakdown?.[key] || { count: 0, revenueCents: 0 };
      return acc;
    },
    {}
  );

  const offerCtrWithDefaults = ALL_OFFERS.map((key) => {
    const row = stats?.offerCtr?.find((r) => r.product === key);
    return row || { product: key, impressions: 0, clicks: 0, ctr: 0 };
  });

  return (
    <div className="min-h-screen bg-page text-primary p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-primary font-bold">
              Admin Dashboard
            </h1>
            <p className="text-muted">Offers, PDFs, clicks, and revenue</p>
          </div>
        </header>

        {stats && (
          <div className="space-y-4 mb-8">
            <div className="flex flex-wrap items-center gap-3 bg-card border border-default rounded-2xl p-4">
              <div className="text-xs uppercase tracking-wider text-muted font-semibold">Time Range</div>
              <select
                value={rangeUnit}
                onChange={(e) => setRangeUnit(e.target.value as any)}
                className="bg-page border border-default rounded-lg px-3 py-2 text-sm text-secondary"
              >
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
              <select
                value={rangeValue}
                onChange={(e) => setRangeValue(parseInt(e.target.value, 10))}
                className="bg-page border border-default rounded-lg px-3 py-2 text-sm text-secondary"
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

            <div className="sticky top-2 z-20 bg-page/80 backdrop-blur border border-default rounded-2xl px-3 py-2 overflow-x-auto">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted flex-wrap">
                <a href="#overview" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Overview</a>
                <a href="#offers" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Offers (5)</a>
                <a href="#ctr" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">CTR</a>
                <a href="#psychic" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Psychic (3)</a>
                <a href="#ab" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">A/B Tests</a>
                <a href="#pdfs" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">PDFs (2)</a>
                <a href="#funnel" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Funnel</a>
                <a href="#cta" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Top CTAs</a>
                <a href="#pages" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Pages</a>
                <a href="#traffic" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Traffic</a>
                <a href="#seo" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">SEO</a>
                <a href="#seo-fix" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">SEO Fixes</a>
                <a href="#links" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Links</a>
                <a href="#reports" className="px-3 py-2 rounded-lg hover:text-amber-600 hover:bg-elevated transition-colors">Reports</a>
              </div>
            </div>
          </div>
        )}

        {!stats ? (
          <div className="max-w-md mx-auto bg-card border border-default p-8 rounded-3xl shadow-2xl">
            <h2 className="text-xl font-semibold mb-6">Admin Access</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchStats(adminKey);
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm text-secondary mb-2">Admin Key</label>
                <input
                  type="password"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  className="w-full bg-page border border-default rounded-xl px-4 py-3 focus:border-amber-500 outline-none transition-all"
                  placeholder="Enter your admin key"
                  required
                />
                <p className="mt-2 text-[10px] text-muted">Set ADMIN_DASHBOARD_KEY in your environment.</p>
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
                { label: 'CTA Impressions', value: totals?.ctaImpressions || 0, color: 'text-amber-600' },
                { label: 'CTA Clicks', value: totals?.ctaClicks || 0, color: 'text-amber-600' },
                { label: 'Checkout Starts', value: totals?.checkoutStarts || 0, color: 'text-purple-400' },
                { label: 'Orders', value: totals?.orders || 0, color: 'text-green-400' },
                { label: 'PDFs Sent', value: totals?.pdfSent || 0, color: 'text-emerald-400' },
                { label: 'PDF Failures', value: totals?.pdfFailed || 0, color: 'text-red-400' },
                { label: 'Avg PDF Gen (ms)', value: stats?.deliveryStats?.avgGenerationMs || 0, color: 'text-orange-400' },
                { label: 'Revenue', value: `$${((totals?.revenueCents || 0) / 100).toFixed(2)}`, color: 'text-yellow-400' },
              ].map((card) => (
                <div key={card.label} className="bg-card border border-default p-5 rounded-2xl">
                  <p className="text-muted text-xs mb-1">{card.label}</p>
                  <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* All 5 offers summary */}
            <div id="offers" className="bg-elevated border border-default rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-2">Tracked Offers (5)</h3>
              <p className="text-muted text-sm mb-4">3 PsychicOz (love, career, tarot) + 2 PDFs (Quick Report $7, Blueprint $17)</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {ALL_OFFERS.map((product) => {
                  const isPdf = PDF_OFFERS.includes(product);
                  const breakdown = isPdf ? breakdownWithDefaults[product] : null;
                  const ctrRow = offerCtrWithDefaults.find((r) => r.product === product);
                  return (
                    <div key={product} className="bg-page/60 border border-default rounded-2xl p-4">
                      <p className="text-secondary text-sm font-medium">{labelForProduct(product)}</p>
                      {isPdf && breakdown && (
                        <>
                          <p className="text-white font-bold">{breakdown.count} orders</p>
                          <p className="text-amber-600 text-sm">${(breakdown.revenueCents / 100).toFixed(2)} revenue</p>
                        </>
                      )}
                      {!isPdf && ctrRow && (
                        <p className="text-white font-bold">{ctrRow.clicks} clicks</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div id="ctr" className="bg-elevated border border-default rounded-3xl overflow-hidden scroll-mt-24">
              <div className="p-6 border-b border-default">
                <h3 className="font-semibold">Offer CTR (all 5: Psychic + PDFs)</h3>
                <p className="text-muted text-sm mt-1">Impressions → Clicks for each offer</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-muted bg-card">
                    <tr>
                      <th className="px-6 py-4 font-medium">Offer</th>
                      <th className="px-6 py-4 font-medium">Impressions</th>
                      <th className="px-6 py-4 font-medium">Clicks</th>
                      <th className="px-6 py-4 font-medium">CTR</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {offerCtrWithDefaults.map((row) => (
                      <tr key={row.product} className="hover:bg-elevated/30 transition-colors">
                        <td className="px-6 py-4 text-secondary">{labelForProduct(row.product)}</td>
                        <td className="px-6 py-4">{row.impressions}</td>
                        <td className="px-6 py-4">{row.clicks}</td>
                        <td className="px-6 py-4 text-amber-600">{row.ctr}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Psychic (3) */}
            <div id="psychic" className="bg-elevated border border-default rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-2">PsychicOz (3 offers)</h3>
              <p className="text-muted text-sm mb-4">Clicks on band, sticky bar, footer, and scroll popup. Conversion is on affiliate side.</p>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-4">Offer CTR</h4>
                  <div className="space-y-3">
                    {(!stats.psychic?.offers || stats.psychic.offers.length === 0) && (
                      <p className="text-muted text-sm">No psychic clicks yet.</p>
                    )}
                    {stats.psychic?.offers?.map((row) => (
                      <div key={row.product} className="flex items-center justify-between text-sm">
                        <span className="text-secondary">{labelForProduct(row.product)}</span>
                        <span className="text-zinc-200 font-semibold">{row.impressions} / {row.clicks} · {row.ctr}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-4">Top Psychic Pages</h4>
                  <div className="space-y-3">
                    {(!stats.psychic?.topPages || stats.psychic.topPages.length === 0) && (
                      <p className="text-muted text-sm">No psychic page clicks yet.</p>
                    )}
                    {stats.psychic?.topPages?.map((row, i) => (
                      <div key={`${row.path}-${i}`} className="flex items-center justify-between text-sm">
                        <span className="text-secondary font-mono truncate max-w-[200px]">{row.path}</span>
                        <span className="text-zinc-200 font-semibold shrink-0">{labelForProduct(row.product)} · {row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* A/B Tests: CTA variants + edit */}
            <div id="ab" className="bg-elevated border border-default rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-2">A/B Tests — CTA Variants</h3>
              <p className="text-muted text-sm mb-4">Clicks by variant and placement. Edit CTA copy below; changes apply to emotional pages (home, love, twin flame, angel numbers).</p>
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-4">Clicks by variant</h4>
                  {(!stats?.abCta?.byVariant || stats.abCta.byVariant.length === 0) && (
                    <p className="text-muted text-sm">No variant data yet. Clicks on emotional pages send ctaVariant.</p>
                  )}
                  {stats?.abCta?.byVariant?.map((row) => (
                    <div key={row.variant} className="flex justify-between text-sm py-1">
                      <span className="text-secondary font-mono">{row.variant}</span>
                      <span className="font-semibold text-primary">{row.count}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-4">Clicks by placement (label)</h4>
                  {(!stats?.abCta?.byLabel || stats.abCta.byLabel.length === 0) && (
                    <p className="text-muted text-sm">No label data yet.</p>
                  )}
                  {stats?.abCta?.byLabel?.map((row) => (
                    <div key={row.label} className="flex justify-between text-sm py-1">
                      <span className="text-secondary">{row.label}</span>
                      <span className="font-semibold text-primary">{row.count}</span>
                    </div>
                  ))}
                </div>
              </div>
              {abExperiments?.find((e) => e.key === 'psychic_cta') && (
                <AbPsychicCtaForm
                  experiment={abExperiments.find((e) => e.key === 'psychic_cta')!}
                  adminKey={adminKey}
                  onSave={() => fetchAbExperiments(adminKey)}
                  saving={abSaving}
                  setSaving={setAbSaving}
                  error={abError}
                  setError={setAbError}
                />
              )}
            </div>

            {/* PDFs (2): performance + funnel + recent */}
            <div id="pdfs" className="bg-elevated border border-default rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-2">PDFs (Quick Report $7 + Blueprint $17)</h3>
              <p className="text-muted text-sm mb-4">Exit-intent and footer links. Funnel: click → checkout → order → PDF.</p>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-4">PDF CTR</h4>
                  <div className="space-y-3">
                    {(!stats.pdfs?.offers || stats.pdfs.offers.length === 0) && (
                      <p className="text-muted text-sm">No PDF clicks yet.</p>
                    )}
                    {stats.pdfs?.offers?.map((row) => (
                      <div key={row.product} className="flex items-center justify-between text-sm">
                        <span className="text-secondary">{labelForProduct(row.product)}</span>
                        <span className="text-zinc-200 font-semibold">{row.impressions} / {row.clicks} · {row.ctr}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <h4 className="text-sm uppercase tracking-wider text-muted mb-4">Top PDF Pages</h4>
                  <div className="space-y-3">
                    {(!stats.pdfs?.topPages || stats.pdfs.topPages.length === 0) && (
                      <p className="text-muted text-sm">No PDF page clicks yet.</p>
                    )}
                    {stats.pdfs?.topPages?.map((row, i) => (
                      <div key={`${row.path}-${i}`} className="flex items-center justify-between text-sm">
                        <span className="text-secondary font-mono truncate max-w-[200px]">{row.path}</span>
                        <span className="text-zinc-200 font-semibold shrink-0">{labelForProduct(row.product)} · {row.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Funnel (PDF only) */}
            <div id="funnel" className="bg-elevated border border-default rounded-3xl overflow-hidden scroll-mt-24">
              <div className="p-6 border-b border-default">
                <h3 className="font-semibold">PDF Funnel (Click → Checkout → Order → PDF)</h3>
                <p className="text-muted text-sm mt-1">Psychic conversion is tracked on affiliate side.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-muted bg-card">
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
                        <tr key={product} className="hover:bg-elevated/30 transition-colors">
                          <td className="px-6 py-4 text-secondary">{labelForProduct(product)}</td>
                          <td className="px-6 py-4">{f.impressions}</td>
                          <td className="px-6 py-4">{f.clicks}</td>
                          <td className="px-6 py-4">{f.checkouts}</td>
                          <td className="px-6 py-4">{f.orders}</td>
                          <td className="px-6 py-4">{f.pdfSent}</td>
                          <td className="px-6 py-4">{f.pdfFailed}</td>
                          <td className="px-6 py-4 text-amber-600">{conversion}%</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top CTA Pages (all 5 offers) */}
            <div id="cta" className="bg-elevated border border-default rounded-3xl overflow-hidden scroll-mt-24">
              <div className="p-6 border-b border-default">
                <h3 className="font-semibold">Top CTA Clicks (by path × offer)</h3>
                <p className="text-muted text-sm mt-1">Which pages drive clicks for each of the 5 offers</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-muted bg-card">
                    <tr>
                      <th className="px-6 py-4 font-medium">Path</th>
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Clicks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {(stats.topCtas || []).filter((row) => ALL_OFFERS.includes(row.product as any)).map((row, i) => (
                      <tr key={i} className="hover:bg-elevated/30 transition-colors">
                        <td className="px-6 py-4 text-secondary font-mono text-sm">{row.path}</td>
                        <td className="px-6 py-4 text-secondary">{labelForProduct(row.product)}</td>
                        <td className="px-6 py-4">{row.count}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div id="pages" className="grid lg:grid-cols-2 gap-6 scroll-mt-24">
              <div className="bg-elevated border border-default rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-default">
                  <h3 className="font-semibold">Top Pages by Views</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase tracking-wider text-muted bg-card">
                      <tr>
                        <th className="px-6 py-4 font-medium">Path</th>
                        <th className="px-6 py-4 font-medium">Views</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {stats.topPages.map((row, i) => (
                        <tr key={i} className="hover:bg-elevated/30 transition-colors">
                          <td className="px-6 py-4 text-secondary font-mono text-sm">{row.path}</td>
                          <td className="px-6 py-4">{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-elevated border border-default rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-default">
                  <h3 className="font-semibold">Top Entry Pages</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase tracking-wider text-muted bg-card">
                      <tr>
                        <th className="px-6 py-4 font-medium">Path</th>
                        <th className="px-6 py-4 font-medium">Sessions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {stats.topEntryPages.map((row, i) => (
                        <tr key={i} className="hover:bg-elevated/30 transition-colors">
                          <td className="px-6 py-4 text-secondary font-mono text-sm">{row.path}</td>
                          <td className="px-6 py-4">{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div id="traffic" className="grid lg:grid-cols-4 gap-6 scroll-mt-24">
              <div className="bg-elevated border border-default rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-default">
                  <h3 className="font-semibold">Top Referrers</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase tracking-wider text-muted bg-card">
                      <tr>
                        <th className="px-6 py-4 font-medium">Domain</th>
                        <th className="px-6 py-4 font-medium">Visits</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {stats.topReferrers.map((row, i) => (
                        <tr key={i} className="hover:bg-elevated/30 transition-colors">
                          <td className="px-6 py-4 text-secondary">{row.domain}</td>
                          <td className="px-6 py-4">{row.count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-elevated border border-default rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-default">
                  <h3 className="font-semibold">Devices</h3>
                </div>
                <div className="p-6 space-y-3">
                  {stats.deviceBreakdown.map((row) => (
                    <div key={row.device} className="flex items-center justify-between text-sm">
                      <span className="text-secondary">{row.device}</span>
                      <span className="text-zinc-200 font-semibold">{row.count}</span>
                    </div>
                  ))}
                  {!stats.deviceBreakdown.length && <p className="text-muted text-sm">No data yet.</p>}
                </div>
              </div>

              <div className="bg-elevated border border-default rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-default">
                  <h3 className="font-semibold">Top Countries</h3>
                </div>
                <div className="p-6 space-y-3">
                  {stats.countryBreakdown.slice(0, 8).map((row) => (
                    <div key={row.country} className="flex items-center justify-between text-sm">
                      <span className="text-secondary">{row.country}</span>
                      <span className="text-zinc-200 font-semibold">{row.count}</span>
                    </div>
                  ))}
                  {!stats.countryBreakdown.length && <p className="text-muted text-sm">No data yet.</p>}
                </div>
              </div>

              <div className="bg-elevated border border-default rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-default">
                  <h3 className="font-semibold">Browsers</h3>
                </div>
                <div className="p-6 space-y-3">
                  {stats.browserBreakdown.slice(0, 6).map((row) => (
                    <div key={row.browser} className="flex items-center justify-between text-sm">
                      <span className="text-secondary">{row.browser}</span>
                      <span className="text-zinc-200 font-semibold">{row.count}</span>
                    </div>
                  ))}
                  {!stats.browserBreakdown.length && <p className="text-muted text-sm">No data yet.</p>}
                </div>
              </div>
            </div>

            <div id="seo" className="bg-elevated border border-default rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-4">SEO Snapshot (Mini Ahrefs)</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <p className="text-muted text-xs mb-1">Total URLs</p>
                  <p className="text-lg font-bold text-white">{stats.seoSnapshot.totalUrls}</p>
                </div>
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <p className="text-muted text-xs mb-1">Seen Pages</p>
                  <p className="text-lg font-bold text-white">{stats.seoSnapshot.seenPages}</p>
                </div>
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <p className="text-muted text-xs mb-1">Coverage</p>
                  <p className="text-lg font-bold text-amber-600">{stats.seoSnapshot.coveragePct}%</p>
                </div>
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <p className="text-muted text-xs mb-1">Pages / Session</p>
                  <p className="text-lg font-bold text-white">{stats.seoSnapshot.avgPagesPerSession}</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <p className="text-muted text-xs mb-3 uppercase tracking-wider">URLs by Section</p>
                  <div className="space-y-2 text-sm">
                    {Object.entries(stats.seoSnapshot.sectionCounts)
                      .sort((a, b) => b[1] - a[1])
                      .slice(0, 8)
                      .map(([section, count]) => (
                        <div key={section} className="flex items-center justify-between">
                          <span className="text-secondary">{section}</span>
                          <span className="text-zinc-200 font-semibold">{count}</span>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="bg-page/60 border border-default rounded-2xl p-4">
                  <p className="text-muted text-xs mb-3 uppercase tracking-wider">Indexing Focus</p>
                  <p className="text-secondary text-sm">
                    Prioritize sections with high impressions but low clicks. Use internal links and fresh CTAs to lift CTR.
                  </p>
                </div>
              </div>
            </div>

            <div id="seo-fix" className="bg-elevated border border-default rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-4">Top Pages to Fix (Weekly)</h3>
              <div className="space-y-4">
                {(stats.seoAudit?.fixList || []).length === 0 && (
                  <p className="text-sm text-muted">No issues detected for blog pages in this range.</p>
                )}
                {(stats.seoAudit?.fixList || []).map((item) => (
                  <div key={item.path} className="rounded-2xl border border-default bg-page/60 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-amber-600">{item.path}</div>
                      <div className="text-xs text-muted">Views: {item.views} • CTR: {item.ctr}%</div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {item.reasons.map((reason) => (
                        <span key={reason} className="rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs text-amber-600">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div id="links" className="bg-elevated border border-default rounded-3xl p-6 scroll-mt-24">
              <h3 className="font-semibold mb-4">Internal Linking Suggestions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {(stats.seoAudit?.internalLinks || []).slice(0, 10).map((row) => (
                  <div key={row.path} className="rounded-2xl border border-default bg-page/60 p-4">
                    <div className="text-sm font-semibold text-emerald-200 mb-2">{row.path}</div>
                    <ul className="space-y-1 text-sm text-secondary">
                      {row.suggested.map((link) => (
                        <li key={link}>• Add link to {link}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Reports (PDFs only) */}
            <div id="reports" className="bg-elevated border border-default rounded-3xl overflow-hidden scroll-mt-24">
              <div className="p-6 border-b border-default">
                <h3 className="font-semibold">Recent Reports</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="text-xs uppercase tracking-wider text-muted bg-card">
                    <tr>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Product</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium">Price</th>
                      <th className="px-6 py-4 font-medium">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800">
                    {(stats.recentReports || []).filter((row) => PDF_OFFERS.includes(row.product as any)).map((row, i) => (
                      <tr key={i} className="hover:bg-elevated/30 transition-colors">
                        <td className="px-6 py-4 text-secondary font-mono text-sm">{new Date(row.created_at).toLocaleString()}</td>
                        <td className="px-6 py-4 text-secondary">{labelForProduct(row.product)}</td>
                        <td className="px-6 py-4">{row.status}</td>
                        <td className="px-6 py-4 text-amber-600">${(row.price_cents / 100).toFixed(2)}</td>
                        <td className="px-6 py-4 text-muted">{row.email}</td>
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
                className="text-muted hover:text-secondary text-sm transition-colors"
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
