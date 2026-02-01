import { Metadata } from 'next';
import { CompatibilityCalculator } from '@/components/CompatibilityCalculator';
import { PsychicPromo } from '@/components/PsychicPromo';

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
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-elevated border border-default text-muted text-sm font-medium mb-6">
                            Love Compatibility
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary font-bold tracking-tighter mb-4">
                            Are Your Numbers Compatible?
                        </h1>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            Discover the numerological compatibility between you and your partner based on your life path numbers.
                        </p>
                    </header>

                    <CompatibilityCalculator />

                    <div className="mt-10">
                        <PsychicPromo
                            contextualLine="If you're curious about your relationship path, a short psychic reading can add clarity."
                            label="Psychic After Content"
                        />
                    </div>

                    {/* FAQ Section */}
                    <section className="mt-20 max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-primary mb-8 text-center">
                            Understanding Compatibility
                        </h2>
                        <div className="space-y-6">
                            <div className="p-6 rounded-xl bg-card border border-default">
                                <h3 className="text-lg font-semibold text-secondary mb-2">
                                    How does numerology compatibility work?
                                </h3>
                                <p className="text-secondary">
                                    Numerology compatibility compares life path numbers, calculated from birth dates.
                                    Each number has specific traits, and certain combinations naturally harmonize
                                    while others require more understanding and effort.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl bg-card border border-default">
                                <h3 className="text-lg font-semibold text-secondary mb-2">
                                    What is a good compatibility score?
                                </h3>
                                <p className="text-secondary">
                                    Scores above 85% indicate excellent natural compatibility. 70-84% is good with
                                    some differences to navigate. 55-69% is moderate, requiring effort. Below 55%
                                    is challenging but growth-oriented.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl bg-card border border-default">
                                <h3 className="text-lg font-semibold text-secondary mb-2">
                                    Can incompatible numbers have successful relationships?
                                </h3>
                                <p className="text-secondary">
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
