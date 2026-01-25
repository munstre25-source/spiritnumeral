import { getPSEOData, getAllPSEOSlugs } from '@/lib/utils/pseo';
import { generateAllSchemas, generateDefaultFAQs } from '@/lib/utils/schema';
import { getClickBankCTA } from '@/lib/utils/clickbank';
import FAQ from '@/components/FAQ';
import { Metadata } from 'next';

export async function generateStaticParams() {
  return getAllPSEOSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const data: any = getPSEOData(category, slug.replace('life-path-', ''));
  
  if (!data) return { title: 'Meaning Not Found' };

  const isLifePath = category === 'life-path';
  const title = isLifePath 
    ? `${data.title || `Life Path ${data.path}`} Meaning: Personalized Predictions for Love & Career`
    : `Angel Number ${data.number} Meaning: Personalized Predictions for Love & Career`;
  
  const description = isLifePath
    ? `Discover the hidden spiritual meaning of ${data.title || `Life Path ${data.path}`}. ${data.traits || ''} Learn how it affects your relationships and career path.`
    : `Discover the hidden spiritual meaning of angel number ${data.number}. ${data.meaning || ''} Learn how it affects your twin flame union and career path.`;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/meaning/${category}/${slug}`;
  const breadcrumbTrail = [
    { name: 'Home', url: siteUrl },
    { name: isLifePath ? 'Life Paths' : 'Angel Numbers', url: `${siteUrl}/meaning/${category}` },
    { name: isLifePath ? (data.title || `Life Path ${data.path}`) : `Angel Number ${data.number}`, url: `${siteUrl}${pagePath}` },
  ];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
    alternates: {
      canonical: `${siteUrl}${pagePath}`,
    },
  };
}

export default async function PSEOPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const data: any = getPSEOData(category, slug.replace('life-path-', ''));

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Meaning not found.
      </div>
    );
  }

  const isLifePath = category === 'life-path';
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/meaning/${category}/${slug}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: isLifePath ? 'Life Paths' : 'Angel Numbers', url: `${siteUrl}/meaning/${category}` },
      { name: isLifePath ? (data.title || `Life Path ${data.path}`) : `Angel Number ${data.number}`, url: `${siteUrl}${pagePath}` },
    ],
    title: isLifePath 
      ? `${data.title || `Life Path ${data.path}`} Meaning: Personalized Predictions for Love & Career`
      : `Angel Number ${data.number} Meaning: Personalized Predictions for Love & Career`,
    description: isLifePath
      ? `Discover the hidden spiritual meaning of ${data.title || `Life Path ${data.path}`}. ${data.traits || ''} Learn how it affects your relationships and career path.`
      : `Discover the hidden spiritual meaning of angel number ${data.number}. ${data.meaning || ''} Learn how it affects your twin flame union and career path.`,
    faqOverride: faqs,
  });

  // Determine ClickBank category
  const clickbankCategory = isLifePath ? 'life-path' : 'numerology';
  const cta = getClickBankCTA(clickbankCategory);

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
      
      <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-48 px-6 md:p-8 font-sans">
        <div className="max-w-3xl mx-auto space-y-12">
          <header className="text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-4">
              {isLifePath ? 'Life Path Wisdom' : 'Angel Number Guidance'}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter leading-tight">
              {data.number || data.title || `Life Path ${data.path}`}
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
              {data.meaning || data.traits}
            </p>
          </header>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                {isLifePath ? 'Love & Relationships' : 'Love & Twin Flame'}
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">{data.love || data.twin_flame || 'Your relationships are evolving.'}</p>
            </div>
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Career & Purpose
              </h2>
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">{data.career || 'Your career path is aligning with your purpose.'}</p>
            </div>
          </section>

          <section className="p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight">Your Spiritual Forecast</h2>
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
              {data["2026_prediction"] || data["2026_outlook"] || 'Significant spiritual developments are on your horizon.'}
            </p>
            {!isLifePath && data.lucky_color && (
              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                <span className="px-3 py-1 rounded-lg bg-zinc-800">Lucky Color: {data.lucky_color}</span>
                <span className="px-3 py-1 rounded-lg bg-zinc-800">Active Chakra: {data.chakra}</span>
              </div>
            )}
          </section>

          <FAQ faqs={faqs} />

          <footer className="pt-8 pb-16">
            <a
              href={cta.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="group relative overflow-hidden bg-amber-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
              <div className="bg-zinc-950 text-amber-500 py-6 rounded-xl font-bold text-xl md:text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-black">
                {cta.text}
              </div>
            </a>
            <p className="text-center text-zinc-500 text-sm mt-6 px-4">
              Trusted by seekers on their spiritual journey.
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}
