import { notFound } from 'next/navigation';
import { getTimingCycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { TimingPaidCTA } from '@/components/TimingPaidCTA';
import { QuickReportUpsell } from '@/components/QuickReportUpsell';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function PersonalMonthNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getTimingCycleMeaning('personal_month', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Personal Month ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How should I use Personal Month ${num}?`,
      answer: data.advice,
    },
    {
      question: `What should I focus on in love this month?`,
      answer: data.love,
    },
    {
      question: `What about career in Personal Month ${num}?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Personal Month ${num} Meaning`}
      subtitle="Your 30-day focus and momentum."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/personal-month', label: 'Personal Month Calculator' },
        { href: `/personal-year/${num}`, label: `Personal Year ${num}` },
        { href: `/personal-day/${num}`, label: `Personal Day ${num}` },
      ]}
      footer={
        <>
          <TimingPaidCTA />
          <QuickReportUpsell prefillNumber={parseInt(number)} />
        </>
      }
    />
  );
}
