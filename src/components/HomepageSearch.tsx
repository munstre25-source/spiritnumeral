'use client';

import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';

export function HomepageSearch() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    const num = parseInt(trimmed, 10);
    if (!Number.isNaN(num) && num >= 1 && num <= 9999) {
      router.push(`/meaning/angel-number/${num}`);
      return;
    }
    const lower = trimmed.toLowerCase();
    if (lower.includes('twin flame')) router.push('/twin-flame');
    else if (lower.includes('love')) router.push('/angel-number-love');
    else if (lower.includes('money')) router.push('/money');
    else if (lower.includes('career')) router.push('/angel-number-career');
    else if (lower.includes('soulmate')) router.push('/soulmate');
    else if (lower.includes('meaning')) router.push('/meaning');
    else router.push(`/meaning?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" aria-hidden>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search numbers or topics (e.g. 579, money 888, twin flame)"
          className="w-full bg-card border border-default rounded-full pl-11 pr-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:border-amber-500/60 transition-colors"
          aria-label="Search numbers or topics"
        />
      </div>
      <button
        type="submit"
        className="shrink-0 px-6 py-3 rounded-full bg-amber-500 text-black font-semibold text-sm hover:bg-amber-400 transition-colors"
      >
        Find →
      </button>
    </form>
  );
}
