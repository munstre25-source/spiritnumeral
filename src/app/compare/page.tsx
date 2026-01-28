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

export default function ComparePage() {
    const cta = getClickBankCTA('numerology');

    return (
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
    );
}
