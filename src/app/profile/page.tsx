import { Metadata } from 'next';
import { NumerologyProfile } from '@/components/NumerologyProfile';
import { getClickBankCTA } from '@/lib/utils/clickbank';

export const metadata: Metadata = {
    title: 'Your Numerology Profile - Spirit Numeral',
    description: 'Your personal numerology dashboard. Track your life path, saved angel numbers, and spiritual journey.',
    robots: 'noindex', // Personal page, no need to index
};

export default function ProfilePage() {
    const cta = getClickBankCTA('numerology');

    return (
        <main className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-2xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tighter mb-4">
                        Your Journey
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        Your personal numerology profile and spiritual path tracker.
                    </p>
                </header>

                <NumerologyProfile />

                {/* CTA Section */}
                <section className="mt-12">
                    <a
                        href={cta.url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="group block p-6 rounded-2xl bg-gradient-to-br from-amber-950/30 to-zinc-900 border border-amber-500/20 hover:border-amber-500/40 transition-all"
                    >
                        <div className="text-amber-400 font-bold text-lg mb-2">{cta.text}</div>
                        <p className="text-zinc-500 text-sm">{cta.secondaryText}</p>
                    </a>
                </section>
            </div>
        </main>
    );
}
