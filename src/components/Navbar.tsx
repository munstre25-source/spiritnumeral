'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface DropdownItem {
  href: string;
  label: string;
  description?: string;
}

interface NavItem {
  href?: string;
  label: string;
  dropdown?: DropdownItem[];
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { href: '/calculator', label: 'Calculator' },
    {
      label: 'Tools & Resources',
      dropdown: [
        { href: '/quiz', label: 'Number Quiz', description: 'Discover your angel number' },
        { href: '/compare', label: 'Compare Numbers', description: 'See how numbers relate' },
        { href: '/compatibility', label: 'Compatibility', description: 'Check your love match' },
        { href: '/celebrity-numerology', label: 'Celebrity Life Paths', description: 'Famous numerology' },
        { href: '/blog', label: 'Blog', description: 'Spiritual insights' },
      ],
    },
    {
      label: 'Meanings',
      dropdown: [
        { href: '/meaning/angel-number', label: 'Angel Numbers', description: 'Repeating number sequences' },
        { href: '/meaning/life-path', label: 'Life Path Numbers', description: 'Your destiny number' },
        { href: '/meaning', label: 'All Meanings', description: 'Browse everything' },
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 border border-amber-500/30 flex items-center justify-center text-xl shadow-lg shadow-amber-500/10 group-hover:scale-110 transition-transform">
            ✦
          </div>
          <span className="text-xl font-bold tracking-tighter bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            Spirit Numeral
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            item.dropdown ? (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-amber-500 transition-colors"
                >
                  {item.label}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-64 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/50 transition-all ${openDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                  <div className="p-2">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        href={dropItem.href}
                        className="block px-4 py-3 rounded-xl hover:bg-zinc-800 transition-colors group/item"
                      >
                        <div className="font-medium text-white text-sm group-hover/item:text-amber-400 transition-colors">
                          {dropItem.label}
                        </div>
                        {dropItem.description && (
                          <div className="text-xs text-zinc-500 mt-0.5">{dropItem.description}</div>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href!}
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-amber-500 ${pathname === item.href ? 'text-amber-500' : 'text-zinc-400'
                  }`}
              >
                {item.label}
              </Link>
            )
          ))}
          <Link
            href="/calculator"
            className="ml-2 bg-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
          >
            Calculate Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-zinc-100"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 max-h-[80vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.label} className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-zinc-600 mb-3">
                    {item.label}
                  </div>
                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.href}
                      href={dropItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block pl-3 border-l-2 border-zinc-800 hover:border-amber-500 transition-colors"
                    >
                      <div className="font-medium text-white text-base">{dropItem.label}</div>
                      {dropItem.description && (
                        <div className="text-xs text-zinc-500 mt-0.5">{dropItem.description}</div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium ${pathname === item.href ? 'text-amber-500' : 'text-zinc-300'
                    }`}
                >
                  {item.label}
                </Link>
              )
            ))}
            <Link
              href="/calculator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-amber-500 text-black py-4 rounded-xl text-center font-bold text-lg"
            >
              Calculate Your Life Path
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
