'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, getSessionId } from '@/lib/analytics/client';
import { useCtaImpression } from '@/lib/analytics/useCtaImpression';
import Link from 'next/link';

interface ComparisonData {
    number: number;
    meaning: string;
    love: string;
    career: string;
    energy: string;
}

// Generate comparison data based on number patterns
function getNumberEnergy(num: number): string {
    const digits = num.toString().split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);

    if (digits.every(d => d === digits[0])) return 'Amplified single-digit energy';
    if (num === parseInt(digits.reverse().join(''))) return 'Balanced mirror energy';
    if (sum % 3 === 0) return 'Creative and expressive';
    if (sum % 2 === 0) return 'Harmonious and balanced';
    return 'Dynamic and transformative';
}

function getQuickMeaning(num: number): string {
    const meanings: Record<number, string> = {
        0: 'Infinite potential and divine connection',
        1: 'New beginnings and leadership',
        2: 'Partnership and balance',
        3: 'Creativity and self-expression',
        4: 'Stability and foundation',
        5: 'Change and adventure',
        6: 'Love and responsibility',
        7: 'Spirituality and inner wisdom',
        8: 'Abundance and power',
        9: 'Completion and humanitarianism',
    };

    const firstDigit = parseInt(num.toString()[0]);
    return meanings[firstDigit] || 'Unique spiritual significance';
}

export function NumberComparison() {
    const pathname = usePathname();
    const impressionRef = useCtaImpression({ product: 'relationship', path: pathname || undefined, label: 'Compare Relationship PDF' });
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [comparison, setComparison] = useState<{
        num1: ComparisonData;
        num2: ComparisonData;
        compatibility: number;
        insight: string;
    } | null>(null);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [focus, setFocus] = useState<'love' | 'career' | 'spiritual' | 'money' | 'healing' | ''>('');
    const [feeling, setFeeling] = useState<'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken' | ''>('');
    const [timeHorizon, setTimeHorizon] = useState<'7d' | '30d' | '90d' | ''>('');
    const [relationshipStatus, setRelationshipStatus] = useState<'single' | 'dating' | 'committed' | 'situationship' | 'separated' | ''>('');
    const [challenge, setChallenge] = useState('');
    const paymentsReady = true; // enable CTA

    const canCheckout = Boolean(
        comparison &&
        focus &&
        timeHorizon &&
        relationshipStatus
    );

    const handleCompare = () => {
        const n1 = parseInt(number1);
        const n2 = parseInt(number2);

        if (isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 2222 || n2 < 0 || n2 > 2222) {
            return;
        }

        // Calculate compatibility based on digit relationships
        const digits1 = n1.toString().split('').map(Number);
        const digits2 = n2.toString().split('').map(Number);
        const sum1 = digits1.reduce((a, b) => a + b, 0);
        const sum2 = digits2.reduce((a, b) => a + b, 0);

        // Reduce to single digit
        let root1 = sum1;
        while (root1 > 9) root1 = root1.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        let root2 = sum2;
        while (root2 > 9) root2 = root2.toString().split('').map(Number).reduce((a, b) => a + b, 0);

        // Compatibility based on root numbers
        const diff = Math.abs(root1 - root2);
        const compatibility = Math.max(50, 100 - (diff * 8) + (root1 === root2 ? 15 : 0));

        // Generate insight
        const insights = [
            `${n1} and ${n2} share ${root1 === root2 ? 'the same' : 'complementary'} root energy.`,
            `Together, these numbers create a ${compatibility > 80 ? 'powerful' : 'unique'} spiritual combination.`,
            `The combined energy suggests ${compatibility > 70 ? 'harmony' : 'growth through contrast'}.`,
        ];

        setComparison({
            num1: {
                number: n1,
                meaning: getQuickMeaning(n1),
                love: `In love, ${n1} brings ${digits1[0] % 2 === 0 ? 'nurturing support' : 'passionate energy'}.`,
                career: `Career-wise, ${n1} favors ${digits1[0] > 5 ? 'leadership roles' : 'collaborative work'}.`,
                energy: getNumberEnergy(n1),
            },
            num2: {
                number: n2,
                meaning: getQuickMeaning(n2),
                love: `In love, ${n2} brings ${digits2[0] % 2 === 0 ? 'nurturing support' : 'passionate energy'}.`,
                career: `Career-wise, ${n2} favors ${digits2[0] > 5 ? 'leadership roles' : 'collaborative work'}.`,
                energy: getNumberEnergy(n2),
            },
            compatibility: Math.min(98, compatibility),
            insight: insights[Math.floor(Math.random() * insights.length)],
        });
    };

    const startCheckout = async () => {
        if (!canCheckout) {
            setCheckoutError('Add focus, time horizon, and relationship status to personalize your report.');
            return;
        }
        if (!comparison) return;
        setLoadingCheckout(true);
        setCheckoutError(null);
        try {
            trackEvent('cta_click', {
                product: 'relationship',
                path: window.location.pathname,
                metadata: { label: 'Compare Relationship PDF', numbers: [comparison.num1.number, comparison.num2.number] },
            });
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
                body: JSON.stringify({
                    product: 'relationship',
                    metadata: {
                        numbers: [comparison.num1.number, comparison.num2.number],
                        compatibility: { score: comparison.compatibility, description: comparison.insight },
                        name: name || undefined,
                        focus: (focus as any) || undefined,
                        feeling: (feeling as any) || undefined,
                        timeHorizon: (timeHorizon as any) || undefined,
                        relationshipStatus: (relationshipStatus as any) || undefined,
                        challenge: challenge ? challenge.slice(0, 80) : undefined,
                    },
                }),
            });
            const json = await res.json();
            if (!res.ok || !json.url) {
                throw new Error(json.error || 'Checkout failed');
            }
            window.location.href = json.url;
        } catch (err: any) {
            setCheckoutError(err.message || 'Could not start checkout');
            setLoadingCheckout(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Input Section */}
            <div className="grid md:grid-cols-3 gap-4 items-end mb-8">
                <div>
                    <label className="block text-secondary text-sm mb-2">First Number</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="e.g., 111"
                        value={number1}
                        onChange={(e) => setNumber1(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                        className="w-full bg-card border border-default text-primary text-2xl font-bold px-4 py-4 rounded-xl text-center focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>
                <div className="text-center py-4 text-muted text-2xl hidden md:block">
                    vs
                </div>
                <div>
                    <label className="block text-secondary text-sm mb-2">Second Number</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="e.g., 222"
                        value={number2}
                        onChange={(e) => setNumber2(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                        className="w-full bg-card border border-default text-primary text-2xl font-bold px-4 py-4 rounded-xl text-center focus:outline-none focus:border-amber-500 transition-colors"
                    />
                </div>
            </div>

            <button
                onClick={handleCompare}
                disabled={!number1 || !number2}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-xl hover:from-amber-400 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-8"
            >
                Compare Numbers
            </button>

            {/* Results */}
            {comparison && (
                <div className="space-y-6">
                    {/* Compatibility Score */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-950/30 to-zinc-900 border border-amber-500/20 text-center">
                        <div className="text-sm uppercase tracking-widest text-amber-600 mb-2">Spiritual Connection</div>
                        <div className="text-6xl font-bold text-amber-600 mb-2">{comparison.compatibility}%</div>
                        <p className="text-secondary">{comparison.insight}</p>
                    </div>

                    {/* Side by Side Comparison */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Number 1 */}
                        <div className="p-6 rounded-2xl bg-card border border-default">
                            <Link href={`/meaning/angel-number/${comparison.num1.number}`} className="group">
                                <div className="text-4xl font-bold text-amber-600 mb-4 group-hover:text-amber-600 transition-colors">
                                    {comparison.num1.number}
                                </div>
                            </Link>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-muted mb-1">Core Energy</div>
                                    <div className="text-secondary">{comparison.num1.meaning}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-muted mb-1">Energy Type</div>
                                    <div className="text-secondary text-sm">{comparison.num1.energy}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-muted mb-1">In Love</div>
                                    <div className="text-secondary text-sm">{comparison.num1.love}</div>
                                </div>
                            </div>
                            <Link
                                href={`/meaning/angel-number/${comparison.num1.number}`}
                                className="inline-block mt-4 text-amber-600 text-sm hover:text-amber-600"
                            >
                                View full meaning →
                            </Link>
                        </div>

                        {/* Number 2 */}
                        <div className="p-6 rounded-2xl bg-card border border-default">
                            <Link href={`/meaning/angel-number/${comparison.num2.number}`} className="group">
                                <div className="text-4xl font-bold text-amber-600 mb-4 group-hover:text-amber-600 transition-colors">
                                    {comparison.num2.number}
                                </div>
                            </Link>
                            <div className="space-y-4">
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-muted mb-1">Core Energy</div>
                                    <div className="text-secondary">{comparison.num2.meaning}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-muted mb-1">Energy Type</div>
                                    <div className="text-secondary text-sm">{comparison.num2.energy}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest text-muted mb-1">In Love</div>
                                    <div className="text-secondary text-sm">{comparison.num2.love}</div>
                                </div>
                            </div>
                            <Link
                                href={`/meaning/angel-number/${comparison.num2.number}`}
                                className="inline-block mt-4 text-amber-600 text-sm hover:text-amber-600"
                            >
                                View full meaning →
                            </Link>
                        </div>
                    </div>

                    {/* Combined Reading */}
                    <div className="p-6 rounded-2xl bg-elevated border border-default">
                        <h3 className="text-lg font-bold text-primary mb-3">Combined Message</h3>
                        <p className="text-secondary">
                            When you see both {comparison.num1.number} and {comparison.num2.number} appearing in your life,
                            the universe is guiding you toward {comparison.compatibility > 75 ? 'a harmonious path that combines' : 'growth through the contrast of'}
                            {' '}{comparison.num1.meaning.toLowerCase()} with {comparison.num2.meaning.toLowerCase()}.
                            Pay attention to when each number appears—the sequence matters.
                        </p>
                        {/* Personalization fields */}
                        <div className="grid md:grid-cols-2 gap-3 mt-4">
                            <input
                                placeholder="Your name (optional)"
                                value={name}
                                onChange={(e) => setName(e.target.value.slice(0, 40))}
                                className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                            />
                            <input
                                placeholder="Biggest challenge (optional, 80 chars)"
                                value={challenge}
                                onChange={(e) => setChallenge(e.target.value.slice(0, 80))}
                                className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                            />
                            <select
                                value={focus}
                                onChange={(e) => setFocus(e.target.value as any)}
                                className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                            >
                                <option value="">Focus area (optional)</option>
                                <option value="love">Love</option>
                                <option value="career">Career</option>
                                <option value="spiritual">Spiritual Growth</option>
                                <option value="money">Money</option>
                                <option value="healing">Healing</option>
                            </select>
                            <select
                                value={feeling}
                                onChange={(e) => setFeeling(e.target.value as any)}
                                className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                            >
                                <option value="">How do you feel? (optional)</option>
                                <option value="calm">Calm</option>
                                <option value="stuck">Stuck</option>
                                <option value="anxious">Anxious</option>
                                <option value="excited">Excited</option>
                                <option value="heartbroken">Heartbroken</option>
                            </select>
                            <select
                        value={relationshipStatus}
                        onChange={(e) => setRelationshipStatus(e.target.value as any)}
                        className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                    >
                        <option value="">Relationship status (required)</option>
                        <option value="single">Single</option>
                        <option value="dating">Dating</option>
                        <option value="committed">Committed</option>
                        <option value="situationship">Situationship</option>
                        <option value="separated">Separated</option>
                            </select>
                            <select
                        value={timeHorizon}
                        onChange={(e) => setTimeHorizon(e.target.value as any)}
                        className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                    >
                        <option value="">Time horizon (required)</option>
                        <option value="7d">Next 7 days</option>
                        <option value="30d">Next 30 days</option>
                        <option value="90d">Next 90 days</option>
                    </select>
                        </div>

                        {/* Value props */}
                        <div className="grid sm:grid-cols-3 gap-2 text-xs text-secondary mt-4">
                            <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Emotional dynamics
                            </div>
                            <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Timing cycles (7/30/90d)
                            </div>
                            <div className="flex items-center gap-2 bg-card border border-default rounded-xl px-3 py-2">
                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                Challenge-based steps
                            </div>
                        </div>

                        <div ref={impressionRef} className="mt-4 flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={startCheckout}
                                disabled={loadingCheckout || !canCheckout || !paymentsReady}
                                className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-black font-bold rounded-xl hover:from-amber-400 hover:to-yellow-400 transition-all disabled:opacity-60"
                            >
                                {loadingCheckout
                                    ? 'Creating your report…'
                                    : 'Get Full Relationship PDF ($29)'}
                            </button>
                            <p className="text-xs text-muted sm:w-48">
                                Personalised emotional dynamics, timing cycles, and what to do next.
                            </p>
                        </div>
                        <p className="text-[11px] text-muted mt-2">One-time $29 · Instant PDF · No login</p>
                        {checkoutError && (
                            <p className="text-red-400 text-sm mt-2">{checkoutError}</p>
                        )}
                    </div>
                </div>
            )}

            {/* Popular Comparisons */}
            {!comparison && (
                <div className="mt-12">
                    <h3 className="text-lg font-bold text-secondary mb-4">Popular Comparisons</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                            ['111', '222'],
                            ['333', '444'],
                            ['555', '777'],
                            ['1111', '2222'],
                        ].map(([a, b]) => (
                            <button
                                key={`${a}-${b}`}
                                onClick={() => {
                                    setNumber1(a);
                                    setNumber2(b);
                                }}
                                className="px-4 py-3 rounded-xl bg-card border border-default text-secondary hover:border-amber-500/50 hover:text-amber-600 transition-all text-sm"
                            >
                                {a} vs {b}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
