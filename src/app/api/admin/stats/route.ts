import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || adminKey !== expected) return unauthorized();

  const days = Number(req.nextUrl.searchParams.get('days') || 30);
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

  const { data: events } = await supabaseAdmin
    .from('analytics_events')
    .select('event_type, product, path, metadata, created_at')
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  const { data: reports } = await supabaseAdmin
    .from('reports')
    .select('product, price_cents, status, created_at, email, order_id')
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  const totals = {
    pageViews: 0,
    ctaClicks: 0,
    checkoutStarts: 0,
    orders: 0,
    pdfSent: 0,
    revenueCents: 0,
  };

  const funnels: Record<string, { clicks: number; checkouts: number; orders: number; pdfSent: number }> = {};

  const productBreakdown: Record<string, { count: number; revenueCents: number }> = {};
  const topCtas: Record<string, number> = {};
  const daily: Record<string, { pageViews: number; ctaClicks: number; orders: number }> = {};

  (events || []).forEach((e: any) => {
    const product = e.product || 'unknown';
    if (!funnels[product]) funnels[product] = { clicks: 0, checkouts: 0, orders: 0, pdfSent: 0 };
    const day = new Date(e.created_at).toISOString().slice(0, 10);
    if (!daily[day]) daily[day] = { pageViews: 0, ctaClicks: 0, orders: 0 };
    if (e.event_type === 'page_view') totals.pageViews += 1, daily[day].pageViews += 1;
    if (e.event_type === 'cta_click') {
      totals.ctaClicks += 1;
      daily[day].ctaClicks += 1;
      funnels[product].clicks += 1;
      const key = `${e.path || 'unknown'}|${e.product || 'unknown'}`;
      topCtas[key] = (topCtas[key] || 0) + 1;
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
    }
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

  return NextResponse.json({
    totals,
    funnels,
    productBreakdown,
    topCtas: topCtaList,
    recentReports: (reports || []).slice(0, 20),
    dailySeries,
  });
}
