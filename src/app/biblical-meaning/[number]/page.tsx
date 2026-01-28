import { getPSEODataAsync } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { getClickBankCTA } from '@/lib/utils/clickbank';
import FAQ from '@/components/FAQ';
import { InternalLinks, NavigationLinks, RelatedNumbers } from '@/components/InternalLinks';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number);

  if (!data) {
    return { title: 'Angel Number Not Found' };
  }

  const title = `Angel Number ${number} Biblical Meaning: Scripture & Spiritual Significance`;
  const description = `What does ${number} mean in the Bible? Discover the biblical meaning, scripture references, and spiritual significance of angel number ${number}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

function getBiblicalContext(num: number): { significance: string; verses: string[]; theme: string } {
  const digit = num % 10;
  const sum = num.toString().split('').reduce((a, b) => a + parseInt(b), 0);

  const themes: Record<number, { theme: string; significance: string; verses: string[] }> = {
    1: { theme: 'Unity & New Beginnings', significance: 'In the Bible, the number 1 represents God\'s supremacy and the unity of the Godhead. It signifies new beginnings and divine initiative.', verses: ['Genesis 1:1 - "In the beginning God created..."', 'Deuteronomy 6:4 - "Hear, O Israel: The Lord our God, the Lord is one."'] },
    2: { theme: 'Witness & Partnership', significance: 'Two represents witness and testimony. Jesus sent disciples in pairs. It symbolizes partnership and the establishment of truth through multiple witnesses.', verses: ['Matthew 18:20 - "Where two or three gather in my name..."', 'Ecclesiastes 4:9 - "Two are better than one..."'] },
    3: { theme: 'Divine Completeness', significance: 'Three represents divine completeness and perfection - the Trinity (Father, Son, Holy Spirit). It appears throughout scripture as a number of wholeness.', verses: ['Matthew 28:19 - "...baptizing them in the name of the Father, Son, and Holy Spirit"', '1 John 5:7 - "For there are three that bear witness..."'] },
    4: { theme: 'Creation & Earth', significance: 'Four represents creation and the earthly realm - four seasons, four directions, four elements. It symbolizes God\'s creative works.', verses: ['Revelation 7:1 - "...four angels standing at the four corners of the earth"', 'Ezekiel 37:9 - "...from the four winds, O breath"'] },
    5: { theme: 'Grace & Favor', significance: 'Five symbolizes God\'s grace, goodness, and favor toward humans. It represents divine grace that sustains us.', verses: ['Genesis 43:34 - "Benjamin\'s portion was five times as much"', 'Matthew 14:17 - "...five loaves and two fish"'] },
    6: { theme: 'Humanity & Imperfection', significance: 'Six represents humanity (created on the 6th day) and human weakness. It\'s one short of 7 (perfection), reminding us of our need for God.', verses: ['Genesis 1:31 - "God created mankind on the sixth day"', 'Revelation 13:18 - "...the number of man"'] },
    7: { theme: 'Spiritual Perfection', significance: 'Seven is the number of spiritual perfection and completion. God rested on the 7th day. It appears over 700 times in the Bible.', verses: ['Genesis 2:2 - "By the seventh day God had finished his work"', 'Revelation 1:4 - "...from the seven spirits before his throne"'] },
    8: { theme: 'New Beginnings', significance: 'Eight symbolizes new beginnings, resurrection, and regeneration. Noah\'s family of 8 began the new world after the flood.', verses: ['1 Peter 3:20 - "...eight in all, were saved through water"', '2 Peter 2:5 - "...Noah, the eighth person, a preacher of righteousness"'] },
    9: { theme: 'Divine Completeness', significance: 'Nine represents divine completeness and finality. There are 9 fruits of the Spirit and Jesus died at the 9th hour.', verses: ['Galatians 5:22-23 - "...the fruit of the Spirit is love, joy, peace..."', 'Mark 15:34 - "At the ninth hour Jesus cried out..."'] },
    0: { theme: 'Eternity & Infinity', significance: 'Zero represents God\'s eternal nature, infinite power, and the concept of eternity without beginning or end.', verses: ['Psalm 90:2 - "From everlasting to everlasting you are God"', 'Revelation 1:8 - "I am the Alpha and the Omega..."'] },
  };

  const base = themes[digit] || themes[sum % 10] || themes[1];
  return base;
}

export default async function BiblicalMeaningPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const data = await getPSEODataAsync('angel-number', number) as any;

  if (!data || !('number' in data)) {
    notFound();
  }

  const biblical = getBiblicalContext(parseInt(number));

  const faqs = [
    {
      question: `What does ${number} mean in the Bible?`,
      answer: `The number ${number} in biblical context connects to ${biblical.theme.toLowerCase()}. ${biblical.significance}`
    },
    {
      question: `Is ${number} mentioned in the Bible?`,
      answer: `While ${number} as a specific number may not be directly mentioned, its component digits carry deep biblical significance related to ${biblical.theme.toLowerCase()}.`
    },
    {
      question: `What is the spiritual meaning of ${number} in Christianity?`,
      answer: `For Christians, angel number ${number} can represent divine guidance and God's communication. It reminds believers to seek God's wisdom and trust in His plan.`
    },
    {
      question: `Is seeing ${number} a sign from God?`,
      answer: `Many believers interpret recurring numbers like ${number} as gentle reminders of God's presence and guidance. It encourages spiritual reflection and prayer.`
    },
    {
      question: `What scripture relates to ${number}?`,
      answer: biblical.verses[0] || `Various scriptures relate to the themes of ${number}, particularly those about ${biblical.theme.toLowerCase()}.`
    },
    {
      question: `How should Christians interpret angel number ${number}?`,
      answer: `Christians can view ${number} as a prompt for spiritual reflection, prayer, and alignment with God's will. Always test interpretations against scripture.`
    }
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
  const pagePath = `/biblical-meaning/${number}`;
  const schemas = generateAllSchemas(data, {
    baseUrl: siteUrl,
    path: pagePath,
    breadcrumbTrail: [
      { name: 'Home', url: siteUrl },
      { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
      { name: `${number} Biblical Meaning`, url: `${siteUrl}${pagePath}` },
    ],
    title: `Angel Number ${number} Biblical Meaning`,
    description: `Discover the biblical significance of ${number}.`,
    faqOverride: faqs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumb) }}
      />

      <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-48 p-8 font-sans">
        <div className="max-w-4xl mx-auto space-y-12">
          <header className="text-center space-y-4">
            <div className="inline-block px-4 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-medium mb-4">
              Biblical & Scripture Meaning
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-sky-200 to-sky-500 bg-clip-text text-transparent tracking-tighter">
              Angel Number {number} Biblical Meaning
            </h1>
            <p className="text-sm uppercase tracking-[0.2em] text-sky-400/80">
              Scripture & Spiritual Significance
            </p>
            <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
              Explore the biblical roots and scriptural meaning of angel number {number}.
            </p>
          </header>

          <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-sky-950/40 via-zinc-900/50 to-zinc-900 border border-sky-500/20 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
              {biblical.theme}
            </h2>
            <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
              {biblical.significance}
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              {data.meaning}
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
            <h2 className="text-2xl font-bold mb-6 text-sky-400">Related Scripture</h2>
            <div className="space-y-4">
              {biblical.verses.map((verse, index) => (
                <blockquote key={index} className="pl-6 border-l-2 border-sky-500/50 text-zinc-300 italic">
                  {verse}
                </blockquote>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-sky-500/30">
              <h2 className="text-sky-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                Divine Message
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                When you see {number}, consider it a reminder of God's presence and guidance. Take time for prayer and reflection on His word.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-sky-500/30">
              <h2 className="text-sky-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                Spiritual Growth
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                Angel number {number} encourages spiritual growth and deeper faith. Use this sign to draw closer to God through scripture study.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-sky-500/30">
              <h2 className="text-sky-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                Prayer Focus
              </h2>
              <p className="text-zinc-300 leading-relaxed">
                When {number} appears, pray for wisdom and discernment. Ask God to reveal His purpose and direction for your life.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-sky-500/30">
              <h2 className="text-sky-400 font-bold text-lg mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                Faith Affirmation
              </h2>
              <p className="text-zinc-300 leading-relaxed italic">
                "Lord, thank You for the sign of {number}. Help me understand Your message and walk in Your will. Amen."
              </p>
            </div>
          </section>

          <FAQ faqs={faqs} title="Biblical Meaning Questions" />

          <InternalLinks number={number} currentPage="biblical" />

          <RelatedNumbers currentNumber={parseInt(number)} />

          <NavigationLinks />

          {(() => {
            const cta = getClickBankCTA('biblical');
            return (
              <footer className="pt-8 pb-16 space-y-6">
                <a
                  href={cta.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="group relative overflow-hidden bg-sky-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                  <div className="bg-zinc-950 text-sky-500 py-6 rounded-xl font-bold text-xl md:text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-black">
                    {cta.text}
                  </div>
                </a>
                <p className="text-center text-zinc-500 text-sm">{cta.secondaryText}</p>
                <a
                  href={`/meaning/angel-number/${number}`}
                  className="block text-center text-amber-500 hover:text-amber-400 transition-colors"
                >
                  ← Full Angel Number {number} Meaning
                </a>
              </footer>
            );
          })()}
        </div>
      </main>
    </>
  );
}
