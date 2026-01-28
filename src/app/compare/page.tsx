import { Metadata } from 'next';
import { NumberComparison } from '@/components/NumberComparison';
import { getClickBankCTA } from '@/lib/utils/clickbank';

export const metadata: Metadata = {
    title: 'Compare Angel Numbers - Side by Side Analysis',
    description: 'Compare two angel numbers side by side. Discover how different numbers relate to each other and what their combined message means for you.',
    alternates: {
        canonical: '/compare',
    },
};

const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Compare Angel Numbers',
    description: 'Learn how to compare two angel numbers to understand their combined spiritual message.',
    step: [
        {
            '@type': 'HowToStep',
            name: 'Enter the first angel number',
            text: 'Type the first angel number you want to compare (0-2222).',
        },
        {
            '@type': 'HowToStep',
            name: 'Enter the second angel number',
            text: 'Type the second angel number you want to compare.',
        },
        {
            '@type': 'HowToStep',
            name: 'Click Compare',
            text: 'Click the Compare Numbers button to see the side-by-side analysis.',
        },
        {
            '@type': 'HowToStep',
            name: 'Review the compatibility score',
            text: 'Review the spiritual compatibility percentage and combined message.',
        },
    ],
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'Can I see two different angel numbers at the same time?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes, seeing multiple angel numbers is common and meaningful. Each number carries its own message, and together they create a combined spiritual guidance.',
            },
        },
        {
            '@type': 'Question',
            name: 'What does it mean when two angel numbers appear together?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'When two angel numbers appear together, their energies combine. The comparison tool helps you understand how their meanings interact and what the combined message is for your life.',
            },
        },
    ],
};

export default function ComparePage() {
    const cta = getClickBankCTA('numerology');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main className="min-h-screen pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                            Number Analysis
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter mb-4">
                            Compare Angel Numbers
                        </h1>
                        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                            See how two angel numbers relate to each other and discover their combined spiritual message.
                        </p>
                    </header>

                    <NumberComparison />

                    {/* CTA Section */}
                    <section className="mt-16 max-w-xl mx-auto">
                        <a
                            href={cta.url}
                            target="_blank"
                            rel="noopener noreferrer sponsored"
                            className="group block p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 to-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all text-center"
                        >
                            <div className="text-amber-400 font-bold text-lg mb-2">{cta.text}</div>
                            <p className="text-zinc-500 text-sm">{cta.secondaryText}</p>
                        </a>
                    </section>
                </div>
            </main>
        </>
    );
}
