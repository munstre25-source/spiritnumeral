import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const pageUrl = `${siteUrl}/privacy`;
const pageTitle = 'Privacy Policy - Spirit Numeral';
const pageDescription = 'Learn how Spirit Numeral protects your data and privacy.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
};

export default function PrivacyPage() {
  const faqItems = [
    {
      question: 'Do you store my birth date?',
      answer: 'Birth dates are used for calculations and are not stored unless you opt in to an account or newsletter.',
    },
    {
      question: 'Do you sell personal data?',
      answer: 'No. We do not sell your data to third parties.',
    },
    {
      question: 'How can I contact you about privacy?',
      answer: 'Reach us via spiritnumeral@proton.me for any privacy-related questions.',
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
            name: 'Privacy Policy',
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
    <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto prose prose-amber">
        <StructuredData id="privacy-structured-data" data={structuredData} />
        <h1 className="text-4xl font-bold mb-8 text-primary font-bold">
          Privacy Policy
        </h1>
        
        <p className="text-secondary">Last updated: January 22, 2026</p>

        <section className="mt-8 space-y-6 text-secondary">
          <p>
            At Spirit Numeral, we value your privacy as much as your spiritual journey. This policy outlines how we collect, use, and safeguard your personal information.
          </p>

          <h2 className="text-2xl font-semibold text-primary">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as your name, birth date (for numerology calculations), and email address when you contact us or use our tools.
          </p>

          <h2 className="text-2xl font-semibold text-primary">2. How We Use Your Information</h2>
          <p>
            Your birth date is used solely to calculate your life path and personal numerology readings. We do not store this data unless you explicitly create an account or sign up for our newsletter.
          </p>

          <h2 className="text-2xl font-semibold text-primary">3. Data Protection</h2>
          <p>
            We implement a variety of security measures to maintain the safety of your personal information. Your data is never sold to third parties.
          </p>

          <h2 className="text-2xl font-semibold text-primary">4. Cookies</h2>
          <p>
            We use cookies to improve your experience on our site, analyze traffic, and remember your preferences.
          </p>
        </section>

        <section className="mt-12 p-8 rounded-3xl bg-card border border-default not-prose">
          <h2 className="text-2xl font-bold mb-6 text-amber-600">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-default pb-6 last:border-b-0 last:pb-0">
                <dt className="text-lg font-semibold text-primary">{item.question}</dt>
                <dd className="text-secondary leading-relaxed mt-2">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
}
