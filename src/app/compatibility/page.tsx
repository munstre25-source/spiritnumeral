import { Metadata } from 'next';
import { CompatibilityCalculator } from '@/components/CompatibilityCalculator';
import { getClickBankCTA } from '@/lib/utils/clickbank';

export const metadata: Metadata = {
    title: 'Numerology Compatibility Calculator - Life Path Love Match',
    description: 'Calculate your numerology love compatibility. Enter two birthdays to discover your life path compatibility score and relationship insights.',
    alternates: {
        canonical: '/compatibility',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How does numerology compatibility work?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Numerology compatibility compares life path numbers, calculated from birth dates. Each number has specific traits, and certain combinations naturally harmonize while others require more understanding and effort.'
            }
        },
        {
            '@type': 'Question',
            name: 'What is a good compatibility score?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Scores above 85% indicate excellent natural compatibility. 70-84% is good with some differences to navigate. 55-69% is moderate, requiring effort. Below 55% is challenging but growth-oriented.'
            }
        },
        {
            '@type': 'Question',
            name: 'Can incompatible numbers have successful relationships?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Absolutely. Numerology compatibility shows natural tendencies, not fate. Many successful relationships exist between "incompatible" numbers through understanding, communication, and mutual respect.'
            }
        }
    ]
};

export default function CompatibilityPage() {
    const cta = getClickBankCTA('soulmate');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-6">
                            Love Compatibility
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-rose-100 to-rose-400 bg-clip-text text-transparent tracking-tighter mb-4">
                            Are Your Numbers Compatible?
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            Discover the numerological compatibility between you and your partner based on your life path numbers.
                        </p>
                    </header>

                    <CompatibilityCalculator />

                    {/* CTA Section */}
                    <section className="mt-16 max-w-xl mx-auto">
                        <a
                            href={cta.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="group relative overflow-hidden bg-gradient-to-r from-rose-500 to-pink-500 p-1 rounded-2xl transition-all hover:scale-[1.02] block"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                            <div className="bg-zinc-950 text-rose-400 py-6 rounded-xl font-bold text-xl text-center transition-all group-hover:bg-transparent group-hover:text-white">
                                {cta.text}
                            </div>
                        </a>
                        <p className="text-center text-zinc-600 text-sm mt-4">
                            {cta.secondaryText}
                        </p>
                    </section>

                    {/* FAQ Section */}
                    <section className="mt-20 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-white mb-8 text-center">
                            Understanding Compatibility
                        </h2>
                        <div className="space-y-6">
                            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                                    How does numerology compatibility work?
                                </h3>
                                <p className="text-zinc-400">
                                    Numerology compatibility compares life path numbers, calculated from birth dates.
                                    Each number has specific traits, and certain combinations naturally harmonize
                                    while others require more understanding and effort.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                                    What is a good compatibility score?
                                </h3>
                                <p className="text-zinc-400">
                                    Scores above 85% indicate excellent natural compatibility. 70-84% is good with
                                    some differences to navigate. 55-69% is moderate, requiring effort. Below 55%
                                    is challenging but growth-oriented.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                                <h3 className="text-lg font-semibold text-zinc-200 mb-2">
                                    Can incompatible numbers have successful relationships?
                                </h3>
                                <p className="text-zinc-400">
                                    Absolutely. Numerology compatibility shows natural tendencies, not fate.
                                    Many successful relationships exist between "incompatible" numbers through
                                    understanding, communication, and mutual respect.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}

