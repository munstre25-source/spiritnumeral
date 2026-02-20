import Link from 'next/link';
import { Metadata } from 'next';
import { withCanonicalPath } from '@/lib/seo/metadata';

export const metadata: Metadata = withCanonicalPath('/reviews', {
  title: 'Spirit Numeral Reviews — Quick Number Report & Personal Blueprint',
  description:
    'An honest review of Spirit Numeral’s numerology reports: Quick Number Report ($7) and Personal Blueprint ($17). What you get, who it’s for, and how it compares.',
  openGraph: {
    title: 'Spirit Numeral Reviews — Quick Number Report & Personal Blueprint',
    description:
      'An honest review of Spirit Numeral’s numerology reports. What you get, who it’s for, and how it compares.',
  },
});

const PSYCHIC_OZ_LINK = 'https://psychicoz.com?a_aid=697f030692a07';

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-page text-primary">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-serif font-bold text-primary mb-4">
          Spirit Numeral review: Quick Number Report &amp; Personal Blueprint
        </h1>
        <p className="text-secondary text-sm mb-8">
          An honest look at what Spirit Numeral offers — and who it’s best for.
        </p>

        <article className="prose prose-invert prose-amber max-w-none space-y-6 text-secondary text-sm leading-relaxed">
          <p>
            Spirit Numeral is a numerology site focused on angel numbers and life path meanings. Unlike
            many sites that bury you in ads or vague content, they offer two clear products: a
            <strong className="text-primary"> Quick Number Report</strong> ($7) and a{' '}
            <strong className="text-primary">Personal Blueprint</strong> ($17). Here’s what you
            actually get and whether it’s worth it.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">Quick Number Report — $7</h2>
          <p>
            One number, one page. You pick an angel number (e.g. 111, 444), and you get a short PDF
            with its meaning, love/career/twin flame angles, and “what to do next.” No long quiz, no
            forms — just the number and a clear takeaway. Good if you keep seeing one number and want
            a single, focused answer without committing to a full reading.
          </p>
          <p>
            <Link
              href="/quick-report"
              className="text-amber-600 hover:text-amber-500 font-medium"
            >
              Get the Quick Number Report →
            </Link>
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">Personal Blueprint — $17</h2>
          <p>
            This is the full experience: a short quiz (focus, feeling, time horizon), your key
            numbers, and a longer PDF that ties everything together — focus, feeling, action plan,
            and optional name numerology. Best for anyone who wants a “one place” summary they can
            revisit over 7–30 days. The personalization (focus area, how you feel, time horizon) makes
            it feel specific, not generic.
          </p>
          <p>
            <Link href="/quiz" className="text-amber-600 hover:text-amber-500 font-medium">
              Take the quiz and get your Blueprint →
            </Link>
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">Who it’s for</h2>
          <p>
            If you’re into angel numbers and life path numerology and want something you can use
            (not just read), the Quick Report is a low-friction way to try them. The Blueprint is
            better if you want a single document that combines your number, your current focus, and
            a clear next step. Both are delivered by email as PDFs; no login or membership.
          </p>

          <h2 className="text-xl font-semibold text-primary mt-8">For deeper readings</h2>
          <p>
            If you want a live reading — someone on the other end — we recommend{' '}
            <a
              href={PSYCHIC_OZ_LINK}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-amber-600 hover:text-amber-500 font-medium"
            >
              PsychicOz
            </a>
            . They’ve been around since 1989, offer phone, chat, video, and email readings, and new
            customers get the first 3 minutes free. We use them when we want a personal reading
            rather than a static report.
          </p>
          <p>
            <a
              href={PSYCHIC_OZ_LINK}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-block mt-4 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-colors"
            >
              Try 3 free minutes with a psychic →
            </a>
          </p>

          <hr className="border-default my-8" />

          <p className="text-muted text-xs">
            Spirit Numeral is our own site. This review reflects our experience with the reports and
            with PsychicOz as a recommended option for live readings. For entertainment and
            self-reflection only.
          </p>
        </article>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/quick-report"
            className="px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-colors"
          >
            Quick Report — $7
          </Link>
          <Link
            href="/quiz"
            className="px-6 py-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-600 font-semibold text-sm hover:bg-amber-500/25 transition-colors"
          >
            Personal Blueprint — $17
          </Link>
          <a
            href={PSYCHIC_OZ_LINK}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="px-6 py-3 rounded-xl border border-default text-secondary font-semibold text-sm hover:border-amber-500/50 transition-colors"
          >
            PsychicOz (3 min free)
          </a>
        </div>
      </div>
    </main>
  );
}
