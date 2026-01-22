'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Angel Numbers', href: '/meaning/angel-number/111' },
    { name: 'Life Path', href: '/meaning/life-path/life-path-1' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4'
          : 'bg-transparent py-6'
      }`}
    >
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
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
      </div>
    </nav>
  );
}
