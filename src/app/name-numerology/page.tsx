import NameNumerologyCalculator from '@/components/NameNumerologyCalculator';
import { NamePaidCTA } from '@/components/NamePaidCTA';

export const metadata = {
  title: 'Name Numerology Calculator • Spirit Numeral',
  description: 'Calculate your Expression, Soul Urge, and Personality numbers from your name.',
};

export default function NameNumerologyPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Name Numerology</h1>
          <p className="text-zinc-400 text-lg">
            Discover how your name shapes your Expression, Soul Urge, and Personality numbers.
          </p>
        </header>
        <NameNumerologyCalculator />
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <NamePaidCTA />
        </section>
      </div>
    </main>
  );
}
