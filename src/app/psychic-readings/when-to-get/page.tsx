import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'When to Get a Numerology Reading | Love, Career, Timing',
  description: 'When is the right time for a psychic reading? Learn when numerology readings help most—love crossroads, career moves, and angel number clarity.',
  alternates: { canonical: '/psychic-readings/when-to-get' },
};

const faqs = [
  {
    question: 'When should I get a numerology reading?',
    answer: 'When you keep seeing the same angel number, are at a love or career crossroads, or want clarity on timing. A short reading can confirm what your numbers suggest.',
  },
  {
    question: 'Is there a bad time for a reading?',
    answer: 'Readings work best when you\'re open and specific. Avoid booking when you\'re rushed or only want someone to tell you what you want to hear—readings are for clarity, not validation.',
  },
  {
    question: 'How often should I get a reading?',
    answer: 'There\'s no rule. Some people get one when a number keeps appearing or before a big decision. Others check in seasonally or with their personal year change.',
  },
];

export default function WhenToGetPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold text-primary">When to Get a Numerology Reading</h1>
          <p className="text-lg text-secondary">
            Right timing for love, career, and life decisions—and how a reading complements your numbers.
          </p>
        </header>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">When a reading helps most</h2>
          <ul className="list-disc list-inside text-secondary space-y-2">
            <li>You keep seeing the same angel number and want to know what to do next.</li>
            <li>You\'re at a love or relationship crossroads—stay, leave, or wait.</li>
            <li>You\'re considering a career change, move, or big financial step.</li>
            <li>Your personal year has shifted and you want to align with the new energy.</li>
            <li>You\'ve done the calculator and want a live perspective on your life path.</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">When to wait</h2>
          <p className="text-secondary">
            A reading works best when you\'re ready to hear clarity, not just confirmation. If you\'re only looking for someone to agree with a decision you\'ve already made, give it a little time. Come when you\'re open to insight.
          </p>
        </section>

        <div className="max-w-4xl">
          <PsychicPromo
            contextualLine="When the timing feels right, a short psychic reading can offer clarity on your next step."
            label="Psychic Guide"
          />
        </div>

        <section>
          <FAQ faqs={faqs} title="When to Get a Reading" />
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
