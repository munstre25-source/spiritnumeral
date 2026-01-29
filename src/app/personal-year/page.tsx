import PersonalTimingCalculator from '@/components/PersonalTimingCalculator';
import { TimingPaidCTA } from '@/components/TimingPaidCTA';

export const metadata = {
  title: 'Personal Year Number Calculator • Spirit Numeral',
  description: 'Calculate your personal year number and discover its meaning.',
};

export default function PersonalYearPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      <div className="max-w-4xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">Personal Year Number</h1>
          <p className="text-zinc-400 text-lg">
            Your personal year shows the dominant theme of your current 12-month cycle.
          </p>
        </header>
        <PersonalTimingCalculator />
        <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <TimingPaidCTA />
        </section>
      </div>
    </main>
  );
}
