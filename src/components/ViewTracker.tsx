'use client';

import { useEffect } from 'react';

// Track page views for user journey
export function ViewTracker({ number }: { number: number }) {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Get existing history
        const stored = localStorage.getItem('viewHistory');
        const history: { number: number; timestamp: number }[] = stored ? JSON.parse(stored) : [];

        // Remove existing entry for this number if present
        const filtered = history.filter(h => h.number !== number);

        // Add new entry at the beginning
        const updated = [{ number, timestamp: Date.now() }, ...filtered].slice(0, 50);

        // Save
        localStorage.setItem('viewHistory', JSON.stringify(updated));
    }, [number]);

    return null; // This component doesn't render anything
}
