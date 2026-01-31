import Calculator from '@/components/Calculator';
import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const pageUrl = `${siteUrl}/calculator`;
const pageTitle = 'Free Numerology Calculator - Discover Your Life Path Number';
const pageDescription = 'Calculate your numerology life path number for free. Enter your birthdate to discover your spiritual path and unlock your personalized predictions.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
};

export default function CalculatorPage() {
  const faqItems = [
    {
      question: 'What is a Life Path Number?',
      answer:
        'It is the core numerology number derived from your full birthdate that reveals your natural strengths, challenges, and life purpose.',
    },
    {
      question: 'How do you calculate the Life Path Number?',
      answer:
        'We reduce the day, month, and year of your birthdate to single digits and add them together until we reach a single digit or master number (11, 22, or 33).',
    },
    {
      question: 'Is the calculator result personalized?',
      answer:
        'Yes. After you enter your birthdate, we compute your Life Path number and take you to a tailored reading with insights about relationships, career, and spiritual growth.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: pageTitle,
        description: pageDescription,
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${siteUrl}#website`,
          url: siteUrl,
          name: 'Spirit Numeral',
        },
        breadcrumb: {
          '@id': `${pageUrl}#breadcrumb`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Numerology Calculator',
            item: pageUrl,
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
        url: pageUrl,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-48 px-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Script id="calculator-structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <nav className="text-sm text-secondary mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-amber-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-muted">
              /
            </li>
            <li className="text-amber-600">Numerology Calculator</li>
          </ol>
        </nav>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-primary font-bold">
            Numerology Calculator
          </h1>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Discover your life path number and unlock insights into your personality, purpose, and destiny
          </p>
        </div>
        <Calculator />
        <div className="mt-12 p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold mb-4 text-amber-600">How It Works</h2>
          <p className="text-secondary leading-relaxed mb-4">
            Your Life Path number is calculated from your birthdate and reveals your core personality traits, natural talents, and life purpose according to numerology.
          </p>
          <p className="text-secondary leading-relaxed">
            Simply enter your birthdate above, and we'll calculate your Life Path number and redirect you to your personalized reading with detailed insights about your path, relationships, career, and future predictions.
          </p>
        </div>
        <div className="mt-10 p-8 rounded-3xl bg-elevated border border-default">
          <h2 className="text-2xl font-bold mb-6 text-amber-600">FAQ</h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-default pb-6 last:border-b-0 last:pb-0">
                <dt className="text-lg font-semibold text-amber-600">{item.question}</dt>
                <dd className="text-secondary leading-relaxed mt-2">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
