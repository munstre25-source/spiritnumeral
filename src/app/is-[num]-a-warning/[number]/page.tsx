import { getPSEOData, getAllAngelNumberSlugs, generateAngelNumberTitle, generateAngelNumberDescription } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import FAQ from '@/components/FAQ';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const numbers = getAllAngelNumberSlugs();
  return numbers.map((number) => ({
    num: number,
    number: number,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ num: string; number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const data = getPSEOData('angel-number', number);
  
  if (!data) {
    return { title: 'Angel Number Not Found' };
  }

  const title = generateAngelNumberTitle(parseInt(number), 'warning');
  const description = generateAngelNumberDescription(parseInt(number), data, 'warning');

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

export default async function IsWarningPage({ params }: { params: Promise<{ num: string; number: string }> }) {
  const { number } = await params;
  const data = getPSEOData('angel-number', number) as any;

  if (!data || !('number' in data)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Angel number not found.
      </div>
    );
  }

  const isActuallyWarning = parseInt(number) === 666; // Only 666 might be perceived as warning
  
  const faqs = [
    {
      question: `Is ${number} a warning sign?`,
      answer: isActuallyWarning 
        ? `Angel number ${number} is often misunderstood. ${data.misconception || data.meaning} It's not a warning of danger, but rather a message about rebalancing your life.`
        : `No, angel number ${number} is not a warning sign. ${data.misconception || `It's a positive message from your angels: ${data.meaning}`}`
    },
    {
      question: `What does ${number} really mean?`,
      answer: data.meaning || `Angel number ${number} carries a unique spiritual message from your angels about your current life path.`
    },
    {
      question: `Should I be worried about seeing ${number}?`,
      answer: `No, you should not be worried. Angel numbers are always messages of guidance and support from your angels, never warnings of danger.`
    },
    {
      question: `What should I do when I see ${number}?`,
      answer: data.what_to_do || `When you see ${number}, take it as a positive sign and follow the guidance it provides.`
    },
    {
      question: `Is ${number} good or bad?`,
      answer: `Angel number ${number} is always a positive message. Your angels only send loving, supportive guidance through these numbers.`
    }
  ];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/is-${number}-a-warning/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
      { name: `${number} Warning Meaning`, url: `${siteUrl}${pagePath}` },
    ],
    title: `Is ${number} a Warning? True Angel Number Meaning`,
    description: data.meaning || `Understand why angel number ${number} is not a warning and what it really means.`,
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
              Understanding Angel Numbers
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter">
              Is {number} a Warning?
            </h1>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              {isActuallyWarning 
                ? `No, ${number} is not a warning. Here's what it really means...`
                : `No, angel number ${number} is not a warning. It's a positive message from your angels.`
              }
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20 shadow-2xl">
            <div className="mb-6 p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h2 className="text-2xl font-bold mb-3 text-green-400">✓ Not a Warning - Here's Why</h2>
              <p className="text-lg text-zinc-300 leading-relaxed">
                {data.misconception || `Angel number ${number} is always a positive message from your angels. They never send warnings through numbers - only guidance, support, and love.`}
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">The True Meaning</h2>
            <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
              {data.meaning}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                What It Really Means
              </h2>
              <p className="text-zinc-300 leading-relaxed">{data.meaning}</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                What You Should Do
              </h2>
              <p className="text-zinc-300 leading-relaxed">{data.what_to_do || `Trust that this is a positive sign and follow the guidance it provides.`}</p>
            </div>
          </section>

          <FAQ faqs={faqs} title="Common Questions About This Number" />

          <footer className="pt-8 pb-16">
            <div className="group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              <a
                href={`/meaning/angel-number/${number}`}
                className="block w-full bg-zinc-950 text-amber-500 py-6 rounded-xl font-bold text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-black"
              >
                Read Full Meaning of {number} →
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
