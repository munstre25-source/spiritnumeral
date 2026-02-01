import Link from 'next/link';
import { Metadata } from 'next';
import { generateFAQSchema } from '@/lib/utils/schema';
import { PsychicPromo } from '@/components/PsychicPromo';

export const metadata: Metadata = {
  title: 'Numerology & Psychic Readings | When to Get a Reading',
  description: 'How numerology and psychic readings work together. When to get a reading, what to ask, and how to find clarity on love, career, and your numbers.',
  alternates: { canonical: '/psychic-readings' },
};

const faqs = [
  {
    question: 'When should I get a numerology reading?',
    answer: 'Consider a reading when you face big decisions, life transitions, or recurring numbers you can\'t interpret alone. A live reading adds personalized, real-time insight.',
  },
  {
    question: 'What is the difference between a numerology calculator and a psychic reading?',
    answer: 'Calculators give you your core numbers and general meanings. A psychic reading adds interpretation tailored to your current situation and questions.',
  },
  {
    question: 'What can I ask in a numerology reading?',
    answer: 'You can ask about love, career, timing, angel numbers, life path, and next steps. Psychics who use numerology can tie your numbers to your current life.',
  },
  {
    question: 'Are psychic readings for love and career different?',
    answer: 'Yes. Love readings focus on relationships, soulmates, and timing in love. Career readings focus on purpose, money, and professional timing. Choose the one that matches your question.',
  },
];

export default function PsychicReadingsHubPage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
            Numerology & Readings
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Numerology & Psychic Readings</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            When numbers aren&apos;t enough, a live reading can add clarity. Learn when to get a reading, what to ask, and how numerology and psychics work together.
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          <Link
            href="/psychic-readings/love"
            className="p-6 rounded-3xl bg-card border border-default hover:border-amber-500/50 transition text-center"
          >
            <span className="text-3xl mb-3 block" aria-hidden>💕</span>
            <h2 className="text-xl font-bold text-primary mb-2">Love Readings</h2>
            <p className="text-secondary text-sm">Clarity on relationships, soulmates, and timing in love.</p>
            <span className="inline-block mt-4 text-amber-600 font-semibold text-sm">Get clarity →</span>
          </Link>
          <Link
            href="/psychic-readings/career"
            className="p-6 rounded-3xl bg-card border border-default hover:border-amber-500/50 transition text-center"
          >
            <span className="text-3xl mb-3 block" aria-hidden>💼</span>
            <h2 className="text-xl font-bold text-primary mb-2">Career & Money Readings</h2>
            <p className="text-secondary text-sm">Purpose, money, and professional timing.</p>
            <span className="inline-block mt-4 text-amber-600 font-semibold text-sm">Get clarity →</span>
          </Link>
          <Link
            href="/psychic-readings/when-to-get"
            className="p-6 rounded-3xl bg-card border border-default hover:border-amber-500/50 transition text-center"
          >
            <span className="text-3xl mb-3 block" aria-hidden>✨</span>
            <h2 className="text-xl font-bold text-primary mb-2">When to Get a Reading</h2>
            <p className="text-secondary text-sm">Life transitions, big decisions, and recurring numbers.</p>
            <span className="inline-block mt-4 text-amber-600 font-semibold text-sm">Read more →</span>
          </Link>
        </section>

        <PsychicPromo
          contextualLine="Readers who want one clear answer often try a short reading next. First 3 minutes free."
          label="Psychic Hub CTA"
        />

        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">Guides</h2>
          <ul className="space-y-3">
            <li>
              <Link href="/psychic-readings/when-to-get" className="text-amber-600 hover:underline font-medium">
                When to get a numerology reading
              </Link>
              <span className="text-muted text-sm ml-2">— Life transitions, decisions, recurring numbers</span>
            </li>
            <li>
              <Link href="/psychic-readings/angel-numbers-readings" className="text-amber-600 hover:underline font-medium">
                Angel numbers and psychic readings
              </Link>
              <span className="text-muted text-sm ml-2">— When to get a reading for repeating numbers</span>
            </li>
            <li>
              <Link href="/psychic-readings/questions-to-ask" className="text-amber-600 hover:underline font-medium">
                Questions to ask a numerology psychic
              </Link>
              <span className="text-muted text-sm ml-2">— Love, career, timing, angel numbers</span>
            </li>
            <li>
              <Link href="/psychic-readings/reading-vs-calculator" className="text-amber-600 hover:underline font-medium">
                Numerology reading vs calculator
              </Link>
              <span className="text-muted text-sm ml-2">— When a live reading adds value</span>
            </li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default">
          <h2 className="text-xl font-bold text-primary mb-4">FAQs</h2>
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
          <Link href="/meaning/angel-number" className="text-sm text-amber-600 hover:underline">Angel Numbers</Link>
          <Link href="/meaning/life-path" className="text-sm text-amber-600 hover:underline">Life Path</Link>
          <Link href="/compatibility" className="text-sm text-amber-600 hover:underline">Compatibility</Link>
          <Link href="/calculator" className="text-sm text-amber-600 hover:underline">Calculator</Link>
        </div>
      </div>
    </main>
  );
}
