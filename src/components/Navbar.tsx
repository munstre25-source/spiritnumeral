'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Logo } from './Logo';

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

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Meanings', href: '/meaning' },
    { name: 'Angel Numbers', href: '/meaning/angel-number' },
    { name: 'Life Path', href: '/meaning/life-path' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60]">
        <div
          className={`transition-all duration-300 ${
            isScrolled || isMobileMenuOpen
              ? 'bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/50 py-3'
              : 'bg-transparent py-5'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group relative z-[70]">
              <Logo size={isScrolled ? 36 : 42} className="transition-all duration-300" />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-amber-100 to-amber-500 bg-clip-text text-transparent tracking-tight leading-none">
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
                  className={`text-sm font-medium transition-all hover:text-amber-400 ${
                    pathname === link.href ? 'text-amber-500' : 'text-zinc-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-sm font-bold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
              >
                Get Reading
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-[70] p-2 text-zinc-400 hover:text-amber-400 transition-colors bg-zinc-900/50 rounded-lg border border-zinc-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Moved out of nav to avoid stacking context issues */}
      <div
        className={`fixed inset-0 bg-zinc-950 z-[55] md:hidden transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        {/* Background Decorative Element */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative flex flex-col h-full pt-32 pb-12 px-8 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">Navigation</p>
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-4xl font-bold transition-all transform ${
                  isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                } ${
                  pathname === link.href ? 'text-amber-500' : 'text-zinc-100'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className={`mt-12 transition-all transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '500ms' }}>
              <Link
                href="https://909dddwh682ivoeexkmjt5qacw.hop.clickbank.net/?cbpage=life-roadmap-37-Aff"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-center font-black text-xl shadow-2xl shadow-amber-500/30 block mb-12"
              >
                Get Your Reading
              </Link>
            
            <div className="pt-10 border-t border-zinc-800/50">
              <p className="text-zinc-400 text-base leading-relaxed mb-8 max-w-xs">
                Decode your spiritual path with the power of ancient numerology.
              </p>
              <div className="flex space-x-6">
                {['Twitter', 'Instagram', 'YouTube'].map((social) => (
                  <div key={social} className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-amber-500 transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
