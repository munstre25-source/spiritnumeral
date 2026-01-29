import { NextRequest, NextResponse } from 'next/server';
import { createCheckout, CheckoutMetadata } from '@/lib/lemonsqueezy';
import { logEvent } from '@/lib/analytics/server';

export async function POST(req: NextRequest) {
  try {
    const { product, metadata, successUrl, cancelUrl } = await req.json();

    if (product !== 'blueprint' && product !== 'relationship' && product !== 'wealth' && product !== 'bundle') {
      return NextResponse.json({ error: 'Invalid product' }, { status: 400 });
    }

    const safeMetadata: CheckoutMetadata = {
      numbers: Array.isArray(metadata?.numbers)
        ? metadata.numbers.slice(0, 4).map((n: any) => parseInt(n, 10)).filter((n: number) => !isNaN(n))
        : undefined,
      birthdays: Array.isArray(metadata?.birthdays)
        ? metadata.birthdays.slice(0, 2).map((d: any) => String(d))
        : undefined,
      quizAnswers: metadata?.quizAnswers,
      email: metadata?.email,
      compatibility: metadata?.compatibility,
      name: typeof metadata?.name === 'string' ? metadata.name.slice(0, 60) : undefined,
      focus: ['love', 'career', 'spiritual', 'money', 'healing'].includes(metadata?.focus)
        ? metadata.focus
        : undefined,
      feeling: ['calm', 'stuck', 'anxious', 'excited', 'heartbroken'].includes(metadata?.feeling)
        ? metadata.feeling
        : undefined,
      timeHorizon: ['7d', '30d', '90d'].includes(metadata?.timeHorizon)
        ? metadata.timeHorizon
        : undefined,
      relationshipStatus: ['single', 'dating', 'committed', 'situationship', 'separated'].includes(
        metadata?.relationshipStatus
      )
        ? metadata.relationshipStatus
        : undefined,
      challenge: typeof metadata?.challenge === 'string' ? metadata.challenge.slice(0, 120) : undefined,
    };

    await logEvent({
      sessionId: req.headers.get('x-session-id') || undefined,
      eventType: 'checkout_start',
      path: req.headers.get('referer') || undefined,
      referrer: req.headers.get('referer') || undefined,
      product,
      metadata: safeMetadata,
      userAgent: req.headers.get('user-agent') || undefined,
    });

    const url = await createCheckout(product, { ...safeMetadata, product }, successUrl, cancelUrl);
    return NextResponse.json({ url });
  } catch (error: any) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout' }, { status: 500 });
  }
}
