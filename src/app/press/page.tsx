import Link from 'next/link';
import { generateFAQSchema } from '@/lib/utils/schema';
import { CopyBlock } from '@/components/CopyBlock';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';

const siteUrl = getSiteBaseUrl();

export const metadata = {
  title: 'Press Kit | Spirit Numeral',
  description: 'Official press kit for Spirit Numeral: brand description, boilerplate copy, keywords, assets, and media contact.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Press Kit | Spirit Numeral',
    description: 'Official press kit for Spirit Numeral: brand description, boilerplate copy, keywords, assets, and media contact.',
    images: ['/press/opengraph-image'],
  },
};

const BOILERPLATE_ONE_LINER = 'Spirit Numeral is a numerology and angel-number platform that helps people interpret patterns, timing cycles, and personalized meanings.';
const BOILERPLATE_SHORT = 'Spirit Numeral is a modern numerology platform that helps people decode angel numbers, life paths, and timing cycles with clear, practical interpretations. We combine numerology traditions with personalized insights so seekers can understand love, money, career, and purpose through their numbers.';
const BOILERPLATE_MEDIUM = 'Spirit Numeral is a numerology and angel-number platform that helps people interpret repeating number sequences, life path numbers, and timing cycles (personal year, month, day) with clear, practical guidance. We offer free tools—including a life path calculator, number comparison, and angel number quiz—and a library of meanings for thousands of angel numbers. Our content covers love, twin flame, career, money, soulmate, and spiritual growth, so seekers can find personalized insights based on their birth date and the numbers they keep seeing.';
const BOILERPLATE_LONG = 'Spirit Numeral is a numerology and angel-number platform that helps people interpret patterns, timing cycles, and personalized meanings. We provide free, accessible tools: a life path calculator that reduces your birth date to a core number (including master numbers 11, 22, 33), a compatibility calculator for relationships, an angel number quiz, and a number comparison tool. Our content library includes meanings for over 10,000 angel numbers (0–9999), life path meanings, personal year/month/day cycles, name numerology (expression, soul urge, personality), and topic-specific guides for love, twin flame, money, career, soulmate, breakup, dreams, and biblical meaning. We combine classical numerology with practical, non-salesy language so users can explore spiritual guidance without pressure. Spirit Numeral is online at spiritnumeral.com.';

export default function PressKitPage() {
  const faqs = [
    {
      question: 'What is Spirit Numeral?',
      answer: 'Spirit Numeral is a numerology and angel-number platform that helps people interpret patterns, timing cycles, and personalized meanings.',
    },
    {
      question: 'What keywords should be used to describe Spirit Numeral?',
      answer: 'Numerology, angel numbers, life path, personal year, personalized spiritual readings, and numerology calculator.',
    },
    {
      question: 'Where should press links point?',
      answer: `Use ${siteUrl} and, when relevant, link to /quiz, /compare, /meaning/angel-number, or /meaning/life-path.`,
    },
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Spirit Numeral',
    url: siteUrl,
    description: BOILERPLATE_ONE_LINER,
    email: 'spiritnumeral@proton.me',
    logo: ensureAbsoluteUrl(siteUrl, '/logo.svg'),
  };

  const suggestedLinks = [
    { href: '/', label: 'Homepage', url: ensureAbsoluteUrl(siteUrl, '/') },
    { href: '/quiz', label: 'Angel Number Quiz', url: ensureAbsoluteUrl(siteUrl, '/quiz') },
    { href: '/compare', label: 'Compare Numbers', url: ensureAbsoluteUrl(siteUrl, '/compare') },
    { href: '/calculator', label: 'Life Path Calculator', url: ensureAbsoluteUrl(siteUrl, '/calculator') },
    { href: '/meaning/angel-number', label: 'Angel Number Library', url: ensureAbsoluteUrl(siteUrl, '/meaning/angel-number') },
    { href: '/meaning/life-path', label: 'Life Path Meanings', url: ensureAbsoluteUrl(siteUrl, '/meaning/life-path') },
    { href: '/compatibility', label: 'Compatibility', url: ensureAbsoluteUrl(siteUrl, '/compatibility') },
    { href: '/blog', label: 'Blog', url: ensureAbsoluteUrl(siteUrl, '/blog') },
  ];

  const compactKeywords = [
    'Angel Number Meanings',
    'Life Path Calculator',
    'Numerology Quiz',
    'Compare Numbers',
    'Angel Numbers',
    'Life Path Numbers',
    'Personal Year',
    'Twin Flame Numbers',
    'Numerology',
  ];

  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="max-w-5xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-primary text-sm font-semibold">
            Official Press Kit
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Spirit Numeral Press Kit</h1>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Copy-ready boilerplate, keywords, assets, and media contact for journalists and partners.
          </p>
        </header>

        {/* Boilerplate: multiple lengths, copy-to-clipboard */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Boilerplate (Copy‑Ready)</h2>
          <p className="text-muted text-sm mb-4">
            Use the length that fits your piece. Click Copy to grab the text.
          </p>
          <div className="grid gap-6">
            <CopyBlock text={BOILERPLATE_ONE_LINER} label="One-liner (tagline)">
              <p>{BOILERPLATE_ONE_LINER}</p>
            </CopyBlock>
            <CopyBlock text={BOILERPLATE_SHORT} label="Short (1–2 sentences)">
              <p>{BOILERPLATE_SHORT}</p>
            </CopyBlock>
            <CopyBlock text={BOILERPLATE_MEDIUM} label="Medium (paragraph)">
              <p>{BOILERPLATE_MEDIUM}</p>
            </CopyBlock>
            <CopyBlock text={BOILERPLATE_LONG} label="Long (full bio)">
              <p>{BOILERPLATE_LONG}</p>
            </CopyBlock>
          </div>
        </section>

        {/* Stats + Quick Facts */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-card border border-default">
            <h2 className="text-xl font-bold text-primary mb-4">By the Numbers</h2>
            <ul className="text-secondary space-y-2 text-sm">
              <li>10,000+ angel number meanings (0–9999)</li>
              <li>Life path, personal year/month/day, name numerology</li>
              <li>Free tools: calculator, quiz, compare, compatibility</li>
              <li>Topics: love, twin flame, money, career, soulmate, dreams</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-card border border-default">
            <h2 className="text-xl font-bold text-primary mb-4">Quick Facts</h2>
            <ul className="text-secondary space-y-2 text-sm">
              <li><strong className="text-primary">Category:</strong> Numerology / Spirituality</li>
              <li><strong className="text-primary">Primary topics:</strong> Angel numbers, life path, personal year, compatibility</li>
              <li><strong className="text-primary">Audience:</strong> Seekers of spiritual meaning, timing, and relationship clarity</li>
              <li><strong className="text-primary">Location:</strong> Online — spiritnumeral.com</li>
            </ul>
          </div>
        </section>

        {/* Compact keywords (for headlines & sitelinks) */}
        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-2">Compact Keywords</h2>
          <p className="text-muted text-sm mb-4">
            Short, descriptive phrases for headlines, subheads, and link text. Use these when you reference Spirit Numeral or link to specific pages—they help search engines and readers understand context at a glance (and can support sitelinks in search results).
          </p>
          <div className="flex flex-wrap gap-2">
            {compactKeywords.map((k) => (
              <span key={k} className="px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-primary text-sm font-medium">
                {k}
              </span>
            ))}
          </div>
        </section>

        {/* Preferred keywords (broader) */}
        <section className="p-6 rounded-3xl bg-card border border-default">
          <h2 className="text-xl font-bold text-primary mb-4">Preferred Keywords (broader)</h2>
          <div className="flex flex-wrap gap-2">
            {['Numerology', 'Angel Numbers', 'Life Path', 'Personal Year', 'Compatibility', 'Spiritual Readings', 'Numerology Calculator', 'Twin Flame', 'Soulmate'].map((k) => (
              <span key={k} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-secondary text-xs">
                {k}
              </span>
            ))}
          </div>
        </section>

        {/* Suggested links with absolute URLs */}
        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Suggested Links</h2>
          <p className="text-muted text-sm mb-4">Use these URLs when linking to Spirit Numeral.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {suggestedLinks.map((link) => (
              <CopyBlock key={link.href} text={link.url}>
                <Link href={link.href} className="text-amber-600 hover:underline font-medium">
                  {link.label}
                </Link>
                <p className="text-muted text-xs mt-1 break-all">{link.url}</p>
              </CopyBlock>
            ))}
          </div>
        </section>

        {/* Usage guidelines */}
        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Usage Guidelines</h2>
          <ul className="text-secondary space-y-3 text-sm">
            <li><strong className="text-primary">Credit:</strong> Please use “Spirit Numeral” as the name and link to spiritnumeral.com when referencing our tools or content.</li>
            <li><strong className="text-primary">Logo:</strong> You may use our logo (see Media Assets) in articles and roundups. Do not alter colors or proportions.</li>
            <li><strong className="text-primary">Links:</strong> Prefer the suggested links above so readers land on the most relevant page (e.g. Angel Number Library, Life Path Calculator).</li>
            <li><strong className="text-primary">Embargo:</strong> We do not require embargo for press; contact us if you need quotes or an interview.</li>
          </ul>
        </section>

        {/* Media assets with absolute URLs */}
        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Media Assets</h2>
          <p className="text-secondary text-sm mb-4">Right‑click and save, or use the URLs for embeds.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href={`${siteUrl}/favicon.svg`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-default bg-page/60 px-4 py-4 text-sm text-secondary hover:border-amber-500/60 transition flex items-center gap-3"
            >
              <img src="/favicon.svg" alt="Spirit Numeral icon" className="w-10 h-10" width={40} height={40} />
              <span>Icon / Favicon (SVG)</span>
            </a>
            <a
              href={`${siteUrl}/logo.svg`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-default bg-page/60 px-4 py-4 text-sm text-secondary hover:border-amber-500/60 transition flex items-center gap-3"
            >
              <img src="/logo.svg" alt="Spirit Numeral" className="h-8 w-auto" width={120} height={32} />
              <span>Logo with wordmark (SVG)</span>
            </a>
            <a
              href={`${siteUrl}/press/opengraph-image`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-default bg-page/60 px-4 py-4 text-sm text-secondary hover:border-amber-500/60 transition"
            >
              OG Image (Press) — for social previews
            </a>
          </div>
        </section>

        {/* Media contact */}
        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Media Contact</h2>
          <p className="text-secondary mb-2">
            For press, interviews, or partnerships:
          </p>
          <CopyBlock text="spiritnumeral@proton.me">
            <a href="mailto:spiritnumeral@proton.me" className="text-amber-600 font-semibold hover:underline">
              spiritnumeral@proton.me
            </a>
          </CopyBlock>
        </section>

        {/* FAQs */}
        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.question}>
                <h3 className="text-lg font-semibold text-primary">{item.question}</h3>
                <p className="text-secondary">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
