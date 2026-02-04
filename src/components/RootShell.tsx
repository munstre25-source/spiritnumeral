'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ReadingProgress, ScrollToTop, MobileBottomNav } from '@/components/UXEnhancements';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';
import { ExitIntentPdf } from '@/components/ExitIntentPdf';
import AdSense from '@/components/AdSense';

type RootShellProps = {
  children: React.ReactNode;
};

export default function RootShell({ children }: RootShellProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  return (
    <div className="relative z-10">
      {!isAdmin && <ReadingProgress />}
      {!isAdmin && <Navbar />}
      {!isAdmin && <AnalyticsTracker />}
      <div className={`flex-grow ${isAdmin ? '' : 'pb-20 md:pb-0'}`}>
        {children}
      </div>
      {!isAdmin && (
        <section className="mx-auto w-full max-w-4xl px-4 py-6" aria-label="Advertisement">
          <AdSense className="min-h-[90px] md:min-h-[120px]" />
        </section>
      )}
      {!isAdmin && <Footer />}
      {!isAdmin && <ExitIntentPdf />}
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <MobileBottomNav />}
    </div>
  );
}
