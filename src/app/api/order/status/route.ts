import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, orderId } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let query = supabaseAdmin
      .from('reports')
      .select('email, product, status, created_at, order_id')
      .eq('email', email);

    if (orderId && typeof orderId === 'string') {
      query = query.eq('order_id', orderId);
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1);
    if (error) {
      console.error('Order status query error', error);
      return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
    }

    if (!data || !data[0]) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const report = data[0];
    return NextResponse.json({
      email: report.email,
      product: report.product,
      status: report.status,
      created_at: report.created_at,
      order_id: report.order_id,
    });
  } catch (error) {
    console.error('Order status error', error);
    return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
  }
}
