import { getPSEODataAsync, generateAngelNumberTitle, generateAngelNumberDescription } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';
import { QuickReportUpsell } from '@/components/QuickReportUpsell';
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

export default async function IsWarningPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number) as any;

  if (!data || !('number' in data)) {
    notFound();
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
  const pagePath = `/warning/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
      { name: `${number} Warning Meaning`, url: `${siteUrl}${pagePath}` },
    ],
    title: `Is Angel Number ${number} a Warning? Meaning`,
    description: data.misconception || data.meaning || `Understand what angel number ${number} means and why it is not a warning.`,
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

      <main className="min-h-screen bg-page text-primary pt-32 md:pt-48 p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-4">
              Understanding Angel Numbers
            </div>
            <h1 className="text-6xl font-bold text-primary font-bold tracking-tighter">
              Is Angel Number {number} a Warning?
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-600/80">
              Angel number {number} meaning explained
            </p>
            <p className="text-2xl text-secondary font-light max-w-2xl mx-auto leading-relaxed">
              {isActuallyWarning
                ? `No, ${number} is not a warning. Here's what it really means...`
                : `No, angel number ${number} is not a warning. It's a positive message from your angels.`
              }
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-card border border-default">
            <div className="mb-6 p-6 rounded-xl bg-green-500/10 border border-green-500/20">
              <h2 className="text-2xl font-bold mb-3 text-green-400">✓ Not a Warning - Here's Why</h2>
              <p className="text-lg text-secondary leading-relaxed">
                {data.misconception || `Angel number ${number} is always a positive message from your angels. They never send warnings through numbers - only guidance, support, and love.`}
              </p>
            </div>

            <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">
              Angel Number {number} Meaning
            </h2>
            <p className="text-xl text-secondary leading-relaxed font-light mb-6">
              {data.meaning}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-600 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                What It Really Means
              </h2>
              <p className="text-secondary leading-relaxed">{data.meaning}</p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-600 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                What You Should Do
              </h2>
              <p className="text-secondary leading-relaxed">{data.what_to_do || `Trust that this is a positive sign and follow the guidance it provides.`}</p>
            </div>
          </section>

          <FAQ faqs={faqs} title="Common Questions About This Number" />

          <InternalLinks number={number} currentPage="warning" />

          <RelatedNumbers currentNumber={parseInt(number)} />

          <NavigationLinks />

          <footer className="pt-8 pb-16 space-y-6">
            <MeaningPaidCTA number={parseInt(number)} />
            <QuickReportUpsell prefillNumber={parseInt(number)} />
            <a
              href={`/meaning/angel-number/${number}`}
              className="block text-center text-amber-500 hover:text-amber-600 transition-colors"
            >
              ← Full Angel Number {number} Meaning
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
