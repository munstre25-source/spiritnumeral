import { getPSEODataAsync } from '@/lib/utils/pseo';
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

  const title = `Angel Number ${number} Love Meaning: Relationships & Romance in 2026`;
  const description = `What does angel number ${number} mean for love? Discover the romantic meaning, relationship guidance, and how it affects your love life.`;

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

export default async function LoveMeaningPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number) as any;

  if (!data || !('number' in data)) {
    notFound();
  }

  const faqs = [
    {
      question: `What does ${number} mean for love?`,
      answer: data.love || `Angel number ${number} brings powerful energy to your love life, signaling growth and transformation in relationships.`
    },
    {
      question: `Is ${number} a sign of finding love?`,
      answer: `Yes, seeing angel number ${number} can indicate that love is on the horizon. Your angels are guiding you toward meaningful romantic connections.`
    },
    {
      question: `What does ${number} mean for singles?`,
      answer: `For singles, angel number ${number} suggests being open to new romantic opportunities. Your angels encourage self-love and readiness for a new relationship.`
    },
    {
      question: `How does ${number} affect existing relationships?`,
      answer: `In existing relationships, ${number} encourages deeper communication, trust, and emotional intimacy. It's a sign to nurture your connection.`
    },
    {
      question: `Is ${number} a twin flame number for love?`,
      answer: data.twin_flame || `Angel number ${number} has significance for twin flame connections, often appearing when spiritual bonds are strengthening.`
    },
    {
      question: `What should I do when I see ${number} in love matters?`,
      answer: `When ${number} appears in love contexts, take it as a sign to follow your heart, communicate openly, and trust the divine timing of your romantic journey.`
    }
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/angel-number-love/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
      { name: `${number} Love Meaning`, url: `${siteUrl}${pagePath}` },
    ],
    title: `Angel Number ${number} Love Meaning`,
    description: data.love || `Discover what angel number ${number} means for love and relationships.`,
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
            <div className="inline-block px-4 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-4">
              Love & Relationships
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-pink-200 to-pink-500 bg-clip-text text-transparent tracking-tighter">
              Angel Number {number} Love Meaning
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-pink-400/80">
              Romance & Relationship Guidance
            </p>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              {data.love || `Discover what angel number ${number} reveals about your love life and romantic destiny.`}
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-pink-950/40 via-zinc-900/50 to-zinc-900 border border-pink-500/20 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
              What Does {number} Mean for Love?
            </h2>
            <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
              {data.love || `Angel number ${number} carries a profound message about your romantic life. When this number appears, your guardian angels are communicating about matters of the heart.`}
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {data.meaning}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-pink-500/30">
              <h2 className="text-pink-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                For Singles
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                If you're single and seeing {number}, your angels are preparing you for a significant romantic encounter. Focus on self-love and remain open to unexpected connections.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-pink-500/30">
              <h2 className="text-pink-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                In Relationships
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                For those in relationships, {number} signals a time to deepen your bond. Communicate openly with your partner and trust in the growth of your connection.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-pink-500/30">
              <h2 className="text-pink-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Twin Flame Connection
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                {data.twin_flame || `Angel number ${number} often appears during twin flame journeys, signaling important developments in your spiritual connection.`}
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-pink-500/30">
              <h2 className="text-pink-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                Love Affirmation
              </h2>
              <p className="text-zinc-300 leading-relaxed italic">
                "I am worthy of deep, meaningful love. Angel number {number} guides me toward my highest romantic destiny."
              </p>
            </div>
          </section>

          <FAQ faqs={faqs} title="Love & Relationship Questions" />

          <InternalLinks number={number} currentPage="love" />

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
