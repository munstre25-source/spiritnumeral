import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Numerology Reading vs Calculator | When to Use Each',
  description: 'When to use a numerology calculator vs a live psychic reading. Life path, angel numbers, and personal guidance—how they work together.',
  alternates: { canonical: '/psychic-readings/reading-vs-calculator' },
};

const faqs = [
  {
    question: 'What is the difference between a calculator and a reading?',
    answer: 'A calculator gives you numbers (life path, angel number meanings) from your birth date or name. A reading is a live conversation that interprets those numbers for your situation and timing.',
  },
  {
    question: 'Should I use a calculator before a reading?',
    answer: 'Yes. Knowing your life path, personal year, or the angel number you keep seeing gives you and the reader a shared language and makes the reading more focused.',
  },
  {
    question: 'When should I choose a reading over a calculator?',
    answer: 'When you want a personalized \"what do I do next?\"—love, career, or timing. Calculators explain the numbers; readings apply them to your life.',
  },
];

export default function ReadingVsCalculatorPage() {
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
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Numerology Reading vs Calculator</h1>
          <p className="text-lg text-secondary">
            When to use tools and when to get a live reading—and how they work together.
          </p>
        </header>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">What calculators do</h2>
          <p className="text-secondary">
            Calculators give you <strong className="text-primary">numbers and meanings</strong>: life path from your birth date, angel number meanings, compatibility, personal year. They\'re free, instant, and great for learning the system. They don\'t tell you what to do in your specific situation.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">What readings add</h2>
          <p className="text-secondary">
            A reading is a <strong className="text-primary">live conversation</strong>. The reader can take your numbers and apply them to your love life, career, or timing. You get a personalized \"what next?\"—one clear step or focus—instead of a generic description.
          </p>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">Use both</h2>
          <p className="text-secondary">
            Start with the calculator: get your life path, check the angel number you keep seeing, or run compatibility. Then, if you want clarity on what to do next, book a short reading. You\'ll have context, and the reader can go deeper.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/calculator" className="text-amber-600 hover:underline text-sm font-medium">Life Path Calculator</Link>
            <Link href="/meaning/angel-number" className="text-amber-600 hover:underline text-sm font-medium">Angel Numbers</Link>
            <Link href="/compatibility" className="text-amber-600 hover:underline text-sm font-medium">Compatibility</Link>
          </div>
        </section>

        <div className="max-w-4xl">
          <PsychicPromo
            contextualLine="Once you know your numbers, a short psychic reading can turn them into a clear next step."
            label="Psychic Guide"
          />
        </div>

        <section>
          <FAQ faqs={faqs} title="Reading vs Calculator" />
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/psychic-readings" className="text-amber-600 hover:underline text-sm">Psychic Readings Hub</Link>
          <Link href="/psychic-readings/when-to-get" className="text-amber-600 hover:underline text-sm">When to Get a Reading</Link>
          <Link href="/psychic-readings/questions-to-ask" className="text-amber-600 hover:underline text-sm">Questions to Ask</Link>
        </div>
      </div>
    </main>
  );
}
