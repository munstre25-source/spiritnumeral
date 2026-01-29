import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { generateReportPdf } from '@/lib/pdf/report';
import { sendReportEmail } from '@/lib/email';
import { logEvent } from '@/lib/analytics/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const { email, orderId } = await req.json();
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    let query = supabaseAdmin
      .from('reports')
      .select('email, product, inputs, order_id')
      .eq('email', email);

    if (orderId && typeof orderId === 'string') {
      query = query.eq('order_id', orderId);
    }

    const { data, error } = await query.order('created_at', { ascending: false }).limit(1);
    if (error) {
      console.error('Resend lookup error', error);
      return NextResponse.json({ error: 'Lookup failed' }, { status: 500 });
    }

    if (!data || !data[0]) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const report = data[0];
    const rawInputs = report.inputs || {};
    const inputs = Object.fromEntries(
      Object.entries(rawInputs).map(([key, value]) => {
        if (typeof value !== 'string') return [key, value];
        try {
          return [key, JSON.parse(value)];
        } catch {
          return [key, value];
        }
      })
    ) as Record<string, any>;

    const basePayload = {
      numbers: inputs.numbers,
      birthdays: inputs.birthdays,
      compatibility: inputs.compatibility,
      quizAnswers: inputs.quizAnswers,
      email,
      name: inputs.name,
      focus: inputs.focus,
      feeling: inputs.feeling,
      timeHorizon: inputs.timeHorizon,
      relationshipStatus: inputs.relationshipStatus,
      challenge: inputs.challenge,
    };

    const product = report.product as 'blueprint' | 'relationship' | 'wealth' | 'bundle';
    const targets = product === 'bundle' ? (['blueprint', 'relationship', 'wealth'] as const) : ([product] as const);
    const attachments = [];
    for (const target of targets) {
      const { buffer, filename } = await generateReportPdf({
        product: target,
        ...basePayload,
      });
      attachments.push({ filename, content: buffer });
    }

    const subject =
      product === 'bundle'
        ? 'Your Numerology Bundle (3 Reports)'
        : product === 'relationship'
          ? 'Your Relationship Numerology Report'
          : product === 'wealth'
            ? 'Your Wealth & Abundance Numerology Report'
            : 'Your Personal Numerology Blueprint';

    await sendReportEmail(
      email,
      subject,
      'Here is your personalized numerology PDF. Save it for your journey. \n\nWith light,\nSpirit Numeral',
      attachments
    );

    await logEvent({
      eventType: 'pdf_resent',
      product,
      metadata: { orderId: report.order_id, email },
      userAgent: req.headers.get('user-agent') || undefined,
    });

    return NextResponse.json({ resent: true });
  } catch (error) {
    console.error('Resend error', error);
    return NextResponse.json({ error: 'Resend failed' }, { status: 500 });
  }
}
