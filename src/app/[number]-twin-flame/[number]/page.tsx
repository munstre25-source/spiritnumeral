import { getPSEOData, getAllAngelNumberSlugs, generateAngelNumberTitle, generateAngelNumberDescription } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import FAQ from '@/components/FAQ';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const numbers = getAllAngelNumberSlugs();
  return numbers.map((number) => ({
    number: number,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const data = getPSEOData('angel-number', number);
  
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
  const data = getPSEOData('angel-number', number) as any;

  if (!data || !('number' in data)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Angel number not found.
      </div>
    );
  }

  const schemas = generateAllSchemas(data);
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
      
      <main className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4 pt-12">
            <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-4">
              Twin Flame Guidance
            </div>
            <h1 className="text-6xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter">
              {number} Twin Flame Meaning
            </h1>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              Discover what angel number {number} means for your twin flame connection and 2026 reunion predictions
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
                2026 Predictions
              </h2>
              <p className="text-zinc-300 leading-relaxed">{data["2026_prediction"] || `2026 holds significant developments for your twin flame journey.`}</p>
            </div>
          </section>

          <section className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <h2 className="text-2xl font-bold mb-4 text-amber-400">The Core Meaning</h2>
            <p className="text-lg text-zinc-300 leading-relaxed mb-4">{data.meaning}</p>
            {data.love && (
              <div className="mt-4 p-4 rounded-xl bg-zinc-900/30 border border-zinc-800">
                <h3 className="text-lg font-semibold text-amber-400 mb-2">Love & Relationships</h3>
                <p className="text-zinc-300">{data.love}</p>
              </div>
            )}
          </section>

          <FAQ faqs={faqs} title="Twin Flame Questions About This Number" />

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
