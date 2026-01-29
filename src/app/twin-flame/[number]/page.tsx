import { getPSEODataAsync, generateAngelNumberTitle, generateAngelNumberDescription } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';
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

  const title = generateAngelNumberTitle(parseInt(number), 'twin-flame');
  const description = generateAngelNumberDescription(parseInt(number), data, 'twin-flame');

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

export default async function TwinFlamePage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number) as any;

  if (!data || !('number' in data)) {
    notFound();
  }

  const faqs = [
    {
      question: `What does ${number} mean for twin flames?`,
      answer: data.twin_flame || data.love || `Angel number ${number} has significant meaning for twin flame connections and spiritual relationships.`
    },
    {
      question: `Is ${number} a sign of twin flame reunion?`,
      answer: `Angel number ${number} ${data.twin_flame ? 'can indicate' : 'may indicate'} important developments in your twin flame journey, including potential reunion signs.`
    },
    {
      question: `What should twin flames do when they see ${number}?`,
      answer: data.what_to_do || `When twin flames see ${number}, it's a sign to focus on inner healing, spiritual growth, and trusting the divine timing of their connection.`
    },
    {
      question: `Does ${number} mean my twin flame is thinking of me?`,
      answer: `Seeing ${number} can be a sign that your twin flame connection is active and that spiritual energies are aligning between you.`
    },
    {
      question: `What does ${number} mean for twin flame separation?`,
      answer: `During twin flame separation, ${number} often appears as a message of hope, healing, and the importance of inner work before reunion.`
    }
  ];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/twin-flame/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
      { name: `${number} Twin Flame Meaning`, url: `${siteUrl}${pagePath}` },
    ],
    title: `Angel Number ${number} Twin Flame Meaning`,
    description: data.twin_flame || data.meaning || `Discover what angel number ${number} means for your twin flame connection.`,
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

      <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4 pt-12">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-4">
              Twin Flame Guidance
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter">
              Angel Number {number} Twin Flame Meaning
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-400/80">
              Angel number {number} meaning for twin flames
            </p>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              Discover what angel number {number} means for your twin flame connection.
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">Twin Flame Significance</h2>
            <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
              {data.twin_flame || data.love || `Angel number ${number} carries special meaning for twin flame connections, indicating spiritual alignment and divine timing in your relationship journey.`}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Twin Flame Connection
              </h2>
              <p className="text-zinc-300 leading-relaxed">{data.twin_flame || `Your twin flame connection is being supported by the universe through this number.`}</p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-amber-500/30">
              <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                Reunion & Timing
              </h2>
              <p className="text-zinc-300 leading-relaxed">{data["2026_prediction"] || `Major developments are unfolding in your twin flame journey.`}</p>
            </div>
          </section>

          <section className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">
              Angel Number {number} Meaning
            </h2>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">{data.meaning}</p>
            {data.love && (
              <div className="mt-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">Love & Relationships</h3>
                <p className="text-zinc-300">{data.love}</p>
              </div>
            )}
          </section>

          <FAQ faqs={faqs} title="Twin Flame Questions About This Number" />

          <InternalLinks number={number} currentPage="twin-flame" />

          <RelatedNumbers currentNumber={parseInt(number)} />

          <NavigationLinks />

          <footer className="pt-8 pb-16 space-y-6">
            <MeaningPaidCTA number={parseInt(number)} />
            <AffiliatePromo offer={OFFERS.affiliate_soulmate_story} context="Soulmate Sketch" />
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
