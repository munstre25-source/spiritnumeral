import { getPSEODataAsync } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { InternalLinks, NavigationLinks, RelatedNumbers } from '@/components/InternalLinks';
import { getIndexingPolicy } from '@/lib/seo/indexing-policy';
import { getStaticParamsForRoute } from '@/lib/seo/static-params';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';

export const revalidate = 86400;

export async function generateStaticParams() {
  return getStaticParamsForRoute('career');
}

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number);

  if (!data) {
    return { title: 'Angel Number Not Found' };
  }

  const title = `${number} Career Meaning: Angel Number for Work & Success`;
  const description = `What does ${number} mean for career? Angel number guidance for work, money and success.`;
  const siteUrl = getSiteBaseUrl();
  const pagePath = `/angel-number-career/${number}`;
  const indexingPolicy = getIndexingPolicy(pagePath);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: ensureAbsoluteUrl(siteUrl, pagePath),
    },
    alternates: {
      canonical: ensureAbsoluteUrl(siteUrl, indexingPolicy.canonicalPath),
    },
    robots: indexingPolicy.robots,
  };
}

export default async function CareerMeaningPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number) as any;

  if (!data || !('number' in data)) {
    notFound();
  }

  const faqs = [
    {
      question: `What does ${number} mean for my career?`,
      answer: data.career || `Angel number ${number} brings guidance for your professional life, encouraging you to pursue your true calling.`
    },
    {
      question: `Is ${number} a sign of career change?`,
      answer: `Seeing ${number} can indicate that your angels support positive career transitions. Trust your intuition about professional opportunities.`
    },
    {
      question: `What does ${number} mean for money and finances?`,
      answer: `Angel number ${number} suggests abundance is aligning with your path. Focus on positive financial habits and trust in divine provision.`
    },
    {
      question: `Should I take a new job if I keep seeing ${number}?`,
      answer: `When ${number} appears frequently, consider it encouragement to pursue opportunities that align with your purpose. Evaluate if the new role serves your growth.`
    },
    {
      question: `Does ${number} mean success is coming?`,
      answer: `Yes, ${number} often signals that success is within reach. Your hard work is being acknowledged by the universe.`
    },
    {
      question: `How does ${number} affect business decisions?`,
      answer: `Angel number ${number} encourages wise business decisions based on both intuition and practical analysis. Your angels are guiding your entrepreneurial path.`
    }
  ];

  const siteUrl = getSiteBaseUrl();
  const pagePath = `/angel-number-career/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: ensureAbsoluteUrl(siteUrl, '/meaning/angel-number') },
      { name: `${number} Career Meaning`, url: ensureAbsoluteUrl(siteUrl, pagePath) },
    ],
    title: `Angel Number ${number} Career Meaning`,
    description: data.career || `Discover what angel number ${number} means for your career and finances.`,
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
            <div className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
              Career & Finance
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-primary font-bold tracking-tighter">
              Angel Number {number} Career Meaning
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-400/80">
              Work, Money & Professional Guidance
            </p>
            <p className="text-2xl text-secondary font-light max-w-2xl mx-auto leading-relaxed">
              {data.career || `Discover how angel number ${number} guides your professional journey and financial prosperity.`}
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-card border border-default">
            <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">
              What Does {number} Mean for Your Career?
            </h2>
            <p className="text-xl text-secondary leading-relaxed font-light mb-6">
              {data.career || `Angel number ${number} carries important messages about your professional life. When this number appears, your guardian angels are guiding your career path.`}
            </p>
            <p className="text-lg text-secondary leading-relaxed">
              {data.meaning}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-emerald-500/30">
              <h2 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Career Growth
              </h2>
              <p className="text-secondary leading-relaxed">
                Angel number {number} signals a period of professional advancement. Trust that your skills and dedication are being recognized by the universe.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-emerald-500/30">
              <h2 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Financial Abundance
              </h2>
              <p className="text-secondary leading-relaxed">
                When {number} appears in financial contexts, it suggests positive money flow is aligning with your path. Stay focused on abundance mindset.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-emerald-500/30">
              <h2 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Business Opportunities
              </h2>
              <p className="text-secondary leading-relaxed">
                {number} encourages you to pursue entrepreneurial ventures with confidence. Your angels support new business ideas aligned with your purpose.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-emerald-500/30">
              <h2 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Success Affirmation
              </h2>
              <p className="text-secondary leading-relaxed italic">
                "I am aligned with professional success and financial abundance. Angel number {number} guides me to my highest career potential."
              </p>
            </div>
          </section>

          <section className="p-8 rounded-3xl bg-card border border-default">
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">2026 Career Prediction</h2>
            <p className="text-secondary leading-relaxed">
              {data["2026_prediction"] || `In 2026, angel number ${number} suggests significant career developments. Be prepared for opportunities that align with your life purpose.`}
            </p>
          </section>

          <div className="mt-8">
            <PsychicPromo
              contextualLine="For clarity on your career and money path, a short psychic reading can offer guidance."
              label="Psychic After Content"
            />
          </div>

          <FAQ faqs={faqs} title="Career & Finance Questions" />

          <InternalLinks number={number} currentPage="career" />

          <RelatedNumbers currentNumber={parseInt(number)} />

          <NavigationLinks />

          <footer className="pt-8 pb-16 space-y-6">
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
