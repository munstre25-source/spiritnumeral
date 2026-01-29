'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ReadingProgress, ScrollToTop, MobileBottomNav } from '@/components/UXEnhancements';
import { EmailCapture } from '@/components/EmailCapture';
import { AnalyticsTracker } from '@/components/AnalyticsTracker';

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
      {!isAdmin && <Footer />}
      {!isAdmin && <ScrollToTop />}
      {!isAdmin && <MobileBottomNav />}
      {!isAdmin && <EmailCapture />}
    </div>
  );
}
