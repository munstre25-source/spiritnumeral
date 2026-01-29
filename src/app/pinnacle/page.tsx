import Link from 'next/link';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';

export const metadata = {
  title: 'Pinnacle Numbers • Spirit Numeral',
  description: 'Learn your pinnacle numbers and long-term life phases.',
};

export default function PinnacleIndexPage() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Pinnacle Numbers</h1>
          <p className="text-zinc-400">Explore your long-term growth cycles.</p>
        </header>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/pinnacle/${n}`} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center text-amber-400 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <LifecyclePaidCTA type="pinnacle" />
        </section>
      </div>
    </main>
  );
}
