import Link from 'next/link';
import { Metadata } from 'next';
import { generateFAQSchema } from '@/lib/utils/schema';
import { HOUSE_NUMBER_LIST } from '@/lib/data/house-numbers';
import { PsychicPromo } from '@/components/PsychicPromo';
import { withCanonicalPath } from '@/lib/seo/metadata';

export const metadata: Metadata = withCanonicalPath('/house-number', {
  title: 'House Number Numerology: What Your Address Means',
  description: 'Discover the meaning of your house number in numerology. Calculate your home\'s vibration (1–9, 11, 22, 33) and how it affects love, career, and energy.',
});

const faqs = [
  {
    question: 'What is house number numerology?',
    answer: 'House number numerology uses the digits of your address to find a single number (1–9 or master numbers 11, 22, 33) that describes the energy and themes of your home.',
  },
  {
    question: 'How do I calculate my house number?',
    answer: 'Add all digits of your house or apartment number together and reduce to a single digit (or master number). Example: 744 = 7+4+4 = 15 = 1+5 = 6.',
  },
  {
    question: 'Do master numbers (11, 22, 33) apply to house numbers?',
    answer: 'Yes. If your address reduces to 11, 22, or 33 before reducing to a single digit, you can use that master number for a deeper reading.',
  },
  {
    question: 'Can my house number affect my love life or career?',
    answer: 'Yes. Each number carries themes for relationships, work, and daily life. Read your specific house number page for tailored guidance.',
  },
];

export default function HouseNumberIndexPage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
            Home Numerology
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">House Number Numerology</h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            What your address says about your home&apos;s energy. Calculate your house number and explore meanings for love, career, and daily life.
          </p>
          <Link
            href="/calculator"
            className="inline-flex items-center gap-2 bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold hover:bg-amber-400 transition"
          >
            Find My Life Path
          </Link>
        </header>

        <section className="p-6 rounded-3xl bg-card border border-default">
          <h2 className="text-xl font-bold text-primary mb-3">How to calculate your house number</h2>
          <p className="text-secondary mb-4">
            Add the digits of your house or apartment number. Reduce to a single digit (or keep 11, 22, 33 as master numbers). Example: 744 → 7+4+4 = 15 → 1+5 = <strong className="text-primary">6</strong>.
          </p>
          <p className="text-muted text-sm">For apartments, use only the apartment number. For multi-part addresses (e.g. 12A), use the number (12 → 1+2 = 3).</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-primary mb-4">House number meanings</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {HOUSE_NUMBER_LIST.map((n) => (
              <Link
                key={n}
                href={`/house-number/${n}`}
                className="p-4 rounded-xl bg-card border border-default text-center font-semibold text-amber-600 hover:border-amber-500/50 hover:bg-card transition"
              >
                {n}
              </Link>
            ))}
          </div>
        </section>

        <PsychicPromo
          contextualLine="For clarity on your home, timing, or next move, a short psychic reading can offer guidance."
          label="Psychic After Content"
        />

        <section className="p-6 rounded-3xl bg-card border border-default">
          <h2 className="text-xl font-bold text-primary mb-4">House number FAQs</h2>
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
