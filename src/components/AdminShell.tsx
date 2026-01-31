'use client';

import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

export default function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page text-primary flex flex-col">
      {/* Admin header: theme toggle + back link on desktop and mobile */}
      <header className="sticky top-0 z-50 border-b border-default bg-elevated/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold text-primary">Admin</h1>
            <Link
              href="/"
              className="text-sm text-secondary hover:text-amber-600 transition-colors"
            >
              ← Back to site
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
