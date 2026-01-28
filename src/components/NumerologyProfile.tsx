'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Get saved numbers from localStorage
function getSavedNumbers(): number[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('savedAngelNumbers');
    return stored ? JSON.parse(stored) : [];
}

// Get viewed numbers history
function getViewHistory(): { number: number; timestamp: number }[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('viewHistory');
    return stored ? JSON.parse(stored) : [];
}

// Add to view history
export function trackView(number: number) {
    if (typeof window === 'undefined') return;
    const history = getViewHistory();
    const filtered = history.filter(h => h.number !== number);
    const updated = [{ number, timestamp: Date.now() }, ...filtered].slice(0, 50);
    localStorage.setItem('viewHistory', JSON.stringify(updated));
}

// Calculate life path from birthday string
function calculateLifePath(birthday: string): number {
    const digits = birthday.replace(/\D/g, '').split('').map(Number);
    let sum = digits.reduce((a, b) => a + b, 0);

    // Keep reducing until single digit or master number
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
        sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }

    return sum;
}

// Get user profile from localStorage
interface UserProfile {
    birthday?: string;
    lifePath?: number;
    name?: string;
    createdAt?: number;
}

function getUserProfile(): UserProfile {
    if (typeof window === 'undefined') return {};
    const stored = localStorage.getItem('userProfile');
    return stored ? JSON.parse(stored) : {};
}

function saveUserProfile(profile: UserProfile) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('userProfile', JSON.stringify(profile));
}

// Personal Numerology Profile Component
export function NumerologyProfile() {
    const [profile, setProfile] = useState<UserProfile>({});
    const [savedNumbers, setSavedNumbers] = useState<number[]>([]);
    const [viewHistory, setViewHistory] = useState<{ number: number; timestamp: number }[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        setProfile(getUserProfile());
        setSavedNumbers(getSavedNumbers());
        setViewHistory(getViewHistory());
    }, []);

    const handleSaveBirthday = () => {
        if (!birthday) return;
        const lifePath = calculateLifePath(birthday);
        const newProfile = {
            ...profile,
            birthday,
            lifePath,
            createdAt: profile.createdAt || Date.now()
        };
        saveUserProfile(newProfile);
        setProfile(newProfile);
        setIsEditing(false);
    };

    const getMostViewed = () => {
        const counts: Record<number, number> = {};
        viewHistory.forEach(v => {
            counts[v.number] = (counts[v.number] || 0) + 1;
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([num]) => parseInt(num));
    };

    const getRecentViews = () => {
        return viewHistory.slice(0, 8).map(v => v.number);
    };

    return (
        <div className="space-y-8">
            {/* Life Path Section */}
            <section className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-1">Your Life Path</h2>
                        <p className="text-zinc-500 text-sm">Your core numerology number based on birthday</p>
                    </div>
                    {profile.lifePath && !isEditing && (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="text-zinc-500 hover:text-zinc-300 text-sm"
                        >
                            Edit
                        </button>
                    )}
                </div>

                {profile.lifePath && !isEditing ? (
                    <div className="flex items-center gap-6">
                        <Link
                            href={`/meaning/life-path/life-path-${profile.lifePath}`}
                            className="group"
                        >
                            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center group-hover:border-amber-500/60 transition-colors">
                                <span className="text-4xl font-bold text-amber-400">{profile.lifePath}</span>
                            </div>
                        </Link>
                        <div>
                            <p className="text-zinc-400 text-sm mb-2">
                                Life Path {profile.lifePath === 11 || profile.lifePath === 22 || profile.lifePath === 33
                                    ? '(Master Number)'
                                    : ''}
                            </p>
                            <Link
                                href={`/meaning/life-path/life-path-${profile.lifePath}`}
                                className="text-amber-400 hover:text-amber-300 text-sm font-medium"
                            >
                                View full meaning →
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-zinc-400 text-sm mb-2">Enter your birthday</label>
                            <input
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                className="w-full max-w-xs bg-zinc-800 border border-zinc-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-amber-500"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handleSaveBirthday}
                                disabled={!birthday}
                                className="px-6 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
                            >
                                Calculate
                            </button>
                            {isEditing && (
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-2 text-zinc-400 hover:text-zinc-300"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* Saved Numbers */}
            {savedNumbers.length > 0 && (
                <section className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <h2 className="text-xl font-bold text-white mb-1">Saved Numbers</h2>
                    <p className="text-zinc-500 text-sm mb-6">Numbers you've marked as meaningful</p>
                    <div className="flex flex-wrap gap-2">
                        {savedNumbers.map(num => (
                            <Link
                                key={num}
                                href={`/meaning/angel-number/${num}`}
                                className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-amber-400 font-medium hover:border-amber-500/50 transition-colors"
                            >
                                {num}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Recently Viewed */}
            {getRecentViews().length > 0 && (
                <section className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <h2 className="text-xl font-bold text-white mb-1">Recently Viewed</h2>
                    <p className="text-zinc-500 text-sm mb-6">Your recent spiritual journey</p>
                    <div className="flex flex-wrap gap-2">
                        {getRecentViews().map((num, i) => (
                            <Link
                                key={`${num}-${i}`}
                                href={`/meaning/angel-number/${num}`}
                                className="px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 text-zinc-300 hover:text-amber-400 hover:border-amber-500/50 transition-colors"
                            >
                                {num}
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Most Viewed */}
            {getMostViewed().length > 0 && (
                <section className="p-6 md:p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                    <h2 className="text-xl font-bold text-white mb-1">Your Patterns</h2>
                    <p className="text-zinc-500 text-sm mb-6">Numbers that appear most in your journey</p>
                    <div className="flex flex-wrap gap-3">
                        {getMostViewed().map((num, i) => (
                            <Link
                                key={num}
                                href={`/meaning/angel-number/${num}`}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-amber-500/50 transition-colors"
                            >
                                <span className="text-amber-400 font-bold">{num}</span>
                                <span className="text-zinc-600 text-xs">#{i + 1}</span>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Journey Stats */}
            <section className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                    <div className="text-2xl font-bold text-amber-400">{savedNumbers.length}</div>
                    <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1">Saved</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                    <div className="text-2xl font-bold text-amber-400">{viewHistory.length}</div>
                    <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1">Explored</div>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center">
                    <div className="text-2xl font-bold text-amber-400">
                        {profile.createdAt
                            ? Math.floor((Date.now() - profile.createdAt) / (1000 * 60 * 60 * 24)) + 1
                            : 0
                        }
                    </div>
                    <div className="text-zinc-500 text-xs uppercase tracking-wider mt-1">Days</div>
                </div>
            </section>
        </div>
    );
}

// Mini profile widget for sidebar/header
export function ProfileWidget() {
    const [profile, setProfile] = useState<UserProfile>({});
    const [savedCount, setSavedCount] = useState(0);

    useEffect(() => {
        setProfile(getUserProfile());
        setSavedCount(getSavedNumbers().length);
    }, []);

    if (!profile.lifePath) {
        return (
            <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-colors"
            >
                <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center text-zinc-500">
                    ?
                </div>
                <div>
                    <div className="text-sm font-medium text-zinc-300">Create Profile</div>
                    <div className="text-xs text-zinc-500">Discover your path</div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-colors"
        >
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
                {profile.lifePath}
            </div>
            <div>
                <div className="text-sm font-medium text-zinc-300">Life Path {profile.lifePath}</div>
                <div className="text-xs text-zinc-500">{savedCount} saved</div>
            </div>
        </Link>
    );
}
