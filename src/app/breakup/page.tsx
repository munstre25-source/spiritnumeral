import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Breakup Angel Numbers | Healing and New Beginnings',
  description: 'See what angel numbers mean after a breakup. Find guidance for healing, closure, and new love opportunities.',
};

const featuredNumbers = [111, 222, 333, 444, 555, 666, 777, 888, 999];

export default function BreakupIndexPage() {
  const faqs = [
    {
      question: 'What do breakup numbers mean?',
      answer: 'Breakup numbers highlight healing lessons, emotional grounding, and relationship closure.',
    },
    {
      question: 'Does a breakup number mean reconciliation?',
      answer: 'Not necessarily. It can indicate healing, reflection, or future readiness.',
    },
    {
      question: 'How should I use the message?',
      answer: 'Focus on self‑care, clarity, and one constructive step each day.',
    },
    {
      question: 'Which numbers are common during breakups?',
      answer: '444, 555, and 999 often appear during transition and healing phases.',
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
          Breakup Healing
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-primary font-bold">
          Angel Numbers After a Breakup
        </h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light">
          Numbers can appear after a breakup as reassurance, direction, and a reminder that healing is underway.
          Find the number you’re seeing for personalized guidance.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            title: 'Closure & Release',
            description: 'Numbers validate the ending and help you let go with clarity.'
          },
          {
            title: 'Self-Worth Reset',
            description: 'They encourage boundaries, confidence, and rebuilding your inner foundation.'
          },
          {
            title: 'New Chapter',
            description: 'Some sequences signal fresh love or a new beginning emerging.'
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
          <h2 className="text-3xl font-bold text-amber-500">Common Healing Numbers</h2>
          <div className="h-px flex-grow bg-divider"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-4">
          {featuredNumbers.map((number) => (
            <Link
              key={number}
              href={`/breakup/${number}`}
              className="p-4 rounded-2xl bg-card border border-default hover:border-amber-500/50 hover:bg-card transition-all text-center group"
            >
              <div className="text-2xl font-bold text-primary group-hover:text-amber-500 transition-colors">
                {number}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1">Breakup</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-3xl bg-card border border-default">
          <h2 className="text-3xl font-bold mb-6 text-amber-600 text-center">Grounding Steps</h2>
          <div className="space-y-4 text-secondary leading-relaxed">
            <p>Focus on one stabilizing habit: sleep, movement, or journaling.</p>
            <p>Reflect on the lesson the relationship offered, then release the rest.</p>
            <p>Follow the number’s guidance to rebuild confidence and openness to love.</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mb-16">
        <PsychicPromo
          contextualLine="If you're at a relationship crossroads, a trusted psychic reading can give clarity."
          label="Psychic After Content"
        />
      </div>

      <section className="max-w-4xl mx-auto mt-16">
        <FAQ faqs={faqs} title="Breakup Number Questions" />
      </section>
    </main>
  );
}
