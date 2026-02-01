import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Career & Money Psychic Readings | Numerology Guidance',
  description: 'Get clarity on career moves, abundance, and timing with a psychic reading. Complements your life path, personal year, and money angel numbers.',
  alternates: { canonical: '/psychic-readings/career' },
};

const faqs = [
  {
    question: 'What can a career psychic help with?',
    answer: 'A career psychic can offer insight on timing for job changes, business decisions, and money flow—how your personal year and life path energy are playing out in real time.',
  },
  {
    question: 'How do personal year numbers fit with readings?',
    answer: 'Your personal year (1–9) sets the theme for the year. A reading can clarify what to focus on now—new starts, partnerships, or harvest—and when to take action.',
  },
  {
    question: 'When should I get a career reading?',
    answer: 'When you\'re deciding whether to change jobs, start something new, or invest. A short reading can confirm whether the timing aligns with your numbers.',
  },
];

export default function PsychicReadingsCareerPage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
          Career & Money
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-primary">
          Career & Money Psychic Readings
        </h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light">
          Clarity on career moves, abundance, and timing. Your life path and personal year set the theme—a reading can make the next step clear.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          { title: 'Timing', description: 'When to launch, switch, or invest—aligned with your personal year and life path.' },
          { title: 'Abundance', description: 'What your money angel numbers suggest and how a reading can deepen the message.' },
          { title: 'Next step', description: 'Focus on one clear action: stay, leave, or pivot—with confidence.' },
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
          Explore your life path, personal year, and money-related angel numbers. They give context for a more focused reading.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/calculator" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Life Path</Link>
          <Link href="/personal-year" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Personal Year</Link>
          <Link href="/money" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Money Numbers</Link>
          <Link href="/name-numerology" className="px-4 py-2 rounded-xl bg-card border border-default hover:border-amber-500/50 text-sm font-medium">Name Numerology</Link>
        </div>
      </section>

      <div className="max-w-4xl mx-auto mb-16">
        <PsychicPromo
          contextualLine="For clarity on your career and money path, a short psychic reading can offer guidance."
          label="Psychic Career Landing"
        />
      </div>

      <section className="max-w-4xl mx-auto">
        <FAQ faqs={faqs} title="Career Psychic Readings" />
      </section>

      <div className="max-w-4xl mx-auto mt-12 flex flex-wrap gap-3 justify-center">
        <Link href="/psychic-readings" className="text-amber-600 hover:underline text-sm">Psychic Readings Hub</Link>
        <Link href="/psychic-readings/love" className="text-amber-600 hover:underline text-sm">Love Readings</Link>
      </div>
    </main>
  );
}
