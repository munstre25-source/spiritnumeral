import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

// Dynamically import Calculator to avoid SSR issues
const Calculator = dynamic(() => import('@/components/Calculator'), {
  ssr: true,
  loading: () => <div className="text-zinc-400 text-center py-10">Loading calculator...</div>
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const pageTitle = 'Spiritual Numerology Guide - Angel Numbers & Life Path Meanings';
const pageDescription = 'Discover the hidden meanings of angel numbers and your life path number. Get personalized predictions for love, career, and twin flame connections.';
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
        <div className="relative max-w-7xl mx-auto px-6 pt-24 md:pt-48 pb-20 text-center">
          <h1 className="text-5xl md:text-8xl font-bold mb-6 bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter leading-tight">
            Unlock Your Spiritual Path
          </h1>
          <p className="text-lg md:text-3xl text-zinc-400 mb-10 max-w-3xl mx-auto leading-relaxed px-4">
            Discover the hidden meanings of angel numbers and your life path. Get personalized predictions for love, career, and spiritual growth.
          </p>
          <div className="flex flex-col items-center gap-8">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-amber-500/80 font-medium">
              Personalized insights based on your birth date
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none">
              <Link
                href="https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 px-10 rounded-full font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/20 text-center"
              >
                Get Your Reading
              </Link>
              <Link
                href="#popular-numbers"
                className="bg-zinc-900/50 border border-zinc-800 text-zinc-300 py-4 px-10 rounded-full font-bold text-lg hover:bg-zinc-800 transition-all text-center"
              >
                Explore Angel Numbers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-1 md:p-8">
          <Calculator />
        </div>
      </section>

      {/* Popular Numbers Section */}
      <section id="popular-numbers" className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
          Popular Angel Numbers
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[111, 222, 333, 444, 555, 666, 777, 888].map((number) => (
            <Link
              key={number}
              href={`/meaning/angel-number/${number}`}
              className="p-4 md:p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 transition-all text-center group"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-500 mb-2 group-hover:scale-110 transition-transform">
                {number}
              </div>
              <p className="text-xs md:text-sm text-zinc-400 uppercase tracking-wider font-medium">Angel Number</p>
            </Link>
          ))}
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
            Ready to Discover Your Predictions?
          </h2>
          <p className="text-lg md:text-xl text-zinc-400 mb-8">
            Get personalized readings based on your angel numbers and life path
          </p>
          <Link
            href="https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 px-8 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/10"
          >
            Get Full Personalized Reading →
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
