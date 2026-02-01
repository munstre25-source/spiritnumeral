import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

/** Public: get A/B experiment config by key (e.g. psychic_cta). Used by CTA components. */
export async function GET(req: NextRequest) {
  const key = req.nextUrl.searchParams.get('key') || 'psychic_cta';
  const { data, error } = await supabaseAdmin
    .from('ab_experiments')
    .select('variants, control_id')
    .eq('key', key)
    .eq('enabled', true)
    .single();

  if (error || !data) {
    return NextResponse.json({ variants: [], controlId: 'control' });
  }

  const variants = Array.isArray(data.variants) ? data.variants : [];
  return NextResponse.json({
    variants: variants as { id: string; copy: string }[],
    controlId: (data.control_id as string) || 'control',
  });
}
