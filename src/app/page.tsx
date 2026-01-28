import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import AngelNumberSearch from '@/components/AngelNumberSearch';
import { DailyAngelNumber, AffirmationGenerator, CompatibilityTeaser } from '@/components/EngagementFeatures';
import { MoonPhaseWidget } from '@/components/MoonPhase';

// Dynamically import Calculator to avoid SSR issues
const Calculator = dynamic(() => import('@/components/Calculator'), {
  ssr: true,
  loading: () => <div className="text-zinc-400 text-center py-10">Loading calculator...</div>
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const pageTitle = 'Reveal Your Life Path Number - Personalized Numerology Reading';
const pageDescription = 'Discover the exact number influencing your love, career, and spiritual growth — based on your birth date.';
const homepageUrl = siteUrl;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: homepageUrl,
  },
};

export default function HomePage() {
  const faqItems = [
    {
      question: 'How do I find my life path number?',
      answer: 'Enter your full birth date in the calculator to reduce it to a single digit or master number (11, 22, 33) that describes your core path.',
    },
    {
      question: 'What are angel numbers?',
      answer: 'Angel numbers are repeating number sequences like 111 or 222 that carry spiritual messages about your next steps.',
    },
    {
      question: 'Can numerology help relationships?',
      answer: 'Yes. Understanding your life path and recurring angel numbers can reveal patterns that improve communication and timing in love.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${homepageUrl}#webpage`,
        url: homepageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl}#website`,
          url: siteUrl,
          name: 'Spirit Numeral',
        },
        breadcrumb: {
          '@id': `${homepageUrl}#breadcrumb`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${homepageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: homepageUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
        url: homepageUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <StructuredData id="home-structured-data" data={structuredData} />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-zinc-900 to-zinc-950"></div>
        {/* Cosmic glow behind hero */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>

        <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-48 pb-20 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-8xl font-serif font-bold mb-6 bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter leading-tight glow-text">
              Unlock the Hidden Number Behind Your Spiritual Path
            </h1>
          </div>
          <p className="text-lg md:text-3xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed px-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Discover the exact number influencing your love, career, and spiritual growth — based on your birth date.
          </p>
          <div className="flex flex-col items-center gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <AngelNumberSearch />
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-amber-500/80 font-medium">
              ✦ Personalized insights based on your birth date ✦
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none">
              <Link
                href="https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 px-10 rounded-full font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/30 text-center hover:shadow-amber-500/50 hover:scale-105"
              >
                <span className="relative z-10">Reveal Your Life Path Number</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
              <Link
                href="/meaning/angel-number"
                className="bg-zinc-950/60 border border-zinc-800 text-zinc-400 py-3.5 px-8 rounded-full font-semibold text-base hover:bg-zinc-900/70 hover:border-amber-500/30 hover:text-zinc-300 transition-all text-center"
              >
                Browse Angel Numbers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-1 md:p-8 backdrop-blur-sm">
          <Calculator />
        </div>
      </section>

      {/* Daily Angel Number & Engagement Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          <DailyAngelNumber />
          <div className="space-y-6">
            <MoonPhaseWidget />
            <AffirmationGenerator />
            <CompatibilityTeaser />
          </div>
        </div>
      </section>

      {/* Popular Numbers Section */}
      <section id="popular-numbers" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
          Popular Angel Numbers
        </h2>
        <p className="text-zinc-500 text-center mb-12 max-w-2xl mx-auto">Discover the spiritual messages hidden in these powerful number sequences</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[111, 222, 333, 444, 555, 666, 777, 888].map((number, index) => (
            <div key={number} className="flex flex-col gap-2" style={{ animationDelay: `${index * 0.1}s` }}>
              <Link
                href={`/meaning/angel-number/${number}`}
                className="relative p-4 md:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 transition-all duration-300 text-center group overflow-hidden hover:shadow-mystical"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
                <div className="relative">
                  <div className="text-3xl md:text-4xl font-serif font-bold text-amber-500 mb-1 group-hover:scale-110 transition-transform duration-300 group-hover:text-amber-400">
                    {number}
                  </div>
                  <p className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold group-hover:text-zinc-400 transition-colors">Angel Number</p>
                </div>
              </Link>
              <div className="grid grid-cols-3 gap-1 px-1">
                <Link href={`/twin-flame/${number}`} className="text-[9px] uppercase tracking-tighter text-zinc-600 hover:text-amber-500 transition-colors">Twin Flame</Link>
                <Link href={`/angel-number-love/${number}`} className="text-[9px] uppercase tracking-tighter text-zinc-600 hover:text-amber-500 transition-colors text-center">Love</Link>
                <Link href={`/money/${number}`} className="text-[9px] uppercase tracking-tighter text-zinc-600 hover:text-amber-500 transition-colors text-right">Money</Link>
                <Link href={`/soulmate/${number}`} className="text-[9px] uppercase tracking-tighter text-zinc-600 hover:text-amber-500 transition-colors">Soulmate</Link>
                <Link href={`/warning/${number}`} className="text-[9px] uppercase tracking-tighter text-zinc-600 hover:text-amber-500 transition-colors text-center">Warning?</Link>
                <Link href={`/manifestation/${number}`} className="text-[9px] uppercase tracking-tighter text-zinc-600 hover:text-amber-500 transition-colors text-right">Manifest</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/meaning/angel-number"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-amber-500 font-bold hover:bg-zinc-900 hover:border-amber-500/30 hover:shadow-glow transition-all duration-300 group"
          >
            <span>View All Angel Numbers</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
          </Link>
        </div>
      </section>

      {/* Tools & Resources Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-4 bg-gradient-to-r from-purple-200 to-pink-500 bg-clip-text text-transparent">
          Numerology Tools & Resources
        </h2>
        <p className="text-zinc-500 text-center mb-12 max-w-2xl mx-auto">Explore our interactive tools and educational content to deepen your spiritual journey</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Number Comparison Tool */}
          <Link
            href="/compare"
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 to-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all hover:shadow-mystical"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
            <div className="relative">
              <div className="text-4xl mb-3">🔮</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Compare Numbers</h3>
              <p className="text-zinc-400 text-sm">See how two angel numbers relate and their combined message</p>
            </div>
          </Link>

          {/* Interactive Quiz */}
          <Link
            href="/quiz"
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-indigo-950/30 to-zinc-900 border border-indigo-500/20 hover:border-indigo-500/40 transition-all hover:shadow-mystical"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 to-indigo-500/0 group-hover:from-indigo-500/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
            <div className="relative">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">Number Quiz</h3>
              <p className="text-zinc-400 text-sm">Discover which angel number is trying to reach you</p>
            </div>
          </Link>

          {/* Celebrity Numerology */}
          <Link
            href="/celebrity-numerology"
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-purple-950/30 to-zinc-900 border border-purple-500/20 hover:border-purple-500/40 transition-all hover:shadow-mystical"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
            <div className="relative">
              <div className="text-4xl mb-3">⭐</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Famous Life Paths</h3>
              <p className="text-zinc-400 text-sm">See which celebrities share your life path number</p>
            </div>
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className="group relative p-6 rounded-2xl bg-gradient-to-br from-emerald-950/30 to-zinc-900 border border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:shadow-mystical"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
            <div className="relative">
              <div className="text-4xl mb-3">📖</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Numerology Blog</h3>
              <p className="text-zinc-400 text-sm">Expert guides and insights for your spiritual journey</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Life Paths Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
          Discover Your Life Path
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((path) => (
            <Link
              key={path}
              href={`/meaning/life-path/life-path-${path}`}
              className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 transition-all group"
            >
              <div className="text-2xl md:text-3xl font-bold text-amber-500 mb-2">Life Path {path}</div>
              <p className="text-zinc-400 text-sm">Discover your numerological path and destiny.</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Ready to Reveal Your Life Path Number?
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 mb-8">
            Get a personalized reading based on your birth date and hidden number.
          </p>
          <Link
            href="https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 px-8 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/10"
          >
            Reveal My Life Path Reading →
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="p-8 md:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <h2 className="text-3xl font-bold mb-8 text-amber-300 text-center">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {faqItems.map((faq) => (
              <div key={faq.question} className="border-b border-zinc-800 pb-6 last:border-b-0 last:pb-0">
                <dt className="text-xl font-semibold text-zinc-100">{faq.question}</dt>
                <dd className="text-zinc-300 leading-relaxed mt-2">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </main>
  );
}
