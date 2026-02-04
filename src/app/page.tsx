import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { HomeHeroPsychicCTA } from '@/components/HomeHeroPsychicCTA';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';

const HomepageSearch = dynamic(() => import('@/components/HomepageSearch').then((m) => ({ default: m.HomepageSearch })), {
  loading: () => <div className="h-12 max-w-xl mx-auto bg-card border border-default rounded-full animate-pulse" />
});

const DailyAngelNumber = dynamic(
  () => import('@/components/EngagementFeatures').then((m) => ({ default: m.DailyAngelNumber })),
  { loading: () => <div className="rounded-3xl bg-card border border-default p-8 text-center text-secondary">Loading…</div> }
);

const AffirmationGenerator = dynamic(
  () => import('@/components/EngagementFeatures').then((m) => ({ default: m.AffirmationGenerator })),
  { loading: () => <div className="rounded-3xl bg-card border border-default p-6 text-secondary">Loading…</div> }
);

const CompatibilityTeaser = dynamic(
  () => import('@/components/EngagementFeatures').then((m) => ({ default: m.CompatibilityTeaser })),
  { loading: () => <div className="rounded-3xl bg-card border border-default p-6 text-secondary">Loading…</div> }
);

const MoonPhaseWidget = dynamic(
  () => import('@/components/MoonPhase').then((m) => ({ default: m.MoonPhaseWidget })),
  { loading: () => <div className="rounded-2xl bg-card border border-default p-6 text-secondary">Loading…</div> }
);

const DailyNumberSignup = dynamic(
  () => import('@/components/DailyNumberSignup').then((m) => ({ default: m.DailyNumberSignup })),
  { loading: () => <div className="rounded-2xl bg-card border border-default p-8 h-48 animate-pulse" /> }
);

const PersonalNumberToday = dynamic(
  () => import('@/components/PersonalNumberToday').then((m) => ({ default: m.PersonalNumberToday })),
  { loading: () => <div className="rounded-3xl bg-card border border-default p-8 h-52 animate-pulse" /> }
);

const CATEGORY_TABS = [
  { label: 'Meaning', href: '/meaning' },
  { label: 'Twin Flame', href: '/twin-flame' },
  { label: 'Love', href: '/angel-number-love/111' },
  { label: 'Money', href: '/money' },
  { label: 'Career', href: '/angel-number-career/111' },
  { label: 'Soulmate', href: '/soulmate' },
] as const;

const POPULAR_NUMBERS = [111, 222, 333, 444, 555, 666, 777, 888];

const TOOLS = [
  { title: 'Compare Numbers', description: 'See how two angel numbers relate and their combined message', href: '/compare', icon: '✨' },
  { title: 'Number Quiz', description: 'Discover which angel number is trying to reach you', href: '/quiz', icon: '⭐' },
  { title: 'Famous Life Paths', description: 'See which celebrities share your life path number', href: '/celebrity-numerology', icon: '★' },
  { title: 'Numerology Blog', description: 'Expert guides and insights for your spiritual journey', href: '/blog', icon: '📖' },
] as const;

const siteUrl = getSiteBaseUrl();
const pageTitle = 'Angel Number & Life Path Meanings: Love, Career, Twin Flame';
const pageDescription = 'Discover your life path number and angel number meanings. Love, career, twin flame — free calculator and guides.';
const homepageUrl = ensureAbsoluteUrl(siteUrl, '/');

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: homepageUrl },
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
        isPartOf: { '@type': 'WebSite', '@id': `${siteUrl}#website`, url: siteUrl, name: 'Spirit Numeral' },
        breadcrumb: { '@id': `${homepageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${homepageUrl}#breadcrumb`,
        itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: homepageUrl }],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
        url: homepageUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-page text-primary">
      <StructuredData id="home-structured-data" data={structuredData} />

      {/* Hero – headline, tabs, search, popular numbers, CTA (GSC-informed) */}
      <section className="pt-24 pb-10 md:pt-32 md:pb-14">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4 tracking-tight">
            Unlock the Hidden Number Behind Your Spiritual Path
          </h1>
          <p className="text-lg text-secondary mb-6 max-w-2xl mx-auto">
            Discover the exact number influencing your love, career, and spiritual growth — based on your birth date.
          </p>
          <HomeHeroPsychicCTA />

          {/* Category tabs – GSC query themes (meaning, love, twin flame, money, career, soulmate) */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORY_TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-default text-primary hover:border-amber-500/50 hover:bg-elevated transition-colors"
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <HomepageSearch />

          <p className="text-muted text-xs mt-4 mb-2">Popular:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {POPULAR_NUMBERS.map((number) => (
              <Link
                key={number}
                href={`/meaning/angel-number/${number}`}
                className="px-3 py-2 rounded-lg bg-elevated border border-default text-primary text-sm font-medium hover:border-amber-500/50 transition-colors"
              >
                {number}
              </Link>
            ))}
          </div>

          <p className="text-muted text-sm mt-8">
            ◆ Personalized insights based on your birth date ◆
          </p>

          {/* GSC: high-impression queries (665, 183, 579, etc.) — surface for CTR */}
          <p className="text-muted text-xs mt-6 mb-2">Often searched:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {[665, 183, 579, 774, 480, 532, 2015, 1321].map((number) => (
              <Link
                key={number}
                href={`/meaning/angel-number/${number}`}
                className="px-3 py-1.5 rounded-lg bg-card border border-default text-primary text-sm hover:border-amber-500/50 transition-colors"
              >
                {number}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today’s Angel Number – engagement, shareable */}
      <section className="max-w-4xl mx-auto px-6 py-8">
        <DailyAngelNumber />
      </section>

      <section className="max-w-4xl mx-auto px-6 py-8">
        <PersonalNumberToday />
      </section>

      <section className="max-w-xl mx-auto px-6 py-8">
        <DailyNumberSignup variant="block" />
      </section>

      {/* Tools & Resources – Compare, Quiz, Famous Life Paths, Blog (GSC: celebrity, quiz, meaning) */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-serif font-bold text-primary text-center mb-2">
          Numerology Tools &amp; Resources
        </h2>
        <p className="text-secondary text-center text-sm mb-8">
          Explore our interactive tools and content to deepen your spiritual journey
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="p-6 rounded-2xl bg-card border border-default text-primary hover:border-amber-500/50 transition-colors"
            >
              <span className="text-2xl mb-3 block" aria-hidden>{tool.icon}</span>
              <h3 className="font-semibold text-primary mb-1">{tool.title}</h3>
              <p className="text-secondary text-sm">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Moon, Affirmation, Love Compatibility – engagement row */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <MoonPhaseWidget />
          <AffirmationGenerator />
          <CompatibilityTeaser />
        </div>
      </section>

      {/* Popular Angel Numbers – simple grid */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-serif font-bold text-primary text-center mb-2">
          Popular Angel Numbers
        </h2>
        <p className="text-secondary text-center text-sm mb-8">
          Explore meanings for these common number sequences
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {POPULAR_NUMBERS.map((number) => (
            <Link
              key={number}
              href={`/meaning/angel-number/${number}`}
              className="p-4 rounded-xl bg-elevated border border-default text-center text-primary hover:border-amber-500/50 transition-colors"
            >
              <span className="text-2xl font-bold text-amber-600">{number}</span>
              <p className="text-muted text-xs mt-1">Angel Number</p>
            </Link>
          ))}
        </div>
        <p className="text-center mt-6">
          <Link href="/meaning/angel-number" className="text-secondary text-sm hover:underline">
            View all angel numbers →
          </Link>
        </p>
      </section>

      {/* Life Paths */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-serif font-bold text-primary text-center mb-8">
          Life Path Numbers 1–9
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((path) => (
            <Link
              key={path}
              href={`/meaning/life-path/life-path-${path}`}
              className="p-4 rounded-xl bg-elevated border border-default text-center hover:border-amber-500/50 transition-colors"
            >
              <span className="text-xl font-bold text-amber-600">{path}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Reviews / social proof – pre-sell */}
      <TestimonialsSection />

      {/* FAQ – conversion & trust */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-serif font-bold text-primary text-center mb-8">
          Frequently Asked Questions
        </h2>
        <dl className="space-y-6 border-t border-default pt-6">
          {faqItems.map((faq) => (
            <div key={faq.question} className="border-b border-default pb-6 last:border-b-0">
              <dt className="font-semibold text-primary">{faq.question}</dt>
              <dd className="text-secondary text-sm mt-2 leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <p className="text-center mt-10">
          <Link
            href="/calculator"
            className="inline-block btn-primary px-6 py-3 rounded-lg font-semibold text-sm transition-colors"
          >
            Get my free life path number
          </Link>
        </p>
      </section>
    </main>
  );
}
