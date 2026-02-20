import Link from 'next/link';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';
import { withCanonicalPath } from '@/lib/seo/metadata';

export const metadata = withCanonicalPath('/maturity-number', {
  title: 'Maturity Numbers • Spirit Numeral',
  description: 'Explore your maturity number and later-life direction.',
});

export default function MaturityIndexPage() {
  const faqs = [
    {
      question: 'What is a maturity number?',
      answer: 'Your maturity number reflects the direction of your later‑life purpose and growth.',
    },
    {
      question: 'How is the maturity number calculated?',
      answer: 'It’s typically the sum of your life path and expression numbers, reduced.',
    },
    {
      question: 'When does the maturity number become important?',
      answer: 'It becomes more noticeable later in life as long‑term priorities solidify.',
    },
    {
      question: 'How should I use it?',
      answer: 'Use it to align long‑term goals with your evolving strengths and purpose.',
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
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Maturity Numbers</h1>
          <p className="text-secondary">Your later-life purpose and direction.</p>
        </header>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/maturity-number/${n}`} className="p-4 rounded-xl bg-card border border-default text-center text-amber-600 font-semibold">
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
        <FAQ faqs={faqs} title="Maturity Number Questions" />
      </div>
    </main>
  );
}
