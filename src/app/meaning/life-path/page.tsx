import Link from 'next/link';
import { Metadata } from 'next';
import dataset from '@/lib/data/spirituality-dataset.json';
import { QuickReportUpsell } from '@/components/QuickReportUpsell';

export const metadata: Metadata = {
  title: 'Life Path Meanings | Spirit Numeral',
  description: 'Explore Life Path numbers 1-9 with meanings for love, career, and year-ahead outlooks. Find your number and dive deeper into your spiritual blueprint.',
};

const lifePaths = dataset.life_paths;
const faqs = [
  {
    question: 'What is a Life Path number?',
    answer: 'Your Life Path number is calculated from your full birthdate and represents your core personality, purpose, and the lessons you repeat in this lifetime.'
  },
  {
    question: 'How do I find my Life Path number?',
    answer: 'Add all digits of your birthdate and reduce to a single digit (or master number 11/22/33). Use the calculator above for an instant result and a personalized reading.'
  },
  {
    question: 'Do Life Path numbers change?',
    answer: 'No. Your Life Path number stays the same for life. What changes is how consciously you work with its strengths and challenges over time.'
  },
  {
    question: 'Can my Life Path number influence love and career?',
    answer: 'Yes. Each Life Path has relationship patterns, career alignments, and recurring challenges. Read your specific page for tailored guidance.'
  }
];

export default function LifePathIndexPage() {
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section className="max-w-5xl mx-auto text-center space-y-6 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
          Life Path Library
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary font-bold">
          Life Path Meanings (1-9)
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
          Browse all nine Life Path numbers to understand your core traits, relationship style, career flow, challenges, and 2026 forecast. Click through for the full, personalized breakdown.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/calculator"
            className="bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold transition hover:bg-amber-400"
          >
            Find My Life Path
          </Link>
          <Link
            href="/meaning/angel-number"
            className="px-5 py-3 rounded-xl border border-default text-secondary hover:border-amber-500/60 transition"
          >
            Explore Angel Numbers
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2">
        {lifePaths.map((path) => (
          <article
            key={path.path}
            className="p-6 md:p-7 rounded-3xl bg-card border border-default hover:border-amber-500/40 transition shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold">
                Life Path {path.path}
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs border border-amber-500/30">
                {path.title}
              </span>
            </div>
            <p className="text-secondary font-medium mb-3">{path.traits}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-secondary">
              <div className="rounded-2xl bg-page/60 border border-default p-4">
                <div className="text-amber-600 font-semibold mb-1">Love</div>
                <p className="text-secondary leading-relaxed">{path.love}</p>
              </div>
              <div className="rounded-2xl bg-page/60 border border-default p-4">
                <div className="text-amber-600 font-semibold mb-1">Career</div>
                <p className="text-secondary leading-relaxed">{path.career}</p>
              </div>
            </div>
            <p className="mt-4 text-secondary text-sm leading-relaxed">
              Outlook: {path['2026_outlook']}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/meaning/life-path/life-path-${path.path}`}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
              >
                Life Path {path.path} meaning
                <span aria-hidden>→</span>
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-default text-secondary hover:border-amber-500/60 transition"
              >
                Calculate your number
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-5xl mx-auto mt-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold mb-4">
          Life Path FAQ
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Quick answers to common questions</h2>
        <div className="space-y-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group border border-default rounded-2xl bg-card px-5 py-4 hover:border-amber-500/40 transition"
            >
              <summary className="flex justify-between items-center cursor-pointer text-primary font-semibold text-base md:text-lg">
                <span>{item.question}</span>
                <span className="text-amber-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-secondary leading-relaxed text-sm md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-10">
        <QuickReportUpsell />
      </section>
    </main>
  );
}
