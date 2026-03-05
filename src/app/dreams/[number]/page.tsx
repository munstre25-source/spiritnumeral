import { getPSEODataAsync } from '@/lib/utils/pseo';
import { generateAllSchemas } from '@/lib/utils/schema';
import FAQ from '@/components/FAQ';
import { PsychicPromo } from '@/components/PsychicPromo';
import { InternalLinks, NavigationLinks, RelatedNumbers } from '@/components/InternalLinks';
import { getIndexingPolicy } from '@/lib/seo/indexing-policy';
import { getStaticParamsForRoute } from '@/lib/seo/static-params';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ensureAbsoluteUrl, getSiteBaseUrl } from '@/lib/utils/url';

export const dynamicParams = false;
export const revalidate = false;

export async function generateStaticParams() {
    return getStaticParamsForRoute('dreams');
}

export async function generateMetadata({ params }: { params: Promise<{ number: string }> }): Promise<Metadata> {
    const { number } = await params;
    const data = await getPSEODataAsync('angel-number', number);

    if (!data) {
        return { title: 'Angel Number Not Found' };
    }

    const title = `Angel Number ${number} in Dreams: Dream Meaning & Interpretation`;
    const description = `Seeing ${number} in your dreams? Discover the spiritual dream meaning, subconscious messages, and what your angels are telling you.`;
    const siteUrl = getSiteBaseUrl();
    const pagePath = `/dreams/${number}`;
    const indexingPolicy = getIndexingPolicy(pagePath);

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'article',
            url: ensureAbsoluteUrl(siteUrl, pagePath),
        },
        alternates: {
            canonical: ensureAbsoluteUrl(siteUrl, indexingPolicy.canonicalPath),
        },
        robots: indexingPolicy.robots,
    };
}

export default async function DreamMeaningPage({ params }: { params: Promise<{ number: string }> }) {
    const { number } = await params;
    const data = await getPSEODataAsync('angel-number', number) as any;

    if (!data || !('number' in data)) {
        notFound();
    }

    const faqs = [
        {
            question: `What does it mean to see ${number} in a dream?`,
            answer: data.dreams || `Seeing ${number} in dreams carries amplified spiritual significance and messages from your subconscious.`
        },
        {
            question: `Is dreaming of ${number} a message from angels?`,
            answer: `Yes, dreams are a powerful way for angels to communicate. Seeing ${number} in dreams is a direct spiritual message.`
        },
        {
            question: `Should I be concerned about dreaming of ${number}?`,
            answer: `No, dreaming of ${number} is generally positive. It indicates spiritual guidance and important messages from the divine.`
        },
        {
            question: `How do I interpret ${number} in my dreams?`,
            answer: `Pay attention to the emotions and context of the dream. ${number} combined with your feelings reveals the full message.`
        },
        {
            question: `What should I do after dreaming of ${number}?`,
            answer: `Write down your dream immediately, meditate on the message, and trust your intuitive understanding of what it means.`
        },
    ];

    const siteUrl = getSiteBaseUrl();
    const pagePath = `/dreams/${number}`;
    const schemas = generateAllSchemas(data, {
        baseUrl: siteUrl,
        path: pagePath,
        breadcrumbTrail: [
            { name: 'Home', url: siteUrl },
            { name: 'Angel Numbers', url: ensureAbsoluteUrl(siteUrl, '/meaning/angel-number') },
            { name: `${number} Dream Meaning`, url: ensureAbsoluteUrl(siteUrl, pagePath) },
        ],
        title: `Angel Number ${number} Dream Meaning`,
        description: data.dreams || `Discover what seeing ${number} in dreams means.`,
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
                        <div className="inline-block px-4 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
                            Dreams & Subconscious
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-primary font-bold tracking-tighter">
                            Angel Number {number} in Dreams
                        </h1>
                        <p className="text-sm uppercase tracking-[0.2em] text-amber-400/80">
                            Dream Interpretation & Messages
                        </p>
                        <p className="text-2xl text-secondary font-light max-w-2xl mx-auto leading-relaxed">
                            {data.dreams || `Discover what seeing ${number} in your dreams reveals about your spiritual path.`}
                        </p>
                    </header>

                    <section className="p-10 rounded-[2.5rem] bg-card border border-default">
                        <h2 className="text-3xl font-bold mb-6 text-primary tracking-tight">
                            What Does {number} Mean in Dreams?
                        </h2>
                        <p className="text-xl text-secondary leading-relaxed font-light mb-6">
                            {data.dreams || `Seeing angel number ${number} in your dreams is a powerful sign. Your subconscious mind is receiving spiritual messages that your waking mind may not be ready to hear.`}
                        </p>
                        <p className="text-lg text-secondary leading-relaxed">
                            {data.meaning}
                        </p>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-amber-500/30">
                            <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Subconscious Messages
                            </h2>
                            <p className="text-secondary leading-relaxed">
                                Dreams featuring {number} often reveal what your subconscious already knows. Pay attention to recurring themes.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-amber-500/30">
                            <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Spirit Communication
                            </h2>
                            <p className="text-secondary leading-relaxed">
                                Your spirit guides may use {number} in dreams to communicate directly with you when you're most receptive.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-amber-500/30">
                            <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Dream Journaling
                            </h2>
                            <p className="text-secondary leading-relaxed">
                                Keep a dream journal by your bed. Record every instance of {number} appearing and the context for deeper insights.
                            </p>
                        </div>
                        <div className="p-8 rounded-3xl bg-card border border-default backdrop-blur-sm transition-all hover:border-amber-500/30">
                            <h2 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Dream Affirmation
                            </h2>
                            <p className="text-secondary leading-relaxed italic">
                                "I am open to receiving messages in my dreams. Angel number {number} speaks to my higher self."
                            </p>
                        </div>
                    </section>

                    <div className="mt-8">
                        <PsychicPromo label="Psychic After Content" />
                    </div>

                    <FAQ faqs={faqs} title="Dream Interpretation Questions" />

                    <InternalLinks number={number} currentPage="dreams" />

                    <RelatedNumbers currentNumber={parseInt(number)} />

                    <NavigationLinks />

                    <footer className="pt-8 pb-16 space-y-6">
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
