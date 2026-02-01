import Link from 'next/link';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';
import { QuickReportUpsell } from '@/components/QuickReportUpsell';
import { OFFERS } from '@/lib/offers';

export const metadata = {
  title: 'Karmic Debt Numbers • Spirit Numeral',
  description: 'Understand karmic debt numbers 13, 14, 16, and 19.',
};

export default function KarmicDebtIndexPage() {
  const faqs = [
    {
      question: 'What are karmic debt numbers?',
      answer: 'Karmic debt numbers highlight lessons tied to past patterns that need balancing in this lifetime.',
    },
    {
      question: 'Which karmic debt numbers are most common?',
      answer: 'The most cited karmic debt numbers are 13, 14, 16, and 19.',
    },
    {
      question: 'How do I know if I have karmic debt?',
      answer: 'If your life path, expression, or other core numbers reduce to 13, 14, 16, or 19, it may indicate karmic debt themes.',
    },
    {
      question: 'How should I work with karmic debt numbers?',
      answer: 'Use them as guidance for personal growth, discipline, and conscious choices.',
    },
  ];
  const numbers = [13, 14, 16, 19];
  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Karmic Debt Numbers</h1>
          <p className="text-secondary">Deep lessons and patterns to balance.</p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/karmic-debt/${n}`} className="p-4 rounded-xl bg-card border border-default text-center text-amber-600 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <section className="p-6 rounded-3xl bg-card border border-default">
          <LifecyclePaidCTA type="karmic_debt" />
        </section>
        <QuickReportUpsell />
        <FAQ faqs={faqs} title="Karmic Debt Questions" />
      </div>
    </main>
  );
}
