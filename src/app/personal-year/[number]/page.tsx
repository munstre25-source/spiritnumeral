import { notFound } from 'next/navigation';
import { getTimingCycleMeaning } from '@/lib/supabase';
import { NumerologyMeaning } from '@/components/NumerologyMeaning';
import { TimingPaidCTA } from '@/components/TimingPaidCTA';
import { AffiliatePromo } from '@/components/AffiliatePromo';
import { OFFERS } from '@/lib/offers';

const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export async function generateStaticParams() {
  return NUMBERS.map((number) => ({ number: String(number) }));
}

export default async function PersonalYearNumberPage({ params }: { params: Promise<{ number: string }> }) {
  const { number } = await params;
  const num = parseInt(number, 10);
  if (!NUMBERS.includes(num)) return notFound();

  const data = await getTimingCycleMeaning('personal_year', num);
  if (!data) return notFound();

  const faqs = [
    {
      question: `What does Personal Year ${num} mean?`,
      answer: data.meaning,
    },
    {
      question: `How should I use Personal Year ${num}?`,
      answer: data.advice,
    },
    {
      question: `What should I focus on in love during Personal Year ${num}?`,
      answer: data.love,
    },
    {
      question: `What about career or money in Personal Year ${num}?`,
      answer: data.career,
    },
  ];

  return (
    <NumerologyMeaning
      title={`Personal Year ${num} Meaning`}
      subtitle="Your 12-month theme and priorities."
      meaning={data.meaning}
      strengths={data.strengths}
      challenges={data.challenges}
      love={data.love}
      career={data.career}
      advice={data.advice}
      faqs={faqs}
      relatedLinks={[
        { href: '/personal-year', label: 'Personal Year Calculator' },
        { href: `/personal-month/${num}`, label: `Personal Month ${num}` },
        { href: `/personal-day/${num}`, label: `Personal Day ${num}` },
      ]}
      footer={
        <>
          <TimingPaidCTA />
          <AffiliatePromo offer={OFFERS.affiliate_numerologist} context="Prosperity VSL" />
        </>
      }
    />
  );
}
