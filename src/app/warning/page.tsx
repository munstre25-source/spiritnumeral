import Link from 'next/link';
import { Metadata } from 'next';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';
import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Angel Number Warnings | Signs, Alerts, and Guidance',
  description: 'Understand angel number warning signs and what they mean for your life path. Explore alert numbers and take the next right step.',
};

const featuredNumbers = [111, 222, 333, 444, 555, 666, 777, 888, 999];

export default function WarningIndexPage() {
  const faqs = [
    {
      question: 'What are warning angel numbers?',
      answer: 'They are repeating sequences that signal a need to slow down, adjust, or refocus.',
    },
    {
      question: 'Do warning numbers mean something bad?',
      answer: 'Not necessarily. They are gentle alerts to help you course‑correct.',
    },
    {
      question: 'How should I respond?',
      answer: 'Pause, reflect, and take one grounded step based on the message.',
    },
    {
      question: 'Which numbers are common warnings?',
      answer: 'Sequences like 444, 555, and 999 often appear during transition.',
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
          Spiritual Warning Signals
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-primary font-bold">
          Angel Number Warnings
        </h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light">
          Some numbers arrive as gentle warnings: slow down, course-correct, or refocus your energy.
          Explore the number you keep seeing to understand the message.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            title: 'Pattern Breaks',
            description: 'Warning numbers surface when a habit or path needs a reset.'
          },
          {
            title: 'Energy Check',
            description: 'They highlight where your attention is drifting from your purpose.'
          },
          {
            title: 'Course Correction',
            description: 'Use the message to make small adjustments before big disruptions arrive.'
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
          <h2 className="text-3xl font-bold text-amber-500">Common Warning Numbers</h2>
          <div className="h-px flex-grow bg-divider"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-4">
          {featuredNumbers.map((number) => (
            <Link
              key={number}
              href={`/warning/${number}`}
              className="p-4 rounded-2xl bg-card border border-default hover:border-amber-500/50 hover:bg-card transition-all text-center group"
            >
              <div className="text-2xl font-bold text-primary group-hover:text-amber-500 transition-colors">
                {number}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1">Warning</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-3xl bg-card border border-default">
          <h2 className="text-3xl font-bold mb-6 text-amber-600 text-center">How to Respond</h2>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>Pause, breathe, and ask what area of life needs attention.</p>
            <p>Check your boundaries, habits, and priorities for imbalance.</p>
            <p>Use the number’s guidance as a reminder to choose your next step consciously.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <MeaningPaidCTA />
        <AffiliatePromo offer={OFFERS.affiliate_genius_song} context="Grounding & Clarity" />
      </section>
      <section className="max-w-4xl mx-auto mt-16">
        <FAQ faqs={faqs} title="Warning Number Questions" />
      </section>
    </main>
  );
}
