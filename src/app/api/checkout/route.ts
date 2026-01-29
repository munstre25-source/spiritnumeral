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
      nameNumbers: metadata?.nameNumbers
        ? {
            fullName: typeof metadata.nameNumbers.fullName === 'string' ? metadata.nameNumbers.fullName.slice(0, 80) : undefined,
            expression: typeof metadata.nameNumbers.expression === 'number' ? metadata.nameNumbers.expression : undefined,
            soulUrge: typeof metadata.nameNumbers.soulUrge === 'number' ? metadata.nameNumbers.soulUrge : undefined,
            personality: typeof metadata.nameNumbers.personality === 'number' ? metadata.nameNumbers.personality : undefined,
          }
        : undefined,
      personalTiming: metadata?.personalTiming
        ? {
            birthdate: typeof metadata.personalTiming.birthdate === 'string' ? metadata.personalTiming.birthdate : undefined,
            targetDate: typeof metadata.personalTiming.targetDate === 'string' ? metadata.personalTiming.targetDate : undefined,
            personalYear: typeof metadata.personalTiming.personalYear === 'number' ? metadata.personalTiming.personalYear : undefined,
            personalMonth: typeof metadata.personalTiming.personalMonth === 'number' ? metadata.personalTiming.personalMonth : undefined,
            personalDay: typeof metadata.personalTiming.personalDay === 'number' ? metadata.personalTiming.personalDay : undefined,
          }
        : undefined,
      lifecycle: metadata?.lifecycle
        ? {
            type: ['pinnacle', 'challenge', 'maturity', 'birthday', 'karmic_debt'].includes(metadata.lifecycle.type)
              ? metadata.lifecycle.type
              : undefined,
            number: typeof metadata.lifecycle.number === 'number' ? metadata.lifecycle.number : undefined,
          }
        : undefined,
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
