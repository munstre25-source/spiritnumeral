import Link from 'next/link';
import { Metadata } from 'next';
import dataset from '@/lib/data/spirituality-dataset.json';

export const metadata: Metadata = {
  title: 'Number Meanings Hub | Spirit Numeral',
  description:
    'Jump to any angel number or life path meaning. See top searched numbers, popular picks, and shortcuts to detailed meanings, why-you-keep-seeing pages, and twin flame insights.',
};

// GSC data: high impressions, 0 or low CTR. Surface these first to capture demand (Queries.csv by impressions).
const gscTopQueries = [665, 183, 579, 2015, 1321, 774, 480, 901, 913, 1404];
// Evergreen popular numbers to round out the grid and avoid a thin list.
const popularAnchors = [111, 222, 333, 444, 555, 777];

export default function MeaningHubPage() {
  const gscCards = gscTopQueries.map((num) => {
    const found = dataset.angel_numbers.find((item) => Number(item.number) === num);
    return (
      found || {
        number: num,
        meaning: 'Discover the guidance behind this angel number.',
        love: 'Understand what this number is telling you about relationships.',
        career: 'Learn how this number influences your career path.',
        ['2026_prediction']: 'See the outlook for the year ahead.',
      }
    );
  });

  const popularCards = popularAnchors
    .map((num) => dataset.angel_numbers.find((item) => Number(item.number) === num))
    .filter(Boolean);

  return (
    <main className="min-h-screen bg-page text-primary pt-28 md:pt-36 pb-24 px-6 md:px-10">
      <section className="max-w-6xl mx-auto text-center space-y-6 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold">
          Meanings Hub
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-primary font-bold">
          All Number Meanings in One Place
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
          Dive into every angel number and life path meaning. We surface live demand from Google
          Search Console plus evergreen popular numbers, with shortcuts to deep dives, warning checks,
          and twin flame insights.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/meaning/angel-number"
            className="bg-amber-500 text-black px-5 py-3 rounded-xl font-semibold transition hover:bg-amber-400"
          >
            Browse Angel Numbers
          </Link>
          <Link
            href="/meaning/life-path"
            className="px-5 py-3 rounded-xl border border-default text-secondary hover:border-amber-500/60 transition"
          >
            Browse Life Paths
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 mb-16">
        <article className="p-6 rounded-3xl bg-card border border-default hover:border-amber-500/40 transition shadow-lg">
          <div className="text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
            Angel Numbers
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Angel number meanings (111-999)</h2>
          <p className="text-secondary leading-relaxed mb-4">
            Meanings, love, career, outlooks, warnings, and twin flame insights for every triple
            digit.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/meaning/angel-number"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
            >
              View all angel numbers
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/why-am-i-seeing/111"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-default text-secondary hover:border-amber-500/60 transition"
            >
              Why am I seeing 111?
            </Link>
          </div>
        </article>

        <article className="p-6 rounded-3xl bg-card border border-default hover:border-amber-500/40 transition shadow-lg">
          <div className="text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold mb-3">
            Life Paths
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Life Path meanings (1-9)</h2>
          <p className="text-secondary leading-relaxed mb-4">
            Core traits, love and career guidance, and year-ahead outlooks for every Life Path
            number—plus a calculator to find yours.
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/meaning/life-path"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500 text-black font-semibold hover:bg-amber-400 transition"
            >
              View all Life Paths
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-default text-secondary hover:border-amber-500/60 transition"
            >
              Calculate my number
            </Link>
          </div>
        </article>
      </section>

      <section className="max-w-6xl mx-auto space-y-10">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold mb-4">
            Top searched right now (GSC)
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            People are asking about these numbers
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {gscCards.map((item) => (
              <article
                key={item.number}
                className="p-5 rounded-3xl bg-card border border-default hover:border-amber-500/40 transition shadow-lg flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold">
                    {item.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs border border-amber-500/30">
                    Angel Number
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary leading-tight">
                  Angel Number {item.number} Meaning
                </h3>
                <p className="text-sm text-secondary leading-relaxed line-clamp-2">
                  {item.meaning}
                </p>
                <p className="text-sm text-secondary leading-relaxed line-clamp-2">Love: {item.love}</p>
                <p className="text-sm text-secondary leading-relaxed line-clamp-2">
                  Career: {item.career}
                </p>
                <div className="text-xs text-secondary">Outlook: {item['2026_prediction']}</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    href={`/meaning/angel-number/${item.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition"
                  >
                    Angel {item.number} meaning <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href={`/why-am-i-seeing/${item.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-default text-secondary text-sm hover:border-amber-500/60 transition"
                  >
                    Why I&apos;m seeing {item.number}
                  </Link>
                  <Link
                    href={`/is-${item.number}-a-warning/${item.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-default text-secondary text-sm hover:border-amber-500/60 transition"
                  >
                    Is {item.number} a warning?
                  </Link>
                  <Link
                    href={`/${item.number}-twin-flame/${item.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-default text-secondary text-sm hover:border-amber-500/60 transition"
                  >
                    {item.number} twin flame
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 text-sm font-semibold mb-4">
            Popular picks
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
            Evergreen angel numbers everyone checks
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {popularCards.map((item) => (
              <article
                key={item?.number}
                className="p-5 rounded-3xl bg-card border border-default hover:border-amber-500/40 transition shadow-lg flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-[0.2em] text-amber-600 font-semibold">
                    {item?.number}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs border border-amber-500/30">
                    Angel Number
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary leading-tight">
                  Angel Number {item?.number} Meaning
                </h3>
                <p className="text-sm text-secondary leading-relaxed line-clamp-2">
                  {item?.meaning}
                </p>
                <p className="text-sm text-secondary leading-relaxed line-clamp-2">Love: {item?.love}</p>
                <p className="text-sm text-secondary leading-relaxed line-clamp-2">
                  Career: {item?.career}
                </p>
                <div className="text-xs text-secondary">Outlook: {item?.['2026_prediction']}</div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    href={`/meaning/angel-number/${item?.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition"
                  >
                    Angel {item?.number} meaning <span aria-hidden>→</span>
                  </Link>
                  <Link
                    href={`/why-am-i-seeing/${item?.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-default text-secondary text-sm hover:border-amber-500/60 transition"
                  >
                    Why I&apos;m seeing {item?.number}
                  </Link>
                  <Link
                    href={`/is-${item?.number}-a-warning/${item?.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-default text-secondary text-sm hover:border-amber-500/60 transition"
                  >
                    Is {item?.number} a warning?
                  </Link>
                  <Link
                    href={`/${item?.number}-twin-flame/${item?.number}`}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-default text-secondary text-sm hover:border-amber-500/60 transition"
                  >
                    {item?.number} twin flame
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
