import { getPSEODataAsync } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { getClickBankCTA } from '@/lib/utils/clickbank';
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

  const title = `Angel Number ${number} Manifestation: Law of Attraction & Manifesting in 2026`;
  const description = `How to use angel number ${number} for manifestation. Discover the law of attraction meaning and powerful manifesting techniques with ${number}.`;

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

export default async function ManifestationPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number) as any;

  if (!data || !('number' in data)) {
    notFound();
  }

  const faqs = [
    {
      question: `Is ${number} a manifestation number?`,
      answer: `Yes, angel number ${number} is a powerful manifestation number. When you see it, your manifesting abilities are heightened.`
    },
    {
      question: `How do I use ${number} for manifestation?`,
      answer: `When you see ${number}, focus on your desires with clarity and positive emotion. Visualize your goals as already achieved and maintain gratitude.`
    },
    {
      question: `What should I manifest when I see ${number}?`,
      answer: `When ${number} appears, manifest goals aligned with your highest good. Focus on love, abundance, health, and spiritual growth.`
    },
    {
      question: `Does ${number} mean my manifestation is working?`,
      answer: `Seeing ${number} is often a sign that your manifestations are aligning. The universe is confirming you're on the right path.`
    },
    {
      question: `How does ${number} relate to the law of attraction?`,
      answer: `Angel number ${number} amplifies law of attraction energy. Your thoughts and vibrations are especially powerful when this number appears.`
    },
    {
      question: `What affirmations work best with ${number}?`,
      answer: `Try: "I am aligned with the energy of ${number}. My desires manifest with ease and divine timing. I attract abundance in all forms."`
    }
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/manifestation/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
      { name: `${number} Manifestation`, url: `${siteUrl}${pagePath}` },
    ],
    title: `Angel Number ${number} Manifestation`,
    description: `Learn how to manifest with angel number ${number}.`,
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
            <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
              Manifestation & Law of Attraction
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-violet-200 to-violet-500 bg-clip-text text-transparent tracking-tighter">
              Angel Number {number} Manifestation
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-violet-400/80">
              Law of Attraction & Manifesting Power
            </p>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              Harness the manifesting power of angel number {number} to attract your desires into reality.
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-violet-950/40 via-zinc-900/50 to-zinc-900 border border-violet-500/20 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
              Manifesting with Angel Number {number}
            </h2>
            <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
              Angel number {number} is a powerful manifestation sign. When this number appears, your ability to attract your desires is amplified. The universe is listening to your thoughts and intentions with heightened attention.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {data.meaning}
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-violet-500/30">
              <h2 className="text-violet-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                Visualization Technique
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                When you see {number}, close your eyes and visualize your desire as already achieved. Feel the emotions of having what you want. Hold this vision for at least 68 seconds.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-violet-500/30">
              <h2 className="text-violet-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                Gratitude Practice
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Angel number {number} amplifies gratitude. Write down {number.charAt(0)} things you're grateful for. This raises your vibration and accelerates manifestation.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-violet-500/30">
              <h2 className="text-violet-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                Scripting Method
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Write your desires in present tense as if they've already happened. Include the number {number} in your script: "I am so grateful that {number} led me to..."
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-violet-500/30">
              <h2 className="text-violet-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                {number} Affirmation
              </h2>
              <p className="text-zinc-300 leading-relaxed italic">
                "I am a powerful manifestor. Angel number {number} confirms my alignment with abundance. My desires flow to me effortlessly."
              </p>
            </div>
          </section>

          <section className="p-8 rounded-3xl bg-gradient-to-r from-violet-900/20 to-pink-900/20 border border-violet-500/30">
            <h2 className="text-2xl font-bold mb-4 text-violet-400">What to Manifest with {number}</h2>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✦</span>
                <span><strong>Love:</strong> {data.love || `Use ${number} to manifest your ideal relationship.`}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✦</span>
                <span><strong>Career:</strong> {data.career || `Manifest professional success and abundance.`}</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✦</span>
                <span><strong>Spiritual Growth:</strong> Manifest deeper spiritual connection and enlightenment.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-violet-400 mt-1">✦</span>
                <span><strong>Twin Flame:</strong> {data.twin_flame || `Manifest your twin flame reunion.`}</span>
              </li>
            </ul>
          </section>

          <FAQ faqs={faqs} title="Manifestation Questions" />

          <InternalLinks number={number} currentPage="manifestation" />

          <RelatedNumbers currentNumber={parseInt(number)} />

          <NavigationLinks />

          {(() => {
            const cta = getClickBankCTA('manifestation');
            return (
              <footer className="pt-8 pb-16 space-y-6">
                <a
                  href={cta.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group relative overflow-hidden bg-violet-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                  <div className="bg-zinc-950 text-violet-500 py-6 rounded-xl font-bold text-xl md:text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-white">
                    {cta.text}
                  </div>
                </a>
                <p className="text-center text-zinc-500 text-sm">{cta.secondaryText}</p>
                <a
                  href={`/meaning/angel-number/${number}`}
                  className="block text-center text-amber-500 hover:text-amber-400 transition-colors"
                >
                  ← Full Angel Number {number} Meaning
                </a>
              </footer>
            );
          })()}
        </div>
      </main>
    </>
  );
}
