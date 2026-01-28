'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AngelNumberSearch() {
  const [number, setNumber] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (number && number.length >= 3) {
      router.push(`/meaning/angel-number/${number}`);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="number"
          placeholder="Enter an angel number (e.g. 777)"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full bg-zinc-900/50 border-2 border-zinc-800 text-zinc-100 px-6 py-5 rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all text-lg placeholder:text-zinc-600 group-hover:bg-zinc-900/80 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="submit"
          disabled={!number || number.length < 3}
          className="absolute right-3 top-3 bottom-3 px-8 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <span>Find Meaning</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </form>
      <div className="mt-4 flex flex-wrap justify-center gap-2 text-zinc-500 text-xs uppercase tracking-widest font-bold">
        <span>Try searching:</span>
        <button onClick={() => setNumber('111')} className="hover:text-amber-400 transition-colors">111</button>
        <span>•</span>
        <button onClick={() => setNumber('444')} className="hover:text-amber-400 transition-colors">444</button>
        <span>•</span>
        <button onClick={() => setNumber('888')} className="hover:text-amber-400 transition-colors">888</button>
        <span>•</span>
        <button onClick={() => setNumber('1212')} className="hover:text-amber-400 transition-colors">1212</button>
      </div>
    </div>
  );
}
