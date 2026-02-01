import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Psychic Readings & Numerology | Love, Career, Tarot',
  description: 'Connect numerology with psychic readings. When to get a reading, questions to ask, and how readings complement your angel numbers and life path.',
  alternates: { canonical: '/psychic-readings' },
};

const faqs = [
  {
    question: 'How do psychic readings relate to numerology?',
    answer: 'Numerology gives you numbers (life path, angel numbers) and their meanings. A psychic can interpret how those energies show up in your life and what to do next—timing, relationships, or career.',
  },
  {
    question: 'When should I get a psychic reading?',
    answer: 'When you keep seeing the same angel number, are at a crossroads in love or career, or want clarity on timing. A short reading can confirm what your numbers are already suggesting.',
  },
  {
    question: 'What questions should I ask a numerology psychic?',
    answer: 'Ask about your life path in love or career, why you keep seeing a specific angel number, or whether the timing is right for a big decision. Be specific so the reading feels personal.',
  },
];

const guides = [
  { href: '/psychic-readings/when-to-get', title: 'When to Get a Numerology Reading', description: 'Right timing for love, career, and life decisions.' },
  { href: '/psychic-readings/angel-numbers-readings', title: 'Angel Numbers and Psychic Readings', description: 'How readings deepen what your numbers mean.' },
  { href: '/psychic-readings/questions-to-ask', title: 'Questions to Ask a Numerology Psychic', description: 'Get the most from your session.' },
  { href: '/psychic-readings/reading-vs-calculator', title: 'Reading vs Calculator', description: 'When to use tools vs a live reading.' },
];

export default function PsychicReadingsHubPage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
          Numerology + Psychic Guidance
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-primary">
          Psychic Readings & Numerology
        </h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light">
          Your numbers point the way—life path, angel numbers, timing. A psychic reading can add clarity on love, career, and what to do next.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2 mb-16">
        <Link
          href="/psychic-readings/love"
          className="p-8 rounded-3xl bg-card border border-default hover:border-amber-500/50 transition-all group"
        >
          <h2 className="text-xl font-bold text-amber-600 mb-2 group-hover:text-amber-500">Love & Relationship Readings</h2>
          <p className="text-secondary text-sm">Clarity on your love path, twin flame, and soulmate timing.</p>
        </Link>
        <Link
          href="/psychic-readings/career"
          className="p-8 rounded-3xl bg-card border border-default hover:border-amber-500/50 transition-all group"
        >
          <h2 className="text-xl font-bold text-amber-600 mb-2 group-hover:text-amber-500">Career & Money Readings</h2>
          <p className="text-secondary text-sm">Insight on career moves, abundance, and personal year energy.</p>
        </Link>
      </section>

      <section className="max-w-5xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Guides</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="p-6 rounded-2xl bg-card border border-default hover:border-amber-500/50 transition-all"
            >
              <h3 className="font-semibold text-primary mb-1">{g.title}</h3>
              <p className="text-muted text-sm">{g.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="max-w-4xl mx-auto mb-16">
        <PsychicPromo
          contextualLine="For deeper insight on your numbers and next step, a short psychic reading can offer guidance."
          label="Psychic Hub"
        />
      </div>

      <section className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-primary mb-6">Explore your numbers first</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculator" className="text-amber-600 hover:underline text-sm font-medium">Life Path Calculator</Link>
          <Link href="/meaning/angel-number" className="text-amber-600 hover:underline text-sm font-medium">Angel Numbers</Link>
          <Link href="/compatibility" className="text-amber-600 hover:underline text-sm font-medium">Compatibility</Link>
          <Link href="/personal-year" className="text-amber-600 hover:underline text-sm font-medium">Personal Year</Link>
          <Link href="/twin-flame" className="text-amber-600 hover:underline text-sm font-medium">Twin Flame</Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto">
        <FAQ faqs={faqs} title="Psychic Readings & Numerology" />
      </section>
    </main>
  );
}
