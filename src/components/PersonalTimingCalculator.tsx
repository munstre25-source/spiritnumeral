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
  return value
    .toString()
    .split('')
    .reduce((acc, digit) => acc + Number(digit), 0);
}

export default function PersonalTimingCalculator() {
  const today = new Date();
  const [birthdate, setBirthdate] = useState('');
  const [targetDate, setTargetDate] = useState(today.toISOString().slice(0, 10));

  const results = useMemo(() => {
    if (!birthdate || !targetDate) return null;
    const birth = new Date(birthdate);
    const target = new Date(targetDate);

    const month = birth.getMonth() + 1;
    const day = birth.getDate();
    const year = target.getFullYear();

    const personalYear = reduceNumber(sumDigits(month) + sumDigits(day) + sumDigits(year));
    const personalMonth = reduceNumber(personalYear + sumDigits(target.getMonth() + 1));
    const personalDay = reduceNumber(personalMonth + sumDigits(target.getDate()));

    return { personalYear, personalMonth, personalDay };
  }, [birthdate, targetDate]);

  return (
    <section className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-3 text-white">Personal Timing Calculator</h2>
      <p className="text-zinc-400 mb-6">
        Enter your birthdate and a target date to find your personal year, month, and day numbers.
      </p>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-zinc-500">Birthdate</label>
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            className="mt-2 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500"
          />
        </div>
        <div>
          <label className="text-xs text-zinc-500">Target date</label>
          <input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="mt-2 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {results && (
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 text-center">
            <div className="text-xs text-zinc-500 mb-2">Personal Year</div>
            <div className="text-3xl font-bold text-amber-400">{results.personalYear}</div>
            <Link href={`/personal-year/${results.personalYear}`} className="text-xs text-amber-400 mt-2 inline-block">
              View meaning →
            </Link>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 text-center">
            <div className="text-xs text-zinc-500 mb-2">Personal Month</div>
            <div className="text-3xl font-bold text-amber-400">{results.personalMonth}</div>
            <Link href={`/personal-month/${results.personalMonth}`} className="text-xs text-amber-400 mt-2 inline-block">
              View meaning →
            </Link>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800 text-center">
            <div className="text-xs text-zinc-500 mb-2">Personal Day</div>
            <div className="text-3xl font-bold text-amber-400">{results.personalDay}</div>
            <Link href={`/personal-day/${results.personalDay}`} className="text-xs text-amber-400 mt-2 inline-block">
              View meaning →
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
