import Link from 'next/link';
import { Metadata } from 'next';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata: Metadata = {
  title: 'Questions to Ask a Numerology Psychic | Get the Most',
  description: 'What to ask a numerology or psychic reader: love, career, angel numbers, and timing. Get a focused, personal reading.',
  alternates: { canonical: '/psychic-readings/questions-to-ask' },
};

const faqs = [
  {
    question: 'What should I ask a numerology psychic?',
    answer: 'Ask one or two clear questions: e.g. "Why do I keep seeing 222?" or "Is now a good time to change jobs given my life path?" Specific questions lead to more useful answers.',
  },
  {
    question: 'Should I share my numbers with the psychic?',
    answer: 'Yes. Sharing your life path, personal year, or the angel number you keep seeing helps the reader tune into your situation and give more relevant guidance.',
  },
  {
    question: 'How many questions can I ask in one reading?',
    answer: 'Focus on one or two main themes (e.g. love + timing). Too many topics can scatter the reading. You can always book again for another focus.',
  },
];

export default function QuestionsToAskPage() {
  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
            Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Questions to Ask a Numerology Psychic</h1>
          <p className="text-lg text-secondary">
            Get the most from your session with clear, focused questions.
          </p>
        </header>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">Love & relationships</h2>
          <ul className="list-disc list-inside text-secondary space-y-1">
            <li>Why do I keep seeing [number] in relation to my love life?</li>
            <li>Is the timing right for a new relationship or reconciliation?</li>
            <li>What should I focus on in my current relationship?</li>
            <li>How do my life path and my partner\'s interact?</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">Career & money</h2>
          <ul className="list-disc list-inside text-secondary space-y-1">
            <li>Is now a good time to change jobs or start something new?</li>
            <li>What does my personal year suggest I focus on this year?</li>
            <li>Why do I keep seeing [number] when I think about money or career?</li>
          </ul>
        </section>

        <section className="p-6 rounded-3xl bg-card border border-default space-y-4">
          <h2 className="text-xl font-bold text-primary">Angel numbers</h2>
          <ul className="list-disc list-inside text-secondary space-y-1">
            <li>What does [number] mean for me right now?</li>
            <li>What one step should I take when I see this number?</li>
            <li>Is this number about love, career, or something else for me?</li>
          </ul>
        </section>

        <div className="max-w-4xl">
          <PsychicPromo
            contextualLine="With a clear question in mind, a short psychic reading can offer focused guidance."
            label="Psychic Guide"
          />
        </div>

        <section>
          <FAQ faqs={faqs} title="Questions to Ask" />
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/psychic-readings" className="text-amber-600 hover:underline text-sm">Psychic Readings Hub</Link>
          <Link href="/psychic-readings/when-to-get" className="text-amber-600 hover:underline text-sm">When to Get a Reading</Link>
          <Link href="/psychic-readings/reading-vs-calculator" className="text-amber-600 hover:underline text-sm">Reading vs Calculator</Link>
        </div>
      </div>
    </main>
  );
}
