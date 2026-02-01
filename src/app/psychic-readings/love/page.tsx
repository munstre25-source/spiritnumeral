import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Love & Relationship Psychic Readings | Numerology Clarity',
  description: 'Get clarity on your love path with a psychic reading. Twin flame, soulmate timing, and relationship guidance that complements your numerology.',
  alternates: { canonical: '/psychic-readings/love' },
};

const faqs = [
  {
    question: 'What can a love psychic tell me?',
    answer: 'A love psychic can offer clarity on timing, compatibility, and next steps—whether you\'re single, in a relationship, or wondering about a twin flame or soulmate connection.',
  },
  {
    question: 'How does numerology fit with love readings?',
    answer: 'Your life path and angel numbers (e.g. 222, 444) already suggest themes. A reading can personalize how those energies show up in your love life and what to do next.',
  },
  {
    question: 'When is the best time for a love reading?',
    answer: 'When you keep seeing the same number, are at a crossroads, or want a second perspective on timing. Even a short reading can confirm or clarify what you sense.',
  },
];

export default function PsychicReadingsLovePage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
          Love & Relationships
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-primary">
          Love & Relationship Psychic Readings
        </h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light">
          Clarity on your love path, twin flame, and soulmate timing. Your numbers point the way—a reading can make the next step clear.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          { title: 'Twin flame & soulmate', description: 'Timing and signs that align with your angel numbers and life path.' },
          { title: 'Compatibility', description: 'How your numbers interact with a partner\'s—and what a reading can add.' },
          { title: 'Next step clarity', description: 'When to act, when to wait, and what to focus on in love.' },
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-3xl bg-card border border-default">
            <h2 className="text-lg font-semibold text-amber-600 mb-3">{item.title}</h2>
            <p className="text-secondary leading-relaxed text-sm">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-primary mb-4">Your numbers first</h2>
        <p className="text-secondary mb-6">
          Before or after a reading, explore your life path and love-related angel numbers. They set the stage for more personal guidance.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculator" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Life Path</Link>
          <Link href="/twin-flame" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Twin Flame Numbers</Link>
          <Link href="/soulmate" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Soulmate Numbers</Link>
          <Link href="/compatibility" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Compatibility</Link>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mb-16">
        <PsychicPromo
          contextualLine="If you're at a relationship crossroads, a trusted psychic reading can give clarity."
          label="Psychic Love Landing"
        />
      </div>

      <section className="max-w-4xl mx-auto">
        <FAQ faqs={faqs} title="Love Psychic Readings" />
      </section>

      <div className="max-w-4xl mx-auto mt-12 flex flex-wrap gap-3 justify-center">
        <Link href="/psychic-readings" className="text-amber-600 hover:underline text-sm">Psychic Readings Hub</Link>
        <Link href="/psychic-readings/career" className="text-amber-600 hover:underline text-sm">Career Readings</Link>
      </div>
    </main>
  );
}
