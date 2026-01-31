import Link from 'next/link';
import { generateFAQSchema } from '@/lib/utils/schema';

export const metadata = {
  title: 'Press Kit | Spirit Numeral',
  description: 'Official press kit for Spirit Numeral: brand description, keywords, assets, and media contact.',
  alternates: { canonical: '/press' },
  openGraph: {
    title: 'Press Kit | Spirit Numeral',
    description: 'Official press kit for Spirit Numeral: brand description, keywords, assets, and media contact.',
    images: ['/press/opengraph-image'],
  },
};

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
      answer: 'Use https://spiritnumeral.com and, when relevant, link to /quiz, /compare, /meaning/angel-number, or /meaning/life-path.',
    },
  ];

  return (
    <main className="min-h-screen bg-page text-primary pt-32 md:pt-40 px-6 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />
      <div className="max-w-5xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-primary text-sm font-semibold">
            Official Press Kit
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-primary">Spirit Numeral Press Kit</h1>
          <p className="text-secondary text-lg">
            Copy-ready brand description, keywords, assets, and media contact.
          </p>
        </header>

        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Brand Description (Copy‑Ready)</h2>
          <p className="text-secondary leading-relaxed">
            Spirit Numeral is a modern numerology platform that helps people decode angel numbers, life paths,
            and timing cycles with clear, practical interpretations. We combine numerology traditions with
            personalized insights so seekers can understand love, money, career, and purpose through their numbers.
          </p>
        </section>

        <section className="grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-card border border-default">
            <h2 className="text-xl font-bold text-primary mb-4">Quick Facts</h2>
            <ul className="text-secondary space-y-2 text-sm">
              <li>Category: Numerology / Spirituality</li>
              <li>Primary Topics: Angel numbers, life path, personal year, compatibility</li>
              <li>Audience: Seekers of spiritual meaning, timing, and relationship clarity</li>
              <li>Location: Online</li>
            </ul>
          </div>
          <div className="p-6 rounded-3xl bg-card border border-default">
            <h2 className="text-xl font-bold text-primary mb-4">Preferred Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {['Numerology', 'Angel Numbers', 'Life Path', 'Personal Year', 'Compatibility', 'Spiritual Readings', 'Numerology Calculator'].map((k) => (
                <span key={k} className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-secondary text-xs">
                  {k}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Suggested Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { href: '/', label: 'Homepage' },
              { href: '/quiz', label: 'Personalized Quiz' },
              { href: '/compare', label: 'Compare Numbers' },
              { href: '/meaning/angel-number', label: 'Angel Number Library' },
              { href: '/meaning/life-path', label: 'Life Path Meanings' },
              { href: '/blog', label: 'Blog' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-2xl border border-default bg-page/60 px-4 py-3 text-sm text-secondary hover:border-amber-500/60 transition"
              >
                {link.label}
                <span className="text-primary">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Media Assets</h2>
          <p className="text-secondary text-sm mb-4">Right‑click and save. Use these for articles and embeds.</p>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="/favicon.svg"
              className="rounded-2xl border border-default bg-page/60 px-4 py-4 text-sm text-secondary hover:border-amber-500/60 transition"
            >
              Icon / Favicon (SVG) — /favicon.svg
            </a>
            <a
              href="/logo.svg"
              className="rounded-2xl border border-default bg-page/60 px-4 py-4 text-sm text-secondary hover:border-amber-500/60 transition"
            >
              Full logo with wordmark (SVG) — /logo.svg
            </a>
            <a
              href="/opengraph-image"
              className="rounded-2xl border border-default bg-page/60 px-4 py-4 text-sm text-secondary hover:border-amber-500/60 transition"
            >
              OG Image — /opengraph-image
            </a>
          </div>
        </section>

        <section className="p-6 md:p-8 rounded-3xl bg-card border border-default">
          <h2 className="text-2xl font-bold text-primary mb-4">Media Contact</h2>
          <p className="text-secondary">
            For press, interviews, or partnerships, contact:
          </p>
          <p className="mt-2 text-secondary font-semibold">spiritnumeral@proton.me</p>
        </section>

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
