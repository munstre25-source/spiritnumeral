import { Metadata } from 'next';
import StructuredData from '@/components/StructuredData';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
const pageUrl = `${siteUrl}/contact`;
const pageTitle = 'Contact Spirit Numeral - Connect with Our Spiritual Experts';
const pageDescription = 'Have a question about an angel number or your life path? Contact the Spirit Numeral team for guidance.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl,
  },
};

export default function ContactPage() {
  const faqItems = [
    {
      question: 'How long until I hear back?',
      answer: 'We typically respond within 24-48 hours, Monday through Friday.',
    },
    {
      question: 'Can you interpret a specific angel number?',
      answer: 'Yes. Share the number and context, and we will point you to the best guidance or create a personalized reply.',
    },
    {
      question: 'Do you store my birth date?',
      answer: 'Birth dates entered in the calculator are used for calculations only and are not stored unless you opt into messaging.',
    },
  ];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ContactPage',
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
            name: 'Contact',
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
      <div className="max-w-4xl mx-auto">
        <StructuredData id="contact-structured-data" data={structuredData} />
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
          Connect With Us
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-zinc-400 text-lg mb-8">
              The universe has a way of bringing people together. Whether you have a question about a specific number, want to share your experience, or have business inquiries, we're here to listen.
            </p>
            
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-amber-500 font-bold mb-2">Email Us</h3>
                <p className="text-zinc-300">spiritnumeral@proton.me</p>
              </div>
              
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-amber-500 font-bold mb-2">Response Time</h3>
                <p className="text-zinc-300">We typically respond within 24-48 spiritual hours.</p>
              </div>
            </div>
          </div>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Your Name</label>
              <input 
                type="text" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="Name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="email@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="How can we help you on your path?"
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold py-4 rounded-xl hover:from-amber-400 hover:to-yellow-400 transition-all shadow-lg shadow-amber-500/10"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800">
          <h2 className="text-2xl font-bold mb-6 text-amber-300">Frequently Asked Questions</h2>
          <dl className="space-y-6">
            {faqItems.map((item) => (
              <div key={item.question} className="border-b border-zinc-800 pb-6 last:border-b-0 last:pb-0">
                <dt className="text-lg font-semibold text-zinc-100">{item.question}</dt>
                <dd className="text-zinc-300 leading-relaxed mt-2">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </main>
  );
}
