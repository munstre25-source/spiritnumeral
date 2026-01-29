import Link from 'next/link';
import { Metadata } from 'next';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';

export const metadata: Metadata = {
  title: 'Angel Number Warnings | Signs, Alerts, and Guidance',
  description: 'Understand angel number warning signs and what they mean for your life path. Explore alert numbers and take the next right step.',
};

const featuredNumbers = [111, 222, 333, 444, 555, 666, 777, 888, 999];

export default function WarningIndexPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-28 md:pt-36 pb-20 px-6 md:px-10">
      <section className="max-w-5xl mx-auto text-center space-y-8 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-semibold">
          Spiritual Warning Signals
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent">
          Angel Number Warnings
        </h1>
        <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light">
          Some numbers arrive as gentle warnings: slow down, course-correct, or refocus your energy.
          Explore the number you keep seeing to understand the message.
        </p>
      </section>

      <section className="max-w-5xl mx-auto grid gap-6 md:grid-cols-3 mb-16">
        {[
          {
            title: 'Pattern Breaks',
            description: 'Warning numbers surface when a habit or path needs a reset.'
          },
          {
            title: 'Energy Check',
            description: 'They highlight where your attention is drifting from your purpose.'
          },
          {
            title: 'Course Correction',
            description: 'Use the message to make small adjustments before big disruptions arrive.'
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
          <h2 className="text-3xl font-bold text-amber-500">Common Warning Numbers</h2>
          <div className="h-px flex-grow bg-gradient-to-r from-zinc-800 to-transparent"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-9 gap-4">
          {featuredNumbers.map((number) => (
            <Link
              key={number}
              href={`/warning/${number}`}
              className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-amber-500/50 hover:bg-zinc-900 transition-all text-center group"
            >
              <div className="text-2xl font-bold text-zinc-100 group-hover:text-amber-500 transition-colors">
                {number}
              </div>
              <div className="text-[10px] uppercase tracking-widest text-zinc-600 font-bold mt-1">Warning</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-4xl mx-auto mb-16">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-6 text-amber-300 text-center">How to Respond</h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed">
            <p>Pause, breathe, and ask what area of life needs attention.</p>
            <p>Check your boundaries, habits, and priorities for imbalance.</p>
            <p>Use the number’s guidance as a reminder to choose your next step consciously.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto text-center">
        <MeaningPaidCTA />
      </section>
    </main>
  );
}
