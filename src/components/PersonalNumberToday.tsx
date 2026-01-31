'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

function reduceNumber(value: number) {
  let sum = value;
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
  }
  return sum;
}

function sumDigits(value: number) {
  return value.toString().split('').reduce((acc, digit) => acc + Number(digit), 0);
}

export function PersonalNumberToday() {
  const today = new Date();
  const [birthdate, setBirthdate] = useState('');

  const personalDay = useMemo(() => {
    if (!birthdate) return null;
    const birth = new Date(birthdate);
    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    const year = today.getFullYear();
    const personalYear = reduceNumber(sumDigits(month) + sumDigits(day) + sumDigits(year));
    const personalMonth = reduceNumber(personalYear + sumDigits(today.getMonth() + 1));
    return reduceNumber(personalMonth + sumDigits(today.getDate()));
  }, [birthdate]);

  return (
    <section className="rounded-3xl bg-card border border-default p-6 md:p-8">
      <h3 className="text-lg font-bold text-primary mb-1">Your personal number today</h3>
      <p className="text-secondary text-sm mb-4">
        Based on your birth date and today’s date — your personal day number and what to focus on.
      </p>
      <div className="space-y-3">
        <label className="text-xs text-muted">Your birth date</label>
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          className="w-full max-w-xs bg-page border border-default rounded-xl px-4 py-3 text-primary text-sm focus:outline-none focus:border-amber-500"
        />
      </div>
      {personalDay !== null && (
        <div className="mt-6 pt-6 border-t border-default">
          <p className="text-secondary text-sm mb-2">Your personal number today is</p>
          <Link
            href={`/personal-day/${personalDay}`}
            className="inline-flex items-center gap-2 text-3xl font-bold text-amber-600 hover:text-amber-500 transition-colors"
          >
            {personalDay}
            <span className="text-base font-normal text-secondary">→ See what it means</span>
          </Link>
        </div>
      )}
    </section>
  );
}
