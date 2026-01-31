'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, getSessionId } from '@/lib/analytics/client';
import { useCtaImpression } from '@/lib/analytics/useCtaImpression';
import Link from 'next/link';

// Calculate life path from birthday
function calculateLifePath(birthday: string): number {
    const digits = birthday.replace(/\D/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);

    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    return sum;
}

// Compatibility matrix based on numerology principles
const COMPATIBILITY: Record<number, Record<number, { score: number; description: string }>> = {
    1: {
        1: { score: 65, description: "Two leaders can clash, but mutual respect builds strength." },
        2: { score: 85, description: "Perfect balance. The leader and the diplomat create harmony." },
        3: { score: 90, description: "Creative and dynamic. Both inspire each other to grow." },
        4: { score: 55, description: "Different approaches to life require patience and understanding." },
        5: { score: 75, description: "Both value independence. Give each other space to thrive." },
        6: { score: 70, description: "1's ambition meets 6's nurturing. Balance work and home." },
        7: { score: 60, description: "Intellectual connection, but emotional needs differ." },
        8: { score: 80, description: "Power couple potential. Both driven toward success." },
        9: { score: 75, description: "Shared humanitarian values create meaningful connection." },
        11: { score: 70, description: "Visionary meets intuitive. Deep spiritual potential." },
        22: { score: 85, description: "Master builders together. Tremendous achievement possible." },
        33: { score: 75, description: "Teacher meets leader. Inspiring combination." },
    },
    2: {
        2: { score: 80, description: "Deeply harmonious. Both value peace and partnership." },
        3: { score: 85, description: "Joyful combination. Creativity meets sensitivity." },
        4: { score: 75, description: "Stable and supportive. Security-oriented union." },
        5: { score: 50, description: "Challenging. 5's restlessness meets 2's need for stability." },
        6: { score: 95, description: "Ideal match. Both prioritize love and family." },
        7: { score: 70, description: "Spiritual depth. Both need alone time to recharge." },
        8: { score: 65, description: "2 supports 8's ambitions, but may feel overlooked." },
        9: { score: 80, description: "Compassionate connection. Both care for others." },
        11: { score: 90, description: "Intuitive bond. Deep emotional understanding." },
        22: { score: 75, description: "2 grounds 22's grand visions." },
        33: { score: 85, description: "Nurturing and healing energy together." },
    },
    3: {
        3: { score: 85, description: "Creative explosion. Fun and expressive together." },
        4: { score: 55, description: "3's spontaneity clashes with 4's need for structure." },
        5: { score: 90, description: "Adventure awaits. Both love excitement and variety." },
        6: { score: 80, description: "Creative meets nurturing. Beautiful family potential." },
        7: { score: 60, description: "Different social needs. 7 needs solitude, 3 craves connection." },
        8: { score: 70, description: "3's creativity supports 8's vision for success." },
        9: { score: 85, description: "Creative and compassionate. Artistic soulmates." },
        11: { score: 75, description: "Inspired creativity. Both have vivid imaginations." },
        22: { score: 65, description: "22's focus may feel heavy to free-spirited 3." },
        33: { score: 80, description: "Creative teaching and healing together." },
    },
    4: {
        4: { score: 70, description: "Stable but may lack spontaneity. Plan surprises." },
        5: { score: 45, description: "Most challenging. Opposite approaches to life." },
        6: { score: 85, description: "Solid foundation. Both value security and family." },
        7: { score: 75, description: "Intellectual respect. Both value depth and analysis." },
        8: { score: 90, description: "Power combination for material success." },
        9: { score: 60, description: "Different priorities. 4 is practical, 9 is idealistic." },
        11: { score: 55, description: "4's practicality may ground 11's visions too much." },
        22: { score: 95, description: "Master builders. Incredible achievement together." },
        33: { score: 70, description: "4 provides structure for 33's healing work." },
    },
    5: {
        5: { score: 75, description: "Exciting but unstable. Need anchoring influence." },
        6: { score: 55, description: "Freedom vs. commitment. Requires compromise." },
        7: { score: 70, description: "Both need independence. Respect boundaries." },
        8: { score: 65, description: "Power struggles possible. Both want control." },
        9: { score: 80, description: "Adventurous humanitarians. Travel and grow together." },
        11: { score: 60, description: "5's restlessness may unsettle sensitive 11." },
        22: { score: 55, description: "Different paces. 22 builds, 5 explores." },
        33: { score: 65, description: "5's freedom may conflict with 33's commitments." },
    },
    6: {
        6: { score: 85, description: "Deeply nurturing. May need outside interests." },
        7: { score: 60, description: "6 wants closeness, 7 needs space. Communication key." },
        8: { score: 75, description: "Successful home and career balance possible." },
        9: { score: 90, description: "Both care deeply. Beautiful humanitarian partnership." },
        11: { score: 80, description: "Intuitive and nurturing. Healing relationship." },
        22: { score: 85, description: "Building something meaningful together." },
        33: { score: 95, description: "Double nurturing energy. Profound love." },
    },
    7: {
        7: { score: 80, description: "Deep intellectual and spiritual bond." },
        8: { score: 55, description: "Different values. 7 seeks wisdom, 8 seeks wealth." },
        9: { score: 75, description: "Spiritual seekers. Philosophical connection." },
        11: { score: 90, description: "Deeply spiritual. Psychic connection possible." },
        22: { score: 70, description: "7 provides wisdom for 22's grand plans." },
        33: { score: 85, description: "Spiritual teaching and healing bond." },
    },
    8: {
        8: { score: 75, description: "Power couple. May compete. Celebrate each other." },
        9: { score: 70, description: "Material meets spiritual. Balance is key." },
        11: { score: 65, description: "8's ambition may overshadow 11's sensitivity." },
        22: { score: 90, description: "Unstoppable builders. Manifest big dreams." },
        33: { score: 70, description: "8 provides resources for 33's healing mission." },
    },
    9: {
        9: { score: 80, description: "Idealistic dreamers. May lose practical grounding." },
        11: { score: 85, description: "Visionary and intuitive. Deep spiritual bond." },
        22: { score: 75, description: "9's idealism supports 22's master plans." },
        33: { score: 90, description: "Humanitarian soulmates. Heal the world together." },
    },
    11: {
        11: { score: 85, description: "Intensely intuitive. May need grounding." },
        22: { score: 80, description: "Master numbers unite. Powerful spiritual work." },
        33: { score: 90, description: "Triple master energy. Profound connection." },
    },
    22: {
        22: { score: 85, description: "Master builders. Incredible potential." },
        33: { score: 85, description: "Building and healing. World-changing together." },
    },
    33: {
        33: { score: 90, description: "Pure love. Deep healing energy together." },
    },
};

function getCompatibility(num1: number, num2: number): { score: number; description: string } {
    const smaller = Math.min(num1, num2);
    const larger = Math.max(num1, num2);
    return COMPATIBILITY[smaller]?.[larger] || { score: 70, description: "A unique pairing with growth potential." };
}

export function CompatibilityCalculator() {
    const pathname = usePathname();
    const impressionRef = useCtaImpression({ product: 'relationship', path: pathname || undefined, label: 'Compatibility Relationship PDF' });
    const [birthday1, setBirthday1] = useState('');
    const [birthday2, setBirthday2] = useState('');
    const [result, setResult] = useState<{
        path1: number;
        path2: number;
        score: number;
        description: string;
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
        result &&
        focus &&
        timeHorizon &&
        relationshipStatus
    );

    const handleCalculate = () => {
        if (!birthday1 || !birthday2) return;

        const path1 = calculateLifePath(birthday1);
        const path2 = calculateLifePath(birthday2);
        const { score, description } = getCompatibility(path1, path2);

        setResult({ path1, path2, score, description });
    };

    const startCheckout = async () => {
        if (!canCheckout) {
            setCheckoutError('Add focus, time horizon, and relationship status to personalize your report.');
            return;
        }
        if (!result) return;
        setLoadingCheckout(true);
        setCheckoutError(null);
        try {
            trackEvent('cta_click', {
                product: 'relationship',
                path: window.location.pathname,
                metadata: { label: 'Compatibility Relationship PDF', numbers: [result.path1, result.path2] },
            });
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
                body: JSON.stringify({
                    product: 'relationship',
                    metadata: {
                        numbers: [result.path1, result.path2],
                        birthdays: [birthday1, birthday2],
                        compatibility: { score: result.score, description: result.description },
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
            if (!res.ok || !json.url) throw new Error(json.error || 'Checkout failed');
            window.location.href = json.url;
        } catch (error: any) {
            setCheckoutError(error.message || 'Could not start checkout');
            setLoadingCheckout(false);
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 85) return 'text-green-400';
        if (score >= 70) return 'text-amber-600';
        if (score >= 55) return 'text-orange-400';
        return 'text-red-400';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 85) return 'Excellent';
        if (score >= 70) return 'Good';
        if (score >= 55) return 'Moderate';
        return 'Challenging';
    };

    return (
        <div className="max-w-xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Person 1 */}
                <div className="p-6 rounded-2xl bg-card border border-default">
                    <label className="block text-secondary text-sm mb-2 font-medium">Your Birthday</label>
                    <input
                        type="date"
                        value={birthday1}
                        onChange={(e) => setBirthday1(e.target.value)}
                        className="w-full bg-elevated border border-default text-primary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    {birthday1 && (
                        <div className="mt-4 text-center">
                            <div className="text-3xl font-bold text-amber-600">{calculateLifePath(birthday1)}</div>
                            <div className="text-muted text-xs uppercase tracking-wider mt-1">Life Path</div>
                        </div>
                    )}
                </div>

                {/* Person 2 */}
                <div className="p-6 rounded-2xl bg-card border border-default">
                    <label className="block text-secondary text-sm mb-2 font-medium">Partner's Birthday</label>
                    <input
                        type="date"
                        value={birthday2}
                        onChange={(e) => setBirthday2(e.target.value)}
                        className="w-full bg-elevated border border-default text-primary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500 transition-colors"
                    />
                    {birthday2 && (
                        <div className="mt-4 text-center">
                            <div className="text-3xl font-bold text-amber-600">{calculateLifePath(birthday2)}</div>
                            <div className="text-muted text-xs uppercase tracking-wider mt-1">Life Path</div>
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={handleCalculate}
                disabled={!birthday1 || !birthday2}
                className="w-full py-4 btn-primary font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Calculate Compatibility
            </button>

            {/* Results */}
            {result && (
                <div className="mt-8 p-8 rounded-2xl bg-card border border-default text-center">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-elevated border border-default flex items-center justify-center">
                            <span className="text-2xl font-bold text-amber-600">{result.path1}</span>
                        </div>
                        <span className="text-amber-600 text-2xl">+</span>
                        <div className="w-16 h-16 rounded-xl bg-elevated border border-default flex items-center justify-center">
                            <span className="text-2xl font-bold text-amber-600">{result.path2}</span>
                        </div>
                    </div>

                    <div className={`text-6xl font-bold ${getScoreColor(result.score)} mb-2`}>
                        {result.score}%
                    </div>
                    <div className={`text-lg font-medium ${getScoreColor(result.score)} mb-4`}>
                        {getScoreLabel(result.score)} Compatibility
                    </div>

                    <p className="text-secondary leading-relaxed mb-6">
                        {result.description}
                    </p>

                    {/* Personalization */}
                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                        <input
                            placeholder="Your name (optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value.slice(0, 40))}
                            className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50"
                        />
                        <input
                            placeholder="Biggest challenge (optional, 80 chars)"
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value.slice(0, 80))}
                            className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50"
                        />
                        <select
                            value={focus}
                            onChange={(e) => setFocus(e.target.value as any)}
                            className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50"
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
                            className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50"
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
                            className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50"
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
                            className="w-full bg-card border border-default text-secondary px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/50"
                        >
                            <option value="">Time horizon (required)</option>
                            <option value="7d">Next 7 days</option>
                            <option value="30d">Next 30 days</option>
                            <option value="90d">Next 90 days</option>
                        </select>
                    </div>

                    {/* Value props */}
                    <div className="grid sm:grid-cols-3 gap-2 text-xs text-secondary mb-4">
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

                    <div ref={impressionRef} className="flex flex-col sm:flex-row gap-3 justify-center mb-2">
                        <button
                            onClick={startCheckout}
                            disabled={loadingCheckout || !canCheckout || !paymentsReady}
                            className="px-6 py-3 btn-primary font-bold rounded-xl transition-all disabled:opacity-60"
                        >
                            {!paymentsReady
                                ? 'Paid PDFs coming soon'
                                : loadingCheckout
                                    ? 'Preparing your PDF…'
                                    : 'Get Relationship Report ($29)'}
                        </button>
                        <p className="text-xs text-muted sm:w-48 text-left sm:text-center">
                            Full emotional dynamics, timing cycles, and guidance tailored to your birthdays.
                        </p>
                    </div>
                    <p className="text-[11px] text-muted text-center mb-2">One-time $29 · Instant PDF · No login</p>
                    {checkoutError && <p className="text-red-400 text-sm text-center">{checkoutError}</p>}

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href={`/meaning/life-path/life-path-${result.path1}`}
                            className="px-6 py-2 rounded-lg bg-elevated border border-default text-secondary hover:border-amber-500/50 transition-colors text-sm"
                        >
                            Life Path {result.path1} Meaning
                        </Link>
                        <Link
                            href={`/meaning/life-path/life-path-${result.path2}`}
                            className="px-6 py-2 rounded-lg bg-elevated border border-default text-secondary hover:border-amber-500/50 transition-colors text-sm"
                        >
                            Life Path {result.path2} Meaning
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
