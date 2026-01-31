import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  /** Optional extra classes (e.g. pt-28, max-w-4xl). Padding/layout only. */
  className?: string;
}

/**
 * Standard page shell: theme-aware background and text, consistent padding.
 * Use on every page so light/dark theme applies everywhere.
 */
export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <main className={`min-h-screen bg-page text-primary pt-32 md:pt-48 px-6 md:px-8 pb-16 font-sans ${className}`.trim()}>
      {children}
    </main>
  );
}
