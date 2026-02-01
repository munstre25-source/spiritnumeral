import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

/** GET: list all A/B experiments (admin auth). */
export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || adminKey !== expected) return unauthorized();

  const { data, error } = await supabaseAdmin
    .from('ab_experiments')
    .select('id, key, name, variants, control_id, enabled, updated_at')
    .order('key');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data || []);
}

/** PATCH: update one experiment (admin auth). Body: { key, variants?, control_id?, enabled? } */
export async function PATCH(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  const expected = process.env.ADMIN_DASHBOARD_KEY;
  if (!expected || adminKey !== expected) return unauthorized();

  let body: { key: string; variants?: { id: string; copy: string }[]; control_id?: string; enabled?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!body?.key) {
    return NextResponse.json({ error: 'key required' }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (Array.isArray(body.variants)) {
    updates.variants = body.variants;
  }
  if (typeof body.control_id === 'string') {
    updates.control_id = body.control_id;
  }
  if (typeof body.enabled === 'boolean') {
    updates.enabled = body.enabled;
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No updates' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('ab_experiments')
    .update(updates)
    .eq('key', body.key)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
