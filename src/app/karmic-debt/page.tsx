import Link from 'next/link';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';

export const metadata = {
  title: 'Karmic Debt Numbers • Spirit Numeral',
  description: 'Understand karmic debt numbers 13, 14, 16, and 19.',
};

export default function KarmicDebtIndexPage() {
  const numbers = [13, 14, 16, 19];
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Karmic Debt Numbers</h1>
          <p className="text-zinc-400">Deep lessons and patterns to balance.</p>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/karmic-debt/${n}`} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center text-amber-400 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <LifecyclePaidCTA type="karmic_debt" />
        </section>
      </div>
    </main>
  );
}
