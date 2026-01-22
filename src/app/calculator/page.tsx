import Calculator from '@/components/Calculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Numerology Calculator - Discover Your Life Path Number',
  description: 'Calculate your numerology life path number for free. Enter your birthdate to discover your spiritual path and unlock your personalized predictions.',
};

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-48 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Numerology Calculator
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Discover your life path number and unlock insights into your personality, purpose, and destiny
          </p>
        </div>
        <Calculator />
        <div className="mt-12 p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
          <h2 className="text-2xl font-bold mb-4 text-amber-400">How It Works</h2>
          <p className="text-zinc-300 leading-relaxed mb-4">
            Your Life Path number is calculated from your birthdate and reveals your core personality traits, natural talents, and life purpose according to numerology.
          </p>
          <p className="text-zinc-300 leading-relaxed">
            Simply enter your birthdate above, and we'll calculate your Life Path number and redirect you to your personalized reading with detailed insights about your path, relationships, career, and future predictions.
          </p>
        </div>
      </div>
    </main>
  );
}
