import PersonalTimingCalculator from '@/components/PersonalTimingCalculator';
import { TimingPaidCTA } from '@/components/TimingPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata = {
  title: 'Personal Year Number Calculator • Spirit Numeral',
  description: 'Calculate your personal year number and discover its meaning.',
};

export default function PersonalYearPage() {
  const faqs = [
    {
      question: 'What is a personal year number?',
      answer: 'Your personal year number reveals the main theme and lessons of your current 12‑month cycle.',
    },
    {
      question: 'How do I calculate my personal year?',
      answer: 'Add your birth month and day to the current year, then reduce to a single digit.',
    },
    {
      question: 'Do personal years repeat?',
      answer: 'Yes. The cycle moves from 1 to 9 and then starts again.',
    },
    {
      question: 'Can I plan around my personal year?',
      answer: 'Yes. It’s a helpful timing tool for aligning goals and expectations.',
    },
  ];
  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Personal Year Number</h1>
          <p className="text-secondary text-lg">
            Your personal year shows the dominant theme of your current 12-month cycle.
          </p>
        </header>
        <PersonalTimingCalculator />
        <section className="p-6 rounded-3xl bg-card border border-default">
          <TimingPaidCTA />
          <AffiliatePromo offer={OFFERS.affiliate_numerologist} context="Prosperity VSL" />
        </section>
        <FAQ faqs={faqs} title="Personal Year Questions" />
      </div>
    </main>
  );
}
