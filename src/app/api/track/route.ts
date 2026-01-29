import { NextRequest, NextResponse } from 'next/server';
import { logEvent } from '@/lib/analytics/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await logEvent({
      sessionId: body.sessionId,
      eventType: body.eventType || 'unknown',
      path: body.path,
      referrer: body.referrer,
      product: body.product,
      metadata: body.metadata,
      userAgent: req.headers.get('user-agent') || undefined,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
