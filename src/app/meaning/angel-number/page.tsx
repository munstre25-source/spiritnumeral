import Link from 'next/link';
import { Metadata } from 'next';
import { supabaseAdmin, AngelNumber } from '@/lib/supabase';
import AngelNumberSearch from '@/components/AngelNumberSearch';
import { QuickReportUpsell } from '@/components/QuickReportUpsell';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Angel Number Meanings: Love, Career & Twin Flame (0-9999)',
  description: 'Look up any angel number meaning. Love, career, twin flame, and spiritual guidance. Free meanings for 0-9999.',
  openGraph: {
    title: 'Angel Number Meanings: Love, Career & Twin Flame',
    description: 'Look up any angel number meaning. Love, career, twin flame. Free meanings.',
  },
};

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
  }
];

export default async function AngelNumberIndexPage() {
  // Fetch all angel numbers in batches (Supabase default limit is 1000)
  const { data: batch1, error: error1 } = await supabaseAdmin
    .from('angel_numbers')
    .select('number, meaning')
    .order('number', { ascending: true })
    .range(0, 999);

  const { data: batch2, error: error2 } = await supabaseAdmin
    .from('angel_numbers')
    .select('number, meaning')
    .order('number', { ascending: true })
    .range(1000, 2499);

  const { data: batch3, error: error3 } = await supabaseAdmin
    .from('angel_numbers')
    .select('number, meaning')
    .order('number', { ascending: true })
    .range(2000, 2499);

  const angelNumbers = [...(batch1 || []), ...(batch2 || []), ...(batch3 || [])];
  const error = error1 || error2 || error3;

  if (error) {
    console.error('Error fetching angel numbers:', error);
  }

  // Group by hundreds
  const groups: { [key: string]: typeof angelNumbers } = {};
  angelNumbers?.forEach((item) => {
    const groupKey = `${Math.floor(item.number / 100)}00s`;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
  });

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

      <section className="max-w-5xl mx-auto text-center space-y-8 mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
          Complete Angel Number Library
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-primary font-bold">
          Explore All Angel Numbers
        </h1>
        <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light">
          We have decoded {angelNumbers?.length || '889+'} angel numbers. Find the hidden meaning behind the sequences appearing in your life.
        </p>

        <div className="pt-4">
          <AngelNumberSearch />
        </div>
      </section>

      <section className="max-w-7xl mx-auto mb-20">
        {Object.entries(groups).map(([group, numbers]) => (
          <div key={group} className="mb-20 last:mb-0">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold text-amber-500">{group}</h2>
              <div className="h-px flex-grow bg-divider"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {numbers.map((item) => (
                <Link
                  key={item.number}
                  href={`/meaning/angel-number/${item.number}`}
                  className="p-4 rounded-2xl bg-card border border-default hover:border-amber-500/50 hover:bg-card transition-all text-center group"
                >
                  <div className="text-2xl font-bold text-primary group-hover:text-amber-500 transition-colors">
                    {item.number}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted font-bold mt-1">Meaning</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-4xl mx-auto">
        <div className="p-8 md:p-12 rounded-3xl bg-card border border-default">
          <h2 className="text-3xl font-bold mb-8 text-amber-600 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((item) => (
              <div key={item.question} className="border-b border-default pb-6 last:border-0 last:pb-0">
                <h3 className="text-xl font-semibold text-primary mb-3">{item.question}</h3>
                <p className="text-secondary leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto mt-10">
        <QuickReportUpsell />
      </section>
    </main>
  );
}
