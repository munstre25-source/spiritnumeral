import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Angel Numbers and Psychic Readings | Deeper Meaning',
  description: 'How psychic readings deepen what your angel numbers mean. Get personal guidance on 111, 222, 444, and other repeating numbers.',
  alternates: { canonical: '/psychic-readings/angel-numbers-readings' },
};

const faqs = [
  {
    question: 'How do psychic readings relate to angel numbers?',
    answer: 'Angel numbers give you a general meaning (e.g. 222 = balance, partnership). A psychic can personalize why you\'re seeing that number now and what to do next in your life.',
  },
  {
    question: 'Should I tell the psychic which number I keep seeing?',
    answer: 'Yes. Sharing the number (and where you see it) helps the reader tune into your situation and give more specific guidance.',
  },
  {
    question: 'Can a reading tell me why I see a certain number?',
    answer: 'A reading can offer insight on timing, relationships, or career themes that align with that number—why it might be showing up for you right now.',
  },
];

export default function AngelNumbersReadingsPage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
            Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Angel Numbers and Psychic Readings</h1>
          <p className="text-lg text-secondary">
            How readings deepen what your angel numbers mean—and when to combine both.
          </p>
        </header>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">What numbers give you</h2>
          <p className="text-secondary">
            Angel numbers (111, 222, 444, etc.) carry general meanings: new beginnings, balance, protection, change. They point to themes. What they don\'t tell you is <em>why</em> you\'re seeing them now or <em>what to do</em> in your specific situation.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">What a reading adds</h2>
          <p className="text-secondary">
            A psychic can take the number you\'re seeing and tie it to your love life, career, or timing. They can suggest one clear next step—act, wait, or focus elsewhere—so the message feels personal, not generic.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default">
          <h2 className="text-xl font-bold text-primary mb-3">Explore your numbers first</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/meaning/angel-number" className="text-amber-600 hover:underline text-sm font-medium">Angel Numbers</Link>
            <Link href="/twin-flame" className="text-amber-600 hover:underline text-sm font-medium">Twin Flame</Link>
            <Link href="/soulmate" className="text-amber-600 hover:underline text-sm font-medium">Soulmate</Link>
            <Link href="/money" className="text-amber-600 hover:underline text-sm font-medium">Money Numbers</Link>
          </div>
        </section>

        <div className="max-w-4xl">
          <PsychicPromo
            contextualLine="For a personal take on the number you keep seeing, a short psychic reading can offer clarity."
            label="Psychic Guide"
          />
        </div>

        <section>
          <FAQ faqs={faqs} title="Angel Numbers & Readings" />
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/psychic-readings" className="text-amber-600 hover:underline text-sm">Psychic Readings Hub</Link>
          <Link href="/psychic-readings/questions-to-ask" className="text-amber-600 hover:underline text-sm">Questions to Ask</Link>
          <Link href="/psychic-readings/reading-vs-calculator" className="text-amber-600 hover:underline text-sm">Reading vs Calculator</Link>
        </div>
      </div>
    </main>
  );
}
