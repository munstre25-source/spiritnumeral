import Link from 'next/link';
import { LifecyclePaidCTA } from '@/components/LifecyclePaidCTA';

export const metadata = {
  title: 'Birthday Numbers • Spirit Numeral',
  description: 'Discover the meaning of your birthday number.',
};

export default function BirthdayIndexPage() {
  const numbers = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Birthday Numbers</h1>
          <p className="text-zinc-400">Explore your natural gifts by day of birth.</p>
        </header>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {numbers.map((n) => (
            <Link key={n} href={`/birthday-number/${n}`} className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center text-amber-400 font-semibold">
              {n}
            </Link>
          ))}
        </div>
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <LifecyclePaidCTA type="birthday" />
        </section>
      </div>
    </main>
  );
}
