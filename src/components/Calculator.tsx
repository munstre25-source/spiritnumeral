'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NumerologyCalculator() {
  const [birthdate, setBirthdate] = useState('');
  const [name, setName] = useState('');
  const [lifePath, setLifePath] = useState<number | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  function calculateLifePath(dateString: string): number {
    const cleaned = dateString.replace(/[-\/]/g, '');
    let sum = 0;
    for (const digit of cleaned) {
      sum += parseInt(digit, 10);
    }
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
    const dateRegex = /^\d{4}[-\/]\d{2}[-\/]\d{2}$|^\d{2}[-\/]\d{2}[-\/]\d{4}$/;
    if (!dateRegex.test(birthdate)) {
      setError('Please enter a valid date (MM/DD/YYYY or YYYY-MM-DD)');
      return;
    }
    try {
      const calculatedPath = calculateLifePath(birthdate);
      setLifePath(calculatedPath);
      setTimeout(() => {
        router.push(`/meaning/life-path/life-path-${calculatedPath}`);
      }, 1200);
    } catch {
      setError('Error calculating your life path. Please try again.');
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-serif font-bold text-primary mb-2">
        Life Path Calculator
      </h2>
      <p className="text-sm text-secondary mb-6">
        Enter your birthdate to get your life path number and personalized reading.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-primary mb-1">
            Name (optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-lg bg-elevated border border-default text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-primary mb-1">
            Birth date <span className="text-amber-600">*</span>
          </label>
          <input
            type="date"
            id="birthdate"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-lg bg-elevated border border-default text-primary focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
            {error}
          </div>
        )}

        {lifePath && (
          <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
            <p className="text-sm font-medium text-primary">Your Life Path Number</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{lifePath}</p>
            <p className="text-xs text-secondary mt-2">Taking you to your reading...</p>
          </div>
        )}

        <button
          type="submit"
          disabled={!!lifePath}
          className="w-full btn-primary py-4 rounded-lg font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {lifePath ? 'Calculating...' : 'Calculate My Life Path'}
        </button>
      </form>

      <p className="text-xs text-muted text-center mt-6">
        Your data is used only for this calculation. We don’t store it.
      </p>
    </div>
  );
}
