import Link from 'next/link';
import { Metadata } from 'next';
import { generateFAQSchema } from '@/lib/utils/schema';
import { KARMIC_LESSON_LIST } from '@/lib/data/karmic-lessons';
import { PsychicPromo } from '@/components/PsychicPromo';
import { withCanonicalPath } from '@/lib/seo/metadata';

export const metadata: Metadata = withCanonicalPath('/karmic-lesson', {
  title: 'Karmic Lesson Numbers 1–9 | What\'s Missing From Your Name',
  description: 'Karmic lesson numbers show which numbers (1–9) are missing from your birth name and what you\'re here to develop. Find your lessons and grow.',
});

const faqs = [
  {
    question: 'What are karmic lesson numbers?',
    answer: 'Karmic lesson numbers are the digits 1–9 that are missing from your full birth name. Each missing number represents an area you are here to develop in this lifetime.',
  },
  {
    question: 'How do I find my karmic lesson numbers?',
    answer: 'Use the Pythagorean chart (A=1, B=2, … Z=8, 9) to convert your birth name to numbers. Any digit 1–9 that does not appear in your name is a karmic lesson.',
  },
  {
    question: 'What is the difference between karmic debt and karmic lesson?',
    answer: 'Karmic debt (13, 14, 16, 19) appears when those numbers show up in your chart. Karmic lessons are the numbers that are missing from your name—you lack that energy and are here to develop it.',
  },
  {
    question: 'Can I have more than one karmic lesson?',
    answer: 'Yes. Most people have at least one missing number; some have several. Each missing number is a separate lesson to work on.',
  },
];

export default function KarmicLessonIndexPage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
            Name Numerology
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Karmic Lesson Numbers</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            The numbers 1–9 missing from your birth name show what you&apos;re here to develop. Explore each lesson and grow.
          </p>
          <Link
            href="/name-numerology"
            className="inline-flex items-center gap-2 bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold hover:bg-amber-400 transition"
          >
            Find My Name Numbers
          </Link>
        </header>

        <section className="p-6 rounded-3xl bg-card border border-default">
          <h2 className="text-xl font-bold text-primary mb-3">How karmic lessons work</h2>
          <p className="text-secondary mb-4">
            In name numerology, each letter of your birth name corresponds to a number 1–9. If a digit never appears in your name, that number is a <strong className="text-primary">karmic lesson</strong>—an area where you are meant to grow. You are not punished for lacking it; you are here to develop it.
          </p>
          <p className="text-muted text-sm">Use our Name Numerology calculator to see which numbers appear in your name; the missing ones are your karmic lessons.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Karmic lesson meanings (1–9)</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {KARMIC_LESSON_LIST.map((n) => (
              <Link
                key={n}
                href={`/karmic-lesson/${n}`}
                className="p-4 rounded-xl bg-card border border-default text-center font-semibold text-amber-600 hover:border-amber-500/50 hover:bg-card transition"
              >
                {n}
              </Link>
            ))}
          </div>
        </section>

        <PsychicPromo
          contextualLine="For clarity on your life path and next step, a short psychic reading can offer guidance."
          label="Psychic After Content"
        />

        <section className="p-6 rounded-3xl bg-card border border-default">
          <h2 className="text-xl font-bold text-primary mb-4">Karmic lesson FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-primary">{faq.question}</h3>
                <p className="text-secondary text-sm mt-1">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/karmic-debt" className="text-sm text-amber-600 hover:underline">Karmic Debt</Link>
          <Link href="/name-numerology" className="text-sm text-amber-600 hover:underline">Name Numerology</Link>
          <Link href="/meaning/life-path" className="text-sm text-amber-600 hover:underline">Life Path</Link>
          <Link href="/psychic-readings" className="text-sm text-amber-600 hover:underline">Psychic Readings</Link>
        </div>
      </div>
    </main>
  );
}
