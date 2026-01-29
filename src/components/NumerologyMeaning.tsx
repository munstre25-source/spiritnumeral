import FAQ from '@/components/FAQ';
import { generateFAQSchema } from '@/lib/utils/schema';

type MeaningBlock = {
  title: string;
  body: string;
};

type FAQItem = {
  question: string;
  answer: string;
};

interface NumerologyMeaningProps {
  title: string;
  subtitle?: string;
  meaning: string;
  strengths?: string[];
  challenges?: string[];
  love?: string;
  career?: string;
  advice?: string;
  footer?: React.ReactNode;
  faqs?: FAQItem[];
}

export function NumerologyMeaning({
  title,
  subtitle,
  meaning,
  strengths,
  challenges,
  love,
  career,
  advice,
  footer,
  faqs,
}: NumerologyMeaningProps) {
  const blocks: MeaningBlock[] = [];
  if (love) blocks.push({ title: 'Love & Relationships', body: love });
  if (career) blocks.push({ title: 'Career & Purpose', body: career });
  if (advice) blocks.push({ title: 'What To Do Next', body: advice });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 pt-32 md:pt-40 px-6 pb-20">
      {faqs && faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
        />
      )}
      <div className="max-w-3xl mx-auto space-y-10">
        <header className="text-center space-y-4">
          <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
            Numerology Insight
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-zinc-400 text-lg md:text-xl">{subtitle}</p>
          )}
        </header>

        <section className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
          <p className="text-zinc-300 leading-relaxed text-base md:text-lg">{meaning}</p>
        </section>

        {(strengths?.length || challenges?.length) && (
          <section className="grid md:grid-cols-2 gap-6">
            {strengths?.length ? (
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h2 className="text-amber-400 font-semibold mb-4">Strengths</h2>
                <ul className="text-zinc-300 space-y-2 text-sm md:text-base">
                  {strengths.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
            {challenges?.length ? (
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h2 className="text-amber-400 font-semibold mb-4">Challenges</h2>
                <ul className="text-zinc-300 space-y-2 text-sm md:text-base">
                  {challenges.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        )}

        {blocks.length > 0 && (
          <section className="grid md:grid-cols-2 gap-6">
            {blocks.map((block) => (
              <div key={block.title} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <h2 className="text-amber-400 font-semibold mb-3">{block.title}</h2>
                <p className="text-zinc-300 leading-relaxed text-sm md:text-base">{block.body}</p>
              </div>
            ))}
          </section>
        )}

        {faqs && faqs.length > 0 && <FAQ faqs={faqs} />}

        {footer && (
          <section className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800">
            {footer}
          </section>
        )}
      </div>
    </main>
  );
}
