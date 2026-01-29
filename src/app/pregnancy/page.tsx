import Link from 'next/link';
import { Metadata } from 'next';
import { PaidCTA } from '@/components/PaidCTA';

export const metadata: Metadata = {
  title: 'Pregnancy & Fertility Angel Numbers | Family Guidance',
  description: 'Explore angel numbers connected to pregnancy, fertility, and family. Discover messages of support, timing, and nurturing energy.',
};

const featuredNumbers = [3, 33, 111, 222, 333, 444, 555, 666, 777];

export default function PregnancyIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
          Pregnancy & Fertility
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent">
          Angel Numbers for Pregnancy
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
          These numbers often appear when family, nurturing, or new life is highlighted. Find your number to
          explore guidance around timing, support, and emotional readiness.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            title: 'Divine Timing',
            description: 'Numbers can signal that timing is aligning or that patience is needed.'
          },
          {
            title: 'Nurturing Energy',
            description: 'Repeating 3s or 6s often emphasize care, home, and family focus.'
          },
          {
            title: 'Emotional Support',
            description: 'Messages remind you to create stability and seek support where needed.'
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
          <h2 className="text-3xl font-bold text-amber-500">Pregnancy & Family Numbers</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-zinc-800 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-4">
          {featuredNumbers.map((number) => (
            <Link
              key={number}
              href={`/pregnancy/${number}`}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all text-center group"
            >
              <div className="text-2xl font-bold text-zinc-100 group-hover:text-amber-500 transition-colors">
                {number}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Pregnancy</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-6 text-amber-300 text-center">Supportive Guidance</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>Use these numbers as encouragement to care for your body and mind.</p>
            <p>Focus on stability, nourishment, and emotional safety as you move forward.</p>
            <p>Let the message guide your questions, then trust your intuition.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <PaidCTA
          product="blueprint"
          label="Get Your Personalized PDF ($17)"
          sublabel="Guidance for the number you’re seeing plus your inputs."
        />
      </section>
    </main>
  );
}
