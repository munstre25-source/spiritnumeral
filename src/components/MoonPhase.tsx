'use client';

import { useState, useEffect } from 'react';

// Moon phase calculation (simplified but accurate)
function getMoonPhase(date: Date = new Date()): {
    phase: string;
    emoji: string;
    illumination: number;
    description: string;
    guidance: string;
} {
    // Reference: Known new moon date
    const knownNewMoon = new Date('2000-01-06T18:14:00Z');
    const lunarCycle = 29.53058867; // days

    const daysSince = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const currentCycle = daysSince / lunarCycle;
    const phaseDay = (currentCycle - Math.floor(currentCycle)) * lunarCycle;

    // Calculate illumination (0-100%)
    const illumination = Math.round(50 - 50 * Math.cos(2 * Math.PI * phaseDay / lunarCycle));

    // Determine phase
    if (phaseDay < 1.85) {
        return {
            phase: 'New Moon',
            emoji: '🌑',
            illumination: 0,
            description: 'Time for new beginnings and setting intentions.',
            guidance: 'Set intentions for what you wish to manifest. Focus on new angel numbers appearing in your life.',
        };
    } else if (phaseDay < 7.38) {
        return {
            phase: 'Waxing Crescent',
            emoji: '🌒',
            illumination,
            description: 'Energy is building. Take action on your intentions.',
            guidance: 'Notice repeating numbers—they carry amplified messages during this growth phase.',
        };
    } else if (phaseDay < 9.23) {
        return {
            phase: 'First Quarter',
            emoji: '🌓',
            illumination: 50,
            description: 'Decision time. Overcome obstacles.',
            guidance: 'Angel numbers now may guide you through challenges. Pay attention to 4s and 8s.',
        };
    } else if (phaseDay < 14.77) {
        return {
            phase: 'Waxing Gibbous',
            emoji: '🌔',
            illumination,
            description: 'Refine and adjust your approach.',
            guidance: 'Fine-tune your understanding of the messages you receive. Journal your insights.',
        };
    } else if (phaseDay < 16.61) {
        return {
            phase: 'Full Moon',
            emoji: '🌕',
            illumination: 100,
            description: 'Peak energy. Manifestation and revelation.',
            guidance: 'Angel number messages are at their strongest. Major insights and realizations occur now.',
        };
    } else if (phaseDay < 22.15) {
        return {
            phase: 'Waning Gibbous',
            emoji: '🌖',
            illumination,
            description: 'Time to share and give gratitude.',
            guidance: 'Share your numerology insights with others. Express gratitude for guidance received.',
        };
    } else if (phaseDay < 23.99) {
        return {
            phase: 'Last Quarter',
            emoji: '🌗',
            illumination: 50,
            description: 'Release and let go.',
            guidance: 'Release old patterns. If you keep seeing certain numbers, let go of what they represent.',
        };
    } else {
        return {
            phase: 'Waning Crescent',
            emoji: '🌘',
            illumination,
            description: 'Rest and reflect before the new cycle.',
            guidance: 'Meditate on your spiritual journey. Prepare for new messages in the coming cycle.',
        };
    }
}

// Get days until next phase
function getDaysUntilNextPhase(date: Date = new Date()): { phase: string; days: number } {
    const knownNewMoon = new Date('2000-01-06T18:14:00Z');
    const lunarCycle = 29.53058867;

    const daysSince = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const currentCycle = daysSince / lunarCycle;
    const phaseDay = (currentCycle - Math.floor(currentCycle)) * lunarCycle;

    const phases = [
        { day: 0, name: 'New Moon' },
        { day: 7.38, name: 'First Quarter' },
        { day: 14.77, name: 'Full Moon' },
        { day: 22.15, name: 'Last Quarter' },
        { day: 29.53, name: 'New Moon' },
    ];

    for (const phase of phases) {
        if (phaseDay < phase.day) {
            return { phase: phase.name, days: Math.ceil(phase.day - phaseDay) };
        }
    }

    return { phase: 'New Moon', days: Math.ceil(lunarCycle - phaseDay) };
}

// Moon Phase Widget Component
export function MoonPhaseWidget({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
    const [moon, setMoon] = useState<ReturnType<typeof getMoonPhase> | null>(null);
    const [nextPhase, setNextPhase] = useState<{ phase: string; days: number } | null>(null);

    useEffect(() => {
        setMoon(getMoonPhase());
        setNextPhase(getDaysUntilNextPhase());
    }, []);

    if (!moon) return null;

    if (variant === 'compact') {
        return (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-default">
                <span className="text-lg">{moon.emoji}</span>
                <span className="text-secondary text-sm">{moon.phase}</span>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-2xl bg-card border border-default">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="text-xs uppercase tracking-widest text-amber-600 font-medium mb-1">
                        Lunar Energy
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-3xl">{moon.emoji}</span>
                        <span className="text-xl font-bold text-primary">{moon.phase}</span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-muted text-xs">{moon.illumination}% illuminated</div>
                    {nextPhase && (
                        <div className="text-secondary text-xs mt-1">
                            {nextPhase.phase} in {nextPhase.days}d
                        </div>
                    )}
                </div>
            </div>

            <p className="text-secondary text-sm mb-3">{moon.description}</p>

            <div className="p-3 rounded-lg bg-elevated/50 border border-default/50">
                <div className="text-xs uppercase tracking-widest text-muted mb-1">Numerology Guidance</div>
                <p className="text-secondary text-sm">{moon.guidance}</p>
            </div>
        </div>
    );
}

// Inline moon indicator for pages
export function MoonIndicator() {
    const [moon, setMoon] = useState<ReturnType<typeof getMoonPhase> | null>(null);

    useEffect(() => {
        setMoon(getMoonPhase());
    }, []);

    if (!moon) return null;

    return (
        <div className="inline-flex items-center gap-1.5 text-muted text-sm">
            <span>{moon.emoji}</span>
            <span>{moon.phase}</span>
        </div>
    );
}
