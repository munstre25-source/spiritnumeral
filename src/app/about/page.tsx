import Link from 'next/link';
import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';

const siteUrl = getSiteBaseUrl();
const pageUrl = ensureAbsoluteUrl(siteUrl, '/about');
const pageTitle = 'About Spirit Numeral - Our Mission & Expertise';
const pageDescription = 'Learn about the experts behind Spirit Numeral and our mission to provide accurate, spiritual guidance through numerology.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
};

export default function AboutPage() {
  const faqItems = [
    {
      question: 'Who runs Spirit Numeral?',
      answer: 'A team of numerologists and spiritual researchers who combine traditional wisdom with data-backed insights.',
    },
    {
      question: 'How do you research number meanings?',
      answer: 'We cross-reference classical numerology, historical symbolism, and community feedback before publishing guides.',
    },
    {
      question: 'Are the readings personalized?',
      answer: 'Yes. Our calculator uses your birth date to surface tailored life path insights and connects you to relevant guides.',
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
            name: 'About',
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
      <div className="max-w-4xl mx-auto">
        <StructuredData id="about-structured-data" data={structuredData} />
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-primary font-bold">
          Our Spiritual Mission
        </h1>
        
        <div className="prose prose-amber max-w-none max-w-none space-y-8 text-secondary">
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Who We Are</h2>
            <p className="text-lg leading-relaxed">
              Spirit Numeral was founded by a collective of seasoned numerologists, spiritual seekers, and data enthusiasts dedicated to decoding the cosmic language of numbers. We believe that the universe communicates with us through synchronicity, and angel numbers are the most profound form of that guidance.
            </p>
          </section>

          <section className="bg-card border border-default p-8 rounded-3xl my-12">
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Expertise</h2>
            <p className="leading-relaxed mb-4">
              With over 15 years of combined experience in Pythagorean and Chaldean numerology, our team meticulously researches the historical and spiritual significance of every number we document. Our readings are not just algorithmic; they are rooted in ancient wisdom and verified spiritual patterns.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-secondary">
              <li>Certified Numerology Practitioners</li>
              <li>Spiritual Mentors with a focus on Synchronicity</li>
              <li>Research-backed spiritual interpretations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">Why We Created Spirit Numeral</h2>
            <p className="leading-relaxed">
              In a world filled with digital noise, finding genuine spiritual clarity can be difficult. We created this platform to provide a sanctuary for those seeing repeating numbers like 111, 222, or 444. Our goal is to offer more than just "meanings"—we provide actionable insights for your love life, career, and twin flame journey.
            </p>
          </section>

          <section className="pt-8 border-t border-zinc-900">
            <h2 className="text-2xl font-semibold text-primary mb-4">Our Commitment to Accuracy</h2>
            <p className="leading-relaxed">
              Every piece of content on Spirit Numeral undergoes a rigorous editorial process. We cross-reference spiritual texts, modern numerological studies, and community feedback to ensure our guides remain the most trustworthy resource on the web.
            </p>
          </section>
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-indigo-950/20 to-zinc-900 border border-indigo-500/10 text-center">
          <h3 className="text-xl font-bold mb-4">Have questions about your reading?</h3>
          <Link 
            href="/contact" 
            className="inline-block bg-amber-500 text-black px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors"
          >
            Contact Our Team
          </Link>
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold mb-6 text-amber-600">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-default pb-6 last:border-b-0 last:pb-0">
                <dt className="text-lg font-semibold text-primary">{item.question}</dt>
                <dd className="text-secondary leading-relaxed mt-2">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
