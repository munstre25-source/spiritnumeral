'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

const LETTER_MAP: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

const VOWELS = new Set(['A', 'E', 'I', 'O', 'U', 'Y']);

function reduceNumber(value: number) {
  let sum = value;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
  }
  return sum;
}

function sumName(name: string, mode: 'all' | 'vowels' | 'consonants') {
  const letters = name.toUpperCase().replace(/[^A-Z]/g, '').split('');
  let total = 0;
  letters.forEach((letter) => {
    const isVowel = VOWELS.has(letter);
    if (mode === 'vowels' && !isVowel) return;
    if (mode === 'consonants' && isVowel) return;
    total += LETTER_MAP[letter] || 0;
  });
  return reduceNumber(total);
}

export default function NameNumerologyCalculator() {
  const [name, setName] = useState('');

  const results = useMemo(() => {
    if (!name.trim()) return null;
    const expression = sumName(name, 'all');
    const soulUrge = sumName(name, 'vowels');
    const personality = sumName(name, 'consonants');
    return { expression, soulUrge, personality };
  }, [name]);

  return (
    <section className="p-8 rounded-3xl bg-card border border-default">
      <h2 className="text-2xl font-bold mb-3 text-primary">Name Numerology Calculator</h2>
      <p className="text-secondary mb-6">
        Enter your full name to reveal your Expression (Destiny), Soul Urge, and Personality numbers.
      </p>
      <div className="space-y-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your full name"
          className="w-full bg-page border border-default rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-amber-500"
        />
      </div>

      {results && (
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-page/70 border border-default text-center">
            <div className="text-xs text-muted mb-2">Expression</div>
            <div className="text-3xl font-bold text-amber-600">{results.expression}</div>
            <Link href={`/name-numerology/expression/${results.expression}`} className="text-xs text-amber-600 mt-2 inline-block">
              View meaning →
            </Link>
          </div>
          <div className="p-4 rounded-2xl bg-page/70 border border-default text-center">
            <div className="text-xs text-muted mb-2">Soul Urge</div>
            <div className="text-3xl font-bold text-amber-600">{results.soulUrge}</div>
            <Link href={`/name-numerology/soul-urge/${results.soulUrge}`} className="text-xs text-amber-600 mt-2 inline-block">
              View meaning →
            </Link>
          </div>
          <div className="p-4 rounded-2xl bg-page/70 border border-default text-center">
            <div className="text-xs text-muted mb-2">Personality</div>
            <div className="text-3xl font-bold text-amber-600">{results.personality}</div>
            <Link href={`/name-numerology/personality/${results.personality}`} className="text-xs text-amber-600 mt-2 inline-block">
              View meaning →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
