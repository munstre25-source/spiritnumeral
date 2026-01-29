import { supabaseAdmin } from '@/lib/supabase';

export async function logEvent(event: {
  sessionId?: string;
  eventType: string;
  path?: string;
  referrer?: string;
  product?: string;
  metadata?: any;
  userAgent?: string;
}) {
  try {
    await supabaseAdmin.from('analytics_events').insert({
      session_id: event.sessionId || null,
      event_type: event.eventType,
      path: event.path || null,
      referrer: event.referrer || null,
      product: event.product || null,
      metadata: event.metadata || null,
      user_agent: event.userAgent || null,
    });
  } catch (err) {
    console.error('Analytics insert failed', err);
  }
}
