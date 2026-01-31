import { Resend } from 'resend';
import {
  getDailyAngelNumber,
  getDateString,
  getPersonalDayFromBirthDate,
} from '@/lib/daily-number';

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM || 'reports@spiritnumeral.com';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendReportEmail(
  to: string,
  subject: string,
  text: string,
  attachments?: { filename: string; content: Buffer }[]
) {
  if (!resend) throw new Error('Missing RESEND_API_KEY');

  const files = attachments && attachments.length ? attachments : undefined;

  await resend.emails.send({
    from: resendFrom,
    to,
    subject,
    text,
    attachments: files,
  });
}

export type DailyNumberPayload = {
  dailyAngelNumber: number;
  dateStr: string;
  personalDayNumber: number | null;
};

export async function sendDailyNumberEmail(
  to: string,
  payload: DailyNumberPayload
) {
  if (!resend) throw new Error('Missing RESEND_API_KEY');

  const { dailyAngelNumber, dateStr, personalDayNumber } = payload;
  const subject = personalDayNumber != null
    ? `Your number today: ${personalDayNumber} · Spirit Numeral`
    : `Your daily number: ${dailyAngelNumber} · Spirit Numeral`;

  const angelLink = `${siteUrl}/meaning/angel-number/${dailyAngelNumber}`;
  const personalDayLink =
    personalDayNumber != null
      ? `${siteUrl}/personal-day/${personalDayNumber}`
      : null;

  const textLines: string[] = [
    `Hi,`,
    ``,
    `Here’s your daily number for ${dateStr}.`,
    ``,
    `Today’s angel number: ${dailyAngelNumber}`,
    `Explore its meaning: ${angelLink}`,
  ];
  if (personalDayNumber != null) {
    textLines.push(
      ``,
      `Your personal day number today: ${personalDayNumber}`,
      `What it means for you: ${personalDayLink}`,
    );
  }
  textLines.push(
    ``,
    `— Spirit Numeral`,
    siteUrl,
  );

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Your daily number</title></head>
<body style="font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 480px; margin: 0 auto; padding: 24px;">
  <p>Hi,</p>
  <p>Here’s your daily number for <strong>${dateStr}</strong>.</p>
  <p><strong>Today’s angel number: ${dailyAngelNumber}</strong><br>
  <a href="${angelLink}">Explore its meaning →</a></p>
  ${personalDayNumber != null ? `<p><strong>Your personal day number today: ${personalDayNumber}</strong><br>
  <a href="${personalDayLink}">What it means for you →</a></p>` : ''}
  <p style="margin-top: 32px; color: #666; font-size: 14px;">— Spirit Numeral<br><a href="${siteUrl}">${siteUrl}</a></p>
</body>
</html>
  `.trim();

  await resend.emails.send({
    from: resendFrom,
    to,
    subject,
    text: textLines.join('\n'),
    html,
  });
}
