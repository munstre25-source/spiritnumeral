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
    <div className="w-full max-w-md mx-auto p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-900/50 to-zinc-900 border border-indigo-500/20 shadow-2xl">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
        Discover Your Life Path Number
      </h2>

      <p className="text-sm md:text-base text-zinc-400 text-center mb-8">
        Enter your birthdate to reveal your numerological life path and unlock your personalized predictions.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Your Name (Optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all text-base"
          />
        </div>

        <div>
          <label htmlFor="birthdate" className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Birthdate <span className="text-amber-500">*</span>
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-100 focus:outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/10 transition-all text-base"
          />
          <p className="text-[10px] text-zinc-500 mt-2 italic px-1">We respect your privacy. Your data is used only for calculation.</p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-pulse">
            {error}
          </div>
        )}

        {lifePath && (
          <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center animate-in fade-in zoom-in duration-300">
            <p className="text-amber-400 font-semibold mb-2">Your Life Path Number is:</p>
            <p className="text-5xl font-black text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]">{lifePath}</p>
            <p className="text-xs text-zinc-400 mt-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              Generating your personalized reading...
            </p>
            <a
              href="https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="mt-4 inline-block px-4 py-2 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-sm hover:bg-amber-500/30 transition-colors"
            >
              Get Your Full Numerology Reading →
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={!!lifePath}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 py-4 rounded-xl font-bold text-lg hover:from-amber-400 hover:to-yellow-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] active:scale-[0.98]"
        >
          {lifePath ? 'Calculating...' : 'Calculate My Life Path'}
        </button>
      </form>

      <p className="text-[11px] text-zinc-500 text-center mt-8 leading-relaxed">
        Numerology is a tool for self-discovery. Use these insights to guide your personal and spiritual development.
      </p>
    </div>
  );
}
