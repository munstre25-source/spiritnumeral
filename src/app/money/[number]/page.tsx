import { getPSEODataAsync } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { MoneyPaidCTA } from '@/components/MoneyPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';
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

    const title = `${number} Money Meaning: Angel Number for Finance & Abundance`;
    const description = `What does ${number} mean for money? Angel number meaning for finance and abundance.`;

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

            <main className="min-h-screen bg-page text-primary pt-32 md:pt-48 p-8 font-sans">
                <div className="max-w-4xl mx-auto space-y-12">
                    <header className="text-center space-y-4">
                        <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4">
                            Money & Abundance
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-primary font-bold tracking-tighter">
                            Angel Number {number} Money Meaning
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-green-400/80">
                            Financial Guidance & Prosperity
                        </p>
                        <p className="text-2xl text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                            {data.money || `Discover what angel number ${number} reveals about your financial abundance and prosperity.`}
                        </p>
                    </header>

                    <section className="p-10 rounded-[2.5rem] bg-card border border-default">
                        <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">
                            What Does {number} Mean for Your Finances?
                        </h2>
                        <p className="text-xl text-secondary leading-relaxed font-light mb-6">
                            {data.money || `Angel number ${number} carries a profound message about your financial life. When this number appears, your guardian angels are communicating about money and abundance.`}
                        </p>
                        <p className="text-lg text-secondary leading-relaxed">
                            {data.meaning}
                        </p>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Abundance Mindset
                            </h2>
                            <p className="text-secondary leading-relaxed">
                                When you see {number}, cultivate an abundance mindset. Your thoughts about money directly influence your financial reality.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Financial Opportunities
                            </h2>
                            <p className="text-secondary leading-relaxed">
                                {data.career || `Angel number ${number} often signals new financial opportunities. Stay open to unexpected income streams.`}
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Wise Investments
                            </h2>
                            <p className="text-secondary leading-relaxed">
                                The energy of {number} supports smart financial decisions. Trust your intuition when it comes to investments and savings.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-green-500/30">
                            <h2 className="text-green-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Money Affirmation
                            </h2>
                            <p className="text-secondary leading-relaxed italic">
                                "I am a magnet for financial abundance. Angel number {number} guides me to prosperity and wealth."
                            </p>
                        </div>
                    </section>

                    <FAQ faqs={faqs} title="Money & Finance Questions" />

                    <InternalLinks number={number} currentPage="money" />

                    <RelatedNumbers currentNumber={parseInt(number)} />

                    <NavigationLinks />

                    <footer className="pt-8 pb-16 space-y-6">
                        <MoneyPaidCTA number={parseInt(number)} />
                        <AffiliatePromo offer={OFFERS.affiliate_numerologist} context="Prosperity VSL" />
                        <a
                            href={`/meaning/angel-number/${number}`}
                            className="block text-center text-amber-500 hover:text-amber-600 transition-colors"
                        >
                            ← Full Angel Number {number} Meaning
                        </a>
                    </footer>
                </div>
            </main>
        </>
    );
}
