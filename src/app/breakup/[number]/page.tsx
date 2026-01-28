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

    const title = `Angel Number ${number} Breakup Meaning: Healing & Moving On in 2026`;
    const description = `Seeing ${number} after a breakup? Discover the healing meaning, guidance for moving on, and how your angels support you through heartbreak.`;

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

export default async function BreakupMeaningPage({ params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;
    const data = await getPSEODataAsync('angel-number', number) as any;

    if (!data || !('number' in data)) {
        notFound();
    }

    const faqs = [
        {
            question: `What does ${number} mean after a breakup?`,
            answer: data.breakup || `Angel number ${number} brings healing energy and hope during this difficult time.`
        },
        {
            question: `Is ${number} a sign to move on?`,
            answer: `Seeing angel number ${number} after a breakup often indicates that better love awaits you. Trust the healing process.`
        },
        {
            question: `Does ${number} mean my ex will come back?`,
            answer: `${number} encourages you to focus on self-healing first. If reunion is meant to be, it will happen in divine timing.`
        },
        {
            question: `Why do I keep seeing ${number} after my breakup?`,
            answer: `Your angels are sending ${number} to comfort you and remind you that you are never alone during heartbreak.`
        },
        {
            question: `How can ${number} help me heal?`,
            answer: `${number} brings healing energy. Practice self-love, trust the process, and know better days are coming.`
        },
    ];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
    const pagePath = `/breakup/${number}`;
    const schemas = generateAllSchemas(data, {
        baseUrl: siteUrl,
        path: pagePath,
        breadcrumbTrail: [
            { name: 'Home', url: siteUrl },
            { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
            { name: `${number} Breakup Meaning`, url: `${siteUrl}${pagePath}` },
        ],
        title: `Angel Number ${number} Breakup Meaning`,
        description: data.breakup || `Discover what angel number ${number} means during a breakup.`,
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
                        <div className="inline-block px-4 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
                            Healing & Moving On
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-purple-200 to-purple-500 bg-clip-text text-transparent tracking-tighter">
                            Angel Number {number} Breakup Meaning
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-purple-400/80">
                            Guidance Through Heartbreak
                        </p>
                        <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            {data.breakup || `If you're seeing ${number} after a breakup, your angels have an important message for you.`}
                        </p>
                    </header>

                    <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-950/40 via-zinc-900/50 to-zinc-900 border border-purple-500/20 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
                            What Does {number} Mean After a Breakup?
                        </h2>
                        <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
                            {data.breakup || `Angel number ${number} during heartbreak is your angels' way of saying you are supported, loved, and not alone. Better days are coming.`}
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            {data.meaning}
                        </p>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-purple-500/30">
                            <h2 className="text-purple-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Healing Energy
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                {number} brings healing energy to your heart. Allow yourself to grieve while knowing that your angels are supporting you.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-purple-500/30">
                            <h2 className="text-purple-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                New Beginnings
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                This ending is making space for a new beginning. {number} reminds you that better love awaits on the other side.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-purple-500/30">
                            <h2 className="text-purple-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Self-Love First
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                {number} encourages you to focus on self-love during this time. You are worthy of love and happiness.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-purple-500/30">
                            <h2 className="text-purple-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                                Healing Affirmation
                            </h2>
                            <p className="text-zinc-300 leading-relaxed italic">
                                "I release this pain with love. Angel number {number} guides me toward healing and better love."
                            </p>
                        </div>
                    </section>

                    <FAQ faqs={faqs} title="Breakup & Healing Questions" />

                    <InternalLinks number={number} currentPage="breakup" />

                    <RelatedNumbers currentNumber={parseInt(number)} />

                    <NavigationLinks />

                    {(() => {
                        const cta = getClickBankCTA('breakup');
                        return (
                            <footer className="pt-8 pb-16 space-y-6">
                                <a
                                    href={cta.url}
                                    target="_blank"
                                    rel="noopener noreferrer sponsored"
                                    className="group relative overflow-hidden bg-purple-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"></div>
                                    <div className="bg-zinc-950 text-purple-500 py-6 rounded-xl font-bold text-xl md:text-2xl text-center transition-all group-hover:bg-transparent group-hover:text-white">
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
