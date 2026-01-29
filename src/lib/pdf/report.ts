import PDFDocument from 'pdfkit';
import { getAngelNumber } from '../supabase';

type ProductType = 'blueprint' | 'relationship' | 'wealth';

export interface ReportPayload {
  product: ProductType;
  numbers?: number[];
  birthdays?: string[];
  compatibility?: {
    score: number;
    description?: string;
  };
  quizAnswers?: any;
  email?: string;
  name?: string;
  focus?: 'love' | 'career' | 'spiritual' | 'money' | 'healing';
  feeling?: 'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken';
  timeHorizon?: '7d' | '30d' | '90d';
  relationshipStatus?: 'single' | 'dating' | 'committed' | 'situationship' | 'separated';
  challenge?: string;
}

interface Section {
  title: string;
  body: string;
}

async function getNumberCopy(num: number): Promise<Section[]> {
  const data = await getAngelNumber(num);
  if (!data) {
    return [
      { title: `Angel Number ${num}`, body: 'Meaning data not found. Trust your intuition and notice where this number appears for you.' },
    ];
  }

  return [
    { title: `Angel Number ${num}`, body: data.meaning || 'This number carries a unique vibration guiding your path.' },
    { title: 'Love & Relationships', body: data.love || 'Notice how this number appears when your heart makes decisions.' },
    { title: 'Career & Purpose', body: data.career || 'Align your work with the message this number brings.' },
    { title: 'Twin Flame', body: data.twin_flame || 'Pay attention to synchronicities in close connections.' },
    { title: 'What To Do Next', body: data.what_to_do || 'Act on the small nudges you keep receiving today.' },
  ];
}

function addHeader(doc: PDFDocument, title: string, subtitle?: string) {
  doc
    .fontSize(24)
    .fillColor('#d4a853')
    .text(title, { align: 'left' });
  if (subtitle) {
    doc
      .moveDown(0.2)
      .fontSize(11)
      .fillColor('#666')
      .text(subtitle);
  }
  doc.moveDown(1);
}

function addSection(doc: PDFDocument, section: Section) {
  doc
    .fontSize(16)
    .fillColor('#d4a853')
    .text(section.title);
  doc.moveDown(0.3);
  doc
    .fontSize(12)
    .fillColor('#111')
    .text(section.body, { lineGap: 4 });
  doc.moveDown(1);
}

function addFooter(doc: PDFDocument) {
  doc.moveDown(1);
  doc
    .fontSize(9)
    .fillColor('#999')
    .text('Generated for you by Spirit Numeral • spiritnumeral.com', { align: 'center' });
}

function focusBlurb(focus?: ReportPayload['focus']) {
  switch (focus) {
    case 'love': return 'Your heart focus: love & relationships. Watch how your primary number shows up in conversations, texts, and timing nudges.';
    case 'career': return 'Career focus: align daily work with your core number. Look for nudges in meetings, offers, and sudden ideas.';
    case 'spiritual': return 'Spiritual growth focus: deepen practices when this number appears. Journal synchronicities within 10 minutes of seeing it.';
    case 'money': return 'Money focus: track this number around payments, prices, and invoices—it points to flow or leaks.';
    case 'healing': return 'Healing focus: notice this number when emotions spike; pair it with a breath pattern or micro-break.';
    default: return 'Set one focus for the next 30 days; revisit this report weekly and annotate what shifted.';
  }
}

function feelingAffirmation(feeling?: ReportPayload['feeling']) {
  const map: Record<string, string> = {
    calm: 'You’re steady; use that calm to take one brave action within 24 hours.',
    stuck: 'Feeling stuck? Choose the smallest possible move—text, call, or note—when the number appears.',
    anxious: 'When anxiety rises, treat the number as a pause cue. 4-4-4 breathing, then decide.',
    excited: 'Ride the excitement—capture the idea in 3 bullets; act on one within a day.',
    heartbroken: 'Heart space is tender. Let the number mark micro-moments of self-trust and gentle boundaries.',
  };
  return map[feeling || ''] || 'Use every sighting as a micro-reset: inhale, name the nudge, act small.';
}

function timeHorizonBlock(timeHorizon?: ReportPayload['timeHorizon']) {
  switch (timeHorizon) {
    case '7d': return 'Next 7 days: log every appearance with time + feeling. Take one aligned action by day 3 and a second by day 6.';
    case '30d': return 'Next 30 days: weekly review of sightings; choose one theme per week (heart, work, money, rest).';
    case '90d': return 'Next season (90 days): set a single intention. Track patterns at week 3, 6, and 12 to see cadence.';
    default: return 'Choose a time window (7/30/90 days) and commit to logging sightings; your pattern emerges fast.';
  }
}

function relationshipStatusNote(status?: ReportPayload['relationshipStatus']) {
  switch (status) {
    case 'single': return 'For singles: use sightings as greenlight moments to engage, not to wait. Say yes to one invite per week.';
    case 'dating': return 'Dating: share one honest thought each time you see the number; it builds trust fast.';
    case 'committed': return 'Committed: match sightings with micro-rituals—walks, shared tea, or 10-minute debriefs.';
    case 'situationship': return 'Situationship: treat sightings as clarity prompts. Name what you want, once a week, aloud.';
    case 'separated': return 'Separated: let numbers mark boundaries. Note where your energy leaks and close one leak per week.';
    default: return 'Notice how the number shows up around your connections; let it cue the next honest conversation.';
  }
}

function challengeLine(challenge?: string) {
  if (!challenge) return '';
  return `Your current challenge: “${challenge.slice(0, 80)}”. Re-read it after each sighting and ask: what is the smallest next move?`;
}

export async function generateReportPdf(payload: ReportPayload) {
  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];
  const filename =
    payload.product === 'relationship'
      ? 'relationship-report.pdf'
      : payload.product === 'wealth'
        ? 'wealth-abundance-report.pdf'
        : 'numerology-blueprint.pdf';

  doc.on('data', chunk => chunks.push(chunk as Buffer));

  addHeader(
    doc,
    payload.product === 'relationship'
      ? 'Relationship Numerology Report'
      : payload.product === 'wealth'
        ? 'Wealth & Abundance Numerology Report'
        : 'Personal Numerology Blueprint',
    `Prepared for ${payload.name || payload.email || 'you'} • ${new Date().toLocaleDateString()}`
  );

  if (payload.product === 'relationship') {
    const numbers = payload.numbers || [];
    doc
      .fontSize(12)
      .fillColor('#333')
      .text('Numbers analyzed: ' + (numbers.length ? numbers.join(', ') : 'Not provided'));
    if (payload.compatibility) {
      doc.moveDown(0.6);
      doc
        .fontSize(14)
        .fillColor('#d4a853')
        .text(`Compatibility Score: ${payload.compatibility.score}%`);
      if (payload.compatibility.description) {
      doc
        .moveDown(0.2)
        .fontSize(12)
        .fillColor('#111')
        .text(payload.compatibility.description);
      }
    }
    doc.moveDown(1);

    addSection(doc, { title: 'Relationship Focus', body: relationshipStatusNote(payload.relationshipStatus) });

    for (const num of numbers.slice(0, 2)) {
      const sections = await getNumberCopy(num);
      sections.forEach(section => addSection(doc, section));
    }

    addSection(doc, {
      title: 'Next Steps Together',
      body: 'Pay attention to when each number shows up for your relationship. Journal the context, then revisit this report weekly to notice patterns and timing windows.',
    });

    addSection(doc, { title: 'Time Horizon', body: timeHorizonBlock(payload.timeHorizon) });

  } else {
    const primary = payload.numbers?.[0];
    if (primary !== undefined) {
      doc
        .fontSize(12)
        .fillColor('#333')
        .text(`Primary number: ${primary}`);
      doc.moveDown(1);
      const sections = await getNumberCopy(primary);
      sections.forEach(section => addSection(doc, section));
    }

    if (payload.numbers && payload.numbers.length > 1) {
      addSection(doc, {
        title: 'Supportive Numbers',
        body: `You also resonate with: ${payload.numbers.slice(1, 4).join(', ')}. Notice how these show up around decisions, emotions, or people.`,
      });
    }

    addSection(doc, { title: 'Your Focus', body: focusBlurb(payload.focus) });
    addSection(doc, { title: 'How You Feel', body: feelingAffirmation(payload.feeling) });
    addSection(doc, { title: 'Time Horizon', body: timeHorizonBlock(payload.timeHorizon) });

    if (payload.product === 'wealth') {
      addSection(doc, {
        title: 'Wealth & Abundance Plan',
        body: '1) Choose one revenue action and one expense cut this week. 2) Match sightings of your number to money decisions only. 3) Review cashflow every 7 days for 30 days.',
      });
      addSection(doc, {
        title: 'Money Signals',
        body: 'Track where the number appears around invoices, prices, or unexpected offers. Treat each sighting as a prompt to log or act on a money decision.',
      });
    } else {
      addSection(doc, {
        title: 'How to Apply This Blueprint',
        body: '1) Set a 7-day intention using your primary number. 2) Track every appearance and what you were thinking. 3) Act on one clear nudge each week.',
      });
    }
  }

  const challenge = challengeLine(payload.challenge);
  if (challenge) {
    addSection(doc, { title: 'Your Edge', body: challenge });
  }

  addFooter(doc);
  doc.end();

  await new Promise<void>((resolve) => doc.on('end', () => resolve()));
  const buffer = Buffer.concat(chunks);
  return { buffer, filename };
}
