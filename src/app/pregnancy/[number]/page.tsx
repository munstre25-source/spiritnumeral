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

    const title = `Angel Number ${number} Pregnancy Meaning: Fertility & New Life in 2026`;
    const description = `What does angel number ${number} mean for pregnancy? Discover the fertility meaning, conception guidance, and family blessings from your angels.`;

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

export default async function PregnancyMeaningPage({ params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;
    const data = await getPSEODataAsync('angel-number', number) as any;

    if (!data || !('number' in data)) {
        notFound();
    }

    const faqs = [
        {
            question: `What does ${number} mean for pregnancy?`,
            answer: data.pregnancy || `Angel number ${number} brings powerful fertility energy and blessings for conception.`
        },
        {
            question: `Is ${number} a sign of pregnancy?`,
            answer: `Seeing angel number ${number} can indicate fertility blessings and divine timing for starting or growing your family.`
        },
        {
            question: `Does ${number} mean I will conceive soon?`,
            answer: `Angel number ${number} is a positive sign for conception. Trust in divine timing and the support of your angels.`
        },
        {
            question: `What does ${number} mean for trying to conceive?`,
            answer: `If you're trying to conceive, ${number} is encouragement from your angels that your desires are being heard.`
        },
        {
            question: `Is ${number} lucky for fertility?`,
            answer: `Yes, ${number} carries creation energy that supports fertility, pregnancy, and welcoming new life.`
        },
    ];

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://spiritnumeral.com';
    const pagePath = `/pregnancy/${number}`;
    const schemas = generateAllSchemas(data, {
        baseUrl: siteUrl,
        path: pagePath,
        breadcrumbTrail: [
            { name: 'Home', url: siteUrl },
            { name: 'Angel Numbers', url: `${siteUrl}/meaning/angel-number` },
            { name: `${number} Pregnancy Meaning`, url: `${siteUrl}${pagePath}` },
        ],
        title: `Angel Number ${number} Pregnancy Meaning`,
        description: data.pregnancy || `Discover what angel number ${number} means for pregnancy.`,
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
                        <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
                            Fertility & New Life
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-b from-cyan-200 to-cyan-500 bg-clip-text text-transparent tracking-tighter">
                            Angel Number {number} Pregnancy Meaning
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400/80">
                            Fertility, Conception & Family Blessings
                        </p>
                        <p className="text-2xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            {data.pregnancy || `Discover what angel number ${number} reveals about fertility and new life.`}
                        </p>
                    </header>

                    <section className="p-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-950/40 via-zinc-900/50 to-zinc-900 border border-cyan-500/20 shadow-2xl">
                        <h2 className="text-3xl font-bold mb-6 text-white tracking-tight">
                            What Does {number} Mean for Pregnancy?
                        </h2>
                        <p className="text-xl text-zinc-300 leading-relaxed font-light mb-6">
                            {data.pregnancy || `Angel number ${number} carries a profound message about fertility and new beginnings. When this number appears, your guardian angels are sending creation energy.`}
                        </p>
                        <p className="text-lg text-zinc-400 leading-relaxed">
                            {data.meaning}
                        </p>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-cyan-500/30">
                            <h2 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Fertility Blessings
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                When you see {number}, know that fertility blessings are being sent your way. Your angels support your desire for children.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-cyan-500/30">
                            <h2 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Divine Timing
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                {number} reminds you to trust divine timing for conception. Everything is unfolding perfectly in the universe's plan.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-cyan-500/30">
                            <h2 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Healthy Pregnancy
                            </h2>
                            <p className="text-zinc-300 leading-relaxed">
                                If you're already pregnant, {number} is a sign that your angels are watching over you and your baby with love.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm transition-all hover:border-cyan-500/30">
                            <h2 className="text-cyan-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                                Fertility Affirmation
                            </h2>
                            <p className="text-zinc-300 leading-relaxed italic">
                                "My body is ready to create new life. Angel number {number} blesses my fertility journey."
                            </p>
                        </div>
                    </section>

                    <FAQ faqs={faqs} title="Pregnancy & Fertility Questions" />

                    <InternalLinks number={number} currentPage="pregnancy" />

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
