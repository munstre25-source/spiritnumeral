'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Generate daily angel number based on date
function getDailyAngelNumber(): number {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    // Use seed to generate a consistent number for the day
    const hash = (seed * 9301 + 49297) % 233280;
    return Math.floor((hash / 233280) * 2223); // 0-2222
}

// Get date string for display
function getDateString(): string {
    return new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function DailyAngelNumber() {
    const [number, setNumber] = useState<number | null>(null);
    const [dateStr, setDateStr] = useState('');

    useEffect(() => {
        setNumber(getDailyAngelNumber());
        setDateStr(getDateString());
    }, []);

    if (number === null) return null;

    return (
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-950/40 via-elevated to-amber-950/20 border border-amber-500/20 p-8 md:p-12">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">✨</span>
                    <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">
                        Today's Angel Number
                    </span>
                </div>

                <p className="text-muted text-sm mb-6">{dateStr}</p>

                <Link
                    href={`/meaning/angel-number/${number}`}
                    className="group block"
                >
                    <div className="text-7xl md:text-9xl font-bold text-primary font-bold tracking-tighter group-hover:scale-105 transition-transform inline-block">
                        {number}
                    </div>
                </Link>

                <p className="text-secondary mt-6 text-lg max-w-lg">
                    The universe has chosen <span className="text-amber-600 font-semibold">{number}</span> as today's guiding number.
                    Discover its message for you.
                </p>

                <Link
                    href={`/meaning/angel-number/${number}`}
                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors"
                >
                    <span>Explore {number}'s Meaning</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6" />
                    </svg>
                </Link>
            </div>
        </section>
    );
}

// Affirmation generator based on angel number
const AFFIRMATION_TEMPLATES = {
    abundance: [
        "I am open to receiving abundance in all forms.",
        "Prosperity flows to me effortlessly.",
        "I am worthy of financial success and security.",
        "Money comes to me easily and frequently.",
    ],
    love: [
        "I am worthy of deep, unconditional love.",
        "Love surrounds me in all areas of my life.",
        "I attract loving and supportive relationships.",
        "My heart is open to giving and receiving love.",
    ],
    growth: [
        "I embrace change as an opportunity for growth.",
        "Every day I am becoming a better version of myself.",
        "I trust the journey of my spiritual evolution.",
        "I am exactly where I need to be right now.",
    ],
    protection: [
        "I am divinely protected and guided.",
        "My angels surround me with love and light.",
        "I release all fears and trust in divine timing.",
        "I am safe, secure, and at peace.",
    ],
    manifestation: [
        "My thoughts create my reality.",
        "I am a powerful manifestor.",
        "Everything I desire is already on its way to me.",
        "I align my energy with my highest intentions.",
    ],
};

export function AffirmationGenerator({ number }: { number?: number }) {
    const [affirmation, setAffirmation] = useState('');
    const [category, setCategory] = useState('');

    const generateAffirmation = () => {
        const categories = Object.keys(AFFIRMATION_TEMPLATES) as (keyof typeof AFFIRMATION_TEMPLATES)[];

        // Use the number to influence category selection, or random
        const seed = number || Math.floor(Math.random() * 1000);
        const categoryIndex = seed % categories.length;
        const selectedCategory = categories[categoryIndex];

        const affirmations = AFFIRMATION_TEMPLATES[selectedCategory];
        const affirmationIndex = Math.floor(Math.random() * affirmations.length);

        setCategory(selectedCategory);
        setAffirmation(affirmations[affirmationIndex]);
    };

    useEffect(() => {
        generateAffirmation();
    }, [number]);

    const handleShare = async () => {
        const text = `✨ ${affirmation}\n\n— My daily affirmation from Spirit Numeral`;
        if (navigator.share) {
            try {
                await navigator.share({ text });
            } catch { }
        } else {
            navigator.clipboard.writeText(text);
        }
    };

    return (
        <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-zinc-900 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl">🔮</span>
                    <span className="text-indigo-400 font-semibold uppercase tracking-wider text-sm">
                        Your Affirmation
                    </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-medium capitalize">
                    {category}
                </span>
            </div>

            <p className="text-xl md:text-2xl text-primary font-light leading-relaxed italic">
                "{affirmation}"
            </p>

            <div className="flex items-center gap-3 mt-6">
                <button
                    onClick={generateAffirmation}
                    className="flex-1 px-4 py-3 bg-amber-500/20 border border-amber-500/30 text-primary rounded-xl hover:bg-amber-500/30 transition-colors font-medium"
                >
                    ✨ New Affirmation
                </button>
                <button
                    onClick={handleShare}
                    className="px-4 py-3 bg-elevated border border-default text-secondary rounded-xl hover:bg-elevated transition-colors"
                >
                    Share
                </button>
            </div>
        </div>
    );
}

// Number compatibility mini-calculator
export function CompatibilityTeaser() {
    return (
        <Link
            href="/compatibility"
            className="block p-6 md:p-8 rounded-3xl bg-card border border-default hover:border-amber-500/40 transition-all group"
        >
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">💕</span>
                <span className="text-amber-600 font-semibold uppercase tracking-wider text-sm">
                    Love Compatibility
                </span>
            </div>

            <h3 className="text-2xl font-bold text-primary mb-2">
                Are Your Numbers Compatible?
            </h3>
            <p className="text-secondary mb-6">
                Discover the numerological compatibility between you and your partner based on your life path numbers.
            </p>

            <div className="flex items-center gap-4">
                <div className="flex-1 h-14 rounded-xl bg-elevated/50 border border-default flex items-center justify-center text-muted">
                    Your Number
                </div>
                <span className="text-amber-600 text-2xl">+</span>
                <div className="flex-1 h-14 rounded-xl bg-elevated/50 border border-default flex items-center justify-center text-muted">
                    Partner's Number
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className="text-amber-600 font-medium group-hover:text-amber-700 transition-colors">
                    Calculate Compatibility →
                </span>
            </div>
        </Link>
    );
}

// User's saved/favorite numbers (localStorage based)
export function SavedNumbers() {
    const [saved, setSaved] = useState<number[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem('savedAngelNumbers');
        if (stored) {
            setSaved(JSON.parse(stored));
        }
    }, []);

    if (saved.length === 0) return null;

    return (
        <div className="p-6 rounded-2xl bg-card border border-default">
            <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">⭐</span>
                <span className="text-secondary font-semibold">Your Saved Numbers</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {saved.slice(0, 8).map(num => (
                    <Link
                        key={num}
                        href={`/meaning/angel-number/${num}`}
                        className="px-4 py-2 rounded-lg bg-elevated border border-default text-amber-600 font-medium hover:border-amber-500/50 transition-colors"
                    >
                        {num}
                    </Link>
                ))}
            </div>
        </div>
    );
}

// Save button for individual number pages
export function SaveNumberButton({ number }: { number: number }) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('savedAngelNumbers');
        if (stored) {
            const saved = JSON.parse(stored);
            setIsSaved(saved.includes(number));
        }
    }, [number]);

    const toggleSave = () => {
        const stored = localStorage.getItem('savedAngelNumbers');
        let saved: number[] = stored ? JSON.parse(stored) : [];

        if (isSaved) {
            saved = saved.filter(n => n !== number);
        } else {
            saved = [...saved, number].slice(-20); // Keep last 20
        }

        localStorage.setItem('savedAngelNumbers', JSON.stringify(saved));
        setIsSaved(!isSaved);
    };

    return (
        <button
            onClick={toggleSave}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${isSaved
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-600'
                : 'bg-card border-default text-secondary hover:text-amber-600 hover:border-amber-500/50'
                }`}
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span className="text-sm font-medium">{isSaved ? 'Saved' : 'Save'}</span>
        </button>
    );
}
