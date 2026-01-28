'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/calculator', label: 'Calculator' },
    { href: '/compatibility', label: 'Compatibility' },
    { href: '/meaning/angel-number', label: 'Angel Numbers' },
    { href: '/meaning/life-path', label: 'Life Paths' },
    { href: '/profile', label: 'My Journey' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-3' : 'bg-transparent py-5'
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

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber-500 ${pathname === link.href ? 'text-amber-500' : 'text-zinc-400'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/calculator"
            className="bg-amber-500 text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10"
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-950 border-b border-zinc-800 p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block text-lg font-medium ${pathname === link.href ? 'text-amber-500' : 'text-zinc-300'
                }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/calculator"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block w-full bg-amber-500 text-black py-4 rounded-xl text-center font-bold text-lg"
          >
            Calculate Your Life Path
          </Link>
        </div>
      )}
    </nav>
  );
}
