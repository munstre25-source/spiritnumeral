import Link from 'next/link';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';

export const metadata = {
  title: 'Challenge Numbers • Spirit Numeral',
  description: 'Discover your numerology challenge numbers and lessons.',
};

export default function ChallengeIndexPage() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Challenge Numbers</h1>
          <p className="text-zinc-400">Understand the lessons you are here to master.</p>
        </header>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/challenge/${n}`} className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center text-amber-400 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <LifecyclePaidCTA type="challenge" />
        </section>
      </div>
    </main>
  );
}
