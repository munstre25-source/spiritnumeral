import PersonalTimingCalculator from '@/components/PersonalTimingCalculator';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata = {
  title: 'Personal Month Number Calculator • Spirit Numeral',
  description: 'Calculate your personal month number and discover its meaning.',
};

export default function PersonalMonthPage() {
  const faqs = [
    {
      question: 'What is a personal month number?',
      answer: 'Your personal month number reveals the energy and focus for the next 30 days.',
    },
    {
      question: 'How do I calculate my personal month?',
      answer: 'Add your personal year number to the current month and reduce to a single digit.',
    },
    {
      question: 'Does it change every month?',
      answer: 'Yes. Personal month energy shifts each calendar month.',
    },
    {
      question: 'How should I use it?',
      answer: 'Use it for short‑term planning and decision timing.',
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
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Personal Month Number</h1>
          <p className="text-secondary text-lg">
            Your personal month shows the main energy for the next 30 days.
          </p>
        </header>
        <PersonalTimingCalculator />
        <FAQ faqs={faqs} title="Personal Month Questions" />
      </div>
    </main>
  );
}
