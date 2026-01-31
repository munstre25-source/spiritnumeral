import { Metadata } from 'next';
import { NumerologyProfile } from '@/components/NumerologyProfile';
import { MeaningPaidCTA } from '@/components/MeaningPaidCTA';

export const metadata: Metadata = {
    title: 'Your Numerology Profile - Spirit Numeral',
    description: 'Your personal numerology dashboard. Track your life path, saved angel numbers, and spiritual journey.',
    robots: 'noindex', // Personal page, no need to index
};

export default function ProfilePage() {

    return (
        <main className="min-h-screen bg-page text-primary pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary font-bold tracking-tighter mb-4">
                        Your Journey
                    </h1>
                    <p className="text-secondary text-lg">
                        Your personal numerology profile and spiritual path tracker.
                    </p>
                </header>

                <NumerologyProfile />

                {/* CTA Section */}
                <section className="mt-12">
                    <MeaningPaidCTA />
                </section>
            </div>
        </main>
    );
}
