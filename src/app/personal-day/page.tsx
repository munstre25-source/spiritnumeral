import PersonalTimingCalculator from '@/components/PersonalTimingCalculator';
import { TimingPaidCTA } from '@/components/TimingPaidCTA';
import { QuickReportUpsell } from '@/components/QuickReportUpsell';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata = {
  title: 'Personal Day Number Calculator • Spirit Numeral',
  description: 'Calculate your personal day number and discover its meaning.',
};

export default function PersonalDayPage() {
  const faqs = [
    {
      question: 'What is a personal day number?',
      answer: 'Your personal day number reflects the tone and focus for today.',
    },
    {
      question: 'How do I calculate my personal day?',
      answer: 'Add your personal month number to today’s day of the month and reduce.',
    },
    {
      question: 'Does it change daily?',
      answer: 'Yes, it shifts every day to give short‑term guidance.',
    },
    {
      question: 'How should I use it?',
      answer: 'Use it to plan tasks, conversations, and energy management for the day.',
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
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Personal Day Number</h1>
          <p className="text-secondary text-lg">
            Your personal day reveals the tone for today and what to prioritize.
          </p>
        </header>
        <PersonalTimingCalculator />
        <section className="p-6 rounded-3xl bg-card border border-default">
          <TimingPaidCTA />
          <QuickReportUpsell />
        </section>
        <FAQ faqs={faqs} title="Personal Day Questions" />
      </div>
    </main>
  );
}
