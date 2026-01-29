import Link from 'next/link';

interface InternalLinksProps {
  number: string | number;
  currentPage: 'meaning' | 'twin-flame' | 'warning' | 'why-seeing' | 'love' | 'career' | 'manifestation' | 'biblical' | 'money' | 'soulmate' | 'pregnancy' | 'breakup' | 'dreams';
}

export function InternalLinks({ number, currentPage }: InternalLinksProps) {
  const num = number.toString();

  const links = [
    { href: `/meaning/angel-number/${num}`, label: `${num} Meaning`, page: 'meaning' },
    { href: `/twin-flame/${num}`, label: `${num} Twin Flame`, page: 'twin-flame' },
    { href: `/warning/${num}`, label: `Is ${num} a Warning?`, page: 'warning' },
    { href: `/why-am-i-seeing/${num}`, label: `Why Seeing ${num}?`, page: 'why-seeing' },
    { href: `/angel-number-love/${num}`, label: `${num} Love`, page: 'love' },
    { href: `/angel-number-career/${num}`, label: `${num} Career`, page: 'career' },
    { href: `/manifestation/${num}`, label: `${num} Manifestation`, page: 'manifestation' },
    { href: `/biblical-meaning/${num}`, label: `${num} Biblical`, page: 'biblical' },
    { href: `/money/${num}`, label: `${num} Money`, page: 'money' },
    { href: `/soulmate/${num}`, label: `${num} Soulmate`, page: 'soulmate' },
    { href: `/pregnancy/${num}`, label: `${num} Pregnancy`, page: 'pregnancy' },
    { href: `/breakup/${num}`, label: `${num} Breakup`, page: 'breakup' },
    { href: `/dreams/${num}`, label: `${num} Dreams`, page: 'dreams' },
  ];

  const filteredLinks = links.filter(link => link.page !== currentPage);

  return (
    <section className="py-8">
      <h2 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
        Explore More About Angel Number {num}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filteredLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 hover:bg-zinc-900 transition-all text-center group"
          >
            <span className="text-zinc-300 group-hover:text-amber-400 text-sm font-medium transition-colors">
              {link.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

interface NavigationLinksProps {
  className?: string;
}

export function NavigationLinks({ className = '' }: NavigationLinksProps) {
  const mainPages = [
    { href: '/', label: 'Home' },
    { href: '/calculator', label: 'Numerology Calculator' },
    { href: '/meaning/angel-number', label: 'All Angel Numbers' },
    { href: '/meaning/life-path', label: 'Life Path Numbers' },
    { href: '/about', label: 'About' },
  ];

  const popularNumbers = [111, 222, 333, 444, 555, 666, 777, 888, 999, 1111];

  return (
    <section className={`py-8 ${className}`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold text-amber-400 mb-3">Quick Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {mainPages.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 text-sm transition-all"
              >
                {page.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-400 mb-3">Popular Angel Numbers</h3>
          <div className="flex flex-wrap gap-2">
            {popularNumbers.map((num) => (
              <Link
                key={num}
                href={`/meaning/angel-number/${num}`}
                className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 text-sm transition-all"
              >
                {num}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface RelatedNumbersProps {
  currentNumber: number;
  count?: number;
}

export function RelatedNumbers({ currentNumber, count = 6 }: RelatedNumbersProps) {
  const related: number[] = [];

  const nearbyStart = Math.max(0, currentNumber - 3);
  for (let i = nearbyStart; i <= Math.min(9999, nearbyStart + count - 1); i++) {
    if (i !== currentNumber) {
      related.push(i);
    }
  }

  return (
    <section className="py-6">
      <h3 className="text-lg font-bold text-amber-400 mb-3">Related Angel Numbers</h3>
      <div className="flex flex-wrap gap-2">
        {related.slice(0, count).map((num) => (
          <Link
            key={num}
            href={`/meaning/angel-number/${num}`}
            className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 text-sm transition-all"
          >
            Angel Number {num}
          </Link>
        ))}
      </div>
    </section>
  );
}

interface ContextualLinksProps {
  currentNumber: number;
}

export function ContextualLinks({ currentNumber }: ContextualLinksProps) {
  const nums = [currentNumber, currentNumber - 1, currentNumber + 1].filter((n) => n >= 0 && n <= 9999);
  const links = [
    { href: '/name-numerology', label: 'Name Numerology Calculator' },
    { href: '/personal-year', label: 'Personal Year Calculator' },
    { href: '/personal-month', label: 'Personal Month Calculator' },
    { href: '/personal-day', label: 'Personal Day Calculator' },
    { href: '/pinnacle', label: 'Pinnacle Numbers' },
    { href: '/challenge', label: 'Challenge Numbers' },
    { href: '/maturity-number', label: 'Maturity Numbers' },
    { href: '/birthday-number', label: 'Birthday Numbers' },
  ];

  return (
    <section className="py-6">
      <h3 className="text-lg font-bold text-amber-400 mb-3">Next Steps</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {nums.map((num) => (
          <Link
            key={num}
            href={`/meaning/angel-number/${num}`}
            className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 text-sm transition-all"
          >
            Angel Number {num}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-4 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/40 text-zinc-300 hover:text-amber-400 text-sm transition-all"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
