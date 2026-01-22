import dynamic from 'next/dynamic';
import Link from 'next/link';

// Dynamically import Calculator to avoid SSR issues
const Calculator = dynamic(() => import('@/components/Calculator'), {
  ssr: true,
  loading: () => <div className="text-zinc-400 text-center">Loading calculator...</div>
});

export const metadata = {
  title: 'Spiritual Numerology Guide - Angel Numbers & Life Path Meanings',
  description: 'Discover the hidden meanings of angel numbers and your life path number. Get personalized predictions for love, career, and twin flame connections.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-zinc-900 to-zinc-950"></div>
        <div className="relative max-w-7xl mx-auto px-8 pt-40 md:pt-48 pb-24 text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter">
            Unlock Your Spiritual Path
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover the hidden meanings of angel numbers and your life path. Get personalized predictions for love, career, and spiritual growth.
          </p>
          <div className="flex flex-col items-center gap-8">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-500/80 font-medium">
              Personalized insights based on your birth date
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/calculator"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 px-10 rounded-full font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20"
              >
                Get Your Reading
              </Link>
              <Link
                href="#popular-numbers"
                className="bg-zinc-900/50 border border-zinc-800 text-zinc-300 py-4 px-10 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all"
              >
                Explore Angel Numbers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <Calculator />
      </section>

      {/* Popular Numbers Section */}
      <section id="popular-numbers" className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
          Popular Angel Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[111, 222, 333, 444, 555, 666, 777, 888].map((number) => (
            <Link
              key={number}
              href={`/meaning/angel-number/${number}`}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 transition-all text-center group"
            >
              <div className="text-4xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                {number}
              </div>
              <p className="text-sm text-zinc-400">Angel Number</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Life Paths Section */}
      <section className="max-w-6xl mx-auto px-8 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
          Discover Your Life Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((path) => (
            <Link
              key={path}
              href={`/meaning/life-path/life-path-${path}`}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 transition-all group"
            >
              <div className="text-3xl font-bold text-amber-500 mb-2">Life Path {path}</div>
              <p className="text-zinc-400 text-sm">Discover your numerological path</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-8 py-16 text-center">
        <div className="p-12 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Ready to Discover Your Predictions?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Get personalized readings based on your angel numbers and life path
          </p>
          <Link
            href="/calculator"
            className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 px-8 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all"
          >
            Calculate Your Life Path →
          </Link>
        </div>
      </section>
    </main>
  );
}
