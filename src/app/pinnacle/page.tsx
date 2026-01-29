import Link from 'next/link';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata = {
  title: 'Pinnacle Numbers • Spirit Numeral',
  description: 'Learn your pinnacle numbers and long-term life phases.',
};

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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Pinnacle Numbers</h1>
          <p className="text-zinc-400">Explore your long-term growth cycles.</p>
        </header>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/pinnacle/${n}`} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center text-amber-400 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <LifecyclePaidCTA type="pinnacle" />
          <AffiliatePromo offer={OFFERS.affiliate_numerologist} context="Prosperity VSL" />
        </section>
        <FAQ faqs={faqs} title="Pinnacle Number Questions" />
      </div>
    </main>
  );
}
