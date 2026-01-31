import { Metadata } from 'next';
import { AngelNumberQuiz } from '@/components/AngelNumberQuiz';

export const metadata: Metadata = {
    title: 'What Angel Number Am I Seeing? - Interactive Quiz',
    description: 'Take our interactive quiz to discover which angel numbers are speaking to you right now. Find out what messages the universe is sending you.',
    alternates: {
        canonical: '/quiz',
    },
};

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'How do I know which angel number is for me?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Your personal angel number often appears repeatedly in your daily life - on clocks, receipts, license plates, and more. Take our quiz to discover which numbers resonate with your current life situation.'
            }
        },
        {
            '@type': 'Question',
            name: 'Why do I keep seeing the same number?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Repeatedly seeing the same number is often considered a sign from angels or the universe. These numbers carry specific messages related to your current life path, challenges, or opportunities.'
            }
        }
    ]
};

export default function QuizPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <header className="text-center mb-12">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                            Interactive Quiz
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-primary font-bold tracking-tighter mb-4">
                            What Number Am I Seeing?
                        </h1>
                        <p className="text-secondary text-lg max-w-2xl mx-auto">
                            Answer a few questions to discover which angel numbers are trying to reach you
                            and what messages they carry for your life.
                        </p>
                    </header>

                    <AngelNumberQuiz />
                </div>
            </main>
        </>
    );
}
