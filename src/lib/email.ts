import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resendFrom = process.env.RESEND_FROM || 'reports@spiritnumeral.com';

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
