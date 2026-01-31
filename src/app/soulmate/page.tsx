import Link from 'next/link';
import { Metadata } from 'next';
import { RelationshipPaidCTA } from '@/components/RelationshipPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Soulmate Angel Numbers | Signs and Love Messages',
  description: 'Discover soulmate angel numbers and what they reveal about love, timing, and your next relationship chapter.',
};

const featuredNumbers = [111, 222, 333, 444, 555, 666, 777, 888];

export default function SoulmateIndexPage() {
  const faqs = [
    {
      question: 'What are soulmate angel numbers?',
      answer: 'Soulmate angel numbers are repeating sequences that highlight alignment, timing, and love lessons.',
    },
    {
      question: 'Do soulmate numbers guarantee a relationship?',
      answer: 'No. They are guidance signals that encourage readiness, clarity, and communication.',
    },
    {
      question: 'Which numbers are most associated with love?',
      answer: 'Common love‑aligned numbers include 222, 444, 777, and 1111.',
    },
    {
      question: 'How should I act when I see a soulmate number?',
      answer: 'Use the message to take one grounded step toward openness or healing.',
    },
  ];
  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
          Soulmate Guidance
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-primary font-bold">
          Soulmate Angel Numbers
        </h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light">
          Soulmate numbers highlight romantic alignment, readiness, and deep emotional connection. Find the
          number you’re seeing to understand the message.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            title: 'Alignment',
            description: 'Numbers can confirm that your love life is aligning with divine timing.'
          },
          {
            title: 'Heart Readiness',
            description: 'Repeated sequences remind you to heal and open your heart.'
          },
          {
            title: 'Connection Clues',
            description: 'They may signal a meaningful encounter or deepen an existing bond.'
          }
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-3xl bg-card border border-default">
            <h2 className="text-lg font-semibold text-amber-600 mb-3">{item.title}</h2>
            <p className="text-secondary leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-amber-500">Popular Soulmate Numbers</h2>
          <div className="h-px flex-grow bg-divider"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {featuredNumbers.map((number) => (
            <Link
              key={number}
              href={`/soulmate/${number}`}
              className="p-4 rounded-2xl bg-card border border-default hover:border-amber-500/50 hover:bg-card transition-all text-center group"
            >
              <div className="text-2xl font-bold text-primary group-hover:text-amber-500 transition-colors">
                {number}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1">Soulmate</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-3xl bg-card border border-default">
          <h2 className="text-3xl font-bold mb-6 text-amber-600 text-center">Use the Message</h2>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>Write down the number and where you saw it to capture the context.</p>
            <p>Focus on the theme: new beginnings, balance, or transformation.</p>
            <p>Take one intentional step toward love—communication, healing, or openness.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <RelationshipPaidCTA
          label="Get Your Soulmate PDF ($29)"
          sublabel="Personalized relationship guidance based on your number and current connection."
        />
        <AffiliatePromo offer={OFFERS.affiliate_soulmate_story} context="Soulmate Sketch" />
      </section>
      <section className="max-w-4xl mx-auto mt-16">
        <FAQ faqs={faqs} title="Soulmate Number Questions" />
      </section>
    </main>
  );
}
