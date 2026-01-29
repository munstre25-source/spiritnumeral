import { getPSEODataAsync, generateAngelNumberTitle, generateAngelNumberDescription } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';
import FAQ from '@/components/FAQ';
import { InternalLinks, NavigationLinks, RelatedNumbers } from '@/components/InternalLinks';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number);

  if (!data) {
    return { title: 'Angel Number Not Found' };
  }

  const title = generateAngelNumberTitle(parseInt(number), 'why-seeing');
  const description = generateAngelNumberDescription(parseInt(number), data, 'why-seeing');

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function WhyAmISeeingPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number) as any;

  if (!data || !('number' in data)) {
    notFound();
  }

  const faqs = [
    {
      question: `Why do I keep seeing ${number}?`,
      answer: data.why_seeing || `Angel number ${number} appears when your angels want to send you a specific message about your current life path and spiritual journey.`
    },
    {
      question: `What should I do when I see ${number}?`,
      answer: data.what_to_do || `When you see ${number}, take a moment to reflect on your thoughts and intentions. Your angels are guiding you.`
    },
    {
      question: `Is ${number} a good sign?`,
      answer: `Yes! Angel number ${number} is a positive message from your angels. ${data.meaning}`
    },
    {
      question: `What does ${number} mean for my relationships?`,
      answer: data.love || `Angel number ${number} has significant meaning for your love life and relationships.`
    },
    {
      question: `How often do people see ${number}?`,
      answer: `Many people report seeing angel number ${number} during times of spiritual growth and life transitions. You're not alone in this experience.`
    }
  ];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/why-am-i-seeing/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
      { name: `Why am I seeing ${number}?`, url: `${siteUrl}${pagePath}` },
    ],
    title: `Why Do I Keep Seeing ${number}? Meaning & Message`,
    description: data.why_seeing || data.meaning || `Discover why angel number ${number} keeps appearing and what it means for you.`,
    faqOverride: faqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
      />

      <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-48 p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-4">
              Why Am I Seeing This Number?
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter">
              Why Do I Keep Seeing {number}? Meaning & Message
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-400/80">
              Angel number {number} meaning at a glance
            </p>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              {data.why_seeing || `You're seeing ${number} because your angels are trying to communicate with you.`}
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
              Angel Number {number} Meaning
            </h2>
            <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
              {data.meaning}
            </p>

            {data.misconception && (
              <div className="mt-6 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-xl font-semibold text-amber-400 mb-3">Important to Know</h3>
                <p className="text-zinc-300 leading-relaxed">{data.misconception}</p>
              </div>
            )}
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                What You Should Do
              </h2>
              <p className="text-zinc-300 leading-relaxed">{data.what_to_do || `When you see ${number}, take it as a sign to focus on your spiritual growth and trust the process.`}</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Love & Relationships
              </h2>
              <p className="text-zinc-300 leading-relaxed">{data.love || `Angel number ${number} has special significance for your love life and relationships.`}</p>
            </div>
          </section>

          <FAQ faqs={faqs} title="Common Questions About Seeing This Number" />

          <InternalLinks number={number} currentPage="why-seeing" />

          <RelatedNumbers currentNumber={parseInt(number)} />

          <NavigationLinks />

          <footer className="pt-8 pb-16 space-y-6">
            <MeaningPaidCTA number={parseInt(number)} />
            <a
              href={`/meaning/angel-number/${number}`}
              className="block text-center text-amber-500 hover:text-amber-400 transition-colors"
            >
              ← Full Angel Number {number} Meaning
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
