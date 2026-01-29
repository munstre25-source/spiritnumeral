import { getPSEODataAsync } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';
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

    const title = `Angel Number ${number} Soulmate Meaning: Finding True Love in 2026`;
    const description = `What does angel number ${number} mean for soulmates? Discover the soulmate signs, destined love meaning, and romantic guidance from your angels.`;

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

export default async function SoulmateMeaningPage({ params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;
    const data = await getPSEODataAsync('angel-number', number) as any;

    if (!data || !('number' in data)) {
        notFound();
    }

    const faqs = [
        {
            question: `What does ${number} mean for soulmates?`,
            answer: data.soulmate || `Angel number ${number} brings powerful energy for soulmate connections and destined love.`
        },
        {
            question: `Is ${number} a sign my soulmate is coming?`,
            answer: `Yes, seeing angel number ${number} often indicates that your soulmate is on their way or already present in your life.`
        },
        {
            question: `How do I recognize my soulmate with ${number}?`,
            answer: `When ${number} appears, pay attention to new people entering your life. Your soulmate may show up in unexpected ways.`
        },
        {
            question: `Does ${number} mean I've met my soulmate?`,
            answer: `Angel number ${number} can confirm that someone special is your soulmate. Trust your deep connection and intuition.`
        },
        {
            question: `What should I do when I see ${number} regarding love?`,
            answer: `Stay open to love, trust divine timing, and believe that your soulmate journey is unfolding perfectly.`
        },
    ];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
    const pagePath = `/soulmate/${number}`;
    const schemas = generateAllSchemas(data, {
        baseUrl: siteUrl,
        path: pagePath,
        breadcrumbTrail: [
            { name: 'Home', url: siteUrl },
            { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
            { name: `${number} Soulmate Meaning`, url: `${siteUrl}${pagePath}` },
        ],
        title: `Angel Number ${number} Soulmate Meaning`,
        description: data.soulmate || `Discover what angel number ${number} means for soulmates.`,
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
                        <div className="inline-block px-4 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-4">
                            Soulmate Connection
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-rose-200 to-rose-500 bg-clip-text text-transparent tracking-tighter">
                            Angel Number {number} Soulmate Meaning
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-rose-400/80">
                            Destined Love & Soul Connections
                        </p>
                        <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            {data.soulmate || `Discover what angel number ${number} reveals about your soulmate connection.`}
                        </p>
                    </header>

                    <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-rose-950/40 via-zinc-900/50 to-zinc-900 border border-rose-500/20 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
                            What Does {number} Mean for Soulmates?
                        </h2>
                        <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
                            {data.soulmate || `Angel number ${number} carries a profound message about your soulmate journey. When this number appears, your guardian angels are guiding you toward destined love.`}
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            {data.love}
                        </p>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-rose-500/30">
                            <h2 className="text-rose-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Soul Recognition
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                When you see {number}, you may experience instant recognition when meeting your soulmate. Trust these powerful feelings.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-rose-500/30">
                            <h2 className="text-rose-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Divine Timing
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                {number} reminds you that soulmate connections happen in divine timing. Your perfect partner is being prepared for you.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-rose-500/30">
                            <h2 className="text-rose-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Past Life Connection
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                {data.twin_flame || `Angel number ${number} may indicate a past life connection with your soulmate, explaining your deep bond.`}
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-rose-500/30">
                            <h2 className="text-rose-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                                Soulmate Affirmation
                            </h2>
                            <p className="text-zinc-300 leading-relaxed italic">
                                "I am worthy of deep, soulmate love. Angel number {number} is guiding me to my destined partner."
                            </p>
                        </div>
                    </section>

                    <FAQ faqs={faqs} title="Soulmate Questions" />

                    <InternalLinks number={number} currentPage="soulmate" />

                    <RelatedNumbers currentNumber={parseInt(number)} />

                    <NavigationLinks />

                    <footer className="pt-8 pb-16 space-y-6">
                        <MeaningPaidCTA number={parseInt(number)} />
                        <a
                            href={`/meaning/angel-number/${number}`}
                            className="block text-center text-amber-500 hover:text-amber-400 transition-colors"
                        >
                            ← Full Angel Number {number} Meaning
                        </a>
                    </footer>
                </div>
            </main>
        </>
    );
}
