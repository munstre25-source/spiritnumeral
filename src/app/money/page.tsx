import Link from 'next/link';
import { Metadata } from 'next';
import { getClickBankCTA } from '@/lib/utils/clickbank';

export const metadata: Metadata = {
  title: 'Money Angel Numbers | Abundance and Prosperity Signs',
  description: 'Explore angel numbers for money, abundance, and career growth. Discover the message behind the numbers you keep seeing.',
};

const featuredNumbers = [1, 8, 11, 22, 44, 88, 111, 222, 444, 555, 777, 888];

export default function MoneyIndexPage() {
  const cta = getClickBankCTA('money');

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
          Money & Abundance
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent">
          Money Angel Numbers
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
          Money numbers signal opportunities, focus, and abundance. Explore the number you keep seeing to
          understand where to direct your energy for prosperity.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            title: 'Abundance Mindset',
            description: 'Numbers encourage you to believe in possibilities and release scarcity thinking.'
          },
          {
            title: 'Aligned Action',
            description: 'They highlight where practical steps or focused effort will pay off.'
          },
          {
            title: 'Financial Timing',
            description: 'Certain sequences signal favorable timing for growth or investment.'
          }
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <h2 className="text-lg font-semibold text-amber-400 mb-3">{item.title}</h2>
            <p className="text-zinc-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto mb-16">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-amber-500">Popular Money Numbers</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-zinc-800 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {featuredNumbers.map((number) => (
            <Link
              key={number}
              href={`/money/${number}`}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all text-center group"
            >
              <div className="text-2xl font-bold text-zinc-100 group-hover:text-amber-500 transition-colors">
                {number}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Money</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-6 text-amber-300 text-center">Practical Next Steps</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>Choose one financial action: budgeting, a new opportunity, or a skill upgrade.</p>
            <p>Match your action to the number’s theme: stability, growth, or change.</p>
            <p>Track repeating numbers as a reminder to stay consistent.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <a
          href={cta.url}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold hover:from-amber-400 hover:to-yellow-400 transition-all"
        >
          {cta.text}
        </a>
        <p className="text-zinc-500 text-sm mt-4">{cta.secondaryText}</p>
      </section>
    </main>
  );
}
