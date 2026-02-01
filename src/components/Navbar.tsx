'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';

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
    {
      label: 'Tools & Resources',
      dropdown: [
        { href: '/calculator', label: 'Life Path Calculator', description: 'Get your life path number' },
        { href: '/quiz', label: 'Number Quiz', description: 'Discover your angel number' },
        { href: '/compare', label: 'Compare Numbers', description: 'See how numbers relate' },
        { href: '/compatibility', label: 'Compatibility', description: 'Check your love match' },
        { href: '/name-numerology', label: 'Name Numerology', description: 'Expression & Soul Urge' },
        { href: '/personal-year', label: 'Personal Year', description: 'Your timing cycle' },
        { href: '/celebrity-numerology', label: 'Celebrity Life Paths', description: 'Famous numerology' },
        { href: '/blog', label: 'Blog', description: 'Spiritual insights' },
      ],
    },
    {
      label: 'Meanings',
      dropdown: [
        { href: '/meaning/angel-number', label: 'Angel Numbers', description: 'Repeating number sequences' },
        { href: '/meaning/life-path', label: 'Life Path Numbers', description: 'Your destiny number' },
        { href: '/pinnacle', label: 'Pinnacle Numbers', description: 'Long-term cycles' },
        { href: '/birthday-number', label: 'Birthday Numbers', description: 'Your gifts by day' },
        { href: '/karmic-debt', label: 'Karmic Debt Numbers', description: 'Key lessons' },
        { href: '/meaning', label: 'All Meanings', description: 'Browse everything' },
      ],
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
        ? 'bg-elevated/95 backdrop-blur-sm border-b border-default py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <img src="/favicon.svg" alt="" className="w-9 h-9 rounded-lg flex-shrink-0" width="36" height="36" />
          <span className="text-lg font-bold text-primary">
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
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-secondary hover:text-amber-600 transition-colors"
                >
                  {item.label}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute top-full left-0 mt-2 w-56 rounded-xl bg-card border border-default shadow-lg transition-all ${openDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}>
                  <div className="p-2">
                    {item.dropdown.map((dropItem) => (
                      <Link
                        key={dropItem.href}
                        href={dropItem.href}
                        className="block px-3 py-2.5 rounded-lg hover:bg-elevated transition-colors"
                      >
                        <div className="font-medium text-primary text-sm group-hover/item:text-amber-600">
                          {dropItem.label}
                        </div>
                        {dropItem.description && (
                          <div className="text-xs text-muted mt-0.5">{dropItem.description}</div>
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
                className={`px-4 py-2 text-sm font-medium transition-colors hover:text-amber-600 ${pathname === item.href ? 'text-amber-600' : 'text-secondary'}`}
              >
                {item.label}
              </Link>
            )
          ))}

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>

        {/* Mobile: theme toggle + menu button (always visible in header) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-card border-b border-default max-h-[80vh] overflow-y-auto">
          <div className="p-6 space-y-6">
            {navItems.map((item) => (
              item.dropdown ? (
                <div key={item.label} className="space-y-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
                    {item.label}
                  </div>
                  {item.dropdown.map((dropItem) => (
                    <Link
                      key={dropItem.href}
                      href={dropItem.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block pl-3 border-l-2 border-default hover:border-amber-500 transition-colors"
                    >
                      <div className="font-medium text-primary text-base">{dropItem.label}</div>
                      {dropItem.description && (
                        <div className="text-xs text-muted mt-0.5">{dropItem.description}</div>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href!}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-lg font-medium ${pathname === item.href ? 'text-amber-600' : 'text-primary'}`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
