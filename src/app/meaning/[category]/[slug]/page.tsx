import { getPSEODataAsync, getAllPSEOSlugs } from '@/lib/utils/pseo';
import { generateAllSchemas, generateDefaultFAQs } from '@/lib/utils/schema';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { InternalLinks, NavigationLinks, RelatedNumbers, ContextualLinks } from '@/components/InternalLinks';
import { Breadcrumbs, QuickActions, RecommendedNumbers } from '@/components/UXEnhancements';
import { ViewTracker } from '@/components/ViewTracker';
import { AudioReaderCompact } from '@/components/AudioReader';
import { PrintReading } from '@/components/PrintReading';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getIndexingPolicy } from '@/lib/seo/indexing-policy';
import { getStaticParamsForRoute, isPathStaticAllowlisted } from '@/lib/seo/static-params';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';

export const dynamicParams = false;
export const revalidate = false;

export async function generateStaticParams() {
  const lifePathParams = getAllPSEOSlugs().filter(({ category, slug }) =>
    isPathStaticAllowlisted(`/meaning/${category}/${slug}`)
  );
  const meaningParams = getStaticParamsForRoute('meaning').map(({ number }) => ({
    category: 'angel-number',
    slug: number,
  }));

  return [...lifePathParams, ...meaningParams];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const data: any = await getPSEODataAsync(category, slug.replace('life-path-', ''));

  if (!data) return { title: 'Meaning Not Found' };

  const isLifePath = category === 'life-path';
  const subject = isLifePath ? (data.title || `Life Path ${data.path}`) : `Angel Number ${data.number}`;
  const title = isLifePath
    ? `${subject} Meaning: Personality, Love & Career`
    : `${data.number} Meaning: Angel Number Love, Career & Twin Flame`;

  const description = isLifePath
    ? `Discover ${subject} meaning: personality, love, career. ${(data.traits || '').slice(0, 120)}`
    : `Angel number ${data.number} meaning: love, career, twin flame. ${(data.meaning || '').slice(0, 100)}`;

  const siteUrl = getSiteBaseUrl();
  const pagePath = `/meaning/${category}/${slug}`;
  const indexingPolicy = getIndexingPolicy(pagePath);
  const breadcrumbTrail = [
    { name: 'Home', url: siteUrl },
    { name: isLifePath ? 'Life Paths' : 'Angel Numbers', url: ensureAbsoluteUrl(siteUrl, `/meaning/${category}`) },
    { name: isLifePath ? (data.title || `Life Path ${data.path}`) : `Angel Number ${data.number}`, url: ensureAbsoluteUrl(siteUrl, pagePath) },
  ];

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

export default async function PSEOPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const data: any = await getPSEODataAsync(category, slug.replace('life-path-', ''));

  if (!data) {
    notFound();
  }

  const isLifePath = category === 'life-path';
  const subject = isLifePath ? (data.title || `Life Path ${data.path}`) : `Angel Number ${data.number}`;
  const h1Text = `${subject} Meaning`;
  const faqs = isLifePath
    ? [
      {
        question: `What does Life Path ${data.path} mean?`,
        answer: `${data.traits} ${data.title} represents ${data.traits.toLowerCase()}.`
      },
      {
        question: `What is Life Path ${data.path} in love?`,
        answer: data.love || `Life Path ${data.path} individuals ${data.traits.toLowerCase()} in relationships.`
      },
      {
        question: `What careers suit Life Path ${data.path}?`,
        answer: data.career || `Life Path ${data.path} individuals excel in careers that align with their natural traits.`
      },
      {
        question: `What are the challenges for Life Path ${data.path}?`,
        answer: data.challenge || `Life Path ${data.path} individuals may face challenges related to ${data.traits.toLowerCase()}.`
      },
      {
        question: `What does the future hold for Life Path ${data.path}?`,
        answer: data["2026_outlook"] || `The future brings significant opportunities for Life Path ${data.path} individuals.`
      }
    ]
    : generateDefaultFAQs(data);
  const siteUrl = getSiteBaseUrl();
  const pagePath = `/meaning/${category}/${slug}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: isLifePath ? 'Life Paths' : 'Angel Numbers', url: ensureAbsoluteUrl(siteUrl, `/meaning/${category}`) },
      { name: isLifePath ? (data.title || `Life Path ${data.path}`) : `Angel Number ${data.number}`, url: ensureAbsoluteUrl(siteUrl, pagePath) },
    ],
    title: isLifePath
      ? `${subject} Meaning: Personality, Love & Career Insights`
      : `${subject} Meaning: Love, Twin Flame & Career`,
    description: isLifePath
      ? `Discover the meaning of ${subject} for personality, love, and career. ${data.traits || ''}`
      : `Discover the meaning of ${subject} for love, twin flame, and career. ${data.meaning || ''}`,
    faqOverride: faqs,
  });

  return (
    <>
      {schemas && (
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
        </>
      )}

      <main className="min-h-screen bg-page text-primary pt-32 md:pt-48 px-6 md:p-8 font-sans">
        <div className="max-w-3xl mx-auto space-y-12">
          <Breadcrumbs
            items={[
              { label: isLifePath ? 'Life Paths' : 'Angel Numbers', href: `/meaning/${category}` },
              { label: isLifePath ? (data.title || `Life Path ${data.path}`) : `Angel Number ${data.number}` }
            ]}
          />

          <header className="text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm font-medium mb-4">
              {isLifePath ? 'Life Path' : 'Angel Number'}
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary tracking-tight leading-tight">
              {h1Text}
            </h1>
            <p className="text-lg md:text-xl text-secondary max-w-xl mx-auto leading-relaxed">
              {data.meaning || data.traits}
            </p>
            {/* Audio Reader for accessibility */}
            <div className="pt-2">
              <AudioReaderCompact text={`${h1Text}. ${data.meaning || data.traits}`} />
            </div>
          </header>

          {/* Quick Actions */}
          {!isLifePath && (
            <>
              <ViewTracker number={data.number} />
              <div className="flex flex-wrap items-center justify-center gap-3">
                <QuickActions number={data.number} />
                <PrintReading
                  number={data.number}
                  meaning={data.meaning || ''}
                  love={data.love}
                  career={data.career}
                  twinFlame={data.twin_flame}
                  luckyColor={data.lucky_color}
                  chakra={data.chakra}
                />
              </div>
            </>
          )}

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-default">
              <h2 className="text-amber-600 font-bold text-lg mb-4">{isLifePath ? 'Love & Relationships' : 'Love & Twin Flame'}</h2>
              <p className="text-secondary leading-relaxed text-sm md:text-base">{data.love || data.twin_flame || 'Your relationships are evolving.'}</p>
            </div>
            <div className="p-6 md:p-8 rounded-2xl bg-card border border-default">
              <h2 className="text-amber-600 font-bold text-lg mb-4">Career & Purpose</h2>
              <p className="text-secondary leading-relaxed text-sm md:text-base">{data.career || 'Your career path is aligning with your purpose.'}</p>
            </div>
          </section>

          <section className="p-8 md:p-10 rounded-2xl bg-card border border-default">
            <h2 className="text-2xl font-serif font-bold text-primary mb-6">Your Spiritual Forecast</h2>
            <p className="text-secondary leading-relaxed">
              {data["2026_prediction"] || data["2026_outlook"] || 'Significant spiritual developments are on your horizon.'}
            </p>
            {!isLifePath && data.lucky_color && (
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="px-3 py-1 rounded-lg bg-elevated">Lucky Color: {data.lucky_color}</span>
                <span className="px-3 py-1 rounded-lg bg-elevated">Chakra: {data.chakra}</span>
              </div>
            )}
          </section>

          <div className="mt-8">
            <PsychicPromo label="Psychic After Content" />
          </div>

          <FAQ faqs={faqs} />

          {!isLifePath && (
            <>
              <InternalLinks number={data.number} currentPage="meaning" />
              <RecommendedNumbers currentNumber={data.number} />
              <RelatedNumbers currentNumber={data.number} />
              <ContextualLinks currentNumber={data.number} />
            </>
          )}

          <NavigationLinks />

          <footer className="pt-8 pb-16">
            <p className="text-center text-muted text-sm mt-6 px-4">
              Trusted by seekers on their spiritual journey.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
