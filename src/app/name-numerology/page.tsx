import NameNumerologyCalculator from '@/components/NameNumerologyCalculator';
import { NamePaidCTA } from '@/components/NamePaidCTA';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';

export const metadata = {
  title: 'Name Numerology Calculator • Spirit Numeral',
  description: 'Calculate your Expression, Soul Urge, and Personality numbers from your name.',
};

export default function NameNumerologyPage() {
  const faqs = [
    {
      question: 'What is name numerology?',
      answer: 'Name numerology translates your full birth name into numbers that reveal core personality traits and life themes.',
    },
    {
      question: 'What are Expression, Soul Urge, and Personality numbers?',
      answer: 'Expression reflects your overall potential, Soul Urge reveals inner desires, and Personality shows how others perceive you.',
    },
    {
      question: 'Does a name change affect my numerology?',
      answer: 'Yes. Changes to your name can shift Expression, Soul Urge, and Personality numbers.',
    },
    {
      question: 'Do I need my full legal name?',
      answer: 'Use your full birth name for the most accurate result.',
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
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Name Numerology</h1>
          <p className="text-secondary text-lg">
            Discover how your name shapes your Expression, Soul Urge, and Personality numbers.
          </p>
        </header>
        <NameNumerologyCalculator />
        <section className="p-6 rounded-3xl bg-card border border-default">
          <NamePaidCTA />
        </section>
        <AffiliatePromo offer={OFFERS.affiliate_moon_reading} context="Personalized Astrology" />
        <FAQ faqs={faqs} title="Name Numerology Questions" />
      </div>
    </main>
  );
}
