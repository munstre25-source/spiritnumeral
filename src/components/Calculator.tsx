'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Numerology Calculator Component
 * Calculates Life Path number from birthdate and redirects to personalized page
 */
export default function NumerologyCalculator() {
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [lifePath, setLifePath] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  /**
   * Calculate Life Path number from birthdate
   * Life Path = sum of all digits in birthdate, reduced to single digit (except master numbers 11, 22, 33)
   */
  function calculateLifePath(dateString: string): number {
    // Remove dashes and slashes
    const cleaned = dateString.replace(/[-\/]/g, '');
    
    // Sum all digits
    let sum = 0;
    for (const digit of cleaned) {
      sum += parseInt(digit, 10);
    }
    
    // Reduce to single digit, but preserve master numbers
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    
    return sum;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    
    if (!birthdate) {
      setError('Please enter your birthdate');
      return;
    }

    // Validate date format
    const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}$|^\d{2}[-\/]\d{2}[-\/]\d{4}$/;
    if (!dateRegex.test(birthdate)) {
      setError('Please enter a valid date (MM/DD/YYYY or YYYY-MM-DD)');
      return;
    }

    try {
      const calculatedPath = calculateLifePath(birthdate);
      setLifePath(calculatedPath);
      
      // Redirect to life path page after a brief moment
      setTimeout(() => {
        router.push(`/meaning/life-path/life-path-${calculatedPath}`);
      }, 1500);
    } catch (err) {
      setError('Error calculating your life path. Please try again.');
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20 shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
        Discover Your Life Path Number
      </h2>
      
      <p className="text-zinc-400 text-center mb-6">
        Enter your birthdate to reveal your numerological life path and unlock your 2026 predictions
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
        </div>

        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-zinc-300 mb-2">
            Birthdate <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-zinc-900/50 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />
          <p className="text-xs text-zinc-500 mt-1">Format: MM/DD/YYYY or YYYY-MM-DD</p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        {lifePath && (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-amber-400 font-semibold mb-1">Your Life Path Number is:</p>
            <p className="text-4xl font-bold text-amber-500">{lifePath}</p>
            <p className="text-sm text-zinc-400 mt-2">Redirecting to your personalized reading...</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!!lifePath}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-black py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {lifePath ? 'Calculating...' : 'Calculate My Life Path'}
        </button>
      </form>

      <p className="text-xs text-zinc-500 text-center mt-6">
        Your life path number reveals your core personality, strengths, and life purpose according to numerology.
      </p>
    </div>
  );
}
