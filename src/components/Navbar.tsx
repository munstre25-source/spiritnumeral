'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Angel Numbers', href: '/meaning/angel-number/111' },
    { name: 'Life Path', href: '/meaning/life-path/life-path-1' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group relative z-50">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <span className="text-zinc-950 font-bold text-xl">S</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tight leading-none">
              Spirit Numeral
            </span>
            <span className="text-[10px] text-zinc-500 font-medium tracking-wider uppercase leading-none mt-1">
              Decode Your Numbers
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                pathname === link.href ? 'text-amber-500' : 'text-zinc-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/calculator"
            className="px-5 py-2.5 rounded-full bg-amber-500 text-zinc-950 text-sm font-bold hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
          >
            Get Reading
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 p-2 text-zinc-400 hover:text-amber-400 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-zinc-950 z-40 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-32 px-8 space-y-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-2xl font-bold transition-colors ${
                pathname === link.href ? 'text-amber-500' : 'text-zinc-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/calculator"
            className="w-full py-4 rounded-xl bg-amber-500 text-zinc-950 text-center font-bold text-lg shadow-lg shadow-amber-500/20"
          >
            Get Personalized Reading
          </Link>
          <div className="pt-8 border-t border-zinc-800">
            <p className="text-zinc-500 text-sm mb-4">Decode your spiritual path with the power of numerology.</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800"></div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800"></div>
              <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
