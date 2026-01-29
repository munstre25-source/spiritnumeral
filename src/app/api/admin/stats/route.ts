import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAllSitemapUrls } from '@/lib/utils/sitemap';
import { BLOG_POSTS } from '@/lib/blog-data';
import { parseBrowser, parseDeviceType, safeReferrerDomain } from '@/lib/analytics/userAgent';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function inferProduct(path?: string | null) {
  if (!path) return 'unknown';
  const p = path.toLowerCase();
  if (p.includes('/bundle')) return 'bundle';
  if (p.includes('/money')) return 'wealth';
  if (p.includes('/compare') || p.includes('/compatibility')) return 'relationship';
  if (p.includes('/twin-flame') || p.includes('/soulmate') || p.includes('/breakup') || p.includes('/angel-number-love')) {
    return 'relationship';
  }
  return 'blueprint';
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || adminKey !== expected) return unauthorized();

  const hours = Number(req.nextUrl.searchParams.get('hours') || 0);
  const days = Number(req.nextUrl.searchParams.get('days') || 30);
  const bucket = (req.nextUrl.searchParams.get('bucket') || (hours ? 'hour' : 'day')) as 'hour' | 'day' | 'week' | 'month';
  const sinceMs = Date.now() - (hours ? hours * 60 * 60 * 1000 : days * 24 * 60 * 60 * 1000);
  const since = new Date(sinceMs).toISOString();

  const { data: events } = await supabaseAdmin
    .from('analytics_events')
    .select('event_type, product, path, referrer, metadata, created_at, session_id, user_agent')
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  const { data: reports } = await supabaseAdmin
    .from('reports')
    .select('product, price_cents, status, created_at, email, order_id')
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  const totals = {
    pageViews: 0,
    uniqueSessions: 0,
    newSessions: 0,
    returningSessions: 0,
    ctaImpressions: 0,
    ctaClicks: 0,
    checkoutStarts: 0,
    orders: 0,
    pdfSent: 0,
    pdfFailed: 0,
    revenueCents: 0,
  };

  const funnels: Record<string, { impressions: number; clicks: number; checkouts: number; orders: number; pdfSent: number; pdfFailed: number }> = {};

  const productBreakdown: Record<string, { count: number; revenueCents: number }> = {};
  const topCtas: Record<string, number> = {};
  const pageViewsByPath: Record<string, number> = {};
  const ctaClicksByPath: Record<string, number> = {};
  const referrers: Record<string, number> = {};
  const devices: Record<string, number> = {};
  const browsers: Record<string, number> = {};
  const countries: Record<string, number> = {};
  const entryPages: Record<string, number> = {};
  const daily: Record<string, { pageViews: number; ctaClicks: number; orders: number }> = {};
  const sessions: Record<string, { firstSeen?: string; firstEvent?: string; entry?: string; pageViews: number }> = {};
  let generationTotalMs = 0;
  let generationSamples = 0;

  const bucketKey = (iso: string) => {
    const date = new Date(iso);
    if (bucket === 'hour') return date.toISOString().slice(0, 13) + ':00';
    if (bucket === 'month') return date.toISOString().slice(0, 7);
    if (bucket === 'week') {
      const temp = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
      const dayNum = temp.getUTCDay() || 7;
      temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
      const weekNo = Math.ceil((((temp.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
      return `${temp.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
    }
    return date.toISOString().slice(0, 10);
  };

  (events || []).forEach((e: any) => {
    const product = e.product || inferProduct(e.path);
    if (!funnels[product]) funnels[product] = { impressions: 0, clicks: 0, checkouts: 0, orders: 0, pdfSent: 0, pdfFailed: 0 };
    const day = bucketKey(e.created_at);
    if (!daily[day]) daily[day] = { pageViews: 0, ctaClicks: 0, orders: 0 };

    const metadata = typeof e.metadata === 'object' && e.metadata ? e.metadata : {};
    const sessionId = e.session_id as string | null;
    if (sessionId) {
      if (!sessions[sessionId]) sessions[sessionId] = { pageViews: 0 };
      if (!sessions[sessionId].firstEvent || e.created_at < sessions[sessionId].firstEvent!) {
        sessions[sessionId].firstEvent = e.created_at;
      }
      if (metadata.sessionFirstSeen) {
        const firstSeen = String(metadata.sessionFirstSeen);
        if (!sessions[sessionId].firstSeen || firstSeen < sessions[sessionId].firstSeen!) {
          sessions[sessionId].firstSeen = firstSeen;
        }
      }
    }

    if (e.event_type === 'page_view') {
      totals.pageViews += 1;
      daily[day].pageViews += 1;
      if (e.path) {
        pageViewsByPath[e.path] = (pageViewsByPath[e.path] || 0) + 1;
        if (sessionId) {
          sessions[sessionId].pageViews += 1;
          if (!sessions[sessionId].entry) sessions[sessionId].entry = e.path;
        }
      }
    }
    if (e.event_type === 'cta_impression') {
      totals.ctaImpressions += 1;
      funnels[product].impressions += 1;
    }
    if (e.event_type === 'cta_click') {
      totals.ctaClicks += 1;
      daily[day].ctaClicks += 1;
      funnels[product].clicks += 1;
      const key = `${e.path || 'unknown'}|${product}`;
      topCtas[key] = (topCtas[key] || 0) + 1;
      if (e.path) {
        ctaClicksByPath[e.path] = (ctaClicksByPath[e.path] || 0) + 1;
      }
    }
    if (e.event_type === 'checkout_start') {
      totals.checkoutStarts += 1;
      funnels[product].checkouts += 1;
    }
    if (e.event_type === 'order_created') {
      totals.orders += 1;
      daily[day].orders += 1;
      funnels[product].orders += 1;
    }
    if (e.event_type === 'pdf_sent') {
      totals.pdfSent += 1;
      funnels[product].pdfSent += 1;
      const gen = Number(metadata.generationMs);
      if (!Number.isNaN(gen) && gen > 0) {
        generationTotalMs += gen;
        generationSamples += 1;
      }
    }
    if (e.event_type === 'pdf_failed') {
      totals.pdfFailed += 1;
      funnels[product].pdfFailed += 1;
    }

    const refDomain = metadata.referrerDomain || safeReferrerDomain(e.referrer);
    if (refDomain) referrers[refDomain] = (referrers[refDomain] || 0) + 1;
    const device = metadata.device || parseDeviceType(e.user_agent);
    if (device) devices[device] = (devices[device] || 0) + 1;
    const browser = metadata.browser || parseBrowser(e.user_agent);
    if (browser) browsers[browser] = (browsers[browser] || 0) + 1;
    const country = metadata.country;
    if (country) countries[country] = (countries[country] || 0) + 1;
  });

  (reports || []).forEach((r: any) => {
    if (!productBreakdown[r.product]) productBreakdown[r.product] = { count: 0, revenueCents: 0 };
    productBreakdown[r.product].count += 1;
    if (r.status === 'delivered') {
      productBreakdown[r.product].revenueCents += r.price_cents || 0;
      totals.revenueCents += r.price_cents || 0;
    }
  });

  const topCtaList = Object.entries(topCtas)
    .map(([key, count]) => {
      const [path, product] = key.split('|');
      return { path, product, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const dailySeries = Object.entries(daily)
    .map(([date, v]) => ({ date, ...v }))
    .sort((a, b) => a.date.localeCompare(b.date));

  Object.values(sessions).forEach((session) => {
    if (session.entry) entryPages[session.entry] = (entryPages[session.entry] || 0) + 1;
  });
  totals.uniqueSessions = Object.keys(sessions).length;
  const sinceDate = new Date(sinceMs);
  Object.values(sessions).forEach((session) => {
    const firstSeen = session.firstSeen ? new Date(session.firstSeen) : session.firstEvent ? new Date(session.firstEvent) : null;
    if (!firstSeen) return;
    if (firstSeen < sinceDate) totals.returningSessions += 1;
    else totals.newSessions += 1;
  });

  const topPages = Object.entries(pageViewsByPath)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topEntryPages = Object.entries(entryPages)
    .map(([path, count]) => ({ path, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const topReferrers = Object.entries(referrers)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const deviceBreakdown = Object.entries(devices)
    .map(([device, count]) => ({ device, count }))
    .sort((a, b) => b.count - a.count);

  const browserBreakdown = Object.entries(browsers)
    .map(([browser, count]) => ({ browser, count }))
    .sort((a, b) => b.count - a.count);

  const countryBreakdown = Object.entries(countries)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  const offerCtr = Object.entries(funnels).map(([product, f]) => ({
    product,
    impressions: f.impressions,
    clicks: f.clicks,
    ctr: f.impressions ? Number(((f.clicks / f.impressions) * 100).toFixed(1)) : 0,
  }));

  const avgPagesPerSession = totals.uniqueSessions ? Number((totals.pageViews / totals.uniqueSessions).toFixed(2)) : 0;

  const { urls } = getAllSitemapUrls();
  const sectionCounts: Record<string, number> = {};
  urls.forEach((url) => {
    const path = new URL(url).pathname;
    const key = path.split('/').filter(Boolean)[0] || 'home';
    sectionCounts[key] = (sectionCounts[key] || 0) + 1;
  });

  const avgGenerationMs = generationSamples ? Math.round(generationTotalMs / generationSamples) : 0;

  const blogIndex = new Map<string, (typeof BLOG_POSTS)[number]>();
  BLOG_POSTS.forEach((post) => blogIndex.set(`/blog/${post.slug}`, post));

  const wordCount = (content: string) => content.split(/\s+/).filter(Boolean).length;
  const hasFaqSection = (content: string) => /##\s*FAQs/i.test(content);

  const resolveToolsForCategory = (category: string) => {
    const normalized = category.toLowerCase();
    if (normalized.includes('love') || normalized.includes('twin flame') || normalized.includes('compatibility') || normalized.includes('soulmate') || normalized.includes('breakup')) {
      return ['/compare', '/compatibility', '/quiz'];
    }
    if (normalized.includes('money') || normalized.includes('career') || normalized.includes('manifestation')) {
      return ['/money', '/personal-year', '/calculator'];
    }
    if (normalized.includes('life path') || normalized.includes('name numerology') || normalized.includes('destiny') || normalized.includes('soul urge') || normalized.includes('personality') || normalized.includes('birthday') || normalized.includes('maturity')) {
      return ['/calculator', '/name-numerology', '/meaning/life-path'];
    }
    if (normalized.includes('angel') || normalized.includes('dream') || normalized.includes('warning') || normalized.includes('why am i seeing') || normalized.includes('biblical')) {
      return ['/meaning/angel-number', '/why-am-i-seeing/111', '/warning/111'];
    }
    return ['/calculator', '/meaning/angel-number', '/quiz'];
  };

  const fixList: { path: string; score: number; reasons: string[]; views: number; ctr: number }[] = [];
  const internalLinkSuggestions: { path: string; suggested: string[] }[] = [];

  Object.entries(pageViewsByPath).forEach(([path, views]) => {
    const post = blogIndex.get(path);
    if (!post) return;

    const clicks = ctaClicksByPath[path] || 0;
    const ctr = views ? Number(((clicks / views) * 100).toFixed(2)) : 0;
    const reasons: string[] = [];
    let score = 0;

    const wc = wordCount(post.content || '');
    if (wc < 700) {
      reasons.push('Thin content (<700 words)');
      score += 2;
    }
    if (!hasFaqSection(post.content || '')) {
      reasons.push('Missing FAQ section');
      score += 2;
    }
    if (views >= 200 && ctr < 0.5) {
      reasons.push('Low CTA CTR (<0.5%)');
      score += 3;
    }

    const suggestions = resolveToolsForCategory(post.category);
    internalLinkSuggestions.push({ path, suggested: suggestions });

    if (reasons.length > 0) {
      fixList.push({ path, score, reasons, views, ctr });
    }
  });

  fixList.sort((a, b) => b.score - a.score || b.views - a.views);

  return NextResponse.json({
    totals,
    funnels,
    productBreakdown,
    topCtas: topCtaList,
    recentReports: (reports || []).slice(0, 20),
    dailySeries,
    topPages,
    topEntryPages,
    topReferrers,
    deviceBreakdown,
    browserBreakdown,
    countryBreakdown,
    offerCtr,
    seoSnapshot: {
      totalUrls: urls.length,
      avgPagesPerSession,
      sectionCounts,
      seenPages: Object.keys(pageViewsByPath).length,
      coveragePct: urls.length ? Number(((Object.keys(pageViewsByPath).length / urls.length) * 100).toFixed(2)) : 0,
    },
    deliveryStats: {
      avgGenerationMs,
      samples: generationSamples,
    },
    seoAudit: {
      fixList: fixList.slice(0, 10),
      internalLinks: internalLinkSuggestions.slice(0, 20),
    },
    affiliate: {
      offers: offerCtr
        .filter((row) => row.product.startsWith('affiliate_'))
        .map((row) => ({
          product: row.product,
          impressions: row.impressions,
          clicks: row.clicks,
          ctr: row.ctr,
        })),
      topPages: Object.entries(topCtas)
        .map(([key, count]) => {
          const [path, product] = key.split('|');
          return { path, product, count };
        })
        .filter((row) => row.product.startsWith('affiliate_'))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
    },
    bucket,
  });
}
