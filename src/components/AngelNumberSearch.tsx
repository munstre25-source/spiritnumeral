'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// All valid angel numbers (0-9999)
const MIN_NUMBER = 0;
const MAX_NUMBER = 9999;

// Popular angel numbers for quick access
const POPULAR_NUMBERS = [111, 222, 333, 444, 555, 666, 777, 888, 999, 1111, 1212, 2222, 3333, 4444, 5555, 7777, 8888, 9999];

// Page categories for quick navigation
const TOP_CATEGORIES = [
  { key: 'meaning', label: 'Meaning', path: '/meaning/angel-number' },
  { key: 'twin-flame', label: 'Twin Flame', path: '/twin-flame' },
  { key: 'love', label: 'Love', path: '/angel-number-love' },
  { key: 'money', label: 'Money', path: '/money' },
  { key: 'career', label: 'Career', path: '/angel-number-career' },
  { key: 'soulmate', label: 'Soulmate', path: '/soulmate' },
];

const CATEGORY_DEFS = [
  { key: 'meaning', label: 'Meaning', path: '/meaning/angel-number', keywords: ['meaning', 'angel', 'angel number', 'number'] },
  { key: 'twin-flame', label: 'Twin Flame', path: '/twin-flame', keywords: ['twin', 'twin flame'] },
  { key: 'love', label: 'Love', path: '/angel-number-love', keywords: ['love', 'romance', 'relationship'] },
  { key: 'money', label: 'Money', path: '/money', keywords: ['money', 'wealth', 'abundance', 'finance'] },
  { key: 'career', label: 'Career', path: '/angel-number-career', keywords: ['career', 'job', 'work'] },
  { key: 'soulmate', label: 'Soulmate', path: '/soulmate', keywords: ['soulmate'] },
  { key: 'dreams', label: 'Dreams', path: '/dreams', keywords: ['dream', 'dreams'] },
  { key: 'warning', label: 'Warning', path: '/warning', keywords: ['warning', 'alert', 'caution'] },
  { key: 'manifestation', label: 'Manifestation', path: '/manifestation', keywords: ['manifest', 'manifestation', 'loa', 'law of attraction', 'attraction'] },
  { key: 'why-seeing', label: 'Why Seeing', path: '/why-am-i-seeing', keywords: ['why', 'seeing', 'why am i seeing'] },
  { key: 'life-path', label: 'Life Path', path: '/meaning/life-path', keywords: ['life path', 'lifepath'] },
  { key: 'personal-year', label: 'Personal Year', path: '/personal-year', keywords: ['personal year', 'year'] },
  { key: 'personal-month', label: 'Personal Month', path: '/personal-month', keywords: ['personal month', 'month'] },
  { key: 'personal-day', label: 'Personal Day', path: '/personal-day', keywords: ['personal day', 'day', 'today'] },
  { key: 'pinnacle', label: 'Pinnacle', path: '/pinnacle', keywords: ['pinnacle'] },
  { key: 'challenge', label: 'Challenge', path: '/challenge', keywords: ['challenge'] },
  { key: 'maturity', label: 'Maturity', path: '/maturity-number', keywords: ['maturity'] },
  { key: 'birthday', label: 'Birthday', path: '/birthday-number', keywords: ['birthday'] },
  { key: 'karmic-debt', label: 'Karmic Debt', path: '/karmic-debt', keywords: ['karmic', 'debt'] },
  { key: 'name-expression', label: 'Expression', path: '/name-numerology/expression', keywords: ['expression', 'destiny'] },
  { key: 'name-soul-urge', label: 'Soul Urge', path: '/name-numerology/soul-urge', keywords: ['soul urge', 'heart desire'] },
  { key: 'name-personality', label: 'Personality', path: '/name-numerology/personality', keywords: ['personality'] },
];

interface SearchResult {
  number?: number;
  label: string;
  path: string;
}

type CategoryDef = typeof CATEGORY_DEFS[number];

const buildCategoryPath = (category: CategoryDef, num: number) => {
  if (category.key === 'life-path') return `${category.path}/life-path-${num}`;
  if (category.key.startsWith('name-')) return `${category.path}/${num}`;
  return `${category.path}/${num}`;
};

const extractNumber = (input: string) => {
  const match = input.match(/\d{1,4}/);
  if (!match) return null;
  const num = parseInt(match[0], 10);
  if (isNaN(num) || num < MIN_NUMBER || num > MAX_NUMBER) return null;
  return num;
};

const matchCategories = (input: string) => {
  const query = input.toLowerCase();
  return CATEGORY_DEFS.filter((cat) => cat.keywords.some((kw) => query.includes(kw)));
};

export default function AngelNumberSearch({
  variant = 'default',
  showCategories = true
}: {
  variant?: 'default' | 'compact' | 'hero';
  showCategories?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [selectedCategory, setSelectedCategory] = useState('meaning');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Generate suggestions based on input
  const generateSuggestions = useCallback((input: string): SearchResult[] => {
    if (!input) return [];

    const results: SearchResult[] = [];
    const num = extractNumber(input);
    const matched = matchCategories(input);
    const activeCategory = TOP_CATEGORIES.find(c => c.key === selectedCategory) || TOP_CATEGORIES[0];
    const categoryFallback = CATEGORY_DEFS.find(c => c.key === activeCategory.key) || CATEGORY_DEFS[0];
    const categoriesToUse = matched.length ? matched : [categoryFallback];

    // If we have a number, suggest category-specific routes
    if (num !== null) {
      categoriesToUse.forEach((category) => {
        results.push({
          number: num,
          label: `${category.label} ${num}`,
          path: buildCategoryPath(category, num),
        });
      });
    }

    // Numbers starting with the input digits (if input begins with digits)
    const digitsOnly = input.replace(/[^0-9]/g, '');
    if (digitsOnly.length > 0) {
      for (let i = MIN_NUMBER; i <= MAX_NUMBER; i++) {
        if (i.toString().startsWith(digitsOnly) && i !== num) {
          const category = categoryFallback;
          results.push({
            number: i,
            label: `${category.label} ${i}`,
            path: buildCategoryPath(category, i),
          });
          if (results.length >= 8) break;
        }
      }
    }

    // Popular numbers containing the digits
    if (digitsOnly.length > 0 && results.length < 8) {
      POPULAR_NUMBERS.forEach(popular => {
        if (
          popular.toString().includes(digitsOnly) &&
          !results.find(r => r.number === popular)
        ) {
          const category = categoryFallback;
          results.push({
            number: popular,
            label: `${category.label} ${popular} (Popular)`,
            path: buildCategoryPath(category, popular),
          });
        }
      });
    }

    // If no number, suggest category landing pages
    if (num === null && matched.length) {
      matched.slice(0, 6).forEach((category) => {
        results.push({
          number: undefined,
          label: `Browse ${category.label}`,
          path: category.path,
        });
      });
    }

    return results.slice(0, 8);
  }, [selectedCategory]);

  useEffect(() => {
    const newSuggestions = generateSuggestions(query);
    setSuggestions(newSuggestions);
    setSelectedIndex(-1);
  }, [query, generateSuggestions]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const num = extractNumber(query);
    const matched = matchCategories(query);
    const categoryFallback = CATEGORY_DEFS.find(c => c.key === selectedCategory) || CATEGORY_DEFS[0];
    if (num !== null) {
      const category = matched[0] || categoryFallback;
      router.push(buildCategoryPath(category, num));
      setIsOpen(false);
      return;
    }
    if (matched.length > 0) {
      router.push(matched[0].path);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          router.push(suggestions[selectedIndex].path);
          setIsOpen(false);
          setQuery('');
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  const handleSuggestionClick = (result: SearchResult) => {
    router.push(result.path);
    setIsOpen(false);
    setQuery('');
  };

  const isValidNumber = (val: string) => {
    const num = extractNumber(val);
    return num !== null;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Category Tabs */}
      {showCategories && (
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {TOP_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${selectedCategory === cat.key
                  ? 'bg-amber-500 text-black'
                  : 'bg-zinc-900/50 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800'
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      {/* Search Input */}
      <form onSubmit={handleSearch} className="relative">
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder={`Search numbers or topics (e.g., "money 888", "twin flame 1111", "personal year 7")`}
            value={query}
            onChange={(e) => {
              const val = e.target.value;
              setQuery(val);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            className="w-full bg-zinc-900/50 border-2 border-zinc-800 text-zinc-100 pl-14 pr-36 py-5 rounded-2xl focus:outline-none focus:border-amber-500/50 transition-all text-lg placeholder:text-zinc-600 group-hover:bg-zinc-900/80"
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!isValidNumber(query)}
            className="absolute right-3 top-3 bottom-3 px-6 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <span className="hidden sm:inline">Find</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div
            ref={dropdownRef}
            className="absolute z-50 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {suggestions.map((result, index) => (
            <button
                key={result.path}
                type="button"
                onClick={() => handleSuggestionClick(result)}
                className={`w-full px-5 py-4 text-left flex items-center justify-between transition-all ${index === selectedIndex
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'hover:bg-zinc-800 text-zinc-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  {typeof result.number === 'number' ? (
                    <span className="text-2xl font-bold text-amber-500">{result.number}</span>
                  ) : (
                    <span className="text-2xl font-bold text-amber-500">★</span>
                  )}
                  <div>
                    <span className="text-sm">{result.label}</span>
                    <span className="block text-xs text-zinc-500 capitalize">
                      {typeof result.number === 'number' ? `${selectedCategory.replace('-', ' ')} meaning` : 'Browse topic'}
                    </span>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            ))}
          </div>
        )}

        {/* Invalid number message */}
        {query && query.match(/\d+/) && !isValidNumber(query) && (
          <p className="absolute mt-2 text-sm text-amber-500">
            Numbers go from 0 to {MAX_NUMBER}
          </p>
        )}
      </form>

      {/* Popular Numbers */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <span className="text-zinc-500 text-xs uppercase tracking-widest font-bold mr-2">Popular:</span>
        {POPULAR_NUMBERS.slice(0, 8).map((num) => (
          <Link
            key={num}
            href={`/meaning/angel-number/${num}`}
            className="px-3 py-1 rounded-lg bg-zinc-900/50 border border-zinc-800 text-zinc-400 text-sm hover:border-amber-500/50 hover:text-amber-400 transition-all"
          >
            {num}
          </Link>
        ))}
      </div>
    </div>
  );
}

// Compact search for header/navbar
export function CompactSearch() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = extractNumber(query);
    const matched = matchCategories(query);
    const category = matched[0] || CATEGORY_DEFS[0];
    if (num !== null) {
      router.push(buildCategoryPath(category, num));
      setQuery('');
      setIsOpen(false);
      return;
    }
    if (matched.length > 0) {
      router.push(matched[0].path);
      setQuery('');
      setIsOpen(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="Search…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-32 md:w-40 bg-zinc-900/50 border border-zinc-800 text-zinc-100 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-amber-500/50 focus:w-48 transition-all"
      />
    </form>
  );
}
