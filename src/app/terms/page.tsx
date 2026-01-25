import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const pageUrl = `${siteUrl}/terms`;
const pageTitle = 'Terms of Service - Spirit Numeral';
const pageDescription = 'The terms and conditions for using Spirit Numeral services.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
};

export default function TermsPage() {
  const faqItems = [
    {
      question: 'Is Spirit Numeral for entertainment or advice?',
      answer: 'Our numerology content is for spiritual guidance and entertainment only and is not a substitute for professional advice.',
    },
    {
      question: 'Can I reuse Spirit Numeral content?',
      answer: 'Content is protected by copyright. Reuse requires written permission.',
    },
    {
      question: 'How do you handle liability?',
      answer: 'Users are responsible for their own choices; Spirit Numeral disclaims liability for decisions based on readings.',
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
            name: 'Terms',
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
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose prose-invert prose-amber">
        <StructuredData id="terms-structured-data" data={structuredData} />
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
          Terms of Service
        </h1>
        
        <p className="text-zinc-400">Last updated: January 22, 2026</p>

        <section className="mt-8 space-y-6 text-zinc-300">
          <h2 className="text-2xl font-semibold text-zinc-100">1. Acceptance of Terms</h2>
          <p>
            By accessing Spirit Numeral, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">2. Spiritual Guidance Disclaimer</h2>
          <p>
            The content on Spirit Numeral is for entertainment and spiritual growth purposes only. Numerology and angel number interpretations are subjective and should not replace professional medical, legal, or financial advice.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">3. Intellectual Property</h2>
          <p>
            All content, calculations, and designs on Spirit Numeral are the property of Spirit Numeral and are protected by copyright laws.
          </p>

          <h2 className="text-2xl font-semibold text-zinc-100">4. Limitation of Liability</h2>
          <p>
            Spirit Numeral is not liable for any decisions made based on our readings. You are responsible for your own life choices and interpretations.
          </p>
        </section>

        <section className="mt-12 p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 not-prose">
          <h2 className="text-2xl font-bold mb-6 text-amber-300">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-zinc-800 pb-6 last:border-b-0 last:pb-0">
                <dt className="text-lg font-semibold text-zinc-100">{item.question}</dt>
                <dd className="text-zinc-300 leading-relaxed mt-2">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
