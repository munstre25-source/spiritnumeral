import { NextRequest, NextResponse } from 'next/server';
import { logEvent } from '@/lib/analytics/server';
import { parseBrowser, parseDeviceType, safeReferrerDomain } from '@/lib/analytics/userAgent';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userAgent = req.headers.get('user-agent') || undefined;
    const country =
      req.headers.get('x-vercel-ip-country') ||
      req.headers.get('cf-ipcountry') ||
      req.headers.get('x-country-code') ||
      undefined;

    const baseMetadata = typeof body.metadata === 'object' && body.metadata ? body.metadata : {};
    const referrerDomain = safeReferrerDomain(body.referrer);
    let utm: Record<string, string> | undefined;
    if (body.url && typeof body.url === 'string') {
      try {
        const url = new URL(body.url);
        const params = url.searchParams;
        const source = params.get('utm_source');
        const medium = params.get('utm_medium');
        const campaign = params.get('utm_campaign');
        const term = params.get('utm_term');
        const content = params.get('utm_content');
        if (source || medium || campaign || term || content) {
          utm = {
            ...(source ? { source } : {}),
            ...(medium ? { medium } : {}),
            ...(campaign ? { campaign } : {}),
            ...(term ? { term } : {}),
            ...(content ? { content } : {}),
          };
        }
      } catch {
        // ignore URL parse errors
      }
    }

    const metadata = {
      ...baseMetadata,
      device: parseDeviceType(userAgent),
      browser: parseBrowser(userAgent),
      country,
      referrerDomain,
      utm,
      sessionFirstSeen: body.sessionFirstSeen,
    };

    await logEvent({
      sessionId: body.sessionId,
      eventType: body.eventType || 'unknown',
      path: body.path,
      referrer: body.referrer,
      product: body.product,
      metadata,
      userAgent,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
