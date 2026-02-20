import { Suspense } from 'react';
import type { Metadata } from 'next';
import QuickReportClientPage from './QuickReportClient';
import { withCanonicalPath } from '@/lib/seo/metadata';

export const metadata: Metadata = withCanonicalPath('/quick-report', {
  title: 'Quick Number Report | Spirit Numeral',
  description: 'Order a one-page numerology reading for the number you keep seeing. Fast checkout and instant guidance.',
});

export default function QuickReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-page" />}>
      <QuickReportClientPage />
    </Suspense>
  );
}
