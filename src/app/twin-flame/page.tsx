import Link from 'next/link';
import { Metadata } from 'next';
import { getClickBankCTA } from '@/lib/utils/clickbank';

export const metadata: Metadata = {
  title: 'Twin Flame Angel Numbers | Signs, Stages, and Meaning',
  description: 'Explore twin flame angel numbers and what they reveal about connection, separation, and reunion. Find the number you keep seeing and get guidance.',
};

const featuredNumbers = [111, 222, 333, 444, 555, 777, 888, 999];

export default function TwinFlameIndexPage() {
  const cta = getClickBankCTA('twin-flame');

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
          Twin Flame Guidance
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent">
          Twin Flame Angel Numbers
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
          Twin flame numbers highlight connection, growth, and divine timing. Explore the meaning behind the
          numbers you keep seeing and how they relate to reunion, separation, and alignment.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            title: 'Connection Signals',
            description: 'Repeating numbers confirm recognition, energetic alignment, and soul-level awareness.'
          },
          {
            title: 'Separation Lessons',
            description: 'Numbers often appear during separation to emphasize healing, inner work, and patience.'
          },
          {
            title: 'Reunion Timing',
            description: 'Sequences like 111 or 222 can indicate progress toward reunion and mutual growth.'
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
          <h2 className="text-3xl font-bold text-amber-500">Popular Twin Flame Numbers</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-zinc-800 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {featuredNumbers.map((number) => (
            <Link
              key={number}
              href={`/twin-flame/${number}`}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all text-center group"
            >
              <div className="text-2xl font-bold text-zinc-100 group-hover:text-amber-500 transition-colors">
                {number}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Twin Flame</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-6 text-amber-300 text-center">How to Use Twin Flame Numbers</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>Notice the exact number pattern, then open its detailed page for tailored guidance.</p>
            <p>Track where you saw it and what you were thinking. Patterns reveal the lesson.</p>
            <p>Use the guidance as a prompt for inner work, not a guarantee of outcomes.</p>
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
