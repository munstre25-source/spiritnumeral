import Link from 'next/link';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';
import { withCanonicalPath } from '@/lib/seo/metadata';

export const metadata = withCanonicalPath('/pinnacle', {
  title: 'Pinnacle Numbers • Spirit Numeral',
  description: 'Learn your pinnacle numbers and long-term life phases.',
});

export default function PinnacleIndexPage() {
  const faqs = [
    {
      question: 'What is a pinnacle number?',
      answer: 'Pinnacle numbers describe your long‑term life phases and growth cycles.',
    },
    {
      question: 'How many pinnacle cycles are there?',
      answer: 'There are four major pinnacle cycles across your lifetime.',
    },
    {
      question: 'Can my pinnacle number change?',
      answer: 'Yes. Your active pinnacle changes as you move through life phases.',
    },
    {
      question: 'How should I use pinnacle numbers?',
      answer: 'Use them to understand the theme of your current life phase and plan long‑term goals.',
    },
  ];
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Pinnacle Numbers</h1>
          <p className="text-secondary">Explore your long-term growth cycles.</p>
        </header>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/pinnacle/${n}`} className="p-4 rounded-xl bg-card border border-default text-center text-amber-600 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <PsychicPromo
            contextualLine="For clarity on your next step and timing, a short psychic reading can offer guidance."
            label="Psychic After Content"
          />
        </div>
        <FAQ faqs={faqs} title="Pinnacle Number Questions" />
      </div>
    </main>
  );
}
