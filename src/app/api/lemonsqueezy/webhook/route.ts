import { NextRequest, NextResponse } from 'next/server';
import { verifyLemonSignature, extractOrderEmail, extractCustomData } from '@/lib/lemonsqueezy';
import { generateReportPdf } from '@/lib/pdf/report';
import { sendReportEmail } from '@/lib/email';
import { supabaseAdmin } from '@/lib/supabase';
import { logEvent } from '@/lib/analytics/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const raw = await req.text();
  const signature = req.headers.get('x-signature');

  if (!verifyLemonSignature(raw, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const payload = JSON.parse(raw);
  const event = payload?.meta?.event_name;
  if (event !== 'order_created') {
    return NextResponse.json({ received: true });
  }

  const email = extractOrderEmail(payload);
  const custom = extractCustomData(payload) || {};
  const parsedEntries = Object.entries(custom).map(([key, value]) => {
    if (typeof value !== 'string') return [key, value];
    try {
      return [key, JSON.parse(value)];
    } catch {
      return [key, value];
    }
  });
  const inputs = Object.fromEntries(parsedEntries) as Record<string, any>;
  const product = (inputs.product || 'blueprint') as 'blueprint' | 'relationship' | 'wealth' | 'bundle';

  if (!email) {
    console.error('Lemon webhook missing email');
    return NextResponse.json({ error: 'Missing email' }, { status: 422 });
  }

  try {
    // Create DB record
    const { data: reportRows, error: insertError } = await supabaseAdmin
      .from('reports')
      .insert({
        email,
        product,
        inputs,
        price_cents: Math.round((payload?.data?.attributes?.total || 0) * 100),
        status: 'pending',
        order_id: payload?.data?.id,
      })
      .select()
      .limit(1);

    if (insertError) {
      console.error('Supabase insert error', insertError);
    }

    await logEvent({
      eventType: 'order_created',
      product,
      metadata: { orderId: payload?.data?.id, email },
      userAgent: req.headers.get('user-agent') || undefined,
    });

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

    const targets = product === 'bundle' ? (['blueprint', 'relationship', 'wealth'] as const) : ([product] as const);
    const attachments = [];
    for (const target of targets) {
      const { buffer, filename } = await generateReportPdf({
        product: target,
        ...basePayload,
      });
      attachments.push({ filename, content: buffer });
    }

    // Email delivery
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
      eventType: 'pdf_sent',
      product,
      metadata: { orderId: payload?.data?.id, email },
      userAgent: req.headers.get('user-agent') || undefined,
    });

    // Update status
    if (reportRows && reportRows[0]) {
      await supabaseAdmin
        .from('reports')
        .update({ status: 'delivered' })
        .eq('id', reportRows[0].id);
    }

    return NextResponse.json({ delivered: true });
  } catch (error) {
    console.error('Webhook processing failed', error);
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 });
  }
}
