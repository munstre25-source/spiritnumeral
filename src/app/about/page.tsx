import Link from 'next/link';

export const metadata = {
  title: 'About Spirit Numeral - Our Mission & Expertise',
  description: 'Learn about the experts behind Spirit Numeral and our mission to provide accurate, spiritual guidance through numerology.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">
          Our Spiritual Mission
        </h1>
        
        <div className="prose prose-invert prose-amber max-w-none space-y-8 text-zinc-300">
          <section>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Who We Are</h2>
            <p className="text-lg leading-relaxed">
              Spirit Numeral was founded by a collective of seasoned numerologists, spiritual seekers, and data enthusiasts dedicated to decoding the cosmic language of numbers. We believe that the universe communicates with us through synchronicity, and angel numbers are the most profound form of that guidance.
            </p>
          </section>

          <section className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl my-12">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Our Expertise</h2>
            <p className="leading-relaxed mb-4">
              With over 15 years of combined experience in Pythagorean and Chaldean numerology, our team meticulously researches the historical and spiritual significance of every number we document. Our readings are not just algorithmic; they are rooted in ancient wisdom and verified spiritual patterns.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>Certified Numerology Practitioners</li>
              <li>Spiritual Mentors with a focus on Synchronicity</li>
              <li>Research-backed spiritual interpretations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Why We Created Spirit Numeral</h2>
            <p className="leading-relaxed">
              In a world filled with digital noise, finding genuine spiritual clarity can be difficult. We created this platform to provide a sanctuary for those seeing repeating numbers like 111, 222, or 444. Our goal is to offer more than just "meanings"—we provide actionable insights for your love life, career, and twin flame journey.
            </p>
          </section>

          <section className="pt-8 border-t border-zinc-900">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Our Commitment to Accuracy</h2>
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
      </div>
    </main>
  );
}
