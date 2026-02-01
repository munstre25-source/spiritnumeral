import Link from 'next/link';

export const metadata = {
  title: 'Numerology Reports • Spirit Numeral',
  description: 'Get your Quick Number Report ($7) or full Personal Blueprint ($17).',
};

export default function BundlePage() {
  return (
    <main className="min-h-screen bg-page text-primary">
      <div className="max-w-lg mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Numerology Reports</h1>
        <p className="text-secondary mb-8">
          Choose your report. Start with the Quick Number Report for instant meaning, or go straight to the full Blueprint.
        </p>
        <div className="space-y-4">
          <Link
            href="/quick-report"
            className="block w-full py-4 rounded-xl bg-amber-500 text-black font-bold text-lg hover:bg-amber-400 transition"
          >
            Quick Number Report — $7
          </Link>
          <Link
            href="/quiz"
            className="block w-full py-4 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-600 font-semibold hover:bg-amber-500/25 transition"
          >
            Full Personal Blueprint — $17
          </Link>
        </div>
      </div>
    </main>
  );
}
