import Link from 'next/link';
import { Metadata } from 'next';
import dataset from '@/lib/data/spirituality-dataset.json';

export const metadata: Metadata = {
  title: 'Angel Number Meanings | Spirit Numeral',
  description: 'Browse the complete library of angel numbers with meanings for love, career, twin flames, and year-ahead outlooks. Jump into any number for a detailed reading.',
};

const angelNumbers = dataset.angel_numbers;
const faqs = [
  {
    question: 'What is an angel number?',
    answer: 'An angel number is a repeating or meaningful sequence of numbers believed to carry guidance from your spiritual guides. Each number has its own vibration that can point you toward specific actions or mindsets.'
  },
  {
    question: 'How do I know which angel number applies to me?',
    answer: 'Notice the numbers you keep seeing on clocks, receipts, or signs. That repetition is your signal—look up that exact number to get the most relevant message.'
  },
  {
    question: 'Do angel numbers have different meanings for love and career?',
    answer: 'Yes. Every angel number has themes for relationships, purpose, and personal growth. Dive into the detailed page to see tailored guidance for love, career, and your twin flame journey.'
  },
  {
    question: 'Can angel numbers warn me about something?',
    answer: 'Some angel numbers highlight course corrections—like setting boundaries or slowing down. Check the “warning” pages for nuance before making big decisions.'
  }
];

export default function AngelNumberIndexPage() {
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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      <section className="max-w-5xl mx-auto text-center space-y-6 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
          Angel Number Library
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent">
          Angel Number Meanings (111-999)
        </h1>
        <p className="text-lg md:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
          Explore every angel number from 111-999. Each card gives you the core guidance plus quick links to deep-dive meanings, “why am I seeing”, warnings, and twin flame insights.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/calculator"
            className="bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold transition hover:bg-amber-400"
          >
            Find My Life Path
          </Link>
          <Link
            href="/meaning/life-path"
            className="px-5 py-3 rounded-xl border border-zinc-800 text-zinc-200 hover:border-amber-500/60 transition"
          >
            Explore Life Paths
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {angelNumbers.map((item) => (
          <article
            key={item.number}
            className="p-5 md:p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition shadow-lg flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold">
                {item.number}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs border border-amber-500/30">
                Guidance
              </span>
            </div>
            <h2 className="text-lg md:text-xl font-semibold text-amber-50 leading-tight">
              Angel Number {item.number} Meaning
            </h2>
            <p className="text-sm text-zinc-300 leading-relaxed line-clamp-2">
              {item.meaning}
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">
              Love: {item.love}
            </p>
            <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">
              Career: {item.career}
            </p>
            <div className="text-xs text-zinc-400">
              Outlook: {item['2026_prediction']}
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href={`/meaning/angel-number/${item.number}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition"
              >
                Angel {item.number} meaning <span aria-hidden>→</span>
              </Link>
              <Link
                href={`/why-am-i-seeing/${item.number}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-800 text-zinc-200 text-sm hover:border-amber-500/60 transition"
              >
                Why I&rsquo;m seeing {item.number}
              </Link>
              <Link
                href={`/is-${item.number}-a-warning/${item.number}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-800 text-zinc-200 text-sm hover:border-amber-500/60 transition"
              >
                Is {item.number} a warning?
              </Link>
              <Link
                href={`/${item.number}-twin-flame/${item.number}`}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-zinc-800 text-zinc-200 text-sm hover:border-amber-500/60 transition"
              >
                {item.number} twin flame
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="max-w-5xl mx-auto mt-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold mb-4">
          Angel Number FAQ
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-amber-50 mb-6">Quick answers to common questions</h2>
        <div className="space-y-4">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group border border-zinc-800 rounded-2xl bg-zinc-900/40 px-5 py-4 hover:border-amber-500/40 transition"
            >
              <summary className="flex justify-between items-center cursor-pointer text-amber-100 font-semibold text-base md:text-lg">
                <span>{item.question}</span>
                <span className="text-amber-500 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-3 text-zinc-300 leading-relaxed text-sm md:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
