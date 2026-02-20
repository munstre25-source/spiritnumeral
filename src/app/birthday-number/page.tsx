import Link from 'next/link';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';
import { withCanonicalPath } from '@/lib/seo/metadata';

export const metadata = withCanonicalPath('/birthday-number', {
  title: 'Birthday Numbers • Spirit Numeral',
  description: 'Discover the meaning of your birthday number.',
});

export default function BirthdayIndexPage() {
  const faqs = [
    {
      question: 'What is a birthday number?',
      answer: 'Your birthday number reflects natural talents and gifts linked to the day you were born.',
    },
    {
      question: 'Is a birthday number the same as life path?',
      answer: 'No. Life path uses your full birth date; the birthday number is just the day (1–31).',
    },
    {
      question: 'How should I use my birthday number?',
      answer: 'Use it to highlight strengths and ways you naturally express yourself.',
    },
    {
      question: 'Do master numbers apply to birthday numbers?',
      answer: 'Yes. If you were born on 11 or 22, those master energies apply.',
    },
  ];
  const numbers = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Birthday Numbers</h1>
          <p className="text-secondary">Explore your natural gifts by day of birth.</p>
        </header>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/birthday-number/${n}`} className="p-3 rounded-xl bg-card border border-default text-center text-amber-600 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <FAQ faqs={faqs} title="Birthday Number Questions" />
      </div>
    </main>
  );
}
