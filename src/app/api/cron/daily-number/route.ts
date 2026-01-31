import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendDailyNumberEmail } from '@/lib/email';
import {
  getDailyAngelNumber,
  getDateString,
  getPersonalDayFromBirthDate,
} from '@/lib/daily-number';

/**
 * Cron job: send daily number emails to subscribers.
 * Invoked by Vercel Cron (GET) with Authorization: Bearer CRON_SECRET.
 * Set CRON_SECRET in Vercel env (e.g. openssl rand -hex 32).
 */
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const today = new Date();
  const dailyAngelNumber = getDailyAngelNumber();
  const dateStr = getDateString();

  const { data: subscribers, error: fetchError } = await supabaseAdmin
    .from('email_subscribers')
    .select('email, metadata')
    .eq('is_active', true)
    .is('unsubscribed_at', null)
    .eq('source', 'daily_number');

  if (fetchError) {
    console.error('Cron daily-number: fetch subscribers error', fetchError);
    return NextResponse.json(
      { error: 'Failed to fetch subscribers', details: fetchError.message },
      { status: 500 }
    );
  }

  if (!subscribers?.length) {
    return NextResponse.json({
      ok: true,
      sent: 0,
      message: 'No daily_number subscribers',
    });
  }

  let sent = 0;
  const errors: { email: string; error: string }[] = [];

  for (const row of subscribers) {
    const email = row.email as string;
    const metadata = row.metadata as { birthDate?: string } | null;
    const birthDate =
      metadata?.birthDate && typeof metadata.birthDate === 'string'
        ? metadata.birthDate.slice(0, 10)
        : null;
    const personalDayNumber = birthDate
      ? getPersonalDayFromBirthDate(birthDate)
      : null;

    try {
      await sendDailyNumberEmail(email, {
        dailyAngelNumber,
        dateStr,
        personalDayNumber,
      });
      sent += 1;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error('Cron daily-number: send failed', email, message);
      errors.push({ email, error: message });
    }
  }

  return NextResponse.json({
    ok: true,
    sent,
    total: subscribers.length,
    date: today.toISOString().slice(0, 10),
    dailyAngelNumber,
    errors: errors.length ? errors : undefined,
  });
}
