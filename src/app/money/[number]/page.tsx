import { getPSEODataAsync } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { getClickBankCTA } from '@/lib/utils/clickbank';
import FAQ from '@/components/FAQ';
import { InternalLinks, NavigationLinks, RelatedNumbers } from '@/components/InternalLinks';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 86400;

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
    const { number } = await params;
    const data = await getPSEODataAsync('angel-number', number);

    if (!data) {
        return { title: 'Angel Number Not Found' };
    }

    const title = `Angel Number ${number} Money Meaning: Finance & Abundance in 2026`;
    const description = `What does angel number ${number} mean for money? Discover the financial meaning, abundance guidance, and wealth insights from your angels.`;

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

export default async function MoneyMeaningPage({ params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;
    const data = await getPSEODataAsync('angel-number', number) as any;

    if (!data || !('number' in data)) {
        notFound();
    }

    const faqs = [
        {
            question: `What does ${number} mean for money?`,
            answer: data.money || `Angel number ${number} brings powerful energy to your financial life, signaling abundance and prosperity.`
        },
        {
            question: `Is ${number} a sign of financial abundance?`,
            answer: `Yes, seeing angel number ${number} often indicates that financial blessings are on the way. Your angels are guiding you toward prosperity.`
        },
        {
            question: `What should I do financially when I see ${number}?`,
            answer: `When ${number} appears, focus on abundance mindset, make wise investments, and trust that the universe supports your financial goals.`
        },
        {
            question: `Does ${number} mean I should invest?`,
            answer: `Angel number ${number} encourages thoughtful financial decisions. It's a sign to trust your intuition while making practical money choices.`
        },
        {
            question: `Is ${number} lucky for money?`,
            answer: `Yes, ${number} carries positive financial energy. Your angels are signaling that prosperity is aligning with your path.`
        },
    ];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
    const pagePath = `/money/${number}`;
    const schemas = generateAllSchemas(data, {
        baseUrl: siteUrl,
        path: pagePath,
        breadcrumbTrail: [
            { name: 'Home', url: siteUrl },
            { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
            { name: `${number} Money Meaning`, url: `${siteUrl}${pagePath}` },
        ],
        title: `Angel Number ${number} Money Meaning`,
        description: data.money || `Discover what angel number ${number} means for your finances.`,
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
                        <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
                            Money & Abundance
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-green-200 to-green-500 bg-clip-text text-transparent tracking-tighter">
                            Angel Number {number} Money Meaning
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-green-400/80">
                            Financial Guidance & Prosperity
                        </p>
                        <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            {data.money || `Discover what angel number ${number} reveals about your financial abundance and prosperity.`}
                        </p>
                    </header>

                    <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-green-950/40 via-zinc-900/50 to-zinc-900 border border-green-500/20 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
                            What Does {number} Mean for Your Finances?
                        </h2>
                        <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
                            {data.money || `Angel number ${number} carries a profound message about your financial life. When this number appears, your guardian angels are communicating about money and abundance.`}
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            {data.meaning}
                        </p>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Abundance Mindset
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                When you see {number}, cultivate an abundance mindset. Your thoughts about money directly influence your financial reality.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Financial Opportunities
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                {data.career || `Angel number ${number} often signals new financial opportunities. Stay open to unexpected income streams.`}
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Wise Investments
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                The energy of {number} supports smart financial decisions. Trust your intuition when it comes to investments and savings.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Money Affirmation
                            </h2>
                            <p className="text-zinc-300 leading-relaxed italic">
                                "I am a magnet for financial abundance. Angel number {number} guides me to prosperity and wealth."
                            </p>
                        </div>
                    </section>

                    <FAQ faqs={faqs} title="Money & Finance Questions" />

                    <InternalLinks number={number} currentPage="money" />

                    <RelatedNumbers currentNumber={parseInt(number)} />

                    <NavigationLinks />

                    {(() => {
                        const cta = getClickBankCTA('money');
                        return (
                            <footer className="pt-8 pb-16 space-y-6">
                                <a
                                    href={cta.url}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="group relative overflow-hidden bg-green-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                                    <div className="bg-zinc-950 text-green-500 py-6 rounded-xl font-bold text-xl md:text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-black">
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
