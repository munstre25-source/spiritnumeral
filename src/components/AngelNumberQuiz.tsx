'use client';

import { useState } from 'react';
import { trackEvent, getSessionId } from '@/lib/analytics/client';
import Link from 'next/link';

const QUIZ_QUESTIONS = [
    {
        id: 1,
        question: "How often do you notice repeating numbers?",
        options: [
            { text: "Multiple times a day", score: 3 },
            { text: "A few times a week", score: 2 },
            { text: "Occasionally", score: 1 },
            { text: "Rarely, but when I do it feels significant", score: 2 },
        ]
    },
    {
        id: 2,
        question: "Where do you most often see these numbers?",
        options: [
            { text: "Clocks and timestamps", value: 'time', score: 1 },
            { text: "License plates and addresses", value: 'physical', score: 1 },
            { text: "Phone numbers and receipts", value: 'transaction', score: 1 },
            { text: "Everywhere - it's uncanny!", value: 'all', score: 3 },
        ]
    },
    {
        id: 3,
        question: "What's happening in your life right now?",
        options: [
            { text: "Major life transition", value: 'transition', patterns: [111, 555, 999] },
            { text: "Seeking love or relationship clarity", value: 'love', patterns: [222, 444, 666] },
            { text: "Career or financial decisions", value: 'career', patterns: [333, 888, 1111] },
            { text: "Spiritual awakening or growth", value: 'spiritual', patterns: [777, 1111, 2222] },
        ]
    },
    {
        id: 4,
        question: "Which number pattern catches your attention most?",
        options: [
            { text: "Repeating digits (111, 222, 333)", value: 'repeating', patterns: [111, 222, 333] },
            { text: "Mirror numbers (121, 1221)", value: 'mirror', patterns: [121, 212, 1221] },
            { text: "Sequential (123, 456)", value: 'sequential', patterns: [123, 456, 789] },
            { text: "I notice all kinds", value: 'all', patterns: [111, 777, 1111] },
        ]
    },
    {
        id: 5,
        question: "How do you feel when you see these numbers?",
        options: [
            { text: "Reassured and comforted", feeling: 'peace', patterns: [222, 444, 888] },
            { text: "Excited and energized", feeling: 'energy', patterns: [111, 333, 555] },
            { text: "Curious and intrigued", feeling: 'curious', patterns: [777, 1111] },
            { text: "Like I need to pay attention", feeling: 'alert', patterns: [999, 1111, 2222] },
        ]
    }
];

export function AngelNumberQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [suggestedNumbers, setSuggestedNumbers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [email, setEmail] = useState('');
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [loadingCheckout, setLoadingCheckout] = useState(false);
    const [checkoutError, setCheckoutError] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [focus, setFocus] = useState<'love' | 'career' | 'spiritual' | 'money' | 'healing' | ''>('');
    const [feeling, setFeeling] = useState<'calm' | 'stuck' | 'anxious' | 'excited' | 'heartbroken' | ''>('');
    const [timeHorizon, setTimeHorizon] = useState<'7d' | '30d' | '90d' | ''>('');
    const [challenge, setChallenge] = useState('');
    const paymentsReady = true; // enable paid flow

    const canCheckout = Boolean(
        suggestedNumbers.length &&
        focus &&
        timeHorizon &&
        feeling
    );

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers, optionIndex];
        setAnswers(newAnswers);

        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Calculate results
            calculateResults(newAnswers);
        }
    };

    const calculateResults = (finalAnswers: number[]) => {
        const patternCounts: Record<number, number> = {};

        // Collect patterns from answers
        finalAnswers.forEach((answerIndex, questionIndex) => {
            const option = QUIZ_QUESTIONS[questionIndex].options[answerIndex];
            const patterns = (option as any).patterns || [111, 222, 333, 444];
            patterns.forEach((p: number) => {
                patternCounts[p] = (patternCounts[p] || 0) + 1;
            });
        });

        // Sort by frequency and get top 3
        const sorted = Object.entries(patternCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([num]) => parseInt(num));

        setSuggestedNumbers(sorted.length > 0 ? sorted : [111, 222, 333]);
        setShowResult(true);
    };

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        try {
            await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    source: 'quiz',
                    metadata: { suggestedNumbers: suggestedNumbers.join(',') }
                })
            });
            setEmailSubmitted(true);
        } catch {
            // Still show as submitted for UX
            setEmailSubmitted(true);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setAnswers([]);
        setShowResult(false);
        setSuggestedNumbers([]);
        setEmail('');
        setEmailSubmitted(false);
        setName('');
        setFocus('');
        setFeeling('');
        setTimeHorizon('');
        setChallenge('');
    };

    const startBlueprintCheckout = async () => {
        if (!canCheckout) {
            setCheckoutError('Please choose focus, feeling, and time horizon to personalize your PDF.');
            return;
        }
        setLoadingCheckout(true);
        setCheckoutError(null);
        try {
            trackEvent('cta_click', {
                product: 'blueprint',
                path: window.location.pathname,
                metadata: { label: 'Quiz Blueprint CTA', numbers: suggestedNumbers },
            });
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-session-id': getSessionId() || '' },
                body: JSON.stringify({
                    product: 'blueprint',
                    metadata: {
                        numbers: suggestedNumbers,
                        quizAnswers: answers,
                        email,
                        name: name || undefined,
                        focus: (focus as any) || undefined,
                        feeling: (feeling as any) || undefined,
                        timeHorizon: (timeHorizon as any) || undefined,
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

    if (showResult) {
        return (
            <div className="max-w-2xl mx-auto">
                <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-950/30 via-zinc-900 to-indigo-950/30 border border-amber-500/20">
                    <div className="text-center mb-8">
                        <div className="text-sm uppercase tracking-widest text-amber-400 mb-2">Your Numbers</div>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            The Universe is Speaking Through These Numbers
                        </h2>
                    </div>

                    {/* Suggested Numbers */}
                    <div className="flex justify-center gap-4 mb-8 flex-wrap">
                        {suggestedNumbers.map((num, i) => (
                            <Link
                                key={num}
                                href={`/meaning/angel-number/${num}`}
                                className="group"
                            >
                                <div className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl font-bold transition-all group-hover:scale-105 ${i === 0
                                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30'
                                        : 'bg-zinc-800 text-amber-400 border border-zinc-700'
                                    }`}>
                                    {num}
                                </div>
                                <div className="text-center mt-2 text-xs text-zinc-500">
                                    {i === 0 ? 'Primary' : 'Secondary'}
                                </div>
                            </Link>
                        ))}
                    </div>

                    <p className="text-zinc-400 text-center mb-8">
                        Based on your answers, <span className="text-amber-400 font-semibold">{suggestedNumbers[0]}</span> is
                        your primary angel number right now. This number carries an important message for your current life situation.
                    </p>

                    {/* Email Capture */}
                    {!emailSubmitted ? (
                        <div className="p-6 rounded-2xl bg-zinc-800/50 border border-zinc-700 space-y-3">
                            <h3 className="text-lg font-semibold text-white">Get Your Detailed Reading</h3>
                            <p className="text-zinc-400 text-sm">
                                Enter your email to receive a personalized interpretation of your angel numbers.
                            </p>
                            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="flex-1 bg-zinc-900 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors w-full sm:w-auto"
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="p-6 rounded-2xl bg-green-900/20 border border-green-500/30 text-center">
                            <div className="text-green-400 font-semibold">Check your inbox!</div>
                            <p className="text-zinc-400 text-sm mt-1">Your personalized reading is on its way.</p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
                        <input
                            placeholder="Your name (optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value.slice(0, 40))}
                            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                        />
                        <input
                            placeholder="Biggest challenge (optional, 80 chars)"
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value.slice(0, 80))}
                            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                        />
                        <select
                            value={focus}
                            onChange={(e) => setFocus(e.target.value as any)}
                            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60 col-span-1 sm:col-span-1"
                        >
                            <option value="">Focus area (required)</option>
                            <option value="love">Love</option>
                            <option value="career">Career</option>
                            <option value="spiritual">Spiritual Growth</option>
                            <option value="money">Money</option>
                            <option value="healing">Healing</option>
                        </select>
                        <select
                            value={feeling}
                            onChange={(e) => setFeeling(e.target.value as any)}
                            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                        >
                            <option value="">How do you feel? (required)</option>
                            <option value="calm">Calm</option>
                            <option value="stuck">Stuck</option>
                            <option value="anxious">Anxious</option>
                            <option value="excited">Excited</option>
                            <option value="heartbroken">Heartbroken</option>
                        </select>
                        <select
                            value={timeHorizon}
                            onChange={(e) => setTimeHorizon(e.target.value as any)}
                            className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500/60"
                        >
                            <option value="">Time horizon (required)</option>
                            <option value="7d">Next 7 days</option>
                            <option value="30d">Next 30 days</option>
                            <option value="90d">Next 90 days</option>
                        </select>
                        <Link
                            href={`/meaning/angel-number/${suggestedNumbers[0]}`}
                            className="py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors text-center"
                        >
                            Explore {suggestedNumbers[0]}'s Meaning
                        </Link>
                        <button
                            onClick={startBlueprintCheckout}
                            disabled={loadingCheckout || !canCheckout}
                            className="py-4 bg-gradient-to-r from-indigo-500 to-amber-500 text-black font-bold rounded-xl hover:from-indigo-400 hover:to-amber-400 transition-colors disabled:opacity-60"
                        >
                            {loadingCheckout ? 'Creating your blueprint…' : 'Get My Blueprint ($17)'}
                        </button>
                        <button
                            onClick={restartQuiz}
                            className="py-4 bg-zinc-800 border border-zinc-700 text-zinc-300 font-medium rounded-xl hover:bg-zinc-700 transition-colors"
                        >
                            Take Quiz Again
                        </button>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-2 text-xs text-zinc-400 mt-2">
                        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Focus-specific guidance
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            7/30/90-day plan
                        </div>
                        <div className="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-3 py-2">
                            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                            Challenge-based affirmation
                        </div>
                    </div>
                    <p className="text-[11px] text-zinc-500 text-center mt-1">One-time $17 · Instant PDF · No login</p>
                    {checkoutError && <p className="text-red-400 text-sm mt-2">{checkoutError}</p>}
                </div>
            </div>
        );
    }

    const question = QUIZ_QUESTIONS[currentQuestion];
    const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between text-sm text-zinc-500 mb-2">
                    <span>Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                    {question.question}
                </h2>

                <div className="space-y-3">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className="w-full p-4 rounded-xl bg-zinc-800/50 border border-zinc-700 text-left text-zinc-300 hover:border-amber-500/50 hover:bg-zinc-800 transition-all"
                        >
                            {option.text}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
